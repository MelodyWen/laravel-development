<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use MelodyWen\LaravelDevelopment\Models\Table;
use Symfony\Component\Yaml\Yaml;

class CommonController extends Controller
{
    public function all()
    {
        $tables = Table::with('table_collection.module')->get();

        return $this->success($tables);
    }

    public function mockData(Request $request)
    {
        $builderGenerateForm = collect($request['builderGenerateForm']);
        $tableName = $builderGenerateForm['tableCollection']['collection_name'];
        $primaryKey = collect($builderGenerateForm['tableCollection']['table']['columns'])->filter(function ($item) {

            return $item['COLUMN_KEY'] == 'PRI';
        })->first()['COLUMN_NAME'];

        $creates = collect($request['generateDataForm'])->map(function ($item) {
            return collect($item)->map(function ($item, $key) {
                if (is_object($item) || is_array($item)) {
                    return json_encode($item);
                }
                return $item;
            })->toArray();
        });


        // 2. 操作

        DB::table($tableName)
            ->whereIn($primaryKey, $creates->pluck($primaryKey))
            ->delete();


        DB::table($tableName)->insert($creates->toArray());

        return $this->success();
    }

    public function previewPhp(Request $request)
    {

        $tableName = $request['builderGenerateForm']['tableCollection']['collection_name'];
        $rowNum = $request['builderGenerateForm']['rowNum'];

        $result = DB::table($tableName)->limit($rowNum)->get();

        return $this->success(self::getJsonView($result, false, 4, "=>", true));
    }

    public function previewJs(Request $request)
    {
        $tableName = $request['builderGenerateForm']['tableCollection']['collection_name'];
        $rowNum = $request['builderGenerateForm']['rowNum'];

        $result = DB::table($tableName)->limit($rowNum)->get();

        return $this->success($result);
    }

    public function previewYml(Request $request)
    {
        $tableName = $request['builderGenerateForm']['tableCollection']['collection_name'];
        $rowNum = $request['builderGenerateForm']['rowNum'];

        $result = DB::table($tableName)->limit($rowNum)->get();

        $result = self::toArray($result);

        return $this->success(Yaml::dump($result, 2));
    }

    public function previewSwagger(Request $request)
    {
        $table = $request['builderGenerateForm']['tableCollection']['table'];
        $primaryKey = collect($table['columns'])->filter(function ($item) {

            return $item['COLUMN_KEY'] == 'PRI';
        })->first()['COLUMN_NAME'];

        $model = DB::table($table['TABLE_NAME'])
            ->where($primaryKey, '>=', $request['builderGenerateForm']['rowNum'])
            ->first();

        $schema = [
            'schema' => null,
            'title' => null,
            'description' => null,
            'type' => 'object',
            'required' => [],
            'property' => [
                [
                    'property' => null,
                    'type' => null,
                    'readOnly' => null,
                    'default' => null,
                    'example' => null,
                    'nullable' => null,
                    'deprecated' => null,
                    'description' => null,
                ]
            ],
        ];


        $schema['schema'] = Str::studly(Str::camel($table['TABLE_NAME']));
        $schema['title'] = $schema['schema'] . ' Basic Model';
        $schema['description'] = $table['TABLE_COMMENT'];

        collect($table['columns'])->map(function ($item, $key) use (&$schema, $model) {
            $item = self::toObject($item);

            $schema['property'][$key]['property'] = $item->COLUMN_NAME;

            if (strpos($item->COLUMN_TYPE, 'int') !== false) {
                $schema['property'][$key]['type'] = 'integer';
            } else if (strpos($item->COLUMN_TYPE, 'double') !== false ||
                strpos($item->COLUMN_TYPE, 'float') !== false ||
                strpos($item->COLUMN_TYPE, 'decimal') !== false ||
                strpos($item->COLUMN_TYPE, 'numeric') !== false
            ) {
                $schema['property'][$key]['type'] = 'float';
            } else if (strpos($item->COLUMN_TYPE, 'text') !== false ||
                strpos($item->COLUMN_TYPE, 'char') !== false) {
                $schema['property'][$key]['type'] = 'string';
            } else if (strpos($item->COLUMN_TYPE, 'time') !== false) {
                $schema['property'][$key]['type'] = 'dateTime';
            } else if (strpos($item->COLUMN_TYPE, 'date') !== false) {
                $schema['property'][$key]['type'] = 'date';
            } else if (strpos($item->COLUMN_TYPE, 'json') !== false) {
                $schema['property'][$key]['type'] = 'object';
            }

            $schema['property'][$key]['default'] = $item->COLUMN_DEFAULT;

            if ($model) {
                $tmp = $item->COLUMN_NAME;
                $schema['property'][$key]['example'] = $model->$tmp;
            }

            $schema['property'][$key]['nullable'] = $item->IS_NULLABLE == "YES" ? true : false;

            if (!$schema['property'][$key]['nullable']) {
                $schema['required'][] = $item->COLUMN_NAME;
            }

            $schema['property'][$key]['deprecated'] = false;
            $schema['property'][$key]['readOnly'] = false;
            $schema['property'][$key]['description'] = $item->COLUMN_COMMENT;

        });

        $response[] = "@OA\Schema(\n";
        $response[] = $this->tabStr(1) . 'schema=' . self::valueView($schema['schema']) . ",\n";
        $response[] = $this->tabStr(1) . 'title=' . self::valueView($schema['title']) . ",\n";
        $response[] = $this->tabStr(1) . 'description=' . self::valueView($schema['description']) . ",\n";
        $response[] = $this->tabStr(1) . 'type=' . self::valueView($schema['type']) . ",\n";
        $response[] = $this->tabStr(1) . 'required={"' . implode('","', $schema['required']) . "\"},\n";


        foreach ($schema['property'] as $item) {
            $tmp = $this->tabStr(1) . "@OA\Property(\n";

            array_push($response, $tmp);

            if ($item['type'] != 'object') {
                $tmp = $this->tabStr(2) . 'property=' . self::valueView($item['property']) . ', ';
                $tmp .= 'type=' . self::valueView($item['type']) . ', ';
                $tmp .= 'default=' . self::valueView($item['default']) . ', ';
                $tmp .= 'example=' . self::valueView($item['example']) . ",\n";
                array_push($response, $tmp);

                $tmp = $this->tabStr(2) . 'nullable=' . self::valueView($item['nullable']) . ', ';
                $tmp .= 'readOnly=' . self::valueView($item['readOnly']) . ', ';
                $tmp .= 'deprecated=' . self::valueView($item['deprecated']) . ', ';
                $tmp .= 'description=' . self::valueView($item['description']) . "\n";
                array_push($response, $tmp);
            } else {
                $tmp = $this->tabStr(2) . 'property=' . self::valueView($item['property']) . ', ';
                $tmp .= 'type=' . self::valueView($item['type']) . ",\n";
                array_push($response, $tmp);

                $tmp = $this->tabStr(2) . "@OA\Property()\n";
                array_push($response, $tmp);
            }


            $tmp = $this->tabStr(1) . "),\n";
            array_push($response, $tmp);
        }

        $response[] = ")\n";
        $response = array_map(function ($item) {
            return ' * ' . $item;
        }, $response);
        array_unshift($response, "/** \n");
        array_push($response, " */\n");

        return $this->success(implode("", $response));
    }

    /**
     * 数据可视化操作
     * @param $param
     * @param bool $haveQuotation
     * @param int $indent
     * @param string $symbol
     * @param bool $isPHP
     * @return string
     * @internal param bool $isPhp
     */
    public static function getJsonView($param, bool $haveQuotation = true, int $indent = 4, string $symbol = ":", bool $isPHP = false)
    {
        $response = self::_getJsonView($param, $haveQuotation, $indent, $symbol, $isPHP);
        return implode("\n", $response);
    }

    /**
     * 数据可视化操作
     * @param $param
     * @param bool $haveQuotation
     * @param int $indent
     * @param string $symbol
     * @param bool $isPHP
     * @return array
     * @internal param bool $isPhp
     */
    private static function _getJsonView($param, bool $haveQuotation, int $indent, string $symbol, bool $isPHP)
    {
        // 1. 定义变量
        $param = self::toObject($param);
        $response = [];
        $indentStr = '';
        for ($i = 0; $i < $indent; $i++) {
            $indentStr .= ' ';
        }
        // 2. 判断是对象还是数组
        if (is_array($param) || $isPHP) {
            $response[] = "[";
        } else {
            $response[] = "{";
        }
        foreach ($param as $key => $value) {
            // 3. 子元素是否为 复合数据类型
            if (is_array($value) || is_object($value)) {
                $view = self::_getJsonView($value, $haveQuotation, $indent, $symbol, $isPHP);
                if (is_object($param)) {
                    $view[0] = "\"$key\"$symbol " . $view[0];
                }
                $view = array_map(function ($item) use ($indentStr) {
                    return $indentStr . $item;
                }, $view);
                $view[count($view) - 1] .= ',';
                $response = array_merge($response, $view);
            } else if (is_array($param)) {
                // 4. 是否为数组
                $response[] = $indentStr . self::valueView($value) . ',';
            } else if (is_object($param)) {
                // 5. 是否为对象
                $response[] = $indentStr . "\"$key\"{$symbol} " . self::valueView($value) . ",";
            }
        }
        // 6. 去除最后一个元素的逗号
        $response[count($response) - 1] = trim($response[count($response) - 1], ',');
        // 2. 判断是对象还是数组
        if (is_array($param) || $isPHP) {
            $response[] = "]";
        } else {
            $response[] = "}";
        }
        return $response;
    }


    /**
     * 数组转对象
     * @param $param
     * @return mixed
     */
    public static function toObject($param)
    {
        return json_decode(json_encode($param), false);
    }

    /**
     * 数组转对象
     * @param $param
     * @return mixed
     */
    public static function toArray($param)
    {
        return json_decode(json_encode($param), true);
    }

    /**
     * 不同的类型的变量对应的视觉代码
     * @param $param
     * @return string
     */
    public static function valueView($param)
    {
        if (is_string($param)) {
            return '"' . $param . '"';
        } elseif (is_bool($param)) {
            return $param ? 'true' : 'false';
        } elseif (is_null($param)) {
            return 'null';
        } elseif (is_numeric($param)) {
            return $param;
        }

        return null;
    }

    private function tabStr($count = 1)
    {
        $response = '';
        for ($i = 0; $i < $count * 4; $i++) {
            $response .= ' ';
        }
        return $response;
    }
}

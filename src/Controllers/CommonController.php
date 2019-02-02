<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MelodyWen\LaravelDevelopment\Models\Table;

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

        $creates = collect($request['generateDataForm']);

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
}

<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use Illuminate\Http\Request;
use MelodyWen\LaravelDevelopment\Models\Module;
use MelodyWen\LaravelDevelopment\Models\Table;

class ModulesController extends Controller
{
    public function index()
    {
        $modules = Module::with('table_collections.table.columns')->orderBy('sort', 'asc')->get();

        // 如果是多个数据库，有可能会 名字发生冲突
        if (count(config('development.database_schema')) > 1) {
            $modules = collect($modules->toArray())->map(function ($item){
                $item['table_collections'] = collect($item['table_collections'])->map(function($tableCollection){
                    $tableCollection['table']['columns'] = collect( $tableCollection['table']['columns'])->filter(function ($item)use($tableCollection){

                        return $item['TABLE_SCHEMA'] == $tableCollection['table']['TABLE_SCHEMA'];
                    });

                    return $tableCollection;
                });

                return $item;
            });
        }

        return $this->success($modules);
    }

    public function store(Request $request)
    {
        Module::create([
            'collection_name' => $request->collection_name ?: '',
            'sort' => $request->sort ?: 1,
        ]);

        return $this->success();
    }

    public function show($id)
    {
        $module = Module::find($id);

        return $module ? $this->success($module) : $this->fail();
    }

    public function update($id, Request $request)
    {
        $module = Module::find($id);

        if (!$module) {
            return $this->fail();
        }

        $module->update([
            'collection_name' => $request->collection_name ?: '',
            'sort' => $request->sort ?: 1,
        ]);

        return $this->success();
    }

    public function destroy($id)
    {
        $module = Module::find($id);

        if (!$module) {
            return $this->fail();
        }

        $module->table_collections()->delete();
        $module->delete();

        return $this->success();
    }
}

<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use Illuminate\Http\Request;
use MelodyWen\LaravelDevelopment\Models\Module;
use MelodyWen\LaravelDevelopment\Models\TableCollection;

class TableCollectionsController extends Controller
{
    public function index($module)
    {
        $module = Module::with('table_collections')->find($module);

        if ($module) {
            return $this->success($module);
        }

        return $this->fail();
    }

    public function store($module, Request $request)
    {
        $module = Module::find($module);

        if (!$module) {
            return $this->fail();
        }

        $module->table_collections()->create([
            'module_name' => $request->module_name ?: '',
            'sort' => $request->sort ?: 1,
        ]);

        return $this->success();
    }

    public function show($module, $id)
    {
        $tableCollection = TableCollection::with(['module', 'table.columns'])->find($id);

        return $tableCollection ? $this->success($tableCollection) : $this->fail();
    }

    public function update($module, $id, Request $request)
    {
        $tableCollection = TableCollection::find($id);

        if (!$tableCollection) {
            return $this->fail();
        }

        $tableCollection->update([
            'module_name' => $request->module_name ?: '',
            'sort' => $request->sort ?: 1,
        ]);

        return $this->success();
    }

    public function destroy($module, $id)
    {
        TableCollection::destroy($id);

        return $this->success();
    }
}

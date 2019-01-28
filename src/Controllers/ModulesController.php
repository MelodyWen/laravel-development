<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use Illuminate\Http\Request;
use MelodyWen\LaravelDevelopment\Models\Module;

class ModulesController extends Controller
{
    public function index()
    {
        $modules = Module::get();

        return $this->success($modules);
    }

    public function store(Request $request)
    {
        Module::create([
            'module_name' => $request->module_name ?: '',
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
            'module_name' => $request->module_name ?: '',
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

        $module->table_collections()->destroy();
        $module->destroy();

        return $this->success();
    }
}

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
}

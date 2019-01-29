<?php

namespace MelodyWen\LaravelDevelopment\Controllers;


use MelodyWen\LaravelDevelopment\Models\Table;

class CommonController extends Controller
{
    public function all()
    {
        $tables = Table::with('table_collection.module')->get();

        return $this->success($tables);
    }
}

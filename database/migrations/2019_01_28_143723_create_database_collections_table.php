<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatabaseCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('database_collections', function (Blueprint $table) {
            $table->increments('id');
            $table->string('module_name')->default('')->comment('模块名称');
            $table->tinyInteger('type')->default(1)->comment('类型: 1. 表示 模块 2： 表示 table');
            $table->unsignedInteger('father_id')->default(0)->comment('表示模块的id');
            $table->unsignedInteger('sort')->default(1)->comment('序号');
            $table->timestamps();
        });

        DB::statement("alter table `database_collections` comment'数据库字典管理表'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('database_collections');
    }
}

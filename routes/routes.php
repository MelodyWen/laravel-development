<?php


Route::namespace('MelodyWen\LaravelDevelopment\Controllers')->prefix(config('development.route_prefix'))->group(function () {

    // 加载vue 页面
    Route::view('/', 'development::index');

    // 模块 操作
    Route::apiResource('/modules', 'ModulesController');

    // 表集合 操作
    Route::apiResource('/{module}/table-collections', 'TableCollectionsController');

    // 普通操作
    Route::prefix('common')->name('common.')->group(function () {

        // 获取所有的数据表结构
        Route::get('all', 'CommonController@all')->name('all');

        Route::post('mock-data', 'CommonController@mockData')->name('mock.data');

        Route::post('preview-php', 'CommonController@previewPhp')->name('preview.php');
        Route::post('preview-js', 'CommonController@previewJs')->name('preview.js');
        Route::post('preview-yml', 'CommonController@previewYml')->name('preview.yml');
        Route::post('preview-swagger', 'CommonController@previewSwagger')->name('preview.swagger');
    });
});
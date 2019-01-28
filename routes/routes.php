<?php


Route::namespace('MelodyWen\LaravelDevelopment\Controllers')->prefix(config('development.route_prefix'))->group(function () {

    Route::view('/', 'development::index');

    Route::apiResource('/modules', 'ModulesController');

    Route::apiResource('/{module}/table-collections', 'TableCollectionsController');
});


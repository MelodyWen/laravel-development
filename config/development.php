<?php

return [

    // set routes prefix of all request;
    'route_prefix' => 'development',

    // assets  manager about CDN url
    'cdn_assets' => [
        'css' => [
            'bootstrap' => 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css',
            'normalize' => 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css',
            'element_ui' => 'https://cdn.jsdelivr.net/npm/element-ui@2.5.2/lib/theme-chalk/index.css',
            'nprogress' => 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css'
        ],
        'head_js' => [

        ],
        'foot_js' => [
            'bootstrap' => 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js',
            'jquery' => 'https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js',
            'collect' => 'https://cdn.jsdelivr.net/npm/collect.js@4.6.0/build/collect.js',

            'vue' => 'https://cdn.jsdelivr.net/npm/vue@2.5.22/dist/vue.js',
            'element_ui' => 'https://cdn.jsdelivr.net/npm/element-ui@2.5.2/lib/index.js',
            'vue_router' => 'https://unpkg.com/vue-router@2.0.0/dist/vue-router.js',
            'vue_store' => 'https://cdn.jsdelivr.net/npm/vuex@3.1.0/dist/vuex.js',
            'axios' => 'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.js',
            'nprogress' => 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.js',

            'mock' => 'https://cdn.jsdelivr.net/npm/mockjs@1.0.1-beta3/dist/mock.js',
        ],
    ],

    // set database schemas, default using it depending on the env file
    'database_schema' => [
        env('DB_DATABASE', 'laravel')
    ]
];
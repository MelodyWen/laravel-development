<?php

namespace MelodyWen\LaravelDevelopment;

use Illuminate\Support\ServiceProvider;

class DevelopmentServiceProvider extends ServiceProvider
{

    /**
     *
     */
    public function boot()
    {
        $this->bindRoutes();
        $this->bindConfig();
        $this->bindMigrations();
        $this->bindViews();
        $this->bindAssets();
    }


    public function register()
    {

    }


    /**
     * bind route file
     */
    public function bindRoutes()
    {
        $this->loadRoutesFrom(__DIR__ . '/../routes/routes.php');
    }

    /**
     * bind config file
     */
    public function bindConfig()
    {
        $this->publishes([
            __DIR__ . '/../config/development.php' => config_path('development.php'),
        ]);
    }

    /**
     * bind migrations directory
     */
    public function bindMigrations()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }

    /**
     * bind views directory
     */
    public function bindViews()
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'development');
    }

    /**
     * bind resource assets
     */
    public function bindAssets()
    {
        $this->publishes([
            __DIR__ . '/../resources/js' => public_path('vendor/development/js'),
            __DIR__ . '/../resources/css' => public_path('vendor/development/css'),
        ], 'public');
    }
}
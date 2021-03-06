<?php

namespace MelodyWen\LaravelDevelopment\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class TableCollection extends Model
{
    public $table = 'database_collections';

    public $guarded = [];

    const TYPE = 2;

    public static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        static::addGlobalScope('type', function (Builder $builder) {
            $builder->where('type', self::TYPE);
        });

        static::saving(function ($model) {
            $model->type = self::TYPE;
        });
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'father_id');
    }

    public function table()
    {
        return $this->belongsTo(Table::class, 'collection_name', 'TABLE_NAME');
    }
}

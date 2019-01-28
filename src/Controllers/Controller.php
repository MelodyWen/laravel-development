<?php

namespace MelodyWen\LaravelDevelopment\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    /**
     * response success
     * @param array $data
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function success($data = [], $message = 'success')
    {
        return response()->json([
            'status' => 200,
            'message' => $message,
            'data' => $data
        ]);
    }

    /**
     * response error
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function fail($message = 'fail', $status = 400)
    {
        return response()->json([
            'status' => $status,
            'messages' => $message,
            'data' => [],
        ]);
    }
}

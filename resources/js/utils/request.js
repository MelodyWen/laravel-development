let baseUrl = location.href;

baseUrl = baseUrl.substr(0, baseUrl.indexOf('#'));

const service = axios.create({
    baseURL: baseUrl,   // api 的 base_url
    timeout: 5000       // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        response = response.data

        if (response.status >= 400) {
            globalVue.$message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            })

            return Promise.reject(response)
        }

        return response
    },
    error => {
        console.log('err' + error) // for debug
        globalVue.$message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })

        return Promise.reject(error)
    }
);

export default service
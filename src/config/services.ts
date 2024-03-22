export default class ServicesConfig {
    // token 过期时间 （4小时后过期）
    static TOKEN_EXPIRATION_TIME = 1 / 24 * 4

    // 接口请求超时时间 （一分钟）
    static REQUEST_TIMEOUT = 60 * 1000

    // 状态错误
    static STATUS_ERROR = {
        400: '400: 请求出现语法错误 ~',
        403: '403: 服务器拒绝访问 ~',
        404: '404: 请求的资源不存在 ~',
        405: '405: 请求方法未允许 ~',
        408: '408: 网络请求超时 ~',
        500: '500: 服务器内部错误 ~',
        501: '501: 服务器未实现请求功能 ~',
        502: '502: 错误网关 ~',
        503: '503: 服务不可用 ~',
        504: '504: 网关超时 ~',
        505: '505: http版本不支持该请求 ~'
    }

    // 需要退出登录的Code
    static SIGN_OUT_CODE = {
        401: '401: 用户未授权 ~'
    }

    // 请求错误
    static REQUEST_ERROR = {
        'network timeout': '网络请求超时 ~'
    }

    // 重复错误提示是否开启
    static CLOSE_REPEAT_ERROR_MESSAGE = true
}

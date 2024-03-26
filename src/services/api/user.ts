import { alovaInstance } from '@/services/request/serves/mock'

// 用户相关的Api
export abstract class UserApi {
    // 密码登录
    static passwordLogin = (data: UserModel.PasswordLoginParams) => alovaInstance.Post<Result<null,UserModel.PasswordLoginModel>>('/passwordLogin',data)

    // 获取用户信息
    static getUserinfo = () => alovaInstance.Get<Result<UserModel.UserDetailsModel>>('/getUserinfo')

    // 获取用户路由
    static getRoutes = () => alovaInstance.Get<Result<UserModel.UserRoutesModel>>('/getRoutes')

    // 退出登录
    static signOut = () => alovaInstance.Get<Result>('/signOut')
}

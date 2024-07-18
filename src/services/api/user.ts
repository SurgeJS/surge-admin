import fakeAxiosInstance from '@/services/request/serves/fake'

// 用户相关的Api
export abstract class UserApi {
    // 密码登录
    static passwordLogin = (data: UserModel.PasswordLoginParams) =>
        fakeAxiosInstance.post<UserModel.PasswordLoginModel>('/passwordLogin', data)

    // 获取用户信息
    static getUserinfo = () => fakeAxiosInstance.get<UserModel.UserDetailsModel>('/getUserinfo')

    // 获取用户路由
    static getRoutes = () => fakeAxiosInstance.get<UserModel.UserRoutesModel>('/getRoutes')

    // 退出登录
    static signOut = () => fakeAxiosInstance.get('/signOut')
}

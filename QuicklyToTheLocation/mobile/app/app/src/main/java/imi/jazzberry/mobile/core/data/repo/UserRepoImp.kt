package imi.jazzberry.mobile.core.data.repo

import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.data.dto.user.UserRegisterDto
import imi.jazzberry.mobile.core.data.remote.AuthApi
import imi.jazzberry.mobile.core.data.remote.UserApi
import imi.jazzberry.mobile.core.domain.model.user.UserRegisterModel
import imi.jazzberry.mobile.core.domain.repo.UserRepo
import imi.jazzberry.mobile.core.util.Resource
import imi.jazzberry.mobile.core.util.auth.Auth
import javax.inject.Inject

class UserRepoImp @Inject constructor(
    private val userApi: UserApi,
    private val authApi: AuthApi,
) : UserRepo {

    override suspend fun getUser(id: Int): Resource<UserProfileDto> {
        return Auth.maintainTokens(userApi.getUser(id), suspend {authApi.refreshAccessToken()})
    }

    override suspend fun register(data: UserRegisterModel): Resource<Unit> {
        return userApi.register(UserRegisterDto.from(data))
    }
}
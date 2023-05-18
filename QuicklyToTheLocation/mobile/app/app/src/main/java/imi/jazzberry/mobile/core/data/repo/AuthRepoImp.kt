package imi.jazzberry.mobile.core.data.repo

import imi.jazzberry.mobile.core.data.dto.user.UserLoginDto
import imi.jazzberry.mobile.core.data.remote.AuthApi
import imi.jazzberry.mobile.core.domain.model.auth.AuthTokensModel
import imi.jazzberry.mobile.core.domain.model.user.UserLoginModel
import imi.jazzberry.mobile.core.domain.repo.AuthRepo
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class AuthRepoImp @Inject constructor(
    private val authApi: AuthApi
) : AuthRepo {

    override suspend fun login(data: UserLoginModel): Resource<AuthTokensModel> {

        val dto = UserLoginDto(data.user, data.pass)
        val res = authApi.login(dto)

        return when(res) {
            is Resource.Success -> Resource.Success(AuthTokensModel.from(res.data))
            is Resource.Error -> Resource.Error(res.msg)
            else -> Resource.Loading()
        }
    }

}
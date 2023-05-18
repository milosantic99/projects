package imi.jazzberry.mobile.core.data.remote

import imi.jazzberry.mobile.core.data.dto.auth.AuthTokensDto
import imi.jazzberry.mobile.core.data.dto.user.UserLoginDto
import imi.jazzberry.mobile.core.util.Resource

interface AuthApi {

    suspend fun login(data: UserLoginDto): Resource<AuthTokensDto>
    suspend fun refreshAccessToken(): Resource<AuthTokensDto>

}
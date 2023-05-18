package imi.jazzberry.mobile.core.domain.model.auth

import imi.jazzberry.mobile.core.data.dto.auth.AuthTokensDto

data class AuthTokensModel(
    val accessToken: String,
    val refreshToken: String
) {
    companion object {
        fun from(data: AuthTokensDto) = AuthTokensModel(
            accessToken = data.access_token,
            refreshToken = data.refresh_token
        )
    }
}

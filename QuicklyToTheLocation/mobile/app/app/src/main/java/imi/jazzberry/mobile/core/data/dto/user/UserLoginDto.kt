package imi.jazzberry.mobile.core.data.dto.user

import imi.jazzberry.mobile.core.domain.model.user.UserLoginModel

data class UserLoginDto(
    val username: String,
    val password: String
) {
    companion object {
        fun from(model: UserLoginModel) = UserLoginDto(
            username = model.user,
            password = model.pass
        )
    }
}

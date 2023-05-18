package imi.jazzberry.mobile.core.data.dto.user

import imi.jazzberry.mobile.core.domain.model.user.UserRegisterModel
import kotlinx.serialization.Serializable

@Serializable
data class UserRegisterDto(
    val username: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val email: String,
) {
    companion object {
        fun from(data: UserRegisterModel) = UserRegisterDto(
            username = data.user,
            password = data.pass,
            firstName = data.fname,
            lastName = data.lname,
            email = data.email
        )
    }
}

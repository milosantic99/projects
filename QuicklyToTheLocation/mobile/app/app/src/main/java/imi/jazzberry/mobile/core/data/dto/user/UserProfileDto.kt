package imi.jazzberry.mobile.core.data.dto.user

import kotlinx.serialization.Serializable

@Serializable
data class UserProfileDto(
    val id: Int = 0,
    val username: String = "",
    val email: String = "",
    val password: String = "",
    val firstName: String = "",
    val lastName: String = ""
)
package imi.jazzberry.mobile.core.domain.model.user

data class UserRegisterModel(
    val user: String = "",
    val pass: String = "",
    val fname: String = "",
    val lname: String = "",
    val email: String = "",
)
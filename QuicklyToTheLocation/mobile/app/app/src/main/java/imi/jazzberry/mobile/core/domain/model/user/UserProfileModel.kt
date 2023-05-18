package imi.jazzberry.mobile.core.domain.model.user

import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto

data class UserProfileModel(
    val username: String = "",
    val fullName: String = "",
    val description: String = "",
    val profilePictureUrl: String = "", // OR base64 encoded picture

    val postsCount: Int = 0,
    val reputation: Int = 0,
    val followers: Int = 0,

) {
    companion object {
        fun from(data: UserProfileDto) = UserProfileModel(
            username = data.username,
            fullName = "${data.firstName} ${data.lastName}"
        )
    }
}
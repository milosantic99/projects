package imi.jazzberry.mobile.core.domain.model

import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.domain.model.user.UserProfileModel

data class ChatBriefModel(
    val id: Long, // ?
    val lastMsg: String,
    val lastMsgTime: String,
    val unreadMsgCount: Int,

    val userId: Long, // ?
    val username: String,
    val userPictureUrl: String, // OR user picture base64
) {
    companion object {

        fun from(){}

        fun mock() = ChatBriefModel(
            id = 123,
            lastMsg = "",
            lastMsgTime = "2022-11-19T21:53",
            unreadMsgCount = 7,
            userId = 32,
            username = "elmerdavez",
            userPictureUrl = ""
        )
    }
}

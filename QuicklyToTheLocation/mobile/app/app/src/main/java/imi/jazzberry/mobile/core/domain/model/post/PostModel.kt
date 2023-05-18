package imi.jazzberry.mobile.core.domain.model.post

data class PostModel(
    val id: Long,
    val imageUrls: List<String>,
    val description: String,
    val likes: Int,
    val dislikes: Int,
    val date: String, // format "2022-12-28T23:00"

    val userId: Long,
    val username: String,
    val userPictureUrl: String,

) {
    companion object {

        fun from(){}

        fun mock() = PostModel (
            id = 123,
            imageUrls = listOf("", ""),
            description = "Beautiful location it is.",
            likes = 132,
            dislikes = 13,
            date = "2022-12-28T23:00",
            userId = 32,
            username = "elmerdavez",
            userPictureUrl = ""
        )
    }
}


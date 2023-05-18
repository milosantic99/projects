package imi.jazzberry.mobile.core.data.dto.post

data class PostDto(
    val id: Long,
    val imageUrls: List<String>,
    val description: String,
    val likes: Int,
    val dislikes: Int,
    val date: String,

    val locationId: Long,

    val userId: Long,
    val username: String,
)

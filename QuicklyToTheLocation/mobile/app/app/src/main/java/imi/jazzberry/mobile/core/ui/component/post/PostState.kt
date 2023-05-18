package imi.jazzberry.mobile.core.ui.component.post

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import imi.jazzberry.mobile.core.domain.model.post.PostModel
import kotlin.random.Random

data class PostState(
    val pictureUri: MutableState<String> = mutableStateOf(""),
    val likes: MutableState<Int> = mutableStateOf(0),
    val dateOfPosting: MutableState<String> = mutableStateOf(""),
    val rate: MutableState<Float> = mutableStateOf(0f),
    val dislikes: MutableState<Int> = mutableStateOf(0),
    val location: MutableState<String> = mutableStateOf(""),
    val username: MutableState<String> = mutableStateOf(""),
    val userID: MutableState<Long> = mutableStateOf(0),
    val description: MutableState<String> = mutableStateOf(""),
    val locationID: MutableState<Long> = mutableStateOf(0),
    val pfpUri: MutableState<String> = mutableStateOf("")
) {
    companion object {
        fun from(model: PostModel) = PostState(
                dateOfPosting = mutableStateOf(model.date),
                description = mutableStateOf(model.description),
                likes = mutableStateOf(model.likes),
                dislikes = mutableStateOf(model.dislikes),
                // Zakomentarisano jer jos ne postoji
                /*rate = mutableStateOf(model.rating),
                location = mutableStateOf(model.location),
                locationID = mutableStateOf(model.locationID),*/
                username = mutableStateOf(model.username),
                pfpUri = mutableStateOf(model.userPictureUrl),
//                pictureUri = mutableStateOf(model.imageUrls.first()),
//                pfpUri = mutableStateOf("https://picsum.photos/seed/${Random.nextInt()}/25/25"),
                pictureUri = mutableStateOf("https://picsum.photos/seed/${Random.nextInt()}/300/200"),
                userID = mutableStateOf(model.userId)
            )
    }
}
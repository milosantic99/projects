package imi.jazzberry.mobile.core.ui.component.profile

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

data class UserProfileState(
    val username: MutableState<String> = mutableStateOf(""),
    val reputation: MutableState<Int> = mutableStateOf(0),
    val followers: MutableState<Int> = mutableStateOf(0),
    val posts: MutableState<Int> = mutableStateOf(0),
    val firstName: MutableState<String> = mutableStateOf(""),
    val description: MutableState<String> = mutableStateOf(""),
    val pfpUri: MutableState<String> = mutableStateOf(""),
    val lastName: MutableState<String> = mutableStateOf("")
        )
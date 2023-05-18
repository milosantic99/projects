package imi.jazzberry.mobile.core.ui.component.comments

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

data class CommentState (
    val username: MutableState<String> = mutableStateOf(""),
    val userID: MutableState<Int> = mutableStateOf(0),
    val comm: MutableState<String> = mutableStateOf(""),
    val pfpUri: MutableState<String> = mutableStateOf(""),
    val level: MutableState<Int> = mutableStateOf(0)
)
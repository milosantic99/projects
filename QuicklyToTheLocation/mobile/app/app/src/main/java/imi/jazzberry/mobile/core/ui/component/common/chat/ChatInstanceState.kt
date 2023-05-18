package imi.jazzberry.mobile.core.ui.component.common.chat

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

data class ChatInstanceState (
    val username: MutableState<String> = mutableStateOf(""),
    val lastMessage: MutableState<String> = mutableStateOf(""),
    val timeSent: MutableState<String> = mutableStateOf(""),
    val pfpUri: MutableState<String> = mutableStateOf("")
)
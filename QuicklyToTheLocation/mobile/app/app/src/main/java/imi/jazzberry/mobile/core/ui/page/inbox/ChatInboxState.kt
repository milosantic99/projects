package imi.jazzberry.mobile.core.ui.page.inbox

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import imi.jazzberry.mobile.core.ui.component.common.chat.ChatInstanceState

data class ChatInboxState (
    val chats : MutableCollection<ChatInstanceState> = mutableListOf()
        )
package imi.jazzberry.mobile.core.ui.page.inbox

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.ui.component.common.chat.ChatInstanceState
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ChatInboxViewModel @Inject constructor(

//    private val getUserUseCase: GetUserUseCase

) : ViewModel() {

    // State
    var state = mutableStateOf(ChatInboxState())
//    var state: ChatInboxState = _state

    //State Shortcuts
//    val user get() = state.value.username.value
//    val foll get() = state.value.followers.value.toString()
//    val posts get() = state.value.posts
//    val rep get() = state.value.reputation.value.toString()
//    val desc get() = state.value.description.value
//    val name get() = state.value.fullname.value

    operator fun invoke(id: Int) {
        viewModelScope.launch {
            getUserProfile(id)
            Log.d("Chat Inbox (Use Case)", "In coroutine: blocking function call ended.")
        }
        Log.d("Chat Inbox (Use Case)", "Coroutine started.")
    }

    private suspend fun getUserProfile(id: Int) {
//        val res = getUserUseCase(id)
//        when(res) {
//            is Resource.Success -> _state.value = res.data
//            is Resource.Error -> Log.d(Dbg.tag(this), res.msg.message)
//            is Resource.Loading -> {
//                if (res.data != null)
//                    _state.value = res.data!!
//            }
        (ChatInboxState(mutableListOf<ChatInstanceState>(ChatInstanceState(username = mutableStateOf("tiny_lightball"), lastMessage = mutableStateOf("Hello ^^"), timeSent = mutableStateOf("1:00am"), pfpUri = mutableStateOf("")),
            ChatInstanceState(username = mutableStateOf("crystalpower"), lastMessage =mutableStateOf( "And go there with you"), timeSent = mutableStateOf("2:33pm"), pfpUri = mutableStateOf(""))
        ))).also { state = mutableStateOf(it)  }
    }
}

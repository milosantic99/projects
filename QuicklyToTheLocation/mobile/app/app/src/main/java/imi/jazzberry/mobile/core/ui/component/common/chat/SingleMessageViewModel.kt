package imi.jazzberry.mobile.core.ui.component.common.chat

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class SingleMessageViewModel @Inject constructor(

//    private val getUserUseCase: GetUserUseCase

) : ViewModel() {

    // State
    private val _state = mutableStateOf(SingleMessageState())
    val state: State<SingleMessageState> = _state

    //State Shortcuts
    val user get() = state.value.username.value
    val msg get() = state.value.message.value
    val time get() = state.value.timeSent.value
    val pfp get() = state.value.pfpUri.value

    operator fun invoke(id: Int) {
        viewModelScope.launch {
            getUserProfile(id)
            Log.d("User Profile (Use Case)", "In coroutine: blocking function call ended.")
        }
        Log.d("User Profile (Use Case)", "Coroutine started.")
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

        state.value.timeSent.value = "3:35pm"
    }
}


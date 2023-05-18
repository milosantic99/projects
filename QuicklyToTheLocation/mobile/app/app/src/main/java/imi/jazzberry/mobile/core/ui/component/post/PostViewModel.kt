package imi.jazzberry.mobile.core.ui.component.post

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import imi.jazzberry.mobile.core.domain.usecase.post.GetPostUseCase
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.launch
import javax.inject.Inject

class PostViewModel @Inject constructor(

    private val getPostUseCase: GetPostUseCase

) : ViewModel() {

    //State
    private val _state = mutableStateOf(PostState())
    val state: State<PostState> = _state

    //State Shortcuts
    val user get() = state.value.username.value
    val likes get() = state.value.likes.value
    val rate get() = state.value.rate.value
    val dislikes get() = state.value.dislikes.value
    val desc get() = state.value.description.value
    val location get() = state.value.location.value
    val date get() = state.value.dateOfPosting.value
    val userID get() = state.value.userID.value
    val locationID get() = state.value.locationID.value
    val pictureUri get() = state.value.pictureUri.value
    val pfpUri get() = state.value.pictureUri.value

    operator fun invoke(id: Int) {
        viewModelScope.launch {
            getPost(id)
            Log.d("User Profile (Use Case)", "In coroutine: blocking function call ended.")
        }
        Log.d("User Profile (Use Case)", "Coroutine started.")
    }

    private suspend fun getPost(id: Int) {
        val res = getPostUseCase(id)
        when (res) {
            is Resource.Success -> {
                _state.value = PostState.from(res.data)
            }
            is Resource.Error -> Log.d(Dbg.tag(this), res.msg.message)
            is Resource.Loading -> {}
        }
    }
}

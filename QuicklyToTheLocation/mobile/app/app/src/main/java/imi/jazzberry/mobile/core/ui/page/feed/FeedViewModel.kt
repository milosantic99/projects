package imi.jazzberry.mobile.core.ui.page.feed

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.usecase.post.GetPostsUseCase
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FeedViewModel @Inject constructor(

    private val getPostsUseCase: GetPostsUseCase

) : ViewModel() {

    // State
    var state = mutableStateOf(FeedState())

    operator fun invoke(id: Int) {
        viewModelScope.launch {
            getUserProfile(id)
            Log.d("Feed (Use Case)", "In coroutine: blocking function call ended.")
        }
        Log.d("Feed (Use Case)", "Coroutine started.")
    }

    private suspend fun getUserProfile(id: Int) {
        val res = getPostsUseCase(id)
        when (res) {
            is Resource.Success -> state.value = FeedState.from(res.data)
            is Resource.Error -> Log.d(Dbg.tag(this), res.msg.message)
            is Resource.Loading -> {}
        }
    }
}
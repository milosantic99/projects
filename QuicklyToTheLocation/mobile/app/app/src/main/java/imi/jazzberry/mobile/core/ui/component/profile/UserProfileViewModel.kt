package imi.jazzberry.mobile.core.ui.component.profile

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.usecase.user.GetUserProfileUseCase
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class UserProfileViewModel @Inject constructor(

    private val getUserUseCase: GetUserProfileUseCase

) : ViewModel() {

    // State
    private val _state = mutableStateOf(UserProfileState())
    val state: State<UserProfileState> = _state

    //State Shortcuts
    val user get() = state.value.username.value
    val foll get() = state.value.followers.value.toString()
    val posts get() = state.value.posts
    val rep get() = state.value.reputation.value.toString()
    val desc get() = state.value.description.value
    val name get() = state.value.firstName.value

    operator fun invoke(id: Int) {
        viewModelScope.launch {
            getUserProfile(id)
            Log.d("User Profile (Use Case)", "In coroutine: blocking function call ended.")
        }
        Log.d("User Profile (Use Case)", "Coroutine started.")
    }

    private suspend fun getUserProfile(id: Int) {
        val res = getUserUseCase(id)
        when (res) {
            is Resource.Success -> {
                state.value.posts.value = res.data.postsCount
                state.value.description.value = res.data.description
                state.value.reputation.value = res.data.reputation
                state.value.followers.value = res.data.followers
                state.value.firstName.value = res.data.fullName
                state.value.username.value = res.data.username
                state.value.pfpUri.value = res.data.profilePictureUrl
            }
            is Resource.Error -> Log.d(Dbg.tag(this), res.msg.message)
            is Resource.Loading -> {}
        }
    }
    }


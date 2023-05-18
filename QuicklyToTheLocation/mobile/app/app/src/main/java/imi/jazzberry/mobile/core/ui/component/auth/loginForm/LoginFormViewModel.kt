package imi.jazzberry.mobile.core.ui.component.auth.loginForm

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.model.user.UserLoginModel
import imi.jazzberry.mobile.core.domain.usecase.user.LoginUseCase
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginFormViewModel @Inject constructor(

    private val loginUseCase: LoginUseCase

) : ViewModel() {

    // State
    private val _state = mutableStateOf(LoginFormState())
    val state: State<LoginFormState> get() = _state

    // State Shortcuts (Getters)
    val user get() = state.value.user
    val pass get() = state.value.pass
    val succ get() = state.value.success

    fun login() {
        viewModelScope.launch {
            val res = loginUseCase(UserLoginModel(user.value, pass.value))
            when (res) {
                is Resource.Success -> cbLogin.success()
                is Resource.Error -> cbLogin.error(res.msg.message)
                is Resource.Loading -> {}
            }
        }
    }

    // Callbacks
    private val cbLogin = object {
        val success = {
            state.value.success.value = true
            Log.d(Dbg.tag<LoginFormViewModel>(), "Sve je u redu!")
        }
        val error = { msg: String ->
            Log.d(Dbg.tag<LoginFormViewModel>(), "Nesto ne valja!\nPoruka: $msg")
        }
    }

}
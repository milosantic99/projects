package imi.jazzberry.mobile.core.ui.component.auth.registerForm

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.model.user.UserRegisterModel
import imi.jazzberry.mobile.core.domain.usecase.user.RegisterUseCase
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RegisterFormViewModel @Inject constructor(
    private val registerUseCase: RegisterUseCase
) : ViewModel(){
    //State
    private val _state = mutableStateOf(RegisterFormState())
    val state: State<RegisterFormState> get() = _state

    //State Getters
    val user get() = state.value.user
    val pass get() = state.value.pass
    val email get() = state.value.email
    val fnam get() = state.value.firstname
    val lnam get() = state.value.lastname
    val succ get() = state.value.success

    fun register(){
        viewModelScope.launch {
            val res = registerUseCase(UserRegisterModel(user=user.value,pass=pass.value,email=email.value, fname = fnam.value, lname=lnam.value))
            when (res){
                is Resource.Success -> cbRegister.success()
                is Resource.Error -> cbRegister.error(res.msg.message)
                is Resource.Loading -> {}
            }
        }
    }

    //Callbacks
    private val cbRegister = object{
        val success = {
            succ.value = true
            Log.d(Dbg.tag<RegisterFormViewModel>(), "Sve je u redu!")
        }
        val error = { msg: String ->
            succ.value = false
            Log.d(Dbg.tag<RegisterFormViewModel>(), "Nesto ne valja!\nPoruka: $msg")
        }
    }
}
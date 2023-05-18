package imi.jazzberry.mobile.core.ui.page.auth

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.usecase.user.GetUserProfileUseCase
import imi.jazzberry.mobile.core.util.auth.Auth
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

@HiltViewModel
class AuthFormViewModel @Inject constructor(
    private val getUserUseCase: GetUserProfileUseCase
) : ViewModel() {

    fun checkUserAuth(ifLoggedIn: () -> Unit) {
        viewModelScope.launch {
            if (Auth.getUserData() != null) {
                ifLoggedIn()
            }
        }
    }

}
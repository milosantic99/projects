package imi.jazzberry.mobile.core.ui.component.auth.loginForm

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

data class LoginFormState(
    val user: MutableState<String> = mutableStateOf(""),
    val pass: MutableState<String> = mutableStateOf(""),
    val success: MutableState<Boolean> = mutableStateOf(false)
)

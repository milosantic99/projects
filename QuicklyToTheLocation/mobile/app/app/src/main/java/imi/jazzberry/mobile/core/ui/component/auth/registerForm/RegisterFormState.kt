package imi.jazzberry.mobile.core.ui.component.auth.registerForm

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf

data class RegisterFormState (
    val user: MutableState<String> = mutableStateOf(""),
    val pass: MutableState<String> = mutableStateOf(""),
    val email: MutableState<String> = mutableStateOf(""),
    val firstname: MutableState<String> = mutableStateOf(("")),
    val lastname: MutableState<String> = mutableStateOf(""),
    val success: MutableState<Boolean> = mutableStateOf(false)
)

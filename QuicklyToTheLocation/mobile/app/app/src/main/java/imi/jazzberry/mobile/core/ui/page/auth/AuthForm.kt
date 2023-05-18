package imi.jazzberry.mobile.core.ui.page.auth

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.R
import imi.jazzberry.mobile.core.ui.component.auth.authSwitcher.AuthSwitcher
import imi.jazzberry.mobile.core.ui.component.auth.loginForm.LoginForm
import imi.jazzberry.mobile.core.ui.component.auth.registerForm.RegisterForm
import imi.jazzberry.mobile.core.ui.page.destinations.CurrentUserProfileDestination

@Destination(start=true)
@Composable
fun AuthForm(
    navigator: DestinationsNavigator
){
    val vm: AuthFormViewModel = hiltViewModel()
    vm.checkUserAuth {
        navigator.navigate(CurrentUserProfileDestination)
    }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        var toLogin = remember { mutableStateOf(true) }

        Spacer(modifier = Modifier.padding(20.dp))
        Image(painter = painterResource(R.drawable.logo), contentDescription = null)
        Spacer(modifier = Modifier.padding(15.dp))
        if (toLogin.value) {
            // >> Login Form
            LoginForm( onConfirm = {navigator.navigate(CurrentUserProfileDestination)})
        } else {
            // >> Register Form
            RegisterForm(onConfirm = {navigator.navigate(CurrentUserProfileDestination)})

        }
        Spacer(modifier = Modifier.padding(20.dp))

        AuthSwitcher(
            toLog = toLogin.value,
            onSwitch = {
                toLogin.value = it
            }
        )

        Spacer(modifier = Modifier.padding(10.dp))

    }

}


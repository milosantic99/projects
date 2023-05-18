package imi.jazzberry.mobile.core.ui.component.auth.authSwitcher


import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp


@Composable
fun AuthSwitcher(toLog: Boolean, onSwitch: (Boolean) -> Unit) {

    var toLogin = remember{ mutableStateOf(toLog) }

    val btnW = 150.dp
    val btnH = 50.dp

    Row(
        horizontalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxWidth()
            .height(btnH)
    ) {

        // Login Button
        Button(
            enabled = !toLogin.value,
            modifier = Modifier
                .width(btnW)
                .fillMaxHeight(),
            onClick = {
                toLogin.value = true
                onSwitch(toLogin.value)
            }/*,
            colors = ButtonDefaults.buttonColors( Opal )*/
        ) {
            Text(text = "Login")
        }

        // Register Button
        Button(
            enabled = toLogin.value,
            modifier = Modifier
                .width(btnW)
                .fillMaxHeight(),
            onClick = {
                toLogin.value = false
                onSwitch(toLogin.value)
            }/*,
            colors = ButtonDefaults.buttonColors( Opal )*/
        ) {
            Text(text = "Register")
        }
    }
}

package imi.jazzberry.mobile.core.ui.component.auth.loginForm

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import imi.jazzberry.mobile.core.SharedData

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginForm(
    vm: LoginFormViewModel = hiltViewModel(),
    onConfirm: () -> Unit
) {

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = "Log In", fontSize = 30.sp)
        Spacer(modifier = Modifier.padding(top = 25.dp))
        //Username Input Field
        TextField(
            value = vm.user.value,
            onValueChange = { s -> vm.user.value = s },
            label = { Text(text = "Username")
            }
        )
        Spacer(modifier = Modifier.padding(top = 5.dp))
        //Password Input Field
        TextField(
            value = vm.pass.value,
            onValueChange = { s -> vm.pass.value = s },
            label = { Text(text = "Password") }
        )
        Spacer(modifier = Modifier.padding(top = 5.dp))
        Button(onClick = { vm.login() }/*,
            colors = ButtonDefaults.buttonColors(Jazzberry )*/) {
            Text(text = "Login")
        }
        if (vm.succ.value){
            SharedData.username=vm.user.value
            onConfirm()
        }
    }

}
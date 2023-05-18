package imi.jazzberry.mobile.core.ui.component.common.inputs

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import imi.jazzberry.mobile.core.SharedData
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.common.chat.SingleMessageViewModel

@ExperimentalMaterial3Api
@Composable
fun InputBarChat(
    viewModel: SingleMessageViewModel = hiltViewModel()
){
    viewModel.invoke(1)
//    var message = mutableStateOf("")
    viewModel.state.value.username.value = SharedData.username

    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween){
        Spacer(modifier = Modifier.padding(vertical = 5.dp))
        TextField(value = viewModel.state.value.message.value, onValueChange = { s -> viewModel.state.value.message.value = s }, placeholder = {Text(text="Type a message")} )
        Card(shape = CircleShape, modifier = Modifier
            .padding(8.dp)
            .size(45.dp)
            .clickable {
                viewModel.state.value.timeSent.value = "11:15am"
                viewModel.state.value.pfpUri.value = SharedData.pfpUri
            }){
            Icon(painter = painterResource(id = GlobalUIProperties.iconSend), contentDescription = "send")
        }
    }
}
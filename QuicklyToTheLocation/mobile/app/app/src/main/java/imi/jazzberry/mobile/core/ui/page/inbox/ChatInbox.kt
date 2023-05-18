package imi.jazzberry.mobile.core.ui.page.inbox

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.hilt.navigation.compose.hiltViewModel
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.common.chat.ChatInstance

@Destination
@Composable
fun ChatInbox(
    navigator: DestinationsNavigator,
    viewModel : ChatInboxViewModel = hiltViewModel()
){
    Column{
        //Level 0
//add this | to modifier in >>Level Page Container<< for scrolling options (research more)
//         v
//.verticalScroll(rememberScrollState()).weight(weight =1f, fill = false)
        viewModel.invoke(1)
        Column(modifier = Modifier.fillMaxHeight(fraction = GlobalUIProperties.pageContainerSize)){
            //Level Page Container
//            Text(text = "Chatbox")
            for (i in viewModel.state.value.chats){
                ChatInstance(username = i.username.value, lastMsg = i.lastMessage.value, time = i.timeSent.value, pfpUri = i.pfpUri.value, navigator = navigator)
            }
        }
    }
}


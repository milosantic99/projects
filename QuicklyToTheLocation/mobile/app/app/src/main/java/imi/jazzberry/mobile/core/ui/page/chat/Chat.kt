package imi.jazzberry.mobile.core.ui.page.chat

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.common.inputs.InputBarChat
import imi.jazzberry.mobile.core.ui.component.common.topBar.TopBar
import imi.jazzberry.mobile.core.ui.page.destinations.ChatInboxDestination
import imi.jazzberry.mobile.core.ui.page.destinations.CurrentUserProfileDestination

@OptIn(ExperimentalMaterial3Api::class)
@Destination
@Composable
fun Chat(
    navigator: DestinationsNavigator,
    username: String
){
    Column{
        //Level 0
//add this | to modifier in >>Level Page Container<< for scrolling options (research more)
//         v
//.verticalScroll(rememberScrollState()).weight(weight =1f, fill = false)
        Column(modifier = Modifier.fillMaxHeight(fraction = GlobalUIProperties.pageContainerSize)){
            //Level Page Container
            Text(text = "Inside Chat")

        }
        InputBarChat()
//        TextField(
//            value = vm.user.value,
//            onValueChange = { s -> vm.user.value = s },
//            label = { Text(text = "Username")
//            }
//        )
    }
}

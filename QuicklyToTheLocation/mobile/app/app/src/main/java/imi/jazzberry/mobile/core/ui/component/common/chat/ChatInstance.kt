package imi.jazzberry.mobile.core.ui.component.common.chat

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.imageDisplays.ProfileImage
import imi.jazzberry.mobile.core.ui.page.destinations.ChatDestination

@Composable
fun ChatInstance(
    username: String,
    lastMsg: String,
    time: String,
    pfpUri: String,
    navigator: DestinationsNavigator
){
    Row(modifier = Modifier.height(80.dp).clickable { navigator.navigate(ChatDestination(username)) }) {
        ProfileImage(pfpUri, 50)
        Column(){
            Spacer(modifier = Modifier.padding(vertical = 5.dp))
            Row(){
                Text(text = username, fontWeight = FontWeight.Bold)
            }
            Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()){
                Column() {
                    Spacer(modifier = Modifier.padding(2.dp))
                    Text(text = lastMsg, fontWeight = FontWeight.Medium)
                }
                Column() {
                    Text(text = time, fontWeight = FontWeight.Light)
                }
            }
        }
    }
}
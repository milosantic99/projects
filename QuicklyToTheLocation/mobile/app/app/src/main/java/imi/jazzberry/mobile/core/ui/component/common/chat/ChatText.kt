package imi.jazzberry.mobile.core.ui.component.common.chat

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import imi.jazzberry.mobile.core.ui.component.common.imageDisplays.ProfileImage

@Composable
fun ChatText(
    username : String = "",
    msg : String = "",
    pfp : String = ""
){

    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween){
        Card(shape = CircleShape, modifier = Modifier
            .padding(8.dp)
            .size(45.dp)
            ){
            ProfileImage(imgUri = pfp, size = 50)
        }
        Column(){
            Text(text = username)
            Spacer(modifier = Modifier.padding(2.dp))
            Text(text = msg)
        }

    }
}
package imi.jazzberry.mobile.core.ui.component.post

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import coil.compose.rememberImagePainter
import imi.jazzberry.mobile.core.ui.component.common.imageDisplays.ProfileImage

@Composable
fun Post(
//    vm : PostViewModel = hiltViewModel(),
    vm : PostState,
    modifier: Modifier = Modifier
){
    Card(modifier = modifier, colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant
    ), shape = MaterialTheme.shapes.large) {
        Image(painter = rememberImagePainter(vm.pictureUri.value), contentDescription = "img", modifier = Modifier
            .clip(MaterialTheme.shapes.large)
            .fillMaxWidth()
            .aspectRatio(3f / 2f))
        Row(modifier = Modifier.padding(16.dp)) {
            Column(){
                ProfileImage(imgUri = vm.pfpUri.value, size = 25)
            }
            Column() {
                Text(text = vm.username.value)
                Spacer(modifier = Modifier.height(8.dp))
                Text(text = vm.description.value)
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}
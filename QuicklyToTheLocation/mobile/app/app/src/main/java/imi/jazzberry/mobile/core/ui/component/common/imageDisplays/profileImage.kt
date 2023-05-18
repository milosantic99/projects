package imi.jazzberry.mobile.core.ui.component.common.imageDisplays

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.rememberImagePainter
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties

@Composable
fun ProfileImage(
    imgUri : String = "",
    size: Int = 75
){
    val imageUri = rememberSaveable{mutableStateOf(imgUri) }
    val painter = rememberImagePainter( if (imageUri.value.isEmpty()){
        GlobalUIProperties.iconUser}else{imageUri})

    val launcher = rememberLauncherForActivityResult(contract = ActivityResultContracts.GetContent()) { uri: Uri? ->
        uri?.let {
            imageUri.value = it.toString()
        }
    }

    Column(modifier = Modifier
        .padding(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Card(shape = CircleShape, modifier = Modifier
            .padding(8.dp)
            .size(size.dp)){
            Image(painter = painter, contentDescription = null, modifier = Modifier
                .wrapContentSize(), contentScale = ContentScale.Crop )
        }

    }
}
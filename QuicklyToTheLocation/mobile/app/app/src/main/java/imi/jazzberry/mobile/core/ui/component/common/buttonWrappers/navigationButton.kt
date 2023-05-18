package imi.jazzberry.mobile.core.ui.component.common.buttonWrappers

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun NavigationButton(
    onClick: () -> Unit,
    painter: Int,
    modifier: Modifier = Modifier,
    isVisible: Boolean = true
) {
    if (!isVisible) return

//    Button(
//        onClick = onClick,
////        colors = ButtonDefaults.buttonColors(Color.Transparent),
//        modifier = Modifier
//            .size(80.dp)
//            .padding(0.dp)
//    ) {
//        Image(
//            painter = painterResource(id = painter),
//            contentDescription = "ico",
//            colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.onSurfaceVariant),
////            modifier = Modifier.padding(0.dp).size(64.dp)
//        )
//    }

    IconButton(
        onClick = onClick,
        colors = IconButtonDefaults.iconButtonColors(),
        modifier = Modifier
            .fillMaxHeight()
    ) {
        Image(
            painter = painterResource(id = painter),
            contentDescription = "ico",
            colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.onSurfaceVariant),
//            modifier = Modifier.padding(0.dp).size(64.dp)
        )
    }
}
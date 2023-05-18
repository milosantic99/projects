package imi.jazzberry.mobile.core.ui.component.common.buttonWrappers

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import imi.jazzberry.mobile.ui.theme.Opal40

@Composable
fun tabButton(
    enabled: Boolean,
    onClick: ()->Unit,
    text: String,
    modifier: Modifier
){
    val btnW = 150.dp
    Column() {
        Button(modifier = modifier.padding(horizontal = 5.dp).fillMaxWidth().width(btnW),enabled = enabled, onClick = onClick, colors = ButtonDefaults.buttonColors(Opal40), shape = RectangleShape) {
            Text(text = text)
        }
    }
}
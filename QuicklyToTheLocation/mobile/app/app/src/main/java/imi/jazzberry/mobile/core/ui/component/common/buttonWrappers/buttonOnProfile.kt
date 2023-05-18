package imi.jazzberry.mobile.core.ui.component.common.buttonWrappers

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import imi.jazzberry.mobile.ui.theme.Opal40

@Composable
fun ButtonOnProfile(
    onClick: ()->Unit,
    displayString: String,
    modifier: Modifier = Modifier
){
    Column(modifier = modifier.height(30.dp)) {
        Button(onClick = onClick, colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary, contentColor = MaterialTheme.colorScheme.onSecondary), contentPadding = PaddingValues(vertical = 6.dp, horizontal = 17.dp)) {
            Text(text = displayString, textAlign = TextAlign.Center)
        }
    }
}
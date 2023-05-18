package imi.jazzberry.mobile.core.ui.component.notif

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import imi.jazzberry.mobile.core.ui.component.common.buttonWrappers.tabButton


@Composable
fun NotificationsSwitcher(chg: Boolean, onSwitch: (Boolean) -> Unit) {

    var changeBtn = remember{ mutableStateOf(chg) }

    val btnW = 150.dp
    val btnH = 50.dp

    Row(
        horizontalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxWidth()
            .height(btnH)
            .fillMaxHeight()
    ) {

        // Following Notif Button
        tabButton(
            enabled = !changeBtn.value,
            modifier = Modifier
                .width(btnW)
                .weight(1f),
            onClick = {
                changeBtn.value = true
                onSwitch(changeBtn.value)
            },
            text = "Following"
        )

        // Reputation Notif Button
        tabButton(
            enabled = changeBtn.value,
            modifier = Modifier
                .width(btnW)
                .weight(1f),
            onClick = {
                changeBtn.value = false
                onSwitch(changeBtn.value)
            },
            text = "Reputation"
        )
    }
}

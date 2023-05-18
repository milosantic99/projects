package imi.jazzberry.mobile.core.ui.component.common.topBar

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import imi.jazzberry.mobile.NavState
import imi.jazzberry.mobile.Page
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.common.buttonWrappers.NavigationButton
import imi.jazzberry.mobile.navigateBack
import imi.jazzberry.mobile.navigateTo

@Composable
fun TopBar(
    navState: NavState,
    modifier: Modifier = Modifier
) {

    Row(
        Modifier
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .heightIn(max = 45.dp)
            .fillMaxWidth()
            .padding(5.dp),
        horizontalArrangement = Arrangement.spacedBy(15.dp)
    ) {
        NavigationButton(
            onClick = { navState.navigateBack() },
            painter = GlobalUIProperties.iconBack,
            Modifier.weight(1f)
        )
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .height(40.dp)
                .padding(horizontal = 5.dp, vertical = 5.dp)
                .weight(1f)
        ) {
            Text(text = navState.currPageTitle, fontSize = 17.sp, textAlign = TextAlign.Center)
        }
        NavigationButton(
            onClick = { navState.navigateTo(Page.NOTIFICATIONS) },
            painter = GlobalUIProperties.iconNotifications,
            Modifier.weight(1f),
            isVisible = navState.toShowNotifBtn()
        )
    }
}

fun NavState.toShowNotifBtn(): Boolean {
    return when (this.currPage.value) {
        Page.AUTH -> false
        Page.NOTIFICATIONS -> false
        else -> true
    }
}
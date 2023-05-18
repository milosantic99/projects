package imi.jazzberry.mobile.core.ui.component.common.bottomNavigation

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import imi.jazzberry.mobile.NavState
import imi.jazzberry.mobile.Page
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.common.buttonWrappers.NavigationButton
import imi.jazzberry.mobile.navigateTo


@Composable
fun BottomNavigation(
    navState: NavState,
    modifier: Modifier = Modifier
) {
    Row(
        modifier
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .height(60.dp)
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        horizontalArrangement = Arrangement.SpaceAround,
        verticalAlignment = Alignment.CenterVertically
    ) {

        NavigationButton(
            onClick = { navState.navigateTo(Page.FEED) },
            painter = GlobalUIProperties.iconFeed,
        )
        NavigationButton(
            onClick = { navState.navigateTo(Page.MAP) },
            painter = GlobalUIProperties.iconMap,
        )
        NavigationButton(
            onClick = { navState.navigateTo(Page.NEW_POST) },
            painter = GlobalUIProperties.iconAdd,
        )
        NavigationButton(
            onClick = { navState.navigateTo(Page.CHATS) },
            painter = GlobalUIProperties.iconChat,
        )
        NavigationButton(
            onClick = { navState.navigateTo(Page.PROFILE) },
            painter = GlobalUIProperties.iconProfile,
        )

    }
}
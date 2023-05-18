package imi.jazzberry.mobile.core.ui.page.notif

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.notif.FollowingNotifications
import imi.jazzberry.mobile.core.ui.component.notif.NotificationsSwitcher
import imi.jazzberry.mobile.core.ui.component.notif.ReputationNotifications

@Destination
@Composable
fun NotificationsPage(
    navigator: DestinationsNavigator
){
//add this | to modifier in >>Level Page Container<< for scrolling options (research more)
//         v
//.verticalScroll(rememberScrollState()).weight(weight =1f, fill = false)
    var chg = remember { mutableStateOf(true) }
    Column {
        //Level 0
        Column{
            //Level Page Container
            NotificationsSwitcher(
                chg = chg.value,
                onSwitch = {
                    chg.value = it
                }
            )
            if (chg.value){
                FollowingNotifications()
            }else{
                ReputationNotifications()
            }
        }
    }
}
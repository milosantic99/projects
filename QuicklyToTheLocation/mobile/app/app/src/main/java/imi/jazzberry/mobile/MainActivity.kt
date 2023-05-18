package imi.jazzberry.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import com.ramcosta.composedestinations.DestinationsNavHost
import com.ramcosta.composedestinations.navigation.navigate
import com.ramcosta.composedestinations.rememberNavHostEngine
import dagger.hilt.android.AndroidEntryPoint
import imi.jazzberry.mobile.core.ui.component.common.bottomNavigation.BottomNavigation
import imi.jazzberry.mobile.core.ui.component.common.topBar.TopBar
import imi.jazzberry.mobile.core.ui.page.NavGraphs
import imi.jazzberry.mobile.core.ui.page.destinations.*
import imi.jazzberry.mobile.ui.theme.JazzberryMobileTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            JazzberryMobileTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {

                    val navEng = rememberNavHostEngine()
                    val navCtl = navEng.rememberNavController()
                    val navState = remember { NavState(navCtl) }

                    Column(
                        Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            TopBar(navState = navState)
                            DestinationsNavHost(
                                navGraph = NavGraphs.root,
                                engine = navEng,
                                navController = navCtl
                            )
                        }

                        BottomNavigation(
                            navState = navState,
                            modifier = Modifier.weight(1f, false)
                        )
                    }

                }
            }
        }
    }
}

data class NavState(
    val navCtl: NavHostController,
    val currPage: MutableState<Page> = mutableStateOf(Page.AUTH),
    val lastPage: MutableState<Page?> = mutableStateOf(null)
) {
    val currPageTitle get(): String = currPage.value.title
}

enum class Page {
    AUTH, FEED, MAP, NEW_POST, CHATS, PROFILE, NOTIFICATIONS
}

fun NavState.navigateTo(destination: Page) {
    this.lastPage.value = this.currPage.value
    this.currPage.value = destination
    this.currPage.value.navigate(navCtl)
}

fun NavState.navigateBack() {
    val destination = lastPage.value
    if (destination != null) {
        lastPage.value = null
        currPage.value = destination
        currPage.value.navigate(navCtl)
    }
}

val Page.title
    get(): String {
        return when (this) {
            Page.AUTH -> "Authenticate"
            Page.FEED -> "Feed"
            Page.MAP -> "Map"
            Page.NEW_POST -> "Create new post"
            Page.CHATS -> "Chats"
            Page.PROFILE -> "My profile"
            Page.NOTIFICATIONS -> "Notifications"
        }
    }

fun Page.toDirectionDestination(): DirectionDestination {
    return when (this) {
        Page.AUTH -> AuthFormDestination
        Page.FEED -> FollowingFeedDestination
        Page.MAP -> MainMapPageDestination
        Page.NEW_POST -> NewPostPromptDestination
        Page.CHATS -> ChatInboxDestination
        Page.PROFILE -> CurrentUserProfileDestination
        Page.NOTIFICATIONS -> NotificationsPageDestination
    }
}

fun Page.navigate(navCtl: NavHostController) {
    navCtl.navigate(toDirectionDestination())
}

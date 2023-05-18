package imi.jazzberry.mobile.core.ui.page.user

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.profile.UserProfile

@Destination
@Composable
fun CurrentUserProfile(
    navigator: DestinationsNavigator
){
//add this | to modifier in >>Level Page Container<< for scrolling options (research more)
//         v    
//.verticalScroll(rememberScrollState()).weight(weight =1f, fill = false) 
    Column {
        //Level 0
        Column(modifier = Modifier.fillMaxHeight(fraction = GlobalUIProperties.pageContainerSize)) {
            //Level Page Container
            UserProfile(navigator = navigator)
        }
    }
}
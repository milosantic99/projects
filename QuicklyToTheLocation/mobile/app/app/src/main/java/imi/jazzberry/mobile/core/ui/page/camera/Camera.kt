package imi.jazzberry.mobile.core.ui.page.camera

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.bottomNavigation.BottomNavigation

@Destination
@Composable
fun Camera(
    navigator: DestinationsNavigator
){
    Column {
        Text(text = "Camera")
//        BottomNavigation(navigator,"Camera")
    }
}
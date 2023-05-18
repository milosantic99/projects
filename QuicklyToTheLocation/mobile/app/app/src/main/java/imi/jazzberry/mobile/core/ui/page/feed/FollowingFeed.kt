package imi.jazzberry.mobile.core.ui.page.feed

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.GlobalUIProperties
import imi.jazzberry.mobile.core.ui.component.post.Post

@Destination
@Composable
fun FollowingFeed(
    vm: FeedViewModel = hiltViewModel(),
    navigator: DestinationsNavigator
){
    vm.invoke(1)
//add this | to modifier in >>Level Page Container<< for scrolling options (research more)
//         v
//.verticalScroll(rememberScrollState()).weight(weight =1f, fill = false)
    Column {
        //Level 0
        Column(modifier = Modifier.fillMaxHeight(fraction = GlobalUIProperties.pageContainerSize).verticalScroll(rememberScrollState()).weight(weight =1f, fill = false)){
            //Level Page Container
//            Text(text = "FollowingFeed")
            for(i in vm.state.value.posts){
                Spacer(modifier = Modifier.padding(top = 15.dp))
                Post(vm = i)
            }
        }
    }
}
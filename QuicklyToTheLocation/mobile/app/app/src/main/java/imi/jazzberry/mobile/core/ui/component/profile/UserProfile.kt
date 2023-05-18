package imi.jazzberry.mobile.core.ui.component.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import imi.jazzberry.mobile.R
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import imi.jazzberry.mobile.core.ui.component.common.buttonWrappers.ButtonOnProfile
import imi.jazzberry.mobile.core.ui.component.common.imageDisplays.ProfileImage

// Imports - Domain Layer

@Composable
fun UserProfile(

    viewModel: UserProfileViewModel = hiltViewModel(),
    navigator: DestinationsNavigator

) {

    val state = viewModel.state.value
    viewModel.invoke(1)
    Column( Modifier.background(MaterialTheme.colorScheme.background)) {
//        Text(
//            text = "${state.name}",
//            color = MaterialTheme.colorScheme.surface
//        )
//        Text(
//            text = "@${state.username}",
//            color = MaterialTheme.colorScheme.surface,
//            fontWeight = FontWeight.Bold
//        )
        Box(){//User stats
            Row {
                //Image
                ProfileImage()
                Box(modifier = Modifier
                    .fillMaxHeight(0.15f)
                    .padding(vertical = 20.dp)){ //Stats
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween){
                        Column(horizontalAlignment = Alignment.CenterHorizontally){
                            Row(){
                                Column(modifier = Modifier.padding(horizontal = 10.dp)) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.ico_reputation),
                                        contentDescription = "ico",
                                        modifier = Modifier
                                            .height(20.dp)
                                            .width(20.dp)
                                    )
                                }
                                Column(){
                                    Text(text = viewModel.rep)
                                }

                            }
                            ButtonOnProfile(onClick = { /*TODO*/ }, displayString = "message")
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally){
                            Row(){
                                Column(modifier = Modifier.padding(horizontal = 10.dp)) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.ico_followers),
                                        contentDescription = "ico",
                                        modifier = Modifier
                                            .height(20.dp)
                                            .width(20.dp)
                                    )
                                }
                                Column(){
                                    Text(text = viewModel.foll)
                                }

                            }
                            ButtonOnProfile(onClick = { /*TODO*/ }, displayString = "badges")
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally){
                            Row(){
                                Column(modifier = Modifier.padding(horizontal = 10.dp)) {
                                    Icon(
                                        painter = painterResource(id = R.drawable.ico_posts),
                                        contentDescription = "ico",
                                        modifier = Modifier
                                            .height(20.dp)
                                            .width(20.dp)
                                    )
                                }
                                Column(){
                                    Text(text = ""+ viewModel.posts.value)
                                }

                            }
                            ButtonOnProfile(onClick = { /*TODO*/ }, displayString = "follow")
                        }
                    }
                }
            }
        }
        Box(modifier = Modifier.padding(horizontal = 25.dp)){//User description
            Text(text = viewModel.desc)
        }
        Spacer(modifier = Modifier.padding(vertical = 10.dp))
        Box(modifier = Modifier.padding(horizontal = 25.dp)){//Buttons
            ButtonOnProfile(onClick = { /*TODO*/ }, displayString = "view")
        }
        Box(){//Post Grid / Map View

        }
    }

}

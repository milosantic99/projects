package imi.jazzberry.mobile.core.ui.page.feed

import imi.jazzberry.mobile.core.domain.model.post.PostModel
import imi.jazzberry.mobile.core.ui.component.post.PostState

data class FeedState (
    val posts : MutableList<PostState> = mutableListOf()
){
    companion object{
        fun from(model: List<PostModel>) : FeedState {
            var temp = mutableListOf<PostState>()
            model.forEach { post: PostModel-> temp.add(PostState.from(post)) }
            return FeedState(posts = temp)
        }
    }
}
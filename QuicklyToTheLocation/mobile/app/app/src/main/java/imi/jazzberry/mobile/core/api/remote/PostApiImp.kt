package imi.jazzberry.mobile.core.api.remote

import imi.jazzberry.mobile.core.data.dto.post.NewPostDto
import imi.jazzberry.mobile.core.data.dto.post.PostDto
import imi.jazzberry.mobile.core.data.remote.PostApi
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class PostApiImp @Inject constructor(

): PostApi {
    override fun getPost(): Resource<PostDto> {
        TODO("Not yet implemented")
    }

    override fun getPosts(): Resource<List<PostDto>> {
        TODO("Not yet implemented")
    }

    override fun filterPosts(): Resource<List<PostDto>> {
        TODO("Not yet implemented")
    }

    override fun createPost(post: NewPostDto): Resource<Unit> {
        TODO("Not yet implemented")
    }

    override fun uploadImage(): Resource<Unit> {
        TODO("Not yet implemented")
    }

    override fun dislikePost(): Resource<Unit> {
        TODO("Not yet implemented")
    }

    override fun likePost(): Resource<Unit> {
        TODO("Not yet implemented")
    }

}
package imi.jazzberry.mobile.core.data.remote

import imi.jazzberry.mobile.core.data.dto.post.NewPostDto
import imi.jazzberry.mobile.core.data.dto.post.PostDto
import imi.jazzberry.mobile.core.util.Resource

interface PostApi {

    fun getPost(): Resource<PostDto>
    fun getPosts(): Resource<List<PostDto>>
    fun filterPosts(): Resource<List<PostDto>>
    fun createPost(post: NewPostDto): Resource<Unit>

    // fun getImage(): Resource<Unit>
    fun uploadImage(): Resource<Unit>

    fun dislikePost(): Resource<Unit>
    fun likePost(): Resource<Unit>
}
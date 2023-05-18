package imi.jazzberry.mobile.core.domain.usecase.post

import imi.jazzberry.mobile.core.domain.model.ChatBriefModel
import imi.jazzberry.mobile.core.domain.model.post.PostModel
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class GetPostUseCase @Inject constructor(
    // TODO: Post Repo
) {

    suspend operator fun invoke(userId: Int): Resource<PostModel> {

        // TODO: Post Repo call

        // Temporary hardcoded return value
        return Resource.Success(PostModel.mock())

        // TODO: Implement Resource handling and return real value
    }

}
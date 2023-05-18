package imi.jazzberry.mobile.core.domain.usecase.chat

import imi.jazzberry.mobile.core.domain.model.ChatBriefModel
import imi.jazzberry.mobile.core.domain.model.user.UserProfileModel
import imi.jazzberry.mobile.core.domain.repo.UserRepo
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class GetChatsUseCase @Inject constructor(
    // TODO: Chat Repo
) {

    suspend operator fun invoke(userId: Int): Resource<List<ChatBriefModel>> {

        // TODO: Chat Repo call

        // Temporary hardcoded return value
        return Resource.Success(listOf(
            ChatBriefModel.mock(),
            ChatBriefModel.mock(),
            ChatBriefModel.mock()
        ))

        // TODO: Implement Resource handling and return real value
    }

}
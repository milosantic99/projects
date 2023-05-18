package imi.jazzberry.mobile.core.domain.usecase.user

import imi.jazzberry.mobile.core.domain.model.user.UserProfileModel
import imi.jazzberry.mobile.core.domain.repo.UserRepo
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class GetUserProfileUseCase @Inject constructor(
    private val repo: UserRepo
) {

    suspend operator fun invoke(id: Int): Resource<UserProfileModel> {

        val res = repo.getUser(id)

        // Temporary hardcoded return value
        return Resource.Success(UserProfileModel(
            "branko",
            "Branko Kockica",
            "Kocka do kocke kockica",
            "",
            23, 34234, 213
        ))

        // TODO: Uncomment this when back starts to return full user profile!
        /*return when (res) {
            is Resource.Success -> Resource.Success(UserProfileModel.from(res.data))
            is Resource.Error -> Resource.Error(res.msg)
            is Resource.Loading -> Resource.Loading()
        }*/
    }

}
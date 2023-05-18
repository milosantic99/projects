package imi.jazzberry.mobile.core.domain.repo

import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.domain.model.user.UserRegisterModel
import imi.jazzberry.mobile.core.util.Resource

interface UserRepo {

    suspend fun getUser(id: Int): Resource<UserProfileDto>
    suspend fun register(data: UserRegisterModel): Resource<Unit>

}
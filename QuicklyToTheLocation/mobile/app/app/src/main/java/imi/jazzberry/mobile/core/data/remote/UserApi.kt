package imi.jazzberry.mobile.core.data.remote

import imi.jazzberry.mobile.core.data.dto.user.UserRegisterDto
import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.util.Resource

interface UserApi {

    suspend fun getUser(id: Int): Resource<UserProfileDto>
    suspend fun register(data: UserRegisterDto): Resource<Unit>

}
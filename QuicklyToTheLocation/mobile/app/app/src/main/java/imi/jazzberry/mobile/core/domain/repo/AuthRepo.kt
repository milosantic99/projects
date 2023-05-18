package imi.jazzberry.mobile.core.domain.repo

import imi.jazzberry.mobile.core.domain.model.auth.AuthTokensModel
import imi.jazzberry.mobile.core.domain.model.user.UserLoginModel
import imi.jazzberry.mobile.core.util.Resource

interface AuthRepo {

    suspend fun login(data: UserLoginModel): Resource<AuthTokensModel>

}
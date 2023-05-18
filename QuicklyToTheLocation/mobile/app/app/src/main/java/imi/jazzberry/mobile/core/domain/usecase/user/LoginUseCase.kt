package imi.jazzberry.mobile.core.domain.usecase.user

import imi.jazzberry.mobile.core.domain.model.user.UserLoginModel
import imi.jazzberry.mobile.core.domain.repo.AuthRepo
import imi.jazzberry.mobile.core.util.auth.Auth
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class LoginUseCase @Inject constructor(
    private val authRepo: AuthRepo
) {

    suspend operator fun invoke(data: UserLoginModel): Resource<Unit> {
        val res = authRepo.login(data)
        return when(res) {
            is Resource.Success -> {
                Auth.saveTokens(res.data)
                Resource.Success(Unit)
            }
            is Resource.Error -> Resource.Error(res.msg)
            else -> { Resource.Loading() }
        }
    }

}
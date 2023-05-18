package imi.jazzberry.mobile.core.domain.usecase.user

import imi.jazzberry.mobile.core.domain.model.user.UserRegisterModel
import imi.jazzberry.mobile.core.domain.repo.UserRepo
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class RegisterUseCase @Inject constructor(
    private val userRepo: UserRepo
) {

    suspend operator fun invoke(data: UserRegisterModel): Resource<Unit> {
        return userRepo.register(data)
    }

}
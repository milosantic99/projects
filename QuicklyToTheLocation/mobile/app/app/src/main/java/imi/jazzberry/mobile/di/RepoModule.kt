package imi.jazzberry.mobile.di

import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import imi.jazzberry.mobile.core.data.repo.AuthRepoImp
import imi.jazzberry.mobile.core.data.repo.UserRepoImp
import imi.jazzberry.mobile.core.data.repo.WikiRepoImp
import imi.jazzberry.mobile.core.domain.repo.AuthRepo
import imi.jazzberry.mobile.core.domain.repo.UserRepo
import imi.jazzberry.mobile.core.domain.repo.WikiRepo
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepoModule {

    @Binds
    @Singleton
    abstract fun bindUserRepo(
        concretion: UserRepoImp
    ): UserRepo

    @Binds
    @Singleton
    abstract fun bindWikiRepo(
        concretion: WikiRepoImp
    ): WikiRepo

    @Binds
    @Singleton
    abstract fun bindAuthRepo(
        concretion: AuthRepoImp
    ): AuthRepo

}
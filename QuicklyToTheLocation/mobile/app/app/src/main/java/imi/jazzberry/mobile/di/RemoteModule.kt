package imi.jazzberry.mobile.di

import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import imi.jazzberry.mobile.core.api.remote.AuthApiImp
import imi.jazzberry.mobile.core.api.remote.MainBackendApi
import imi.jazzberry.mobile.core.api.remote.UserApiImp
import imi.jazzberry.mobile.core.data.remote.*
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RemoteModule {

    // Backend API
    @Binds
    @Singleton
    abstract fun bindBackendApi(
        //concretion: BackendApiMock
        concretion: MainBackendApi
    ) : BackendApi

    // User API
    @Binds
    @Singleton
    abstract fun bindUserApi(
        concretion: UserApiImp
    ) : UserApi

    // Auth API
    @Binds
    @Singleton
    abstract fun bindAuthApi(
        concretion: AuthApiImp
    ) : AuthApi



}
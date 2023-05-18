package imi.jazzberry.mobile.core.api.remote

import android.util.Log
import imi.jazzberry.mobile.core.api.Conf
import imi.jazzberry.mobile.core.data.dto.auth.AuthTokensDto
import imi.jazzberry.mobile.core.data.dto.user.UserLoginDto
import imi.jazzberry.mobile.core.data.remote.AuthApi
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.JsonParser
import imi.jazzberry.mobile.core.util.Msg
import imi.jazzberry.mobile.core.util.Resource
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import javax.inject.Inject

class AuthApiImp @Inject constructor() : AuthApi {

    private val apiEndpoint get() = "${Conf.Api.Url()}/auth"

    override suspend fun login(data: UserLoginDto): Resource<AuthTokensDto> {
        return try {
            val client = Conf.Api.Client()
            val res = client.post(
                url = Url("${Conf.Api.Url.host()}/login?username=${data.username}&password=${data.password}")
            )

            when (res.status) {
                HttpStatusCode.OK -> Resource.Success(JsonParser.decode(res.bodyAsText()))
                else -> Resource.Error(Msg.Err.Api("Status: ${res.status}"))
            }

        } catch (e: Exception) {
            Log.e(Dbg.tag(this), e.stackTraceToString())
            Resource.Error(Msg.Err.Network("Couldn't connect to server :("))
        }
    }

    override suspend fun refreshAccessToken(): Resource<AuthTokensDto> {
        return try {
            val client = Conf.Api.Client(refreshToken = true)
            val res = client.get(
                url = Url("${apiEndpoint}/token/refresh")
            )

            when (res.status) {
                HttpStatusCode.OK -> Resource.Success(JsonParser.decode(res.bodyAsText()))
                HttpStatusCode.Unauthorized -> Resource.Error(Msg.Err.NotLoggedIn())
                HttpStatusCode.BadRequest -> Resource.Error(Msg.Err.NotLoggedIn())
                else -> Resource.Error(Msg.Err.Api("Status: ${res.status}."))
            }

        } catch (e: Exception) {
            Log.e(Dbg.tag(this), e.stackTraceToString())
            Resource.Error(Msg.Err.Network("Couldn't connect to server :("))
        }
    }

}
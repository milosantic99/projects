package imi.jazzberry.mobile.core.api.remote

import android.util.Log
import imi.jazzberry.mobile.core.api.Conf
import imi.jazzberry.mobile.core.data.dto.user.UserRegisterDto
import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.data.remote.UserApi
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.JsonParser
import imi.jazzberry.mobile.core.util.Msg
import imi.jazzberry.mobile.core.util.Resource
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import javax.inject.Inject

class UserApiImp @Inject constructor(

) : UserApi {

    private val apiEndpoint get() = "${Conf.Api.Url()}/users"

    override suspend fun getUser(id: Int): Resource<UserProfileDto> {

        return try {
            val client = Conf.Api.Client()
            val response = client.post(
                url = Url("$apiEndpoint/login?username=wkk&password=wkk")
            )
            Resource.Success(JsonParser.decode(response.bodyAsText()))
        } catch (e: Exception) {
            Log.e(Dbg.tag(this), e.stackTraceToString())
            Resource.Error(Msg.Err.Network("Couldn't connect to server :("))
        }
    }

    override suspend fun register(data: UserRegisterDto): Resource<Unit> {
        return try {

            val client = Conf.Api.Client()

            Log.w(Dbg.tag(this), data.toString())

            val res = client.post(
                url = Url("$apiEndpoint/register"),
                block = {
                    contentType(ContentType.Application.Json)
                    setBody(data)
                }
            )
            Log.w(Dbg.tag(this), res.request.content.contentType.toString())
            Log.w(Dbg.tag(this), res.request.headers.toString())
            Log.w(Dbg.tag(this), res.status.toString())
            Log.w(Dbg.tag(this), res.bodyAsText())
            if (res.status == HttpStatusCode.OK)
                Resource.Success(Unit)
            else
                Resource.Error(Msg.Err.Network("Something went wrong :("))

        }
        catch (e: Exception) {

            Log.e(Dbg.tag(this), e.toString())
            Resource.Error(Msg.Err.Network("Couldn't connect to server :("))

        }
    }

}
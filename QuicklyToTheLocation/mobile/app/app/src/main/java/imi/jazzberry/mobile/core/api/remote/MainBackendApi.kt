package imi.jazzberry.mobile.core.api.remote

import android.util.Log
import imi.jazzberry.mobile.core.api.Conf
import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto
import imi.jazzberry.mobile.core.data.remote.BackendApi
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.Msg
import imi.jazzberry.mobile.core.util.JsonParser
import imi.jazzberry.mobile.core.util.Resource
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import javax.inject.Inject


class MainBackendApi @Inject constructor() : BackendApi {

    private val apiResource = "users"
    private val apiEndpoint = "${Conf.Api.Url()}/${apiResource}"

    override suspend fun getUser(id: Int): Resource<UserProfileDto> {

        return try {
            val client = HttpClient(CIO)
            val response = client.post(
                url = Url("$apiEndpoint/login?username=wkk&password=wkk")
            )
            Resource.Success(JsonParser.decode(response.bodyAsText()))
        } catch (e: Exception) {
            Log.e(Dbg.tag(this), e.stackTraceToString())
            Resource.Error(Msg.Err.Network("Couldn't connect to server :("))
        }
    }

    override suspend fun getWikiSummary(query: String): Resource<WikiSummaryDto> {
        return Resource.Success(
            WikiSummaryDto(
                title = "Windows (Operating System)",
                summary = "Windows, known as \"malware-included\" operating systems, is " +
                        "world's most popular operating system, unfortunately."
            )
        )
    }

}
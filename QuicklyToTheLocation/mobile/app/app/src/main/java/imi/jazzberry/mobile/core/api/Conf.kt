package imi.jazzberry.mobile.core.api

import imi.jazzberry.mobile.core.util.auth.Auth
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*

object Conf {

    object Api {

        object Url {
            val METHOD = "http"
            val BASE = "softeng.pmf.kg.ac.rs"
            val PORT = "10000"
            val API_ROOT = "api/v1"
            fun host(): String {
                return "$METHOD://$BASE:$PORT"
            }

            operator fun invoke(): String {
                return "${host()}/$API_ROOT"
            }
        }

        object Client {
            suspend operator fun invoke(refreshToken: Boolean = false): HttpClient {
                val accessToken =
                    if (refreshToken) Auth.refreshToken.read() else Auth.accessToken.read()
                return HttpClient(CIO) {
                    this.install(ContentNegotiation) { json() }

                    // If access token doesn't exist Authorization header shouldn't exist
                    if (accessToken != "") {
                        this.install(DefaultRequest) {
                            header(HttpHeaders.Authorization, "Bearer $accessToken")
                        }
                    }
                }
            }

        }

    }
}
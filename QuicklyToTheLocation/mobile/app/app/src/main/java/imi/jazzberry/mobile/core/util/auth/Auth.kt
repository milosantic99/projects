package imi.jazzberry.mobile.core.util.auth

import android.util.Log
import imi.jazzberry.mobile.core.data.dto.auth.AuthTokensDto
import imi.jazzberry.mobile.core.domain.model.auth.AuthTokensModel
import imi.jazzberry.mobile.core.util.Dbg
import imi.jazzberry.mobile.core.util.JsonParser
import imi.jazzberry.mobile.core.util.Msg
import imi.jazzberry.mobile.core.util.Resource
import imi.jazzberry.mobile.core.util.storage.Pool
import imi.jazzberry.mobile.core.util.storage.Storage
import java.util.*

object Auth {

    data class JWTBody(
        val sub: String,
        val roles: List<String>,
        val exp: Long,
    )

    private val tokenPool: Pool = Storage.createPool("auth-token-pool")

    val accessToken: TokenStore = TokenStore(tokenPool, "access")
    val refreshToken: TokenStore = TokenStore(tokenPool, "refresh")

    suspend fun getUserData(): UserAuthData? {
        val tokenStr = accessToken.read()
        Log.d(Dbg.tag(this), tokenStr)
        val token = tokenStr.split(".")
        return if (token.count() == 3) {
            val head = Base64.getDecoder().decode(token[0]).decodeToString()
            val body = Base64.getDecoder().decode(token[1]).decodeToString()
            val jwtBody: JWTBody = JsonParser.decode(body)

            Log.d(Dbg.tag(this), jwtBody.toString())

            UserAuthData(jwtBody.sub)
        } else null
    }

    suspend fun loggedIn(): Boolean {
        return accessToken.isEmpty() || refreshToken.isEmpty()
    }

    suspend fun logout() {
        accessToken.delete()
        refreshToken.delete()
    }

    suspend fun saveTokens(tokens: AuthTokensModel) {
        accessToken.store(tokens.accessToken)
        refreshToken.store(tokens.refreshToken)
    }

    suspend fun <T> maintainTokens(
        res: Resource<T>,
        newTokens: suspend () -> Resource<AuthTokensDto>
    ): Resource<T> {
        Log.d(Dbg.tag(this), "Maintain Token - BEGIN")
        Log.d(Dbg.tag(this), accessToken.read())
        Log.d(Dbg.tag(this), refreshToken.read())
        when (res) {
            is Resource.Error ->
                when (res.msg) {
                    is Msg.Err.NotLoggedIn ->
                        when (val tokensRes = newTokens()) {
                            is Resource.Success -> saveTokens(AuthTokensModel.from(tokensRes.data)) // SAVE NEW TOKENS
                            is Resource.Error ->
                                when (tokensRes.msg) {
                                    is Msg.Err.NotLoggedIn -> logout() // LOGOUT
                                    else -> {}
                                }
                            else -> {}
                        }
                    else -> {}
                }
            else -> {}
        }
        Log.d(Dbg.tag(this), "Maintain Token - END")
        Log.d(Dbg.tag(this), accessToken.read())
        Log.d(Dbg.tag(this), refreshToken.read())
        return res
    }
}
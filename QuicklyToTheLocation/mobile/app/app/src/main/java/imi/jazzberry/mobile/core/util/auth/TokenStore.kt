package imi.jazzberry.mobile.core.util.auth

import imi.jazzberry.mobile.core.util.storage.Pool

class TokenStore(private val tokenPool: Pool, private val tokenPoolKey: String) {

    private var cache: String = ""

    suspend fun read(): String {
        if (cache == "") cache = tokenPool.read(tokenPoolKey) ?: ""
        return cache
    }

    suspend fun store(token: String) {
        tokenPool.write(tokenPoolKey, token)
        cache = token
    }

    suspend fun delete() {
        store("")
        cache = ""
    }

    suspend fun isEmpty(): Boolean {
        return read() == ""
    }
}
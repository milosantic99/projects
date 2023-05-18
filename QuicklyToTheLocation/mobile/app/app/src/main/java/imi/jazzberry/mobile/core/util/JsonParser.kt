package imi.jazzberry.mobile.core.util

import com.google.gson.Gson

object JsonParser {

    inline fun <reified T> decode(json: String): T {
        return Gson().fromJson(json, T::class.java)
    }

}
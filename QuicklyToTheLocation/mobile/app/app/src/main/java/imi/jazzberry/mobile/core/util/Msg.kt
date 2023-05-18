package imi.jazzberry.mobile.core.util

sealed class Msg(val message: String = "") {
    sealed class Err(msg: String) : Msg(msg) {
        class Network(msg: String = "") : Err(msg)      // Network connection error
        class Filesystem(msg: String = "") : Err(msg)   // Filesystem error
        class Api(msg: String = "") : Err(msg)          // Error in communication via API
        class NotLoggedIn(msg: String = "") : Err(msg)  // User isn't logged in
    }

    operator fun invoke(): String = message
}
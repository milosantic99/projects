package imi.jazzberry.mobile.core.util

object Dbg {

    inline fun <reified T> tag(t: T? = null): String {
        return T::class.simpleName ?: "UNDEFINED"
    }

}
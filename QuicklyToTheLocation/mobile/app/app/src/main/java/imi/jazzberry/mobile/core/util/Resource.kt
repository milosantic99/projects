package imi.jazzberry.mobile.core.util

sealed class Resource<D>(open val data: D? = null, open val msg: Msg? = null) {

    class Success<D> (override val data: D)  : Resource<D>(data)
    class Error<D>   (override val msg: Msg)  : Resource<D>(null, msg)
    class Loading<D> (override val data: D? = null, override val msg: Msg? = null) : Resource<D>(data, msg)
}
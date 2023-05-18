package imi.jazzberry.mobile.core.util.storage

import android.content.Context
import imi.jazzberry.mobile.JazzberryMobileApp

object Storage {

    private val context: Context get() = JazzberryMobileApp.appContext

    private val pools: MutableMap<String, Pool> = mutableMapOf()

    private fun trackPool(pool: Pool): Pool {
        pools[pool.name] = pool
        return pool
    }

    fun createPool(name: String): Pool {
        return trackPool(Pool(context, name))
    }

    fun pool(name: String): Pool? {
        return pools[name]
    }

}
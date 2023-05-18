package imi.jazzberry.mobile.core.data.remote

// Imports
import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto
import imi.jazzberry.mobile.core.util.Resource


interface BackendApi {

    suspend fun getUser(id: Int): Resource<UserProfileDto>
    suspend fun getWikiSummary(query: String): Resource<WikiSummaryDto>

}
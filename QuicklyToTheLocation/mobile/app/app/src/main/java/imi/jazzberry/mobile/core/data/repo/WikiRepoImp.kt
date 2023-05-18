package imi.jazzberry.mobile.core.data.repo

// Imports

// Imports - Domain Layer
import imi.jazzberry.mobile.core.data.remote.BackendApi
import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto
import imi.jazzberry.mobile.core.domain.repo.WikiRepo
import imi.jazzberry.mobile.core.util.Resource
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

class WikiRepoImp @Inject constructor(
    private val backendApi: BackendApi
) : WikiRepo {

    override suspend fun getSummary(query: String): Resource<WikiSummaryDto> {
        return backendApi.getWikiSummary(query)
    }

}
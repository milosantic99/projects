package imi.jazzberry.mobile.core.domain.repo

import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto
import imi.jazzberry.mobile.core.util.Resource

interface WikiRepo {

    suspend fun getSummary(query: String): Resource<WikiSummaryDto>

}
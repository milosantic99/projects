package imi.jazzberry.mobile.core.domain.usecase

import imi.jazzberry.mobile.core.data.repo.WikiRepoImp
import imi.jazzberry.mobile.core.domain.model.WikiSummaryModel
import imi.jazzberry.mobile.core.domain.model.toWikiSummaryModel
import javax.inject.Inject

class GetWikiSummaryUseCase @Inject constructor(
    private val wikiRepo: WikiRepoImp
) {

    suspend operator fun invoke(query: String): WikiSummaryModel {
        return wikiRepo.getSummary(query).data?.toWikiSummaryModel() ?: WikiSummaryModel()
    }

}
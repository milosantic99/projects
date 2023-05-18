package imi.jazzberry.mobile.core.domain.model

import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto

data class WikiSummaryModel(
    val title: String = "",
    val summary: String = ""
)

fun WikiSummaryDto.toWikiSummaryModel(): WikiSummaryModel {
    return WikiSummaryModel(
        title = this.title,
        summary = this.summary
    )
}

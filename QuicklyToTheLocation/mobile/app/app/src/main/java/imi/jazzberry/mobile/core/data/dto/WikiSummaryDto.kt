package imi.jazzberry.mobile.core.data.dto

import kotlinx.serialization.Serializable

@Serializable
data class WikiSummaryDto(
    val title: String,
    val summary: String
)

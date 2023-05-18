package imi.jazzberry.mobile.core.api.remote.mock

// Imports
import imi.jazzberry.mobile.core.data.remote.BackendApi
import imi.jazzberry.mobile.core.data.dto.user.UserProfileDto
import imi.jazzberry.mobile.core.data.dto.WikiSummaryDto
import imi.jazzberry.mobile.core.util.Resource
import javax.inject.Inject

class BackendApiMock @Inject constructor() : BackendApi {

    override suspend fun getUser(id: Int): Resource<UserProfileDto> {
        return Resource.Success(
            UserProfileDto(
                username = "supergenije",
                firstName = "Pera",
                lastName = "Kojot"
            )
        )
    }

    override suspend fun getWikiSummary(query: String): Resource<WikiSummaryDto> {
        return Resource.Success(
            WikiSummaryDto(
                title = "Windows (Operating System)",
                summary = "Windows, known as \"malware-included\" operating systems, is " +
                        "world's most popular operating system, unfortunately."
            )
        )
    }


}
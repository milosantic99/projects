package imi.jazzberry.mobile.core.ui.component.location.wiki

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.domain.model.WikiSummaryModel
import imi.jazzberry.mobile.core.domain.usecase.GetWikiSummaryUseCase
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class WikiSummaryViewModel @Inject constructor(

    private val getWikiSummaryUseCase: GetWikiSummaryUseCase

) : ViewModel() {

    private val _state = mutableStateOf(WikiSummaryModel())
    val state: State<WikiSummaryModel> = _state

    fun getSummary(query: String) {
        viewModelScope.launch {
            _state.value = getWikiSummaryUseCase(query)
        }
    }

}
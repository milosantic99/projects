package imi.jazzberry.mobile.core.ui.component.map

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import imi.jazzberry.mobile.core.ui.component.map.state.MapPinState
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.osmdroid.util.BoundingBox
import javax.inject.Inject

@HiltViewModel
class MapViewUIViewModel @Inject constructor(
    /*private val getUserUseCase: GetUserProfileUseCase*/
) : ViewModel() {

    private val _state = mutableStateOf(listOf<MapPinState>())
    val state: State<List<MapPinState>> = _state;

    private var _delay = 3000L
    private var _counting = false
    private var _lastFetchX = 0.0
    private var _lastFetchY = 0.0
    fun fetchLocations(bb: BoundingBox) {
        if (!_counting) {
            Log.d("MapViewUIViewModel", "> Delay. Count!")
            _counting = true
            viewModelScope.launch {
                delay(_delay)
                _lastFetchY = bb.centerLatitude * 2
                _lastFetchX = bb.centerLongitude * 2
                // TODO: Fetch Real Data (using UseCase)
                _state.value = mockLocationsData()
                _counting = false
                Log.d("MapViewUIViewModel", "> Finished!")
            }
        }
    }

    // TODO: Remove this function once actual UseCase have been implemented
    private fun mockLocationsData(): List<MapPinState> {
        return listOf(
            MapPinState(20.8358580, 44.0120030, 23, 1),
            MapPinState(20.8468580, 44.0220930, 55, 2),
            MapPinState(20.8557880, 44.0321930, 1, 1),
            MapPinState(20.8158580, 44.0220030, 33, 3),
            MapPinState(20.8268730, 44.0050030, 65, 1),
            MapPinState(20.8858990, 44.0121030, 12, 2),
            MapPinState(20.8958599, 44.0024030, 10, 8),
        )
    }

}
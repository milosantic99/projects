package imi.jazzberry.mobile.core.ui.component.map

import android.annotation.SuppressLint
import android.preference.PreferenceManager
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.res.ResourcesCompat
import androidx.hilt.navigation.compose.hiltViewModel
import imi.jazzberry.mobile.R
import imi.jazzberry.mobile.core.util.map.newGeoPoint
import org.osmdroid.config.Configuration
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.simplefastpoint.*

const val DBGTAG = "MapViewUI"

@SuppressLint("ClickableViewAccessibility")
@Composable
fun MapViewUI(
    modifier: Modifier = Modifier,
    onInit: ((map: MapView) -> Unit)? = null,
    onLoad: ((map: MapView) -> Unit)? = null,
    onTouch: ((map: MapView) -> Unit)? = null
) {
    val mapViewState = rememberMapViewWithLifecycle()
    val vm: MapViewUIViewModel = hiltViewModel()

    AndroidView(
        {
            Log.d(DBGTAG, "Factory function call!")
            // Default setup
            Configuration.getInstance().load(it, PreferenceManager.getDefaultSharedPreferences(it))
            mapViewState.setBuiltInZoomControls(false)
            mapViewState.setMultiTouchControls(true)
            mapViewState.minZoomLevel = 3.0
            mapViewState.maxZoomLevel = 20.0
            mapViewState.isTilesScaledToDpi = true
            mapViewState.isVerticalMapRepetitionEnabled = false
            // Position and zoom
            mapViewState.controller.setCenter(newGeoPoint(20.8858580, 44.0160030))
            mapViewState.controller.setZoom(15.0)

            // Callbacks
            mapViewState.setOnTouchListener { view, event ->
//                Log.d(DBGTAG,"On Touch callback!)")
                onTouch?.invoke(mapViewState)
                false
            }
            mapViewState.viewTreeObserver.addOnDrawListener {
//                vm.fetchLocations()
                Log.d(DBGTAG,"Tree Observer On Draw callback! Map Center: ${mapViewState.mapCenter}")
                Log.d(DBGTAG,"W/H         : ${mapViewState.width}/${mapViewState.height}")
                Log.d(DBGTAG,"Measured W/H: ${mapViewState.measuredWidth}/${mapViewState.measuredHeight}")
                Log.d(DBGTAG,"Bounding Box: ${mapViewState.boundingBox}")
            }

            mapViewState.addMarker(newGeoPoint(20.8858580, 44.0160030), onClickCb = {
                _,mp->vm.fetchLocations(mp.boundingBox)
            })

            onInit?.invoke(mapViewState)
            mapViewState
        },
        modifier

    ) { mapView ->
        // mapView.overlays.clear()
        Log.d(DBGTAG, "Update function call! ViewModel state: ${vm.state.value}")
        for (p in vm.state.value) {
            mapView.addMarker(newGeoPoint(p.x, p.y), p.posts, p.locations > 1)
        }
        onLoad?.invoke(mapView)
    }
}

fun MapView.addMarker(
    gp: GeoPoint,
    badgeNum: Int = 1,
    locationGroup: Boolean = false,
    onClickCb: (Marker, MapView) -> Unit = {_,_->}
) {

    val marker = Marker(this)
    marker.icon = if (locationGroup)
        ResourcesCompat.getDrawable(resources, R.drawable.ico_pin_more, null)
    else ResourcesCompat.getDrawable(resources, R.drawable.ico_pin, null)
    marker.position = gp
    marker.setOnMarkerClickListener { mk, mp ->
        Log.d(DBGTAG, "Click Listener ${mk.position}")
//        this.addMarker(newGeoPoint(gp.x + 0.01, gp.y + 0.01))
        onClickCb(mk, mp)
        true
    }
    marker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
    this.overlays.add(marker)
}


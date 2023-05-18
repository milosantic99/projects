package imi.jazzberry.mobile.core.ui.component.location.wiki

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.FontWeight

@Composable
fun WikiSummary(

    viewModel: WikiSummaryViewModel

) {

    val state = viewModel.state.value

    Column {
        Text(
            text = "${state.title}\n",
            color = MaterialTheme.colorScheme.surface,
            fontWeight = FontWeight.Bold
        )
        Text(text = "${state.summary}\n", color = MaterialTheme.colorScheme.surface)
        Text(
            text = "> Wikipedia Summary Example <",
            color = MaterialTheme.colorScheme.surface,
        )
    }

}
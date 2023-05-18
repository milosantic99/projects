import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgJsonEditorModule } from 'ang-jsoneditor' 
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MainContentComponent } from './main-content/main-content.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSliderModule} from '@angular/material/slider';
import { BarChartComponent } from './Charts/bar-chart/bar-chart.component';
import { MychartsComponent } from './mycharts/mycharts.component';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { EncoderHelpComponent } from './dialogs/encoder-help/encoder-help.component';
import { ActivationFunctionHelpComponent } from './dialogs/activation-function-help/activation-function-help.component';
import { OutlierHelpComponent } from './dialogs/outlier-help/outlier-help.component';
import { ProblemTypeHelpComponent } from './dialogs/problem-type-help/problem-type-help.component';
import { OptimizerTypeHelpComponent } from './dialogs/optimizer-type-help/optimizer-type-help.component';
import { LossTypeHelpComponent } from './dialogs/loss-type-help/loss-type-help.component';
import { LearningRateHelpComponent } from './dialogs/learning-rate-help/learning-rate-help.component';
import { EpocheHelpComponent } from './dialogs/epoche-help/epoche-help.component';
import { TestPercentageHelpComponent } from './dialogs/test-percentage-help/test-percentage-help.component';
import { RegularizsationHelpComponent } from './dialogs/regularizsation-help/regularizsation-help.component';
import { RegularizationRateHelpComponent } from './dialogs/regularization-rate-help/regularization-rate-help.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { DeleteUserPopupComponent } from './delete-user-popup/delete-user-popup.component';
import { AdminUserPopupComponent } from './admin-user-popup/admin-user-popup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthGuard } from './auth.guard';
import { MyModelsComponent } from './my-models/my-models.component';
import { DataCleaningHelpComponent } from './dialogs/data-cleaning-help/data-cleaning-help.component';
import { PredictionDialogComponent } from './prediction-dialog/prediction-dialog.component';

// import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    EmployeeListComponent,
    MainContentComponent,
    UploadFileComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    DashboardComponent,
    BarChartComponent,
    MychartsComponent,
    EncoderHelpComponent,
    ActivationFunctionHelpComponent,
    OutlierHelpComponent,
    ProblemTypeHelpComponent,
    OptimizerTypeHelpComponent,
    LossTypeHelpComponent,
    LearningRateHelpComponent,
    EpocheHelpComponent,
    TestPercentageHelpComponent,
    RegularizsationHelpComponent,
    RegularizationRateHelpComponent,
    UserProfileComponent,
    DeleteUserPopupComponent,
    AdminUserPopupComponent,
    WelcomePageComponent,
    MyModelsComponent,
    DataCleaningHelpComponent,
    PredictionDialogComponent

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    AppRoutingModule,
    HttpClientModule,
    NgJsonEditorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule, 
    MatSliderModule,
    NgChartsModule,
    ToastrModule.forRoot(),
    MatProgressBarModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

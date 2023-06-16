import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register-DSO/register.component';
import { LogoComponent } from './Component/logo/logo.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeDsoComponent } from './Pages/DSO/home-dso/home-dso.component';
import { LeftMeniComponent } from './Component/left-meni-dso/left-meni.component';
import { DeviceImageComponent } from './Component/device-image/device-image.component';
import { HomeProsumerComponent } from './Pages/Prosumer/home-prosumer/home-prosumer.component';
import { RoundProgressbarComponent } from './Component/round-progressbar/round-progressbar.component';
import { WorkTimeComponent } from './Component/work-time/work-time.component';

import { LeftMeniProsumerComponent } from './Component/left-meni-prosumer/left-meni-prosumer.component';
import { SettingsProsumerComponent } from './Pages/Prosumer/settings-prosumer/settings-prosumer.component';
import { ProsumerPageDsoComponent } from './Pages/DSO/prosumer-page-dso/prosumer-page-dso.component';
import { LineGraphThreeInOneComponent } from './Component/line-graph-three-in-one/line-graph-three-in-one.component';
import { BarChartConsumptionProductionComponent } from './Component/bar-chart-consumption-production/bar-chart-consumption-production.component';

import { SimpleCardComponent } from './Component/simple-card/simple-card.component';
import { LineGraphComponent } from './Component/line-graph/line-graph.component';
import { WeatherSimpleCardComponent } from './Component/weather-simple-card/weather-simple-card.component';
import { RegisterProsumerDsoComponent } from './Pages/DSO/register-prosumer-dso/register-prosumer-dso.component';
import { UserAdministrationComponent } from './Pages/DSO/user-administration/user-administration.component';
import { MapaComponent } from './Component/mapa/mapa.component';

import { AllProsumersTableComponent } from './Pages/DSO/all-prosumers-table/all-prosumers-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchBarDsoComponent } from './Component/search-bar-dso/search-bar-dso.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToggleSwitchComponent } from './Component/toggle-switch/toggle-switch.component';
import { SearchBarComponent } from './Component/search-bar/search-bar.component';

import { CdkDragDropConnectedSortingGroupComponent } from './Component/cdk-drag-drop-connected-sorting-group/cdk-drag-drop-connected-sorting-group.component';
import { BottomMeniComponent } from './Component/bottom-meni/bottom-meni.component';
import { AddDevicesComponent } from './Pages/Prosumer/add-devices/add-devices.component';
import { MyDeviceComponent } from './Pages/Prosumer/my-device/my-device.component';
import { LineGraphProsumerComponent } from './Component/line-graph-prosumer/line-graph-prosumer.component';
import { DeviceSumConsumptionComponent } from './Component/device-sum-consumption/device-sum-consumption.component';
import { MyDevicesComponent } from './Pages/Prosumer/my-devices/my-devices.component';
import { ProsumerDeviceListElementComponent } from './Component/prosumer-device-list-element/prosumer-device-list-element.component';
import { NgToggleModule } from 'ng-toggle-button';
import { MyDeviceInterface } from './Pages/Prosumer/my-devices/my-devices.component';
import { ProsumerDeviceListElementGridComponent } from './Component/prosumer-device-list-element-grid/prosumer-device-list-element-grid.component';
import { ProsumptionAnalysisComponent } from './Pages/DSO/prosumption-analysis/prosumption-analysis.component';
import { SettingsDsoComponent } from './Pages/DSO/settings-dso/settings-dso.component';
import { DialogBoxComponent } from './Component/dialog-box/dialog-box.component';
import { MatInputModule } from '@angular/material/input';
import { InterceptorService } from './Services/API/Security/Interceptor/interceptor.service';
import { DateRangePickerComponent } from './Component/date-range-picker/date-range-picker.component';
import { AnalysisProsumerComponent } from './Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';
import { LineGraphAnalysisComponent } from './Component/line-graph-analysis/line-graph-analysis.component';
import { BarChartAnalysisComponent } from './Component/bar-chart-analysis/bar-chart-analysis.component';
import { SimpleCardAnalysisComponent } from './Component/simple-card-analysis/simple-card-analysis.component';
import { LineGraphHomeProsumerComponent } from './Component/line-graph-home-prosumer/line-graph-home-prosumer/line-graph-home-prosumer.component';
import { ProsumerDeviceConsumptionCardComponent } from './Component/prosumer-device-consumption-card/prosumer-device-consumption-card/prosumer-device-consumption-card.component';
import { OpenWeatherWidgetComponent } from './Component/open-weather-widget/open-weather-widget.component';

import { RegisterProsumerComponent } from './Component/register-prosumer/register-prosumer.component';
import { MapProsumersComponent } from './Component/map-prosumers/map-prosumers.component';
import { ListOfRequestsComponent } from './Component/list-of-requests/list-of-requests.component';
import { ListDevicesComponent } from './Pages/Prosumer/list-devices/list-devices.component';
import { ThreeStateToggleSwitchComponent } from './Component/three-state-toggle-switch/three-state-toggle-switch.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { OpenWeatherWidgetTodayComponent } from './Component/open-weather-widget-today/open-weather-widget-today.component';
import { DialogComponent } from './Component/dialog/dialog.component';
import { SnackBarComponent } from './Component/snack-bar/snack-bar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { InterceptorErrorService } from './Services/API/Security/InterceptorError/interceptor-error.service';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { DialogDeleteComponent } from './Component/dialog-delete/dialog-delete.component';
import { WorkRulesComponent } from './Component/work-rules/work-rules.component';

// import {
//   MatSnackBarRef,
//   MAT_SNACK_BAR_DATA,
// } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoComponent,
    HomeDsoComponent,
    LeftMeniComponent,
    DeviceImageComponent,
    HomeProsumerComponent,
    RoundProgressbarComponent,
    WorkTimeComponent,
    SimpleCardComponent,
    LineGraphComponent,
    WeatherSimpleCardComponent,
    RegisterProsumerDsoComponent,
    UserAdministrationComponent,
    CdkDragDropConnectedSortingGroupComponent,
    LeftMeniProsumerComponent,
    SettingsProsumerComponent,
    ProsumerPageDsoComponent,
    LineGraphThreeInOneComponent,
    BarChartConsumptionProductionComponent,
    MapaComponent,
    AllProsumersTableComponent,
    SearchBarDsoComponent,
    ToggleSwitchComponent,
    LeftMeniProsumerComponent,
    SearchBarComponent,
    
    BottomMeniComponent,
    AddDevicesComponent,
    MyDeviceComponent,
    LineGraphProsumerComponent,
    DeviceSumConsumptionComponent,
    MyDevicesComponent,
    ProsumerDeviceListElementComponent,
    ProsumerDeviceListElementGridComponent,
    ProsumptionAnalysisComponent,
    SettingsDsoComponent,
    DialogBoxComponent,
    DateRangePickerComponent,
    AnalysisProsumerComponent,
    LineGraphAnalysisComponent,
    BarChartAnalysisComponent,
    SimpleCardAnalysisComponent,
    DateRangePickerComponent,
    LineGraphHomeProsumerComponent,
    ProsumerDeviceConsumptionCardComponent,
    RegisterProsumerComponent,
    MapProsumersComponent,
    ListOfRequestsComponent,
    ListDevicesComponent,
    OpenWeatherWidgetComponent,
    OpenWeatherWidgetTodayComponent,
    ThreeStateToggleSwitchComponent,
    DialogComponent,
    ErrorPageComponent,
    DialogDeleteComponent,
    WorkRulesComponent,
  ],
  entryComponents: [
    DialogBoxComponent,
    ProsumptionAnalysisComponent,
    DateRangePickerComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    NgToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    MatSnackBarModule
  ],
  providers: [
    Router,
    { provide: HTTP_INTERCEPTORS, useClass:InterceptorErrorService, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    MatDatepickerModule, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    MatFormFieldModule,
    MatNativeDateModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

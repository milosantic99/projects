import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register-DSO/register.component';
import { HomeDsoComponent } from './Pages/DSO/home-dso/home-dso.component';
import { HomeProsumerComponent } from './Pages/Prosumer/home-prosumer/home-prosumer.component';
import { ProsumerPageDsoComponent } from './Pages/DSO/prosumer-page-dso/prosumer-page-dso.component';
import { RegisterProsumerDsoComponent } from './Pages/DSO/register-prosumer-dso/register-prosumer-dso.component';
import { SettingsProsumerComponent } from './Pages/Prosumer/settings-prosumer/settings-prosumer.component';
import { UserAdministrationComponent } from './Pages/DSO/user-administration/user-administration.component';
import { AllProsumersTableComponent } from './Pages/DSO/all-prosumers-table/all-prosumers-table.component';
import { AddDevicesComponent } from './Pages/Prosumer/add-devices/add-devices.component';
import { MyDevicesComponent } from './Pages/Prosumer/my-devices/my-devices.component';
import { ProsumptionAnalysisComponent } from './Pages/DSO/prosumption-analysis/prosumption-analysis.component';
import { MyDeviceComponent } from './Pages/Prosumer/my-device/my-device.component';
import { SettingsDsoComponent } from './Pages/DSO/settings-dso/settings-dso.component';
import { AnalysisProsumerComponent } from './Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';
import { RegisterProsumerComponent } from './Component/register-prosumer/register-prosumer.component';
import { RoleGuardService } from './Services/API/Security/RoleGuard/role-guard.service';
import { AuthGuardService } from './Services/API/Security/AuthGuard/auth-guard-service.service';
import { ListDevicesComponent } from './Pages/Prosumer/list-devices/list-devices.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent, canActivate:[AuthGuardService]},  
  { path: 'register', component: RegisterProsumerComponent, canActivate:[AuthGuardService]},
  { path: 'error', component: ErrorPageComponent},
  // DSO
  { path:'HomeDso',component:HomeDsoComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}},
  { path:'RegisterProsumer', component:RegisterProsumerDsoComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}}, //Ostaviti prikaz
  { path: 'ProsumerPageDso/:prosumerId', component:ProsumerPageDsoComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}},
  { path: 'UserAdministration', component:UserAdministrationComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO']}},
  {path: 'AllProsumersTable', component:AllProsumersTableComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}},
  { path: 'ProsumptionAnalysis', component:ProsumptionAnalysisComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}},
  {path: 'SettingsDso', component:SettingsDsoComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_DSO','ROLE_DISPATCHER']}},
  // Prosumer
  { path:'HomeProsumer',component:HomeProsumerComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'SettingsProsumer', component:SettingsProsumerComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'AddDevices',component:AddDevicesComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'AddDevices/List',component:ListDevicesComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'MyDevices',component:MyDevicesComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'MyDevice/:deviceId',component:MyDeviceComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}},
  { path:'Analysis', component:AnalysisProsumerComponent , canActivate:[RoleGuardService] , data:{excepterdRole:['ROLE_PROSUMER','ROLE_PROSUMER_DEMO']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
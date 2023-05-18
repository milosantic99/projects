import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardModeratorComponent } from "./board-moderator/board-moderator.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { BarChartComponent } from "./Charts/bar-chart/bar-chart.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { MychartsComponent } from "./mycharts/mycharts.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";

import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "./auth.guard";
import { MyModelsComponent } from "./my-models/my-models.component";

const routes: Routes = [
    { path: '', redirectTo: '/welcome-page', pathMatch: 'full' },
    { path: 'welcome-page', component: WelcomePageComponent},
    { path: 'register', component: RegisterComponent,},
    { path: 'login', component: LoginComponent,},

    { path: 'mymodels', component: MyModelsComponent, canActivate: [AuthGuard]},
    
    { path: 'charts', component: BarChartComponent, canActivate: [AuthGuard]},
    
    { path: 'home', component: MainContentComponent, canActivate: [AuthGuard]},
    { path: 'mycharts', component: MychartsComponent, canActivate: [AuthGuard]},
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    
                        //???//
    { path: 'profile', component: ProfileComponent },
    { path: 'employees', component: EmployeeListComponent},
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: BoardAdminComponent },
                        //???//

    { path: '**', redirectTo: '/welcome-page' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { LoginComponent } from './login/login.component';
import { SharedFilesComponent } from './shared-files/shared-files.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'home', component: OverviewComponent},
  { path: "shared", component: SharedFilesComponent},
  { path: "settings", component:UserSettingsComponent},
  { path: ':id', component: MyFilesComponent},
  { path: 'root', component: MyFilesComponent,
    children: [{
      path: ':id',
      component: MyFilesComponent
    }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

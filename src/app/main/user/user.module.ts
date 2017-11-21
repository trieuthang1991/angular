import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes, RouterModule} from '@angular/router';

const UserRoutes : Routes = [
  {path :'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes)
  ],
  declarations: [UserComponent]
})
export class UserModule { }

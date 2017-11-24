import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {Routes, RouterModule} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {NotificationService} from '../../core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import {UploadService} from '../../core/services/upload.service';
const UserRoutes : Routes = [
  {path :'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    MultiselectDropdownModule,
    Daterangepicker,
    ModalModule.forRoot(),
    RouterModule.forChild(UserRoutes)
  ],
  declarations: [UserComponent],
  providers:[DataService,NotificationService,UploadService]
})
export class UserModule { }

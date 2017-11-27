import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule , Routes} from '@angular/router';
import { UserModule} from './user/user.module';
import { HomeModule} from './home/home.module';
import { AuthenService } from '../core/services/authen.service';
import {UtilityService} from '../core/services/utility.service';
import {SlidebarMenuComponent} from '../shared/slidebar-menu/slidebar-menu.component';
import {TopMenuComponent} from '../shared/top-menu/top-menu.component';
@NgModule({
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(mainRoutes)
  ],
  
  declarations: [MainComponent,SlidebarMenuComponent,TopMenuComponent],
  providers:[AuthenService,UtilityService]
})
export class MainModule { }

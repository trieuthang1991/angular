import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../core/services/notification.service";
import {AuthenService} from "../core/services/authen.service";
import {MessageContants} from "../core/Common/message.constant";
import {UrlConstants } from "../core/Common/url.constant";
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading= false;
  model:any={};
  returnurl:string;
  constructor(private authenService: AuthenService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.loading = true;
    this.authenService.login(this.model.username, this.model.password).subscribe(data => {
      this.router.navigate([UrlConstants.HOME]);
    }, error => {
      this.notificationService.printErrorMessage(MessageContants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }
  

}

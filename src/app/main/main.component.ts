import { Component, OnInit } from '@angular/core';
import {SystemConstants } from '../core/Common/system.constant';
import {UrlConstants} from '../core/Common/url.constant';
import {UtilityService} from '../core/services/utility.service';
import {AuthenService} from '../core/services/authen.service';
import {LoggedInUser} from '../core/domain/loggedin.user';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user:LoggedInUser;

  constructor(private utilitiService:UtilityService) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem(SystemConstants.Current_User));
    console.log(this.user);
  }
  logout()
  {
    localStorage.removeItem(SystemConstants.Current_User);
    this.utilitiService.navigate(UrlConstants.LOGIN);
   
  }

}

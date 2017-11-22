import { Component, OnInit } from '@angular/core';
import {SystemConstants } from '../core/Common/system.constant';
import {UrlConstants} from '../core/Common/url.constant';
import {UtilityService} from '../core/services/utility.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private utilitiService:UtilityService) { }

  ngOnInit() {
  }
  logout()
  {
    localStorage.removeItem(SystemConstants.Current_User);
    this.utilitiService.navigate(UrlConstants.LOGIN);
  }

}

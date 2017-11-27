import { Component, OnInit } from '@angular/core';
import {LoggedInUser} from '../../core/domain/loggedin.user';
import{AuthenService} from '../../core/services/authen.service';
import{SystemConstants} from '../../core/Common/system.constant';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user:LoggedInUser;
  public baseFolder: string = SystemConstants.BASE_API;
  constructor(private _AuthenService:AuthenService) { }

  ngOnInit() {
 this.user=this._AuthenService.getLoggedInUser();
  }
}

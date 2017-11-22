import { Injectable } from '@angular/core';
import { SystemConstants } from '../../core/Common/system.constant';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoggedInUser } from '../domain/loggedin.user';
@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }
  login(username: string, password: string) {
    let body = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&grant_type=password";

    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: headers });
    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body).map((response: Response) => {
      let user: LoggedInUser = response.json();
      if (user && user.access_token) {
        localStorage.removeItem(SystemConstants.Current_User);
        localStorage.setItem(SystemConstants.Current_User, JSON.stringify(user));
      }
    });
  }
  logout() {
    localStorage.removeItem(SystemConstants.Current_User);
  }
  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.Current_User)
    if(user != null)
    {
      return true;
    }
    else
    {
      return false;
    }
 
  }
  getLoggedInUser(): LoggedInUser {
    let user : LoggedInUser;
    if(this.isUserAuthenticated)
    {
      var userdata = JSON.parse(localStorage.getItem(SystemConstants.Current_User));
      user = new LoggedInUser(userdata.access_token,userdata.username,userdata.fullName,userdata.email,userdata.avatar);
    }
    else
    {
      user=null;

    }
    return user;
   
  }


}

import { Injectable } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import {Router} from '@angular/router';
import { SystemConstants  } from './../Common/system.constant';
import {AuthenService} from './authen.service';
import {Observable} from 'rxjs/Observable';
import {MessageContants} from './../Common/message.constant';
import {NotificationService} from './notification.service';
import {UtilityService} from './utility.service'; 
@Injectable()
export class DataService {
  private headers : Headers

  constructor(private _http:Http , private _router:Router,private _authenService:AuthenService , 
    private _notificationService:NotificationService,private _UtilityService:UtilityService){
      this.headers  = new Headers();
      this.headers.append('Content-Type','application/json');
     }
  get(uri:string){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.get(SystemConstants.BASE_API + uri,{headers:this.headers}).map(this.extractData);
  }
  post(uri:string,data?:any)
  {
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.post(SystemConstants.BASE_API + uri,data,{headers:this.headers}).map(this.extractData);
  }
  put(uri:string ,data?:any)
  {
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.put(SystemConstants.BASE_API + uri,data,{headers:this.headers}).map(this.extractData);
  }
  delete(uri:string,key:string,id:string)
  {
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.put(SystemConstants.BASE_API + uri + "/?"+ key +"=" +id,{headers:this.headers}).map(this.extractData);
  }
  postFile(uri:string,data?:any)
  {
    let newHeader = new Headers();
  
    newHeader.append("Authorization","Bearer" + this._authenService.getLoggedInUser().access_token)
    return this._http.put(SystemConstants.BASE_API + uri,data,{headers:newHeader}).map(this.extractData);
  }
  private extractData(res:Response)
  {
    let body=res.json();
    return body || {};
  }
  public handleError(error:any)
  {
    if(error.status==401)
    {
      localStorage.removeItem(SystemConstants.Current_User);
      this._notificationService.printErrorMessage(MessageContants.SYSTEM_ERROR_MSG);
      this._UtilityService.navigateToLogin();
    }
    else
    {
      let errMsg = (error.message)? error.message: error.status?`${error.statustext}`:'Lỗi Hệ Thống';
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }

}

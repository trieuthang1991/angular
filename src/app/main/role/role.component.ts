import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {NotificationService} from '../../core/services/notification.service';
import {MessageContants} from '../../core/Common/message.constant';
import { error } from 'util';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('modalAddEdit') public modalAddEdit:ModalDirective
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow:number;
  public filter: string = '';
  public roles: any[];
  public entity:any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
      this.roles = response.Items;
      console.log(response);
      this.pageIndex=response.PageIndex;
      this.pageSize = response.PageSize;
      this.totalRow= response.TotalRows;
      });
  }
  pageChanged(event:any):void
  {
   this.pageIndex=event.page;
   this.loadData();
  }
  showAddModal()
  {
    this.entity= {};
    this.modalAddEdit.show();
  }
  saveChange(valid:boolean)
  {
    if(valid)
    {
      if(this.entity.Id==undefined)
      {
        this._dataService.post('/api/appRole/add',JSON.stringify(this.entity)).subscribe((response:any)=>
      {
        this.loadData();
        this.modalAddEdit.hide();
        this._notificationService.printSuccessMessage(MessageContants.CREATED_OK_MSG);
      },error=>this._dataService.handleError(error));
      }
      else
      {

      }
    }
  }
}
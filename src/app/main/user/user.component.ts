import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContants } from '../../core/Common/message.constant';
import { error } from 'util';
import { Response } from '@angular/http/src/static_response';
import { SystemConstants } from '../../core/Common/system.constant';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { UploadService } from '../../core/services/upload.service';

declare var moment: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modalAddEditUser') public modalAddEditUser: ModalDirective
  @ViewChild('avatar') avatar
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public users: any[];
  public entity: any;

  public baseFolder: string = SystemConstants.BASE_API;

  public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public dateOption: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };


  constructor(private _dataService: DataService, private _notificationService: NotificationService, private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadData();
    this.loadRoles();
  }
  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
        console.log(response);
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalRow = response.TotalRows;
      });
  }
  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }
  loadId(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
      
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
        console.log(this.entity.BirthDay);
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
  showAddModal() {
    this.entity = {};
    this.modalAddEditUser.show();
  }
  ShowEditModal(id: any) {
    this.loadId(id);
    this.modalAddEditUser.show();
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));

  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  saveChange(valid: boolean) {
    if (valid) {
      this.entity.Roles = this.myRoles;
      let fi = this.avatar.nativeElement;// lấy ra giá trị bằng HTML
      if (fi.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files).then((imageUrl: string) => {
          this.entity.Avatar = imageUrl;
        }).then(() => {
          this.saveData()
        });
      }
      else {
        this.saveData();
      }
    }
  }
  saveData() {
    if (this.entity.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.modalAddEditUser.hide();
          this._notificationService.printSuccessMessage(MessageContants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEditUser.hide();
        this._notificationService.printSuccessMessage(MessageContants.UPDATED_OK_MEG);
      }, error => this._dataService.handleError(error));

    }
  }
  public selectGender(event) {
    this.entity.Gender = event.target.value
  }
}

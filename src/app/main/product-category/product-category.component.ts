import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';

import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContants } from '../../core/Common/message.constant';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  private treeCategory: TreeComponent;
  private _CategoryHierachy: any[];
  private _Categorys: any[];
  private entity: any;
  public editFlag: boolean;
  public filter: string = "";

  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.Seach();
  }
  public Seach() {
    this._dataService.get('/api/productCategory/getall?filter=' + this.filter).subscribe((response: any[]) => {
      this._CategoryHierachy = this.utilityService.Unflatten2(response);
      console.log(this._CategoryHierachy);
      this._Categorys = response.filter(x => x.ParantID == null);
    }, error => this._dataService.handleError(error));
  }
  //Show add Form 
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
    this.editFlag = false;
  }
  public showEdit(id: string) {
    this._dataService.get('/api/productCategory/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.editFlag = true;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }
  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContants.DELETED_OK_MSG);
      this.Seach();
    }, error => this._dataService.handleError(error));
  }
  //Click
  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageContants.DELETED_OK_MSG, () => this.deleteConfirm(id));
  }
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('/api/productCategory/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.Seach();
            this.addEditModal.hide();
            this.notificationService.printSuccessMessage(MessageContants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/productCategory/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.Seach();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContants.UPDATED_OK_MEG);
        },error=>this._dataService.handleError(error));
      }
    }
  }


}

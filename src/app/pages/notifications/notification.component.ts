import { Component, OnInit, ViewEncapsulation , Input } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../ui-features/modals/modal/modal.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import {NotificationService } from '../filler-library/shared/notification.service';
import {FillerLibraryComponent } from '../filler-library/filler-library.component';
import { Notification } from '../filler-library/shared/notification.model';

declare var $:any;
@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['notificationlist.component.scss','./notification-filler.css','../filler-library/notification/notification.component.scss'],
  providers :[NotificationService,FillerLibraryComponent]
})
export class NotificationListComponent implements OnInit {
selectedText:string;
currentSelection : string;
isCurrentSelectionFiller : boolean = false;
selectionStartIndex : number =-1;
selectionEndIndex : number =-1;
currentFillerStartIndex : number = -1;
currentFillerEndIndex : number = -1;
newFillerVal : string;
fillArr = [];
colors:string;
showAddNewFiller:boolean = true;

showFillerStatus:boolean = false;;
  
  notificationList : any =[]
  Object = Object;
  showFillerLibraryPage : boolean = false;
  selectedNotification : Notification;

  ngOnInit() {
      this.loadNotifications();
  }
  
  getNotification($event){
      console.log('BACK BTN CLICKED : ')
      console.log($event)
      
      if($event == true){
          this.showFillerLibraryPage = false;
      }
  }
  // noti_EditList: Notification[];
  constructor(private notificationService : NotificationService,private tostr: ToastrService , private modalService: NgbModal) { }
  
  loadNotifications(){
      console.log('list notifications : ')
      let notificationListSnapshot = this.notificationService.getData();
      
      notificationListSnapshot.snapshotChanges().subscribe(item => {
          this.notificationList = [];
          item.forEach(element => {
              
            var y = element.payload.toJSON();
            console.log(y);
            y["noti_ID"] = element.key;
            this.notificationList.push(y as Notification);
          });
        });
      console.log(this.notificationList);
  }
  
  getRandomColor(notification,index){
      if(notification){
          let color = notification.Customer_Segment_ID[index].color
          if(color){
              return color;
          }else{
              notification.Customer_Segment_ID[index].color =this.notificationService.getRandomColor();
              return notification.Customer_Segment_ID[index].color
          }
      }
      
  }
  
  showFillerLibPage(notification){
      console.log('show now'+this.showFillerLibraryPage)
      
      this.selectedNotification = notification;
      console.log('notification in parent : ')
      console.log(this.selectedNotification)
      
      this.onEdit(notification);
      this.showFillerLibraryPage = true;
  }
  
  showNotificationLists(){
      this.showFillerLibraryPage = false;
  }
  
  getFillerList(notification){
      if(notification.filters){
          return notification.filters
      }else{
          let fillerList = this.notificationService.getFillerListFromNotificationObj(notification);
          notification.filters = fillerList; 
          return fillerList;
      }
      
  }
  
  onEdit(noti: Notification) {
      this.notificationService.selectedNotification = Object.assign({}, noti);
      let tempCustomerId = [];

      if(this.notificationService.selectedNotification.Customer_Segment_ID){

          for(let i=0;;i++)
          {
            if(this.notificationService.selectedNotification.Customer_Segment_ID[i] != undefined)
              tempCustomerId.push(this.notificationService.selectedNotification.Customer_Segment_ID[i]);
            else
              break;
          }

          this.notificationService.selectedNotification.Customer_Segment_ID = tempCustomerId;
          this.notificationService.itemArray = this.notificationService.itemsInit.slice(0);
          let tempItemArray = [];
          for(let i=0;i<this.notificationService.itemArray.length;i++)
          {
            for(let j=0;j<tempCustomerId.length;j++)
            {
              if(this.notificationService.itemArray[i].name != tempCustomerId[j].name&&j==tempCustomerId.length-1)
                tempItemArray.push(this.notificationService.itemArray[i]);
              if(this.notificationService.itemArray[i].name == tempCustomerId[j].name)
                break;
            }
          }
          this.notificationService.itemArray = tempItemArray;
      }
      else{
          this.notificationService.selectedNotification.Customer_Segment_ID = [];
          this.notificationService.itemArray = this.notificationService.itemsInit.slice(0);
      }
      
      this.notificationService.temp  = Object.assign({}, this.notificationService.selectedNotification);
      this.notificationService.rightArray = this.notificationService.selectedNotification.Customer_Segment_ID;
      this.notificationService.tempItemArray = this.notificationService.itemArray.slice(0);
      this.notificationService.tempRightArray = this.notificationService.rightArray.slice(0);

    }
  
}

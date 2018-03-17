import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Notification } from './notification.model';
import { Filler } from './filler.model';

@Injectable()
export class NotificationService {

  notificationList: AngularFireList<any>;
  selectedNotification: Notification = new Notification();
  temp: Notification = new Notification();
  rightArray: any = [];
  itemArray: any = [];
  tempItemArray: any = [];
  tempRightArray: any = [];
  showHide = 0;
  curPreset = [];
  editValue  = 0;
  editFillerSection = 0;
  addFillerTextbox = 0;
  itemsInit = [
    { id: 1, name: 'Normacjk' },
    { id: 2, name: 'Inspiring' },
    { id: 3, name: 'Extraordinary' },
    { id: 4, name: 'Successfully accomplished' },
    { id: 5, name: 'Unsuccessfull' },
    { id: 6, name: 'Trending' },
    { id: 7, name: 'Over Anticipated' },
    { id: 8, name: 'Normally Existed.' },
    { id: 9, name: 'item1' },
    { id: 10, name: 'item2' },
    { id: 11, name: 'item3' },
    { id: 12, name: 'item4' },
    { id: 13, name: 'item5' },
  ];
  fillerArray = [
    {
      filler_id: '1', tag_name: 'Country', count: 4, "value_segments":
        {
          "10": ["High loyalty", "Low skill", "High loyalty", "Low skill", "High loyalty", "Low skill"],
          "20": ["Low Loyalty", "High Skill"],
          "30": ["High loyalty", "Low skill", "High loyalty", "Low skill", "High loyalty", "Low skill"],
          "40": ["Low Loyalty", "High Skill"],
          "50": ["Low Loyalty", "High Skill"],
          "60": ["Low Loyalty", "High Skill"],
          "70": ["Low Loyalty", "High Skill"],
          "80": ["Low Loyalty", "High Skill"],
          "90": ["Low Loyalty", "High Skill"],
          "100": ["Low Loyalty", "High Skill"]
        }
    },
    {
      filler_id: '2', tag_name: 'Time', count: 1, "value_segments":
        { "10": ["High loyalty", "Low skill"], "20": ["Low Loyalty", "High Skill"] }
    },
    { filler_id: '3', tag_name: 'Month', count: 2 },
    { filler_id: '4', tag_name: 'brave', count: 5 },
    { filler_id: '5', tag_name: 'Day', count: 6 },
    { filler_id: '6', tag_name: 'Username', count: 4 },
    { filler_id: '7', tag_name: 'test1', count: 5 },
    { filler_id: '8', tag_name: 'test3', count: 5 },
    { filler_id: '9', tag_name: 'test2', count: 0 },
    { filler_id: '10', tag_name: 'test4', count: 6 },
    { filler_id: '11', tag_name: 'test5', count: 11 },
  ];
  notificationTemplate = [
    { templateId: '1', title: 'Hello `Username`. Today is `Month`', body: 'Hello `brave`. Today is `test4`' },
    { templateId: '2', title: 'test `Country` . Today is `test1`', body: '`Time`. Today is `Day`' },
    { templateId: '3', title: 'test `brave` . Today is `test1`', body: '`Time`. Today is `Day`' }
  ];
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.notificationList = this.firebase.list('notifications');
    return this.notificationList;
  }

  insertNotification(notification: Notification, arr) {
    this.getData();
    if (!notification.deeplink) {
      this.notificationList.push({
        title: notification.title,
        body: notification.body,
        deeplink: '',
        Customer_Segment_ID: arr
      });
    } else {
      this.notificationList.push({
        title: notification.title,
        body: notification.body,
        deeplink: notification.deeplink,
        Customer_Segment_ID: arr
      });
    }
  }

  updateNotification(notification: Notification, arr) {

    if (!notification.deeplink) {
      this.notificationList.update(notification.noti_ID,
        {
          title: notification.title,
          body: notification.body,
          deeplink: '',
          Customer_Segment_ID: arr
        });
    }
    else {
      this.notificationList.update(notification.noti_ID,
        {
          title: notification.title,
          body: notification.body,
          deeplink: notification.deeplink,
          Customer_Segment_ID: arr
        });
    }
  }

  deleteNotification(noti_ID: string) {
    this.notificationList.remove(noti_ID);

  }

  getFiller() {
    let finalArrayObj = this.fillerArray;
    for (var i = 0; i < finalArrayObj.length; i++) {
      finalArrayObj[i]['color'] = this.getRandomColor();
    }
    return finalArrayObj;
  }


  getNotificationTemplate() {
    for (var i = 0; i < this.notificationTemplate.length; i++) {
      let fillerArray = this.getFillerListFromNotificationObj(this.notificationTemplate[i]);
      if (!this.notificationTemplate[i]['filler']) this.notificationTemplate[i]['filler'] = []

      this.notificationTemplate[i]['filler'].push(fillerArray);
    }
    return this.notificationTemplate;
  }

  getFillerListFromNotificationObj(notificationObj) {
    let fillers = []
    let str = this.getConcateString(notificationObj.title, notificationObj.body);
    let splittext = str.match(/`(.*?)`/g);
    for (var j = 0; j < splittext.length; j++) {
      fillers.push(this.getFillerByName(splittext[j].slice(1, -1)));
    }

    return fillers;
  }

  getConcateString(title, body) {
    return title + body;
  }

  getFillerByName(fillerName) {
    let fillerNameList = {};
    for (var i = 0; i < this.fillerArray.length; i++) {
      if (this.fillerArray[i].tag_name == fillerName) {
        fillerNameList = this.fillerArray[i];
        fillerNameList['color'] = this.getRandomColor();
        break;
      }
    }
    return fillerNameList;
  }

  addFiller(val) {
    var id = this.fillerArray.length;
    this.fillerArray.push({ filler_id: (id + 1) + '', tag_name: val, count: 0 });
    return this.fillerArray;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

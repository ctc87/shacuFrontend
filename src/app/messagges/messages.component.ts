import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { LoginService, DownloadService, UploadService} from '../_services';
import { Inject } from '@angular/core';
import { trigger } from '@angular/animations';
import { animate } from '@angular/animations';
import { style } from '@angular/animations';
import { transition } from '@angular/animations';

@Component({ 

    templateUrl: 'messages.component.html',
    styleUrls: ['./messages.component.scss'],
    animations: [
        trigger(
          'myAnimation',
          [
            transition(
            ':enter', [
              style({transform: 'translateX(-100%)', opacity: 0}),
              animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
            ]
          ),
          transition(
            ':leave', [
              style({transform: 'translateX(0)', 'opacity': 1}),
              animate('500ms', style({transform: 'translateX(-100%)', 'opacity': 0}))
             ]
          )]
        )
      ],

})
export class MessagesComponent implements OnInit {
    showNew = false;
    showOld = false; 


    constructor(
        private router : Router,
        private loginService : LoginService,
        public dialog: MatDialog,
        public downloadService : DownloadService,
        public uploadService : UploadService,

        ) {

    }

    ngOnInit() {
        this.updateMessages();
    }

    newMessages() {
        let newM = this.loginService.newMessages();
        newM.sort(function(a,b){
            if (a.reg_date > b.reg_date) return -1;
            if (a.reg_date < b.reg_date) return 1;
            return 0;
        });
        return newM;

    }
    

    oldMessahes() {
        let oldM = this.loginService.newMessages(true);
        oldM.sort(function(a,b){
            if (a.reg_date > b.reg_date) return -1;
            if (a.reg_date < b.reg_date) return 1;
            return 0;
        });
        return oldM;


    }


    formatDate (date) {
        date = new Date(date);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${da}-${mo}-${ye}`
    }

    openDialog(_data) {
        let data = _data;
        let that = this; 
        const dialogRef = this.dialog.open(DialogSeeMessage, {
            data,
            height: '80%',
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(result => {

            if(!result) {
            console.log("result", result)
            } else {
                that.readMessage(data.id);
            }

    
        });
      }

    async readMessage(id, inv = false) {
        let read = !inv; 
        await this.uploadService.update('messages', [{'id':id, 'readed' : read}])
        await this.updateMessages();
    }
    
    buttonUnReadMessage ($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        this.readMessage(id, true);
    }
    buttonReadMessage ($event, id) {
        $event.preventDefault();
        $event.stopPropagation();
        this.readMessage(id);
    }

    async updateMessages() {
        let user = this.loginService.user.email ? this.loginService.user : this.loginService.getUser();
        let meesages_ = await this.downloadService.DownloadUserMessages();
        user.messages = meesages_['data'];
        this.loginService.setUser(user)
        console.log(this.loginService.user)
        console.log(this.loginService.newMessages())
    }

    newContent() {
        this.router.navigate(['Content'])
    }

    manageContent() {
        this.router.navigate(['Content/manageContent'])
    }
}

@Component({
    selector: "dialog-overview-example-dialog",
    templateUrl: "dialog-overview.html",
    styleUrls: ['./messages.component.scss'],
  })
  export class DialogSeeMessage  {
      constructor
      (
          @Inject(MAT_DIALOG_DATA) public data: any,
      ) 
      {}
  
      changeValues($event) {
        
      }
  
  
  }



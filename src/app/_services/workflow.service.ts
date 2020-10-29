import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({  
    providedIn: 'root'  
  })  
  export class WorkflowService { 
    public data_list = [];
    public readed_qr  ={};


    upgradeTime = 7500;
    seconds = this.upgradeTime;
    timerVal = "00:00";
    countdownTimer
    counting = false;
    constructor() { 

    }

    startCountDown() {
        clearInterval(this.countdownTimer);
        this.countdownTimer = setInterval( () => this.timer(), 1000);
        this.counting = true;
    }

    timer() {
        let days        = Math.floor(this.seconds/24/60/60);
        let hoursLeft   = Math.floor((this.seconds) - (days*86400));
        let hours       = Math.floor(hoursLeft/3600);
        let minutesLeft = Math.floor((hoursLeft) - (hours*3600));
        let minutes     = Math.floor(minutesLeft/60);
        let remainingSeconds = this.seconds % 60;
        //this.timerVal = days + ":" + hours + ":" + minutes + ":" 
        this.timerVal = minutes + ":" 
        this.timerVal += remainingSeconds < 10 ?  "0" + remainingSeconds : remainingSeconds;
        if (this.seconds == 0) {
            clearInterval(this.countdownTimer);
            this.counting = false;
        } else {
            this.seconds--;
        }
    }

    itsRedable(id) {
        let readble = false;
        let data_element = {}
        if(this.data_list.length > 0) {
            data_element = this.data_list.find(function(x) {
                return x.id === id;
            });
            readble = data_element['inRange']; 
        }
        return readble;
    }

}
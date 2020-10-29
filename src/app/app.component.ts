import { Component, OnInit } from '@angular/core';

import { User } from './_models';
import { LoginService, DownloadService } from "./_services";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({ 
  selector: 'app', 
  templateUrl: 'app.component.html', 
  styleUrls:["app-component.scss"],
  animations: [
    trigger('visibilityChanged', [
      state('true', style({
        opacity: 0
      })),
      state('false',   style({
        opacity: 1
      })),
      transition('1 => 0', animate('1000ms ease')),
      transition('0 => 1', animate('1000ms ease'))
    ])
  ]
})
export class AppComponent implements OnInit{
  user: User;

  constructor(
      public loginService : LoginService,
      public downloadService: DownloadService
  ) {
    console.log(loginService.user)
    
  }



  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  interval;


  visibilityChanged:boolean = true;

    
  toggle() {
    console.log("TOGLLE")
    this.visibilityChanged = !this.visibilityChanged;
  }

  ngOnInit() {
    this.setCurrentLocation();
    
      console.log("set interval")
      this.interval = setInterval(() => {
        this.toggle();
      }, 2100);
/*       if(this.loginService.newMessages().length > 0) {
        clearInterval(this.interval);
      } */
  }

    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
    }
      
  
}
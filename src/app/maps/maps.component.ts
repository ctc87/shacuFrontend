import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { WorkflowService } from '../_services/workflow.service';
import { DownloadService} from '../_services/download.service'
import { MapsAPILoader } from '@agm/core';
import  {SlickCarouselComponent } from 'ngx-slick-carousel';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({ 

    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.scss'],
    animations: [
      trigger('blackState', [
        state('true', style({color:'#854092',  background: 'white'})),
        state('false', style({ color:'#white', background: '#854092' })),
        transition('0 <=> 1', animate('2000ms ease'))
      ]),
      trigger('greenState', [
        state('true', style({color:'#854092', background: 'white'})),
        state('false', style({ color:'#white', background: '#854092'})),
        transition('0 <=> 1', animate('2000ms ease'))
      ])
    ]

})
export class MapsComponent implements OnInit{

  @ViewChild('galleryOne') galleryOne: SlickCarouselComponent;


     // google maps zoom level
  zoom: number = 15;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  accuracy:number;
  loaded = false;
  origin;
  destination;
  map;
  google;
  enable_camera = false;
  previous;

  route = false;

  
  blackState:boolean = true;
  greenState: boolean = false;

/*   a   =[
    { name:'Vicente Zaragozá' , pos : {lat: 39.483373, lon:-0.357259}},
    { name:'Benimaclet' , pos : {lat: 39.484984, lon:  -0.363066}},
    { name:'Primat Reig' , pos : {lat: 39.486338, lon: -0.367592}},
    { name:'Alfauir' , pos : {lat: 39.489707, lon: -0.365344}},
    { name:'Orriols' , pos : {lat: 39.493205, lon:-0.367656}},
    { name:'Estadi del Llevant' , pos : {lat: 39.495116, lon:-0.365175}},
    { name:'Sant Miquel dels Reis' , pos : {lat: 39.497217, lon: -0.368515}},
    { name:'Tossal del Rei' , pos : {lat: 39.495891, lon:-0.372480}},
  ] */
  interval;
/* 
  content_description: "Rick y Morthy siempre tienen razón."
  content_name: "La existencia es dolor"
  content_type: "image"
  email: "carlos.troyano.carmona@gmail.com"
  expiration: 0
  file_path: "1_346dd5e1-c54f-456d-b6bc-254487b06502_large.png"
  firstname: "Carlos"
  id: 2
  lat: 39
  lon: 0
  nick: "carlos.tro"
  published: 0
  qr_id: 3
  qr_name: "Benimaclet"
  reg_date: "2020-10-24T21:07:30.000Z"
  size: 213572
  user_id: 1 */

    /* SLIDER */
 
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  

  constructor (
    public mapsAPILoader : MapsAPILoader,
    public dialog: MatDialog,
    public downloadService: DownloadService,
    public workflowService : WorkflowService,
    public router : Router,
    ) {
      
  }

  toggle() {
    this.blackState = !this.blackState;
    this.greenState = !this.greenState;
  }

  async initializePoints() {
    let data = await this.downloadService.DownloadContentFromQR([]);
    this.workflowService.data_list = data['data'];
    console.log(this.workflowService.data_list);
    this.workflowService.data_list.forEach(p =>{
      p['inRange'] = false;
    });
    this,
    this.loaded = true;

  }
  
  QrProximity(): void { 
    if(typeof(google) === 'undefined' || typeof(google.maps) === 'undefined' || typeof(google.maps.geometry) === 'undefined'){ 
      console.log('not yet loaded'); 
      setTimeout(() => this.QrProximity(), 50); 
     } else {
      let p1, p2;
      let that = this;
      let _enable_camera = false;
      this.workflowService.data_list.forEach(p => {
        console.log("cerca")
        p1 = new google.maps.LatLng(that.lat, that.lng);
        p2 = new google.maps.LatLng(p.lat, p.lon);
        let distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
        if((distance - that.accuracy - 10)  <= 0 ) {
          _enable_camera = true;
          p['inRange'] = true;
        } else {
          p['inRange'] = false;

        }
        console.log("that.enable_camera", that.enable_camera)

      });
      this.enable_camera = _enable_camera;
      if(this.enable_camera) {
        this.interval = setInterval(() => {
          this.toggle();
      }, 3000);
      } else {
        clearInterval(this.interval);
      }
     }
  }

  cameraClick() {
    this.router.navigate(["QR/readQR"]);
  }

  ngOnInit(): void {
    this.initializePoints();
    let that = this;
    navigator.geolocation.watchPosition(
      function(pos){
        that.lat = pos.coords.latitude;
        that.lng = pos.coords.longitude;
        that.accuracy = pos.coords.accuracy;
        that.QrProximity();
      }, 
      function(error){
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }


  clickedMarker(index: number, infowindow : any) {
    if (typeof(index) !== 'undefined' && typeof(infowindow) !== 'undefined') {
      if(typeof(this.galleryOne) !== 'undefined') {
        this.galleryOne.slickGoTo(index);
      }
      if (this.previous) {
        this.previous.close();
      }
      this.previous = infowindow;

    }
  }
  
  mapClicked($event: any) {

  }

  openDialog(_data) {
    let data = _data;
    let that = this; 
    const dialogRef = this.dialog.open(DialogContentDetail, {
        data
    });

    dialogRef.afterClosed().subscribe(result => {
        
      if(!result) {
        console.log("result", result)
      } else {
        that.origin ={ 'lat' : that.lat, 'lng' : that.lng }
        that.destination = { 'lat' : data.lat, 'lng' : data.lon }
        that.route = true;
      }
   

    });
  }

  public returnList() {
    this.origin ={ }
    this.destination = {}
    this.route = false;
  }


  public setPanel() {
    return document.getElementById('directionsPanel')

  }
  


/* 
  addSlide() {
  }
  
  removeSlide() {
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
 */
  


}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview.html",
  styleUrls: ['./maps.component.scss'],
})
export class DialogContentDetail  {
    constructor
    (
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) 
    {}

    changeValues($event) {
      
    }


}

 
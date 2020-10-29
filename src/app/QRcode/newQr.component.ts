import { FormGroup, FormControl } from '@angular/forms'; //imports
import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map, take } from 'rxjs/operators';  
import { UploadService } from  '../_services/upload.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
    templateUrl: 'newQr.component.html',
    styleUrls: ['newQr.component.scss'] 
})
export class NewQrComponent implements OnInit {
  content_name: string = "Meme Its Free";
  qr_name: string = "Vicente Zaragozá";


  
  constructor(
    private uploadService: UploadService,
    private _ngZone: NgZone
    ) 
    {    }
    
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
      this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }
    files  = [];  
    lat : Number = 39.483373;
    long : Number = -0.357259;
    description : String = "Meme de its free que mola un montón.";
    uploaded = false;
    qr_image;
    file_type = "image"

    async uploadFile(file) {  
        const formData = new FormData(); 

        console.log(file.data)
        formData.append('file', file.data); 
        formData.append('lat', "" + this.lat);  
        formData.append('long', "" + this.long);
        formData.append('file_type', "" + this.file_type);  
        formData.append('qr_name', "" + this.qr_name); 
        formData.append('content_name', "" + this.content_name); 
        formData.append('description', "" + this.description);  
        file.inProgress = true;  
        this.qr_image = this.uploadService.upload(formData).pipe(  
          map(event => {  
            switch (event.type) {  
              case HttpEventType.UploadProgress:  
                file.progress = Math.round(event.loaded * 100 / event.total);  
                break;  
              case HttpEventType.Response:  
                return event;  
            }  
          }),  
          catchError((error: HttpErrorResponse) => {  
            file.inProgress = false;  
            return of(`${file.data.name} upload failed.`);  
          })).subscribe((event: any) => {  
            console.log("event", event)
            if (typeof (event) === 'object') {  
              this.qr_image = event.body.qr  
            }  
          }); 
          //console.log("this.qr_image", this.qr_image) 
      }

    private uploadFiles() {  
        this.fileUpload.nativeElement.value = '';  
        this.files.forEach(file => {  
          this.uploadFile(file);  
        });  
    }

    onClick() {  
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {  
            for (let index = 0; index < fileUpload.files.length; index++)  
            {  
            const file = fileUpload.files[index];  
            this.files.push({ data: file, inProgress: false, progress: 0});  
            }  
            this.uploadFiles(); 
            this.uploaded = true;
        };  
        fileUpload.click();  
    }


    ngOnInit(){
        console.log("iniciado")
    }

   

    DocUpload($event) {
        console.log($event)
    }
}

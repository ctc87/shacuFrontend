import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map, take } from 'rxjs/operators';  
import { UploadService } from  '../_services/upload.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
    templateUrl: 'newContent.component.html',
    styleUrls: ['newContent.component.scss'] 
})
export class NewContentComponent {

   

  
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
    content_name : String = Math.random() + "Prueba";
    content_decription : String = Math.random() + "Descripción de prueba aaaaaaaaaaaaaaaaaaaa";
    qr_id : Number = 1;
    uploaded = false;
    content_data;
    file_type = "image"

    async uploadFile(file) {  
        const formData = new FormData(); 
        formData.append('file', file.data); 
        formData.append('content_name', "" + this.content_name);  
        formData.append('file_type', "" + this.file_type);  
        formData.append('description', "" + this.content_decription);
        formData.append('qr_id', "" + this.qr_id);  
        file.inProgress = true;  
        this.content_data = this.uploadService.uploadContent(formData).pipe(  
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
              console.log("event", event)
            }  
          }); 
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
        // obtener el iid del qr 
    }

   

    DocUpload($event) {
        console.log($event)
    }
}

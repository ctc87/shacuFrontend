import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { UploadService } from  '../_services/upload.service';
import { DownloadService } from  '../_services/download.service';
import { Router } from '@angular/router'; //import router

@Component({
    templateUrl: 'seeContent.component.html',
    styleUrls: ['seeContent.component.scss'] 
})
export class SeeContentComponent {
    qr_id;
    regexp = /^(?:\/Content\/)(?:qr\/)([0-9]+)$/
    loaded = false;
    qr_loaded;
    

    async loadData() {
        
        this.qr_id = this.router.url.match(this.regexp)[1];
        let data = await this.downloadService.DownloadContentFromQR([this.qr_id]);
        this.qr_loaded =data['data'][0];
        console.log(this.qr_loaded,data['data'][0])
        this.loaded = true;
    }
    
    constructor(
        private uploadService: UploadService,
        private downloadService: DownloadService,
        private router : Router,
    ) 
    {
        this.loadData();
    }


    download(url) {
        url = "https://192.168.1.58:8080/download/" + url;
        window.location.href = url
        //this.router.navigate([url])
    }
}

import { Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadService } from  '../_services/download.service';
import { UploadService } from  '../_services/upload.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {QR} from './qr'



@Component({ 
    templateUrl: 'manageQr.component.html',
    styleUrls: ['manageQr.component.scss'], animations: [
        trigger('widthGrow', [
            state('closed', style({
                left: -146,
            })),
            state('open', style({
                left: 0
            })),
            transition('* => *', animate(150))
        ]),
    ]
})
export class ManageQRComponent  {
    
    state = "closed";
    loading = false;
 
    qrList : QR[]  ; 
    displayedColumns: string[] = [];
    delete : Number[] = [];
    changes : Number[] = [];
    

    constructor(
        downloadService : DownloadService, 
        public dialog: MatDialog,
        public uploadService : UploadService
    )
    {
        this.getData(downloadService);
    }

    changeState(): void {
        (this.state == "closed") ? this.state = "open" : this.state = "closed";
    }

    async getData(downloadService) {
        this.loading = true;
        let a = await downloadService.Download(['*'], "qr");
        this.qrList = a.data;
        this.loading = false;
        //this.qrList = a.data; 
        let example_obj = this.qrList[0];
        
        for (const property in example_obj) {
            this.displayedColumns.push(property);
        } 
    }

    clicked ($event) {
        console.log(this.changes)
        let id = this.getId($event);
        this.openDialog(id);
    }
    
    getId($event) {
        let path;
        let elemnt_path = $event.path
        let i = 0;
        while(!path && (i < elemnt_path.length)) {
           i++;
           if(elemnt_path[i].tagName == "TR") {
                path = elemnt_path[i];
           }
        }        
        let id = Number(path.childNodes[0].innerText);
        return id
    }

    delete_ev($event) {
        $event.stopPropagation();
        let path;
        let button;
        if ($event.target.tagName == "BUTTON") { 
            button = $event.target;
        }
        let elemnt_path = $event.path
        let i = 0;
        while(!path && (i < elemnt_path.length)) {
           i++;
           if(elemnt_path[i].tagName == "TR") {
                path = elemnt_path[i];
           } else if (elemnt_path[i].tagName == "BUTTON" && !button) {
            button = elemnt_path[i];
           }
        }
        button.classList.toggle('delete-icon');
        path.classList.toggle('delete');
        
        let id = Number(path.childNodes[0].innerText);
        if(!this.delete.includes(id)) {
            this.delete.push(id)
        } else {
            this.delete = this.delete.filter(function(value, index, arr){
                return value != id;
            });
        }
    }

    async save() {
        let save_elements = [];    
        this.changes.forEach(id => {
            for (let i = 0; i < this.qrList.length; i++) {
                const qr = this.qrList[i];
                if(qr.id == id) {
                    save_elements.push(
                        {
                            'id': Number(qr.id),
                            'lat': Number(qr.lat),
                            'lon': Number(qr.lon),
                            'published' : Number(qr.published)
                        }
                    )
                }
            }
        });
        console.log(save_elements)
        this.loading = true;
        let res = await this.uploadService.update("qr", save_elements);
        this.loading = false;
        // TODO show alert 
    }

    async delete_() {
        this.loading = true;
        let res = await this.uploadService.delete("qr", this.delete);
        this.loading = false;
        if(res['delete']) {
            for (let i = 0; i < this.delete.length; i++) {
                const id = this.delete[i];
                this.qrList = this.qrList.filter(function(qr, index, arr){
                    return qr.id != id;
                });
            }
        }
        // TODO show alert 
    }

    openDialog(id) {
        let qr = this.qrList.find((element) => {
            return element.id === id;
        });
        let qr_original = Object.assign({}, qr);
        let initial_changes = this.changes.map((x) => x);
        let data = {qr:qr, changes:this.changes}
        console.log(data)
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            
          if(!result) {
            for (var i in this.qrList) {
                if (this.qrList[i].id == id) {
                    
                this.qrList[i] = qr_original;
                   break; //Stop this loop, we found it!
                }
            }
            if(!initial_changes.includes(id))
                this.changes = this.changes.filter(function(value, index, arr){
                    return value != id;
                });
          }
        });
      }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview.html"
})
export class DialogContentExampleDialog  {
    constructor
    (
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) 
    {}

    changeValues($event) {
        if(!this.data.changes.includes(this.data.qr.id))
            this.data.changes.push(this.data.qr.id)
    }

}

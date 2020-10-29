import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({  
    providedIn: 'root'  
  })  
  export class UploadService { 
    private REST_API_SERVER = "https://192.168.1.58:8080";


    constructor(private httpClient: HttpClient) { }

    
    public upload(formData) {
  
        
        return this.httpClient.post(this.REST_API_SERVER + "/uploadQR", formData,  {
            'reportProgress': true,  
            'observe': 'events' , 
            'withCredentials':true,
        });
    }


    public uploadContent(formData) {
        return this.httpClient.post(this.REST_API_SERVER + "/uploadContent", formData,  {
            'reportProgress': true,  
            'observe': 'events' , 
            'withCredentials':true,
        });
    }
    
    public update(table, data) {
        console.log("update")
        return this.httpClient.post(this.REST_API_SERVER + "/update", JSON.stringify({table:table, 'data':data }),  {
            'withCredentials':true,
             'headers': {
                'Content-Type': 'application/json'
              },
        }).toPromise();
    }  

    public delete(table, ids) {
        return this.httpClient.post(this.REST_API_SERVER + "/delete", JSON.stringify({table:table, 'ids':ids }),  {
            'withCredentials':true,
             'headers': {
                'Content-Type': 'application/json'
              },
        }).toPromise();
    }

    public exist(table, id) {
        console.log("Existe en blau ")
        return this.httpClient.post(this.REST_API_SERVER + "/exist", JSON.stringify({table:table, 'ids':id }),  {
            'withCredentials':true,
             'headers': {
                'Content-Type': 'application/json'
              },
        }).toPromise();

    }

}
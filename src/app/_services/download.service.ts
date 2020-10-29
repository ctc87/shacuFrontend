import { HttpClient, HttpParams } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable({  
    providedIn: 'root'  
  })  
  export class DownloadService { 
    private REST_API_SERVER = "https://192.168.1.58:8080";

    public qrList;
    constructor(private httpClient: HttpClient) { }

    

    public Download(ids, model){
            
        let params : HttpParams = new HttpParams().set('ids', ids.toString()).set('model', model)
        return this.httpClient.get(this.REST_API_SERVER + "/downloadModel", 
        {
            'withCredentials':true,
            'params' : params
        }).toPromise();
    }

    public DownloadUserMessages(){
            
        return this.httpClient.get(this.REST_API_SERVER + "/downloadUserMessages", 
        {
            'withCredentials':true,
        }).toPromise();
    }

    public DownloadContentFromQR(ids){
        
        let params : HttpParams = new HttpParams().set('ids', JSON.stringify(ids))
        return this.httpClient.get(this.REST_API_SERVER + "/downloadContentQR", 
        {
            'withCredentials':true,
            'params' : params
        }).toPromise();
    }


}
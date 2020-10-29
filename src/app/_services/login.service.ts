import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  logged = false;
  its_admin = false;

  img = "/assets/profile.jpg"
  user : any  = {};

  private REST_API_SERVER = "https://192.168.1.58:8080";

  public async itsLLogged () {
    let logged = await this.itsLoggedIn();
    if(logged['logged']) {

      this.logged = true;
      let admin = await this.itsAdmin();
      this.its_admin = admin['its_admin'];
      this.getUser();
    }
  }

  


  

  newMessages(inv = false) {
    if (!inv) {
      let a = this.user.messages.length > 0 ? (this.user.messages.filter(x => !x.readed)) : []
      return a;
    } else {
      let a = this.user.messages.length > 0 ? (this.user.messages.filter(x => x.readed)) : []
      return a;

    }
  }

    
  constructor(private httpClient: HttpClient) { 

    this.user.messages = [];
    this.itsLLogged();
  }

  public  itsLoggedIn(){
 
    return this.httpClient.get(this.REST_API_SERVER + "/itsLogged", {'withCredentials':true}).toPromise();
  }

  public  itsAdmin(){
    return this.httpClient.get(this.REST_API_SERVER + "/itsAdmin", {'withCredentials':true}).toPromise();
  }

  public getUser() {
    this.user = JSON.parse(window.localStorage.getItem("__user"));
    return this.user;
    
  }

  public setUser(user) {
    window.localStorage.setItem("__user", JSON.stringify(user))
    this.user = user;
  }
}
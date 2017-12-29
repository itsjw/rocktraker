import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Player, PlayerRequest } from './data.model';

@Injectable()
export class DataService {
  private apiRoot="https://api.rocketleaguestats.com/v1/player";
  private uniqueId="76561198030014809";
  private platformId="1";
  constructor(private http: Http) { }
  
  private getPlayerStats():Observable<Player>{
    let myHeaders = new Headers();
    myHeaders.append('Authorization', '0JRE6CY7IYIAR4TKUVV49F39OVM3H4MU');
    let myParams = new URLSearchParams();
    let options = new RequestOptions({ headers: myHeaders, params: myParams });
    let apiURL = `${this.apiRoot}?unique_id=${this.uniqueId}&platform_id=${this.platformId}`;
    try {
      return this.http.get(apiURL, options)
      .map(this.extractData)
      .catch(this.handleError)
    }
    catch(error){
      console.log(error);
    }
    
  }

  getPlayersStats(players:PlayerRequest[]):Observable<Player[]>{
    let myHeaders = new Headers();
    myHeaders.append('Authorization', '0JRE6CY7IYIAR4TKUVV49F39OVM3H4MU');
    let options = new RequestOptions({ headers: myHeaders});
    let body = players;
    let apiURL = `${this.apiRoot}/batch`;
    return this.http.post(apiURL,body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }
  
  extractData(res:Response){
    const body = res.json(); 
    console.log(body);
    return body || {}; 
  }
  
  handleError(error: any) { return Observable.throw(error); }

  myData() {
    return 'This is my data, man!';
  }

}
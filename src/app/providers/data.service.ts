import { Injectable, EventEmitter } from '@angular/core';
import { Http,RequestOptions,Headers, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Player, PlayerRequest, TierItem, RankedItem } from 'app/models/data.model';
import { AppSettingsService } from 'app/providers/app-settings.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class DataService{
  private apiRoot="https://api.rocketleaguestats.com/v1/player";
  private platformId="1";
  playerListRequest:PlayerRequest[];
  tiers: TierItem[] = null;
  ranksItemsRaw: RankedItem[]= null;
  playerList: Player[] = [];

  onGetData: EventEmitter<any> = new EventEmitter();
  onLoading: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http, private appSettingsService : AppSettingsService) {
    this.loadSettings();
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
    return body || {}; 
  }
  
  handleError(error: any) { return Observable.throw(error); }

  loadSettings(){
    let ranks = this.appSettingsService.getRanks();
    let tiers = this.appSettingsService.getTiers();
    let players = this.appSettingsService.getPlayers();
    forkJoin([ranks, tiers, players]).subscribe(results => {
      this.ranksItemsRaw = <any>results[0];
      this.tiers = <any>results[1];
      this.playerListRequest = <any>results[2];
      this.getCurrentPlayers();
    });
  }

  getCurrentPlayers() {
    this.onLoading.emit(true);
    this.getPlayersStats(this.playerListRequest) .subscribe(
      (result: Player[]) => {        
        result.forEach(player => {
            let prevPlayer = this.playerList.find(p=>player.uniqueId == p.uniqueId);
            if(prevPlayer){
              this.updateRanks(player,prevPlayer);
            }else{
              player.rankedItems= JSON.parse(JSON.stringify(this.ranksItemsRaw));
              this.updateRanks(player);
              this.playerList.push(player);
            }
        });
        //console.log(this.playerList);
        this.onGetData.emit(this.playerList);
        this.onLoading.emit(false);
      },     
      (error: any) => {  
        console.log('error in players request method');      
      }
    );   
  }


  updateRanks(player:Player, prevPlayer?:Player){
    let keys = Object.keys(player.rankedSeasons).map(i => Number(i));
    let maxIndex =  Math.max(...keys);
    let playerRanks = player.rankedSeasons[maxIndex];
    player.rankedItems.forEach((item,i)=>{
      let prevCurrent= null;
      if(prevPlayer){
         console.log(prevPlayer.rankedItems[i].current); 
      }
      let rank = playerRanks[item.rankIndex];
      let tier = this.tiers.find(tier => tier.tierId == rank.tier);
      let tierRange = tier.divisions.find(div => div.id ==rank.division && div.rankIndex === item.rankIndex);
      item.tierName = tier.tierName;
      item.img = tier.img;
      item.tierId = rank.tier;
      item.division = rank.division;
      item.current = rank.rankPoints;
      if(prevCurrent){
        item.dif = item.current - prevCurrent;
      }
      if(tierRange){
        item.up = tierRange.max - item.current;
        item.down = item.current - tierRange.min;
      }
    });    
  }
}
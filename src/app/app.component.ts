import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Player, PlayerRequest, TierItem, RankedItem } from './data.model';
import * as tiersList from './../assets/config/tiers.json';
import * as ranksList from './../assets/config/ranks.json';
import * as playerListRequest from './../assets/config/players.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loading:boolean;
  playerListRequest:PlayerRequest[];
  tiers: TierItem[] = null;
  ranksItemsRaw: RankedItem[]= null;
  ranksItems: RankedItem[]= null;

  fnHandleSelectionPlayer:Function;
  playerSeleted:Player = null;
  playerList: Player[] = [];

  constructor(private dataService:DataService) {
    this.ranksItems = this.ranksItemsRaw =(<any>ranksList);
    this.tiers = (<any>tiersList);
    this.playerListRequest =(<any>playerListRequest);
  }
  
  ngOnInit() {
    this.loading= true;
    this.getCurrentPlayer();
    this.fnHandleSelectionPlayer = this.handleSelectionPlayer.bind(this);
  }

  getCurrentPlayer() { 
    this.dataService.getPlayersStats(this.playerListRequest) .subscribe(
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
            if(this.playerSeleted && prevPlayer && this.playerSeleted.uniqueId == prevPlayer.uniqueId){
              this.handleSelectionPlayer(prevPlayer);
            }
        });
        if(this.playerSeleted == null){
          this.handleSelectionPlayer(this.playerList[0]);
        }
        this.loading = false;
      },     
      (error: any) => {  
        console.log('error in players request method');      
      }
    );   
  }

  private handleSelectionPlayer(player:Player){
    console.log(player);
      this.playerSeleted = player;
      this.ranksItems = player.rankedItems;
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

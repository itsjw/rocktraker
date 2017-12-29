import { Component, OnInit } from '@angular/core';
import { PlayerRequest, TierItem, RankedItem, Player } from 'app/models/data.model';
import { DataService } from 'app/providers/data.service';
import { forkJoin } from "rxjs/observable/forkJoin";
import * as fs  from 'fs';
import { AppSettingsService } from 'app/providers/app-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading:boolean;
  playerListRequest:PlayerRequest[];
  tiers: TierItem[] = null;
  ranksItemsRaw: RankedItem[]= null;
  ranksItems: RankedItem[]= null;

  fnHandleSelectionPlayer:Function;
  playerSeleted:Player = null;
  playerList: Player[] = [];

  constructor(private dataService:DataService, private appSettingsService : AppSettingsService) { }
  
  ngOnInit() {
    this.loading= true;
    this.loadSettings();
    this.fnHandleSelectionPlayer = this.handleSelectionPlayer.bind(this);
    //fs.writeFileSync("teste.txt","teste");
  }

  loadSettings(){
    let ranks = this.appSettingsService.getRanks();
    let tiers = this.appSettingsService.getTiers();
    let players = this.appSettingsService.getPlayers();
    forkJoin([ranks, tiers, players]).subscribe(results => {
      this.ranksItems= this.ranksItemsRaw = <any>results[0];
      this.tiers = <any>results[1];
      this.playerListRequest = <any>results[2];
      this.getCurrentPlayer();
    });
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

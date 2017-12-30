import { Component, OnInit } from '@angular/core';
import { PlayerRequest, TierItem, RankedItem, Player } from 'app/models/data.model';
import { DataService } from 'app/providers/data.service';
import { forkJoin } from "rxjs/observable/forkJoin";
import * as fs  from 'fs';
import { AppSettingsService } from 'app/providers/app-settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[DataService]
})
export class HomeComponent implements OnInit {
 
  playerList: Player[] = [];

  constructor(private dataService:DataService, private appSettingsService : AppSettingsService) { 
    this.dataService.onGetData.subscribe((playerList) => {
      this.playerList = playerList;
      console.log("HOME component " ,playerList)
    });
  }
  
  ngOnInit() {
        
  }
  

}

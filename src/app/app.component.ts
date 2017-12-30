import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { PlayerRequest, TierItem, RankedItem, Player } from 'app/models/data.model';
import { AppSettingsService } from 'app/providers/app-settings.service';
import { DataService } from 'app/providers/data.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  
  loading:boolean= true;

  constructor(
    public electronService: ElectronService,
    private dataService:DataService, 
    private appSettingsService : AppSettingsService,
    private translate: TranslateService
  ) {

    translate.setDefaultLang('en');
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    this.dataService.onLoading.subscribe((loading) => {
      this.loading = loading;
      console.log("LOADING" , this.loading);
    });
  }
  
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import {SideRankModule} from 'app/components/side-rank/side-rank.module';
import { DataService } from 'app/providers/data.service';
import { TabPlayersModule } from 'app/components/tab-players/tab-players.module';
import { AppSettingsService } from 'app/providers/app-settings.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SideRankModule,
    TabPlayersModule
  ],
  exports:[
    HomeComponent
  ],
  bootstrap:[ HomeComponent ]
})
export class HomeModule { }
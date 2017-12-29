import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import {TopBarModule} from 'app/components/top-bar/top-bar.module';
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
    TopBarModule,
    SideRankModule,
    TabPlayersModule
  ],
  exports:[
    HomeComponent
  ],
  providers: [DataService, AppSettingsService],
  bootstrap:[ HomeComponent ]
})
export class HomeModule { }
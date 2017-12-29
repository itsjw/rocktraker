import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {TopBarModule} from './components/top-bar/top-bar.module';
import {SideRankModule} from './components/side-rank/side-rank.module';
import { DataService } from './data.service';
import { TabPlayersModule } from './components/tab-players/tab-players.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TopBarModule,
    SideRankModule,
    TabPlayersModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

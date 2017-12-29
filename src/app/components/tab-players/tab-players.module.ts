import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabPlayersComponent } from './tab-players.component';



@NgModule({
  declarations: [
      TabPlayersComponent    
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    TabPlayersComponent
  ],
  providers: []
})
export class TabPlayersModule { }
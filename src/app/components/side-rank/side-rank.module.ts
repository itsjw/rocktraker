import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {SideRankComponent} from './side-rank.component';
import {SideRankItemComponent} from './side-rank-item.component';

@NgModule({
  declarations: [
    SideRankComponent,
    SideRankItemComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    SideRankComponent
  ],
  providers: []
})
export class SideRankModule { }

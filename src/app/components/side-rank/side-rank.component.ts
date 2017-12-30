import { Component, Input } from '@angular/core';
import { TierItem, RankedItem, Player } from 'app/models/data.model';

@Component({
  selector: 'side-rank',
  templateUrl: './side-rank.component.html',
  styleUrls: ['./side-rank.component.css']
})
export class SideRankComponent{

  @Input() player: Player[];

  

}

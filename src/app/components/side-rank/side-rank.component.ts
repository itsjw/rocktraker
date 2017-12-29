import { Component, OnInit, Input } from '@angular/core';
import { TierItem, RankedItem } from 'app/models/data.model';


@Component({
  selector: 'side-rank',
  templateUrl: './side-rank.component.html',
  styleUrls: ['./side-rank.component.css']
})
export class SideRankComponent implements OnInit{
  ngOnInit(): void {
    if(!(this.ranksItems instanceof Array)){
      this.ranksItems = [];
    }    
   }
  @Input() ranksItems: RankedItem[];

  

}

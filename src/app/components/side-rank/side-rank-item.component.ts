import { Component, Input, OnInit } from '@angular/core';
import { RankedItem } from 'app/models/data.model';


@Component({
  selector: 'side-rank-item',
  templateUrl: './side-rank-item.component.html',
  styleUrls: ['./side-rank-item.component.css']
})
export class SideRankItemComponent implements OnInit{
  ngOnInit(): void {
    if(!this.ranked.tierName){
      this.ranked.tierName = this.unknown;
    }
    if(!this.ranked.img){
      this.ranked.img = this.unknownImg;
    }
  }

  getValue(val){
    if(!val){
       return this.unknown; 
    }
    return val;
  }
  getDivision(val){
    if(val == 0){
      return "I";
    }else if (val ==1){
      return "II";
    }else if (val ==2){
      return "II";
    }else if (val ==3){
      return "IV";
    }else{
      return this.unknown;
    }

  }

  getDif(val){
    return this.ranked.dif > 0 ? "+ "+ this.ranked.dif : "- "+ this.ranked.dif*-1;
  }

  private unknown = '?';
  private unknownImg = 'assets/ranks/0-u.png';

  @Input()
  ranked: RankedItem;
}

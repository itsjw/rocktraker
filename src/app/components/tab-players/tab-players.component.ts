import { Component, OnInit,Input } from '@angular/core';
import { Player } from 'app/models/data.model';


@Component({
  selector: 'tab-players',
  templateUrl: './tab-players.component.html',
  styleUrls: ['./tab-players.component.css']
})
export class TabPlayersComponent{
   

    @Input()
    players: Player[]= [];
    @Input()
    playerSeleted:Player;
    @Input()
    seleted:Function;
    
    handleSeletion(player:Player){
        this.seleted(player);
    }

    getClass(){
        return "btn-player";
    }
}
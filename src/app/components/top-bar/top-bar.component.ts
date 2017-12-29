import { Component } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  logo = 'assets/logo.png';
  title = 'Rocket League';
  subTitle = 'Tracker Network';
}

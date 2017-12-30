import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logo = 'assets/logo.png';
  title = 'Rocket League';
  subTitle = 'Tracker Network';
}

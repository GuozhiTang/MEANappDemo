// Bring in main angular package
import { Component } from '@angular/core';

@Component({
  // HTML tag we can use to insert the component
  selector: 'app-root',
  // html file which is associate with the component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';
}

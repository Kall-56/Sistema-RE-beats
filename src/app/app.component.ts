import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: [],
})
export class AppComponent {

}

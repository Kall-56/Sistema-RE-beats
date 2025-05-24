import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private appRoute: Router = inject(Router);

  constructor() {}

  ngOnInit() {
    /*setTimeout(() => {
      this.appRoute.navigate(['/']);
    },
      1000);*/
  }
}

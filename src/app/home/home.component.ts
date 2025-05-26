import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../log-in/Usuario.interface';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  User!: Usuario;

  ngOnInit() {
    const unknowUser = this.globalService.userConnected;
    if (unknowUser !== null) {
      this.User = unknowUser;
    }
  }
}

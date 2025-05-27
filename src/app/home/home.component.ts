import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../log-in/Usuario.interface';
import {Location} from "@angular/common";
import {LogInService} from "../log-in/log-in.service";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  private locationService: Location = inject(Location);
  private logInService: LogInService = inject(LogInService);
  User!: Usuario;

  ngOnInit() {
    const unknowUser = this.logInService.getUser();
    if (unknowUser !== null) {
      this.User = unknowUser;
    }
  }

  ngAfterViewInit() {
    if (this.User.ID !== 0) {
      const elemnt = document.getElementById('CreateSong');
      if (elemnt) {
        elemnt.style.display = 'none';
      }
    }
  }

  goBack() {
    this.locationService.back();
  }
}

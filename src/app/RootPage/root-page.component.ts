import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../models/usuario.interface';
import {Location} from "@angular/common";
import {LogInService} from "../log-in.service";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './root-page.component.html',
  styleUrl: './root-page.component.css'
})
export class RootPageComponent implements OnInit, AfterViewInit{
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
    if (this.User.rol === 1) {
      const element = document.getElementById('CreateSong');
      if (element) {
        element.style.display = 'none';
      }
    }
  }

  goBack() {
    this.locationService.back();
  }
}

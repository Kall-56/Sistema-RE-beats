import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../models/usuario.interface';
import {Location} from "@angular/common";
import {AuthenticationService} from "../authentication.service";
import {GlobalService} from '../global.service';

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
  private authService: AuthenticationService = inject(AuthenticationService);
  protected globalService: GlobalService = inject(GlobalService);
  User!: Usuario;

  ngOnInit() {
    this.User = this.authService.getUser();
  }

  ngAfterViewInit() {
    if (this.User.rol !== 'Admin') {
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

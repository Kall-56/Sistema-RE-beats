import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../models/usuario.interface';
import {Location, NgIf} from "@angular/common";
import {AuthenticationService} from "../authentication.service";
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './root-page.component.html',
  styleUrl: './root-page.component.css'
})
export class RootPageComponent implements OnInit{
  private locationService: Location = inject(Location);
  private authService: AuthenticationService = inject(AuthenticationService);
  protected globalService: GlobalService = inject(GlobalService);
  User!: Usuario;

  ngOnInit() {
    this.User = this.authService.getUser();
  }

  goBack() {
    //this.locationService.back();
    this.authService.clearUser();
    this.globalService.AppRouter.navigate(['']);
  }
}

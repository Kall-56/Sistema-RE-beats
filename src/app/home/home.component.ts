import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Usuario} from '../log-in/Usuario.interface';
import {GlobalService} from '../global.service';
import {Location} from "@angular/common";

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
  private globalService: GlobalService = inject(GlobalService);
  private locationService: Location = inject(Location);
  User!: Usuario;

  ngOnInit() {
    const unknowUser = this.globalService.userConnected;
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

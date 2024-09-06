import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';
  
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Masquer la barre de navigation uniquement pour la page de connexion
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      }
    });
  }
}

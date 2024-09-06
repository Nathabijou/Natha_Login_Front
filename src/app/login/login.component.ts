import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null; // Propriété pour stocker le message d'erreur

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.userService.login(loginForm.value).subscribe(
        (response: any) => {
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          // Déterminer le rôle de l'utilisateur et naviguer en conséquence
          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } 
          else if(role === 'Manager'){
            this.router.navigate(['/manager']);
          }
          else if(role === 'User'){
            this.router.navigate(['/user']);
          }
          else {
            this.router.navigate(['/moderant']);
          }
          this.errorMessage = null; // Réinitialiser le message d'erreur en cas de connexion réussie
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Username or password is incorrect'; // Afficher le message d'erreur
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields'; // Afficher un message d'erreur si le formulaire est invalide
    }
  }

  resetForm(form: NgForm) {
    form.resetForm(); // Réinitialiser le formulaire Angular
    this.errorMessage = null; // Réinitialiser le message d'erreur
  }
}

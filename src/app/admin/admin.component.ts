import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userPhoto: string = 'assets/user-photo.jpg';

  constructor() { }

  ngOnInit(): void {}

  // Fonction pour gérer le téléchargement de la nouvelle photo
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result; // Met à jour la photo
      };
      reader.readAsDataURL(file);
    }
  }
}

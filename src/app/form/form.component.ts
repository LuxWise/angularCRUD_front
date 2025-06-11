import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  username = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.api.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.accessToken) {
          document.cookie = `token=${response.accessToken}; path=/; max-age=3600`;
          this.router.navigate(['/private']);
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
      },
    });
  }
}

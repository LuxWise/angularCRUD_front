import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent implements OnInit {
  hasToken = false;

  ngOnInit() {
    this.hasToken = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('token='));
  }
}

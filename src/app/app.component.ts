import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { }

  get displayToolbar() {
    const protectedRoutes = ["add-plant", "edit-plant", "dashboard"]
    const currentRoute = this.router.url.split('?')[0].split('/')[1]
    return protectedRoutes.includes(currentRoute)
  }
}

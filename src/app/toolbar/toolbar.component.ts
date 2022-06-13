import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { NotificationsService } from '../services/notifiications/notifications.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  showLogoutButton = false

  constructor(public auth: AuthService, public router: Router, public notificationsService: NotificationsService) {
    this.auth.user$.subscribe(user => this.showLogoutButton = !!user)
  }

  async logout() {
    await this.notificationsService.unregisterToken()
    await this.auth.logout()
    await this.router.navigate(['/auth/login'])
  }
}

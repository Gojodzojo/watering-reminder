import { Component } from '@angular/core'
import { Messaging, getToken,  } from '@angular/fire/messaging'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { NotificationsService } from 'src/app/services/notifiications/notifications.service'
import { PlantsService } from 'src/app/services/plants/plants.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoading = true

  constructor(public auth: AuthService, public plantsService: PlantsService, public notificationsService: NotificationsService) {
    this.plantsService.plants$.subscribe(() => this.isLoading = false)

    if(!this.notificationsService.areNotificationsAllowed) {
      this.notificationsService.registerToken()
    }
  }
}

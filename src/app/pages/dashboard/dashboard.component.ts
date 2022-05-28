import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(public auth: AuthService, public router: Router) { }

  async logout() {
    await this.auth.logout()
    await this.router.navigate(['/login'])
  }

}

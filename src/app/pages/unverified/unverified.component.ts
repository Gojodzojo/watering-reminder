import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss']
})
export class UnverifiedComponent {

  constructor(public auth: AuthService, public router: Router) { }

  async returnToLogin() {
    await this.auth.logout()
    await this.router.navigate(['/login'])
  }

}

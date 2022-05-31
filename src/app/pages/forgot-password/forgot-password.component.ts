import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  success = false

  emailForm = new FormControl('')

  constructor(public auth: AuthService) { }

  async onSubmit() {
    if (this.emailForm.valid) {
      await this.auth.sendPasswordResetEmail(this.emailForm.value)
      this.success = true
    }
  }
}
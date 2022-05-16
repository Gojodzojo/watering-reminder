import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  success = false

  paswordResetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(public auth: AuthService) { }

  async onSubmit() {
    if (this.paswordResetForm.valid) {
      await this.auth.sendPasswordResetEmail(this.paswordResetForm.value.email)
      this.success = true
    }
  }
}
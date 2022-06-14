import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import errorCodeToMessage from 'src/app/scripts/errorCodeToMessage'
import { AuthService } from 'src/app/services/auth/auth.service'

enum Status {
  WaitingForInput,
  Loading,
  Error,
  Success
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  Status = Status
  status = Status.WaitingForInput
  error: any = null

  emailForm = new FormControl('')

  constructor(public auth: AuthService) { }

  async onSubmit() {
    if (this.emailForm.valid) {
      try {
        this.status = Status.Loading
        await this.auth.sendPasswordResetEmail(this.emailForm.value)
        this.status = Status.Success
      } catch (error) {
        console.error(error)
        this.status = Status.Error
        this.error = error
      }
    }
  }

  get errorMessage() {
    return errorCodeToMessage(this.error.code)
  }
}
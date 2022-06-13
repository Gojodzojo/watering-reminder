import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import errorCodeToMessage from 'src/app/scripts/errorCodeToMessage'
import { AuthService } from 'src/app/services/auth/auth.service'

enum Status {
  WaitingForInput,
  Loading,
  Error,
  Success
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  Status = Status
  status = Status.WaitingForInput
  error: any = null

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  constructor(public auth: AuthService) { }

  async onSubmit() {
    if (this.registerForm.valid && this.passordsAreEqual) {
      try {
        this.status = Status.Loading
        await this.auth.emailRegister(this.registerForm.value.email, this.registerForm.value.password)
        await this.auth.logout()
        this.status = Status.Success
      } catch (error) {
        console.error(error)
        this.status = Status.Error
        this.error = error
      }
    }
  }

  isControlModified(controlName: string) {
    return this.registerForm.controls[controlName].dirty || this.registerForm.controls[controlName].touched
  }

  get errorMessage() {
    return errorCodeToMessage(this.error.code)
  }

  get passordsAreEqual() {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword
  }
}

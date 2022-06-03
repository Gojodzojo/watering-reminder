import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import errorCodeToMessage from 'src/app/scripts/errorCodeToMessage'
import { AuthService } from 'src/app/services/auth/auth.service'

enum Status {
  WaitingForInput,
  Loading,
  Error
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  Status = Status
  status = Status.WaitingForInput
  error: any = null

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(public auth: AuthService, public router: Router) { }

  async navigateToDashboard() {
    await this.router.navigate(['/dashboard'])
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.status = Status.Loading
      this.error = null
      try {
        await this.auth.emailLogin(this.loginForm.value.email, this.loginForm.value.password)
        await this.navigateToDashboard()
      } catch (error) {
        console.error(error)
        this.status = Status.Error
        this.error = error
      }
    }
  }

  async googleSignin() {
    await this.auth.googleSignin()
    await this.navigateToDashboard()
  }

  async facebookSignin() {
    await this.auth.facebookSignin()
    await this.navigateToDashboard()
  }

  errorCodeToMessage() {
    return errorCodeToMessage(this.error.code)
  }
}




import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  success = false

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  constructor(public auth: AuthService) { }

  async onSubmit() {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      await this.auth.emailRegister(this.registerForm.value.email, this.registerForm.value.password)
      await this.auth.logout()
      this.success = true
    }
  }
}

import { Component } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'
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
    confirmPassword: new FormControl('', [this.passwordsEqualValidator()]),
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

  get errorMessage() {
    return errorCodeToMessage(this.error.code)
  }

  get passordsAreEqual() {
    if(this.registerForm === undefined)  return false
    return this.registerForm.value.password === this.registerForm.value.confirmPassword
  }

  passwordsEqualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.passordsAreEqual ? null : {passwordsNotEqual: true};
    };
  }
}

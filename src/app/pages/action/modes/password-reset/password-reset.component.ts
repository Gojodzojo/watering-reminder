import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

enum Status {
  WaitingForInput,
  Loading,
  Success,
  Error
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  Status = Status
  status = Status.WaitingForInput

  passwordForm = new FormControl('')

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  async onPasswordSubmit() {
    if (this.passwordForm.valid) {
      this.status = Status.Loading
      try {
        await this.auth.confirmPasswordReset(this.route.snapshot.queryParams['oobCode'], this.passwordForm.value)
        this.status = Status.Success
      } catch (error) {
        console.error(error)
        this.status = Status.Error
      }
    }
  }

}

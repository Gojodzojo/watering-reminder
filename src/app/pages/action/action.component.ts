import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

enum Mode {
  Loading,
  PasswordReset,
  EmailVerification,
  Error
}

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  Mode = Mode
  mode = Mode.Loading

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  async ngOnInit() {
    try {
      const { oobCode } = this.route.snapshot.queryParams
      const { operation } = await this.auth.checkActionCode(oobCode)

      if (operation === "VERIFY_EMAIL") this.mode = Mode.EmailVerification
      else if (operation === "PASSWORD_RESET") this.mode = Mode.PasswordReset
      else this.mode = Mode.Error
    }
    catch (error) {
      console.error(error)
      this.mode = Mode.Error
    }
  }

}





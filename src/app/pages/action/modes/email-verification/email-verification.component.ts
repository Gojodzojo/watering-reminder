import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'

enum Status {
  Loading,
  Success,
  Error
}

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  Status = Status
  status = Status.Loading

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  async verify() {
    try {
      this.status = Status.Loading
      await this.auth.applyActionCode(this.route.snapshot.queryParams['oobCode'])
      this.status = Status.Success
    } catch (error) {
      console.error(error)
      this.status = Status.Error
    }
  }

  ngOnInit() {
    this.verify()
  }
}

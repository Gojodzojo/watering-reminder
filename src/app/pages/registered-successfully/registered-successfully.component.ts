import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-registered-successfully',
  templateUrl: './registered-successfully.component.html',
  styleUrls: ['./registered-successfully.component.scss']
})
export class RegisteredSuccessfullyComponent implements OnInit {

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.auth.logout()
  }

}

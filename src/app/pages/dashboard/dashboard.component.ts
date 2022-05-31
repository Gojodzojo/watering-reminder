import { Component } from '@angular/core'
import { collection, collectionData, Firestore, addDoc, CollectionReference } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { lastValueFrom, map, Observable, of, take } from 'rxjs'
import { Plant } from 'src/app/models/plant.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { PlantsService } from 'src/app/services/plants-service/plants.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoading = true

  constructor(public auth: AuthService, public router: Router, public plantsService: PlantsService) {
    this.plantsService.plants$.subscribe(() => this.isLoading = false)
  }

  async logout() {
    await this.auth.logout()
    await this.router.navigate(['/login'])
  }
}

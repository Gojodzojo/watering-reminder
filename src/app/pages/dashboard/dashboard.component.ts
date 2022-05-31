import { Component } from '@angular/core'
import { collection, collectionData, Firestore, addDoc, CollectionReference } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { lastValueFrom, map, Observable, of, take } from 'rxjs'
import { Plant } from 'src/app/models/plant.model'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  plant$: Observable<Plant[]> = of([])
  plantsAreEmpty$ = of(true)
  isLoading = true

  constructor(public auth: AuthService, public router: Router, public firestore: Firestore) {
    this.auth.user$.subscribe(user => {
      if (user) {
        const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<Plant>
        this.plant$ = collectionData(c, { idField: "id" })
        this.plantsAreEmpty$ = this.plant$.pipe(map(plants => plants.length === 0))
        this.plant$.subscribe(() => this.isLoading = false)
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  async addPlant(plant: Plant) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))
    const c = collection(this.firestore, "users", user!.uid, "plants") as CollectionReference<Plant>
    await addDoc(c, plant)
  }

  async logout() {
    await this.auth.logout()
    await this.router.navigate(['/login'])
  }
}

import { Injectable } from '@angular/core'
import { collection, collectionData, CollectionReference, doc, Firestore } from '@angular/fire/firestore'
import { addDoc, deleteDoc, updateDoc } from '@firebase/firestore'
import { lastValueFrom, map, Observable, of, switchMap, take } from 'rxjs'
import { Plant } from 'src/app/models/plant.model'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  plants$: Observable<Plant[]>
  plantsAreEmpty$: Observable<boolean>

  constructor(private auth: AuthService, private firestore: Firestore) {
    this.plants$ = this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<Plant>
          return collectionData(c, { idField: "id" })
        }
        return of([])
      })
    )

    this.plantsAreEmpty$ = this.plants$.pipe(map(plants => plants.length === 0))
  }

  async addPlant(plant: Plant) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<Plant>
      return await addDoc(c, plant)
    }

    throw new Error("User is not logged in")
  }

  async deletePlant(plantID: string) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const d = doc(this.firestore, "users", user.uid, "plants", plantID)
      return await deleteDoc(d)
    }

    throw new Error("User is not logged in")
  }

  async updatePlant(plant: Partial<Plant>, plantID: string) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const d = doc(this.firestore, "users", user.uid, "plants", plantID)
      return await updateDoc(d, plant)
    }

    throw new Error("User is not logged in")

  }
}

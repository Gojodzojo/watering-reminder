import { Injectable } from '@angular/core'
import { collection, collectionData, CollectionReference, doc, Firestore } from '@angular/fire/firestore'
import { addDoc, deleteDoc, updateDoc } from '@firebase/firestore'
import { lastValueFrom, map, Observable, of, switchMap, take } from 'rxjs'
import { Plant, PlantWithoutImage } from 'src/app/models/plant.model'
import { AuthService } from '../auth/auth.service'
import { ref, Storage, uploadBytes } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  plants$: Observable<Plant[]>
  plantsAreEmpty$: Observable<boolean>

  constructor(private auth: AuthService, private firestore: Firestore, private storage: Storage) {
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

  async addPlant({ imageDataUrl, ...plantWithoutImage }: Plant) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<PlantWithoutImage>
      const docRef = await addDoc(c, plantWithoutImage)

      if (imageDataUrl) {
        const imgResp = await fetch(imageDataUrl)
        const imgBlob = await imgResp.blob()
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${docRef.id}`)
        await uploadBytes(imgRef, imgBlob)
      }
      return
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

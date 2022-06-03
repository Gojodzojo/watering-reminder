import { Injectable } from '@angular/core'
import { collection, collectionData, CollectionReference, doc, Firestore } from '@angular/fire/firestore'
import { addDoc, deleteDoc, updateDoc, getDoc, DocumentReference } from '@firebase/firestore'
import { from, lastValueFrom, map, Observable, of, switchMap, take } from 'rxjs'
import { Plant, PlantWithoutImage } from 'src/app/models/plant.model'
import { AuthService } from '../auth/auth.service'
import { ref, Storage, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  plants$: Observable<Plant[]>
  plantsAreEmpty$: Observable<boolean>

  constructor(private auth: AuthService, private firestore: Firestore, private storage: Storage) {
    this.plants$ = this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<Plant>
          return collectionData(c, { idField: "id" })
        }
        return of([])
      })
    )

    this.plantsAreEmpty$ = this.plants$.pipe(map(plants => plants.length === 0))
  }

  async addPlant(plantWithoutImage: PlantWithoutImage, imageDataUrl: string) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const c = collection(this.firestore, "users", user.uid, "plants")
      const docRef = await addDoc(c, plantWithoutImage)

      let imageUrl = ''
      if (imageDataUrl !== '') {
        const imgResp = await fetch(imageUrl)
        const imgBlob = await imgResp.blob()
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${docRef.id}`)
        await uploadBytes(imgRef, imgBlob)
        imageUrl = await getDownloadURL(imgRef)
      }

      await updateDoc(docRef, { imageUrl })
      return
    }

    throw new Error("User is not logged in")
  }

  async deletePlant(plantID: string, hasImage: boolean) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const docRef = doc(this.firestore, "users", user.uid, "plants", plantID)
      await deleteDoc(docRef)

      if (hasImage) {
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
        await deleteObject(imgRef)
      }
      return
    }

    throw new Error("User is not logged in")
  }

  async updatePlant(plantID: string, plantWithoutImage: Partial<PlantWithoutImage>, imageDataUrl?: string) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      let imageUrl: string | undefined = undefined

      if (imageDataUrl === '') {
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
        await deleteObject(imgRef)
        imageUrl = ''
      }
      else if (imageDataUrl !== undefined) {
        const imgResp = await fetch(imageDataUrl)
        const imgBlob = await imgResp.blob()
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
        await uploadBytes(imgRef, imgBlob)
        imageUrl = await getDownloadURL(imgRef)
      }

      let plant: Partial<Plant> = plantWithoutImage
      if (imageUrl !== undefined) {
        plant = { ...plant, imageUrl }
      }

      const d = doc(this.firestore, "users", user.uid, "plants", plantID)
      await updateDoc(d, plant)

      return
    }

    throw new Error("User is not logged in")
  }

  async getPlant(plantID: string): Promise<Plant> {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const d = doc(this.firestore, "users", user.uid, "plants", plantID) as DocumentReference<Plant>
      let plant = (await getDoc(d)).data()

      if (!plant) {
        throw new Error("Plant does not exist")
      }

      plant.id = plantID
      return plant
    }

    throw new Error("User is not logged in")
  }
}

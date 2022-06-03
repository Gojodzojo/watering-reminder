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
          const c = collection(this.firestore, "users", user.uid, "plants") as CollectionReference<PlantWithoutImage>
          const plantsWithoutImage = collectionData(c, { idField: "id" })

          return plantsWithoutImage.pipe(
            switchMap(plants => {
              const plantsPromise = plants.map(async (plant) => {
                const imageRef = ref(this.storage, `users/${user.uid}/plants/${plant.id}`)
                let imageDataUrl = ''
                try {
                  imageDataUrl = await getDownloadURL(imageRef)
                } catch (e) { }
                return { ...plant, imageDataUrl }
              })

              return from(Promise.all(plantsPromise))
            })
          )
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

  async updatePlant(plantID: string, { imageDataUrl, ...plantWithoutImage }: Partial<Plant>) {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const d = doc(this.firestore, "users", user.uid, "plants", plantID)
      await updateDoc(d, plantWithoutImage as Partial<PlantWithoutImage>)

      if (imageDataUrl === '') {
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
        await deleteObject(imgRef)
      }
      else if (imageDataUrl !== undefined) {
        const imgResp = await fetch(imageDataUrl)
        const imgBlob = await imgResp.blob()
        const imgRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
        await uploadBytes(imgRef, imgBlob)
      }
      return
    }

    throw new Error("User is not logged in")
  }

  async getPlant(plantID: string): Promise<Plant> {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (user) {
      const d = doc(this.firestore, "users", user.uid, "plants", plantID) as DocumentReference<PlantWithoutImage>
      let plantWithoutImage = (await getDoc(d)).data()

      if (!plantWithoutImage) {
        throw new Error("Plant does not exist")
      }

      plantWithoutImage.id = plantID

      const imageRef = ref(this.storage, `users/${user.uid}/plants/${plantID}`)
      let imageDataUrl = ''
      try {
        imageDataUrl = await getDownloadURL(imageRef)
      }
      catch (e) { }
      return { ...plantWithoutImage, imageDataUrl }
    }

    throw new Error("User is not logged in")
  }
}

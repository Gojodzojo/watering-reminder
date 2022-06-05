import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore'
import { Messaging } from '@angular/fire/messaging'
import { getToken } from '@firebase/messaging'
import { lastValueFrom, take } from 'rxjs'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  areNotificationsAllowed = Notification.permission === 'granted'

  constructor(private messaging: Messaging, private auth: AuthService, private firestore: Firestore) { }

  async registerToken() {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (!user) {
      throw new Error("User is not logged in")
    }

    const fcmToken = await getToken(this.messaging)
    const d = doc(this.firestore, "users", user.uid, "fcmTokens", fcmToken)
    await setDoc(d, { fcmToken })
    this.areNotificationsAllowed = true
  }

  async unregisterToken() {
    const user = await lastValueFrom(this.auth.user$.pipe(take(1)))

    if (!user) {
      throw new Error("User is not logged in")
    }

    const fcmToken = await getToken(this.messaging)
    const d = doc(this.firestore, "users", user.uid, "fcmTokens", fcmToken)
    await deleteDoc(d)
    this.areNotificationsAllowed = false
  }
}

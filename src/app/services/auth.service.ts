import { Injectable } from '@angular/core'
import { Auth, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, User, user, sendEmailVerification, createUserWithEmailAndPassword, applyActionCode, sendPasswordResetEmail, checkActionCode, confirmPasswordReset } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>

  constructor(private auth: Auth, private router: Router) {
    this.user$ = user(auth)
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(this.auth, provider)
  }

  async facebookSignin() {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(this.auth, provider)
  }

  async emailLogin(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
  }

  async emailRegister(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password)
    await sendEmailVerification(credential.user)
  }

  async sendEmailVerification() {
    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser)
    }
  }

  async applyActionCode(oobCode: string) {
    await applyActionCode(this.auth, oobCode)
  }

  async checkActionCode(oobCode: string) {
    return await checkActionCode(this.auth, oobCode)
  }

  async confirmPasswordReset(oobCode: string, newPassword: string) {
    await confirmPasswordReset(this.auth, oobCode, newPassword)
  }

  // For debug purposes
  async logUser() {
    console.log(this.auth.currentUser)
  }

  async logout() {
    await this.auth.signOut()
  }

  async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(this.auth, email)
  }
}

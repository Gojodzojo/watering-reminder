import { Injectable } from '@angular/core'
import { Auth, signInWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, User, user, sendEmailVerification, createUserWithEmailAndPassword, applyActionCode } from '@angular/fire/auth'
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

  private async navigateToDashboard() {
    await this.router.navigate(['/dashboard'])
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(this.auth, provider)
    await this.navigateToDashboard()
  }

  async facebookSignin() {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(this.auth, provider)
    await this.navigateToDashboard()
  }

  async emailLogin(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
    await this.navigateToDashboard()
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

  // For debug purposes
  async logUser() {
    console.log(this.auth.currentUser)
  }

  async logout() {
    await this.auth.signOut()
  }
}

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IndexComponent } from './pages/index/index.component'
import { canActivate, AuthPipeGenerator } from '@angular/fire/auth-guard'
import { map } from 'rxjs'
import { ActionComponent } from './pages/action/action.component'

const loggedInVerifiedUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return 'auth/login'
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return 'auth/unverified'
    return true
  })
)

const loggedOutUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return true
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return 'auth/unverified'
    return 'logged-in/dashboard'
  })
)

const routes: Routes = [
  { path: 'action', component: ActionComponent },
  { path: 'logged-in', loadChildren: () => import('./pages/logged-in/logged-in.module').then(m => m.LoggedInModule), ...canActivate(loggedInVerifiedUser) },
  { path: '', component: IndexComponent, ...canActivate(loggedOutUser) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

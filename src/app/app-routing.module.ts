import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { canActivate, AuthPipeGenerator } from '@angular/fire/auth-guard'
import { map } from 'rxjs'

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
  { path: 'action', loadChildren: () => import('./pages/action/action.module').then(m => m.ActionModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'logged-in', loadChildren: () => import('./pages/logged-in/logged-in.module').then(m => m.LoggedInModule), ...canActivate(loggedInVerifiedUser) },  
  { path: '', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule), ...canActivate(loggedOutUser) },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

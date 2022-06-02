import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { IndexComponent } from './pages/index/index.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { canActivate, AuthPipeGenerator } from '@angular/fire/auth-guard'
import { map } from 'rxjs'
import { UnverifiedComponent } from './pages/unverified/unverified.component'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { ActionComponent } from './pages/action/action.component'
import { AddPlantComponent } from './pages/add-plant/add-plant.component'

const loggedInVerifiedUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return 'login'
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return 'unverified'
    return true
  })
)

const loggedInUnverifiedUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return 'login'
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return true
    return 'dashboard'
  })
)

const loggedOutUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return true
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return 'unverified'
    return 'dashboard'
  })
)

const routes: Routes = [
  { path: 'action', component: ActionComponent },
  { path: 'add-plant', component: AddPlantComponent, ...canActivate(loggedInVerifiedUser) },
  { path: 'dashboard', component: DashboardComponent, ...canActivate(loggedInVerifiedUser) },
  { path: 'login', component: LoginComponent, ...canActivate(loggedOutUser) },
  { path: 'register', component: RegisterComponent, ...canActivate(loggedOutUser) },
  { path: 'forgot-password', component: ForgotPasswordComponent, ...canActivate(loggedOutUser) },
  { path: 'unverified', component: UnverifiedComponent, ...canActivate(loggedInUnverifiedUser) },
  { path: '', component: IndexComponent, ...canActivate(loggedOutUser) },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

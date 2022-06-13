import { NgModule } from '@angular/core';
import { AuthPipeGenerator, canActivate } from '@angular/fire/auth-guard'
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs'
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './subpages/forgot-password/forgot-password.component'
import { LoginComponent } from './subpages/login/login.component'
import { RegisterComponent } from './subpages/register/register.component'
import { UnverifiedComponent } from './subpages/unverified/unverified.component'

const loggedInUnverifiedUser: AuthPipeGenerator = () => (
  map(user => {
    if (!user) return 'auth/login'
    if (user.providerData[0].providerId === 'password' && !user.emailVerified) return true
    return 'logged-in/dashboard'
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
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent, ...canActivate(loggedOutUser) },
      { path: 'register', component: RegisterComponent, ...canActivate(loggedOutUser) },
      { path: 'forgot-password', component: ForgotPasswordComponent, ...canActivate(loggedOutUser) },
      { path: 'unverified', component: UnverifiedComponent, ...canActivate(loggedInUnverifiedUser) },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

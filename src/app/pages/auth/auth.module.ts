import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CommonModulesModule } from 'src/app/common-modules/common-modules.module'
import { ForgotPasswordComponent } from './subpages/forgot-password/forgot-password.component'
import { LoginComponent } from './subpages/login/login.component'
import { RegisterComponent } from './subpages/register/register.component'
import { UnverifiedComponent } from './subpages/unverified/unverified.component'


@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    UnverifiedComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModulesModule,
  ]
})
export class AuthModule { }

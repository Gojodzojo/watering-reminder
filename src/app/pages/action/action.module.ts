import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionRoutingModule } from './action-routing.module';
import { ActionComponent } from './action.component';
import { EmailVerificationComponent } from './modes/email-verification/email-verification.component'
import { PasswordResetComponent } from './modes/password-reset/password-reset.component'
import { CommonModulesModule } from 'src/app/common-modules/common-modules.module'


@NgModule({
  declarations: [
    ActionComponent,
    EmailVerificationComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    CommonModulesModule,
    ActionRoutingModule,
  ]
})
export class ActionModule { }

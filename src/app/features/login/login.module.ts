import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { environment } from '../../../environments/environment';

@NgModule({
    declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, LoginRoutingModule]

})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, LoginRoutingModule]

})
export class LoginModule {}

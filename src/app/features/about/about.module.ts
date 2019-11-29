import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AboutComponent } from '../about/about/about.component';
import { AboutRoutingModule } from './about-routing.module';


import {MatAutocompleteModule, MatInputModule} from '@angular/material';

import { InvoiceGridGridComponent } from '../about/components/invoice-grid.component';



@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, SharedModule, AboutRoutingModule, MatAutocompleteModule, MatInputModule
  
],
  entryComponents: [],
  bootstrap: [],
})
export class AboutModule {}

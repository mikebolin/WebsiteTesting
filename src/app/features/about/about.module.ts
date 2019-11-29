import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AboutComponent } from '../about/about/about.component';
import { AboutRoutingModule } from './about-routing.module';


import {MatAutocompleteModule, MatInputModule} from '@angular/material';

import { InvoiceGridGridComponent } from '../about/components/invoice-grid.component';
import { MultiCheckFilterComponent } from './about/components/multicheck-filter.component';

import { SearchAutoComponent } from './about/autocomplete/app-autocomplete';

@NgModule({
  declarations: [AboutComponent,InvoiceGridGridComponent,MultiCheckFilterComponent,SearchAutoComponent],
  imports: [CommonModule, SharedModule, AboutRoutingModule, MatAutocompleteModule, MatInputModule
  
],
  entryComponents: [],
  bootstrap: [],
})
export class AboutModule {}

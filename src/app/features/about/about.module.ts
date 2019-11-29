import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AboutComponent } from '../about/about/about.component';
import { AboutRoutingModule } from './about-routing.module';


import {MatAutocompleteModule, MatInputModule} from '@angular/material';

import { InvoiceGridGridComponent } from '../about/components/invoice-grid.component';


import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';

import { MultiCheckFilterComponent } from '../about/components/multicheck-filter.component';

import { SearchAutoComponent } from '../about/autocomplete/app-autocomplete';
@NgModule({
  declarations: [AboutComponent, InvoiceGridGridComponent,  MultiCheckFilterComponent, SearchAutoComponent],
  imports: [CommonModule, SharedModule, AboutRoutingModule, MatAutocompleteModule, MatInputModule,
  
    LayoutModule,
    DateInputsModule,
    GridModule,
    DropDownsModule,
    DialogModule,
    WindowModule,
    InputsModule,
    UploadModule,
    TreeViewModule,
    ButtonsModule,
    PopupModule,
    ContextMenuModule,
    ExcelModule,
    RippleModule,
    DatePickerModule],
  entryComponents: [],
  bootstrap: [],
})
export class AboutModule {}

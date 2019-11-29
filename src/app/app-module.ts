import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';


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

import { MultiCheckFilterComponent } from './featuresabout/components/multicheck-filter.component';

import { SearchAutoComponent } from '.features/about/autocomplete/app-autocomplete';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
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
    DatePickerModule
  ],
  declarations: [AppComponent, InvoiceGridGridComponent,  MultiCheckFilterComponent, SearchAutoComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

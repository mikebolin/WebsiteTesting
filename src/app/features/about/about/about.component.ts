import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  constructor(public db: AngularFireDatabase, private cdr: ChangeDetectorRef) {

    
    this.db.list('/')
      .valueChanges()
      .subscribe(val => {
        this.items = val;
        console.log(val);
        this.cdr.detectChanges();
      });
      

  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  public excelData: any[] = exceldata;
  items: any;


  ngOnInit() {
    this.items = [];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
    //this.initData();
    console.log('JSON.stringify(this.items) =>', this.items);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  initData(){
    for(let i = 0; i < this.excelData.length; i++){
      /*
      let row = this.excelData[i];
      (row['DaysLEFT'] === undefined) && (this.excelData[i]['DaysLEFT'] = '');
      (row['DeliveryDate'] === undefined) && (this.excelData[i]['DeliveryDate'] = '');
      (row['CustomerName'] === undefined) && (this.excelData[i]['CustomerName'] = '');
      (row['GUSQuotation'] === undefined) && (this.excelData[i]['GUSQuotation'] = '');
      (row['QuoteDate'] === undefined) && (this.excelData[i]['QuoteDate'] = '');
      (row['CustomerOrder'] === undefined) && (this.excelData[i]['CustomerOrder'] = '');
      (row['QuotedAmmount'] === undefined) && (this.excelData[i]['QuotedAmmount'] = '');
      (row['OrderAmmout'] === undefined) && (this.excelData[i]['OrderAmmout'] = '');
      (row['ServiceOrders'] === undefined) && (this.excelData[i]['ServiceOrders'] = '');
      (row['OrderDate'] === undefined) && (this.excelData[i]['OrderDate'] = '');
      (row['GusOrder'] === undefined) && (this.excelData[i]['GusOrder'] = '');
      (row['GusOrderDate'] === undefined) && (this.excelData[i]['GusOrderDate'] = '');
      (row['GdeConfirmation'] === undefined) && (this.excelData[i]['GdeConfirmation'] = '');
      (row['GdeConfDate'] === undefined) && (this.excelData[i]['GdeConfDate'] = '');
      (row['EstimatedDelivery'] === undefined) && (this.excelData[i]['EstimatedDelivery'] = '');
      (row['Notes'] === undefined) && (this.excelData[i]['Notes'] = '');
      console.log(row);
      */
    }

    const blob = new Blob([JSON.stringify(this.excelData)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = 'excelJson' + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;


}

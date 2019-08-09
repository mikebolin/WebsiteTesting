import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment-timezone';

@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  constructor() {}
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

formatDate(){
    var d = new Date();
    var myDatetimeString = moment(d).tz('America/Toronto').format('YYYY/MM/DD hh:mm:ss A');
}

}

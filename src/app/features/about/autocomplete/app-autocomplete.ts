import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ChangeDetectorRef
  } from '@angular/core';
  import { Subject } from 'rxjs';
  import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
  import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
  
  @Component({
    selector: 'app-autocomplete',
    templateUrl: './app-autocomplete.html',
    styleUrls: ['./app-autocomplete.scss']
  })
  export class SearchAutoComponent implements OnInit {
    listItems: Array<string>;
    allItems: Array<string>;
    textValue: string;
    _cacheKey: string;
    debounceEvent = new Subject<string>();
    saveKey: string;
    saveKeyCacheValue: string;
  
    get cacheKey() {
      return this._cacheKey;
    }
  
    @ViewChild('storageAutoComplete', { static: false })
    public storageAutoComplete: any;
  
    @Input() thePlaceholder: String;
  
    @Input() minimumFilterLength: number;
  
    @Input() set cacheKey(value) {
      if (this._cacheKey !== value) {
        this._cacheKey = value;
        if (value !== '') {
          this.handleGetAutoComplete();
        }
      }
    }
  
    @Input() isDebounceSaveEnabled: boolean;
  
    @Input() debounceTimeMS: number;
  
    @Input() minCharacterSaveLength: number;
  
    @Input() isToLowerSaveValue: boolean;
  
    @Output() updateNoteChanged = new EventEmitter<String>();
  
    constructor(private cdr: ChangeDetectorRef) {}
  
    ngOnInit() {
      this.handleGetAutoComplete();
      if (this.isDebounceSaveEnabled) {
        this.debounceEvent
          .pipe(
            debounceTime(this.debounceTimeMS),
            distinctUntilChanged()
          )
          .subscribe(val => {
            var splitKeyValuePairAtMomentInTime = val.split('†');
            this.saveKeyCacheValue = splitKeyValuePairAtMomentInTime[0];
            this.saveKey = splitKeyValuePairAtMomentInTime[1];
            this.handleSetAutoComplete();
          });
      }
    }
  
    private handleSetAutoComplete() {
      if (this.saveKey !== undefined) {
        if (
          this.saveKeyCacheValue !== '' &&
          this.saveKey.trim().length >= this.minCharacterSaveLength
        ) {
          this.addValueToCache();
        }
      }
    }
  
    private addValueToCache() {
      this.isToLowerSaveValue && (this.saveKey = this.saveKey.toLowerCase());
      const localCacheValue = localStorage.getItem(this.saveKeyCacheValue);
      const autoCompleteValues: Array<string> =
        localCacheValue === null ? [] : JSON.parse(localCacheValue);
      if (!autoCompleteValues.includes(this.saveKey)) {
        autoCompleteValues.push(this.saveKey);
      }
      localStorage.setItem(
        this.saveKeyCacheValue,
        JSON.stringify(autoCompleteValues)
      );
      if (this.cacheKey === this.saveKeyCacheValue) {
        this.handleGetAutoComplete();
      }
    }
  
    private handleGetAutoComplete() {
      localStorage.getItem(this.cacheKey) === null
        ? (this.listItems = [])
        : this.filterWhitespaces();
      this.allItems = this.listItems;
    }
  
    private filterWhitespaces() {
      const cacheValues = JSON.parse(localStorage.getItem(this.cacheKey));
      const trimmedValues = [];
      for (let t = 0; t < cacheValues.length; t++) {
        trimmedValues.push(cacheValues[t].trim());
      }
      this.listItems = trimmedValues;
    }
  
    public filterChange(filter: string) {
      if (filter.length >= this.minimumFilterLength) {
        this.textValue = filter.trim();
        var keyValuePairAtMomentInTime = this.cacheKey + '†' + this.textValue;
        if (this.isDebounceSaveEnabled) {
          this.debounceEvent.next(keyValuePairAtMomentInTime);
        }
        this.isDebounceSaveEnabled
          ? (this.listItems = this.allItems.filter(
              s => s.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1
            ))
          : (this.listItems = this.allItems.filter(s =>
              s.toLowerCase().startsWith(filter.toLowerCase().trim())
            ));
        this.listItems.sort();
        if (this.listItems.length === 0) {
          this.storageAutoComplete.toggle(false);
        }
      } else {
        this.storageAutoComplete.toggle(false);
      }
  
      this.updateNoteChanged.emit(filter.trim());
    }
  
    public reset() {
      this.textValue = '';
      this.storageAutoComplete.reset();
    }
  
    valueChangeHandler() {
      this.updateNoteChanged.emit(this.textValue);
    }
  
    public SaveNote() {
      const localCacheValue = localStorage.getItem(this.cacheKey);
      const autoCompleteValues: Array<string> =
        localCacheValue === null ? [] : JSON.parse(localCacheValue);
      if (!autoCompleteValues.includes(this.textValue)) {
        autoCompleteValues.push(this.textValue);
      }
      localStorage.setItem(this.cacheKey, JSON.stringify(autoCompleteValues));
      this.handleGetAutoComplete();
    }
  }
  
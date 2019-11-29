import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    ElementRef,
    EventEmitter,
    ChangeDetectorRef,
    ChangeDetectionStrategy
  } from '@angular/core';
  import { State } from '@progress/kendo-data-query';
  import { process } from '@progress/kendo-data-query';
  import { ExcelExportData } from '@progress/kendo-angular-excel-export';
  
  import { Router } from '@angular/router';
  import {
    PageChangeEvent,
    GridDataResult,
    SelectableSettings,
    DataStateChangeEvent,
    RowClassArgs
  } from '@progress/kendo-angular-grid';
  
  import {
    filterBy,
    FilterDescriptor,
    CompositeFilterDescriptor,
    distinct,
    SortDescriptor,
    orderBy
  } from '@progress/kendo-data-query';
  import { FilterService } from '@progress/kendo-angular-grid';
  import {
    Observable,
    Subject,
    of,
    throwError as observableThrowError
  } from 'rxjs';
  import * as xml2js from 'xml2js';
  
  import { DomSanitizer } from '@angular/platform-browser';
  import {
    formatXml,
    IsJsonString,
    filterDelegate,
    getJsonDetailsJoined,
    ShouldRouteShipmentID,
    ShouldRoutePrimaryReference
  } from './sharedfunctions';
  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-invoice-grid',
    templateUrl: './invoice-grid.component.html',
    styleUrls: ['./invoice-grid.component.scss']
  })
  export class InvoiceGridGridComponent implements OnInit {
    get theRecords(): any[] {
      return this.gridDataAll;
    }
  
    @Input('gridheight')
    public set gridheight(value: number) {
      this.height = value;
    }
  
    @Input('cellLinkEnabled')
    public set cellLinkEnabled(value: boolean) {
      this.isLinkEnabled = value;
    }
  
    @Input('gridLoaded')
    public set gridLoaded(value: boolean) {
      this.isGridloaded = value;
    }
  
    @Input('loadingData')
    public set loadingData(value: boolean) {
      this.isDataloading = value;
    }
  
    @Input('theRecords')
    set theRecords(value: any[]) {
      this.gridDataAll = value;
      this.gridDataCurrent = value;
      this.loadRecords();
    }
  
    @Input('theJoinedRecords')
    set theJoinedRecords(value: any[]) {
      this.matchedRequestResponse = value;
    }
  
    @Input('isJoined')
    set isJoined(value: boolean) {
      this.isGridJoined = value;
    }
  
    @Input('env')
    public set env(value: string) {
      this.selectedEnv = value;
    }
  
    @Output()
    recordCountChange = new EventEmitter<string>();
  
    @Output()
    gridJoinedChange = new EventEmitter<boolean>();
  
    @Output()
    selectedrecords = new EventEmitter<string[]>();
  
    public height: number;
    public filter: CompositeFilterDescriptor;
    public gridDataAll: any[];
    public gridDataCurrent: any[];
    public gridData: GridDataResult;
    range = { start: null, end: null };
    public statusCategories: any[];
    public pageSize = 100;
    public skip = 0;
    public sort: SortDescriptor[] = [];
    public detailsOpened = false;
    isRawView = true;
    dataJSONRawRequest;
    dataJSONRawResponse;
    requestPayloadRequest: any;
    requestPayloadResponse: any;
    jsonParsedRequest: any;
    jsonParsedResponse: any;
    dataJSONRaw: any;
    requestPayload: any;
    dataJSONPretty: any;
    public isDataloading = true;
    public windowState: any = 'default';
    detailsViewText = 'Raw';
    responseJSON;
    isLinkEnabled: boolean;
    userMultiData: any[];
    isGridJoined: boolean;
    view = new Array(1).fill({}).map(x => ({}));
    jsonParsed: any[];
    public windowTop = 100;
    public windowLeft = 50;
    isDetailsDataLoaded = false;
    public showExcelDownloadProgress = false;
    matchedRequestResponse: any[];
    detailsWindowTitle: string;
    searchRawForJoined = false;
    viewDetailsDataItem: any;
    isRequestResponseMatchFound = false;
    isGridloaded: boolean;
    selectedEnv: string;
    fileUrl;
  
    public filterChange(filter: CompositeFilterDescriptor): void {
      this.filter = filter;
      this.gridDataCurrent = filterBy(this.gridDataAll, filter);
  
      this.loadRecords();
    }
  
    public distinctPrimitive(fieldName: string): any {
      return distinct(this.gridDataAll, fieldName).map(item => item[fieldName]);
    }
  
    constructor(
      private eleRef: ElementRef,
      private router: Router,
      private cdr: ChangeDetectorRef,
      private sanitizer: DomSanitizer
    ) {
      this.allData = this.allData.bind(this);
    }
  
    ngOnInit() {
      this.loadRecords();
    }
  
    showJson(d) {
      return JSON.stringify(d, null, 2);
    }
  
    public rowCallback(context: RowClassArgs) {
      const isEven = context.index % 2 === 0;
      return {
        even: isEven,
        odd: !isEven
      };
    }
    public pageChange(event: PageChangeEvent): void {
      this.skip = event.skip;
      this.pageSize = event.take;
      this.loadRecords();
    }
  
    private loadRecords(): void {
      this.view = new Array(1).fill({}).map(x => ({}));
      const currentView = this.gridDataCurrent.slice(
        this.skip,
        this.skip + this.pageSize
      );
  
      const removeCount = this.view.length - currentView.length;
  
      if (removeCount > 0) {
        this.view.splice(currentView.length - 1, removeCount);
      }
      currentView.forEach((item, index) => {
        if (!this.view[index]) {
          this.view[index] = {};
        }
        Object.assign(this.view[index], item);
      });
      this.view = orderBy(this.view, this.sort);
      this.gridData = {
        data: this.view,
        total: this.gridDataCurrent.length
      };
      this.recordCountChange.emit(this.gridData.total.toString());
  
      const userMultiData = [];
      for (let t = 0; t < this.gridDataCurrent.length; t++) {
        userMultiData.push(this.gridDataCurrent[t].userName);
      }
      const distinctValues = (value, index, self) => {
        return self.indexOf(value === index);
      };
      this.userMultiData = userMultiData.filter(distinctValues);
      this.cdr.detectChanges();
    }
  
    protected sortChange(sort: SortDescriptor[]): void {
      this.sort = sort;
      this.loadRecords();
    }
  
    public closeDetails() {
      this.detailsOpened = false;
    }
  
    public open() {
      this.windowState = 'maximized';
      this.detailsOpened = true;
    }
  
    viewDetails(event, dataitem) {
      this.viewDetailsDataItem = dataitem;
      this.isDetailsDataLoaded = false;
      this.jsonParsed = undefined;
      this.detailsOpened = true;
      this.detailsWindowTitle = 'Message Details - ' + dataitem.messageType;
      this.cdr.detectChanges();
    }
  

    public allData(): ExcelExportData {
      return {
        data: process(this.gridDataCurrent, { sort: this.sort }).data
      };
    }

    protected searchFilter(search: string = null): void {
      search
        ? (this.gridDataCurrent = this.gridDataAll.filter(obj =>
            filterDelegate(obj, search)
          ))
        : (this.gridDataCurrent = this.gridDataAll);
      this.loadRecords();
    }
    linkSearch(event) {
      this.searchFilter(event);
    }
  
    gridJoinChanged(event) {
      this.isGridJoined = event;
      this.gridJoinedChange.emit(event);
    }
  
    onCloseClick() {
      this.detailsOpened = false;
      this.isRequestResponseMatchFound = false;
      this.searchRawForJoined = false;
    }
  }
  
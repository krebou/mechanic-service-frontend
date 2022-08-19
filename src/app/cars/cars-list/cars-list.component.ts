import {Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject} from '@angular/core';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginator, MatPaginatorDefaultOptions,
  MatPaginatorIntl,
  PageEvent
} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {catchError, map, startWith, switchMap, mergeWith, of, Subject} from "rxjs";
import {Car} from "../../interface/car";
import {CarsService} from "../cars.service";
import {MatDialog} from "@angular/material/dialog";
import {CarDeleteDialogComponent} from "../car-delete-dialog/car-delete-dialog.component";
import {MatPaginatorSettings} from "../../module/angular-material/matPaginator/matPaginator.settings";
import {CarAddDialogComponent} from "../car-add-dialog/car-add-dialog.component";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {setSnackbar} from "../../snackbar/store/snackbar.actions";


const matPaginatorIntl = new MatPaginatorSettings().matPaginatorIntl();
matPaginatorIntl.itemsPerPageLabel = 'Pojazdów na stronie: ';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: matPaginatorIntl
    }
  ]
})
export class CarsListComponent implements AfterViewInit, OnInit {

  @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
  @ViewChild(MatSort) sort!: MatSort;

  data: Car[] = [];

  isLoadingResults = true;

  /** Table Settings **/
  displayedColumns: string[] = ['plate', 'mark', 'model', 'year', 'action'];

  /** Paginator Settings **/
  private paginatorTop!: MatPaginator;
  private paginatorBottom!: MatPaginator;
  private paginatorArray!: MatPaginator[];

  private _tablePageIndex = 0;
  get tablePageIndex(): number{
    return this._tablePageIndex + 1;
  }
  private set tablePageIndex( pageIndex: number ) {
    this._tablePageIndex
      = this.paginatorTop.pageIndex
      = this.paginatorBottom.pageIndex
      = pageIndex;
  }

  private _tablePageSize = this.matPaginatorDefaultOptions.pageSize || 25;
  get tablePageSize(): number {
    return this._tablePageSize;
  }
  private set tablePageSize( pageSize: number ){
    this._tablePageSize
      = this.paginatorTop.pageSize
      = this.paginatorBottom.pageSize
      = pageSize;
  }

  tableResultsLength = 0;

  private refreshTable$ = new Subject<{ status: string; }>();

  private path!: string | undefined;

  constructor(
    private carsService: CarsService,
    private dialogService: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS) private matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
    private store: Store<{ snackbar: any }>
  ) { }

  ngOnInit(){

    this.path = this.route.routeConfig?.path;

  }

  ngAfterViewInit() {

    this.paginatorArray = this.paginator.toArray();
    this.paginatorTop = this.paginatorArray[0];
    this.paginatorBottom = this.paginatorArray[1];

    this.sort.sortChange
      .pipe(
        mergeWith(
          this.paginatorTop.page,
          this.paginatorBottom.page,
          this.refreshTable$
        ),
        startWith({}),
      )
      .pipe(
        switchMap((event) => {

          // If detected paginator page changes
          if( isPageEvent(event) ){
            this.tablePageIndex = event.pageIndex;
            this.tablePageSize  = event.pageSize;
          }

          // If the user changes the sort order, reset back to the first page.
          if( event.hasOwnProperty('direction') ){
            this.tablePageIndex = this.paginatorTop.pageIndex = this.paginatorBottom.pageIndex = 0;
          }

          this.isLoadingResults = true;
          return this.carsService.getAllCars(
            this.tablePageIndex,
            this.tablePageSize,
            this.sort.active,
            this.sort.direction,
          ).pipe(
              catchError(() => {
                this.store.dispatch(setSnackbar({
                  payload: {
                    color: 'warn',
                    message: "Pobieranie pojazdów nie powiodło się - SERVER ERROR"
                  }
                }));
                 return of(null)
                }
              )
            );
        }),
        map( response => {
          this.isLoadingResults = false;

          if (response === null) {
            return [];
          }

          this.tableResultsLength = response.count;
          return response.data;
        })
      ).subscribe(data => (this.data = data));

  }

  deleteCar( id: number ){
    console.log(`id: ${id}`);
    this.dialogService.open( CarDeleteDialogComponent, {} )
      .afterClosed().subscribe({
        next: ( response: boolean | null ) => {
          console.log(response);
          if( response ){
            this.carsService.deleteCarById( id );
          }
        }
    });
  }

  addNewCar(): void {
    // this.location.replaceState( `${this.route.snapshot.pathFromRoot}/add`);
    this.dialogService.open( CarAddDialogComponent, {
      maxWidth: '100vw',
      width: '800px',
      height: 'auto',
      maxHeight: '100vh'
    }).afterClosed().subscribe({
      next: (value: 'added' | 'cancel') => {
        if( value === 'added'){
          this.refreshTable$.next({ status: "Car Added"})
        }
      }
    })
  }

}

function isPageEvent( object: {} ): object is PageEvent  {
  return ( object.hasOwnProperty('pageIndex') ? true : false )
}

// function isCar( object: Car | 'cancel'): object is Car{
//   return ( object.hasOwnProperty('vin') ? true : false )
// }

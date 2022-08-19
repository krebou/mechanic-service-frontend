import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ClientsService} from "../clients.service";
import {Client} from "../../interface/client";
import {catchError, delay, first, map, mergeWith, Observable, of, startWith, switchMap} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {isPageEvent, isSortChange } from "../../helpers/helpers";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;
  @ViewChild(MatSort) sort!: MatSort;

  clients!: Client[];

  // TABLE
  displayedColumns: string[] = ['firstname', 'lastname', 'action'];
  resultsLength = 0;
  isLoadingResults = true;
  tablePageIndex = 0;

  paginatorTop!: MatPaginator;
  paginatorBottom!: MatPaginator;


  ngAfterViewInit(): void{

    this.setPaginators();

    this.sort.sortChange
      .pipe(
        mergeWith(this.paginatorTop.page, this.paginatorBottom.page),
        startWith([]),
        switchMap((change): Observable<Client[]> => {

          // If detected paginator page changes
          if (isPageEvent( change )) {
            this.setPaginatorsPageIndex( change.pageIndex );
            this.setPaginatorsPageSize( change.pageSize )
          }

          // If detected sort changes
          if(isSortChange(change)){
            this.setPaginatorsPageIndex( 0 );
          }

          this.isLoadingResults = true;

          return this.clientsService.getAllClients()
            .pipe(
              catchError( () => of([]) )
            )
        }),
        map( (clients: Client[]): Client[] => {
          this.isLoadingResults = false;

          this.resultsLength = clients.length;
          return clients;
        })
      )
      .subscribe( ( clients: Client[] ) => ( this.clients = clients));


  }

  constructor(
    private clientsService: ClientsService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {

  }

  private setPaginators(): void{

    const _paginators = this.paginators.toArray();
    this.paginatorTop = _paginators[0];
    this.paginatorBottom = _paginators[1];

  }

  private setPaginatorsPageIndex( index: number ): void {
    this.paginatorTop.pageIndex
      = this.paginatorBottom.pageIndex
      = index;
  }

  private setPaginatorsPageSize( pageSize: number ): void {
    this.paginatorTop.pageSize = this.paginatorBottom.pageSize = pageSize;

  }

}

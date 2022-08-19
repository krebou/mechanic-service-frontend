import { Injectable } from '@angular/core';
import {map, Observable, of, retry} from "rxjs";
import {Car} from "../interface/car";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetAllResponse} from "../interface/getAll";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  _data: Car[] = [
    {
      plate: 'PO-424PZ',
      mark: 'Opel',
      model: 'Astra 4',
      year: 2005,
      vin: 'VSCSLOLOSLSOLSOSLOOO',
      clientId: '123456adef123456adef4214'
    },
    {
      plate: 'PCT-12495',
      mark: 'Seat',
      model: 'Ibiza III',
      year: 2006,
      vin: 'VSfsdfsdfsd',
      clientId: "adef123456123456adef4214"
    },
    {
      plate: 'PO-424PZ',
      mark: 'Opel',
      model: 'Astra 4',
      year: 2005,
      vin: 'VSCSLOLOSLSOLSOSLOOO',
      clientId: "adef123456123456adef4214"
    }
  ];

  private apiBaseUrl = 'http://localhost:3000';

  constructor( private httpClient: HttpClient ) { }

  getAllCars( page: number = 1, per_page: number = 25, sort: string = '', orderby: string = 'asc'): Observable<GetAllResponse<Car>> {
    const params = new HttpParams()
      .set('page', page )
      .set('per_page', per_page)
      .set('orderby', sort)
      .set('sort', orderby.toUpperCase());

    return this.httpClient.get<GetAllResponse<Car>>(`${this.apiBaseUrl}/v1/car/all`, { params } );
  }

  setCar( car: Car ): Observable<Car> {
    return this.httpClient.post<Car>(`${this.apiBaseUrl}/v1/car/`, car );
  }

  deleteCarById( id: number): Observable<true>  {
    delete this._data[id];
    return of(true);
  }
}

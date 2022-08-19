import { Injectable } from '@angular/core';
import {Client} from "../interface/client";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clients: Client[] = [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Newsweek',
      address: 'Kowalczyka 14/2',
      city: 'Wronki',
      city_code: '62-000',
      phone: 761333333
    },
    {
      id: 2,
      firstname: 'Bartosz',
      lastname: 'Chwarścianek',
      address: 'Janka z Czarnkowa 49',
      city: 'Wieleń',
      city_code: '64-730',
      phone: 723504867
    },
    {
      id: 3,
      firstname: 'Przemysław',
      lastname: 'Najdek',
      address: 'Kościuszki 41',
      city: 'Wieleń',
      city_code: '64-730',
      phone: 662558747
    }
  ]

  constructor() { }

  getAllClients(): Observable<Client[]>{
    return of( this.clients );
  }
}

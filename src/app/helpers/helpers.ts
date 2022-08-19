import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {Car} from "../interface/car";

// export const isWhatYouThings = <TObject, TReturn>( object: TObject extends Object, propertyName: string ): object is TReturn =>{
//   return object.hasOwnProperty(propertyName);
// }

export function isPageEvent<T>(object: T | PageEvent): object is PageEvent;
export function isPageEvent( object: any ) : object is PageEvent {
  return (object.hasOwnProperty('pageIndex') ? true : false);
}

export function isSortChange<T>( object: T | Sort ) : object is Sort;
export function isSortChange( object: any ) : object is Sort{
  return (object.hasOwnProperty('direction') ? true : false);
}
export function isCar<T>( object: T | Car ): object is Car;
export function isCar( object: Car | 'cancel'): object is Car {
  return ( object.hasOwnProperty('vin') ? true : false )
}

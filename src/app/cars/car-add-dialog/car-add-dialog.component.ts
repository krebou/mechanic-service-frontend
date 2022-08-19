import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "../../helpers/validator/form.validator";
import {CarsService} from "../cars.service";
import {Car} from "../../interface/car";
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {setSnackbar} from "../../snackbar/store/snackbar.actions";

@Component({
  selector: 'app-car-add-dialog',
  templateUrl: './car-add-dialog.component.html',
  styleUrls: ['./car-add-dialog.component.scss']
})
export class CarAddDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formValidator: FormValidator,
    private carsService: CarsService,
    private matDialogRef: MatDialogRef<CarAddDialogComponent>,
    private store: Store
    ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const year = new Date().getFullYear();

    this.form = this.formBuilder.group({
      'plate': [ '',
        [ Validators.required,
          this.formValidator.platePattern,
        ]
      ],
      'year': [ year,
        [ Validators.required,
          Validators.min(1886),
          Validators.max( year ),
          Validators.pattern( new RegExp(/^\d{4}$/i) )
        ]
      ],
      'mark': [ '',
        [ Validators.required,
          this.formValidator.namePattern,
        ]
      ],
      'model': [ '',
        [ Validators.required,
          this.formValidator.namePattern,
        ]
      ],
      'vin': [ '',
        [ Validators.required,
          this.formValidator.vinPattern,
        ]
      ],
    });

    // this.form.controls['vin'].patchValue( (value: string) => {
    //   return
    // })
  }

  getFormError( name: string, control: AbstractControl ): string {

    // PLATE ERRORS
    if( control.hasError('pattern') && name === 'plate' )  return 'Niedozwolone znaki, format: PZL0000';

    // CAR YEAR ERRORS
    if( control.hasError('max') && name === 'year' )  return `Produkcja nie może być nowsza niż ${control.errors?.['max'].max} `;
    if( control.hasError('min') && name === 'year' )  return `Najstarsze auto pochodzi z roku: ${control.errors?.['min'].min} `;

    // VIN ERRORS
    if( control.hasError('pattern') && name === 'vin' )  return 'VIN: składa się z 17 znaków, cyfr i liter z wyłączeniem liter I, O oraz Q'

    // DEFAULT ERRORS
    if( control.hasError('required') ) return 'Pole wymagane';

    if( control.hasError('max') ) return `Liczba nie może być większa niż ${control.errors?.['max'].max} `;
    if( control.hasError('min') ) return `Liczba nie może być mniejsza niż: ${control.errors?.['min'].min} `;

    if( control.hasError('pattern')  ) return 'Niedozwolone znaki' ;

    return 'Błąd';
  }

  makeValueToUpperCase( control: AbstractControl ): void {
    control.setValue( control.value.toUpperCase() );
    control.updateValueAndValidity();
  }

  setCar(): void{
    this.carsService.setCar({...this.form.getRawValue(), clientId: '123456123456123456123456'})
      .subscribe({
        next: () => {
          this.store.dispatch(setSnackbar({ payload: {
            color: "success",
              message: "Pojazd został prawidłowo dodany"
            }}))
          this.matDialogRef.close('added');
        },
        error: console.error,
      })
  }

}

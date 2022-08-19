import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormField} from "../interface/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'form-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule
  ],
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit, OnDestroy {

  @Input() fields!: FormField[];
  @Input() controls: any;
  @Output() formEvent = new EventEmitter<FormGroup>();

  form!: FormGroup;
  errorInvalidForm: boolean = false;

  formsub$!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group( this.controls  ); // v
    this.formEvent.emit(this.form);

    this.formsub$ = this.form.valueChanges.subscribe({
      next: () => this.formEvent.emit(this.form)
    })
  }

  ngOnDestroy() {
    this.formsub$.unsubscribe();
  }

}

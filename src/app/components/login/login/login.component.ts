import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authStart } from '../../../store/auth/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectAuthError, selectAuthInProccess } from '../../../store/auth/auth.selectors';
import { AuthState } from '../../../store/auth/auth.reducers';
import { FormValidator } from '../../../helpers/validator/form.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    form!: FormGroup;

    authError$ = this.store.select(selectAuthError);
    inProccess$ = this.store.select(selectAuthInProccess);

    getFormError = this.formValidator.getFormError;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private store: Store<{ auth: AuthState }>,
        private formBuilder: FormBuilder,
        private formValidator: FormValidator
    ) {}

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        this.createForm();
    }

    /***************  METHODS   ***************/

    getAuth() {
        if (this.form.valid) {
            this.store.dispatch(
                authStart({
                    email: this.form.get('email')?.value,
                    password: this.form.get('password')?.value,
                })
            );
        } else {
            this.form.markAllAsTouched();
        }
    }

    createForm(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
}

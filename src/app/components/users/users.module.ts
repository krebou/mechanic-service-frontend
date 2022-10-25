import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { PageHeaderStandaloneComponent } from '../page-header/page-header.standalone-component';
import { UsersTableStandaloneComponent } from './users-table/users-table.standalone-component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
} from '../../modules/angular-material/angular-material.module';
import { UserFormDialogComponent } from './dialogs/user-form-dialog/user-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { UserDeleteDialogComponent } from './dialogs/user-delete-dialog/user-delete-dialog.component';
import { UsersSelectActionDialogComponent } from './dialogs/users-select-action-dialog/users-select-action-dialog.component';

@NgModule({
    declarations: [
        UsersListComponent,
        UserFormDialogComponent,
        UserDeleteDialogComponent,
        UsersSelectActionDialogComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderStandaloneComponent,
        UsersTableStandaloneComponent,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormModule,
        PipesModule,
        MatProgressSpinnerModule,
        FormsModule,
    ],
})
export class UsersModule {}

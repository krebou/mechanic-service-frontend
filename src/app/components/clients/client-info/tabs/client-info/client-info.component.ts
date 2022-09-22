import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormDialogComponent } from '../../../dialogs/client-form-dialog/client-form-dialog.component';
import { Client } from '../../../../../interface/client';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from '../../../../../services/clients.service';
import { PipesModule } from '../../../../../pipes/pipes.module';

@Component({
    selector: 'app-client-info',
    standalone: true,
    imports: [CommonModule, PipesModule],
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent {
    /**
     *   GETTERS / SETTERS INPUTES / OUTPUTES ETC.
     **/

    @Input() public client!: Client;

    /**
     *   CONSTRUCTOR
     **/

    constructor(private dialogService: MatDialog, private clientsService: ClientsService) {}

    /**
     *   METHODS
     **/

    editClient(): void {
        this.dialogService
            .open(ClientFormDialogComponent, {
                data: {
                    action: 'edit',
                    client: this.client,
                },
            })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result?.status === 'edited') {
                        this.clientsService
                            .getClient(this.client.id || '')
                            .subscribe((client: Client) => (this.client = client));
                    }
                },
            });
    }
}

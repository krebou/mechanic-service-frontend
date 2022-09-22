import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatFormModule,
} from '../../modules/angular-material/angular-material.module';

export interface TableActionSelection {
    button: string;
    placeholder: string;
    data: TableActionSelectionData[];
}

export interface TableActionSelectionData {
    action: string;
    button: string;
}

const TABLE_ACTION_SELECTION = new InjectionToken<TableActionSelection>('table-action-selection', {
    factory: () => {
        return {
            button: 'Wykonaj',
            placeholder: 'Wybierz akcje',
            data: [
                {
                    action: 'delete',
                    button: 'Usuń wybrane',
                },
            ],
        };
    },
});

@Component({
    selector: 'app-before-table',
    templateUrl: './before-table.component.html',
    styleUrls: ['./before-table.component.scss'],
    standalone: true,
    imports: [CommonModule, MatFormModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeforeTableComponent {
    @Output() private action = new EventEmitter<string>();
    @Input() public count: number = 0;
    @Input() private actionsType!: TableActionSelectionData[];
    @Input() private actionButton!: string;
    @Input() private selectPlaceholder!: string;

    selectedAction = '';

    actions!: TableActionSelectionData[];
    button!: string;
    placeholder!: string;

    constructor(
        @Inject(TABLE_ACTION_SELECTION) private tableActionSelection: TableActionSelection
    ) {}

    ngOnInit(): void {
        this.actions = this.actionsType || this.tableActionSelection.data;
        this.button = this.actionButton || this.tableActionSelection.button;
        this.placeholder = this.selectPlaceholder || this.tableActionSelection.placeholder;
    }

    onSelectedAction(): void {
        this.action.emit(this.selectedAction);
        this.selectedAction = '';
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatFormModule,
} from '../../modules/angular-material/angular-material.module';
import {
    TableActionSelection,
    TableActionSelectionData,
} from '../../interface/table-action.interface';
import { TABLE_ACTION_SELECTION } from '../../injectionTokens/table-action-selection.injection-token';

@Component({
    selector: 'app-before-table',
    templateUrl: './before-table.standalone-component.html',
    styleUrls: ['./before-table.standalone-component.scss'],
    standalone: true,
    imports: [CommonModule, MatFormModule, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeforeTableStandaloneComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Output() private action = new EventEmitter<string>();
    @Input() public count: number = 0;
    @Input() private actionsType!: TableActionSelectionData[];
    @Input() private actionButton!: string;
    @Input() private selectPlaceholder!: string;

    selectedAction = '';

    actions!: TableActionSelectionData[];
    button!: string;
    placeholder!: string;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        @Inject(TABLE_ACTION_SELECTION) private tableActionSelection: TableActionSelection
    ) {}

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        this.actions = this.actionsType || this.tableActionSelection.data;
        this.button = this.actionButton || this.tableActionSelection.button;
        this.placeholder = this.selectPlaceholder || this.tableActionSelection.placeholder;
    }

    /***************  METHODS   ***************/

    onSelectedAction(): void {
        this.action.emit(this.selectedAction);
        this.selectedAction = '';
    }
}

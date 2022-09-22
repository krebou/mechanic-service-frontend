import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    RepairAddCostsComponent,
    RepairCosts,
} from './repair-add-costs/repair-add-costs.component';
import { RepairsService } from '../../../services/repairs.service';
import { Repair } from '../../../interface/repair.interface';

@Component({
    selector: 'app-repair-add',
    templateUrl: './repair-add.component.html',
    styleUrls: ['./repair-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairAddComponent {
    formInformation!: FormGroup;
    formVehicle!: FormControl;
    formCosts!: FormGroup<RepairCosts>;

    constructor(private formBuilder: FormBuilder, private repairsService: RepairsService) {}

    get areFormsValid() {
        return this.formInformation?.valid && this.formVehicle?.valid && this.formCosts?.valid
            ? true
            : false;
    }

    get areFormsInValid() {
        return this.formInformation?.invalid || this.formVehicle?.invalid || this.formCosts?.invalid
            ? true
            : false;
    }

    saveRepair() {
        if (this.areFormsValid) {
            const information = this.formInformation.getRawValue();
            const vehicleId = this.formVehicle.value;
            const partsList = this.formCosts.getRawValue().parts;

            const repair: Repair = {
                ...information,
                vehicleId,
                partsList,
            };
            this.repairsService.setRepair(repair).subscribe((res) => console.log(res));
        } else {
            this.formCosts.markAllAsTouched();
        }
    }
}

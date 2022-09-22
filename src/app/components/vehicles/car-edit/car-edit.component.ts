import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-car-edit',
    templateUrl: './car-edit.component.html',
    styleUrls: ['./car-edit.component.scss'],
})
export class CarEditComponent implements OnInit {
    carId: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];
    }
}

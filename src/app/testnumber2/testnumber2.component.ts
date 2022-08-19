import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from "../module/angular-material/angular-material.module";

@Component({
  selector: 'app-testnumber2',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './testnumber2.component.html',
  styleUrls: ['./testnumber2.component.scss']
})
export class Testnumber2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

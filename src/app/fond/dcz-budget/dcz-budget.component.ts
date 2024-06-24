import {Component, OnInit, ViewChild} from '@angular/core';
import { ServiceDcz } from "../models/serviceDcz";
import { DeviceDetectorService } from "ngx-device-detector";
import {ActivatedRoute, RouterLink} from "@angular/router";
import * as AOS from "aos";
import {LoadBudgetService} from "../../services/load-budget.service";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-dcz-budget',
  templateUrl: './dcz-budget.component.html',
  standalone: true,
  imports: [
    RouterLink, HttpClientModule, NgIf, NgForOf,
  ],
  providers: [LoadBudgetService],

  styleUrls: ['./dcz-budget.component.css']
})
export class DczBudgetComponent implements OnInit {
  dczservice: ServiceDcz[] = [];
  isMobile: boolean = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private dataService: LoadBudgetService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    AOS.init();
    this.loadPoslugDCZ();
  }
  isExternalLink(link: string | undefined): boolean {
    return link !== undefined && link.startsWith('http');
  }

  loadPoslugDCZ(): void {
    this.dataService.getPoslug().subscribe((data) => {
      data.sort((a, b) => {
        // Check if either id is undefined and handle accordingly
        if (typeof a.id === 'undefined') return 1; // Assume undefined ids are "greater" or "later"
        if (typeof b.id === 'undefined') return -1;
        return a.id - b.id;
      });
      this.dczservice = data;
      console.log(this.dczservice);
    });
  }
}

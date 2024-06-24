import {Component, OnInit} from '@angular/core';
import {ServiceDcz} from "../../models/serviceDcz";
import {DeviceDetectorService} from "ngx-device-detector";
import {ActivatedRoute, Router} from "@angular/router";
import * as AOS from "aos";
import {LoadTradeService} from "../../../services/load-trade.service";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dcz-budget-year',
  templateUrl: './dcz-budget-year.component.html',
  standalone: true,
  imports: [HttpClientModule, NgForOf, NgIf,],
  providers: [LoadTradeService],

  styleUrls: ['./dcz-budget-year.component.css']
})
export class DczBudgetYearComponent implements OnInit {
  budgetyears: ServiceDcz[] = [];
  link: string | undefined;
  constructor( private  deviceService: DeviceDetectorService,private dataService: LoadTradeService, private router: Router, private route: ActivatedRoute) {
  }
  isMobile: boolean = false;
  ngOnInit(): void {
    this.isMobile = this. deviceService.isMobile();



    this.loadBudget();
  }
  loadBudget() {
    this.dataService.getPeriodBudget().subscribe((data) => {
      data.sort((a, b) => {
        if (typeof a.id === 'undefined') return 1; // Assume undefined ids are "greater" or "later"
        if (typeof b.id === 'undefined') return -1;
        return b.id - a.id;
      });
      this. budgetyears = data;

    });
  }


}

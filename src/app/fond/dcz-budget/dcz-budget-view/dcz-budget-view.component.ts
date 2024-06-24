import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LoadTradeService} from "../../../services/load-trade.service";
import {LoadInfografService} from "../../../services/load-infograf.service";



@Component({
  selector: 'app-dcz-budget-view',
  templateUrl: './dcz-budget-view.component.html',
  standalone: true,
  providers: [LoadInfografService],

  imports: [
    NgForOf,HttpClientModule,
    NgIf
  ],
  styleUrls: ['./dcz-budget-view.component.css']
})
export class DczBudgetViewComponent implements OnInit {
  pdf: any[] = [];
  pdfs: SafeResourceUrl[] = []; // Array to hold sanitized PDF URLs
  isMobile: boolean = false;
  constructor( private  deviceService: DeviceDetectorService,private sanitizer: DomSanitizer, private route: ActivatedRoute,private dataService: LoadInfografService, private dialog: MatDialog,) {
    this.route.queryParams.subscribe(params => {
      const filterValue =params['filter']
      console.log(filterValue)
      this.loadInfoDCZ(filterValue);

    })
  }
  ngOnInit(): void {
    this.isMobile = this. deviceService.isMobile()||this. deviceService.isTablet();
    this.route.queryParams.subscribe(params => {
      const filterValue =params['filter']
      console.log(filterValue)
    this.loadInfoDCZ(filterValue);

    })

  }

  loadInfoDCZ(filterValue: any) {
    this.dataService.getInfo().subscribe((data) => {
      const filteredData = data.data.filter((option: { typeinfo: string; }) =>
        option.typeinfo.toLowerCase().includes(filterValue.toLowerCase()));
      this.pdf = filteredData.map((item: { linkimg: string; }) => ({
        safeLink: this.sanitizer.bypassSecurityTrustResourceUrl(item.linkimg)
      }));
      // Sanitize URLs for secure embedding
      this.pdfs = this.pdf.map(item => item.safeLink);
    });
  }
}

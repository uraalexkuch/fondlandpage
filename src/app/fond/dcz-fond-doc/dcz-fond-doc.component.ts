import {Component, OnInit} from '@angular/core';
import {LowloadService} from "../../services/lowload.service";
import {ActivatedRoute} from "@angular/router";
import * as AOS from "aos";
import {Low} from "../models/low";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {LoadFondService} from "../../services/load-fond.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dcz-fond-doc',
  templateUrl: './dcz-fond-doc.component.html',
  standalone: true,
  providers: [LowloadService],

  imports: [
    NgxPaginationModule, HttpClientModule, NgIf, NgForOf
  ],
  styleUrls: ['./dcz-fond-doc.component.css']
})
export class DczFondDocComponent implements OnInit {
  lowdata: Low[] = [];
  page: number = 1;
  public maxSize: number = 11;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    screenReaderPageLabel: 'сторінка',
    screenReaderCurrentLabel: `Ви на сторінці`
  }
  constructor(private dataService: LowloadService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    AOS.init();
    this.route.queryParams.subscribe(() => {
      const filterValue = 'fond';
      this.loadData(filterValue);
    });
  }


  loadData(filterValue?: string) {
    this.dataService.getLow().subscribe({
      next: (response) => {
        const data:Low[] = response.data;
        data.sort((a, b) => {
          let dateA = a.date ? new Date(a.date).getTime() : -Infinity;
          let dateB = b.date ? new Date(b.date).getTime() : -Infinity;
          return dateB - dateA;
        });
        if (filterValue) {
          this.lowdata = data.filter(option => option.categorylow.toLowerCase().includes(filterValue.toLowerCase()));
          console.log(this.lowdata)
        } else {
          this.lowdata = data;
        }
      },
      error: (err) => {
        console.error('Error fetching FAQs:', err);
      }
    });
  }



}

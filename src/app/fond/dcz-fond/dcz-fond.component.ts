import { Component, OnInit } from '@angular/core';

import * as AOS from 'aos';
import {Fond} from "../models/fond";
import {LoadFondService} from "../../services/load-fond.service";
import {NgForOf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MatCard, MatCardSubtitle, MatCardTitle} from "@angular/material/card";


@Component({
  selector: 'app-dcz-fond',
  templateUrl: './dcz-fond.component.html',
  standalone: true,
  providers: [LoadFondService],
  imports: [
    NgForOf, HttpClientModule, MatCard, MatCardTitle, MatCardSubtitle
  ],


  styleUrls: ['./dcz-fond.component.css']
})
export class DczFondComponent implements OnInit {
    fonddata: Fond[] = [];
    groupedData: { category: string, items: Fond[] }[] = [];


    constructor(private dataService: LoadFondService) {}

    ngOnInit(): void {
        AOS.init();
        this.loadData();
    }

    loadData() {
        this.dataService.getFond().subscribe({
          next: (response) => {
            const data:Fond[] = response.data;
            this.fonddata = data.sort((a, b) => a.id - b.id);  // Сортуємо дані за id
            this.groupData();
        }
    })
    }


    groupData() {
        const tempGroup: { [key: string]: Fond[] } = {};

        this.fonddata.forEach(item => {
            if (!tempGroup[item.categoryfond]) {
                tempGroup[item.categoryfond] = [];
            }
            tempGroup[item.categoryfond].push(item);
        });

        this.groupedData = Object.keys(tempGroup).map(key => ({
            category: key,
            items: tempGroup[key]
        }));
    }

}

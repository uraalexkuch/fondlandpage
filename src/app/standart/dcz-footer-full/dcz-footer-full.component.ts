import {Component, OnInit} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dcz-footer-full',
  templateUrl: './dcz-footer-full.component.html',
  standalone: true,
  imports: [
    MatDivider,
    NgIf
  ],
  styleUrls: ['./dcz-footer-full.component.css']
})
export class DczFooterFullComponent implements OnInit {
constructor(private  deviceService: DeviceDetectorService,) {
}
  isMobile: boolean = false;
  isTablet: boolean = false;
  ngOnInit(): void {
    this.isMobile = this. deviceService.isMobile();
    this.isTablet = this. deviceService.isTablet();
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {}

  ngOnInit(): void {


    AOS.init(); // Initial AOS initialization
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh();
    }, 50); // Add a short delay (adjust if needed)
  }



}

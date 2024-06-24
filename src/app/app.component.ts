import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DczFooterFullComponent} from "./standart/dcz-footer-full/dcz-footer-full.component";
import {DczHeadNewComponent} from "./standart/dcz-head-new/dcz-head-new.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DczFooterFullComponent, DczHeadNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fondlandpage';
}

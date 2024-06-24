import {AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatMenu} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-dcz-head-new',
  templateUrl: './dcz-head-new.component.html',
  styleUrls: ['./dcz-head-new.component.css'],
  standalone: true,
  imports: [
    MatIcon,
    NgStyle,
    NgClass,
    RouterLink,
    MatSidenavContainer,
    MatDivider,
    MatSidenavModule,
    RouterOutlet,
    NgForOf,
    NgIf,
    MatIconButton,
    MatTooltip
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class DczHeadNewComponent implements AfterViewInit {
  menuItems = [
    { title: 'Склад Правління Фонду', link: '/aboutfond' },
    { title: 'Постанови Правління Фонду', link: '/low' },
    { title: 'Звіти про виконання бюджету Фонду', link: '/budget' }

  ];

  @ViewChild('sidenav') sidenav?: MatSidenav;

  isMobile = false;
  isHighContrast = false;
  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2, private el: ElementRef, private router: Router) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  toggleHighContrast() {
    this.isHighContrast = !this.isHighContrast;
    if (this.isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target && !target.closest('.menu-item')) {
      this.closeAllMenus();
    }
  }

  closeAllMenus() {
    // Close sidenav if open
    if (this.sidenav && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
    this.closeAllMenus();
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  setHeight() {
    const headerBottom = this.el.nativeElement.querySelector('.header-bottom');
    const subMenu = this.el.nativeElement.querySelector('.sub-menu.h7');
    if (headerBottom && subMenu) {
      const height = headerBottom.offsetHeight + 'px';
      this.renderer.setStyle(subMenu, 'height', height);
    }
  }
}

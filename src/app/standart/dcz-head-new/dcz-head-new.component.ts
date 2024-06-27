import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { MatMenu } from "@angular/material/menu";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dcz-head-new',
  templateUrl: './dcz-head-new.component.html',
  styleUrls: ['./dcz-head-new.component.css'],
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
  ],
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgForOf,
    NgIf,
    MatSidenav,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatSidenavContent,
    RouterOutlet,
    MatSidenavContainer,
    RouterLink
  ]
})
export class DczHeadNewComponent implements OnInit, AfterViewInit {
  activeIndex: number = -1;
  menuItems = [
    { title: 'Головна', link: '/', visible: false },
    { title: 'Про нас', link: '/aboutfond', visible: false },
    { title: 'Документи', link: '/low', visible: false },
    { title: 'Бюджет', link: '/budget', visible: false }
  ];

  @ViewChild('sidenav') sidenav?: MatSidenav;
  menu!: MatMenu | null;
  isMobile = false;
  isHighContrast = false;
  dropdownOpen: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {
    breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.closeAllMenus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    // Перевіряємо, чи клік відбувається поза поточним меню та не на іншому елементі меню
    if (target && !target.closest('.menu-item') && !target.closest('.menu-item-type-taxonomy')) {
      this.dropdownOpen = false;
    }
  }

  closeDropdown() {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  resetMenuState() {
    // Reset active menu item
    this.activeIndex = -1;
    // Hide all sub-menus
    this.menuItems.forEach(item => {
      item.visible = false;
    });
  }

  setHeight() {
    const headerBottom = this.el.nativeElement.querySelector('.header-bottom');
    const subMenu = this.el.nativeElement.querySelector('.sub-menu.h7');
    const height = headerBottom.offsetHeight + 'px';
    this.renderer.setStyle(subMenu, 'height', height);
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      console.log('Toggling sidenav');
      this.sidenav.toggle();
      console.log('Sidenav state:', this.sidenav.opened);
    } else {
      console.log('Sidenav not found');
    }
  }

  closeAllMenus() {
    this.menuItems.forEach(item => item.visible = false);
    this.resetMenuState();
  }

  toggleMenuTop(index: number) {
    if (this.menuItems[index].visible) {
      this.menuItems[index].visible = false;
      this.activeIndex = -1;
    } else {
      this.closeAllMenus();
      this.menuItems[index].visible = true;
      this.activeIndex = index;
      this.dropdownOpen = false;
    }
  }

  handleSubItemClick(): void {
    this.dropdownOpen = false;
    this.closeAllMenus();
  }

  toggleMenuTopMob(index: number) {
    if (this.activeIndex === index) {
      this.menuItems[index].visible = !this.menuItems[index].visible;
      this.activeIndex = -1;
      return;
    }
    this.menuItems.forEach(item => item.visible = false); // Close all other menus
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
    this.menuItems[index].visible = true;
    this.activeIndex = index;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setHeight();
  }
}

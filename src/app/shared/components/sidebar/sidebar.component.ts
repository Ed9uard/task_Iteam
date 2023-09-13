import { Component, HostBinding, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  expanded: boolean = true;
  menuItems: MenuItem[] = [
    { icon: 'fas fa-address-card', label: this.translate.instant('SIDEBAR.MENU.USERPROFILE'), routerLink: ['cabinet', 'user-panel'] },
    { icon: 'fas fa-stopwatch', label: this.translate.instant('SIDEBAR.MENU.STOPWATCH'), routerLink: ['cabinet', 'stopwatch-panel'] },
    { icon: 'fas fa-file-pdf', label: 'CV Kruts_Eduard', url: '/assets/pdf/Kruts_Eduard.pdf', target: '_blank' } 
  ];

  constructor(
    private translate: TranslateService
  ) { }

  @HostBinding('class.expanded') private get isExpanded() {
    return this.expanded;
}

  ngOnInit(): void {}
}

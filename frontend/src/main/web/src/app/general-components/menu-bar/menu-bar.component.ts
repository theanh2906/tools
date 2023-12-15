import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { CachesService } from '../../services/caches.service';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type SideBarItem = {
  title: string;
  url: string;
  icon?: string;
};

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @ViewChild('sideNav') sideNav!: MatSidenav;
  isAuthenticated = false;
  remainingTime = 0;
  mobileQuery: MediaQueryList;
  routeData: any;
  title = '';
  sideNavItems: SideBarItem[] = [
    {
      title: 'Invoice',
      url: 'invoice',
      icon: 'receipt',
    },
    {
      title: 'Change Cases',
      url: 'change-cases',
      icon: 'format_size',
    },
    {
      title: 'Calendar',
      url: 'calendar',
      icon: 'calendar_today',
    },
    {
      title: 'Notes',
      url: 'note',
      icon: 'edit_note',
    },
    {
      title: 'Generate JSON',
      url: 'generate-json',
      icon: 'code',
    },
    {
      title: 'Storage',
      url: 'storage',
      icon: 'cloud_upload',
    },
    {
      title: 'QR Generator',
      url: 'qr-generator',
      icon: 'qr_code_2',
    },
    {
      title: 'Chat',
      url: 'chat',
      icon: 'forum',
    },
    {
      title: 'Admin',
      url: 'admin',
      icon: 'admin_panel_settings',
    },
    {
      title: 'Video call',
      url: 'video-call',
      icon: 'video_call',
    },
  ];

  mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private cachesService: CachesService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', () => this.mobileQueryListener);
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.authService.isTokenValid) {
        this.remainingTime = Math.round(
          this.authService.authData.exp - new Date().getTime() / 1000
        );
      } else return;
    }, 1000);
    this.isAuthenticated = this.authService.isTokenValid;
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        switch (events.url) {
          case '/change-cases':
            this.title = 'Change Cases';
            break;
          case '/invoice':
            this.title = 'Invoice';
            break;
          case '/calendar':
            this.title = 'Calendar';
            break;
          case '/notes':
            this.title = 'Notes';
            break;
          default:
            break;
        }
      }
    });
  }

  onNavigate = (url: string) => {
    this.cachesService.setPreviousUrl(url);
    this.sideNav.close().then(() => {
      this.router.navigate([url]);
    });
  };

  onAuthenticate = () => {
    if (this.isAuthenticated) {
      this.authService.logout();
      this.snackBar.open('You have successfully signed out!', '', {
        duration: 2000,
      });
    } else this.router.navigateByUrl('/auth');
  };
}

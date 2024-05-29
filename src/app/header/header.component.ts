import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBellAlertSolid, heroBellSolid } from '@ng-icons/heroicons/solid';
import { Observable, of, interval, startWith, switchMap, pairwise, map } from 'rxjs';
import { UserService } from '../services/user.service';
import { Notification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';
import { navigateToUrl } from 'single-spa';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterModule
  ],
  viewProviders: [
    provideIcons({ heroBellSolid, heroBellAlertSolid })
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public currentUser$ = this.userService.getUser();
  public notifications$: Observable<Notification[]> = of([]);
  public isNewNotification = false;

  constructor(
    private cookieService: CookieService, 
    private router: Router, 
    private notificationService: NotificationService, 
    private userService: UserService
  ) {
    this.notifications$ = interval(10000).pipe(
      startWith(0),
      takeUntilDestroyed(),
      switchMap(() => this.currentUser$),
      switchMap(username => this.notificationService.getNotificationsForUser(username ?? '')),
      pairwise(),
      map(([ oldVal, newVal ]) => {
        if (newVal.length > oldVal.length) {
          this.isNewNotification = true;
        }
        return newVal;
      })
    );
  }

  logout(): void {
    console.log('Logging out');
    this.cookieService.delete('jwtToken');
    navigateToUrl('/');
  }

  toggleNotification(notification: Notification): void {
    notification.seen = !notification.seen;
    this.notificationService.toggleNotification(notification.id);
  }

  navigateToTodoPage(todoId: string): void {
    this.router.navigate([ '/todos/', todoId ]).catch(err => console.log(err));
  }

  navigateToProfile(): void {
    console.log('Navigating to profile');
    this.currentUser$.then(username => {
      navigateToUrl(`/profile/${username}`);
    });
  }
}

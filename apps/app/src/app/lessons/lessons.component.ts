import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '@pwa/data';
import { catchError } from 'rxjs/operators';
import { SwPush } from '@angular/service-worker';

import { LessonsService } from '../services/lessons.service';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'pwa-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  sub: PushSubscription;

  readonly VAPID_PUBLIC_KEY =
    'BKaayKniQjNJx1Su8EEukujfItZbw40e8LnppqC7BVQO9jVLy81x9TmWoYDBGE1YrbJjnxdYEyrWYBlItsYpuW4';

  constructor(
    private lessonsService: LessonsService,
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessons$ = this.lessonsService
      .loadAllLessons()
      .pipe(catchError((err) => of([])));
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub: PushSubscription) => {
        console.log('Notification Subscription: ', sub);

        this.sub = sub;

        this.newsletterService.addPushSubscriber(sub).subscribe({
          next: () => console.log('Sent push subscription object to server.'),
          error: (err) =>
            console.error(
              'Could not send subscription object to server, reason: ',
              err
            ),
        });
      })
      .catch((err) =>
        console.error('Could not subscribe to notifications: ', err)
      );
  }

  sendNewsletter() {
    this.newsletterService.send().subscribe();
  }
}

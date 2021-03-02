import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import * as webpush from 'web-push';

import { AppService } from './app.service';
import { USER_SUBSCRIPTIONS } from './in-memory-db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('lessons')
  getLessons() {
    return this.appService.getLessons();
  }

  @Get('lesson/:id')
  getLesson(@Param('id') id: string) {
    return this.appService.getById(Number(id));
  }

  @Post('notifications')
  addPushSubscriber(@Req() request: Request, @Res() response: Response) {
    const sub = request.body;

    console.log('Received Subscription on the server: ', sub);

    USER_SUBSCRIPTIONS.push(sub);

    response.status(200).json({ message: 'Subscription added successfully.' });
  }

  @Post('newsletter')
  sendNewsletter(@Res() response: Response) {
    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    const notificationPayload = {
      notification: {
        title: 'Angular News',
        body: 'Firefox ?!',
        icon: 'assets/main-page-logo-small-hat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [
          {
            action: 'explore',
            title: 'Go to the site',
          },
        ],
      },
    };

    Promise.all(
      USER_SUBSCRIPTIONS.map((sub) =>
        webpush.sendNotification(sub, JSON.stringify(notificationPayload))
      )
    )
      .then(() =>
        response.status(200).json({ message: 'Newsletter sent successfully.' })
      )
      .catch((err) => {
        console.error('Error sending notification, reason: ', err);
        response.sendStatus(500);
      });
  }
}

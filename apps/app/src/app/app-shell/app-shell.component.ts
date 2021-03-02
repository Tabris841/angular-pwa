import { Component } from '@angular/core';

@Component({
  selector: 'pwa-app-shell',
  templateUrl: './app-shell.component.html',
  styles: [
    `
      .loading-indicator {
        height: 300px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppShellComponent {}

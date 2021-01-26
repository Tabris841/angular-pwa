import { Component, Inject, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'pwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          this.document.location.reload();
        }
      });
    }
  }
}

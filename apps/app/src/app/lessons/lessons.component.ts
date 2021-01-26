import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from '@pwa/data';

import { LessonsService } from '../services/lessons.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pwa-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessons$ = this.lessonsService
      .loadAllLessons()
      .pipe(catchError((err) => of([])));
  }
}

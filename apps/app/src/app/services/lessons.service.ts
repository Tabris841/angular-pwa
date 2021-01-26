import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '@pwa/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  constructor(private http: HttpClient) {}

  loadAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons');
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('/api/lessons/' + id);
  }
}

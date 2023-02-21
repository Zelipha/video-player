import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private _getUrl = '/api/videos';
  private _postUrl = '/api/video';
  private _putUrl = '/api/video/';
  private _deleteUrl = '/api/video/';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this._getUrl);
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this._postUrl, video);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(`${this._putUrl}${video._id}`, video);
  }

  deleteVideo(video: Video): Observable<Video> {
    return this.http.delete<Video>(`${this._deleteUrl}${video._id}`);
  }
}

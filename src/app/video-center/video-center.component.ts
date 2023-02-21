import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService],
})
export class VideoCenterComponent implements OnInit {
  videos!: Array<Video>;
  hideNewVideo: boolean = true;
  selectedVideo!: Video | null;

  constructor(private _videoService: VideoService) {}

  ngOnInit() {
    this._videoService
      .getVideos()
      .subscribe((resVideoData) => (this.videos = resVideoData));
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  newVideo() {
    this.hideNewVideo = false;
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video).subscribe((resNewVideo: Video) => {
      this.videos.push(resNewVideo);
      this.hideNewVideo = true;
      this.selectedVideo = resNewVideo;
    });
  }

  onUpdateVideoEvent(video: any) {
    this._videoService
      .updateVideo(video)
      .subscribe((resUpdatedVideo: Video) => {
        video = resUpdatedVideo;
      });
    this.selectedVideo = null;
  }

  // OnDeleteVideoEvent partly works
  onDeleteVideoEvent(video: Video) {
    this._videoService.deleteVideo(video).subscribe((resDeletedVideo) => {
      this.videos = this.videos.filter((v) => v._id !== video._id);
    });
    this.selectedVideo = null;
  }
}

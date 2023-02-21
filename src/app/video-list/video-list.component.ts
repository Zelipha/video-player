import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  @Input() videos: Video[] = [];
  @Output() selectVideo = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSelect(event: Event, video: Video) {
    event.preventDefault(); // prevent default navigation behavior
    this.selectVideo.emit(video); // emit the selected video to the parent component
  }
}

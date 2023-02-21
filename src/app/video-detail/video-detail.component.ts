import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent {
  @Input() video: any;
  @Output() updateVideoEvent = new EventEmitter();
  @Output() deleteVideoEvent = new EventEmitter();
  public editTitle: boolean = false;

  constructor() {}

  ngOnit() {}

  ngOnChanges() {
    this.editTitle = false;
  }

  onTitleClick() {
    this.editTitle = true;
  }

  updateVideo() {
    this.updateVideoEvent.emit(this.video);
  }

  deleteVideo(event: Event) {
    event.preventDefault();
    this.deleteVideoEvent.emit(this.video);
  }
}

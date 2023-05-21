import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Observable, range, timer, zip } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input('timealloted') value: number =180;
  @Output('onComplete') timerOver: EventEmitter<any> = new EventEmitter<any>();
  timerValue: any = {};
  areTenSecsRemainings: boolean = false;
  constructor() {
   
  }

  ngOnInit() {
    this.timer(this.value);
  }
  timer(minute:number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    const timer = setInterval(() => {
      seconds--;
      let mins = parseInt("" + seconds / 60);
      let secs = seconds % 60;
      let hrs = parseInt("" + mins / 60);
      mins = mins % 60
      if (secs < 11) this.areTenSecsRemainings = true
      let res = {
        'hours': hrs,
        'minutes': mins,
        'seconds': secs
      };

      this.timerValue = res;
      if (seconds == 0) {
        console.log("finished");
        this.timerOver.emit('TIMER OVER');
        clearInterval(timer);
      }
    }, 1000);
  }


}
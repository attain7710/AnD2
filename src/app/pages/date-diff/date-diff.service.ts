import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DateDiffService {

  model: {
    startDate: string,
    endDate: string,
    days: string,
    dmy: string
  };

  constructor(
    private storage: Storage,
  ) { }

  initialize() {
    this.model = { startDate: '', endDate: '', days: '', dmy: '' };

    this.storage.get('DATE_DIFF_START').then(start => {
      if (start) {
        this.model.startDate = start;
      } else {
        const now = new Date();
        const startDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        this.model.startDate = startDate;
        this.storage.set('DATE_DIFF_START', startDate);
      }
    });

    const now = new Date();
    const endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.model.endDate = endDate;
    this.storage.set('DATE_DIFF_END', endDate);

    // this.storage.get('DATE_DIFF_END').then(end => {
    //   if (end) {
    //     this.model.endDate = end;
    //   } else {
    //   }
    // });
  }

  changeDate(type: string, value: string) {
    if (type === 'start') {
      console.log('start', value);
      this.storage.set('DATE_DIFF_START', value);
      return;
    }

    if (type === 'end') {
      console.log('end', value);
      this.storage.set('DATE_DIFF_END', value);
      return;
    }
  }

  calculateDiff() {
    if (this.model.startDate.length === 0) { return; }

    const startDate = new Date(this.model.startDate);
    const endDate = new Date(this.model.endDate);

    const timestamp = endDate.getTime() - startDate.getTime();
    const daysDiff  = Math.round(timestamp / (24 * 60 * 60 * 1000));

    const years = Math.round(daysDiff / 365);
    const months = Math.round((daysDiff % 365) / 30);
    const days = Math.round((daysDiff % 365) % 30);

    this.model.days = daysDiff + ' days';
    this.model.dmy = years + ' years ' + months + ' months ' + days + ' days';
  }
}

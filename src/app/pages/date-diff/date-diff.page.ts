import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DateDiffService } from './date-diff.service';
import { DateDiffSettingsComponent } from '../../modals/date-diff-settings/date-diff-settings.component';

@Component({
  selector: 'app-date-diff',
  templateUrl: './date-diff.page.html',
  styleUrls: ['./date-diff.page.scss'],
})
export class DateDiffPage implements OnInit {

  isCalculated = false;
  days = false;

  constructor(
    private modalController: ModalController,
    public diffService: DateDiffService
  ) { }

  ngOnInit() {
    this.diffService.initDate().then(() => {
      this.show();
    });

    this.diffService.initAvatarAndName();
  }

  async openSettings() {
    const settings = await this.modalController.create({
      component: DateDiffSettingsComponent,
      swipeToClose: true
    });

    return await settings.present();
  }

  show() {
    if (!this.isCalculated) {
      this.isCalculated = true;
      this.diffService.calculateDiff();
    }

    this.days = !this.days;
  }

}

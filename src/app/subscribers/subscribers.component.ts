import { Component } from '@angular/core';
import {SubscribersService} from "../services/subscribers.service";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {
   subscribers: any= [];

  constructor(private subService : SubscribersService) {
    subService.loadData().subscribe(value => {
      this.subscribers = value;
    })
  }

  onDelete(id: string) {
    this.subService.deleteData(id);
  }
}

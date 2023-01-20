import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { enviroment } from 'src/enviroments/enviroment';
import { Moment } from 'src/app/Moment';
import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = enviroment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private momentService:MomentService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
     
    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
  }
}

import { enviroment } from './../../../../enviroments/enviroment';
import { Moment } from './../../../Moment';
import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = enviroment.baseApiUrl;
  faSearch = faSearch;
  searchTerm: string = "";

  constructor(private momentService: MomentService) {}

  ngOnInit() {
    this.momentService.getMoments().subscribe((items) => {

      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {

    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    })

  }
}

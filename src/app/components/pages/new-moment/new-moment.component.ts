import { MomentService } from './../../../services/moment.service';
import { Moment } from './../../../Moment';
import { Component } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText= "Compartilhar!";

  constructor(private momentService: MomentService, private messagesService: MessagesService, private router: Router){}

  async createdHandler(moment: Moment) {
    const formData = new FormData();
    formData.append("title", moment.title);
    formData.append("description", moment.description);
    
    if(moment.image){
      formData.append("image", moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add("Momento criado com sucesso!")

    this.router.navigate(['/'])
  }
}

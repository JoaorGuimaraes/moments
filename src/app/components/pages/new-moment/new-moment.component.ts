import { Component } from '@angular/core';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {

  btnText= "Compartilhar!";

  createdHandler(event: any) {
    console.log("Deu bom")
  }
}

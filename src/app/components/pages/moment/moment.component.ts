import { Component } from '@angular/core';
import {
  FormControl, FormGroup, FormGroupDirective, Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/Comment';
import { Moment } from 'src/app/Moment';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { enviroment } from 'src/enviroments/enviroment';
import { MomentService } from './../../../services/moment.service';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = enviroment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add('Momento Excluído com sucesso!');

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data);
    });

    this.messagesService.add("Comentário adicionado");

    this.commentForm.reset();

    formDirective.reset();
  }
}

import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'new', component: NewMomentComponent},
  {path: 'moment/edit/:id', component: EditMomentComponent},
  {path: 'moment/:id', component: MomentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

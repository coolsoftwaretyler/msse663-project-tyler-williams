import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReplComponent } from './repl/repl.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programs/new', component: ReplComponent },
  { path: 'programs/:id', component: ReplComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

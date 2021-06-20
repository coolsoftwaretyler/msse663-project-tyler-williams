import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateProgramComponent } from './create-program/create-program.component'
import { EditProgramComponent } from './edit-program/edit-program.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programs/new', component: CreateProgramComponent },
  { path: 'programs/:id', component: EditProgramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

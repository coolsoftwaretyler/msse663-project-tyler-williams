import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ConsoleComponent } from './console/console.component';
import { ReplComponent } from './repl/repl.component';
import { HomeComponent } from './home/home.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { EditProgramComponent } from './edit-program/edit-program.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    ConsoleComponent,
    ReplComponent,
    HomeComponent,
    CreateProgramComponent,
    EditProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

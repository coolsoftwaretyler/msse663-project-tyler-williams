import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interpret, parse } from '../lisp';
import { Program } from '../models/program.model';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {
  @Output() newSourceEvent = new EventEmitter<string>();
  program: Program = {
    sourceCode: '',
  }

  public editorForm: FormGroup

  constructor(private formBuilder: FormBuilder, private programService: ProgramService) {
    this.editorForm = this.formBuilder.group({
      source: '',
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const input = this.editorForm.controls.source.value;
    const parsedInput = parse(input);
    const interpretedInput = interpret(parsedInput, undefined);
    this.newSourceEvent.emit(interpretedInput);

    const newProgram = {
      sourceCode: input,
    }

    this.programService.create(newProgram)
      .subscribe(
        response => {
          window.location.href = '/programs/' + response._id
        },
        error => {
          console.error(error);
        }
      )
  }
}

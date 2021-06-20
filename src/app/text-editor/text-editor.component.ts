import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() mode = '';
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

    if (this.mode === 'create') {
      this.createNewProgram(input);
    } else if (this.mode === 'edit') {
      this.editProgram(input);
    } else {
      console.error('Invalid mode provided to text editor: ' + this.mode)
    }
  }

  createNewProgram(input: String) {
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

  editProgram(input: String) {
    const newProgram = {
      sourceCode: input,
    }
    const programId = '60cf9d84dd29ba3a30235570';
    this.programService.update(programId, newProgram)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }
}

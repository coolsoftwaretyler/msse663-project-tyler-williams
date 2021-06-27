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
    if (this.mode === 'edit') {
      const currentUrlDelimited = window.location.href.split('/')
      const programId = currentUrlDelimited[currentUrlDelimited.length - 1]

      this.programService.get(programId)
      .subscribe(
        response => {
          // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
          this.editorForm.controls.source.setValue(response.sourceCode);
          this.evaluateProgram(response.sourceCode!);
        },
        error => {
          console.error(error);
        }
      )

    }
  }

  onSubmit(): void {
    const input = this.editorForm.controls.source.value;

    if (this.mode === 'create') {
      this.createNewProgram(input);
    } else if (this.mode === 'edit') {
      this.editProgram(input);
      this.evaluateProgram(input);
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
    const currentUrlDelimited = window.location.href.split('/')
    const programId = currentUrlDelimited[currentUrlDelimited.length - 1]
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

  evaluateProgram(input: String) {
    const parsedInput = parse(input);
    const interpretedInput = interpret(parsedInput, undefined);
    this.newSourceEvent.emit(interpretedInput);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { interpret, parse } from '../lisp';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  public editorForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.editorForm = this.formBuilder.group({
      source: '',
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const input = this.editorForm.controls.source.value;
    const parsedInput = parse(`"${input}"`);
    const interpretedInput = interpret(parsedInput, undefined);
    console.log(interpretedInput);
  }

}

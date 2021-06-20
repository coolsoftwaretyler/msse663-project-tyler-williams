import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repl',
  templateUrl: './repl.component.html',
  styleUrls: ['./repl.component.scss']
})
export class ReplComponent implements OnInit {
  @Input() mode = '';
  result = '';

  constructor() { }

  ngOnInit(): void {
  }

  updateResult(newResult: string) {
    this.result = newResult;
  }
}

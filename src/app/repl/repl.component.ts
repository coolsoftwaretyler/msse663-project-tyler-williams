import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repl',
  templateUrl: './repl.component.html',
  styleUrls: ['./repl.component.scss']
})
export class ReplComponent implements OnInit {
  result = '';

  constructor() { }

  ngOnInit(): void {
  }

  updateResult(newResult: string) {
    this.result = newResult;
  }
}

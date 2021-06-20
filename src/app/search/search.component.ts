import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      programId: '',
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const input = this.searchForm.controls.programId.value;

    console.log(input)

    window.location.href = `/programs/${input}`
  }

}

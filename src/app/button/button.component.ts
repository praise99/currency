import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class CustomButtonComponent implements OnInit {
  @Input() color!: string;
  @Input() text!: string;
  @Output() btnClicked = new EventEmitter();
  constructor(private _router: Router) {}

  ngOnInit() {}

  onClick() {
    this.btnClicked.emit();
  }
}

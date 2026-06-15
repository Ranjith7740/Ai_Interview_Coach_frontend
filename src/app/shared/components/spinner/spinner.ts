import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  message = input<string>('Loading...');
}

import { Component, signal } from '@angular/core';
import { SummaryEditorComponent } from './summary-editor.component';

@Component({
  selector: 'app-root',
  imports: [SummaryEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fintech-summary-app');
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary-editor',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, HttpClientModule],
  templateUrl: './summary-editor.component.html',
  styleUrls: ['./summary-editor.component.css']
})
export class SummaryEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  summaryForm: FormGroup;
  currentCallId = 'CALL-99812A';

  // Customize the Quill toolbar
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  };

  constructor(private fb: FormBuilder, private summaryService: SummaryService) {
    this.summaryForm = this.fb.group({
      richTextContent: [''] // Starts empty
    });
  }

  ngOnInit(): void {
    this.loadAiDraft();
  }

  loadAiDraft() {
    this.summaryService.getInitialAiDraft(this.currentCallId).subscribe(draft => {
      this.summaryForm.patchValue({ richTextContent: draft });
    });
  }

  // --- Smart Snippet Actions ---

  insertComplianceDisclaimer() {
    const quillInstance = this.editor.quillEditor;
    const range = quillInstance.getSelection(true);
    const disclaimer = `<br><br><em>[Compliance Note: Standard mini-miranda disclosure provided to customer at ${new Date().toLocaleTimeString()}.]</em><br>`;
    
    quillInstance.clipboard.dangerouslyPasteHTML(range.index, disclaimer);
  }

  insertMissingStipulations() {
     const quillInstance = this.editor.quillEditor;
     const range = quillInstance.getSelection(true);
     const stips = `
        <br><strong>Missing Stipulations Required:</strong>
        <ul>
          <li>Proof of Income (Recent Paystub)</li>
          <li>Updated Insurance Binder</li>
        </ul>
     `;
     quillInstance.clipboard.dangerouslyPasteHTML(range.index, stips);
  }

  saveToBackend() {
    const finalHtml = this.summaryForm.get('richTextContent')?.value;
    
    const payload = {
      callId: this.currentCallId,
      agentId: 'AGENT-45',
      htmlContent: finalHtml
    };

    this.summaryService.saveFinalSummary(payload).subscribe(() => {
      alert('Summary saved successfully to CRM!');
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface SummaryPayload {
  callId: string;
  agentId: string;
  htmlContent: string;
}

@Injectable({ providedIn: 'root' })
export class SummaryService {
  // Replace with your actual .NET API endpoint
  private apiUrl = 'https://localhost:5001/api/summaries'; 

  constructor(private http: HttpClient) {}

  // Mocking the AI generating an initial summary draft
  getInitialAiDraft(callId: string): Observable<string> {
    const mockDraft = `
      <p><strong>Customer intent:</strong> Refinance existing auto loan.</p>
      <p>Customer reported income of $85,000 and is looking to lower their APR. Mentioned 2024 Tesla Model Y.</p>
    `;
    return of(mockDraft);
  }

  saveFinalSummary(payload: SummaryPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
    // console.log('Saving to .NET Backend:', payload);
  }
}

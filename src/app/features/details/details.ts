import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from '../../services/interview.service';
import { InterviewDetail } from '../../models/history.model';
import { Spinner } from '../../shared/components/spinner/spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [Spinner, DatePipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly interviewService = inject(InterviewService);

  readonly detail = signal<InterviewDetail | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/history']);
      return;
    }
    this.loadDetail(id);
  }

  private loadDetail(id: string): void {
    this.loading.set(true);
    this.interviewService.getInterviewById(id).subscribe({
      next: (d) => {
        this.detail.set(d);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  get scoreColor(): string {
    const score = this.detail()?.score ?? 0;
    if (score >= 8) return 'excellent';
    if (score >= 6) return 'good';
    if (score >= 4) return 'average';
    return 'poor';
  }

  goBack(): void {
    this.router.navigate(['/history']);
  }
}

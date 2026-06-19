import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService } from '../../services/interview.service';
import { InterviewSummary } from '../../models/history.model';
import { Spinner } from '../../shared/components/spinner/spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [Spinner, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements OnInit {
  private readonly router = inject(Router);
  private readonly interviewService = inject(InterviewService);

  readonly interviews = signal<InterviewSummary[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');
  readonly filterSkill = signal<string>('');

  readonly filtered = computed(() => {
    const skill = this.filterSkill();
    return skill
      ? this.interviews().filter((i) => i.skill === skill)
      : this.interviews();
  });

  readonly uniqueSkills = computed(() => [
    ...new Set(this.interviews().map((i) => i.skill)),
  ]);

  ngOnInit(): void {
    this.loadInterviews();
  }

 private loadInterviews(): void {
  this.loading.set(true);
  this.interviewService.getInterviews().subscribe({
    next: (response: any) => {
      const interviewArray = response?.data?.content || [];
      
      const mappedInterviews: InterviewSummary[] = interviewArray.map((item: any) => ({
        id: item.id,
        skill: item.skill,
        score: item.score,
        createdAt: item.createdAt // Updated key name to match your interface
      }));

      this.interviews.set(mappedInterviews);
      this.loading.set(false);
    },
    error: (err: Error) => {
      this.error.set(err.message);
      this.loading.set(false);
    },
  });
}
  viewDetail(id: string): void {
    this.router.navigate(['/details', id]);
  }

  scoreClass(score: number): string {
    if (score >= 8) return 'badge--excellent';
    if (score >= 6) return 'badge--good';
    if (score >= 4) return 'badge--average';
    return 'badge--poor';
  }
}

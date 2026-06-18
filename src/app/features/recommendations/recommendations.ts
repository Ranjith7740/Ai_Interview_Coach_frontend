import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { StudyPlan, Recommendation, Priority, ResourceType } from '../../models/recommendation.model';
import { Spinner } from '../../shared/components/spinner/spinner';
import { DatePipe } from '@angular/common';

const RESOURCE_ICONS: Record<ResourceType, string> = {
  article:  '📄',
  video:    '🎥',
  practice: '💻',
  course:   '🎓',
};

@Component({
  selector: 'app-recommendations',
  imports: [Spinner, DatePipe],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css',
})
export class Recommendations implements OnInit {
  private readonly recommendationService = inject(RecommendationService);

  readonly plan = signal<StudyPlan | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');
  readonly activeFilter = signal<Priority | 'all'>('all');

  readonly filtered = computed<Recommendation[]>(() => {
    const recs = this.plan()?.recommendations ?? [];
    const f = this.activeFilter();
    return f === 'all' ? recs : recs.filter((r) => r.priority === f);
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.recommendationService.getStudyPlan().subscribe({
      next: (plan) => {
        this.plan.set(plan);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  resourceIcon(type: ResourceType): string {
    return RESOURCE_ICONS[type] ?? '🔗';
  }
}

import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { Recommendation, Priority } from '../../models/recommendation.model';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-recommendations',
  imports: [Spinner],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.css',
})
export class Recommendations implements OnInit {
  private readonly recommendationService = inject(RecommendationService);

  readonly recommendations = signal<Recommendation[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');
  readonly activeFilter = signal<Priority | 'all'>('all');

  readonly filtered = computed<Recommendation[]>(() => {
    const all = this.recommendations();
    const f = this.activeFilter();
    return f === 'all' ? all : all.filter((r) => r.priority === f);
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.recommendationService.getRecommendations().subscribe({
      next: (recs) => {
        this.recommendations.set(recs);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}

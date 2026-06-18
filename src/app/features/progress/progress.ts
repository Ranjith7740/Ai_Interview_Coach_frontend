import { Component, inject, signal, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProgressService } from '../../services/progress.service';
import { AnalysisService } from '../../services/analysis.service';
import { ProgressData, WeakArea } from '../../models/progress.model';
import { TrendPoint } from '../../models/dashboard.model';
import { ScoreChart } from '../../shared/components/score-chart/score-chart';
import { WeakAreaCard } from '../../shared/components/weak-area-card/weak-area-card';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-progress',
  imports: [ScoreChart, WeakAreaCard, Spinner],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress implements OnInit {
  private readonly progressService = inject(ProgressService);
  private readonly analysisService = inject(AnalysisService);

  readonly progress = signal<ProgressData | null>(null);
  readonly weakAreas = signal<WeakArea[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  readonly trend = signal<TrendPoint[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    forkJoin({
      progress: this.progressService.getProgress(),
      weakAreas: this.analysisService.getWeakAreas(),
    }).subscribe({
      next: ({ progress, weakAreas }) => {
        this.progress.set(progress);
        this.trend.set(progress.trend);
        this.weakAreas.set(weakAreas);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  get improvementText(): string {
    const v = this.progress()?.improvement ?? 0;
    return v > 0 ? `+${v}%` : `${v}%`;
  }

  get improvementClass(): string {
    const v = this.progress()?.improvement ?? 0;
    if (v > 0) return 'positive';
    if (v < 0) return 'negative';
    return 'neutral';
  }
}

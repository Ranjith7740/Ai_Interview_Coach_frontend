import { Component, inject, signal, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats, ScoreTrend } from '../../models/dashboard.model';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { ScoreChart } from '../../shared/components/score-chart/score-chart';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard, ScoreChart, Spinner],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly trend = signal<ScoreTrend>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      stats: this.dashboardService.getStats(),
      trend: this.dashboardService.getTrend(),
    }).subscribe({
      next: ({ stats, trend }) => {
        this.stats.set(stats);
        this.trend.set(trend);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  get avgScoreDisplay(): string {
    const avg = this.stats()?.averageScore;
    return avg !== undefined && avg !== null ? avg.toFixed(1) : '—';
  }
}

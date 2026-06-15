import { Component, inject, signal, OnInit } from '@angular/core';
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

    this.dashboardService.getStats().subscribe({
      next: (s) => this.stats.set(s),
      error: (err: Error) => this.error.set(err.message),
    });

    this.dashboardService.getTrend().subscribe({
      next: (t) => {
        this.trend.set(t);
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
    return avg !== undefined ? avg.toFixed(1) : '—';
  }
}

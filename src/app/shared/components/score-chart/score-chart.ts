import {
  Component,
  input,
  ElementRef,
  viewChild,
  effect,
  afterNextRender,
} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js';
import type { TrendPoint } from '../../../models/dashboard.model';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.html',
  styleUrl: './score-chart.css',
})
export class ScoreChart {
  data = input.required<TrendPoint[]>();

  private canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  constructor() {
    afterNextRender(() => {
      this.initChart();
    });

    effect(() => {
      const d = this.data();
      if (this.chart && d.length > 0) {
        this.updateChart(d);
      }
    });
  }

  private initChart(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d')!;
    const data = this.data();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((p) => p.date),
        datasets: [
          {
            label: 'Score',
            data: data.map((p) => p.score),
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.45,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#e2e8f0',
            bodyColor: '#94a3b8',
            padding: 12,
            borderColor: '#334155',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` Score: ${ctx.parsed.y}/10`,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2,
              color: '#94a3b8',
              font: { size: 12 },
            },
            grid: { color: '#f1f5f9' },
            border: { display: false },
          },
          x: {
            ticks: {
              color: '#94a3b8',
              font: { size: 12 },
              maxRotation: 0,
            },
            grid: { display: false },
            border: { display: false },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }

  private updateChart(data: TrendPoint[]): void {
    if (!this.chart) return;
    this.chart.data.labels = data.map((p) => p.date);
    this.chart.data.datasets[0].data = data.map((p) => p.score);
    this.chart.update('active');
  }
}

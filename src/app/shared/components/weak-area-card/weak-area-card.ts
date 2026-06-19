import { Component, input, computed } from '@angular/core';
import { WeakArea } from '../../../models/progress.model';

@Component({
  selector: 'app-weak-area-card',
  templateUrl: './weak-area-card.html',
  styleUrl: './weak-area-card.css',
})
export class WeakAreaCard {
  area = input.required<WeakArea>();

  readonly barWidth = computed(() =>
    Math.round((this.area().avgScore / 10) * 100)
  );

  readonly scoreClass = computed(() => {
    const s = this.area().avgScore;
    if (s >= 7) return 'good';
    if (s >= 5) return 'average';
    return 'poor';
  });
}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  color = input<'primary' | 'success' | 'warning' | 'error'>('primary');
  subtitle = input<string>('');
}

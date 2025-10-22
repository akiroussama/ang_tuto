import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';
import { HeavyWidgetComponent } from './heavy-widget.component';

@Component({
  selector: 'app-defer-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent, HeavyWidgetComponent],
  templateUrl: './defer-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferDemoComponent {
  codeSnippet = `
@defer (on viewport) {
  <app-heavy-widget></app-heavy-widget>
} @placeholder {
  <!-- Shown initially, before the defer condition is met -->
  <div class="placeholder">Waiting for widget to enter viewport...</div>
} @loading (minimum 1s) {
  <!-- Shown while the deferred content is loading -->
  <div class="loading">Loading heavy widget...</div>
} @error {
  <!-- Shown if the deferred content fails to load -->
  <div class="error">Failed to load widget.</div>
}
  `;
}

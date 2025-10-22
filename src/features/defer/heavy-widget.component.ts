import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-heavy-widget',
  standalone: true,
  template: `
    <div class="bg-gradient-to-r from-purple-400 to-indigo-500 text-white p-8 rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold">Heavy Widget Loaded!</h3>
      <p class="mt-2">This component was deferred and has now been lazily loaded and rendered.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyWidgetComponent {
  constructor() {
    // Simulate heavy computation or initialization
    const start = Date.now();
    while (Date.now() - start < 200) {
      // blocking main thread to simulate work
    }
    console.log('HeavyWidgetComponent initialized and rendered.');
  }
}

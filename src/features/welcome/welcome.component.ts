import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Angular v20+ Showcase</h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Welcome to the Angular showcase for features introduced from v17 to v20.
      </p>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Use the navigation on the left to explore each feature demonstration. This application simulates a native federation architecture with lazy-loaded remotes, all running in a zoneless environment.
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {}

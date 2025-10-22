import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseService } from '../../services/showcase.service';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showcaseInfo(); as info) {
      <div class="flex items-center space-x-6 text-sm">
        <div>
          <span class="font-semibold text-gray-700">Feature:</span>
          <span class="ml-2 text-gray-900">{{ info.name }}</span>
        </div>
        <div class="w-px h-5 bg-gray-200"></div>
        <div>
          <span class="font-semibold text-gray-700">Since:</span>
          <span class="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">v{{ info.version }}</span>
        </div>
        <div class="w-px h-5 bg-gray-200"></div>
        <div>
          <span class="font-semibold text-gray-700">Zoneless:</span>
          <span class="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">ON</span>
        </div>
         <div class="w-px h-5 bg-gray-200"></div>
        <div>
          <span class="font-semibold text-gray-700">Federation:</span>
          <span class="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Simulated</span>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudComponent {
  private showcaseService = inject(ShowcaseService);
  showcaseInfo = this.showcaseService.currentShowcase.asReadonly();
}

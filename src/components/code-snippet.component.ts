import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 rounded-lg overflow-hidden mt-4">
      <div class="p-4 text-sm font-mono text-gray-300 whitespace-pre-wrap">
        <code>{{ code() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent {
  code = input.required<string>();
}

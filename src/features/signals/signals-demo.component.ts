import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './signals-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsDemoComponent {
  count = signal(0);
  derivedCount = computed(() => this.count() * 2);
  logs = signal<string[]>([]);
  
  codeSnippet = `
  count = signal(0);
  derivedCount = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log(\`Count changed to: \${this.count()}\`);
    });
  }

  increment() { this.count.update(c => c + 1); }
  `;

  constructor() {
    effect(() => {
      const message = `effect() triggered: Count is now ${this.count()}`;
      console.log(message);
      this.logs.update(currentLogs => [...currentLogs, message]);
    });
    
    effect(() => {
        const message = `computed() recalculation check: Derived count is ${this.derivedCount()}`;
        console.log(message);
    }, {allowSignalWrites: true});
  }

  increment() {
    this.count.update(c => c + 1);
  }

  reset() {
    this.count.set(0);
    this.logs.set([]);
  }
}

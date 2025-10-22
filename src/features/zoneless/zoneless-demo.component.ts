import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

@Component({
  selector: 'app-zoneless-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './zoneless-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZonelessDemoComponent implements OnInit, OnDestroy {
  timer = signal(0);
  clickCount = signal(0);
  
  private intervalId?: number;
  private elementRef = inject(ElementRef);
  private nativeButton: HTMLButtonElement | null = null;
  
  private clickListener = () => {
    this.clickCount.update(c => c + 1);
  };
  
  codeSnippet = `
// This application is bootstrapped with:
provideZonelessChangeDetection();

// --- In the component ---
timer = signal(0);
clickCount = signal(0);

// Using a native API that Zone.js would normally patch
ngOnInit() {
  this.intervalId = setInterval(() => {
    this.timer.update(t => t + 1);
  }, 1000);

  const button = this.elementRef.nativeElement.querySelector('#nativeBtn');
  button.addEventListener('click', () => {
     this.clickCount.update(c => c + 1);
  });
}
  `;
  
  ngOnInit() {
    this.intervalId = window.setInterval(() => {
      this.timer.update(t => t + 1);
    }, 1000);
    
    // Using a native event listener that is not patched by Zone.js
    // We need to wait for the view to be rendered
    setTimeout(() => {
      this.nativeButton = this.elementRef.nativeElement.querySelector('#nativeBtn');
      if (this.nativeButton) {
        this.nativeButton.addEventListener('click', this.clickListener);
      }
    }, 0);
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.nativeButton) {
      this.nativeButton.removeEventListener('click', this.clickListener);
    }
  }
}

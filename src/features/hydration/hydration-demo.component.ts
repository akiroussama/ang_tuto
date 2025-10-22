import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

@Component({
  selector: 'app-hydration-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './hydration-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HydrationDemoComponent {
  codeSnippet = `
// In your app config (e.g., app.config.server.ts)
export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(
      // Enable incremental hydration for specific components
      withHydrationCallbacks({
        onHydrationStart(event) { console.log('Hydrating:', event.element.tagName); },
        onHydrationEnd(event) { console.log('Hydrated:', event.element.tagName); }
      }),
      // Other hydration features can be enabled here
    ),
  ],
};

// In a component that should be an island
@Component({
  ...
  host: {
    'ngSkipHydration': 'false' // or just omit this attribute
  }
})
export class InteractiveWidgetComponent {}
  `;
}

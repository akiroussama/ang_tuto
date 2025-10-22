import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HudComponent } from './components/hud/hud.component';
import { ShowcaseService } from './services/showcase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HudComponent],
  template: `
    <div class="flex h-screen w-full bg-gray-100 font-sans">
      <nav class="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h1 class="text-xl font-bold text-gray-800">Angular v20+</h1>
          <p class="text-sm text-gray-500">MFE Showcase</p>
        </div>
        <div class="flex-grow overflow-y-auto">
          <a *ngFor="let feature of features"
             [routerLink]="feature.path"
             routerLinkActive="bg-blue-50 text-blue-600 font-semibold"
             class="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-150">
            {{ feature.name }}
          </a>
        </div>
        <div class="p-4 border-t border-gray-200 text-xs text-gray-400">
          &copy; 2024 CNAF Demo
        </div>
      </nav>

      <main class="flex-1 flex flex-col overflow-hidden">
        <header class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <app-hud></app-hud>
        </header>
        <div class="flex-1 overflow-y-auto p-8 bg-gray-50">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private showcaseService = inject(ShowcaseService);

  features = [
    { name: 'Signals', path: '/signals' },
    { name: 'Built-in Control Flow', path: '/control-flow' },
    { name: 'Deferrable Views', path: '/defer' },
    { name: 'Zoneless', path: '/zoneless' },
    { name: '@let Declaration', path: '/let' },
    { name: 'API Signals', path: '/api-signals' },
    { name: 'Incremental Hydration', path: '/hydration' },
    { name: 'Signal-based Forms', path: '/forms' },
    { name: 'Native Federation', path: '/native-federation' },
  ];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    ).subscribe(data => {
      if (data && data['name'] && data['version']) {
        this.showcaseService.setCurrentShowcase({ name: data['name'], version: data['version'] });
      }
    });
  }
}
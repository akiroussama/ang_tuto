import { Injectable, signal } from '@angular/core';

export interface ShowcaseInfo {
  name: string;
  version: string;
}

@Injectable({ providedIn: 'root' })
export class ShowcaseService {
  readonly currentShowcase = signal<ShowcaseInfo>({ name: 'Welcome', version: '20.0.0' });

  setCurrentShowcase(info: ShowcaseInfo) {
    this.currentShowcase.set(info);
  }
}

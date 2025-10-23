import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

@Component({
  selector: 'app-native-federation-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './native-federation-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeFederationDemoComponent {
  manifestSnippet = `
// remotes/demo-signals/federation.manifest.json
{
  "name": "demo-signals",
  "version": "17.0.0",
  "exposes": {
    "./Feature": "./src/features/signals/signals-demo.component.ts"
  }
}`;

  hostRoutingSnippet = `
// host-shell/src/app.routes.ts
import { loadRemoteModule } from '@angular-architects/native-federation';

export const APP_ROUTES: Routes = [
  {
    path: 'signals',
    loadComponent: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'demo-signals',
        exposedModule: './Feature'
      })
  },
  // ... other routes
];`;

  sharedLibsSnippet = `
// federation.config.js (for a remote OR host)
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  // ...
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});`;
  
  sharedStateSnippet = `
// 1. Expose a service from a "common" remote
// remotes/common-state/federation.manifest.json
{
  "name": "common-state",
  "exposes": {
    "./StateService": "./src/state.service.ts"
  }
}

// 2. Load and provide it in the host
// host-shell/main.ts
const stateService = await loadRemoteModule('common-state', './StateService');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: StateService, useClass: stateService.StateService }
  ]
});`;
  
  dynamicFederationSnippet = `
async function loadMicroFrontend(userRole: string) {
  // 1. Fetch manifest URL from a backend
  const manifestUrl = await fetch(\`/api/manifest/\${userRole}\`).then(res => res.json());

  // 2. Add the manifest to the runtime configuration
  initFederation({ [userRole]: manifestUrl });

  // 3. Load the module
  return loadRemoteModule(userRole, './Feature');
}`;

  versionedDeploymentSnippet = `
// host-shell/src/environments/environment.prod.ts

// This configuration can be fetched from a remote server at startup.
export const remoteManifests = {
  'demo-signals': 'https://cdn.my-app.com/remotes/demo-signals/1.2.1/federation.manifest.json',
  'demo-forms': 'https://cdn.my-app.com/remotes/demo-forms/2.0.0/federation.manifest.json',
  // ... other remotes
};

// To roll back 'demo-signals' to version 1.2.0 due to a bug, you would update the URL:
// 'demo-signals': 'https://cdn.my-app.com/remotes/demo-signals/1.2.0/federation.manifest.json',

// Your host's federation initialization would then use this map.
initFederation(remoteManifests);
`;
}
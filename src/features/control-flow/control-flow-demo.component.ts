import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
}

@Component({
  selector: 'app-control-flow-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './control-flow-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFlowDemoComponent {
  users = signal<User[]>([
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
    { id: 3, name: 'Charlie', status: 'pending' },
  ]);
  showEmptyMessage = signal(false);
  
  codeSnippet = `
<!-- @for loop with tracking -->
@for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
} @empty {
  <p>No users found.</p>
}

<!-- @if/@else block -->
@if (users().length > 0) {
  <p>Showing {{ users().length }} users.</p>
} @else {
  <p>The user list is empty.</p>
}

<!-- @switch block -->
@switch (user.status) {
  @case ('active') { <span class="badge-green">Active</span> }
  @case ('inactive') { <span class="badge-red">Inactive</span> }
  @default { <span class="badge-yellow">Pending</span> }
}
  `;
  
  addUser() {
    const newUser: User = {
      id: Math.max(0, ...this.users().map(u => u.id)) + 1,
      name: `User #${this.users().length + 1}`,
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as User['status'],
    };
    this.users.update(current => [...current, newUser]);
  }

  removeUser(id: number) {
    this.users.update(current => current.filter(u => u.id !== id));
  }
}

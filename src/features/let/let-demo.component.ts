import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';

interface Product {
  name: string;
  basePrice: number;
  discount: number; // as a decimal, e.g., 0.1 for 10%
}

@Component({
  selector: 'app-let-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './let-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetDemoComponent {
  product = signal<Product>({ name: 'Super Widget', basePrice: 100, discount: 0.15 });
  logs = signal<string[]>([]);
  useLet = signal(true);

  codeSnippet = `
@let discountedPrice = calculateDiscountedPrice(product());

<!-- @let makes the template cleaner and more performant -->
<div>
  <p>Final Price: {{ discountedPrice }}</p>
  <p>You save: {{ product().basePrice - discountedPrice }}</p>
</div>
  `;

  calculateDiscountedPrice(prod: Product): number {
    const message = `calculateDiscountedPrice() called for ${prod.name}`;
    console.log(message);
    this.logs.update(l => [message, ...l].slice(0, 10)); // keep last 10 logs
    return prod.basePrice * (1 - prod.discount);
  }

  updatePrice() {
    this.product.update(p => ({ ...p, basePrice: p.basePrice + 10 }));
  }
}

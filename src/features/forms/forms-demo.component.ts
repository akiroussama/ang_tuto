import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent, ReactiveFormsModule],
  templateUrl: './forms-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsDemoComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  // In Angular v20+, form control properties like `valid` and `errors` are signals.
  isFormValid = this.registrationForm.valid;
  emailErrors = this.registrationForm.controls.email.errors;
  passwordErrors = this.registrationForm.controls.password.errors;

  submittedValue = signal<object | null>(null);

  codeSnippet = `
// Using standard ReactiveForms
registrationForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
});

// In Angular v20+, form controls expose their state as signals.
// No need for toSignal() or computed().
isFormValid = this.registrationForm.valid; // Signal<boolean>
emailErrors = this.registrationForm.controls.email.errors; // Signal<ValidationErrors | null>

// In the template, bind directly to these signals.
// <button [disabled]="!isFormValid()">Submit</button>
// @if (emailErrors(); as errors) { ... }
  `;

  onSubmit() {
    this.registrationForm.markAllAsTouched();
    if (this.isFormValid()) {
      console.log('Form Submitted:', this.registrationForm.value());
      this.submittedValue.set(this.registrationForm.value());
    } else {
      console.log('Form is invalid.');
      this.submittedValue.set(null);
    }
  }
}
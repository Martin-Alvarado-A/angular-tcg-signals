import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log(`🔎 | counter:`, this.counter()));
  }

  increment() {
    this.counter.set(this.counter() + 1);
    // mutate is deprecated since v17
    this.actions.mutate((oldActions) => oldActions.push('INCREMENT'));
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    // Better way to update a signal
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT']);
  }
}

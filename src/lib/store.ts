import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Expense } from './types';

export const username: Writable<string> = writable('');
export const expenses: Writable<Expense[]> = writable([]);
export const sumAmmounts: Writable<number> = writable(0);

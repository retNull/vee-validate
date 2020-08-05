import { ValidationFlags } from '../types';

export function createFlags(): ValidationFlags {
  return {
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: false,
    invalid: false,
    validated: false,
    pending: false,
    debouncing: false,
    required: false,
    changed: false,
    passed: false,
    failed: false
  };
}

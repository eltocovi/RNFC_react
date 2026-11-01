import type { Club } from '../types/Club';
import { obtenerJson } from './api';

const URL = '/api/clubes';

export function obtenerClubes(): Promise<Club[]> {
  return obtenerJson<Club[]>(URL);
}

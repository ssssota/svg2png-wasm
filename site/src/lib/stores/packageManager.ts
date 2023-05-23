import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const packageManagers = ['npm', 'yarn', 'pnpm'] as const;

export type PackageManager = (typeof packageManagers)[number];

const storeKey = 'packageManager';
const npmOrYarnOrPnpm = (pm: unknown): PackageManager =>
  pm === 'npm' || pm === 'yarn' || pm === 'pnpm' ? pm : 'npm';

export const packageManager = (() => {
  const { subscribe, set } = writable<PackageManager>(
    browser ? npmOrYarnOrPnpm(localStorage.getItem(storeKey)) : 'npm',
  );

  const setWithStorage = (pm: PackageManager) => {
    set(pm);
    localStorage.setItem(storeKey, pm);
  };

  return {
    subscribe,
    set: setWithStorage,
  };
})();

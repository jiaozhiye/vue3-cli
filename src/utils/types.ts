/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:26:46
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-12 21:25:11
 */
export type Nullable<T> = T | null;

export type Indexable<T> = {
  [key: string]: T;
};

export type AnyFunction<T> = (...args: any[]) => T;

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini';

export type Dictionary = {
  text: string;
  value: string | number;
  stoped?: boolean;
};

export type TabNavItem = {
  key: string;
  title: string;
};

export type RegionItem = {
  text: string;
  value: string | number;
  children?: Array<Dictionary>;
};

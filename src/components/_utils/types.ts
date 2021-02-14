import { App, VNodeChild } from 'vue';

export type VueNode = VNodeChild | JSX.Element;

export type SFCWithInstall<T> = T & { install(app: App): void };

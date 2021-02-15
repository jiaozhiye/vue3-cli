/*
 * @Author: 焦质晔
 * @Date: 2021-02-14 15:02:57
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-15 20:15:30
 */
import { App, VNode } from 'vue';

export type JSXNode = VNode | JSX.Element;

export type SFCWithInstall<T> = T & { install(app: App): void };

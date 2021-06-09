/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Contact } from "./Contact";

export type Message = {
  readonly id?: number;
  body?: string;
  date?: string;
  subject?: string;
  type?: string;
  contact?: Contact;
  read?: boolean;
};

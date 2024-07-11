export type INPUT_TYPES =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'phone'
  | 'date'
  | 'custom'
  | 'autocomplete'
  | 'selectComplete'
  | 'time';

export type SELECT_OPTIONS = Array<{
  label: string | any;
  value: string | number | any;
  image?: string | any;
  groupCode?: string | any;
  userName?: string | any;
  userImage?: string | any;
  type?: string | any;
}>;

export type FILE = {
  uri: string;
  type: string;
  name: string;
};

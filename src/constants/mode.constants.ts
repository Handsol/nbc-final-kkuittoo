export const LINKBUTTON_MODE = {
  NAV: 'nav',
  COMMON: 'common',
};

export const TITLE_MODE = {
  LOGO: 1,
  LINK: 2,
  SECTION_TITLE: 3,
  SECTION_SUBTITLE: 4,
};

export const USER_TITLE_MODE = {
  CARD_LEVEL: 1,
  CARD_NAME: 2,
  CARD_RANK: 3,
  CARD_ID: 4,
};

export const ICONBUTTON_MODE = {
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add',
} as const;

export const ACTIONBUTTON_MODE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FULL: 'full',
  PRIMARY_SMALL: 'primary-small',
  SECONDARY_SMALL: 'secondary-small',
} as const;

export const LINKBUTTON_MODE = {
  NAV: 'nav',
  RANK: 'rank',
  COMMON: 'common',
};

export const TITLE_MODE = {
  LOGO: 'logo',
  LINK: 'link',
  SECTION_TITLE: 'title',
  SECTION_SUBTITLE: 'subtitle',
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
  PRIMARY_SMALL: 'primary-small',
  SECONDARY_SMALL: 'secondary-small',
  PRIMARY_BORDER: 'primary-border',
  ROUNDED_MD: 'rounded-mb',
  LOGOUT: 'logout',
} as const;

export const MODAL_MODE = {
  COMMON: 'common',
  PARALLEL: 'parallel',
} as const;

export const SELECTBUTTON_MODE = {
  CATEGORY: 'category',
  DAY: 'day',
} as const;

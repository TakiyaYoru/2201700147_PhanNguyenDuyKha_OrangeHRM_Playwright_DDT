/**
 * Constants and locators for OrangeHRM application
 */

export const URLS = {
  BASE: 'https://opensource-demo.orangehrmlive.com',
  LOGIN: '/web/index.php/auth/login',
  DASHBOARD: '/web/index.php/dashboard/index',
  EMPLOYEES: '/web/index.php/pim/viewEmployeeList',
  RECRUITMENT: '/web/index.php/recruitment/viewCandidates',
};

export const LOCATORS = {
  LOGIN: {
    USERNAME_INPUT: 'input[name="username"]',
    PASSWORD_INPUT: 'input[name="password"]',
    LOGIN_BUTTON: 'button[type="submit"]',
    ERROR_MESSAGE: '.oxd-alert-content',
  },
  SEARCH: {
    SEARCH_INPUT: 'input[placeholder="Type for hints..."]',
    SEARCH_BUTTON: 'button:has-text("Search")',
    RESET_BUTTON: 'button:has-text("Reset")',
    NO_RECORDS_MESSAGE: 'text=No Records Found',
  },
  CANDIDATE: {
    ADD_BUTTON: 'button:has-text("Add")',
    SAVE_BUTTON: 'button:has-text("Save")',
    FIRST_NAME_INPUT: 'input[name="firstName"]',
    LAST_NAME_INPUT: 'input[name="lastName"]',
    EMAIL_INPUT: 'input[name="email"]',
    PHONE_INPUT: 'input[name="phone"]',
    ERROR_FIELD: '.oxd-input-field-error',
  },
  COMMON: {
    TOPBAR: '.oxd-topbar',
    TABLE_ROWS: 'table tbody tr',
    SUCCESS_MESSAGE: 'text=Success',
  },
};

export const TIMEOUTS = {
  SHORT: 2000,
  MEDIUM: 5000,
  LONG: 10000,
};

export const TEST_DATA = {
  VALID_ADMIN: {
    username: 'Admin',
    password: 'admin123',
  },
  INVALID_CREDENTIALS: 'Invalid credentials',
  REQUIRED_FIELD: 'Required',
};

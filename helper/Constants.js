

// User types
const ROLES = ["USER", "EMPLOYEE", "MANAGER", "ADMIN"];

// login types
const LOGIN_TYPES = ['LOGIN', 'LOGOUT'];

// attendance types
const ATTENDANCE_TYPES = ['PRESENT', 'ABSENT', 'LATE'];

// break types
const BREAK_TYPES = ['LUNCH', 'OTHER'];

// Category type
const CATEGORY_TYPE = ["BLOG", "PRODUCT", "SOFTWARE"];

// tasks status
const TASK_STATUS = ['NOT_STARTED', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'REOPENED', 'OVERDUE'];

// tasks status
const PROJECT_STATUS = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED', 'ON HOLD'];
employmentType
const EMPLOYEE_TYPES = ["USER", "EMPLOYEE", "MANAGER", "ADMIN"];
// Exporting all types together
module.exports = {
    ROLES, LOGIN_TYPES, ATTENDANCE_TYPES,
    BREAK_TYPES, CATEGORY_TYPE, TASK_STATUS, PROJECT_STATUS, EMPLOYEE_TYPES
};

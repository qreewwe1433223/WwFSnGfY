// 代码生成时间: 2025-09-23 01:02:28
class AccessControl {
  /**
   * Initializes the AccessControl system with a set of user roles and their permissions.
   *
   * @param {object} rolesPermissions - An object mapping roles to their permissions.
   */
  constructor(rolesPermissions) {
    this.rolesPermissions = rolesPermissions;
  }

  /**
   * Checks if a user has permission to perform a certain action.
   *
   * @param {string} role - The role of the user being checked.
   * @param {string} action - The action the user is trying to perform.
   * @return {boolean} - True if the user has permission, false otherwise.
   */
  hasPermission(role, action) {
    try {
      const permissions = this.rolesPermissions[role] || [];
      return permissions.includes(action);
    } catch (error) {
      console.error("Error checking permissions: ", error);
      return false;
    }
  }

  /**
   * Grants access to a resource based on the user's role and the action they're trying to perform.
   *
   * @param {string} role - The role of the user.
   * @param {string} action - The action the user is trying to perform.
   * @param {string} resource - The resource the user is trying to access.
   * @return {boolean} - True if access is granted, false otherwise.
   */
  grantAccess(role, action, resource) {
    if (this.hasPermission(role, action)) {
      console.log(`Access granted: ${role} can ${action} ${resource}`);
      return true;
    } else {
      console.log(`Access denied: ${role} cannot ${action} ${resource}`);
      return false;
    }
  }
}

// Example usage
const rolesPermissions = {
  'admin': ['view', 'edit', 'delete'],
  'user': ['view'],
  'guest': []
};

const accessControl = new AccessControl(rolesPermissions);

// Check if an admin can delete a resource
const canDelete = accessControl.grantAccess('admin', 'delete', 'file');
// Output: Access granted: admin can delete file

// Check if a user can delete a resource
const canDeleteAsUser = accessControl.grantAccess('user', 'delete', 'file');
// Output: Access denied: user cannot delete file

/**
 * ------------------------------------------------------------------------
 * Lalulla Access Control Configuration
 * ------------------------------------------------------------------------
 */

const accessConfig = {}

// -------------------------------------------------------------
// Define group that can be accessed by roles.
// -------------------------------------------------------------
accessConfig['cg-roles'] = {
  'super-group'      : ['Superadmin'],
  'admin-group'      : ['Superadmin', 'Admin'],
  'support-group'    : ['Superadmin', 'Admin', 'Support'],
  'business-group'   : ['Superadmin', 'Admin', 'Manager', 'User', 'Client'],
  'user-group'       : ['Superadmin', 'Admin', 'Support', 'Manager', 'Guest', 'Visitor'],
  'guest-group'      : ['Superadmin', 'Admin', 'Support', 'Manager', 'Guest', 'Visitor']
}

// -------------------------------------------------------------
// Define menu that can be access by a group
// -------------------------------------------------------------
accessConfig['menu-access'] = {

  // Dashboard Right controls
  'dashboard_access'      : ['admin-group','support-group','business-group','user-group'],
  'dashboard_manage'      : ['admin-group','support-group','business-group','user-group'],
  'dashboard_create'      : ['admin-group','support-group'],
  'dashboard_read'        : ['admin-group','support-group','business-group','user-group'],
  'dashboard_update'      : ['admin-group','support-group'],
  'dashboard_delete'      : ['admin-group','support-group'],
  'dashboard_report'      : ['admin-group','support-group'],
  
    // Template Right controls
  'template_access'      : ['admin-group','support-group','business-group','user-group'],
  'template_manage'      : ['admin-group','support-group','business-group','user-group'],
  'template_create'      : ['admin-group','support-group'],
  'template_read'        : ['admin-group','support-group','business-group','user-group'],
  'template_update'      : ['admin-group','support-group'],
  'template_delete'      : ['admin-group','support-group'],
  'template_report'      : ['admin-group','support-group'],

  // Top Menu controls
  'topmenu_manage'       : ['admin-group','support-group','business-group','user-group'],
  'topmenu_create'       : ['admin-group','support-group'],
  'topmenu_read'         : ['admin-group','support-group','business-group','user-group'],
  'topmenu_update'       : ['admin-group','support-group'],
  'topmenu_delete'       : ['admin-group','support-group'],

  // Lookup right controls
  'lookup_manage'        : ['admin-group','support-group','business-group','user-group'],
  'lookup_create'        : ['admin-group','support-group'],
  'lookup_read'          : ['admin-group','support-group','business-group','user-group'],
  'lookup_update'        : ['admin-group','support-group'],
  'lookup_delete'        : ['admin-group','support-group'],

  // User right controls
  'user_manage'          : ['super-group','admin-group'],
  'user_create'          : ['super-group','admin-group'],
  'user_read'            : ['super-group','admin-group'],
  'user_update'          : ['super-group','admin-group'],
  'user_delete'          : ['super-group','admin-group'],
  'user_report'          : ['super-group','admin-group'],
  
  // Map Marker right controls
  'mapmarker_manage'     : ['super-group','admin-group'],
  'mapmarker_create'     : ['super-group','admin-group'],
  'mapmarker_read'       : ['super-group','admin-group'],
  'mapmarker_update'     : ['super-group','admin-group'],
  'mapmarker_delete'     : ['super-group','admin-group'],
  'mapmarker_report'     : ['super-group','admin-group'],

  // Map Boundaries right controls
  'mapboundaries_manage' : ['super-group','admin-group'],
  'mapboundaries_create' : ['super-group','admin-group'],
  'mapboundaries_read'   : ['super-group','admin-group'],
  'mapboundaries_update' : ['super-group','admin-group'],
  'mapboundaries_delete' : ['super-group','admin-group'],
  'mapboundaries_report' : ['super-group','admin-group'],

  // Calendar right controls
  'calendar_manage'      : ['super-group','admin-group'],
  'calendar_create'      : ['super-group','admin-group'],
  'calendar_read'        : ['super-group','admin-group'],
  'calendar_update'      : ['super-group','admin-group'],
  'calendar_delete'      : ['super-group','admin-group'],
  'calendar_report'      : ['super-group','admin-group'],

  // Setting right controls
  'setting_manage'       : ['super-group','admin-group'],
  'setting_create'       : ['super-group','admin-group'],
  'setting_read'         : ['super-group','admin-group'],
  'setting_update'       : ['super-group','admin-group'],
  'setting_delete'       : ['super-group','admin-group'],
  'setting_report'       : ['super-group','admin-group'],

  // Superadmin right controls
  'superadmin_manage'    : ['super-group'],
  'superadmin_create'    : ['super-group'],
  'superadmin_read'      : ['super-group'],
  'superadmin_update'    : ['super-group'],
  'superadmin_delete'    : ['super-group'],
  'superadmin_report'    : ['super-group'],

  'settings_manage'      : ['super-group','admin-group','support-group'],

  'support_dashboard'    : ['super-group','support-group'],
  'page_test'            : ['super-group','admin-group','support-group','business-group','user-group'],
}

module.exports = accessConfig
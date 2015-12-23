/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
      view: 'login-signin'
  }, 

  '/login': {
      controller: 'UserController',
      action: 'login'
  },

  '/logout': {
      controller: 'UserController',
      action: 'logout'
  },

  'post /user/create': {
      controller: 'UserController',
      action: 'create'
  },

  '/organizer': {
      controller: 'OrganizerController',
      action: 'index'
  },

  'post /event/create': {
      controller: 'EventController',
      action: 'create'
  },  

  'post /event/update': {
      controller: 'EventController',
      action: 'update'
  },

  'get /event/destroy/:id': {
      controller: 'EventController',
      action: 'destroy'
  },

  'post /event/tableEdit': {
      controller: 'EventController',
      action: 'tableEdit'
  },

  '/type-alert/create': {
      controller: 'TypeAlertController',
      action: 'create'
  },

  '/citizen': {
      controller: 'CitizenController',
      action: 'index'
  },

  'post /alert/create': {
      controller: 'AlertController',
      action: 'create'
  },

  'get /alert/destroy/:id': {
      controller: 'AlertController',
      action: 'destroy'
  },  

  'post /alert/tableEdit': {
      controller: 'AlertController',
      action: 'tableEdit'
  },

  '/scout/create': {
      controller: 'ScoutController',
      action: 'create'
  },  

  '/scout/destroy': {
      controller: 'ScoutController',
      action: 'destroy'
  },

  'post /notification/create': {
      controller: 'NotificationController',
      action: 'create'
  },

  'post /notification/updateState': {
      controller: 'NotificationController',
      action: 'updateState'
  },

  '/admin': {
      controller: 'AdminController',
      action: 'index'
  },

  '/admin/notifications': {
      controller: 'AdminController',
      action: 'notifications'
  },

  '/admin/my-notifications': {
      controller: 'AdminController',
      action: 'myNotifications'
  },  

  '/admin/events': {
      controller: 'AdminController',
      action: 'events'
  },  

  '/admin/alerts': {
      controller: 'AdminController',
      action: 'alerts'
  },  

  '/admin/users/right': {
      controller: 'AdminController',
      action: 'usersRight'
  },

  '/admin/export/data': {
      controller: 'AdminController',
      action: 'exportData'
  },

  '/user/update': {
      controller: 'UserController',
      action: 'update'
  },

  '/statistic/events': {
      controller: 'StatisticController',
      action: 'events'
  },

  '/statistic/alerts': {
      controller: 'StatisticController',
      action: 'alerts'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

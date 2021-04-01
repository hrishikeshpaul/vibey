/**
 * Copyright statement
 */
const copyright = `/* Copyright (C) 2021 Vibey - All Rights Reserved */`;

/**
 * Basic route file
 * Imports the app by default and exports it
 */
const route = 
`${copyright}
'use strict';
const { app } = require('../lib/app');

/**
  * Generated by Vibey-CLI
  * Write your code here
  * Happy coding! :)
  */

module.exports = app;
`
/**
 * Basic middleware file
 * Has a basic function
 */
const middleware = 
`${copyright}
'use strict';

const functionName = (req, res, next) => {
  /**
   * Generated by Vibey-CLI
   * Write your code here
   * Happy coding! :)
   */
}

module.exports = {
  functionName
};
`
/**
 * Basic JS file.
 * Used by static and lib files
 */
const static = 
`${copyright}
'use strict';

/**
  * Generated by Vibey-CLI
  * Write your code here
  * Happy coding! :)
  */

module.exports = {

};
`

module.exports = {
  route,
  middleware,
  static
}
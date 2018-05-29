"use strict";

/**
 * 
 * WAW library
 * 
 * @namespace waw
 * 
 */


/**
 * 
 * Mainsite library
 * 
 * @namespace waw.mainsite
 * @memberof waw
 * 
 * 
 */



/**
 * import config library
 * @ignore
 */
import * as _config_mod from "./config/config.js";


//import rss_mod from "rss/rss.js";

/**
 * import rss library
 * @ignore
 */
import * as _rss_mod from "./rss/rss.js";



/**
 * import rss library
 * @ignore
 */
import * as _ui_mod from "./ui/ui.js";

const _version = '0.0.1a';

const waw = {};
waw.mainsite = {
    
    '_version': _version,
    
    'config': _config_mod,
    'rss': _rss_mod,
    'ui': _ui_mod
};





//let _lib = {
//      "st": st
//  };

// module.exports = waw.mainsite;

export {
  _version,
  _config_mod as config,
  _rss_mod as rss,
  _ui_mod as ui
};





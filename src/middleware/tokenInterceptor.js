"use strict"

import QB from 'quickblox';
import config from '../config.json';

//@ts-check

export default (req, res, next) => {
    // Initialize Quickblox
    
    if (req.get("Authorization")) {
        console.log("Token exist: " + req.get("Authorization"))
        QB.init(req.get("Authorization"), config.quickblox.appId)
   } else {
       console.log("Token is not present")
       QB.init(config.quickblox.appId, config.quickblox.authorizationKey, config.quickblox.authorizationSecret);
   }
   next()
}
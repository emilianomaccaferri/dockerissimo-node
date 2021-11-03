'use strict'
import * as dotenv from "dotenv";
import Router from "./lib/Router";
import db from "./lib/db";

db.init();
dotenv.config();

(async() => {

    try{

        console.log(process.env.NODE_ENV);

        const router = Router.create();
        await router.init();

        console.log(`app started`);

    }catch(err){

        console.error(err);
        process.exit(1);

    }
    
})();
import express from 'express';
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const cookiep = require('cookie-parser');
const body = require("body-parser");
const cors = require("cors");
import HTTPError from './HTTPError'

export default class Router{

    #app: express.Application;
    constructor(){
        
        this.#app = express();

    }

    init(): void{

        this.#app.use(helmet());
        /*this.#app.use(cors({
            credentials: true,
            withCredentials: true,
            origin: [''],
            allowedHeaders: ['Authorization', 'authorization', 'Content-type', 'content-type'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        }))*/
        this.#app.use(fileUpload({createParentPath: true, abortOnLimit: '20m', useTempFiles: true, tempFileDir: './tmp'}));
        this.#app.enable("trust proxy");
        this.#app.disable("x-powered-by");
        this.#app.use(cookiep());
        this.#app.use(body.json({ limit: "20mb" }));
        this.#app.use(
            body.urlencoded({ limit: "20mb", extended: true, parameterLimit: 100 }),
        );

        this.#app.use('/public', express.static('./public'));
        this.#app.use('/', require("./routes/main")); // possiamo fare sta cosa del require perché tanto quando viene chiamato il file è già in .js
        
        this.#app.listen(process.env.PORT);

        this.#app.all('*', (req: express.Request, res: express.Response) => {

            return HTTPError.NOT_FOUND.toResponse(res);
            
        })

        console.log(`listening on ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);
    }

}

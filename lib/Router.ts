import Koa, { Context, Next } from 'koa';
import helmet from 'koa-helmet';
import kstatic from 'koa-static';
import mount from 'koa-mount';
import cors from '@koa/cors';
import kbody from 'koa-body';

// routes
import main from './routes/main';

export default class Router{

    private app: Koa;
    private static initialized: boolean = false;

    private constructor(){
        
        this.app = new Koa();
        this.app.proxy = true;

    }

    static create(){

        if(Router.initialized) throw new Error('router is already initialized!');
        return new Router();

    }

    async init(): Promise<void>{
        
        if(Router.initialized) return;

        this.app.use(helmet());
        this.app.use(cors({
            credentials: true,
            withCredentials: true,
            origin: ['https://my-origin.com'],
            allowedHeaders: ['Authorization', 'authorization', 'Content-type', 'content-type'],
            methods: ['GET', 'POST', 'DELETE', 'PUT']
        }));
        
        this.app.use(kbody({
            urlencoded: true,
            multipart: true
        }));
        this.app.use(async(ctx: Context, next: Next) => {

            await next();
            if(ctx.status === 404)
                ctx.body = {
                    success: false,
                    message: 'not found'
                }

        })
        this.app.use(kstatic('/public'));
        this.app.use(mount('/', main.routes()));

        this.app.listen(process.env.PORT);

        console.log(`listening on port ${process.env.PORT}`);
        console.log(`live on ${process.env.URI}`);        
        
        Router.initialized = true;
            

    }
    
}
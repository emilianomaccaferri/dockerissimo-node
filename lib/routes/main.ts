import Router from '@koa/router';
import { Context } from 'koa';
const router = new Router();

router.get('/', async (ctx: Context) => {
  
    return ctx.body = {
        success: true,
        message: 'hello from /'
    }
    
})

export default router;
import * as Koa from 'koa';
import leds  from './routes/led';
import * as HttpStatus from 'http-status-codes';
import * as parser from 'koa-bodyparser';

const PORT: number = Number(process.env.PORT) || 8001;
const app: Koa = new Koa();

app.use(parser());
app.use(leds.routes());
app.use(leds.allowedMethods());

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use( async (ctx: Koa.Context) => {
    ctx.body = 'hello';
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
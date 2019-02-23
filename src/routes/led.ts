import * as Koa from 'koa';
import * as Router from 'koa-router';

enum LedState {
  off,
  on,
}

enum LedPosition {
  one = 2,
  two = 3,
}

interface ITesselLed {
  state: LedState;
  led: LedPosition; // index of tessel led to configure state
};

interface ITesselRequest {
  leds: ITesselLed[];
}

const routeOpts: Router.IRouterOptions = {
  prefix: '/led',
};

const router: Router = new Router(routeOpts);

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'Hello Tessel Led!';
});

router.put('/', async (ctx: Koa.Context) => {
  const { leds } = ctx.request.body as ITesselRequest;
  console.log(`leds: ${leds}`);
});

export default router;
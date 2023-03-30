import { type Context } from "koa";

export const ctxParams = (ctx: Context) => new URL(`protocol://hostname${ctx.request.url}`).searchParams;

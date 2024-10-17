import { AppContext } from "../mod.ts";

/**
 * @title This name will appear on the admin
 */
const loader = (
  _props: unknown,
  _req: Request,
  ctx: AppContext,
) => {

  const flagCustom = ctx.flagDiscountThirdFor;
  const flagDiscountThirdFor = ctx.flagDiscountThirdFor

  return {
    flagCustom: flagCustom,
    flagDiscountThirdFor: flagDiscountThirdFor
  }
}



export default loader;

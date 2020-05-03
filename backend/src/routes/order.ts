import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { OrderController } from "../controllers/OrderController";

  const router = Router();

  router.get("/", [checkJwt], OrderController.all);

  router.get(
    "/:id",
    [checkJwt],
    OrderController.one
  );

  router.post("/", [checkJwt], OrderController.save);

  router.delete(
    "/:id",
    [checkJwt],
    OrderController.remove
  );

  export default router;
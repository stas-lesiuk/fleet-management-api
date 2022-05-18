import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import RobotsController from "./controllers/robots.controller";
import RobotsMiddleware from "./middleware/robots.middleware";

export class RobotsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RobotsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/robots`)
      .get(RobotsController.listRobots)
      .post(
        RobotsMiddleware.validateRequiredRobotBodyFields,
        RobotsMiddleware.validateSameIpDoesntExist,
        RobotsController.createRobot
      );

    this.app.param(`robotId`, RobotsMiddleware.extractRobotId);
    this.app
      .route(`/robots/:robotId`)
      .all(RobotsMiddleware.validateRobotExists)
      .get(RobotsController.getRobotById)
      .delete(RobotsController.removeRobot);

    this.app.put(`/robots/:robotId`, [
      RobotsMiddleware.validateRequiredRobotBodyFields,
      RobotsMiddleware.validateSameIpBelongToSameRobot,
      RobotsController.put,
    ]);

    this.app.patch(`/robots/:robotId`, [
      RobotsMiddleware.validatePatchIP,
      RobotsController.patch,
    ]);

    return this.app;
  }
}

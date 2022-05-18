import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";

export class RobotsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RobotsRoutes");
  }

  configureRoutes() {

    this.app.route(`/robots`)
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`List of robots`);
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send(`Post to robots`);
        });

    this.app.route(`/robots/:robotId`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /robots/:robotId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`GET requested for id ${req.params.robotId}`);
        })
        .put((req: express.Request, res: express.Response) => {
            res.status(200).send(`PUT requested for id ${req.params.robotId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
            res.status(200).send(`PATCH requested for id ${req.params.robotId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
            res.status(200).send(`DELETE requested for id ${req.params.robotId}`);
        });

    return this.app;
}
}

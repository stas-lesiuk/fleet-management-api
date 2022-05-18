import express from "express";
import debug from "debug";

import robotService from "../services/robots.service";

const log: debug.IDebugger = debug("app:robots-middleware");
class RobotsMiddleware {
  async validateRequiredRobotBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.ip && req.body.status) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields ip and status`,
      });
    }
  }

  async validateSameIpDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const robot = await robotService.getRobotByIP(req.body.ip);
    if (robot) {
      res.status(400).send({ error: `Robot ip already exists` });
    } else {
      next();
    }
  }

  async validateSameIpBelongToSameRobot(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const robot = await robotService.getRobotByIP(req.body.ip);
    if (robot && robot.id === req.params.robotId) {
      next();
    } else {
      res.status(400).send({ error: `Invalid ip` });
    }
  }

  validatePatchIP = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.ip) {
      log("Validating ip", req.body.ip);

      this.validateSameIpBelongToSameRobot(req, res, next);
    } else {
      next();
    }
  };

  async validateRobotExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const robot = await robotService.readById(req.params.robotId);
    if (robot) {
      next();
    } else {
      res.status(404).send({
        error: `Robot ${req.params.robotId} not found`,
      });
    }
  }

  async extractRobotId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    req.body.id = req.params.robotId;
    next();
}
}

export default new RobotsMiddleware();

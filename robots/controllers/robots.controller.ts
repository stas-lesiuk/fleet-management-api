import express from 'express';
import argon2 from 'argon2';
import debug from 'debug';

import robotsService from '../services/robots.service';

const log: debug.IDebugger = debug('app:robots-controller');

class RobotsController {
    async listRobots(req: express.Request, res: express.Response) {
        const robots = await robotsService.list(100, 0);
        res.status(200).send(robots);
    }

    async getRobotById(req: express.Request, res: express.Response) {
        const robot = await robotsService.readById(req.body.id);
        res.status(200).send(robot);
    }

    async createRobot(req: express.Request, res: express.Response) {
        // req.body.password = await argon2.hash(req.body.password);
        const robotId = await robotsService.create(req.body);
        res.status(201).send({ id: robotId });
    }

    async patch(req: express.Request, res: express.Response) {
        // if (req.body.password) {
        //     req.body.password = await argon2.hash(req.body.password);
        // }
        log(await robotsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        // req.body.password = await argon2.hash(req.body.password);
        log(await robotsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeRobot(req: express.Request, res: express.Response) {
        log(await robotsService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new RobotsController();
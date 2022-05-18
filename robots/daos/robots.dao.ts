import { CreateRobotDto } from "../dto/create.robot.dto";
import { PatchRobotDto } from "../dto/patch.robot.dto";
import { PutRobotDto } from "../dto/put.robot.dto";

import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class RobotsDao {
  robots: Array<CreateRobotDto> = [];

  constructor() {
    log("Created new instance of RobotsDao");
  }

  async addRobot(robot: CreateRobotDto) {
    robot.id = shortid.generate();
    this.robots.push(robot);
    return robot.id;
  }

  async getRobots() {
    return this.robots;
  }

  async getRobotById(robotId: string) {
    return this.robots.find((robot: { id: string }) => robot.id === robotId);
  }

  async getRobotByIp(ip: string) {
    const objIndex = this.robots.findIndex((r: CreateRobotDto) => r.ip === ip);
    let currentUser = this.robots[objIndex];
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  async putRobotById(robotId: string, robot: PutRobotDto) {
    const objIndex = this.robots.findIndex(
      (obj: { id: string }) => obj.id === robotId
    );
    this.robots.splice(objIndex, 1, robot);
    return `${robot.id} updated via put`;
  }

  async patchRobotById(robotId: string, robot: PatchRobotDto) {
    const objIndex = this.robots.findIndex(
      (obj: { id: string }) => obj.id === robotId
    );
    let currentRobot = this.robots[objIndex];
    const allowedPatchFields = ["name", "ip", "status", "userId"];

    allowedPatchFields.forEach((field) => {
      if (field in robot) {
        // @ts-ignore
        currentRobot[field] = robot[field];
      }
    });

    this.robots.splice(objIndex, 1, currentRobot);
    return `${robot.id} patched`;
  }

  async removeRobotById(robotId: string) {
    const objIndex = this.robots.findIndex(
      (obj: { id: string }) => obj.id === robotId
    );
    this.robots.splice(objIndex, 1);
    return `${robotId} removed`;
  }
}

export default new RobotsDao();

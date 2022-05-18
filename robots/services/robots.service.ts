import RobotsDao from "../daos/robots.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateRobotDto } from "../dto/create.robot.dto";
import { PutRobotDto } from "../dto/put.robot.dto";
import { PatchRobotDto } from "../dto/patch.robot.dto";

class RobotsService implements CRUD {
  async create(resource: CreateRobotDto) {
    return RobotsDao.addRobot(resource);
  }

  async deleteById(id: string) {
    return RobotsDao.removeRobotById(id);
  }

  async list(limit: number, page: number) {
    return RobotsDao.getRobots();
  }

  async patchById(id: string, resource: PatchRobotDto) {
    return RobotsDao.patchRobotById(id, resource);
  }

  async readById(id: string) {
    return RobotsDao.getRobotById(id);
  }

  async putById(id: string, resource: PutRobotDto) {
    return RobotsDao.putRobotById(id, resource);
  }

  async getRobotByIP(ip: string) {
    return RobotsDao.getRobotByIp(ip);
  }
}

export default new RobotsService();

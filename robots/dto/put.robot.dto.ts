import { RobotStatus } from "../../common/enums/robot-status.enum";

export interface PutRobotDto {
  id: string;
  name: string;
  ip: string;
  status: RobotStatus;
  userId?: number;
}

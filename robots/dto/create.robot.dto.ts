import { RobotStatus } from "../../common/enums/robot-status.enum";

export interface CreateRobotDto {
  id: string;
  name: string;
  ip?: string;
  status: RobotStatus;
  userId?: number;
}

import {
  getDevicePerformance,
} from "./performance";

const level =
  getDevicePerformance();

export const performanceSettings = {
  level,

  particles:
    level === "low"
      ? 20
      : level === "medium"
      ? 45
      : 80,

  enableHeavy3D:
    level !== "low",

  shadowMap:
    level === "high",

  pixelRatio:
    level === "low"
      ? 1
      : level === "medium"
      ? 1.25
      : 1.5,
};
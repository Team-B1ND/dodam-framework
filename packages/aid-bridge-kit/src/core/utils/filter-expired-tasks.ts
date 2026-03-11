import { TTL } from "../constants/ttl";
import { Tasks } from "../types/app";

export const filterExpiredTasks = (tasks: Tasks) =>
  Object.fromEntries(
    Array.from(tasks.entries()).filter(
      ([_, task]) => Date.now() - task.req.timestamp <= TTL,
    ),
  );

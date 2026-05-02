import axios from "axios";

const VALID_STACKS = ["frontend", "backend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "api", "component", "hook", "page", "state", "style",
  "auth", "config", "middleware", "utils",
  "cache", "controller", "cron_job", "db", "domain",
  "handler", "repository", "route", "service"
];

const LOG_API_URL = "http://20.207.122.201/evaluation-service/logs";

export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
): Promise<void> {
  if (!VALID_STACKS.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const token = process.env.LOG_TOKEN || process.env.NEXT_PUBLIC_LOG_TOKEN;
  if (!token) {
    console.error("LOG_TOKEN is not set in environment");
    return;
  }

  try {
    await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to send log:", error?.message);
  }
}
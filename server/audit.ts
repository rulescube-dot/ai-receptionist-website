import { db } from "./db";
import { auditLogs } from "@shared/schema";

type AuditParams = {
  actorUserId: string;
  actorUsername: string;
  action: string;
  targetUserId?: string;
  targetUsername?: string;
  ipAddress?: string;
  userAgent?: string;
};

export async function writeAuditLog(params: AuditParams) {
  await db.insert(auditLogs).values({
    actorUserId: params.actorUserId,
    actorUsername: params.actorUsername,
    action: params.action,
    targetUserId: params.targetUserId,
    targetUsername: params.targetUsername,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
  });
}

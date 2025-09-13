import { urlTable } from "../model/index.js";
import { db } from "../db/index.js";
import { and, eq } from "drizzle-orm";

export const generateUrlShortCode = async (shortCode, targetUrl, userID) => {
  const [result] = await db
    .insert(urlTable)
    .values({
      shortCode: shortCode,
      target: targetUrl,
      userId: userID,
    })
    .returning({
      id: urlTable.id,
      shortCode: urlTable.shortCode,
      target: urlTable.target,
    });

  return result;
};

export const findTargetUrlByShortCode = async (shortCode) => {
  const [result] = await db
    .select({
      target: urlTable.target,
    })
    .from(urlTable)
    .where(eq(urlTable.shortCode, shortCode));

  return result;
};

export const getAllCodesById = async (userId) => {
  const codes = await db
    .select({
      id: urlTable.id,
      shortCode: urlTable.shortCode,
      targetURL: urlTable.target,
      createdAt: urlTable.createdAt,
      updatedAt: urlTable.updatedAT,
    })
    .from(urlTable)
    .where(eq(urlTable.userId, userId));

  return codes;
};

export const deleteCodeById = async (userId, urlId) => {
  await db
    .delete(urlTable)
    .where(and(eq(urlTable.id, urlId), eq(urlTable.userId, userId)));
};

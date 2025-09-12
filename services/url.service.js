import { urlTable } from "../model/index.js";
import { db } from "../db/index.js";

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

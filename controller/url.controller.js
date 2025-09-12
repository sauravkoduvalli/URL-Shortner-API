import { nanoid } from "nanoid";

import { shortenPostRequestBodySchema } from "../utils/validation/request.validation.js";
import { generateUrlShortCode } from "../services/url.service.js";

export const urlShortnerController = async (req, res) => {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error.message });

  const { url, code } = validationResult.data;

  const shortCode = code ?? nanoid(6);

  const result = await generateUrlShortCode(shortCode, url, req.user.id);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    target: result.target,
  });
};

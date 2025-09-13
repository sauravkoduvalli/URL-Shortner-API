import { nanoid } from "nanoid";

import { shortenPostRequestBodySchema } from "../utils/validation/request.validation.js";
import {
  generateUrlShortCode,
  findTargetUrlByShortCode,
  getAllCodesById,
  deleteCodeById,
} from "../services/url.service.js";

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

export const findUrlByShortCodeController = async (req, res) => {
  const code = req.params.shortCode;

  const result = await findTargetUrlByShortCode(code);

  if (!result) return res.status(404).json({ error: "Invalid URL" });

  return res.redirect(result.target);
};

export const getAllCodesController = async (req, res) => {
  const userId = req.user.id;
  const codes = await getAllCodesById(userId);
  return res.json(codes);
};

export const deleteCodeController = async (req, res) => {
  const userId = req.user.id;
  const urlId = req.params.id;

  try {
    // check whether the user has the URL ID that user is trying to delete
    const urlList = await getAllCodesById(userId);

    if (urlList.length !== 0) {
      const urlItem = urlList.find((e) => e.id === urlId);

      if (!urlItem || urlItem.id !== urlId) {
        return res.status(404).json({ error: "ID doest not exist" });
      } else {
        await deleteCodeById(userId, urlId);

        return res
          .status(200)
          .json({ status: "Successfully deleted the shortcode" });
      }
    } else {
      return res.status(404).json({ error: "ID doest not exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong. Try again!" });
  }
};

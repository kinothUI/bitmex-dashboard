const FALLBACK_LANGUAGE = "en";

/**
 * Extracts the first part from a language string
 * @param {String} locale
 */
export const extractLanguage = (locale: string) => {
  if (locale != null) return locale.split("-")[0];

  return FALLBACK_LANGUAGE;
};

export const getLocalizedValue = <T extends Record<string, any>>(
    obj: T,
    language: string,
    baseKey: string
): string => {
    const localizedKey = `${baseKey}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[localizedKey] || obj[`${baseKey}En`] || obj[baseKey] || "";
};

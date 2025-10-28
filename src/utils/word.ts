export const CASE_SPLIT_PATTERN =
  /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;

export function words(str: string): string[] {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}

export function kebabCase(str: string): string {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? [])
    .map((word) => word.toLowerCase())
    .join("-");
}

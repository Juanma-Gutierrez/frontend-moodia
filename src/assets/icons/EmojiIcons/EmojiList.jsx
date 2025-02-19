import { EmojiIcon1 } from "./EmojiIcon1";
import { EmojiIcon2 } from "./EmojiIcon2";
import { EmojiIcon3 } from "./EmojiIcon3";
import { EmojiIcon4 } from "./EmojiIcon4";
import { EmojiIcon5 } from "./EmojiIcon5";

/**
 * Array of emoji objects containing IDs and corresponding icon components.
 * Each object has an `id` (number) and an `icon` (function returning a JSX element).
 */
export const emojis = [
  { id: 1, icon: () => <EmojiIcon1 /> },
  { id: 2, icon: () => <EmojiIcon2 /> },
  { id: 3, icon: () => <EmojiIcon3 /> },
  { id: 4, icon: () => <EmojiIcon4 /> },
  { id: 5, icon: () => <EmojiIcon5 /> },
];

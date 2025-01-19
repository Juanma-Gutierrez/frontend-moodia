import { EmojiIcon1 } from "./EmojiIcon1";
import { EmojiIcon2 } from "./EmojiIcon2";
import { EmojiIcon3 } from "./EmojiIcon3";
import { EmojiIcon4 } from "./EmojiIcon4";
import { EmojiIcon5 } from "./EmojiIcon5";

export const emojis = [
  { id: 1, icon: () => <EmojiIcon1 /> },
  { id: 2, icon: () => <EmojiIcon2 /> },
  { id: 3, icon: () => <EmojiIcon3 /> },
  { id: 4, icon: () => <EmojiIcon4 /> },
  { id: 5, icon: () => <EmojiIcon5 /> },
];

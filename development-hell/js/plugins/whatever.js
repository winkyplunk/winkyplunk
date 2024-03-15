/*:
 * @target MZ
 * @plugindesc Replace cursor with image.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/155619/
 * @help Free to use and/or modify for any project, no credit required.
 */
void (() => {
  // image location
  const url = "./icon/cursor.png";
  // image anchor (px; default 0, 0)
  const x = 0;
  const y = 0;
  // system cursor style to use if image fails to load (required)
  const fallbackStyle = "pointer";
  document.body.style.cursor = `url("${url}") ${x} ${y}, ${fallbackStyle}`;
})();
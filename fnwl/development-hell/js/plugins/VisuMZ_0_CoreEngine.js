//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.76;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.76] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x54467d=_0x3325;(function(_0x5c5687,_0x5d3785){const _0x197b02=_0x3325,_0x2369de=_0x5c5687();while(!![]){try{const _0xc6a27e=parseInt(_0x197b02(0x436))/0x1*(parseInt(_0x197b02(0x2ea))/0x2)+-parseInt(_0x197b02(0x819))/0x3*(parseInt(_0x197b02(0x783))/0x4)+parseInt(_0x197b02(0x1e4))/0x5*(-parseInt(_0x197b02(0x8bd))/0x6)+parseInt(_0x197b02(0x20f))/0x7+parseInt(_0x197b02(0x1ae))/0x8*(-parseInt(_0x197b02(0x604))/0x9)+parseInt(_0x197b02(0x15a))/0xa+-parseInt(_0x197b02(0x619))/0xb*(parseInt(_0x197b02(0x657))/0xc);if(_0xc6a27e===_0x5d3785)break;else _0x2369de['push'](_0x2369de['shift']());}catch(_0x2a5024){_0x2369de['push'](_0x2369de['shift']());}}}(_0x40b4,0x4ed97));var label=_0x54467d(0x98c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x54467d(0x8cf)](function(_0xa54bbe){const _0x31b3e5=_0x54467d;return _0xa54bbe[_0x31b3e5(0x345)]&&_0xa54bbe[_0x31b3e5(0x8d3)][_0x31b3e5(0x356)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x54467d(0x357)]||{},VisuMZ['ConvertParams']=function(_0xb7ce97,_0xf7bb01){const _0xc8a64b=_0x54467d;for(const _0x3c09c4 in _0xf7bb01){if(_0x3c09c4['match'](/(.*):(.*)/i)){const _0x5bb065=String(RegExp['$1']),_0x31a02b=String(RegExp['$2'])[_0xc8a64b(0x879)]()[_0xc8a64b(0x747)]();let _0x10dc6c,_0x5c0286,_0x4d4193;switch(_0x31a02b){case _0xc8a64b(0xc5):_0x10dc6c=_0xf7bb01[_0x3c09c4]!==''?Number(_0xf7bb01[_0x3c09c4]):0x0;break;case _0xc8a64b(0x607):_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON['parse'](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x3e871e=>Number(_0x3e871e));break;case'EVAL':_0x10dc6c=_0xf7bb01[_0x3c09c4]!==''?eval(_0xf7bb01[_0x3c09c4]):null;break;case'ARRAYEVAL':_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON['parse'](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x55b6e9=>eval(_0x55b6e9));break;case _0xc8a64b(0x75c):_0x10dc6c=_0xf7bb01[_0x3c09c4]!==''?JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4]):'';break;case _0xc8a64b(0x4f1):_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x727f3=>JSON[_0xc8a64b(0x916)](_0x727f3));break;case _0xc8a64b(0x2e7):_0x10dc6c=_0xf7bb01[_0x3c09c4]!==''?new Function(JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4])):new Function(_0xc8a64b(0x55c));break;case _0xc8a64b(0x8a5):_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON['parse'](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x115543=>new Function(JSON[_0xc8a64b(0x916)](_0x115543)));break;case _0xc8a64b(0x347):_0x10dc6c=_0xf7bb01[_0x3c09c4]!==''?String(_0xf7bb01[_0x3c09c4]):'';break;case _0xc8a64b(0x6da):_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x1d84e9=>String(_0x1d84e9));break;case _0xc8a64b(0xee):_0x4d4193=_0xf7bb01[_0x3c09c4]!==''?JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4]):{},_0xb7ce97[_0x5bb065]={},VisuMZ[_0xc8a64b(0x2e6)](_0xb7ce97[_0x5bb065],_0x4d4193);continue;case _0xc8a64b(0x4ae):_0x5c0286=_0xf7bb01[_0x3c09c4]!==''?JSON[_0xc8a64b(0x916)](_0xf7bb01[_0x3c09c4]):[],_0x10dc6c=_0x5c0286[_0xc8a64b(0x946)](_0x2d26fd=>VisuMZ['ConvertParams']({},JSON[_0xc8a64b(0x916)](_0x2d26fd)));break;default:continue;}_0xb7ce97[_0x5bb065]=_0x10dc6c;}}return _0xb7ce97;},VisuMZ[_0x54467d(0x98c)]['SceneManager_exit']=SceneManager[_0x54467d(0x800)],SceneManager[_0x54467d(0x800)]=function(){const _0x82c82a=_0x54467d;VisuMZ[_0x82c82a(0x98c)][_0x82c82a(0x97d)][_0x82c82a(0x52e)](this);if(Utils[_0x82c82a(0x26c)]>=_0x82c82a(0x2ae)){if(typeof nw===_0x82c82a(0x28e))nw['App']['quit']();}},(_0x227ced=>{const _0x311a12=_0x54467d,_0x5ba6ac=_0x227ced[_0x311a12(0x33a)];for(const _0x401bf5 of dependencies){if('GXxrt'==='pYUhE'){if(!this[_0x311a12(0x538)])return _0x56e19f;const _0x2553a6=this['_coreEasing'][_0x311a12(0x19c)],_0x4d8933=this[_0x311a12(0x538)][_0x311a12(0x5ba)],_0xf05935=this[_0x311a12(0x690)]((_0x4d8933-_0x2553a6)/_0x4d8933),_0x48df60=this[_0x311a12(0x690)]((_0x4d8933-_0x2553a6+0x1)/_0x4d8933),_0x458699=(_0x8e406b-_0x5ca5a4*_0xf05935)/(0x1-_0xf05935);return _0x458699+(_0x5f5a39-_0x458699)*_0x48df60;}else{if(!Imported[_0x401bf5]){alert(_0x311a12(0x1b9)[_0x311a12(0x875)](_0x5ba6ac,_0x401bf5)),SceneManager[_0x311a12(0x800)]();break;}}}const _0xc88c1c=_0x227ced[_0x311a12(0x8d3)];if(_0xc88c1c['match'](/\[Version[ ](.*?)\]/i)){if(_0x311a12(0x4d6)===_0x311a12(0x4d6)){const _0x424906=Number(RegExp['$1']);_0x424906!==VisuMZ[label]['version']&&(alert(_0x311a12(0x787)['format'](_0x5ba6ac,_0x424906)),SceneManager[_0x311a12(0x800)]());}else return _0x242b9c[_0x311a12(0x98c)][_0x311a12(0x357)]['UI'][_0x311a12(0x3b1)];}if(_0xc88c1c[_0x311a12(0x8b6)](/\[Tier[ ](\d+)\]/i)){const _0x50c8f8=Number(RegExp['$1']);_0x50c8f8<tier?(alert(_0x311a12(0x3fe)['format'](_0x5ba6ac,_0x50c8f8,tier)),SceneManager[_0x311a12(0x800)]()):_0x311a12(0x887)==='gcAWW'?(this['_anchor']=_0x2ffc61,this[_0x311a12(0x6fa)]=_0x3615e8['makeDeepCopy'](this[_0x311a12(0x8d6)])):tier=Math[_0x311a12(0x161)](_0x50c8f8,tier);}VisuMZ[_0x311a12(0x2e6)](VisuMZ[label]['Settings'],_0x227ced[_0x311a12(0x3d2)]);})(pluginData),((()=>{const _0xcaf256=_0x54467d;if(VisuMZ[_0xcaf256(0x98c)]['Settings'][_0xcaf256(0x355)][_0xcaf256(0x127)]??!![])for(const _0x26454c in $plugins){if('QFzQx'!=='QFzQx')this[_0xcaf256(0x51b)]&&(this['openness']-=this[_0xcaf256(0x592)](),this[_0xcaf256(0x7d5)]()&&(this[_0xcaf256(0x51b)]=![]));else{const _0x4bba53=$plugins[_0x26454c];_0x4bba53[_0xcaf256(0x33a)][_0xcaf256(0x8b6)](/(.*)\/(.*)/i)&&(_0x4bba53[_0xcaf256(0x33a)]=String(RegExp['$2'][_0xcaf256(0x747)]()));}}})()),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x218),_0x528cfd=>{const _0x2b2fa8=_0x54467d;if(!SceneManager[_0x2b2fa8(0x574)])return;if(!SceneManager['_scene']['_spriteset'])return;VisuMZ[_0x2b2fa8(0x2e6)](_0x528cfd,_0x528cfd);const _0x5c4b48=Math[_0x2b2fa8(0xe2)](_0x528cfd['pointX']),_0x5bed04=Math['round'](_0x528cfd['pointY']);$gameTemp[_0x2b2fa8(0x1a4)](_0x5c4b48,_0x5bed04,_0x528cfd[_0x2b2fa8(0x142)],_0x528cfd[_0x2b2fa8(0x8b2)],_0x528cfd[_0x2b2fa8(0x6d3)]);}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x9b2),_0x24cd04=>{const _0xae8789=_0x54467d;VisuMZ[_0xae8789(0x2e6)](_0x24cd04,_0x24cd04);const _0x272653=Math['round'](_0x24cd04[_0xae8789(0x4c5)])[_0xae8789(0x2ec)](0x0,0x64),_0x37ca7a=AudioManager['_currentBgm'];_0x37ca7a&&(_0x37ca7a[_0xae8789(0x4c5)]=_0x272653,_0x37ca7a['pos']=AudioManager[_0xae8789(0x70f)][_0xae8789(0x64d)](),AudioManager[_0xae8789(0x3f5)](_0x37ca7a),AudioManager['playBgm'](_0x37ca7a,_0x37ca7a[_0xae8789(0x585)]),AudioManager['_bgmBuffer'][_0xae8789(0x41b)](_0x37ca7a[_0xae8789(0x585)]));}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x5f7),_0xd40394=>{const _0x5b3e70=_0x54467d;VisuMZ[_0x5b3e70(0x2e6)](_0xd40394,_0xd40394);const _0x2fcd13=Math[_0x5b3e70(0xe2)](_0xd40394[_0x5b3e70(0x1b0)])[_0x5b3e70(0x2ec)](0x32,0x96),_0x3c6a39=AudioManager[_0x5b3e70(0x54c)];_0x3c6a39&&(_0x3c6a39[_0x5b3e70(0x1b0)]=_0x2fcd13,_0x3c6a39[_0x5b3e70(0x585)]=AudioManager[_0x5b3e70(0x70f)][_0x5b3e70(0x64d)](),AudioManager[_0x5b3e70(0x3f5)](_0x3c6a39),AudioManager[_0x5b3e70(0x1d2)](_0x3c6a39,_0x3c6a39[_0x5b3e70(0x585)]),AudioManager[_0x5b3e70(0x70f)]['_startPlaying'](_0x3c6a39[_0x5b3e70(0x585)]));}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x1bb),_0x2492f3=>{const _0x3743a0=_0x54467d;VisuMZ[_0x3743a0(0x2e6)](_0x2492f3,_0x2492f3);const _0x4f607a=Math[_0x3743a0(0xe2)](_0x2492f3['pan'])[_0x3743a0(0x2ec)](-0x64,0x64),_0x506ea6=AudioManager[_0x3743a0(0x54c)];_0x506ea6&&(_0x506ea6[_0x3743a0(0x3a5)]=_0x4f607a,_0x506ea6[_0x3743a0(0x585)]=AudioManager[_0x3743a0(0x70f)][_0x3743a0(0x64d)](),AudioManager[_0x3743a0(0x3f5)](_0x506ea6),AudioManager['playBgm'](_0x506ea6,_0x506ea6[_0x3743a0(0x585)]),AudioManager['_bgmBuffer'][_0x3743a0(0x41b)](_0x506ea6[_0x3743a0(0x585)]));}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x453),_0x27abd3=>{const _0x171192=_0x54467d;VisuMZ['ConvertParams'](_0x27abd3,_0x27abd3);const _0x2a0e27=Math[_0x171192(0xe2)](_0x27abd3[_0x171192(0x4c5)])['clamp'](0x0,0x64),_0x285f09=AudioManager[_0x171192(0x208)];if(_0x285f09){if('cbGDq'===_0x171192(0x171)){if(!this['_animation'])return![];const _0x3510fc=this[_0x171192(0x25a)]['name']||'';if(_0x3510fc[_0x171192(0x8b6)](/<MIRROR OFFSET X>/i))return!![];if(_0x3510fc[_0x171192(0x8b6)](/<NO MIRROR OFFSET X>/i))return![];return _0x3af372['CoreEngine'][_0x171192(0x357)][_0x171192(0x355)][_0x171192(0x2f7)];}else _0x285f09[_0x171192(0x4c5)]=_0x2a0e27,_0x285f09[_0x171192(0x585)]=AudioManager[_0x171192(0x4ad)][_0x171192(0x64d)](),AudioManager[_0x171192(0x3f5)](_0x285f09),AudioManager[_0x171192(0x1d2)](_0x285f09,_0x285f09[_0x171192(0x585)]),AudioManager[_0x171192(0x70f)]['_startPlaying'](_0x285f09['pos']);}}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x44b),_0x4f319e=>{const _0x1f920c=_0x54467d;VisuMZ['ConvertParams'](_0x4f319e,_0x4f319e);const _0x4709bb=Math[_0x1f920c(0xe2)](_0x4f319e[_0x1f920c(0x1b0)])['clamp'](0x32,0x96),_0x1ae25b=AudioManager[_0x1f920c(0x208)];_0x1ae25b&&(_0x1ae25b['pitch']=_0x4709bb,_0x1ae25b[_0x1f920c(0x585)]=AudioManager[_0x1f920c(0x4ad)]['seek'](),AudioManager[_0x1f920c(0x3f5)](_0x1ae25b),AudioManager[_0x1f920c(0x1d2)](_0x1ae25b,_0x1ae25b[_0x1f920c(0x585)]),AudioManager[_0x1f920c(0x70f)][_0x1f920c(0x41b)](_0x1ae25b[_0x1f920c(0x585)]));}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],'AudioChangeBgsPan',_0xded46b=>{const _0x5aceeb=_0x54467d;VisuMZ[_0x5aceeb(0x2e6)](_0xded46b,_0xded46b);const _0x56405f=Math['round'](_0xded46b[_0x5aceeb(0x3a5)])[_0x5aceeb(0x2ec)](-0x64,0x64),_0x56e956=AudioManager[_0x5aceeb(0x208)];_0x56e956&&(_0x56e956[_0x5aceeb(0x3a5)]=_0x56405f,_0x56e956[_0x5aceeb(0x585)]=AudioManager[_0x5aceeb(0x4ad)]['seek'](),AudioManager['updateBgmParameters'](_0x56e956),AudioManager[_0x5aceeb(0x1d2)](_0x56e956,_0x56e956[_0x5aceeb(0x585)]),AudioManager[_0x5aceeb(0x70f)][_0x5aceeb(0x41b)](_0x56e956[_0x5aceeb(0x585)]));}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x396),_0x4abb73=>{const _0x565d48=_0x54467d;if(!$gameTemp[_0x565d48(0x595)]())return;const _0x521beb=Input[_0x565d48(0x2ba)]();if(navigator['clipboard']){if('waufw'===_0x565d48(0x301)){if(!_0x47ae4d[_0x565d48(0x595)]())return;if(!_0x4fdc82['isNwjs']())return;_0x735f33[_0x565d48(0x574)]['_active']=![],_0x575e68[_0x565d48(0x98c)][_0x565d48(0x510)]();}else navigator[_0x565d48(0x12f)][_0x565d48(0x7a1)](_0x521beb);}}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],'ExportAllMapText',_0x161ec8=>{const _0x3c23ef=_0x54467d;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x3c23ef(0x76e)]())return;SceneManager[_0x3c23ef(0x574)][_0x3c23ef(0x81e)]=![],VisuMZ[_0x3c23ef(0x98c)]['ExportStrFromAllMaps']();}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x649),_0x127bee=>{const _0x4ad8ca=_0x54467d;if(!$gameTemp[_0x4ad8ca(0x595)]())return;if(!Utils[_0x4ad8ca(0x76e)]())return;SceneManager['_scene'][_0x4ad8ca(0x81e)]=![],VisuMZ[_0x4ad8ca(0x98c)][_0x4ad8ca(0x18b)]();}),PluginManager[_0x54467d(0x323)](pluginData['name'],_0x54467d(0x1ed),_0x3546f9=>{const _0x8a0edf=_0x54467d;if(!$gameTemp[_0x8a0edf(0x595)]())return;if(!Utils[_0x8a0edf(0x76e)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ['ConvertParams'](_0x3546f9,_0x3546f9);const _0x2e1bd3=_0x8a0edf(0x104)['format']($gameMap[_0x8a0edf(0x6b4)]()['padZero'](0x3)),_0x496fa8=VisuMZ[_0x8a0edf(0x98c)][_0x8a0edf(0x911)]($gameMap[_0x8a0edf(0x6b4)]());VisuMZ[_0x8a0edf(0x98c)][_0x8a0edf(0x8f5)](_0x496fa8,_0x2e1bd3,!![]);}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],'ExportCurTroopText',_0x1ca1b1=>{const _0x2b7ce8=_0x54467d;if(!$gameTemp[_0x2b7ce8(0x595)]())return;if(!Utils['isNwjs']())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x2b7ce8(0x2e6)](_0x1ca1b1,_0x1ca1b1);const _0x559a98='Troop%1'[_0x2b7ce8(0x875)]($gameTroop[_0x2b7ce8(0x8a9)][_0x2b7ce8(0x55a)](0x4)),_0x475d68=VisuMZ[_0x2b7ce8(0x98c)]['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ[_0x2b7ce8(0x98c)][_0x2b7ce8(0x8f5)](_0x475d68,_0x559a98,!![]);}),VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8f5)]=function(_0x2299f6,_0x30ed7f,_0x3193fb){const _0x51712e=_0x54467d,_0x46aac7=require('fs');let _0x55db50='Exported_Script_%1.txt'[_0x51712e(0x875)](_0x30ed7f||'0');_0x46aac7[_0x51712e(0x6ab)](_0x55db50,_0x2299f6,_0x4e2a42=>{const _0x4b5de1=_0x51712e;if(_0x4e2a42)throw err;else{if(_0x3193fb){if(_0x4b5de1(0x8c0)!=='txcJs')return _0x20f6a3['CoreEngine'][_0x4b5de1(0x357)]['QoL'][_0x4b5de1(0x4f2)];else alert(_0x4b5de1(0x92b)[_0x4b5de1(0x875)](_0x55db50));}}});},VisuMZ[_0x54467d(0x98c)]['ExportStrFromAllMaps']=function(){const _0x3bf0a7=_0x54467d,_0x4b5fd9=[];for(const _0x3944dd of $dataMapInfos){if('zliwm'!==_0x3bf0a7(0x941)){if(!_0x3944dd)continue;_0x4b5fd9[_0x3bf0a7(0x37e)](_0x3944dd['id']);}else this['bitmap'][_0x3bf0a7(0x52b)]();}const _0x59d6ef=_0x4b5fd9[_0x3bf0a7(0x959)]*0x64+Math[_0x3bf0a7(0x9b8)](0x64);alert(_0x3bf0a7(0x815)[_0x3bf0a7(0x875)](_0x59d6ef)),this[_0x3bf0a7(0x964)]=[],this[_0x3bf0a7(0x311)]=$dataMap;for(const _0x125c8b of _0x4b5fd9){if(_0x3bf0a7(0x417)!==_0x3bf0a7(0x417)){var _0x4aa7ce=_0x645b9e(_0xdaab46['$1']);try{_0x407d3c*=_0x4676d3(_0x4aa7ce);}catch(_0x5bda02){if(_0x3268ac['isPlaytest']())_0x2deded[_0x3bf0a7(0x56f)](_0x5bda02);}}else VisuMZ[_0x3bf0a7(0x98c)][_0x3bf0a7(0x3bf)](_0x125c8b);}setTimeout(VisuMZ[_0x3bf0a7(0x98c)]['exportAllMapStrings'][_0x3bf0a7(0x11b)](this),_0x59d6ef);},VisuMZ['CoreEngine']['loadMapData']=function(_0x5117fb){const _0x596061=_0x54467d,_0x1f5d0a=_0x596061(0x545)[_0x596061(0x875)](_0x5117fb[_0x596061(0x55a)](0x3)),_0x499aae=new XMLHttpRequest(),_0x979977='data/'+_0x1f5d0a;_0x499aae[_0x596061(0x5fe)](_0x596061(0x667),_0x979977),_0x499aae[_0x596061(0x991)](_0x596061(0x746)),_0x499aae[_0x596061(0x745)]=()=>this[_0x596061(0x1ec)](_0x499aae,_0x5117fb,_0x1f5d0a,_0x979977),_0x499aae[_0x596061(0x250)]=()=>DataManager[_0x596061(0x3cf)](_0x596061(0x72d),_0x1f5d0a,_0x979977),_0x499aae['send']();},VisuMZ[_0x54467d(0x98c)]['storeMapData']=function(_0x465195,_0x2d3724,_0x25c1d5,_0x21faf9){const _0xc5b18=_0x54467d;$dataMap=JSON['parse'](_0x465195[_0xc5b18(0x2d6)]),DataManager['onLoad']($dataMap),this['_storedMapText'][_0x2d3724]=VisuMZ['CoreEngine']['ExtractStrFromMap'](_0x2d3724),$dataMap=this['_currentMap'];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x336)]=function(){const _0x351160=_0x54467d,_0x103d75=_0x351160(0x529);this[_0x351160(0x964)][_0x351160(0x8d2)](undefined)['remove']('')[_0x351160(0x8d2)](null);const _0x2b20db=this[_0x351160(0x964)][_0x351160(0x79c)]('\x0a\x0a\x0a\x0a\x0a')[_0x351160(0x747)]();VisuMZ[_0x351160(0x98c)][_0x351160(0x8f5)](_0x2b20db,_0x103d75,!![]),SceneManager[_0x351160(0x574)][_0x351160(0x81e)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromMap']=function(_0x589898){const _0x5fd5e8=_0x54467d;if(!$dataMap)return'';let _0x3e06e8='█'['repeat'](0x46)+'\x0a\x0a',_0x38cdbd='═'['repeat'](0x46)+'\x0a\x0a',_0x26f7c3='';this[_0x5fd5e8(0x612)]=0x0;for(const _0x2cf965 of $dataMap[_0x5fd5e8(0x517)]){if(!_0x2cf965)continue;let _0x320d9f=_0x2cf965['id'],_0x28c9cd=_0x2cf965['name'],_0x3753ac=_0x2cf965[_0x5fd5e8(0x32b)];for(const _0x2b1242 of _0x3753ac){const _0x36e2cd=_0x3753ac[_0x5fd5e8(0x3aa)](_0x2b1242)+0x1;let _0x436c60=_0x38cdbd+_0x5fd5e8(0x55e),_0x4dbbc7=VisuMZ[_0x5fd5e8(0x98c)]['ExtractStrFromList'](_0x2b1242[_0x5fd5e8(0x2ef)]);if(_0x4dbbc7[_0x5fd5e8(0x959)]>0x0){if(_0x26f7c3[_0x5fd5e8(0x959)]>0x0)_0x26f7c3+=_0x38cdbd+_0x5fd5e8(0x15f);else{if(_0x5fd5e8(0x278)===_0x5fd5e8(0x2e0))this[_0x5fd5e8(0x58f)]();else{const _0x5f14f9=$dataMapInfos[_0x589898][_0x5fd5e8(0x33a)];_0x26f7c3+=_0x3e06e8+_0x5fd5e8(0x1af)[_0x5fd5e8(0x875)](_0x589898,_0x5f14f9||_0x5fd5e8(0x45c))+_0x3e06e8;}}_0x26f7c3+=_0x436c60[_0x5fd5e8(0x875)](_0x320d9f,_0x28c9cd,_0x36e2cd,_0x4dbbc7);}}}return _0x26f7c3[_0x5fd5e8(0x959)]>0x0&&(_0x26f7c3+=_0x38cdbd),_0x26f7c3;},VisuMZ['CoreEngine']['ExportStrFromAllTroops']=function(){const _0x360dfd=_0x54467d,_0x4a9601=$dataTroops[_0x360dfd(0x959)]*0xa+Math[_0x360dfd(0x9b8)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x4a9601));const _0x4772a5=[];for(const _0x418cfa of $dataTroops){if(_0x360dfd(0xec)===_0x360dfd(0xec)){if(!_0x418cfa)continue;const _0x1d9dfc=_0x418cfa['id'];_0x4772a5[_0x1d9dfc]=VisuMZ[_0x360dfd(0x98c)]['ExtractStrFromTroop'](_0x1d9dfc);}else this[_0x360dfd(0x605)]={},_0x18b8b1[_0x360dfd(0x98c)][_0x360dfd(0x377)][_0x360dfd(0x52e)](this);}setTimeout(VisuMZ[_0x360dfd(0x98c)]['exportAllTroopStrings'][_0x360dfd(0x11b)](this,_0x4772a5),_0x4a9601);},VisuMZ['CoreEngine'][_0x54467d(0x3b8)]=function(_0x323c6f){const _0x16a538=_0x54467d;if(!$dataTroops[_0x323c6f])return'';let _0x42b15c='█'[_0x16a538(0x3d6)](0x46)+'\x0a\x0a',_0x8dd505='═'[_0x16a538(0x3d6)](0x46)+'\x0a\x0a',_0x4c2e0e='';this[_0x16a538(0x612)]=0x0;const _0x434c44=$dataTroops[_0x323c6f];let _0x3bcb38=_0x434c44['pages'];for(const _0x359d84 of _0x3bcb38){const _0x33e8d1=_0x3bcb38['indexOf'](_0x359d84)+0x1;let _0x4fbec7=_0x8dd505+_0x16a538(0x177),_0x1bbcb3=VisuMZ[_0x16a538(0x98c)][_0x16a538(0x344)](_0x359d84[_0x16a538(0x2ef)]);if(_0x1bbcb3[_0x16a538(0x959)]>0x0){if(_0x16a538(0x249)!==_0x16a538(0x8a7))_0x4c2e0e[_0x16a538(0x959)]>0x0?_0x16a538(0x81b)===_0x16a538(0x76d)?this[_0x16a538(0x489)]=[]:_0x4c2e0e+=_0x8dd505+_0x16a538(0x15f):_0x4c2e0e+=_0x42b15c+_0x16a538(0x7f8)[_0x16a538(0x875)](_0x323c6f,_0x434c44[_0x16a538(0x33a)]||_0x16a538(0x45c))+_0x42b15c,_0x4c2e0e+=_0x4fbec7[_0x16a538(0x875)](_0x33e8d1,_0x1bbcb3);else{if(_0x3e463a[_0x16a538(0x595)]())_0x5ccafd[_0x16a538(0x56f)](_0x1ff229);}}}return _0x4c2e0e[_0x16a538(0x959)]>0x0&&(_0x4c2e0e+=_0x8dd505),_0x4c2e0e;},VisuMZ[_0x54467d(0x98c)]['exportAllTroopStrings']=function(_0x431884){const _0x579177=_0x54467d,_0x18eb17='AllTroops';_0x431884[_0x579177(0x8d2)](undefined)['remove']('')[_0x579177(0x8d2)](null);const _0x3ec2a5=_0x431884[_0x579177(0x79c)](_0x579177(0x15f))['trim']();VisuMZ['CoreEngine'][_0x579177(0x8f5)](_0x3ec2a5,_0x18eb17,!![]),SceneManager[_0x579177(0x574)][_0x579177(0x81e)]=!![];},VisuMZ[_0x54467d(0x98c)]['ExtractStrFromList']=function(_0x33fab1){const _0x3b4c7d=_0x54467d;let _0x5678b9='\x0a'+'─'[_0x3b4c7d(0x3d6)](0x46)+'\x0a',_0xefcad5='\x0a'+'┄'[_0x3b4c7d(0x3d6)](0x46)+'\x0a',_0x310c79='';for(const _0x46b13e of _0x33fab1){if(_0x3b4c7d(0x47e)==='xCIEi'){if(this['_CoreEngineSettings']===_0x4f875c)this[_0x3b4c7d(0x8f6)]();if(this[_0x3b4c7d(0x506)][_0x3b4c7d(0x956)]===_0x80a6bc)this[_0x3b4c7d(0x8f6)]();return this['_CoreEngineSettings'][_0x3b4c7d(0x956)];}else{if(!_0x46b13e)continue;if(_0x46b13e['code']===0x65)_0x310c79+=_0x5678b9+'\x0a',_0x310c79+=_0x3b4c7d(0x72e),_0x46b13e[_0x3b4c7d(0x3d2)][0x4]!==''&&_0x46b13e[_0x3b4c7d(0x3d2)][0x4]!==undefined&&(_0x310c79+=_0x3b4c7d(0x150)['format'](_0x46b13e[_0x3b4c7d(0x3d2)][0x4]));else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x191){if(_0x3b4c7d(0x6f7)!=='oesXF'){const _0x4deab2=_0x51e689[_0x1ab42a];_0x4deab2[_0x3b4c7d(0x33a)][_0x3b4c7d(0x8b6)](/(.*)\/(.*)/i)&&(_0x4deab2['name']=_0x1980a7(_0x429100['$2'][_0x3b4c7d(0x747)]()));}else _0x310c79+=_0x3b4c7d(0x99b)[_0x3b4c7d(0x875)](_0x46b13e[_0x3b4c7d(0x3d2)][0x0]);}else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x192){if(_0x3b4c7d(0x48a)!==_0x3b4c7d(0x48a)){const _0x4ab5dd=_0x40f670[_0x3b4c7d(0x1c6)];if(_0x4ab5dd===0x1&&this['subject']()[_0x3b4c7d(0x855)]()!==0x1)this['setAttack']();else _0x4ab5dd===0x2&&this['subject']()['guardSkillId']()!==0x2?this[_0x3b4c7d(0x9ba)]():this[_0x3b4c7d(0x729)](_0x4ab5dd);}else _0x310c79+=_0x5678b9,_0x310c79+='%1〘Choice\x20%2〙\x20%3%1'[_0x3b4c7d(0x875)](_0xefcad5,_0x46b13e[_0x3b4c7d(0x3d2)][0x0]+0x1,_0x46b13e[_0x3b4c7d(0x3d2)][0x1]);}else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x193){if(_0x3b4c7d(0x897)===_0x3b4c7d(0x897))_0x310c79+=_0x5678b9,_0x310c79+='%1〘Choice\x20Cancel〙%1'[_0x3b4c7d(0x875)](_0xefcad5);else{if(!this[_0x3b4c7d(0x55d)])return;if(!this[_0x3b4c7d(0x55d)][_0x3b4c7d(0x829)])return;this[_0x3b4c7d(0x55d)][_0x3b4c7d(0x8d8)]&&!this[_0x3b4c7d(0x779)][_0x3b4c7d(0x8d8)][_0x3b4c7d(0x3a4)]&&this['bitmap'][_0x3b4c7d(0x52b)]();}}else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x194)'iBkRi'!=='ZwSzT'?(_0x310c79+=_0x5678b9,_0x310c79+=_0x3b4c7d(0x84e)[_0x3b4c7d(0x875)](_0xefcad5)):_0x4a8f95+=_0x1ce41d+_0x3b4c7d(0x7f8)[_0x3b4c7d(0x875)](_0x10d9b4,_0x4989db[_0x3b4c7d(0x33a)]||_0x3b4c7d(0x45c))+_0x5bf957;else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x69)_0x310c79+=_0x5678b9+'\x0a',_0x310c79+=_0x3b4c7d(0x292);else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x6c)_0x310c79+=_0x5678b9+'\x0a',_0x310c79+=_0x3b4c7d(0x530)[_0x3b4c7d(0x875)](_0x46b13e[_0x3b4c7d(0x3d2)][0x0]);else{if(_0x46b13e['code']===0x198)_0x310c79+=_0x3b4c7d(0x99b)[_0x3b4c7d(0x875)](_0x46b13e['parameters'][0x0]);else{if(_0x46b13e[_0x3b4c7d(0x587)]===0x75){const _0x2b6a28=$dataCommonEvents[_0x46b13e[_0x3b4c7d(0x3d2)][0x0]];if(_0x2b6a28&&this[_0x3b4c7d(0x612)]<=0xa){this[_0x3b4c7d(0x612)]++;let _0x4e1137=VisuMZ[_0x3b4c7d(0x98c)]['ExtractStrFromList'](_0x2b6a28[_0x3b4c7d(0x2ef)]);_0x4e1137[_0x3b4c7d(0x959)]>0x0&&(_0x310c79+=_0x5678b9,_0x310c79+=_0xefcad5,_0x310c79+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'['format'](_0x2b6a28['id'],_0x2b6a28[_0x3b4c7d(0x33a)]),_0x310c79+=_0xefcad5,_0x310c79+=_0x4e1137,_0x310c79+=_0xefcad5,_0x310c79+=_0x3b4c7d(0x551)[_0x3b4c7d(0x875)](_0x2b6a28['id'],_0x2b6a28['name']),_0x310c79+=_0xefcad5),this[_0x3b4c7d(0x612)]--;}}}}}}}}}}}}return _0x310c79[_0x3b4c7d(0x959)]>0x0&&(_0x310c79+=_0x5678b9),_0x310c79;},PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x3c7),_0x54ca71=>{const _0x422f43=_0x54467d;VisuMZ[_0x422f43(0x2e6)](_0x54ca71,_0x54ca71);const _0x4b3494=_0x54ca71[_0x422f43(0x17c)];VisuMZ[_0x422f43(0x7e0)](_0x4b3494);}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],'GoldChange',_0x2ddf3a=>{const _0x2560ad=_0x54467d;VisuMZ['ConvertParams'](_0x2ddf3a,_0x2ddf3a);const _0x413fc9=_0x2ddf3a[_0x2560ad(0x57c)]||0x0;$gameParty[_0x2560ad(0x222)](_0x413fc9);}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x4f9),_0x13d37f=>{const _0x57f87c=_0x54467d;if(!SceneManager[_0x57f87c(0x425)]())return;VisuMZ[_0x57f87c(0x2e6)](_0x13d37f,_0x13d37f);const _0x33bb1d=_0x13d37f[_0x57f87c(0x5ec)];SceneManager[_0x57f87c(0x574)][_0x57f87c(0x1d1)](_0x33bb1d);}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x832),_0x12a58b=>{const _0x1f9e1c=_0x54467d;if(!$gameTemp[_0x1f9e1c(0x595)]())return;if(!Utils[_0x1f9e1c(0x76e)]())return;VisuMZ[_0x1f9e1c(0x2e6)](_0x12a58b,_0x12a58b);const _0x2a62bf=_0x12a58b[_0x1f9e1c(0x663)]||0x1;$gameTemp['_pictureCoordinatesMode']=_0x2a62bf;}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],'PictureEasingType',_0x4b8a11=>{const _0x3aadd4=_0x54467d;VisuMZ[_0x3aadd4(0x2e6)](_0x4b8a11,_0x4b8a11);const _0x108ecd=_0x4b8a11['pictureId']||0x1,_0x4fb8fd=_0x4b8a11[_0x3aadd4(0x495)]||'Linear',_0x2a874d=$gameScreen[_0x3aadd4(0x3c4)](_0x108ecd);_0x2a874d&&(_0x3aadd4(0x27d)!==_0x3aadd4(0x378)?_0x2a874d['setEasingType'](_0x4fb8fd):(_0x4bf337[_0x3aadd4(0x98c)]['Window_Base_createContents'][_0x3aadd4(0x52e)](this),this['createScrollBarSprites'](),this[_0x3aadd4(0x483)](!![]),this[_0x3aadd4(0x483)](![])));}),PluginManager[_0x54467d(0x323)](pluginData['name'],_0x54467d(0x3df),_0x1d183b=>{const _0x3e2187=_0x54467d;for(let _0x45c092=0x1;_0x45c092<=0x64;_0x45c092++){_0x3e2187(0x3d8)!==_0x3e2187(0x3d8)?this[_0x3e2187(0x945)]['y']=0x0:$gameScreen[_0x3e2187(0x2dd)](_0x45c092);}}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],'PictureEraseRange',_0x1699d1=>{const _0x2c1131=_0x54467d;VisuMZ[_0x2c1131(0x2e6)](_0x1699d1,_0x1699d1);const _0x3c9d73=Math[_0x2c1131(0x625)](_0x1699d1[_0x2c1131(0x67e)],_0x1699d1[_0x2c1131(0x156)]),_0x4f1f81=Math['max'](_0x1699d1[_0x2c1131(0x67e)],_0x1699d1[_0x2c1131(0x156)]);for(let _0x1466b8=_0x3c9d73;_0x1466b8<=_0x4f1f81;_0x1466b8++){_0x2c1131(0x9a1)!==_0x2c1131(0x252)?$gameScreen[_0x2c1131(0x2dd)](_0x1466b8):this['makeCoreEngineCommandList']();}}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x8bb),_0x2ccd5e=>{const _0x361dad=_0x54467d;VisuMZ['ConvertParams'](_0x2ccd5e,_0x2ccd5e);const _0x2b390b=Math[_0x361dad(0xe2)](_0x2ccd5e[_0x361dad(0x663)])[_0x361dad(0x2ec)](0x1,0x64),_0x19d08d=_0x2ccd5e[_0x361dad(0x357)],_0x2ef9ad=_0x19d08d['Origin'][_0x361dad(0x2ec)](0x0,0x1),_0x1e494c=Math['round'](_0x19d08d[_0x361dad(0x977)]||0x0),_0x43c879=Math[_0x361dad(0xe2)](_0x19d08d[_0x361dad(0x187)]||0x0),_0x28a095=Math['round'](_0x19d08d[_0x361dad(0x346)]||0x0),_0xfeacfa=Math[_0x361dad(0xe2)](_0x19d08d['ScaleY']||0x0),_0x2226a5=Math[_0x361dad(0xe2)](_0x19d08d[_0x361dad(0x46b)])[_0x361dad(0x2ec)](0x0,0xff),_0x740f08=_0x19d08d[_0x361dad(0x28a)],_0x4ae4f0=_0x361dad(0x3a3),_0x57ec86=_0x2ccd5e[_0x361dad(0x440)]?_0x361dad(0x440):'Pixelated',_0x3f7ebf=_0x4ae4f0[_0x361dad(0x875)](_0x2ccd5e['IconIndex'],_0x57ec86);$gameScreen[_0x361dad(0x908)](_0x2b390b,_0x3f7ebf,_0x2ef9ad,_0x1e494c,_0x43c879,_0x28a095,_0xfeacfa,_0x2226a5,_0x740f08);}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x54e),_0x2a2d96=>{const _0xdfc06f=_0x54467d;VisuMZ['ConvertParams'](_0x2a2d96,_0x2a2d96);const _0x2c01ff=_0x2a2d96['Type']||_0xdfc06f(0x381),_0x3f7936=_0x2a2d96[_0xdfc06f(0x876)][_0xdfc06f(0x2ec)](0x1,0x9),_0x3807cd=_0x2a2d96[_0xdfc06f(0x27e)][_0xdfc06f(0x2ec)](0x1,0x9),_0x51122c=_0x2a2d96['Duration']||0x1,_0x4e8ff5=_0x2a2d96[_0xdfc06f(0x893)];$gameScreen[_0xdfc06f(0x371)](_0x2c01ff),$gameScreen[_0xdfc06f(0x949)](_0x3f7936,_0x3807cd,_0x51122c);if(_0x4e8ff5){const _0x3dcd97=$gameTemp['getLastPluginCommandInterpreter']();if(_0x3dcd97)_0x3dcd97[_0xdfc06f(0x17b)](_0x51122c);}}),PluginManager['registerCommand'](pluginData['name'],_0x54467d(0x6c6),_0x2ae44c=>{const _0xf09849=_0x54467d;if($gameParty[_0xf09849(0xd4)]())return;VisuMZ[_0xf09849(0x2e6)](_0x2ae44c,_0x2ae44c);const _0x101211=_0x2ae44c['IDs'],_0x318b80=(_0x2ae44c['Chance']||0x0)/0x64;for(const _0x21243e of _0x101211){if(_0xf09849(0x762)!==_0xf09849(0x735)){const _0x25d6a4=Math[_0xf09849(0x381)]()<=_0x318b80;$gameSwitches[_0xf09849(0x53b)](_0x21243e,_0x25d6a4);}else{const _0x335d2d=this['itemLineRect'](_0x10a6c0),_0x2f3b46=_0x144317['CoreEngine']['Settings'][_0xf09849(0x1e2)][_0xf09849(0x5fd)][_0x1cad71],_0x4d2bae=_0x51f1e9[_0xf09849(0x80a)](_0x2f3b46),_0xbd42eb=this[_0xf09849(0x45e)]['paramValueByName'](_0x2f3b46,!![]);this[_0xf09849(0x6e4)](_0x335d2d['x'],_0x335d2d['y'],0xa0,_0x2f3b46,![]),this['resetTextColor'](),this[_0xf09849(0xeb)](_0xbd42eb,_0x335d2d['x']+0xa0,_0x335d2d['y'],0x3c,_0xf09849(0x49d));}}}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x3c2),_0x2814ac=>{const _0x4625fb=_0x54467d;if($gameParty[_0x4625fb(0xd4)]())return;VisuMZ[_0x4625fb(0x2e6)](_0x2814ac,_0x2814ac);const _0x32c544=Math[_0x4625fb(0x625)](_0x2814ac['StartID'],_0x2814ac[_0x4625fb(0x156)]),_0x2e292a=Math['max'](_0x2814ac[_0x4625fb(0x67e)],_0x2814ac['EndingID']),_0x30d643=(_0x2814ac[_0x4625fb(0x5dc)]||0x0)/0x64;for(let _0x1c170c=_0x32c544;_0x1c170c<=_0x2e292a;_0x1c170c++){if(_0x4625fb(0x1c3)===_0x4625fb(0x1c3)){const _0x2650cd=Math[_0x4625fb(0x381)]()<=_0x30d643;$gameSwitches[_0x4625fb(0x53b)](_0x1c170c,_0x2650cd);}else{const _0x736842=_0x1b4ecb[_0x1996e0];if(!_0x736842)return'';let _0x4b13a1='';_0x4b13a1+=_0x736842[_0x4625fb(0x33a)];for(const _0x39dfa5 of _0x736842[_0x4625fb(0x32b)]){for(const _0x1da597 of _0x39dfa5[_0x4625fb(0x2ef)]){[0x6c,0x198][_0x4625fb(0x356)](_0x1da597['code'])&&(_0x4b13a1+='\x0a',_0x4b13a1+=_0x1da597[_0x4625fb(0x3d2)][0x0]);}}return _0x4b13a1;}}}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x597),_0x247869=>{const _0x5e233d=_0x54467d;if($gameParty['inBattle']())return;VisuMZ[_0x5e233d(0x2e6)](_0x247869,_0x247869);const _0x18114a=_0x247869[_0x5e233d(0x748)];for(const _0x1ac1b5 of _0x18114a){const _0x22fdeb=$gameSwitches[_0x5e233d(0x57c)](_0x1ac1b5);$gameSwitches[_0x5e233d(0x53b)](_0x1ac1b5,!_0x22fdeb);}}),PluginManager['registerCommand'](pluginData['name'],_0x54467d(0x14f),_0x402b9f=>{const _0x56ae12=_0x54467d;if($gameParty[_0x56ae12(0xd4)]())return;VisuMZ[_0x56ae12(0x2e6)](_0x402b9f,_0x402b9f);const _0x532a0c=Math[_0x56ae12(0x625)](_0x402b9f[_0x56ae12(0x67e)],_0x402b9f[_0x56ae12(0x156)]),_0x112e70=Math[_0x56ae12(0x161)](_0x402b9f[_0x56ae12(0x67e)],_0x402b9f[_0x56ae12(0x156)]);for(let _0x547c20=_0x532a0c;_0x547c20<=_0x112e70;_0x547c20++){const _0x49e6c5=$gameSwitches[_0x56ae12(0x57c)](_0x547c20);$gameSwitches['setValue'](_0x547c20,!_0x49e6c5);}}),PluginManager[_0x54467d(0x323)](pluginData['name'],'SystemSetFontSize',_0x427f35=>{const _0x25a985=_0x54467d;VisuMZ[_0x25a985(0x2e6)](_0x427f35,_0x427f35);const _0x2b839f=_0x427f35[_0x25a985(0x380)]||0x1;$gameSystem[_0x25a985(0x247)](_0x2b839f);}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],'SystemSetSideView',_0x3d0142=>{const _0x3ea5d4=_0x54467d;if($gameParty[_0x3ea5d4(0xd4)]())return;VisuMZ[_0x3ea5d4(0x2e6)](_0x3d0142,_0x3d0142);const _0x52f686=_0x3d0142[_0x3ea5d4(0x380)];if(_0x52f686[_0x3ea5d4(0x8b6)](/Front/i))$gameSystem[_0x3ea5d4(0x3a2)](![]);else _0x52f686[_0x3ea5d4(0x8b6)](/Side/i)?$gameSystem[_0x3ea5d4(0x3a2)](!![]):$gameSystem[_0x3ea5d4(0x3a2)](!$gameSystem[_0x3ea5d4(0x29e)]());}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x98e),_0x21927e=>{const _0x122703=_0x54467d;if($gameParty[_0x122703(0xd4)]())return;VisuMZ[_0x122703(0x2e6)](_0x21927e,_0x21927e);const _0x272b0c=[_0x122703(0x6cd),'bgs','me','se'];for(const _0x4e83ff of _0x272b0c){if(_0x122703(0x95c)===_0x122703(0x960))_0x186f99[_0x122703(0x98c)][_0x122703(0x740)][_0x122703(0x52e)](this),this[_0x122703(0x9b4)]();else{const _0x3c388c=_0x21927e[_0x4e83ff],_0x59aec4=_0x122703(0x12b)[_0x122703(0x875)](_0x4e83ff);for(const _0x2f3a02 of _0x3c388c){AudioManager[_0x122703(0x7e4)](_0x59aec4,_0x2f3a02);}}}}),PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x61c),_0x2651b7=>{const _0x259b07=_0x54467d;if($gameParty[_0x259b07(0xd4)]())return;VisuMZ['ConvertParams'](_0x2651b7,_0x2651b7);const _0x3f5842=[_0x259b07(0x7af),'battlebacks1',_0x259b07(0x66a),'characters',_0x259b07(0x820),_0x259b07(0x8c3),'parallaxes','pictures',_0x259b07(0x38c),_0x259b07(0x75e),_0x259b07(0x698),_0x259b07(0x259),_0x259b07(0x4c0),_0x259b07(0x7ec)];for(const _0x40ca82 of _0x3f5842){const _0x491bc7=_0x2651b7[_0x40ca82],_0x106911='img/%1/'[_0x259b07(0x875)](_0x40ca82);for(const _0x5ec992 of _0x491bc7){ImageManager['loadBitmap'](_0x106911,_0x5ec992);}}}),PluginManager[_0x54467d(0x323)](pluginData['name'],'SystemSetBattleSystem',_0x2b1bf5=>{const _0x184e48=_0x54467d;if($gameParty[_0x184e48(0xd4)]())return;VisuMZ[_0x184e48(0x2e6)](_0x2b1bf5,_0x2b1bf5);const _0xf05f58=_0x2b1bf5[_0x184e48(0x380)][_0x184e48(0x879)]()['trim'](),_0x12be1d=VisuMZ['CoreEngine'][_0x184e48(0x168)](_0xf05f58);$gameSystem[_0x184e48(0x13c)](_0x12be1d);}),VisuMZ[_0x54467d(0x98c)][_0x54467d(0x168)]=function(_0x1d4523){const _0x3c2b90=_0x54467d;_0x1d4523=_0x1d4523||'DATABASE',_0x1d4523=String(_0x1d4523)[_0x3c2b90(0x879)]()[_0x3c2b90(0x747)]();switch(_0x1d4523){case _0x3c2b90(0x1f1):return 0x0;case _0x3c2b90(0x2ab):Imported[_0x3c2b90(0x1a9)]&&(ConfigManager['atbActive']=!![]);return 0x1;case'TPB\x20WAIT':Imported[_0x3c2b90(0x1a9)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x3c2b90(0x85b):if(Imported[_0x3c2b90(0x349)])return _0x3c2b90(0x85b);break;case _0x3c2b90(0x5f5):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x3c2b90(0x5f5);break;case _0x3c2b90(0x197):if(Imported[_0x3c2b90(0x818)])return _0x3c2b90(0x197);break;case'FTB':if(Imported[_0x3c2b90(0x2bc)])return _0x3c2b90(0x883);break;case _0x3c2b90(0x3b4):if(Imported['VisuMZ_2_BattleSystemOTB']){if(_0x3c2b90(0x641)!==_0x3c2b90(0x178))return'OTB';else{var _0x58aa03=_0x8cf0d0(_0x58ebfa['$1']);_0x3bcfd*=_0x58aa03;}}break;case _0x3c2b90(0x2f5):if(Imported[_0x3c2b90(0x504)]){if(_0x3c2b90(0x6af)!=='bfcvm')return'ETB';else _0x58068f=_0x4b508c[_0x3c2b90(0xe2)](_0x46ff5e),_0x19e31f=_0x1da1e6['round'](_0x42167c),_0x1b666b[_0x3c2b90(0x98c)][_0x3c2b90(0x25c)][_0x3c2b90(0x52e)](this,_0x63a2b,_0x5ba175,_0x9bbecb);}break;case _0x3c2b90(0x548):if(Imported[_0x3c2b90(0x7fe)]){if('dYjre'!==_0x3c2b90(0x912))_0x4d1e8a[_0x3c2b90(0x98c)][_0x3c2b90(0x383)][_0x3c2b90(0x52e)](this,_0x5e530c,_0x139763,_0x5f5db2,_0x59592b,_0x910dfd,_0xc34188,_0x26481b,_0x25011c,_0x259539),this[_0x3c2b90(0x7e2)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x46f79f]||{'x':0x0,'y':0x0});else return _0x3c2b90(0x548);}break;}return $dataSystem['battleSystem'];},PluginManager['registerCommand'](pluginData[_0x54467d(0x33a)],_0x54467d(0x327),_0x5501a1=>{VisuMZ['ConvertParams'](_0x5501a1,_0x5501a1);const _0x2d9639=_0x5501a1['option']||0x1;$gameSystem['setWindowPadding'](_0x2d9639);}),PluginManager[_0x54467d(0x323)](pluginData['name'],_0x54467d(0x7a0),_0x497427=>{const _0x18d471=_0x54467d;VisuMZ[_0x18d471(0x2e6)](_0x497427,_0x497427);const _0x4ef3e2=_0x497427['id']||0x1,_0xc49040=_0x497427[_0x18d471(0x2cb)],_0x1b4915=_0x497427['operand']||0x0;let _0x2d0064=$gameVariables[_0x18d471(0x57c)](_0x4ef3e2)||0x0;switch(_0xc49040){case'=':_0x2d0064=_0x1b4915;break;case'+':_0x2d0064+=_0x1b4915;break;case'-':_0x2d0064-=_0x1b4915;break;case'*':_0x2d0064*=_0x1b4915;break;case'/':_0x2d0064/=_0x1b4915;break;case'%':_0x2d0064%=_0x1b4915;break;}_0x2d0064=_0x2d0064||0x0,$gameVariables[_0x18d471(0x53b)](_0x4ef3e2,_0x2d0064);}),PluginManager[_0x54467d(0x323)](pluginData[_0x54467d(0x33a)],_0x54467d(0x5da),_0x2bc4fb=>{const _0x3c344e=_0x54467d;VisuMZ[_0x3c344e(0x2e6)](_0x2bc4fb,_0x2bc4fb);const _0x577d9f=_0x2bc4fb['id']()||0x1,_0xbb0277=_0x2bc4fb[_0x3c344e(0x2cb)],_0x5ddd13=_0x2bc4fb['operand']()||0x0;let _0x59f52c=$gameVariables[_0x3c344e(0x57c)](_0x577d9f)||0x0;switch(_0xbb0277){case'=':_0x59f52c=_0x5ddd13;break;case'+':_0x59f52c+=_0x5ddd13;break;case'-':_0x59f52c-=_0x5ddd13;break;case'*':_0x59f52c*=_0x5ddd13;break;case'/':_0x59f52c/=_0x5ddd13;break;case'%':_0x59f52c%=_0x5ddd13;break;}_0x59f52c=_0x59f52c||0x0,$gameVariables[_0x3c344e(0x53b)](_0x577d9f,_0x59f52c);}),VisuMZ[_0x54467d(0x98c)][_0x54467d(0x906)]=Scene_Boot[_0x54467d(0x895)][_0x54467d(0x808)],Scene_Boot[_0x54467d(0x895)][_0x54467d(0x808)]=function(){const _0x12c2f8=_0x54467d;VisuMZ[_0x12c2f8(0x98c)][_0x12c2f8(0x906)][_0x12c2f8(0x52e)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x12c2f8(0x173)](),this[_0x12c2f8(0x72a)](),this[_0x12c2f8(0x882)](),this[_0x12c2f8(0x51a)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0x12c2f8(0x258)]();},VisuMZ[_0x54467d(0x98c)]['RegExp']={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x52c569=_0x54467d,_0x4439b=[_0x52c569(0x19d),'MAXMP',_0x52c569(0x1ef),'DEF','MAT',_0x52c569(0x67b),_0x52c569(0x2b5),_0x52c569(0x96a)],_0x4aa0d7=['HIT',_0x52c569(0x2cc),'CRI','CEV',_0x52c569(0x6c1),'MRF',_0x52c569(0x5b4),_0x52c569(0x92a),_0x52c569(0x143),'TRG'],_0x232270=[_0x52c569(0x8f9),_0x52c569(0x1c0),_0x52c569(0x44c),'PHA','MCR',_0x52c569(0x90a),_0x52c569(0x53e),'MDR',_0x52c569(0x5f8),'EXR'],_0x9a5da3=[_0x4439b,_0x4aa0d7,_0x232270],_0x3e4394=[_0x52c569(0x60f),_0x52c569(0x397),'Plus2',_0x52c569(0x533),_0x52c569(0x467),_0x52c569(0x49c),'Rate2',_0x52c569(0x5d1),_0x52c569(0x732),'Flat2'];for(const _0x7ef253 of _0x9a5da3){let _0x34670e='';if(_0x7ef253===_0x4439b)_0x34670e=_0x52c569(0x80a);if(_0x7ef253===_0x4aa0d7)_0x34670e=_0x52c569(0x7d0);if(_0x7ef253===_0x232270)_0x34670e=_0x52c569(0x96c);for(const _0x2eed17 of _0x3e4394){let _0x22084b=_0x52c569(0x217)[_0x52c569(0x875)](_0x34670e,_0x2eed17);VisuMZ[_0x52c569(0x98c)][_0x52c569(0xcb)][_0x22084b]=[],VisuMZ['CoreEngine']['RegExp'][_0x22084b+'JS']=[];let _0xc3e4b='<%1\x20%2:[\x20]';if([_0x52c569(0x60f),_0x52c569(0x5d1)]['includes'](_0x2eed17)){if(_0x52c569(0x8da)===_0x52c569(0x8da))_0xc3e4b+=_0x52c569(0x424);else{if(_0x2dd4b8['isPlaytest']())_0x57fc4b[_0x52c569(0x56f)](_0x170694);}}else{if([_0x52c569(0x397),_0x52c569(0x732)]['includes'](_0x2eed17))_0xc3e4b+=_0x52c569(0x860);else{if([_0x52c569(0x352),_0x52c569(0x58d)][_0x52c569(0x356)](_0x2eed17)){if(_0x52c569(0x988)===_0x52c569(0x809)){if(_0x20e275)throw _0xf5efc3;else _0x5ad8e1&&_0x251c80('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x52c569(0x875)](_0x16e973));}else _0xc3e4b+=_0x52c569(0x2d1);}else{if(_0x2eed17==='Max')_0xc3e4b+=_0x52c569(0x8ba);else{if(_0x2eed17===_0x52c569(0x49c))_0xc3e4b+=_0x52c569(0x2e3);else _0x2eed17===_0x52c569(0x19e)&&('KjpqE'===_0x52c569(0x1c8)?_0xc3e4b+=_0x52c569(0x553):this[_0x52c569(0x66f)]()?this['makeDocumentTitle']():_0x2c73dd[_0x52c569(0x98c)][_0x52c569(0x88d)]['call'](this));}}}}for(const _0x893df3 of _0x7ef253){if(_0x52c569(0x5db)!==_0x52c569(0x5db)){if(this[_0x52c569(0x5a0)]()['centerY']&&_0x37d181[_0x52c569(0x863)]()===0x1){this['_displayY']=this[_0x52c569(0x5a0)]()['displayY'];return;}_0x39b41c[_0x52c569(0x98c)][_0x52c569(0x430)][_0x52c569(0x52e)](this,_0x2785a4);}else{let _0x2c0548=_0x2eed17['replace'](/[\d+]/g,'')[_0x52c569(0x879)]();const _0x12480e=_0xc3e4b[_0x52c569(0x875)](_0x893df3,_0x2c0548);VisuMZ['CoreEngine']['RegExp'][_0x22084b][_0x52c569(0x37e)](new RegExp(_0x12480e,'i'));const _0x45f2b5='<JS\x20%1\x20%2:[\x20](.*)>'[_0x52c569(0x875)](_0x893df3,_0x2c0548);VisuMZ[_0x52c569(0x98c)]['RegExp'][_0x22084b+'JS'][_0x52c569(0x37e)](new RegExp(_0x45f2b5,'i'));}}}}},Scene_Boot[_0x54467d(0x895)][_0x54467d(0x173)]=function(){const _0x73128e=_0x54467d;if(VisuMZ[_0x73128e(0x258)])return;},Scene_Boot[_0x54467d(0x895)][_0x54467d(0x72a)]=function(){const _0x58d755=_0x54467d,_0x2f5677=VisuMZ['CoreEngine']['Settings'];_0x2f5677[_0x58d755(0x355)][_0x58d755(0x23e)]&&VisuMZ[_0x58d755(0x46e)](!![]);_0x2f5677[_0x58d755(0x355)][_0x58d755(0x4f2)]&&(Input[_0x58d755(0x368)][0x23]=_0x58d755(0x71b),Input['keyMapper'][0x24]=_0x58d755(0x22f));if(_0x2f5677[_0x58d755(0x348)]){const _0x3d9056=_0x2f5677[_0x58d755(0x348)];_0x3d9056['KeySHIFT']=_0x3d9056[_0x58d755(0x6b2)]||_0x58d755(0x8e7),_0x3d9056[_0x58d755(0x885)]=_0x3d9056[_0x58d755(0x885)]||_0x58d755(0x978);}if(_0x2f5677[_0x58d755(0xcc)]['WASD']){if(_0x58d755(0x3f0)==='PdFDV')Input[_0x58d755(0x368)][0x57]='up',Input[_0x58d755(0x368)][0x41]=_0x58d755(0x7db),Input['keyMapper'][0x53]='down',Input[_0x58d755(0x368)][0x44]=_0x58d755(0x49d),Input[_0x58d755(0x368)][0x45]=_0x58d755(0x5c1);else return this[_0x58d755(0x6b0)]();}if(_0x2f5677['KeyboardInput']['DashToggleR']){if('IEqZq'!=='YWdgu')Input[_0x58d755(0x368)][0x52]=_0x58d755(0x75a);else{const _0x314c23=this['name'](),_0x226ab5=this[_0x58d755(0x80d)](),_0x476d16=this['bitmapHeight']();this['setupFont'](),this[_0x58d755(0x55d)]['clear'](),this[_0x58d755(0x55d)]['drawTextTopAligned'](_0x314c23,0x4,0x0,_0x226ab5-0xa,_0x476d16,_0x58d755(0x7db));}}_0x2f5677[_0x58d755(0x1e2)][_0x58d755(0x5fd)]=_0x2f5677[_0x58d755(0x1e2)][_0x58d755(0x5fd)]['map'](_0x218b20=>_0x218b20[_0x58d755(0x879)]()[_0x58d755(0x747)]()),_0x2f5677['Param'][_0x58d755(0x5ac)]=_0x2f5677[_0x58d755(0x1e2)][_0x58d755(0x5ac)][_0x58d755(0x946)](_0x261628=>_0x261628[_0x58d755(0x879)]()[_0x58d755(0x747)]());},Scene_Boot['prototype'][_0x54467d(0x882)]=function(){const _0x2de3f5=_0x54467d;this[_0x2de3f5(0x634)]();},Scene_Boot[_0x54467d(0x895)][_0x54467d(0x634)]=function(){const _0x4f8f78=_0x54467d,_0x39f6b0=VisuMZ[_0x4f8f78(0x98c)][_0x4f8f78(0x357)][_0x4f8f78(0x31e)];for(const _0x49f4c5 of _0x39f6b0){const _0x536958=_0x49f4c5[_0x4f8f78(0x262)][_0x4f8f78(0x603)](/[ ]/g,''),_0x15f620=_0x49f4c5['CodeJS'];VisuMZ['CoreEngine']['createJsQuickFunction'](_0x536958,_0x15f620);}},VisuMZ[_0x54467d(0x98c)]['createJsQuickFunction']=function(_0x276c35,_0x30fe45){const _0x5b421e=_0x54467d;if(!!window[_0x276c35]){if($gameTemp[_0x5b421e(0x595)]())console[_0x5b421e(0x56f)](_0x5b421e(0x20b)['format'](_0x276c35));}const _0x247b1a=_0x5b421e(0x3cc)[_0x5b421e(0x875)](_0x276c35,_0x30fe45);window[_0x276c35]=new Function(_0x247b1a);},Scene_Boot[_0x54467d(0x895)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x57b3ef=_0x54467d,_0x192898=VisuMZ[_0x57b3ef(0x98c)][_0x57b3ef(0x357)][_0x57b3ef(0x479)];if(!_0x192898)return;for(const _0x158b71 of _0x192898){if(!_0x158b71)continue;VisuMZ[_0x57b3ef(0x98c)][_0x57b3ef(0x4a4)](_0x158b71);}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x79a)]={},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x340)]={},VisuMZ[_0x54467d(0x98c)]['CustomParamType']={},VisuMZ[_0x54467d(0x98c)]['CustomParamAbb']={},VisuMZ['CoreEngine'][_0x54467d(0x4a4)]=function(_0x39f433){const _0x9a6a66=_0x54467d,_0x17494e=_0x39f433[_0x9a6a66(0x49b)],_0x18298c=_0x39f433[_0x9a6a66(0x9ae)],_0x3ec53=_0x39f433[_0x9a6a66(0x5a1)],_0x1bfc7b=_0x39f433['Type'],_0x1e52d1=new Function(_0x39f433[_0x9a6a66(0x3f4)]);VisuMZ[_0x9a6a66(0x98c)][_0x9a6a66(0x79a)][_0x17494e[_0x9a6a66(0x879)]()[_0x9a6a66(0x747)]()]=_0x18298c,VisuMZ[_0x9a6a66(0x98c)][_0x9a6a66(0x340)][_0x17494e[_0x9a6a66(0x879)]()[_0x9a6a66(0x747)]()]=_0x3ec53,VisuMZ[_0x9a6a66(0x98c)][_0x9a6a66(0x870)][_0x17494e[_0x9a6a66(0x879)]()[_0x9a6a66(0x747)]()]=_0x1bfc7b,VisuMZ[_0x9a6a66(0x98c)][_0x9a6a66(0x907)][_0x17494e[_0x9a6a66(0x879)]()[_0x9a6a66(0x747)]()]=_0x17494e,Object['defineProperty'](Game_BattlerBase[_0x9a6a66(0x895)],_0x17494e,{'get'(){const _0x465bdd=_0x9a6a66,_0x40cc6a=_0x1e52d1['call'](this);return _0x1bfc7b===_0x465bdd(0xdd)?Math[_0x465bdd(0xe2)](_0x40cc6a):_0x40cc6a;}});},VisuMZ['CoreEngine'][_0x54467d(0x569)]={},VisuMZ['CoreEngine'][_0x54467d(0x35c)]={},Scene_Boot['prototype'][_0x54467d(0x45f)]=function(){const _0x14179a=_0x54467d,_0x4e92ef=VisuMZ[_0x14179a(0x98c)]['Settings'][_0x14179a(0x569)];for(const _0x5785ce of _0x4e92ef){const _0x31ace5=(_0x5785ce['Name']||'')[_0x14179a(0x57d)]()[_0x14179a(0x747)](),_0x3e25d3=(_0x5785ce[_0x14179a(0x94c)]||'')[_0x14179a(0x57d)]()['trim']();VisuMZ['CoreEngine'][_0x14179a(0x569)][_0x31ace5]=_0x5785ce,VisuMZ[_0x14179a(0x98c)]['ControllerMatches'][_0x3e25d3]=_0x31ace5;}},VisuMZ[_0x54467d(0x258)]=function(){const _0x516fdd=_0x54467d;for(const _0x51505f of $dataActors){if(_0x51505f)VisuMZ[_0x516fdd(0x174)](_0x51505f);}for(const _0x2ecfb5 of $dataClasses){if(_0x2ecfb5)VisuMZ[_0x516fdd(0x53c)](_0x2ecfb5);}for(const _0x12a43a of $dataSkills){if(_0x516fdd(0x17f)==='MtAmT')return![];else{if(_0x12a43a)VisuMZ[_0x516fdd(0x839)](_0x12a43a);}}for(const _0x4bbc2f of $dataItems){if(_0x4bbc2f)VisuMZ[_0x516fdd(0x2cf)](_0x4bbc2f);}for(const _0xdb625f of $dataWeapons){if(_0xdb625f)VisuMZ[_0x516fdd(0x5a2)](_0xdb625f);}for(const _0x100191 of $dataArmors){if(_0x100191)VisuMZ[_0x516fdd(0x384)](_0x100191);}for(const _0x239665 of $dataEnemies){if(_0x239665)VisuMZ[_0x516fdd(0x54f)](_0x239665);}for(const _0x549a19 of $dataStates){if(_0x549a19)VisuMZ[_0x516fdd(0x4fe)](_0x549a19);}for(const _0x33eff1 of $dataTilesets){if('XWWCH'!=='xARTs'){if(_0x33eff1)VisuMZ['ParseTilesetNotetags'](_0x33eff1);}else _0x1446cd['bgmVolume']=0x64,_0x4be110['bgsVolume']=0x64,_0x26b4f9['meVolume']=0x64,_0x11fddd[_0x516fdd(0x757)]=0x64;}},VisuMZ[_0x54467d(0x174)]=function(_0xa69123){},VisuMZ[_0x54467d(0x53c)]=function(_0x11160c){},VisuMZ[_0x54467d(0x839)]=function(_0x9223f9){},VisuMZ[_0x54467d(0x2cf)]=function(_0x5df75e){},VisuMZ['ParseWeaponNotetags']=function(_0x4645b7){},VisuMZ['ParseArmorNotetags']=function(_0x19bb98){},VisuMZ[_0x54467d(0x54f)]=function(_0x14d2a8){},VisuMZ[_0x54467d(0x4fe)]=function(_0x2dd661){},VisuMZ['ParseTilesetNotetags']=function(_0x3e21d5){},VisuMZ[_0x54467d(0x98c)]['ParseActorNotetags']=VisuMZ['ParseActorNotetags'],VisuMZ[_0x54467d(0x174)]=function(_0x4d3e8a){const _0x2cb899=_0x54467d;VisuMZ[_0x2cb899(0x98c)][_0x2cb899(0x174)][_0x2cb899(0x52e)](this,_0x4d3e8a);const _0x1acd55=_0x4d3e8a[_0x2cb899(0x944)];if(_0x1acd55[_0x2cb899(0x8b6)](/<MAX LEVEL:[ ](\d+)>/i)){_0x4d3e8a[_0x2cb899(0x726)]=Number(RegExp['$1']);if(_0x4d3e8a[_0x2cb899(0x726)]===0x0)_0x4d3e8a[_0x2cb899(0x726)]=Number['MAX_SAFE_INTEGER'];}_0x1acd55['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x4d3e8a[_0x2cb899(0x4c3)]=Math[_0x2cb899(0x625)](Number(RegExp['$1']),_0x4d3e8a[_0x2cb899(0x726)]));},VisuMZ['CoreEngine'][_0x54467d(0x53c)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x54467d(0x53c)]=function(_0x103289){const _0x3e5fd9=_0x54467d;VisuMZ[_0x3e5fd9(0x98c)][_0x3e5fd9(0x53c)]['call'](this,_0x103289);if(_0x103289[_0x3e5fd9(0x6c3)])for(const _0x4a19c5 of _0x103289[_0x3e5fd9(0x6c3)]){_0x4a19c5[_0x3e5fd9(0x944)][_0x3e5fd9(0x8b6)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x3e5fd9(0x886)!==_0x3e5fd9(0x886)?this[_0x3e5fd9(0x91d)]():_0x4a19c5[_0x3e5fd9(0x8d1)]=Math[_0x3e5fd9(0x161)](Number(RegExp['$1']),0x1));}},VisuMZ['CoreEngine'][_0x54467d(0x54f)]=VisuMZ[_0x54467d(0x54f)],VisuMZ[_0x54467d(0x54f)]=function(_0x544550){const _0x28be9d=_0x54467d;VisuMZ[_0x28be9d(0x98c)][_0x28be9d(0x54f)][_0x28be9d(0x52e)](this,_0x544550),_0x544550[_0x28be9d(0x8d1)]=0x1;const _0x4b01ea=_0x544550[_0x28be9d(0x944)];if(_0x4b01ea[_0x28be9d(0x8b6)](/<LEVEL:[ ](\d+)>/i))_0x544550['level']=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<MAXHP:[ ](\d+)>/i))_0x544550[_0x28be9d(0x4a7)][0x0]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<MAXMP:[ ](\d+)>/i))_0x544550[_0x28be9d(0x4a7)][0x1]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<ATK:[ ](\d+)>/i))_0x544550[_0x28be9d(0x4a7)][0x2]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<DEF:[ ](\d+)>/i))_0x544550['params'][0x3]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<MAT:[ ](\d+)>/i))_0x544550['params'][0x4]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<MDF:[ ](\d+)>/i))_0x544550['params'][0x5]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<AGI:[ ](\d+)>/i))_0x544550[_0x28be9d(0x4a7)][0x6]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<LUK:[ ](\d+)>/i))_0x544550[_0x28be9d(0x4a7)][0x7]=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<EXP:[ ](\d+)>/i))_0x544550['exp']=Number(RegExp['$1']);if(_0x4b01ea[_0x28be9d(0x8b6)](/<GOLD:[ ](\d+)>/i))_0x544550['gold']=Number(RegExp['$1']);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x609)]=Graphics['_defaultStretchMode'],Graphics[_0x54467d(0x443)]=function(){const _0x22876b=_0x54467d;switch(VisuMZ[_0x22876b(0x98c)]['Settings']['QoL'][_0x22876b(0x981)]){case'stretch':return!![];case _0x22876b(0x58b):return![];default:return VisuMZ['CoreEngine'][_0x22876b(0x609)][_0x22876b(0x52e)](this);}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x2df)]=Graphics[_0x54467d(0x638)],Graphics[_0x54467d(0x638)]=function(_0x55d47c,_0xab8a0,_0x2e6bc8=null){const _0x48054e=_0x54467d;VisuMZ['CoreEngine'][_0x48054e(0x2df)][_0x48054e(0x52e)](this,_0x55d47c,_0xab8a0,_0x2e6bc8),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x7dd)]=Graphics[_0x54467d(0x546)],Graphics[_0x54467d(0x546)]=function(_0x2e1201){const _0x2d6e64=_0x54467d;VisuMZ[_0x2d6e64(0x98c)][_0x2d6e64(0x7dd)][_0x2d6e64(0x52e)](this,_0x2e1201),this[_0x2d6e64(0x14a)](_0x2e1201);},Graphics[_0x54467d(0x14a)]=function(_0x47706d){const _0x184891=_0x54467d;VisuMZ['CoreEngine']['Settings'][_0x184891(0x355)][_0x184891(0x36b)]&&(_0x47706d[_0x184891(0x1f2)][_0x184891(0x3bc)]=_0x184891(0x868));if(VisuMZ[_0x184891(0x98c)][_0x184891(0x357)]['QoL'][_0x184891(0x3b6)]){if(_0x184891(0x10a)!==_0x184891(0x1e1))_0x47706d[_0x184891(0x1f2)][_0x184891(0x269)]=_0x184891(0x122);else{var _0xf9ed5b=_0x22050d(_0x34c3ab['$1'])/0x64;_0x3d9c10*=_0xf9ed5b;}}const _0x5cddbb=Math[_0x184891(0x161)](0x0,Math[_0x184891(0x881)](_0x47706d[_0x184891(0x36d)]*this['_realScale'])),_0x15ee47=Math['max'](0x0,Math[_0x184891(0x881)](_0x47706d['height']*this[_0x184891(0x92e)]));_0x47706d[_0x184891(0x1f2)][_0x184891(0x36d)]=_0x5cddbb+'px',_0x47706d['style']['height']=_0x15ee47+'px';},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x3f3)]=Bitmap[_0x54467d(0x895)]['initialize'],Bitmap['prototype']['initialize']=function(_0xcf4583,_0x1a06a2){const _0x1cfd52=_0x54467d;VisuMZ[_0x1cfd52(0x98c)][_0x1cfd52(0x3f3)][_0x1cfd52(0x52e)](this,_0xcf4583,_0x1a06a2),this[_0x1cfd52(0x2e4)]=!(VisuMZ[_0x1cfd52(0x98c)]['Settings'][_0x1cfd52(0x355)][_0x1cfd52(0x3b6)]??!![]);},Bitmap[_0x54467d(0x895)][_0x54467d(0x30b)]=function(){this['_customModified']=!![];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x332)]=Sprite['prototype']['destroy'],Sprite[_0x54467d(0x895)][_0x54467d(0x52b)]=function(){const _0x3537ee=_0x54467d;if(this['_texture'])VisuMZ[_0x3537ee(0x98c)][_0x3537ee(0x332)][_0x3537ee(0x52e)](this);this[_0x3537ee(0x849)]();},Sprite[_0x54467d(0x895)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x35c08d=_0x54467d;if(!this[_0x35c08d(0x55d)])return;if(!this[_0x35c08d(0x55d)][_0x35c08d(0x829)])return;this['bitmap']['_baseTexture']&&!this[_0x35c08d(0x779)][_0x35c08d(0x8d8)][_0x35c08d(0x3a4)]&&this[_0x35c08d(0x55d)]['destroy']();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0xe6)]=Bitmap[_0x54467d(0x895)][_0x54467d(0x6a6)],Bitmap[_0x54467d(0x895)][_0x54467d(0x6a6)]=function(_0x55eec3,_0x2067e7){const _0x35e5c4=_0x54467d;VisuMZ[_0x35e5c4(0x98c)][_0x35e5c4(0xe6)][_0x35e5c4(0x52e)](this,_0x55eec3,_0x2067e7),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x54467d(0xe4)]=Bitmap[_0x54467d(0x895)][_0x54467d(0x738)],Bitmap['prototype'][_0x54467d(0x738)]=function(_0x5c24a9,_0x25d5f8,_0x38d2e9,_0x333b84,_0x2b4840,_0x28f4a8,_0x484ed4,_0x4900d2,_0x2210f4){const _0xbaa07c=_0x54467d;_0x25d5f8=Math['round'](_0x25d5f8),_0x38d2e9=Math[_0xbaa07c(0xe2)](_0x38d2e9),_0x333b84=Math['round'](_0x333b84),_0x2b4840=Math[_0xbaa07c(0xe2)](_0x2b4840),_0x28f4a8=Math[_0xbaa07c(0xe2)](_0x28f4a8),_0x484ed4=Math[_0xbaa07c(0xe2)](_0x484ed4),VisuMZ[_0xbaa07c(0x98c)]['Bitmap_blt'][_0xbaa07c(0x52e)](this,_0x5c24a9,_0x25d5f8,_0x38d2e9,_0x333b84,_0x2b4840,_0x28f4a8,_0x484ed4,_0x4900d2,_0x2210f4),this[_0xbaa07c(0x30b)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x652)]=Bitmap[_0x54467d(0x895)][_0x54467d(0x2ce)],Bitmap[_0x54467d(0x895)]['clearRect']=function(_0x19b124,_0x9b9425,_0x62ee42,_0x452e44){const _0xe521cb=_0x54467d;VisuMZ[_0xe521cb(0x98c)][_0xe521cb(0x652)][_0xe521cb(0x52e)](this,_0x19b124,_0x9b9425,_0x62ee42,_0x452e44),this['markCoreEngineModified']();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x99a)]=Bitmap[_0x54467d(0x895)]['fillRect'],Bitmap[_0x54467d(0x895)][_0x54467d(0x86a)]=function(_0x2cd692,_0x1d2af3,_0x532893,_0x45f939,_0x4c9191){const _0x2bdaf4=_0x54467d;VisuMZ[_0x2bdaf4(0x98c)]['Bitmap_fillRect'][_0x2bdaf4(0x52e)](this,_0x2cd692,_0x1d2af3,_0x532893,_0x45f939,_0x4c9191),this[_0x2bdaf4(0x30b)]();},VisuMZ['CoreEngine'][_0x54467d(0x4e3)]=Bitmap[_0x54467d(0x895)]['strokeRect'],Bitmap[_0x54467d(0x895)][_0x54467d(0x193)]=function(_0x2f3073,_0x5b4f5f,_0xe95cb5,_0x21732b,_0x4be3dc){const _0x15ce61=_0x54467d;VisuMZ[_0x15ce61(0x98c)][_0x15ce61(0x4e3)][_0x15ce61(0x52e)](this,_0x2f3073,_0x5b4f5f,_0xe95cb5,_0x21732b,_0x4be3dc),this['markCoreEngineModified']();},VisuMZ[_0x54467d(0x98c)]['Bitmap_gradientFillRect']=Bitmap[_0x54467d(0x895)][_0x54467d(0x186)],Bitmap[_0x54467d(0x895)][_0x54467d(0x186)]=function(_0x305dce,_0x362796,_0x45957f,_0x30282f,_0x1dbe7e,_0x2ff847,_0x55555d){const _0x28a609=_0x54467d;VisuMZ[_0x28a609(0x98c)][_0x28a609(0x13f)][_0x28a609(0x52e)](this,_0x305dce,_0x362796,_0x45957f,_0x30282f,_0x1dbe7e,_0x2ff847,_0x55555d),this[_0x28a609(0x30b)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x6e1)]=Bitmap[_0x54467d(0x895)][_0x54467d(0x714)],Bitmap[_0x54467d(0x895)][_0x54467d(0x714)]=function(_0x200e5a,_0xc45b38,_0x1a6341,_0xf9c21d){const _0x359089=_0x54467d;_0x200e5a=Math[_0x359089(0xe2)](_0x200e5a),_0xc45b38=Math[_0x359089(0xe2)](_0xc45b38),_0x1a6341=Math[_0x359089(0xe2)](_0x1a6341),VisuMZ[_0x359089(0x98c)][_0x359089(0x6e1)][_0x359089(0x52e)](this,_0x200e5a,_0xc45b38,_0x1a6341,_0xf9c21d),this[_0x359089(0x30b)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x532)]=Bitmap[_0x54467d(0x895)][_0x54467d(0x70a)],Bitmap['prototype'][_0x54467d(0x70a)]=function(_0x437381){const _0x34d34f=_0x54467d;return Math['ceil'](VisuMZ[_0x34d34f(0x98c)][_0x34d34f(0x532)]['call'](this,_0x437381));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x3c6)]=Bitmap[_0x54467d(0x895)]['drawText'],Bitmap[_0x54467d(0x895)][_0x54467d(0xeb)]=function(_0x20ea58,_0x47bd27,_0x29eb3f,_0x2c0537,_0x3f4dec,_0x550cec){const _0x5aacae=_0x54467d;_0x47bd27=Math[_0x5aacae(0xe2)](_0x47bd27),_0x29eb3f=Math[_0x5aacae(0xe2)](_0x29eb3f),_0x2c0537=Math[_0x5aacae(0xe2)](_0x2c0537),_0x3f4dec=Math[_0x5aacae(0xe2)](_0x3f4dec),VisuMZ[_0x5aacae(0x98c)][_0x5aacae(0x3c6)]['call'](this,_0x20ea58,_0x47bd27,_0x29eb3f,_0x2c0537,_0x3f4dec,_0x550cec),this[_0x5aacae(0x30b)]();},VisuMZ[_0x54467d(0x98c)]['Bitmap_drawTextOutline']=Bitmap['prototype'][_0x54467d(0x144)],Bitmap[_0x54467d(0x895)][_0x54467d(0x144)]=function(_0xa873b9,_0x3682b3,_0x537c98,_0x34b8fb){const _0x56388b=_0x54467d;if(VisuMZ[_0x56388b(0x98c)][_0x56388b(0x357)][_0x56388b(0x355)][_0x56388b(0x919)])'cCKKR'!=='cCKKR'?_0x43155b[_0x56388b(0x7fe)]&&(this[_0x56388b(0x89e)]=_0x56388b(0x548)):this['_drawTextShadow'](_0xa873b9,_0x3682b3,_0x537c98,_0x34b8fb);else{if('GqFGS'!==_0x56388b(0x712)){if(this[_0x56388b(0x31f)]===_0x16c583)this['initCoreEngineScreenShake']();this['_coreEngineShakeStyle']=_0x29e801[_0x56388b(0x57d)]()[_0x56388b(0x747)]();}else VisuMZ['CoreEngine']['Bitmap_drawTextOutline'][_0x56388b(0x52e)](this,_0xa873b9,_0x3682b3,_0x537c98,_0x34b8fb);}},Bitmap[_0x54467d(0x895)][_0x54467d(0x15e)]=function(_0xf4e347,_0x58e352,_0x1dd6dd,_0x270e13){const _0x597de1=_0x54467d,_0xed670b=this[_0x597de1(0x4b7)];_0xed670b['fillStyle']=this['outlineColor'],_0xed670b[_0x597de1(0x1de)](_0xf4e347,_0x58e352+0x2,_0x1dd6dd+0x2,_0x270e13);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x899)]=Input[_0x54467d(0x5ce)],Input[_0x54467d(0x5ce)]=function(){const _0x129d4b=_0x54467d;VisuMZ[_0x129d4b(0x98c)][_0x129d4b(0x899)][_0x129d4b(0x52e)](this),this[_0x129d4b(0x6a9)]=undefined,this[_0x129d4b(0x8b4)]=undefined,this[_0x129d4b(0x1f7)]=Input[_0x129d4b(0x8d9)];},VisuMZ[_0x54467d(0x98c)]['Input_update']=Input[_0x54467d(0x6f1)],Input['update']=function(){const _0xb7aa77=_0x54467d;VisuMZ[_0xb7aa77(0x98c)][_0xb7aa77(0x9b6)][_0xb7aa77(0x52e)](this);if(this[_0xb7aa77(0x1f7)])this[_0xb7aa77(0x1f7)]--;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x73a)]=Input[_0x54467d(0x64b)],Input[_0x54467d(0x64b)]=function(){const _0x3faea4=_0x54467d;if(this['_gamepadWait'])return;VisuMZ['CoreEngine'][_0x3faea4(0x73a)][_0x3faea4(0x52e)](this);},VisuMZ[_0x54467d(0x98c)]['Input_setupEventHandlers']=Input['_setupEventHandlers'],Input[_0x54467d(0x6ea)]=function(){const _0x1f8c2a=_0x54467d;VisuMZ[_0x1f8c2a(0x98c)]['Input_setupEventHandlers'][_0x1f8c2a(0x52e)](this),document[_0x1f8c2a(0x2c8)]('keypress',this['_onKeyPress']['bind'](this));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x4eb)]=Input[_0x54467d(0x83c)],Input[_0x54467d(0x83c)]=function(_0x290f5b){const _0x584be9=_0x54467d;this['_inputSpecialKeyCode']=_0x290f5b[_0x584be9(0x38d)],VisuMZ[_0x584be9(0x98c)][_0x584be9(0x4eb)][_0x584be9(0x52e)](this,_0x290f5b),this['setLastGamepadUsed'](null);},Input[_0x54467d(0x5a7)]=function(_0x2d9f30){this['_registerKeyInput'](_0x2d9f30);},Input[_0x54467d(0x21d)]=function(_0x178ac1){const _0x344324=_0x54467d;this[_0x344324(0x8b4)]=_0x178ac1[_0x344324(0x38d)];let _0x32f75a=String[_0x344324(0x639)](_0x178ac1[_0x344324(0x990)]);this[_0x344324(0x6a9)]===undefined?this[_0x344324(0x6a9)]=_0x32f75a:this[_0x344324(0x6a9)]+=_0x32f75a;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x287)]=Input[_0x54467d(0x5ef)],Input[_0x54467d(0x5ef)]=function(_0x15b90e){const _0x2b42bc=_0x54467d;if(_0x15b90e===0x8)return![];return VisuMZ[_0x2b42bc(0x98c)][_0x2b42bc(0x287)][_0x2b42bc(0x52e)](this,_0x15b90e);},Input[_0x54467d(0x645)]=function(_0x19fe5a){const _0x2e1da0=_0x54467d;if(_0x19fe5a[_0x2e1da0(0x8b6)](/backspace/i))return this[_0x2e1da0(0x8b4)]===0x8;if(_0x19fe5a['match'](/enter/i))return this[_0x2e1da0(0x8b4)]===0xd;if(_0x19fe5a[_0x2e1da0(0x8b6)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x54467d(0x6f2)]=function(){const _0x4c563c=_0x54467d;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x4c563c(0x5d3)](this[_0x4c563c(0x8b4)]);},Input[_0x54467d(0x3fc)]=function(){const _0x5f4ef4=_0x54467d;return[0x25,0x26,0x27,0x28][_0x5f4ef4(0x5d3)](this[_0x5f4ef4(0x8b4)]);},Input[_0x54467d(0x2d7)]=function(){const _0x4e020e=_0x54467d;if(navigator[_0x4e020e(0x75b)]){const _0x118765=navigator[_0x4e020e(0x75b)]();if(_0x118765){if(_0x4e020e(0x1b5)!==_0x4e020e(0x81a))for(const _0x36ec04 of _0x118765){if(_0x4e020e(0x655)!=='nShMB'){if(_0x36ec04&&_0x36ec04[_0x4e020e(0x17a)]){if(_0x4e020e(0x519)===_0x4e020e(0x188)){const _0x391259=_0x3bc299[_0x4e020e(0x49b)],_0x6875c=_0x1272ac[_0x4e020e(0x9ae)],_0x10b1af=_0x484991[_0x4e020e(0x5a1)],_0x36bffa=_0x739c84[_0x4e020e(0x68f)],_0x578fd9=new _0x46738b(_0xc9a139[_0x4e020e(0x3f4)]);_0x3c6b71['CoreEngine']['CustomParamNames'][_0x391259[_0x4e020e(0x879)]()[_0x4e020e(0x747)]()]=_0x6875c,_0x3a94cf[_0x4e020e(0x98c)][_0x4e020e(0x340)][_0x391259[_0x4e020e(0x879)]()[_0x4e020e(0x747)]()]=_0x10b1af,_0x2d753c[_0x4e020e(0x98c)][_0x4e020e(0x870)][_0x391259[_0x4e020e(0x879)]()['trim']()]=_0x36bffa,_0x33a69a[_0x4e020e(0x98c)][_0x4e020e(0x907)][_0x391259[_0x4e020e(0x879)]()[_0x4e020e(0x747)]()]=_0x391259,_0x25500d['defineProperty'](_0x433fc8[_0x4e020e(0x895)],_0x391259,{'get'(){const _0x40ed82=_0x4e020e,_0x48b24d=_0x578fd9[_0x40ed82(0x52e)](this);return _0x36bffa===_0x40ed82(0xdd)?_0x41f7d6[_0x40ed82(0xe2)](_0x48b24d):_0x48b24d;}});}else return!![];}}else return _0x447ce9['actor']()[_0x4e020e(0x2e9)](_0xb97e84);}else{if(!_0x2eba47[_0x4e020e(0x574)])return;if(!_0x200a77[_0x4e020e(0x574)][_0x4e020e(0x775)])return;_0x2ffcfc[_0x4e020e(0x2e6)](_0x52863b,_0x2bdb1d);const _0x251c83=_0x206abd[_0x4e020e(0xe2)](_0x3bd04f['pointX']),_0x434ad5=_0x52ced8[_0x4e020e(0xe2)](_0x30a6d5[_0x4e020e(0x4f0)]);_0x16d752['requestPointAnimation'](_0x251c83,_0x434ad5,_0x391cc8['AnimationID'],_0x1209c1[_0x4e020e(0x8b2)],_0x2e730d[_0x4e020e(0x6d3)]);}}}return![];},Input[_0x54467d(0x3de)]=function(){const _0x1bb00a=_0x54467d;if(navigator[_0x1bb00a(0x75b)]){const _0xc56f1a=navigator[_0x1bb00a(0x75b)]();if(_0xc56f1a){if(_0x1bb00a(0x2bd)===_0x1bb00a(0x696))this['cursorPagedown']();else for(const _0x2306d5 of _0xc56f1a){if(_0x2306d5&&_0x2306d5[_0x1bb00a(0x17a)]){if(this[_0x1bb00a(0x2c4)](_0x2306d5))return!![];if(this[_0x1bb00a(0x987)](_0x2306d5))return!![];}}}}return![];},Input['isGamepadButtonPressed']=function(_0x2927b3){const _0x5188cb=_0x54467d,_0xf60328=_0x2927b3['buttons'];for(let _0x594600=0x0;_0x594600<_0xf60328[_0x5188cb(0x959)];_0x594600++){if(_0xf60328[_0x594600][_0x5188cb(0x40e)])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x54f7b1){const _0x2672ee=_0x54467d,_0x503922=_0x54f7b1[_0x2672ee(0x627)],_0x3a76ac=0.5;if(_0x503922[0x0]<-_0x3a76ac)return!![];if(_0x503922[0x0]>_0x3a76ac)return!![];if(_0x503922[0x1]<-_0x3a76ac)return!![];if(_0x503922[0x1]>_0x3a76ac)return!![];return![];},Input[_0x54467d(0x271)]=function(){const _0x20676c=_0x54467d;return this[_0x20676c(0x3ff)]||null;},Input[_0x54467d(0x709)]=function(_0x2dd5ab){const _0x121aac=_0x54467d;this[_0x121aac(0x3ff)]=_0x2dd5ab;},VisuMZ['CoreEngine'][_0x54467d(0x90e)]=Input[_0x54467d(0x59c)],Input[_0x54467d(0x59c)]=function(_0xdaf01a){const _0x1c4018=_0x54467d;VisuMZ[_0x1c4018(0x98c)][_0x1c4018(0x90e)]['call'](this,_0xdaf01a);if(this['isGamepadButtonPressed'](_0xdaf01a)||this[_0x1c4018(0x987)](_0xdaf01a)){if('xxQlK'!==_0x1c4018(0x5e6))this[_0x1c4018(0x709)](_0xdaf01a);else return _0x415530;}},Input[_0x54467d(0x2ba)]=function(){const _0x2021d9=_0x54467d;return this[_0x2021d9(0x3ff)]?this[_0x2021d9(0x3ff)]['id']:'Keyboard';},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x846)]=Tilemap['prototype'][_0x54467d(0x636)],Tilemap[_0x54467d(0x895)][_0x54467d(0x636)]=function(_0x3e953e,_0x397121,_0x329c14,_0x3c669f){const _0x221dce=_0x54467d;if($gameMap&&$gameMap[_0x221dce(0x873)]())return;VisuMZ[_0x221dce(0x98c)][_0x221dce(0x846)]['call'](this,_0x3e953e,_0x397121,_0x329c14,_0x3c669f);},Tilemap[_0x54467d(0x6c8)]['prototype'][_0x54467d(0x1c5)]=function(){const _0x395498=_0x54467d;this['_destroyInternalTextures']();for(let _0x303aa3=0x0;_0x303aa3<Tilemap[_0x395498(0x7bd)][_0x395498(0x6c9)];_0x303aa3++){const _0x2214c3=new PIXI['BaseTexture']();_0x2214c3[_0x395498(0x4bd)](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x395498(0x355)][_0x395498(0x3b6)]&&(_0x2214c3[_0x395498(0x8ee)]=PIXI[_0x395498(0x64f)]['NEAREST']),this[_0x395498(0x5a6)][_0x395498(0x37e)](_0x2214c3);}},WindowLayer[_0x54467d(0x895)]['isMaskingEnabled']=function(){const _0x2c813f=_0x54467d;if(SceneManager&&SceneManager[_0x2c813f(0x574)])return SceneManager[_0x2c813f(0x574)][_0x2c813f(0x62d)]();else{if('UyNFs'===_0x2c813f(0x889))return!![];else{if(this[_0x2c813f(0x31f)]===_0x1cdcff)this[_0x2c813f(0x670)]();return this['_coreEngineShakeStyle'];}}},VisuMZ[_0x54467d(0x98c)]['WindowLayer_render']=WindowLayer[_0x54467d(0x895)][_0x54467d(0x972)],WindowLayer[_0x54467d(0x895)][_0x54467d(0x972)]=function render(_0x197c05){const _0x2bbbca=_0x54467d;if(this[_0x2bbbca(0x203)]())VisuMZ[_0x2bbbca(0x98c)][_0x2bbbca(0x932)]['call'](this,_0x197c05);else{if(_0x2bbbca(0x7b9)===_0x2bbbca(0x1cf))try{_0x2faf5f[_0x2bbbca(0x98c)][_0x2bbbca(0x404)][_0x2bbbca(0x52e)](this,_0x5dbf99);}catch(_0x543896){if(_0x2f58c3[_0x2bbbca(0x595)]())_0x17a462['log'](_0x543896);}else this['renderNoMask'](_0x197c05);}},WindowLayer['prototype'][_0x54467d(0x83a)]=function render(_0x29fa23){const _0x25ddac=_0x54467d;if(!this[_0x25ddac(0x4dd)])return;const _0x3da480=new PIXI['Graphics'](),_0x1973dd=_0x29fa23['gl'],_0x76e73c=this['children'][_0x25ddac(0x4ed)]();_0x29fa23[_0x25ddac(0x2de)][_0x25ddac(0x372)](),_0x3da480['transform']=this[_0x25ddac(0x913)],_0x29fa23[_0x25ddac(0xd9)][_0x25ddac(0x2f2)](),_0x1973dd[_0x25ddac(0x5eb)](_0x1973dd['STENCIL_TEST']);while(_0x76e73c['length']>0x0){const _0x5ce25a=_0x76e73c['shift']();_0x5ce25a[_0x25ddac(0x5f6)]&&_0x5ce25a[_0x25ddac(0x4dd)]&&_0x5ce25a[_0x25ddac(0x3d9)]>0x0&&(_0x25ddac(0x131)===_0x25ddac(0x131)?(_0x1973dd[_0x25ddac(0x1ee)](_0x1973dd['EQUAL'],0x0,~0x0),_0x1973dd[_0x25ddac(0x5d5)](_0x1973dd[_0x25ddac(0x724)],_0x1973dd[_0x25ddac(0x724)],_0x1973dd[_0x25ddac(0x724)]),_0x5ce25a[_0x25ddac(0x972)](_0x29fa23),_0x29fa23[_0x25ddac(0xd9)][_0x25ddac(0x2f2)](),_0x3da480[_0x25ddac(0x5ce)](),_0x1973dd[_0x25ddac(0x1ee)](_0x1973dd[_0x25ddac(0x910)],0x1,~0x0),_0x1973dd['stencilOp'](_0x1973dd[_0x25ddac(0x2c5)],_0x1973dd[_0x25ddac(0x2c5)],_0x1973dd['REPLACE']),_0x1973dd['blendFunc'](_0x1973dd[_0x25ddac(0x320)],_0x1973dd[_0x25ddac(0x764)]),_0x3da480['render'](_0x29fa23),_0x29fa23[_0x25ddac(0xd9)][_0x25ddac(0x2f2)](),_0x1973dd[_0x25ddac(0x69e)](_0x1973dd['ONE'],_0x1973dd[_0x25ddac(0x2b7)])):this[_0x25ddac(0x6ae)]=_0x332bed);}_0x1973dd['disable'](_0x1973dd[_0x25ddac(0x2fc)]),_0x1973dd['clear'](_0x1973dd[_0x25ddac(0x7fd)]),_0x1973dd[_0x25ddac(0x85d)](0x0),_0x29fa23[_0x25ddac(0xd9)][_0x25ddac(0x2f2)]();for(const _0x51e237 of this[_0x25ddac(0xf5)]){!_0x51e237[_0x25ddac(0x5f6)]&&_0x51e237['visible']&&(_0x25ddac(0x464)===_0x25ddac(0x464)?_0x51e237[_0x25ddac(0x972)](_0x29fa23):(_0x8d7b7c[_0x25ddac(0x98c)][_0x25ddac(0x935)][_0x25ddac(0x52e)](this,_0x4d7a5c),_0x4f22ad=this['_subject'],_0x5f1670=this[_0x25ddac(0x7f3)],_0x1ca33b=this[_0x25ddac(0x8c8)]||this[_0x25ddac(0x7f3)][0x0]));}_0x29fa23[_0x25ddac(0xd9)][_0x25ddac(0x2f2)]();},DataManager['isKeyItem']=function(_0x2abf9d){const _0x469a83=_0x54467d;return this[_0x469a83(0x56b)](_0x2abf9d)&&_0x2abf9d['itypeId']===0x2;},VisuMZ['CoreEngine'][_0x54467d(0x770)]=DataManager[_0x54467d(0x126)],DataManager[_0x54467d(0x126)]=function(){const _0x4e9cb5=_0x54467d;VisuMZ[_0x4e9cb5(0x98c)][_0x4e9cb5(0x770)][_0x4e9cb5(0x52e)](this),this[_0x4e9cb5(0x6fe)](),this['reserveNewGameCommonEvent']();},DataManager[_0x54467d(0x6fe)]=function(){const _0x265327=_0x54467d;if($gameTemp[_0x265327(0x595)]()){const _0x28e72d=VisuMZ[_0x265327(0x98c)][_0x265327(0x357)][_0x265327(0x355)][_0x265327(0x5fc)];if(_0x28e72d>0x0)$gameTemp[_0x265327(0x2f6)](_0x28e72d);}},DataManager[_0x54467d(0x953)]=function(){const _0xd3f6ff=_0x54467d,_0x20e50e=VisuMZ[_0xd3f6ff(0x98c)][_0xd3f6ff(0x357)][_0xd3f6ff(0x355)][_0xd3f6ff(0x51f)]||0x0;if(_0x20e50e>0x0)$gameTemp['reserveCommonEvent'](_0x20e50e);},DataManager[_0x54467d(0x765)]=function(_0x359f5b){const _0x2f4fdd=_0x54467d,_0x396357=$dataTroops[_0x359f5b];if(!_0x396357)return'';let _0x1e7ec8='';_0x1e7ec8+=_0x396357[_0x2f4fdd(0x33a)];for(const _0x588635 of _0x396357[_0x2f4fdd(0x32b)]){if('KuKef'!=='zxcaH')for(const _0x2956a8 of _0x588635[_0x2f4fdd(0x2ef)]){_0x2f4fdd(0x547)!==_0x2f4fdd(0x358)?[0x6c,0x198][_0x2f4fdd(0x356)](_0x2956a8[_0x2f4fdd(0x587)])&&(_0x1e7ec8+='\x0a',_0x1e7ec8+=_0x2956a8[_0x2f4fdd(0x3d2)][0x0]):this[_0x2f4fdd(0x107)](_0x2f4fdd(0x47a));}else this['isItemStyle']()?this[_0x2f4fdd(0x31b)]():_0x132516[_0x2f4fdd(0x98c)][_0x2f4fdd(0x558)]['call'](this);}return _0x1e7ec8;};(VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x355)][_0x54467d(0x8e3)]??!![])&&($scene=null,VisuMZ[_0x54467d(0x98c)]['Scene_Base_create']=Scene_Base[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Base[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x3924dd=_0x54467d;VisuMZ[_0x3924dd(0x98c)]['Scene_Base_create'][_0x3924dd(0x52e)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x54467d(0x7f5)]=Scene_Map[_0x54467d(0x895)]['createSpriteset'],Scene_Map[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0xe1d47f=_0x54467d;VisuMZ[_0xe1d47f(0x98c)]['Scene_Map_createSpriteset'][_0xe1d47f(0x52e)](this),$spriteset=this[_0xe1d47f(0x775)];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x59a)]=Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)],Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0x113f67=_0x54467d;VisuMZ[_0x113f67(0x98c)][_0x113f67(0x59a)]['call'](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x54467d(0x223)]=Scene_Base[_0x54467d(0x895)][_0x54467d(0x2d3)],Scene_Base[_0x54467d(0x895)]['terminate']=function(){const _0x21bbd4=_0x54467d;VisuMZ['CoreEngine'][_0x21bbd4(0x223)][_0x21bbd4(0x52e)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine']['BattleManager_update']=BattleManager['update'],BattleManager[_0x54467d(0x6f1)]=function(_0x3a7884){const _0x3b7118=_0x54467d;VisuMZ[_0x3b7118(0x98c)][_0x3b7118(0x935)][_0x3b7118(0x52e)](this,_0x3a7884),$subject=this[_0x3b7118(0x2d4)],$targets=this[_0x3b7118(0x7f3)],$target=this['_target']||this[_0x3b7118(0x7f3)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x54467d(0x7ce)]=Game_Event[_0x54467d(0x895)][_0x54467d(0x2a2)],Game_Event['prototype'][_0x54467d(0x2a2)]=function(){const _0x4499e0=_0x54467d;VisuMZ[_0x4499e0(0x98c)]['Game_Event_start'][_0x4499e0(0x52e)](this),$event=this;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x673)]=Scene_Map[_0x54467d(0x895)][_0x54467d(0x6f1)],Scene_Map['prototype']['update']=function(){const _0x32bd43=_0x54467d;VisuMZ[_0x32bd43(0x98c)][_0x32bd43(0x673)][_0x32bd43(0x52e)](this),$gameMap[_0x32bd43(0x4a2)]();},Game_Map[_0x54467d(0x895)][_0x54467d(0x4a2)]=function(){const _0x1ed6b9=_0x54467d;!this[_0x1ed6b9(0x470)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x3cfbd9){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x3cfbd9);},$onceParallel=function(_0xcc5eb0){const _0x2b1dd7=_0x54467d;if(SceneManager[_0x2b1dd7(0x425)]())$scene[_0x2b1dd7(0x1d1)](_0xcc5eb0);else{if(SceneManager[_0x2b1dd7(0x73f)]()){if(Imported[_0x2b1dd7(0x202)]){if(_0x2b1dd7(0x979)===_0x2b1dd7(0x498))for(const _0x42da8b of _0x4ed587[_0x2b1dd7(0x18f)]){const _0x2440a2=new _0x234fc8(_0x42da8b);this[_0x2b1dd7(0x2c0)](_0x2440a2);}else $scene[_0x2b1dd7(0x1d1)](_0xcc5eb0);}else $gameTemp&&$gameTemp[_0x2b1dd7(0x595)]()&&alert(_0x2b1dd7(0x45d));}else $gameTemp&&$gameTemp[_0x2b1dd7(0x595)]()&&alert(_0x2b1dd7(0x8d4));}});;StorageManager[_0x54467d(0x114)]=function(_0x53fc9e){return new Promise((_0xd3f793,_0x303984)=>{const _0x5f2bad=_0x3325;try{const _0x20a2d0=pako[_0x5f2bad(0x395)](_0x53fc9e,{'to':_0x5f2bad(0x8b9),'level':0x1});if(_0x20a2d0[_0x5f2bad(0x959)]>=0xc350){}_0xd3f793(_0x20a2d0);}catch(_0x27bc91){_0x303984(_0x27bc91);}});},TextManager['stringKeyMap']=['','','','CANCEL','','',_0x54467d(0x20d),'','BACKSPACE',_0x54467d(0x7ba),'','',_0x54467d(0x565),_0x54467d(0x7fa),_0x54467d(0x8e6),'','SHIFT',_0x54467d(0x63b),_0x54467d(0x586),_0x54467d(0x39e),'CAPSLOCK','KANA','EISU','JUNJA',_0x54467d(0x584),'HANJA','',_0x54467d(0x7b1),'CONVERT',_0x54467d(0x29a),_0x54467d(0x1a6),'MODECHANGE','SPACE',_0x54467d(0x2d0),'PGDN','END',_0x54467d(0x366),_0x54467d(0x1a8),'UP',_0x54467d(0x5d8),'DOWN',_0x54467d(0x730),_0x54467d(0x3a9),_0x54467d(0x54d),_0x54467d(0x32d),_0x54467d(0x3d4),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x54467d(0x7d4),_0x54467d(0x220),_0x54467d(0x923),_0x54467d(0x7b0),_0x54467d(0x708),_0x54467d(0x1bf),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x54467d(0x830),'',_0x54467d(0xef),'','SLEEP',_0x54467d(0x516),_0x54467d(0x23c),'NUMPAD2','NUMPAD3',_0x54467d(0x4ca),_0x54467d(0x5e1),_0x54467d(0x28c),_0x54467d(0x410),_0x54467d(0x103),_0x54467d(0x80b),_0x54467d(0x83d),_0x54467d(0x503),_0x54467d(0x148),_0x54467d(0x568),_0x54467d(0x133),_0x54467d(0x733),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x54467d(0x580),_0x54467d(0x7ef),_0x54467d(0x57a),_0x54467d(0x6aa),'F14','F15',_0x54467d(0x5b9),'F17','F18',_0x54467d(0x973),_0x54467d(0x1f4),'F21',_0x54467d(0x917),_0x54467d(0x1a3),_0x54467d(0x797),'','','','','','','','',_0x54467d(0x277),_0x54467d(0x805),_0x54467d(0x6bb),_0x54467d(0x477),_0x54467d(0x130),_0x54467d(0x328),_0x54467d(0x614),'','','','','','','','','',_0x54467d(0x1ad),_0x54467d(0x276),_0x54467d(0x6ba),_0x54467d(0x77e),_0x54467d(0x3ee),'PERCENT',_0x54467d(0x388),'UNDERSCORE','OPEN_PAREN',_0x54467d(0x4d8),_0x54467d(0x499),_0x54467d(0x11c),_0x54467d(0xd3),'HYPHEN_MINUS',_0x54467d(0x691),'CLOSE_CURLY_BRACKET',_0x54467d(0x2e2),'','','','',_0x54467d(0x7f1),'VOLUME_DOWN',_0x54467d(0x542),'','',_0x54467d(0x220),_0x54467d(0x7b0),_0x54467d(0x3ef),'MINUS','PERIOD',_0x54467d(0x375),_0x54467d(0x791),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x54467d(0x3d1),_0x54467d(0x539),_0x54467d(0x44a),_0x54467d(0x401),'','META',_0x54467d(0x656),'',_0x54467d(0x878),'WIN_ICO_00','',_0x54467d(0xcd),'','',_0x54467d(0x50e),'WIN_OEM_JUMP',_0x54467d(0x4ac),_0x54467d(0x86f),_0x54467d(0x263),_0x54467d(0x80f),'WIN_OEM_CUSEL',_0x54467d(0x16f),'WIN_OEM_FINISH',_0x54467d(0x71f),_0x54467d(0x635),_0x54467d(0x3c0),'WIN_OEM_BACKTAB',_0x54467d(0x8e5),_0x54467d(0x986),_0x54467d(0x73b),_0x54467d(0x275),_0x54467d(0x65a),'ZOOM','',_0x54467d(0x3f1),_0x54467d(0x473),''],TextManager[_0x54467d(0x7d9)]=VisuMZ[_0x54467d(0x98c)]['Settings']['ButtonAssist'][_0x54467d(0x65b)],TextManager['buttonAssistCancel']=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x348)][_0x54467d(0x7e8)],TextManager[_0x54467d(0x2cd)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x348)]['SwitchActorText'],VisuMZ['CoreEngine'][_0x54467d(0x16c)]=TextManager[_0x54467d(0x80a)],TextManager['param']=function(_0x469bb8){const _0x1a995c=_0x54467d;if(typeof _0x469bb8===_0x1a995c(0x4be)){if(_0x1a995c(0x3b5)===_0x1a995c(0x44d)){const _0x2afdcc=this['context'],_0x11970e=_0x2afdcc[_0x1a995c(0x4e5)];_0x5f0acc=_0x178db9||0xffffffff;let _0x45ea80=_0x129aed,_0x330a60=_0x1a6d19[_0x1a995c(0xe2)](_0x3feae4+0x18/0x2+this[_0x1a995c(0x48c)]*0.35);_0x4ddcc5===_0x1a995c(0x226)&&(_0x45ea80+=_0x3bec53/0x2),_0x405f0d===_0x1a995c(0x49d)&&(_0x45ea80+=_0x410df9),_0x2afdcc[_0x1a995c(0xc6)](),_0x2afdcc[_0x1a995c(0x159)]=this[_0x1a995c(0x22d)](),_0x2afdcc[_0x1a995c(0x451)]=_0x52aebf,_0x2afdcc[_0x1a995c(0x540)]=_0x1a995c(0x66c),_0x2afdcc[_0x1a995c(0x4e5)]=0x1,this[_0x1a995c(0x144)](_0x2de732,_0x45ea80,_0x330a60,_0x36048f),_0x2afdcc[_0x1a995c(0x4e5)]=_0x11970e,this[_0x1a995c(0x78e)](_0x71317d,_0x45ea80,_0x330a60,_0x40ad3a),_0x2afdcc[_0x1a995c(0x36e)](),this[_0x1a995c(0x8d8)][_0x1a995c(0x6f1)]();}else return VisuMZ[_0x1a995c(0x98c)]['TextManager_param'][_0x1a995c(0x52e)](this,_0x469bb8);}else{if(_0x1a995c(0x16a)===_0x1a995c(0x789))this[_0x1a995c(0x2e8)]()?(this['processCursorMoveModernControls'](),this[_0x1a995c(0x8f3)]()):_0x465480['CoreEngine'][_0x1a995c(0x6b5)][_0x1a995c(0x52e)](this);else return this[_0x1a995c(0x14b)](_0x469bb8);}},TextManager['paramName']=function(_0x2c04f7){const _0x5b25f5=_0x54467d;_0x2c04f7=String(_0x2c04f7||'')[_0x5b25f5(0x879)]();const _0x19ca7d=VisuMZ[_0x5b25f5(0x98c)][_0x5b25f5(0x357)][_0x5b25f5(0x1e2)];if(_0x2c04f7===_0x5b25f5(0x19d))return $dataSystem[_0x5b25f5(0x5ff)][_0x5b25f5(0x4a7)][0x0];if(_0x2c04f7==='MAXMP')return $dataSystem[_0x5b25f5(0x5ff)][_0x5b25f5(0x4a7)][0x1];if(_0x2c04f7===_0x5b25f5(0x1ef))return $dataSystem[_0x5b25f5(0x5ff)][_0x5b25f5(0x4a7)][0x2];if(_0x2c04f7==='DEF')return $dataSystem['terms'][_0x5b25f5(0x4a7)][0x3];if(_0x2c04f7==='MAT')return $dataSystem[_0x5b25f5(0x5ff)][_0x5b25f5(0x4a7)][0x4];if(_0x2c04f7==='MDF')return $dataSystem[_0x5b25f5(0x5ff)]['params'][0x5];if(_0x2c04f7==='AGI')return $dataSystem[_0x5b25f5(0x5ff)]['params'][0x6];if(_0x2c04f7===_0x5b25f5(0x96a))return $dataSystem['terms'][_0x5b25f5(0x4a7)][0x7];if(_0x2c04f7==='HIT')return _0x19ca7d[_0x5b25f5(0x4e9)];if(_0x2c04f7==='EVA')return _0x19ca7d[_0x5b25f5(0x438)];if(_0x2c04f7===_0x5b25f5(0x94e))return _0x19ca7d[_0x5b25f5(0xf6)];if(_0x2c04f7===_0x5b25f5(0x28f))return _0x19ca7d[_0x5b25f5(0x2ed)];if(_0x2c04f7==='MEV')return _0x19ca7d[_0x5b25f5(0x1f6)];if(_0x2c04f7===_0x5b25f5(0x497))return _0x19ca7d[_0x5b25f5(0x856)];if(_0x2c04f7===_0x5b25f5(0x5b4))return _0x19ca7d[_0x5b25f5(0x444)];if(_0x2c04f7===_0x5b25f5(0x92a))return _0x19ca7d[_0x5b25f5(0x35b)];if(_0x2c04f7===_0x5b25f5(0x143))return _0x19ca7d[_0x5b25f5(0x251)];if(_0x2c04f7===_0x5b25f5(0x13e))return _0x19ca7d[_0x5b25f5(0x508)];if(_0x2c04f7==='TGR')return _0x19ca7d[_0x5b25f5(0x892)];if(_0x2c04f7===_0x5b25f5(0x1c0))return _0x19ca7d[_0x5b25f5(0x53a)];if(_0x2c04f7===_0x5b25f5(0x44c))return _0x19ca7d[_0x5b25f5(0x5b6)];if(_0x2c04f7===_0x5b25f5(0x6d4))return _0x19ca7d['SParamVocab3'];if(_0x2c04f7===_0x5b25f5(0x412))return _0x19ca7d[_0x5b25f5(0x305)];if(_0x2c04f7==='TCR')return _0x19ca7d[_0x5b25f5(0x221)];if(_0x2c04f7===_0x5b25f5(0x53e))return _0x19ca7d[_0x5b25f5(0x8fd)];if(_0x2c04f7==='MDR')return _0x19ca7d[_0x5b25f5(0x4b9)];if(_0x2c04f7===_0x5b25f5(0x5f8))return _0x19ca7d['SParamVocab8'];if(_0x2c04f7==='EXR')return _0x19ca7d[_0x5b25f5(0x594)];if(VisuMZ[_0x5b25f5(0x98c)][_0x5b25f5(0x79a)][_0x2c04f7]){if(_0x5b25f5(0x3fa)===_0x5b25f5(0x482)){const _0x14f555=_0x5c43c6[_0x5b25f5(0x574)];if(!_0x14f555)return;!_0x14f555[_0x5b25f5(0x76a)]&&(_0x1ced52[_0x5b25f5(0x53d)](),_0x14f555[_0x5b25f5(0x76a)]=new _0x6ecbdf(),_0x14f555[_0x5b25f5(0x2c0)](_0x14f555['_pictureCoordinatesWindow'])),_0x43d5ab['_pictureCoordinatesMode']===_0x555924&&(_0x4f2114[_0x5b25f5(0x37a)](),_0x14f555[_0x5b25f5(0x243)](_0x14f555[_0x5b25f5(0x76a)]),_0x14f555['_pictureCoordinatesWindow']=_0x55090d);}else return VisuMZ[_0x5b25f5(0x98c)][_0x5b25f5(0x79a)][_0x2c04f7];}return'';},TextManager[_0x54467d(0x307)]=function(_0x2f8662){const _0x6b8e53=_0x54467d,_0xbaa20e=Input[_0x6b8e53(0x2ba)]();return _0xbaa20e==='Keyboard'?this[_0x6b8e53(0x3e5)](_0x2f8662):this[_0x6b8e53(0x66e)](_0xbaa20e,_0x2f8662);},TextManager[_0x54467d(0x3e5)]=function(_0x836acd){const _0x4106f=_0x54467d;if(_0x836acd===_0x4106f(0xf3))_0x836acd=_0x4106f(0x2f9);if(_0x836acd===_0x4106f(0x687))_0x836acd=_0x4106f(0x2f9);let _0xa0b2f3=[];for(let _0x2b5e8b in Input[_0x4106f(0x368)]){if(_0x4106f(0x26e)!==_0x4106f(0xd1)){_0x2b5e8b=Number(_0x2b5e8b);if(_0x2b5e8b>=0x60&&_0x2b5e8b<=0x69)continue;if([0x12,0x20][_0x4106f(0x356)](_0x2b5e8b))continue;_0x836acd===Input['keyMapper'][_0x2b5e8b]&&_0xa0b2f3['push'](_0x2b5e8b);}else return _0x4c927e['CoreEngine'][_0x4106f(0x357)][_0x4106f(0x355)][_0x4106f(0x1aa)]?this[_0x4106f(0x248)]():_0x24e66a[_0x4106f(0x98c)][_0x4106f(0x518)][_0x4106f(0x52e)](this);}for(let _0x3e5428=0x0;_0x3e5428<_0xa0b2f3[_0x4106f(0x959)];_0x3e5428++){_0xa0b2f3[_0x3e5428]=TextManager[_0x4106f(0x71c)][_0xa0b2f3[_0x3e5428]];}return this[_0x4106f(0x743)](_0xa0b2f3);},TextManager[_0x54467d(0x743)]=function(_0x2d81ef){const _0x11853a=_0x54467d,_0x2576af=VisuMZ['CoreEngine'][_0x11853a(0x357)][_0x11853a(0x348)],_0x2896ee=_0x2576af['KeyUnlisted'],_0x586371=_0x2d81ef[_0x11853a(0x4b8)](),_0x2fbe30=_0x11853a(0x6b6)['format'](_0x586371);return _0x2576af[_0x2fbe30]?_0x2576af[_0x2fbe30]:_0x2896ee[_0x11853a(0x875)](_0x586371);},TextManager['getInputMultiButtonStrings']=function(_0x2126b0,_0x42346d){const _0x575b4b=_0x54467d,_0x269edb=VisuMZ['CoreEngine']['Settings'][_0x575b4b(0x348)],_0x3f6110=_0x269edb[_0x575b4b(0x400)],_0x25b913=this[_0x575b4b(0x307)](_0x2126b0),_0x126349=this[_0x575b4b(0x307)](_0x42346d);return _0x3f6110['format'](_0x25b913,_0x126349);},TextManager[_0x54467d(0x66e)]=function(_0x1bc6cd,_0xadcb08){const _0x26352e=_0x54467d,_0x4a815a=_0x1bc6cd[_0x26352e(0x57d)]()[_0x26352e(0x747)](),_0x5d9f67=VisuMZ[_0x26352e(0x98c)][_0x26352e(0x569)][_0x4a815a];if(!_0x5d9f67)return this[_0x26352e(0x514)](_0x1bc6cd,_0xadcb08);return _0x5d9f67[_0xadcb08]||this[_0x26352e(0x3e5)](_0x1bc6cd,_0xadcb08);},TextManager[_0x54467d(0x514)]=function(_0x1c9d6c,_0x437969){const _0x47e18a=_0x54467d,_0x58cb9a=_0x1c9d6c[_0x47e18a(0x57d)]()[_0x47e18a(0x747)]();for(const _0xb51c89 in VisuMZ[_0x47e18a(0x98c)]['ControllerMatches']){if(_0x58cb9a[_0x47e18a(0x356)](_0xb51c89)){const _0x284fbc=VisuMZ[_0x47e18a(0x98c)][_0x47e18a(0x35c)][_0xb51c89],_0xb076c6=VisuMZ[_0x47e18a(0x98c)][_0x47e18a(0x569)][_0x284fbc];return _0xb076c6[_0x437969]||this[_0x47e18a(0x3e5)](_0x437969);}}return this['getKeyboardInputButtonString'](_0x437969);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x236)]=ColorManager[_0x54467d(0x3e2)],ColorManager['loadWindowskin']=function(){const _0x5e5d95=_0x54467d;VisuMZ[_0x5e5d95(0x98c)][_0x5e5d95(0x236)][_0x5e5d95(0x52e)](this),this[_0x5e5d95(0x38e)]=this[_0x5e5d95(0x38e)]||{};},ColorManager[_0x54467d(0x7b7)]=function(_0x40c763,_0x1ef261){const _0x57455b=_0x54467d;return _0x1ef261=String(_0x1ef261),this['_colorCache']=this[_0x57455b(0x38e)]||{},_0x1ef261['match'](/#(.*)/i)?this[_0x57455b(0x38e)][_0x40c763]='#%1'[_0x57455b(0x875)](String(RegExp['$1'])):_0x57455b(0x59b)!==_0x57455b(0x59b)?(this[_0x57455b(0x6eb)]=_0x184c6b,this[_0x57455b(0x89e)]=_0x2d1dff):this[_0x57455b(0x38e)][_0x40c763]=this[_0x57455b(0x8be)](Number(_0x1ef261)),this[_0x57455b(0x38e)][_0x40c763];},ColorManager[_0x54467d(0x562)]=function(_0x3109f9){const _0x4ee598=_0x54467d;return _0x3109f9=String(_0x3109f9),_0x3109f9[_0x4ee598(0x8b6)](/#(.*)/i)?_0x4ee598(0x664)[_0x4ee598(0x875)](String(RegExp['$1'])):this[_0x4ee598(0x8be)](Number(_0x3109f9));},ColorManager[_0x54467d(0x452)]=function(){this['_colorCache']={};},ColorManager['normalColor']=function(){const _0x56c4c6=_0x54467d,_0x337997=_0x56c4c6(0x8d7);this[_0x56c4c6(0x38e)]=this[_0x56c4c6(0x38e)]||{};if(this[_0x56c4c6(0x38e)][_0x337997])return this[_0x56c4c6(0x38e)][_0x337997];const _0x2c9229=VisuMZ['CoreEngine'][_0x56c4c6(0x357)][_0x56c4c6(0x211)]['ColorNormal'];return this[_0x56c4c6(0x7b7)](_0x337997,_0x2c9229);},ColorManager[_0x54467d(0x3e4)]=function(){const _0x2ac43a=_0x54467d,_0xc5c629='_stored_systemColor';this[_0x2ac43a(0x38e)]=this[_0x2ac43a(0x38e)]||{};if(this[_0x2ac43a(0x38e)][_0xc5c629])return this[_0x2ac43a(0x38e)][_0xc5c629];const _0x5697dc=VisuMZ[_0x2ac43a(0x98c)]['Settings'][_0x2ac43a(0x211)][_0x2ac43a(0x180)];return this[_0x2ac43a(0x7b7)](_0xc5c629,_0x5697dc);},ColorManager[_0x54467d(0x152)]=function(){const _0x121ff9=_0x54467d,_0x2d8fd0=_0x121ff9(0x72f);this[_0x121ff9(0x38e)]=this[_0x121ff9(0x38e)]||{};if(this['_colorCache'][_0x2d8fd0])return this[_0x121ff9(0x38e)][_0x2d8fd0];const _0x5a8343=VisuMZ[_0x121ff9(0x98c)][_0x121ff9(0x357)]['Color']['ColorCrisis'];return this[_0x121ff9(0x7b7)](_0x2d8fd0,_0x5a8343);},ColorManager['deathColor']=function(){const _0x1cbd95=_0x54467d,_0x3412a2='_stored_deathColor';this[_0x1cbd95(0x38e)]=this[_0x1cbd95(0x38e)]||{};if(this[_0x1cbd95(0x38e)][_0x3412a2])return this[_0x1cbd95(0x38e)][_0x3412a2];const _0x62a4f1=VisuMZ[_0x1cbd95(0x98c)][_0x1cbd95(0x357)][_0x1cbd95(0x211)]['ColorDeath'];return this['getColorDataFromPluginParameters'](_0x3412a2,_0x62a4f1);},ColorManager[_0x54467d(0x665)]=function(){const _0x3d9824=_0x54467d,_0x370cf1='_stored_gaugeBackColor';this[_0x3d9824(0x38e)]=this[_0x3d9824(0x38e)]||{};if(this[_0x3d9824(0x38e)][_0x370cf1])return this[_0x3d9824(0x38e)][_0x370cf1];const _0x21931b=VisuMZ['CoreEngine']['Settings']['Color'][_0x3d9824(0x52d)];return this['getColorDataFromPluginParameters'](_0x370cf1,_0x21931b);},ColorManager['hpGaugeColor1']=function(){const _0x53ed0d=_0x54467d,_0x225c7e='_stored_hpGaugeColor1';this[_0x53ed0d(0x38e)]=this[_0x53ed0d(0x38e)]||{};if(this[_0x53ed0d(0x38e)][_0x225c7e])return this[_0x53ed0d(0x38e)][_0x225c7e];const _0x3a61ac=VisuMZ[_0x53ed0d(0x98c)][_0x53ed0d(0x357)][_0x53ed0d(0x211)][_0x53ed0d(0x212)];return this[_0x53ed0d(0x7b7)](_0x225c7e,_0x3a61ac);},ColorManager['hpGaugeColor2']=function(){const _0x41c15a=_0x54467d,_0x3d78d1=_0x41c15a(0x3f6);this[_0x41c15a(0x38e)]=this[_0x41c15a(0x38e)]||{};if(this[_0x41c15a(0x38e)][_0x3d78d1])return this[_0x41c15a(0x38e)][_0x3d78d1];const _0x4d9df5=VisuMZ[_0x41c15a(0x98c)][_0x41c15a(0x357)][_0x41c15a(0x211)][_0x41c15a(0x18d)];return this['getColorDataFromPluginParameters'](_0x3d78d1,_0x4d9df5);},ColorManager['mpGaugeColor1']=function(){const _0x57b13b=_0x54467d,_0x2677fe=_0x57b13b(0x88b);this[_0x57b13b(0x38e)]=this[_0x57b13b(0x38e)]||{};if(this[_0x57b13b(0x38e)][_0x2677fe])return this[_0x57b13b(0x38e)][_0x2677fe];const _0x225fe8=VisuMZ[_0x57b13b(0x98c)]['Settings'][_0x57b13b(0x211)][_0x57b13b(0x9a9)];return this[_0x57b13b(0x7b7)](_0x2677fe,_0x225fe8);},ColorManager[_0x54467d(0x6e9)]=function(){const _0x3c4ba8=_0x54467d,_0x29cb0a=_0x3c4ba8(0x7e3);this[_0x3c4ba8(0x38e)]=this[_0x3c4ba8(0x38e)]||{};if(this[_0x3c4ba8(0x38e)][_0x29cb0a])return this[_0x3c4ba8(0x38e)][_0x29cb0a];const _0x5e66f7=VisuMZ[_0x3c4ba8(0x98c)][_0x3c4ba8(0x357)][_0x3c4ba8(0x211)][_0x3c4ba8(0x78d)];return this[_0x3c4ba8(0x7b7)](_0x29cb0a,_0x5e66f7);},ColorManager[_0x54467d(0x1a7)]=function(){const _0xb94165=_0x54467d,_0x39b8d1='_stored_mpCostColor';this[_0xb94165(0x38e)]=this[_0xb94165(0x38e)]||{};if(this[_0xb94165(0x38e)][_0x39b8d1])return this[_0xb94165(0x38e)][_0x39b8d1];const _0x4accc5=VisuMZ[_0xb94165(0x98c)][_0xb94165(0x357)][_0xb94165(0x211)][_0xb94165(0x362)];return this[_0xb94165(0x7b7)](_0x39b8d1,_0x4accc5);},ColorManager[_0x54467d(0x8e0)]=function(){const _0x5b7466=_0x54467d,_0x2fd477=_0x5b7466(0x9b1);this['_colorCache']=this[_0x5b7466(0x38e)]||{};if(this[_0x5b7466(0x38e)][_0x2fd477])return this['_colorCache'][_0x2fd477];const _0x1d5653=VisuMZ[_0x5b7466(0x98c)][_0x5b7466(0x357)][_0x5b7466(0x211)][_0x5b7466(0x364)];return this[_0x5b7466(0x7b7)](_0x2fd477,_0x1d5653);},ColorManager[_0x54467d(0x3e6)]=function(){const _0x2e4a19=_0x54467d,_0x2457ff=_0x2e4a19(0x367);this['_colorCache']=this['_colorCache']||{};if(this[_0x2e4a19(0x38e)][_0x2457ff])return this[_0x2e4a19(0x38e)][_0x2457ff];const _0x2dda3d=VisuMZ[_0x2e4a19(0x98c)][_0x2e4a19(0x357)][_0x2e4a19(0x211)][_0x2e4a19(0x437)];return this['getColorDataFromPluginParameters'](_0x2457ff,_0x2dda3d);},ColorManager[_0x54467d(0x842)]=function(){const _0x1fcd87=_0x54467d,_0x358c48=_0x1fcd87(0xd6);this[_0x1fcd87(0x38e)]=this[_0x1fcd87(0x38e)]||{};if(this['_colorCache'][_0x358c48])return this[_0x1fcd87(0x38e)][_0x358c48];const _0x486360=VisuMZ[_0x1fcd87(0x98c)][_0x1fcd87(0x357)][_0x1fcd87(0x211)][_0x1fcd87(0x796)];return this[_0x1fcd87(0x7b7)](_0x358c48,_0x486360);},ColorManager['ctGaugeColor2']=function(){const _0x53c0d4=_0x54467d,_0x386c9c=_0x53c0d4(0x8fc);this[_0x53c0d4(0x38e)]=this[_0x53c0d4(0x38e)]||{};if(this[_0x53c0d4(0x38e)][_0x386c9c])return this['_colorCache'][_0x386c9c];const _0x73f5f8=VisuMZ[_0x53c0d4(0x98c)][_0x53c0d4(0x357)][_0x53c0d4(0x211)][_0x53c0d4(0x2c9)];return this['getColorDataFromPluginParameters'](_0x386c9c,_0x73f5f8);},ColorManager[_0x54467d(0x47f)]=function(){const _0x6d9dad=_0x54467d,_0x5e5b8f=_0x6d9dad(0x871);this[_0x6d9dad(0x38e)]=this['_colorCache']||{};if(this['_colorCache'][_0x5e5b8f])return this[_0x6d9dad(0x38e)][_0x5e5b8f];const _0xa044f5=VisuMZ['CoreEngine'][_0x6d9dad(0x357)][_0x6d9dad(0x211)][_0x6d9dad(0x268)];return this['getColorDataFromPluginParameters'](_0x5e5b8f,_0xa044f5);},ColorManager['tpGaugeColor2']=function(){const _0x1f59f0=_0x54467d,_0x2a2f4c=_0x1f59f0(0x23b);this[_0x1f59f0(0x38e)]=this[_0x1f59f0(0x38e)]||{};if(this[_0x1f59f0(0x38e)][_0x2a2f4c])return this['_colorCache'][_0x2a2f4c];const _0x11179d=VisuMZ[_0x1f59f0(0x98c)]['Settings'][_0x1f59f0(0x211)][_0x1f59f0(0x958)];return this[_0x1f59f0(0x7b7)](_0x2a2f4c,_0x11179d);},ColorManager[_0x54467d(0x9be)]=function(){const _0x2247b4=_0x54467d,_0x4cd12a=_0x2247b4(0x94d);this[_0x2247b4(0x38e)]=this[_0x2247b4(0x38e)]||{};if(this[_0x2247b4(0x38e)][_0x4cd12a])return this['_colorCache'][_0x4cd12a];const _0x250a5a=VisuMZ[_0x2247b4(0x98c)]['Settings'][_0x2247b4(0x211)][_0x2247b4(0x731)];return this[_0x2247b4(0x7b7)](_0x4cd12a,_0x250a5a);},ColorManager[_0x54467d(0x52f)]=function(){const _0x42c573=_0x54467d,_0x8dbe9=_0x42c573(0x42c);this[_0x42c573(0x38e)]=this[_0x42c573(0x38e)]||{};if(this[_0x42c573(0x38e)][_0x8dbe9])return this[_0x42c573(0x38e)][_0x8dbe9];const _0x3ea3b8=VisuMZ['CoreEngine'][_0x42c573(0x357)]['Color']['ColorTPCost'];return this[_0x42c573(0x7b7)](_0x8dbe9,_0x3ea3b8);},ColorManager[_0x54467d(0x403)]=function(){const _0x183b36=_0x54467d,_0x3224f5=_0x183b36(0x283);this[_0x183b36(0x38e)]=this[_0x183b36(0x38e)]||{};if(this[_0x183b36(0x38e)][_0x3224f5])return this[_0x183b36(0x38e)][_0x3224f5];const _0x2f0f69=VisuMZ['CoreEngine'][_0x183b36(0x357)]['Color'][_0x183b36(0x7a8)];return this[_0x183b36(0x7b7)](_0x3224f5,_0x2f0f69);},ColorManager[_0x54467d(0x92c)]=function(){const _0xea36b8=_0x54467d,_0x54ff69=_0xea36b8(0x995);this[_0xea36b8(0x38e)]=this['_colorCache']||{};if(this['_colorCache'][_0x54ff69])return this[_0xea36b8(0x38e)][_0x54ff69];const _0x6a18b5=VisuMZ[_0xea36b8(0x98c)][_0xea36b8(0x357)]['Color']['ColorExpGauge2'];return this[_0xea36b8(0x7b7)](_0x54ff69,_0x6a18b5);},ColorManager[_0x54467d(0x2c7)]=function(){const _0x4d6d46=_0x54467d,_0x563540=_0x4d6d46(0x5b7);this['_colorCache']=this[_0x4d6d46(0x38e)]||{};if(this['_colorCache'][_0x563540])return this[_0x4d6d46(0x38e)][_0x563540];const _0x13ed23=VisuMZ[_0x4d6d46(0x98c)]['Settings'][_0x4d6d46(0x211)]['ColorMaxLvGauge1'];return this['getColorDataFromPluginParameters'](_0x563540,_0x13ed23);},ColorManager[_0x54467d(0x31c)]=function(){const _0x4640c5=_0x54467d,_0x1102b5=_0x4640c5(0x843);this[_0x4640c5(0x38e)]=this[_0x4640c5(0x38e)]||{};if(this[_0x4640c5(0x38e)][_0x1102b5])return this['_colorCache'][_0x1102b5];const _0xe54bfc=VisuMZ[_0x4640c5(0x98c)]['Settings'][_0x4640c5(0x211)]['ColorMaxLvGauge2'];return this['getColorDataFromPluginParameters'](_0x1102b5,_0xe54bfc);},ColorManager[_0x54467d(0x6be)]=function(_0x15a3ba){const _0x9c471e=_0x54467d;return VisuMZ[_0x9c471e(0x98c)][_0x9c471e(0x357)][_0x9c471e(0x211)][_0x9c471e(0x825)]['call'](this,_0x15a3ba);},ColorManager[_0x54467d(0x82c)]=function(_0x3fc1b1){const _0x12bffe=_0x54467d;return VisuMZ[_0x12bffe(0x98c)][_0x12bffe(0x357)]['Color'][_0x12bffe(0x70b)][_0x12bffe(0x52e)](this,_0x3fc1b1);},ColorManager[_0x54467d(0x509)]=function(_0x32dcda){const _0x5eb51f=_0x54467d;return VisuMZ[_0x5eb51f(0x98c)]['Settings'][_0x5eb51f(0x211)][_0x5eb51f(0x4b2)][_0x5eb51f(0x52e)](this,_0x32dcda);},ColorManager[_0x54467d(0x427)]=function(_0x3c952c){const _0x15103a=_0x54467d;return VisuMZ[_0x15103a(0x98c)][_0x15103a(0x357)][_0x15103a(0x211)][_0x15103a(0x231)][_0x15103a(0x52e)](this,_0x3c952c);},ColorManager[_0x54467d(0x505)]=function(_0x20d10d){const _0x5668c8=_0x54467d;return VisuMZ['CoreEngine'][_0x5668c8(0x357)]['Color'][_0x5668c8(0x331)][_0x5668c8(0x52e)](this,_0x20d10d);},ColorManager[_0x54467d(0xf8)]=function(){const _0x2da89f=_0x54467d;return VisuMZ[_0x2da89f(0x98c)][_0x2da89f(0x357)]['Color'][_0x2da89f(0x930)];},ColorManager[_0x54467d(0x3bd)]=function(){const _0x2f144c=_0x54467d;return VisuMZ[_0x2f144c(0x98c)][_0x2f144c(0x357)][_0x2f144c(0x211)][_0x2f144c(0x768)]||_0x2f144c(0x87b);},ColorManager[_0x54467d(0x2c2)]=function(){const _0x1ef0fa=_0x54467d;return VisuMZ['CoreEngine'][_0x1ef0fa(0x357)][_0x1ef0fa(0x211)][_0x1ef0fa(0x536)]||_0x1ef0fa(0x640);},ColorManager[_0x54467d(0x7f7)]=function(){const _0x297662=_0x54467d;return VisuMZ['CoreEngine'][_0x297662(0x357)]['Color'][_0x297662(0x6d1)];},ColorManager['dimColor2']=function(){const _0x51eb87=_0x54467d;return VisuMZ['CoreEngine'][_0x51eb87(0x357)][_0x51eb87(0x211)][_0x51eb87(0x306)];},ColorManager['itemBackColor1']=function(){const _0x289406=_0x54467d;return VisuMZ[_0x289406(0x98c)][_0x289406(0x357)][_0x289406(0x211)][_0x289406(0x89b)];},ColorManager[_0x54467d(0x520)]=function(){const _0x110680=_0x54467d;return VisuMZ['CoreEngine']['Settings'][_0x110680(0x211)][_0x110680(0x971)];},SceneManager[_0x54467d(0x84a)]=[],SceneManager['isSceneBattle']=function(){const _0x459ad0=_0x54467d;return this[_0x459ad0(0x574)]&&this[_0x459ad0(0x574)][_0x459ad0(0x615)]===Scene_Battle;},SceneManager[_0x54467d(0x425)]=function(){const _0x505549=_0x54467d;return this[_0x505549(0x574)]&&this['_scene'][_0x505549(0x615)]===Scene_Map;},SceneManager[_0x54467d(0x658)]=function(){const _0xaa507=_0x54467d;return this['_scene']&&this[_0xaa507(0x574)]instanceof Scene_Map;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x83b)]=SceneManager[_0x54467d(0x15b)],SceneManager[_0x54467d(0x15b)]=function(){const _0x29d6d3=_0x54467d;VisuMZ[_0x29d6d3(0x98c)][_0x29d6d3(0x83b)]['call'](this),this[_0x29d6d3(0x588)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x28b)]=SceneManager[_0x54467d(0x940)],SceneManager[_0x54467d(0x940)]=function(_0x4c2670){const _0x377b77=_0x54467d;if($gameTemp)this[_0x377b77(0x85f)](_0x4c2670);VisuMZ[_0x377b77(0x98c)][_0x377b77(0x28b)][_0x377b77(0x52e)](this,_0x4c2670);},SceneManager['onKeyDownKeysF6F7']=function(_0x12a15f){const _0x28f497=_0x54467d;if(!_0x12a15f['ctrlKey']&&!_0x12a15f[_0x28f497(0x8c5)])switch(_0x12a15f[_0x28f497(0x38d)]){case 0x54:this[_0x28f497(0x836)]();break;case 0x75:this[_0x28f497(0x176)]();break;case 0x76:if(Input[_0x28f497(0x257)](_0x28f497(0x934))||Input['isPressed'](_0x28f497(0x68c)))return;this['playTestF7']();break;}},SceneManager[_0x54467d(0x176)]=function(){const _0x47ac6b=_0x54467d;if($gameTemp['isPlaytest']()&&VisuMZ['CoreEngine'][_0x47ac6b(0x357)]['QoL'][_0x47ac6b(0x99f)]){ConfigManager[_0x47ac6b(0x757)]!==0x0?'UvnSc'!=='UvnSc'?(_0x481b74[_0x47ac6b(0x368)][0x23]=_0x47ac6b(0x71b),_0x53ebe3['keyMapper'][0x24]='home'):(ConfigManager[_0x47ac6b(0x373)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager[_0x47ac6b(0x951)]=0x0,ConfigManager[_0x47ac6b(0x757)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager[_0x47ac6b(0x711)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x47ac6b(0xc6)]();if(this[_0x47ac6b(0x574)][_0x47ac6b(0x615)]===Scene_Options){if(this[_0x47ac6b(0x574)][_0x47ac6b(0x9bd)])this[_0x47ac6b(0x574)][_0x47ac6b(0x9bd)][_0x47ac6b(0x527)]();if(this['_scene'][_0x47ac6b(0x9a8)])this[_0x47ac6b(0x574)][_0x47ac6b(0x9a8)][_0x47ac6b(0x527)]();}}},SceneManager['playTestF7']=function(){const _0xd404e1=_0x54467d;$gameTemp[_0xd404e1(0x595)]()&&VisuMZ['CoreEngine']['Settings'][_0xd404e1(0x355)][_0xd404e1(0x852)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0xd404e1(0x577)]);},SceneManager[_0x54467d(0x836)]=function(){const _0x51305f=_0x54467d;if(!$gameTemp[_0x51305f(0x595)]())return;if(!SceneManager[_0x51305f(0x73f)]())return;for(const _0x34c976 of $gameParty[_0x51305f(0x124)]()){if(!_0x34c976)continue;_0x34c976[_0x51305f(0x293)](_0x34c976[_0x51305f(0x890)]());}},SceneManager['initVisuMZCoreEngine']=function(){const _0xa571a0=_0x54467d;this['_sideButtonLayout']=![],this[_0xa571a0(0x157)]=!VisuMZ[_0xa571a0(0x98c)]['Settings']['UI'][_0xa571a0(0x493)];},SceneManager[_0x54467d(0x460)]=function(_0xd4a55f){const _0xe7744d=_0x54467d;VisuMZ[_0xe7744d(0x98c)]['Settings']['UI'][_0xe7744d(0x3c3)]&&(_0xe7744d(0x8b1)!==_0xe7744d(0x8b1)?(_0x578063[_0xe7744d(0x98c)][_0xe7744d(0x4b5)][_0xe7744d(0x52e)](this),_0x52306c[_0xe7744d(0x97e)]()&&this[_0xe7744d(0x304)]()):this['_sideButtonLayout']=_0xd4a55f);},SceneManager['isSideButtonLayout']=function(){const _0x59dede=_0x54467d;return this[_0x59dede(0x599)];},SceneManager[_0x54467d(0x46c)]=function(){const _0x30ed0b=_0x54467d;return this[_0x30ed0b(0x157)];},SceneManager[_0x54467d(0x866)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ[_0x54467d(0x98c)]['SceneManager_isGameActive']=SceneManager[_0x54467d(0x6f6)],SceneManager[_0x54467d(0x6f6)]=function(){const _0x11388d=_0x54467d;if(VisuMZ[_0x11388d(0x98c)][_0x11388d(0x357)][_0x11388d(0x355)][_0x11388d(0x2d8)]){if(_0x11388d(0x78b)!==_0x11388d(0x78b)){if(!this[_0x11388d(0x967)]())return;_0xfce079=_0x1a910c||![],_0x17302b=_0x104b7f||![];if(_0x5b8f53[_0x5440ff]){const _0x2e6a55={'x':_0x583362,'y':_0x213a31,'animationId':_0x3ae9a1,'mirror':_0x7acd8e,'mute':_0x2fad72};this['_pointAnimationQueue']['push'](_0x2e6a55);}}else return VisuMZ[_0x11388d(0x98c)][_0x11388d(0x98b)][_0x11388d(0x52e)](this);}else{if('zLBDg'!==_0x11388d(0x166))return!![];else{if(!_0x488cc2['isSceneMap']())return;_0x3f8eec['_scene']['removeOnceParallelInterpreter'](this),_0xf703de['prototype'][_0x11388d(0x2d3)][_0x11388d(0x52e)](this);}}},SceneManager[_0x54467d(0x3ce)]=function(_0x5e0815){const _0x5ba335=_0x54467d;if(_0x5e0815 instanceof Error)this['catchNormalError'](_0x5e0815);else _0x5e0815 instanceof Array&&_0x5e0815[0x0]===_0x5ba335(0x7b3)?_0x5ba335(0x33e)===_0x5ba335(0x33e)?this[_0x5ba335(0x77f)](_0x5e0815):(this[_0x5ba335(0x6a5)]=this['_onceParallelInterpreters']||[],this[_0x5ba335(0x6a5)][_0x5ba335(0x37e)](_0x5715d0)):this[_0x5ba335(0x288)](_0x5e0815);this[_0x5ba335(0x6cc)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x518)]=BattleManager[_0x54467d(0x5e2)],BattleManager[_0x54467d(0x5e2)]=function(){const _0x165d4d=_0x54467d;return VisuMZ[_0x165d4d(0x98c)][_0x165d4d(0x357)][_0x165d4d(0x355)]['EscapeAlways']?this[_0x165d4d(0x248)]():VisuMZ[_0x165d4d(0x98c)][_0x165d4d(0x518)]['call'](this);},BattleManager[_0x54467d(0x248)]=function(){return $gameParty['performEscape'](),SoundManager['playEscape'](),this['onEscapeSuccess'](),!![];},BattleManager['isTpb']=function(){const _0x134fe2=_0x54467d;return $gameSystem[_0x134fe2(0x4a3)]()>=0x1;},BattleManager[_0x54467d(0x989)]=function(){const _0x1f16bb=_0x54467d;return $gameSystem[_0x1f16bb(0x4a3)]()===0x1;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1b1)]=Game_Temp[_0x54467d(0x895)][_0x54467d(0x15b)],Game_Temp['prototype']['initialize']=function(){const _0x42c05b=_0x54467d;VisuMZ[_0x42c05b(0x98c)][_0x42c05b(0x1b1)]['call'](this),this[_0x42c05b(0x73e)](),this[_0x42c05b(0x10d)](),this[_0x42c05b(0x8cc)]();},Game_Temp[_0x54467d(0x895)][_0x54467d(0x73e)]=function(){const _0x569bb8=_0x54467d;if(VisuMZ['CoreEngine'][_0x569bb8(0x357)][_0x569bb8(0x355)][_0x569bb8(0x620)]){if(_0x569bb8(0x629)===_0x569bb8(0x629))this[_0x569bb8(0x151)]=![];else return _0x4b2615[_0x569bb8(0x98c)][_0x569bb8(0x357)][_0x569bb8(0x355)][_0x569bb8(0x3ba)];}},Game_Temp[_0x54467d(0x895)][_0x54467d(0x62f)]=function(_0x4f2ca0){const _0x249027=_0x54467d;this[_0x249027(0x58e)]=_0x4f2ca0;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){const _0x5cda09=_0x54467d;return this[_0x5cda09(0x58e)];},Game_Temp['prototype'][_0x54467d(0x97a)]=function(){const _0x3c4da8=_0x54467d;this[_0x3c4da8(0x6eb)]=undefined,this[_0x3c4da8(0x89e)]=undefined;},Game_Temp[_0x54467d(0x895)][_0x54467d(0x5a3)]=function(_0x2d8535){const _0x3cb52b=_0x54467d;$gameMap&&$dataMap&&$dataMap[_0x3cb52b(0x944)]&&(_0x3cb52b(0x69f)==='ZHxTs'?this[_0x3cb52b(0x235)]($dataMap['note']):this[_0x3cb52b(0x61d)]((_0x5bf992-_0x525bb6+_0x34a610)%_0x2101e2));const _0xa08927=$dataTroops[_0x2d8535];if(_0xa08927){let _0x32c6cd=DataManager[_0x3cb52b(0x765)](_0xa08927['id']);this[_0x3cb52b(0x235)](_0x32c6cd);}},Game_Temp[_0x54467d(0x895)][_0x54467d(0x235)]=function(_0x81cc97){const _0x22b960=_0x54467d;if(!_0x81cc97)return;if(_0x81cc97[_0x22b960(0x8b6)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x22b960(0x6eb)]='FV';else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x22b960(0x6eb)]='SV';else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x172129=String(RegExp['$1']);if(_0x172129[_0x22b960(0x8b6)](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if(_0x22b960(0x2af)!==_0x22b960(0x2af))return _0x392466['CoreEngine'][_0x22b960(0x357)]['UI'][_0x22b960(0x25e)];else this[_0x22b960(0x6eb)]='FV';}else _0x172129['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x22b960(0x6eb)]='SV');}}}if(_0x81cc97['match'](/<(?:DTB)>/i))_0x22b960(0x2aa)!=='IpMFc'?this['_itemWindow'][_0x22b960(0x12a)](_0x40ff22[_0x22b960(0x88a)][_0x22b960(0x642)]):this[_0x22b960(0x89e)]=0x0;else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x22b960(0x89e)]=0x1;else{if(_0x81cc97['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x22b960(0x89e)]=0x2;else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:CTB)>/i)){if(_0x22b960(0x737)===_0x22b960(0xe3)){const _0x539b44=_0x3cd5bc['Symbol'];let _0x31077d=_0x36f4b7[_0x22b960(0x975)];if(['','Untitled'][_0x22b960(0x356)](_0x31077d))_0x31077d=_0x562a3e[_0x22b960(0x601)][_0x22b960(0x52e)](this);const _0x558e22=_0x11ade2[_0x22b960(0x62e)]['call'](this),_0x21bbf5=_0x59c759[_0x22b960(0x135)][_0x22b960(0x52e)](this);this['addCommand'](_0x31077d,_0x539b44,_0x558e22,_0x21bbf5),this['setHandler'](_0x539b44,_0x11d72f[_0x22b960(0xc7)][_0x22b960(0x11b)](this,_0x21bbf5));}else Imported[_0x22b960(0x349)]&&(this[_0x22b960(0x89e)]=_0x22b960(0x85b));}else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:STB)>/i)){if(_0x22b960(0x5fa)==='WMyyN')return _0x1ac6c6['layoutSettings'][_0x22b960(0x884)][_0x22b960(0x52e)](this);else Imported[_0x22b960(0x49a)]&&(this[_0x22b960(0x89e)]='STB');}else{if(_0x81cc97['match'](/<(?:BTB)>/i))_0x22b960(0x35d)===_0x22b960(0x35d)?Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x22b960(0x89e)]=_0x22b960(0x197)):this[_0x22b960(0xeb)](_0x4bfdf0['CoreEngine'][_0x22b960(0x357)]['Gold'][_0x22b960(0x631)],_0x36a67b,_0x1895fd,_0x3bdb42,_0x22b960(0x49d));else{if(_0x81cc97['match'](/<(?:FTB)>/i))Imported[_0x22b960(0x2bc)]&&(this['_forcedBattleSys']=_0x22b960(0x883));else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:OTB)>/i)){if(_0x22b960(0x26d)!==_0x22b960(0x26d))this['createPointAnimationSprite'](_0x79df12,_0x1d6426,_0x4955d8,_0x3372f,_0x14eb2f);else{if(Imported[_0x22b960(0x22b)]){if(_0x22b960(0x6ac)===_0x22b960(0x391)){if(_0x38a7ac&&_0x45956e[_0x22b960(0x17a)]){if(this['isGamepadButtonPressed'](_0x389148))return!![];if(this[_0x22b960(0x987)](_0x192b07))return!![];}}else this[_0x22b960(0x89e)]=_0x22b960(0x3b4);}}}else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:ETB)>/i))Imported[_0x22b960(0x504)]&&(_0x22b960(0x699)!==_0x22b960(0x310)?this[_0x22b960(0x89e)]=_0x22b960(0x2f5):this[_0x22b960(0xeb)](_0x2001cd,_0x1f1245,_0x3de860,_0x501d65,_0x22b960(0x49d)));else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(_0x22b960(0x40a)!==_0x22b960(0x40a)?this[_0x22b960(0x3fb)][_0x22b960(0x12a)](_0x2683ac['layoutSettings']['StatusBgType']):this[_0x22b960(0x89e)]='PTB');else{if(_0x81cc97[_0x22b960(0x8b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x22b960(0x87c)!==_0x22b960(0x87c))this[_0x22b960(0x581)]=_0x5c698a;else{const _0x26d761=String(RegExp['$1']);if(_0x26d761[_0x22b960(0x8b6)](/DTB/i))this[_0x22b960(0x89e)]=0x0;else{if(_0x26d761['match'](/(?:TPB|ATB)[ ]ACTIVE/i))_0x22b960(0x411)!==_0x22b960(0x411)?_0x53764d[_0x22b960(0x52c)]?this['backOpacity']=_0x4b1194[_0x22b960(0x52c)]():this[_0x22b960(0x2ca)]=_0x247317[_0x22b960(0x98c)][_0x22b960(0x357)][_0x22b960(0x8ca)][_0x22b960(0x3e7)]:this[_0x22b960(0x89e)]=0x1;else{if(_0x26d761[_0x22b960(0x8b6)](/(?:TPB|ATB)[ ]WAIT/i))_0x22b960(0x5b1)==='xhSTZ'?(_0x52ae34+=_0xfd5b7+'\x0a',_0x26dae7+=_0x22b960(0x72e),_0x2e6004[_0x22b960(0x3d2)][0x4]!==''&&_0x2b3168[_0x22b960(0x3d2)][0x4]!==_0x54e480&&(_0x4919cc+=_0x22b960(0x150)[_0x22b960(0x875)](_0x44fc77[_0x22b960(0x3d2)][0x4]))):this['_forcedBattleSys']=0x2;else{if(_0x26d761[_0x22b960(0x8b6)](/CTB/i))Imported[_0x22b960(0x349)]&&(this[_0x22b960(0x89e)]='CTB');else{if(_0x26d761[_0x22b960(0x8b6)](/STB/i))Imported[_0x22b960(0x49a)]&&(this[_0x22b960(0x89e)]=_0x22b960(0x5f5));else{if(_0x26d761[_0x22b960(0x8b6)](/BTB/i)){if(_0x22b960(0x6dc)===_0x22b960(0x6dc))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x22b960(0x197));else return _0x3df6c5[_0x22b960(0x98c)][_0x22b960(0x357)]['QoL'][_0x22b960(0x7ea)];}else{if(_0x26d761['match'](/FTB/i)){if(_0x22b960(0x313)!==_0x22b960(0x4f8))Imported[_0x22b960(0x2bc)]&&(this['_forcedBattleSys']='FTB');else{const _0x2c5362=_0x50dfaf[_0x22b960(0x98c)][_0x22b960(0x357)][_0x22b960(0x60d)][_0x5837be],_0x210b8b='img/%1/'[_0x22b960(0x875)](_0x30363d);for(const _0x5794de of _0x2c5362){_0x1a0f2b[_0x22b960(0x2a0)](_0x210b8b,_0x5794de);}}}else{if(_0x26d761['match'](/OTB/i))Imported[_0x22b960(0x22b)]&&(this[_0x22b960(0x89e)]=_0x22b960(0x3b4));else{if(_0x26d761[_0x22b960(0x8b6)](/ETB/i)){if(Imported['VisuMZ_2_BattleSystemETB']){if(_0x22b960(0x997)!==_0x22b960(0x8bc))this['_forcedBattleSys']=_0x22b960(0x2f5);else return _0x591c6e[_0x22b960(0x98c)][_0x22b960(0x518)]['call'](this);}}else _0x26d761['match'](/PTB/i)&&(Imported[_0x22b960(0x7fe)]&&(this[_0x22b960(0x89e)]='PTB'));}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x54467d(0x895)][_0x54467d(0x10d)]=function(){const _0x42056b=_0x54467d;this[_0x42056b(0x46f)]=[];},Game_Temp[_0x54467d(0x895)]['requestFauxAnimation']=function(_0x5cd714,_0x48d0e7,_0x5b815c,_0x4e5253){const _0x3b6d2f=_0x54467d;if(!this['showFauxAnimations']())return;_0x5b815c=_0x5b815c||![],_0x4e5253=_0x4e5253||![];if($dataAnimations[_0x48d0e7]){const _0x5068d6={'targets':_0x5cd714,'animationId':_0x48d0e7,'mirror':_0x5b815c,'mute':_0x4e5253};this[_0x3b6d2f(0x46f)][_0x3b6d2f(0x37e)](_0x5068d6);for(const _0x4a79d0 of _0x5cd714){if('kVMyO'===_0x3b6d2f(0x113))_0x4a79d0['startAnimation']&&_0x4a79d0['startAnimation']();else{const _0x58ffeb=_0x392195(_0x369dc0['$1']);if(_0x58ffeb[_0x3b6d2f(0x8b6)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x58ffeb[_0x3b6d2f(0x8b6)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}},Game_Temp['prototype'][_0x54467d(0x39b)]=function(){return!![];},Game_Temp[_0x54467d(0x895)][_0x54467d(0x3f9)]=function(){const _0x3e92d7=_0x54467d;return this[_0x3e92d7(0x46f)]['shift']();},Game_Temp[_0x54467d(0x895)][_0x54467d(0x8cc)]=function(){const _0x2db278=_0x54467d;this[_0x2db278(0x489)]=[];},Game_Temp[_0x54467d(0x895)]['requestPointAnimation']=function(_0xa83501,_0xe10b93,_0x3065c9,_0x1bd5d9,_0x10143c){const _0x14e020=_0x54467d;if(!this['showPointAnimations']())return;_0x1bd5d9=_0x1bd5d9||![],_0x10143c=_0x10143c||![];if($dataAnimations[_0x3065c9]){const _0x31d539={'x':_0xa83501,'y':_0xe10b93,'animationId':_0x3065c9,'mirror':_0x1bd5d9,'mute':_0x10143c};this[_0x14e020(0x489)]['push'](_0x31d539);}},Game_Temp[_0x54467d(0x895)][_0x54467d(0x967)]=function(){return!![];},Game_Temp[_0x54467d(0x895)][_0x54467d(0x624)]=function(){const _0x149403=_0x54467d;return this[_0x149403(0x489)][_0x149403(0x934)]();},VisuMZ['CoreEngine']['Game_System_initialize']=Game_System['prototype'][_0x54467d(0x15b)],Game_System[_0x54467d(0x895)][_0x54467d(0x15b)]=function(){const _0x6d7b7=_0x54467d;VisuMZ[_0x6d7b7(0x98c)][_0x6d7b7(0x7e7)][_0x6d7b7(0x52e)](this),this[_0x6d7b7(0x8f6)]();},Game_System['prototype'][_0x54467d(0x8f6)]=function(){const _0x5d5fc3=_0x54467d;this[_0x5d5fc3(0x506)]={'SideView':$dataSystem[_0x5d5fc3(0x325)],'BattleSystem':this[_0x5d5fc3(0x793)](),'FontSize':$dataSystem[_0x5d5fc3(0x88f)][_0x5d5fc3(0x48c)],'Padding':0xc};},Game_System['prototype'][_0x54467d(0x29e)]=function(){const _0x6a3abf=_0x54467d;if($gameTemp[_0x6a3abf(0x6eb)]==='SV'){if(_0x6a3abf(0x5c4)!=='Bzety')return!![];else this[_0x6a3abf(0x335)][_0x6a3abf(0x315)]=!![],this[_0x6a3abf(0x335)][_0x6a3abf(0x10b)]=_0x4c318f[_0x6a3abf(0x947)]||0x0;}else{if($gameTemp[_0x6a3abf(0x6eb)]==='FV'){if('aIxyD'!==_0x6a3abf(0x87f))return![];else{const _0x21114b=_0x6a3abf(0x545)[_0x6a3abf(0x875)](_0x1fb175[_0x6a3abf(0x55a)](0x3)),_0x37f5c5=new _0x3b909f(),_0xfc087c='data/'+_0x21114b;_0x37f5c5[_0x6a3abf(0x5fe)](_0x6a3abf(0x667),_0xfc087c),_0x37f5c5[_0x6a3abf(0x991)](_0x6a3abf(0x746)),_0x37f5c5[_0x6a3abf(0x745)]=()=>this[_0x6a3abf(0x1ec)](_0x37f5c5,_0x24f086,_0x21114b,_0xfc087c),_0x37f5c5[_0x6a3abf(0x250)]=()=>_0x326d97[_0x6a3abf(0x3cf)](_0x6a3abf(0x72d),_0x21114b,_0xfc087c),_0x37f5c5['send']();}}}if(this[_0x6a3abf(0x506)]===undefined)this['initCoreEngine']();if(this[_0x6a3abf(0x506)][_0x6a3abf(0x199)]===undefined)this['initCoreEngine']();return this['_CoreEngineSettings'][_0x6a3abf(0x199)];},Game_System[_0x54467d(0x895)][_0x54467d(0x3a2)]=function(_0x12a41f){const _0x4f7969=_0x54467d;if(this[_0x4f7969(0x506)]===undefined)this[_0x4f7969(0x8f6)]();if(this['_CoreEngineSettings'][_0x4f7969(0x199)]===undefined)this[_0x4f7969(0x8f6)]();this['_CoreEngineSettings'][_0x4f7969(0x199)]=_0x12a41f;},Game_System['prototype'][_0x54467d(0x2d2)]=function(){const _0x4fabf8=_0x54467d;if(this['_CoreEngineSettings']===undefined)this[_0x4fabf8(0x8f6)]();this[_0x4fabf8(0x506)]['BattleSystem']=this['initialBattleSystem']();},Game_System[_0x54467d(0x895)][_0x54467d(0x793)]=function(){const _0x3af921=_0x54467d,_0x539a39=(VisuMZ[_0x3af921(0x98c)][_0x3af921(0x357)][_0x3af921(0x12c)]||'DATABASE')['toUpperCase']()[_0x3af921(0x747)]();return VisuMZ[_0x3af921(0x98c)][_0x3af921(0x168)](_0x539a39);},Game_System['prototype'][_0x54467d(0x4a3)]=function(){const _0x573d72=_0x54467d;if($gameTemp[_0x573d72(0x89e)]!==undefined)return $gameTemp[_0x573d72(0x89e)];if(this[_0x573d72(0x506)]===undefined)this[_0x573d72(0x8f6)]();if(this[_0x573d72(0x506)][_0x573d72(0x12c)]===undefined)this[_0x573d72(0x2d2)]();return this['_CoreEngineSettings']['BattleSystem'];},Game_System[_0x54467d(0x895)][_0x54467d(0x13c)]=function(_0x46f9d6){const _0x4cd8d2=_0x54467d;if(this[_0x4cd8d2(0x506)]===undefined)this['initCoreEngine']();if(this[_0x4cd8d2(0x506)]['BattleSystem']===undefined)this[_0x4cd8d2(0x2d2)]();this[_0x4cd8d2(0x506)][_0x4cd8d2(0x12c)]=_0x46f9d6;},Game_System[_0x54467d(0x895)][_0x54467d(0x210)]=function(){const _0x1cb4f2=_0x54467d;if(this[_0x1cb4f2(0x506)]===undefined)this[_0x1cb4f2(0x8f6)]();if(this[_0x1cb4f2(0x506)]['FontSize']===undefined)this[_0x1cb4f2(0x8f6)]();return this['_CoreEngineSettings'][_0x1cb4f2(0x956)];},Game_System[_0x54467d(0x895)][_0x54467d(0x247)]=function(_0xbe8e77){const _0x4d6b5b=_0x54467d;if(this['_CoreEngineSettings']===undefined)this[_0x4d6b5b(0x8f6)]();if(this[_0x4d6b5b(0x506)][_0x4d6b5b(0x754)]===undefined)this[_0x4d6b5b(0x8f6)]();this[_0x4d6b5b(0x506)][_0x4d6b5b(0x956)]=_0xbe8e77;},Game_System[_0x54467d(0x895)][_0x54467d(0x110)]=function(){const _0x3845b6=_0x54467d;if(this[_0x3845b6(0x506)]===undefined)this[_0x3845b6(0x8f6)]();if(this['_CoreEngineSettings'][_0x3845b6(0x41a)]===undefined)this[_0x3845b6(0x8f6)]();return this[_0x3845b6(0x506)][_0x3845b6(0x41a)];},Game_System['prototype'][_0x54467d(0x643)]=function(_0x4aa818){const _0x2dba8e=_0x54467d;if(this[_0x2dba8e(0x506)]===undefined)this[_0x2dba8e(0x8f6)]();if(this[_0x2dba8e(0x506)][_0x2dba8e(0x754)]===undefined)this[_0x2dba8e(0x8f6)]();this[_0x2dba8e(0x506)][_0x2dba8e(0x41a)]=_0x4aa818;},VisuMZ['CoreEngine'][_0x54467d(0x2c3)]=Game_Screen[_0x54467d(0x895)][_0x54467d(0x15b)],Game_Screen[_0x54467d(0x895)]['initialize']=function(){const _0x1e93d6=_0x54467d;VisuMZ[_0x1e93d6(0x98c)][_0x1e93d6(0x2c3)][_0x1e93d6(0x52e)](this),this[_0x1e93d6(0x670)]();},Game_Screen[_0x54467d(0x895)][_0x54467d(0x670)]=function(){const _0x5e3dea=_0x54467d,_0x3ac63e=VisuMZ['CoreEngine']['Settings'][_0x5e3dea(0x54e)];this['_coreEngineShakeStyle']=_0x3ac63e?.['DefaultStyle']||'random';},Game_Screen[_0x54467d(0x895)][_0x54467d(0x3a6)]=function(){const _0x25269b=_0x54467d;if(this['_coreEngineShakeStyle']===undefined)this[_0x25269b(0x670)]();return this[_0x25269b(0x31f)];},Game_Screen[_0x54467d(0x895)][_0x54467d(0x371)]=function(_0x50bd0e){const _0x4288da=_0x54467d;if(this[_0x4288da(0x31f)]===undefined)this[_0x4288da(0x670)]();this[_0x4288da(0x31f)]=_0x50bd0e['toLowerCase']()[_0x4288da(0x747)]();},Game_Picture['prototype'][_0x54467d(0x16d)]=function(){const _0x2348db=_0x54467d;if($gameParty['inBattle']())return![];return this[_0x2348db(0x33a)]()&&this[_0x2348db(0x33a)]()[_0x2348db(0x353)](0x0)==='!';},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x567)]=Game_Picture[_0x54467d(0x895)]['x'],Game_Picture[_0x54467d(0x895)]['x']=function(){const _0x825b3e=_0x54467d;if(this[_0x825b3e(0x16d)]()){if('RnFwX'!==_0x825b3e(0x111))_0x3106b[_0x825b3e(0x895)][_0x825b3e(0x6f1)]['call'](this),this[_0x825b3e(0x606)](),this[_0x825b3e(0x43a)]();else return this[_0x825b3e(0x5f0)]();}else{if('fCbtJ'===_0x825b3e(0x5bb))return VisuMZ['CoreEngine']['Game_Picture_x']['call'](this);else _0xe5eee9['VisuMZ_2_BattleSystemFTB']&&(this[_0x825b3e(0x89e)]='FTB');}},Game_Picture['prototype'][_0x54467d(0x5f0)]=function(){const _0x1b4628=_0x54467d,_0x19d45a=$gameMap['displayX']()*$gameMap[_0x1b4628(0x145)]();return(this['_x']-_0x19d45a)*$gameScreen[_0x1b4628(0x863)]();},VisuMZ['CoreEngine'][_0x54467d(0x51c)]=Game_Picture['prototype']['y'],Game_Picture[_0x54467d(0x895)]['y']=function(){const _0x197589=_0x54467d;return this['isMapScrollLinked']()?this[_0x197589(0x96b)]():VisuMZ[_0x197589(0x98c)]['Game_Picture_y'][_0x197589(0x52e)](this);},Game_Picture['prototype'][_0x54467d(0x96b)]=function(){const _0x4b3c8d=_0x54467d,_0x40e573=$gameMap[_0x4b3c8d(0x2f8)]()*$gameMap[_0x4b3c8d(0x573)]();return(this['_y']-_0x40e573)*$gameScreen[_0x4b3c8d(0x863)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1be)]=Game_Picture[_0x54467d(0x895)][_0x54467d(0x333)],Game_Picture[_0x54467d(0x895)]['scaleX']=function(){const _0x58ee60=_0x54467d;let _0x58ff93=VisuMZ[_0x58ee60(0x98c)][_0x58ee60(0x1be)][_0x58ee60(0x52e)](this);return this[_0x58ee60(0x16d)]()&&(_0x58ff93*=$gameScreen['zoomScale']()),_0x58ff93;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x82b)]=Game_Picture[_0x54467d(0x895)][_0x54467d(0x788)],Game_Picture[_0x54467d(0x895)]['scaleY']=function(){const _0x1e9ac6=_0x54467d;let _0x4b5941=VisuMZ[_0x1e9ac6(0x98c)][_0x1e9ac6(0x82b)][_0x1e9ac6(0x52e)](this);return this[_0x1e9ac6(0x16d)]()&&(_0x4b5941*=$gameScreen['zoomScale']()),_0x4b5941;},Game_Picture[_0x54467d(0x895)][_0x54467d(0x822)]=function(_0x3d1690){const _0x4cad87=_0x54467d;this[_0x4cad87(0x405)]=_0x3d1690;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x67d)]=Game_Picture['prototype'][_0x54467d(0x321)],Game_Picture['prototype']['calcEasing']=function(_0xf80d5f){const _0x47a3f7=_0x54467d;return this[_0x47a3f7(0x405)]=this[_0x47a3f7(0x405)]||0x0,[0x0,0x1,0x2,0x3][_0x47a3f7(0x356)](this[_0x47a3f7(0x405)])?VisuMZ[_0x47a3f7(0x98c)]['Game_Picture_calcEasing'][_0x47a3f7(0x52e)](this,_0xf80d5f):_0x47a3f7(0x42e)===_0x47a3f7(0x67c)?_0x42d69e[_0x47a3f7(0x88a)]['HelpRect'][_0x47a3f7(0x52e)](this):VisuMZ[_0x47a3f7(0x40d)](_0xf80d5f,this[_0x47a3f7(0x405)]);},VisuMZ['CoreEngine'][_0x54467d(0x531)]=Game_Action[_0x54467d(0x895)][_0x54467d(0x69a)],Game_Action[_0x54467d(0x895)]['itemHit']=function(_0x202917){const _0x536809=_0x54467d;if(VisuMZ[_0x536809(0x98c)]['Settings'][_0x536809(0x355)]['ImprovedAccuracySystem'])return this[_0x536809(0x59f)](_0x202917);else{if('SamoH'!==_0x536809(0x7a6)){const _0x2f8763=this['commandWindowRect']();this[_0x536809(0x1fe)]=new _0x135011(_0x2f8763),this[_0x536809(0x1fe)]['setHandler'](_0x536809(0xf3),this[_0x536809(0x230)]['bind'](this)),this[_0x536809(0x324)](this[_0x536809(0x1fe)]),this[_0x536809(0x1fe)]['setBackgroundType'](_0x28ffac[_0x536809(0x88a)][_0x536809(0x51e)]);}else return VisuMZ[_0x536809(0x98c)][_0x536809(0x531)][_0x536809(0x52e)](this,_0x202917);}},Game_Action[_0x54467d(0x895)]['itemHitImprovedAccuracy']=function(_0x411f4c){const _0x1cb5f3=_0x54467d,_0x1c8236=this[_0x1cb5f3(0x392)](_0x411f4c),_0x1e1f56=this['subjectHitRate'](_0x411f4c),_0x2e89d3=this['targetEvaRate'](_0x411f4c);return _0x1c8236*(_0x1e1f56-_0x2e89d3);},VisuMZ['CoreEngine'][_0x54467d(0x8ed)]=Game_Action['prototype']['itemEva'],Game_Action[_0x54467d(0x895)]['itemEva']=function(_0x51ff33){const _0x6285a0=_0x54467d;if(VisuMZ['CoreEngine'][_0x6285a0(0x357)][_0x6285a0(0x355)][_0x6285a0(0x265)])return 0x0;else{if(_0x6285a0(0x1ce)!=='TXBSN'){const _0x9fc0ab=_0x3a0765[_0x1ae7a0];if(!_0x9fc0ab)return;const _0x17c28a=new _0x1dadaa();this['addOnceParallelInterpreter'](_0x17c28a),_0x17c28a[_0x6285a0(0x2a8)](_0x1714b0);}else return VisuMZ[_0x6285a0(0x98c)][_0x6285a0(0x8ed)][_0x6285a0(0x52e)](this,_0x51ff33);}},Game_Action['prototype']['itemSuccessRate']=function(_0x24c42b){const _0x5b4e26=_0x54467d;return this[_0x5b4e26(0x5cb)]()['successRate']*0.01;},Game_Action['prototype'][_0x54467d(0x281)]=function(_0x373c04){const _0x5d9226=_0x54467d;if(VisuMZ['CoreEngine'][_0x5d9226(0x357)][_0x5d9226(0x355)][_0x5d9226(0x61e)]&&this[_0x5d9226(0x56b)]())return 0x1;return this[_0x5d9226(0x232)]()?VisuMZ['CoreEngine'][_0x5d9226(0x357)][_0x5d9226(0x355)][_0x5d9226(0x61e)]&&this[_0x5d9226(0x494)]()[_0x5d9226(0x1fb)]()?_0x5d9226(0x2fd)===_0x5d9226(0x2fd)?this[_0x5d9226(0x494)]()[_0x5d9226(0x3a1)]+0.05:this['mainAreaTopSideButtonLayout']():this[_0x5d9226(0x494)]()['hit']:0x1;},Game_Action[_0x54467d(0x895)]['targetEvaRate']=function(_0x1b0cb6){const _0x2e6778=_0x54467d;if(this[_0x2e6778(0x494)]()[_0x2e6778(0x1fb)]()===_0x1b0cb6[_0x2e6778(0x1fb)]())return 0x0;if(this[_0x2e6778(0x232)]()){if(_0x2e6778(0x3ed)===_0x2e6778(0x961)){const _0xd03f89=_0x1b8556[_0x2e6778(0x2ba)]();return _0xd03f89===_0x2e6778(0x88c)?this['getKeyboardInputButtonString'](_0xda2b99):this[_0x2e6778(0x66e)](_0xd03f89,_0x5d565d);}else{if(VisuMZ[_0x2e6778(0x98c)][_0x2e6778(0x357)][_0x2e6778(0x355)]['AccuracyBoost']&&_0x1b0cb6[_0x2e6778(0x578)]())return _0x1b0cb6[_0x2e6778(0x6d7)]-0.05;else{if(_0x2e6778(0x4e1)===_0x2e6778(0x4e1))return _0x1b0cb6[_0x2e6778(0x6d7)];else this['catchNormalError'](_0x2490aa);}}}else return this['isMagical']()?_0x2e6778(0x741)!==_0x2e6778(0x2b1)?_0x1b0cb6['mev']:this[_0x2e6778(0x2b9)]()?_0x1aa45b[_0x2e6778(0x307)](_0x2e6778(0x6df)):_0x2dbc44[_0x2e6778(0x895)][_0x2e6778(0x623)]['call'](this):_0x2e6778(0x414)!==_0x2e6778(0x48d)?0x0:this[_0x2e6778(0x58e)];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x537)]=Game_Action[_0x54467d(0x895)][_0x54467d(0x1d8)],Game_Action[_0x54467d(0x895)][_0x54467d(0x1d8)]=function(_0x1a04e4){const _0x47e8cd=_0x54467d;VisuMZ[_0x47e8cd(0x98c)][_0x47e8cd(0x537)][_0x47e8cd(0x52e)](this,_0x1a04e4);if(VisuMZ[_0x47e8cd(0x98c)][_0x47e8cd(0x357)][_0x47e8cd(0x355)][_0x47e8cd(0x265)])return;const _0xe9b293=_0x1a04e4[_0x47e8cd(0x42d)]();_0xe9b293[_0x47e8cd(0x68b)]&&(0x1-this[_0x47e8cd(0x5f4)](_0x1a04e4)>this[_0x47e8cd(0x69a)](_0x1a04e4)&&(_0xe9b293[_0x47e8cd(0x68b)]=![],_0xe9b293[_0x47e8cd(0x4ef)]=!![]));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x377)]=Game_BattlerBase[_0x54467d(0x895)]['initMembers'],Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x4f4)]=function(){const _0x519d5d=_0x54467d;this[_0x519d5d(0x605)]={},VisuMZ['CoreEngine'][_0x519d5d(0x377)][_0x519d5d(0x52e)](this);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x7b8)]=Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x527)],Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x22be6e=_0x54467d;this[_0x22be6e(0x605)]={},VisuMZ['CoreEngine'][_0x22be6e(0x7b8)][_0x22be6e(0x52e)](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x5d7a77){const _0x17e944=_0x54467d;return this['_cache']=this[_0x17e944(0x605)]||{},this[_0x17e944(0x605)][_0x5d7a77]!==undefined;},Game_BattlerBase['prototype'][_0x54467d(0xe7)]=function(_0x5c6822){const _0x5ce52e=_0x54467d,_0x31b77f=(_0x9bbfc0,_0x144feb)=>{const _0x4c065e=_0x3325;if(!_0x144feb)return _0x9bbfc0;if(_0x144feb[_0x4c065e(0x944)][_0x4c065e(0x8b6)](VisuMZ[_0x4c065e(0x98c)]['RegExp'][_0x4c065e(0xe7)][_0x5c6822])){var _0x5dc3f9=Number(RegExp['$1']);_0x9bbfc0+=_0x5dc3f9;}if(_0x144feb[_0x4c065e(0x944)][_0x4c065e(0x8b6)](VisuMZ[_0x4c065e(0x98c)]['RegExp'][_0x4c065e(0x902)][_0x5c6822])){var _0x16fa12=String(RegExp['$1']);try{_0x9bbfc0+=eval(_0x16fa12);}catch(_0x4ca2fc){if('PxmhC'===_0x4c065e(0x241)){if($gameTemp[_0x4c065e(0x595)]())console[_0x4c065e(0x56f)](_0x4ca2fc);}else{_0x251eec[_0x4c065e(0x98c)]['SceneManager_exit'][_0x4c065e(0x52e)](this);if(_0x2906d0[_0x4c065e(0x26c)]>=_0x4c065e(0x2ae)){if(typeof _0x6074ed===_0x4c065e(0x28e))_0x2573da['App'][_0x4c065e(0x676)]();}}}}return _0x9bbfc0;};return this[_0x5ce52e(0x6ca)]()[_0x5ce52e(0x14d)](_0x31b77f,this[_0x5ce52e(0x5b3)][_0x5c6822]);},Game_BattlerBase['prototype'][_0x54467d(0x8b7)]=function(_0x5ddd69){const _0x2e1136=_0x54467d;var _0x2a3917=_0x2e1136(0x170)+(this[_0x2e1136(0x1fb)]()?_0x2e1136(0x82f):_0x2e1136(0x117))+_0x2e1136(0x478)+_0x5ddd69;if(this[_0x2e1136(0x575)](_0x2a3917))return this['_cache'][_0x2a3917];this[_0x2e1136(0x605)][_0x2a3917]=eval(VisuMZ['CoreEngine']['Settings'][_0x2e1136(0x1e2)][_0x2a3917]);const _0x8e2e65=(_0x5d32d0,_0x5a91bc)=>{const _0x55c835=_0x2e1136;if(!_0x5a91bc)return _0x5d32d0;if(_0x5a91bc[_0x55c835(0x944)][_0x55c835(0x8b6)](VisuMZ[_0x55c835(0x98c)][_0x55c835(0xcb)][_0x55c835(0x8b7)][_0x5ddd69])){if('LppzE'!==_0x55c835(0x1b2)){_0x5528c7[_0x55c835(0x98c)][_0x55c835(0x512)][_0x55c835(0x52e)](this);if(!_0x64fb21['DETACH_PICTURE_CONTAINER'])return;const _0x14f28d=this[_0x55c835(0x775)];if(!_0x14f28d)return;this['_pictureContainer']=_0x14f28d[_0x55c835(0x266)];if(!this[_0x55c835(0x266)])return;this[_0x55c835(0x2c0)](this['_pictureContainer']);}else{var _0x1c0c1d=Number(RegExp['$1']);if(_0x1c0c1d===0x0)_0x1c0c1d=Number[_0x55c835(0x1b7)];_0x5d32d0=Math['max'](_0x5d32d0,_0x1c0c1d);}}if(_0x5a91bc['note'][_0x55c835(0x8b6)](VisuMZ[_0x55c835(0x98c)]['RegExp'][_0x55c835(0x666)][_0x5ddd69])){var _0x49e4b4=String(RegExp['$1']);try{if('NobDX'!==_0x55c835(0x70d))return!![];else _0x5d32d0=Math[_0x55c835(0x161)](_0x5d32d0,Number(eval(_0x49e4b4)));}catch(_0x467357){if($gameTemp[_0x55c835(0x595)]())console['log'](_0x467357);}}return _0x5d32d0;};if(this[_0x2e1136(0x605)][_0x2a3917]===0x0)this['_cache'][_0x2a3917]=Number['MAX_SAFE_INTEGER'];return this[_0x2e1136(0x605)][_0x2a3917]=this[_0x2e1136(0x6ca)]()[_0x2e1136(0x14d)](_0x8e2e65,this['_cache'][_0x2a3917]),this['_cache'][_0x2a3917];},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x93f)]=function(_0x4a5ed2){const _0x3ac78f=_0x54467d,_0x44bae4=this[_0x3ac78f(0x8c1)](Game_BattlerBase[_0x3ac78f(0x91e)],_0x4a5ed2),_0x88c643=(_0x153d5b,_0x242e8a)=>{const _0x37dcbf=_0x3ac78f;if(_0x37dcbf(0x5c7)===_0x37dcbf(0x6a4)){if(_0x420589&&_0x2f4990[_0x37dcbf(0x55d)])_0x3e3ac4[_0x37dcbf(0x55d)][_0x37dcbf(0x52b)]();}else{if(!_0x242e8a)return _0x153d5b;if(_0x242e8a[_0x37dcbf(0x944)][_0x37dcbf(0x8b6)](VisuMZ[_0x37dcbf(0x98c)]['RegExp'][_0x37dcbf(0x3c5)][_0x4a5ed2])){var _0x1b391d=Number(RegExp['$1'])/0x64;_0x153d5b*=_0x1b391d;}if(_0x242e8a[_0x37dcbf(0x944)][_0x37dcbf(0x8b6)](VisuMZ['CoreEngine']['RegExp'][_0x37dcbf(0x299)][_0x4a5ed2])){if(_0x37dcbf(0x6e8)===_0x37dcbf(0x6e8)){var _0x1b391d=Number(RegExp['$1']);_0x153d5b*=_0x1b391d;}else{if(_0x1314bd[_0x37dcbf(0xd4)]())return;_0x384d13[_0x37dcbf(0x2e6)](_0x1b2b1a,_0x470eb8);const _0xefd55=[_0x37dcbf(0x7af),_0x37dcbf(0x5e0),'battlebacks2',_0x37dcbf(0x64a),_0x37dcbf(0x820),_0x37dcbf(0x8c3),_0x37dcbf(0x196),'pictures',_0x37dcbf(0x38c),_0x37dcbf(0x75e),_0x37dcbf(0x698),_0x37dcbf(0x259),_0x37dcbf(0x4c0),_0x37dcbf(0x7ec)];for(const _0x509a4f of _0xefd55){const _0x37fad7=_0x594aa2[_0x509a4f],_0x3da474=_0x37dcbf(0x905)['format'](_0x509a4f);for(const _0x59780c of _0x37fad7){_0x570f5b[_0x37dcbf(0x2a0)](_0x3da474,_0x59780c);}}}}if(_0x242e8a[_0x37dcbf(0x944)][_0x37dcbf(0x8b6)](VisuMZ[_0x37dcbf(0x98c)][_0x37dcbf(0xcb)][_0x37dcbf(0x4c9)][_0x4a5ed2])){if(_0x37dcbf(0x5d6)!==_0x37dcbf(0x5d6))_0x29a4f4[_0x37dcbf(0x3a5)]=_0x3391e5,_0x4bc80c['pos']=_0x4f78a1[_0x37dcbf(0x70f)][_0x37dcbf(0x64d)](),_0x1572eb[_0x37dcbf(0x3f5)](_0x52348c),_0x2b9a2d[_0x37dcbf(0x1d2)](_0xd7648d,_0x5f4274[_0x37dcbf(0x585)]),_0x362efd['_bgmBuffer']['_startPlaying'](_0x1d16b4[_0x37dcbf(0x585)]);else{var _0x114988=String(RegExp['$1']);try{_0x153d5b*=eval(_0x114988);}catch(_0x479b9e){if($gameTemp[_0x37dcbf(0x595)]())console['log'](_0x479b9e);}}}return _0x153d5b;}};return this[_0x3ac78f(0x6ca)]()[_0x3ac78f(0x14d)](_0x88c643,_0x44bae4);},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x780)]=function(_0x4779f4){const _0x4f511a=(_0x3a63c4,_0x49f545)=>{const _0x5ac1ea=_0x3325;if(_0x5ac1ea(0x5df)==='fsGMc'){if(!_0x49f545)return _0x3a63c4;if(_0x49f545['note'][_0x5ac1ea(0x8b6)](VisuMZ[_0x5ac1ea(0x98c)][_0x5ac1ea(0xcb)][_0x5ac1ea(0x7cf)][_0x4779f4])){if(_0x5ac1ea(0x369)===_0x5ac1ea(0x74d))this[_0x5ac1ea(0x386)][_0x5ac1ea(0x12a)](_0x4e8d7b['layoutSettings'][_0x5ac1ea(0x6cf)]);else{var _0x2fbabb=Number(RegExp['$1']);_0x3a63c4+=_0x2fbabb;}}if(_0x49f545['note']['match'](VisuMZ[_0x5ac1ea(0x98c)][_0x5ac1ea(0xcb)][_0x5ac1ea(0x39f)][_0x4779f4])){if('nkheo'!==_0x5ac1ea(0x1b8)){var _0x21837a=String(RegExp['$1']);try{if('ZItFn'===_0x5ac1ea(0x18e))_0x3a63c4+=eval(_0x21837a);else{if(_0x56345c[_0x5ac1ea(0x184)]==='')return![];if(_0xaed56a[_0x5ac1ea(0x184)]==='Subtitle')return![];if(_0x41d1b7[_0x5ac1ea(0x43b)]==='')return![];if(_0xec6f0[_0x5ac1ea(0x43b)]==='0.00')return![];return!![];}}catch(_0x5570ae){if($gameTemp[_0x5ac1ea(0x595)]())console[_0x5ac1ea(0x56f)](_0x5570ae);}}else{if(_0x176ce7)_0x291050[_0x5ac1ea(0x384)](_0x361bdf);}}return _0x3a63c4;}else{const _0x3600aa=_0x19533c[_0x5ac1ea(0x395)](_0x46ad6b,{'to':_0x5ac1ea(0x8b9),'level':0x1});if(_0x3600aa[_0x5ac1ea(0x959)]>=0xc350){}_0x490371(_0x3600aa);}};return this['traitObjects']()['reduce'](_0x4f511a,0x0);},Game_BattlerBase['prototype'][_0x54467d(0x80a)]=function(_0x103d95){const _0xb05f36=_0x54467d;let _0x2b3d02=_0xb05f36(0x80a)+_0x103d95+_0xb05f36(0x38a);if(this[_0xb05f36(0x575)](_0x2b3d02))return this[_0xb05f36(0x605)][_0x2b3d02];return this[_0xb05f36(0x605)][_0x2b3d02]=Math['round'](VisuMZ[_0xb05f36(0x98c)]['Settings']['Param'][_0xb05f36(0x17e)][_0xb05f36(0x52e)](this,_0x103d95)),this[_0xb05f36(0x605)][_0x2b3d02];},Game_BattlerBase['prototype']['xparamPlus']=function(_0x34d9b7){const _0x37c0f6=_0x54467d,_0x41369f=(_0x510a46,_0x28a539)=>{const _0xe28572=_0x3325;if(_0xe28572(0x723)===_0xe28572(0x723)){if(!_0x28a539)return _0x510a46;if(_0x28a539[_0xe28572(0x944)][_0xe28572(0x8b6)](VisuMZ[_0xe28572(0x98c)][_0xe28572(0xcb)][_0xe28572(0x6f4)][_0x34d9b7])){var _0x425727=Number(RegExp['$1'])/0x64;_0x510a46+=_0x425727;}if(_0x28a539[_0xe28572(0x944)][_0xe28572(0x8b6)](VisuMZ['CoreEngine'][_0xe28572(0xcb)][_0xe28572(0x179)][_0x34d9b7])){if(_0xe28572(0x58a)!==_0xe28572(0x58a)){if(!_0x49a257[_0xe28572(0x595)]())return;const _0x472889=_0x17febf['getLastUsedGamepadType']();_0x183e13['clipboard']&&_0x14c668[_0xe28572(0x12f)][_0xe28572(0x7a1)](_0x472889);}else{var _0x425727=Number(RegExp['$1']);_0x510a46+=_0x425727;}}if(_0x28a539[_0xe28572(0x944)][_0xe28572(0x8b6)](VisuMZ[_0xe28572(0x98c)][_0xe28572(0xcb)][_0xe28572(0x342)][_0x34d9b7])){if('vTjyw'==='uOERT')_0x5c915f[_0xe28572(0x98c)][_0xe28572(0x207)]['call'](this,_0x421e9c);else{var _0xc038e3=String(RegExp['$1']);try{if(_0xe28572(0xd8)!==_0xe28572(0xd8)){let _0x17a96b=0x0;return _0x184484['areButtonsOutsideMainUI']()?_0x17a96b=this[_0xe28572(0x134)]():_0x17a96b=_0x3dbaaa[_0xe28572(0x98c)][_0xe28572(0x462)][_0xe28572(0x52e)](this),_0x17a96b;}else _0x510a46+=eval(_0xc038e3);}catch(_0x4b5829){if($gameTemp[_0xe28572(0x595)]())console[_0xe28572(0x56f)](_0x4b5829);}}}return _0x510a46;}else _0x531445=_0xe57e4a||_0x2362c3[_0xe28572(0x954)],_0x5b7128=_0x58e674||_0x6fa512['faceHeight'],_0x3cbc2e=_0x1c669f[_0xe28572(0xe2)](_0x3102a0),_0x2e55eb=_0x12f49b['round'](_0x128fe8),_0x44cbdd=_0x57f8a8[_0xe28572(0xe2)](_0x1a2fc8),_0x3338a2=_0x2517c3['round'](_0x18a7e7),_0x496b81[_0xe28572(0x98c)][_0xe28572(0x442)][_0xe28572(0x52e)](this,_0x1e0560,_0x3eebf5,_0x4437ae,_0x2f92b7,_0x1d2fb8,_0x3e578c);};return this[_0x37c0f6(0x6ca)]()['reduce'](_0x41369f,0x0);},Game_BattlerBase['prototype'][_0x54467d(0x909)]=function(_0x22abab){const _0x256f93=_0x54467d,_0x3ce609=(_0x179168,_0x27f41f)=>{const _0x5a1d4c=_0x3325;if(_0x5a1d4c(0x1f3)==='mXuZO')_0x1d0209[_0x5a1d4c(0x4a8)]=!![],_0x1c0c82[_0x5a1d4c(0x926)]();else{if(!_0x27f41f)return _0x179168;if(_0x27f41f['note'][_0x5a1d4c(0x8b6)](VisuMZ[_0x5a1d4c(0x98c)][_0x5a1d4c(0xcb)][_0x5a1d4c(0x8ab)][_0x22abab])){var _0x4b76fb=Number(RegExp['$1'])/0x64;_0x179168*=_0x4b76fb;}if(_0x27f41f[_0x5a1d4c(0x944)][_0x5a1d4c(0x8b6)](VisuMZ[_0x5a1d4c(0x98c)]['RegExp']['xparamRate2'][_0x22abab])){var _0x4b76fb=Number(RegExp['$1']);_0x179168*=_0x4b76fb;}if(_0x27f41f[_0x5a1d4c(0x944)]['match'](VisuMZ[_0x5a1d4c(0x98c)][_0x5a1d4c(0xcb)][_0x5a1d4c(0x78f)][_0x22abab])){var _0x5926ac=String(RegExp['$1']);try{if(_0x5a1d4c(0x286)!==_0x5a1d4c(0x669))_0x179168*=eval(_0x5926ac);else return _0x836263[_0x5a1d4c(0x98c)][_0x5a1d4c(0x4aa)][_0x5a1d4c(0x52e)](this,_0x37905a);}catch(_0x368c7e){if(_0x5a1d4c(0x6d8)==='wFbpp'){let _0x5dc88=_0x5760df[_0x49e0ff],_0x2200e2=this[_0x5a1d4c(0x837)](_0x5dc88)[_0x5a1d4c(0x36d)],_0x3af4e2=_0x30bdc8[_0x5a1d4c(0x881)]((this[_0x5a1d4c(0x5a8)][_0x5a1d4c(0x36d)]-_0x2200e2)/0x2);this[_0x5a1d4c(0x749)](_0x5dc88,_0x3af4e2,_0x3c7a21),_0x4925c5+=this['lineHeight']();}else{if($gameTemp[_0x5a1d4c(0x595)]())console[_0x5a1d4c(0x56f)](_0x368c7e);}}}return _0x179168;}};return this['traitObjects']()[_0x256f93(0x14d)](_0x3ce609,0x1);},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x5bd)]=function(_0x2bed56){const _0xd2351d=_0x54467d,_0x808a63=(_0x118c96,_0x41d8fc)=>{const _0x21f655=_0x3325;if(_0x21f655(0x302)===_0x21f655(0x302)){if(!_0x41d8fc)return _0x118c96;if(_0x41d8fc[_0x21f655(0x944)][_0x21f655(0x8b6)](VisuMZ[_0x21f655(0x98c)]['RegExp'][_0x21f655(0x61b)][_0x2bed56])){var _0x5b69d2=Number(RegExp['$1'])/0x64;_0x118c96+=_0x5b69d2;}if(_0x41d8fc[_0x21f655(0x944)][_0x21f655(0x8b6)](VisuMZ[_0x21f655(0x98c)][_0x21f655(0xcb)][_0x21f655(0x22e)][_0x2bed56])){var _0x5b69d2=Number(RegExp['$1']);_0x118c96+=_0x5b69d2;}if(_0x41d8fc[_0x21f655(0x944)][_0x21f655(0x8b6)](VisuMZ[_0x21f655(0x98c)]['RegExp'][_0x21f655(0x12e)][_0x2bed56])){var _0x5ce255=String(RegExp['$1']);try{'tkswb'===_0x21f655(0x7ff)?_0x118c96+=eval(_0x5ce255):_0x46b2bd+=_0x21f655(0x424);}catch(_0x41ff85){if($gameTemp[_0x21f655(0x595)]())console[_0x21f655(0x56f)](_0x41ff85);}}return _0x118c96;}else _0x58acd0(_0x21f655(0x8d4));};return this[_0xd2351d(0x6ca)]()[_0xd2351d(0x14d)](_0x808a63,0x0);},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x7d0)]=function(_0xa9bd54){const _0x6bed87=_0x54467d;let _0x223657=_0x6bed87(0x7d0)+_0xa9bd54+_0x6bed87(0x38a);if(this[_0x6bed87(0x575)](_0x223657))return this['_cache'][_0x223657];return this['_cache'][_0x223657]=VisuMZ[_0x6bed87(0x98c)][_0x6bed87(0x357)][_0x6bed87(0x1e2)]['XParameterFormula'][_0x6bed87(0x52e)](this,_0xa9bd54),this[_0x6bed87(0x605)][_0x223657];},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x716)]=function(_0x70566c){const _0x52383f=_0x54467d,_0x17576a=(_0x1774e0,_0x369f6e)=>{const _0x21930d=_0x3325;if(_0x21930d(0x160)!==_0x21930d(0x160))return this[_0x21930d(0x406)][_0x21930d(0x959)]>0x0;else{if(!_0x369f6e)return _0x1774e0;if(_0x369f6e[_0x21930d(0x944)][_0x21930d(0x8b6)](VisuMZ['CoreEngine'][_0x21930d(0xcb)][_0x21930d(0x7e1)][_0x70566c])){var _0x4ea770=Number(RegExp['$1'])/0x64;_0x1774e0+=_0x4ea770;}if(_0x369f6e[_0x21930d(0x944)][_0x21930d(0x8b6)](VisuMZ[_0x21930d(0x98c)][_0x21930d(0xcb)][_0x21930d(0x466)][_0x70566c])){if('oLqHB'===_0x21930d(0x8eb)){var _0x4ea770=Number(RegExp['$1']);_0x1774e0+=_0x4ea770;}else this[_0x21930d(0x304)]();}if(_0x369f6e[_0x21930d(0x944)][_0x21930d(0x8b6)](VisuMZ[_0x21930d(0x98c)][_0x21930d(0xcb)][_0x21930d(0x82d)][_0x70566c])){var _0xd6dbf0=String(RegExp['$1']);try{if(_0x21930d(0x5c8)!==_0x21930d(0x5c8)){if(this[_0x21930d(0x1f7)])return;_0x563ffb[_0x21930d(0x98c)][_0x21930d(0x73a)][_0x21930d(0x52e)](this);}else _0x1774e0+=eval(_0xd6dbf0);}catch(_0x1ff8d6){if($gameTemp[_0x21930d(0x595)]())console[_0x21930d(0x56f)](_0x1ff8d6);}}return _0x1774e0;}};return this[_0x52383f(0x6ca)]()['reduce'](_0x17576a,0x0);},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x25d)]=function(_0x9dda65){const _0x30d2cb=_0x54467d,_0x401461=(_0x38e85f,_0x56d3c2)=>{const _0x5a56e3=_0x3325;if(!_0x56d3c2)return _0x38e85f;if(_0x56d3c2[_0x5a56e3(0x944)][_0x5a56e3(0x8b6)](VisuMZ[_0x5a56e3(0x98c)][_0x5a56e3(0xcb)][_0x5a56e3(0x5f2)][_0x9dda65])){if(_0x5a56e3(0x744)===_0x5a56e3(0x393))_0x54f7ba[_0x5a56e3(0x759)]();else{var _0x10454e=Number(RegExp['$1'])/0x64;_0x38e85f*=_0x10454e;}}if(_0x56d3c2[_0x5a56e3(0x944)][_0x5a56e3(0x8b6)](VisuMZ['CoreEngine'][_0x5a56e3(0xcb)]['sparamRate2'][_0x9dda65])){var _0x10454e=Number(RegExp['$1']);_0x38e85f*=_0x10454e;}if(_0x56d3c2[_0x5a56e3(0x944)]['match'](VisuMZ[_0x5a56e3(0x98c)][_0x5a56e3(0xcb)][_0x5a56e3(0x2da)][_0x9dda65])){if('sEriC'===_0x5a56e3(0x844)){var _0x5b08a7=String(RegExp['$1']);try{_0x38e85f*=eval(_0x5b08a7);}catch(_0x207281){if($gameTemp['isPlaytest']())console[_0x5a56e3(0x56f)](_0x207281);}}else this[_0x5a56e3(0x6c4)]>0x0&&(this['_anchor']['x']=this[_0x5a56e3(0x610)](this[_0x5a56e3(0x8d6)]['x'],this[_0x5a56e3(0x6fa)]['x']),this[_0x5a56e3(0x8d6)]['y']=this[_0x5a56e3(0x610)](this['_anchor']['y'],this[_0x5a56e3(0x6fa)]['y']));}return _0x38e85f;};return this[_0x30d2cb(0x6ca)]()[_0x30d2cb(0x14d)](_0x401461,0x1);},Game_BattlerBase[_0x54467d(0x895)][_0x54467d(0x2be)]=function(_0x2b5b72){const _0x2a99b4=(_0x3bac4d,_0x5659fd)=>{const _0x3cbd58=_0x3325;if(_0x3cbd58(0x602)!==_0x3cbd58(0x695)){if(!_0x5659fd)return _0x3bac4d;if(_0x5659fd[_0x3cbd58(0x944)][_0x3cbd58(0x8b6)](VisuMZ['CoreEngine'][_0x3cbd58(0xcb)][_0x3cbd58(0x399)][_0x2b5b72])){var _0x5a9550=Number(RegExp['$1'])/0x64;_0x3bac4d+=_0x5a9550;}if(_0x5659fd[_0x3cbd58(0x944)][_0x3cbd58(0x8b6)](VisuMZ[_0x3cbd58(0x98c)][_0x3cbd58(0xcb)][_0x3cbd58(0x1d6)][_0x2b5b72])){if(_0x3cbd58(0xe8)===_0x3cbd58(0xe8)){var _0x5a9550=Number(RegExp['$1']);_0x3bac4d+=_0x5a9550;}else _0x419cf0[_0x3cbd58(0x98c)]['Scene_MenuBase_createPageButtons'][_0x3cbd58(0x52e)](this),_0x213657['isSideButtonLayout']()&&this[_0x3cbd58(0x2bb)]();}if(_0x5659fd['note'][_0x3cbd58(0x8b6)](VisuMZ['CoreEngine'][_0x3cbd58(0xcb)][_0x3cbd58(0x73d)][_0x2b5b72])){var _0x3612d4=String(RegExp['$1']);try{_0x3cbd58(0x280)!==_0x3cbd58(0x41e)?_0x3bac4d+=eval(_0x3612d4):(this['_cache']={},_0x1a3a18[_0x3cbd58(0x98c)][_0x3cbd58(0x7b8)]['call'](this));}catch(_0x211bad){if($gameTemp[_0x3cbd58(0x595)]())console[_0x3cbd58(0x56f)](_0x211bad);}}return _0x3bac4d;}else{try{_0x4e4a69(_0x1b28ec);}catch(_0x524df0){_0x11fd3a[_0x3cbd58(0x595)]()&&(_0x5ef825[_0x3cbd58(0x56f)](_0x3cbd58(0x20c)),_0x4f2595['log'](_0x524df0));}return!![];}};return this['traitObjects']()['reduce'](_0x2a99b4,0x0);},Game_BattlerBase[_0x54467d(0x895)]['sparam']=function(_0x40e713){const _0xe47526=_0x54467d;let _0x204f17=_0xe47526(0x96c)+_0x40e713+_0xe47526(0x38a);if(this[_0xe47526(0x575)](_0x204f17))return this['_cache'][_0x204f17];return this['_cache'][_0x204f17]=VisuMZ[_0xe47526(0x98c)][_0xe47526(0x357)]['Param'][_0xe47526(0x9ad)][_0xe47526(0x52e)](this,_0x40e713),this[_0xe47526(0x605)][_0x204f17];},Game_BattlerBase['prototype'][_0x54467d(0x804)]=function(_0x5bf6e5,_0x2e49a8){const _0x49fd51=_0x54467d;if(typeof paramId==='number')return this['param'](_0x5bf6e5);_0x5bf6e5=String(_0x5bf6e5||'')['toUpperCase']();if(_0x5bf6e5==='MAXHP')return this['param'](0x0);if(_0x5bf6e5===_0x49fd51(0x728))return this[_0x49fd51(0x80a)](0x1);if(_0x5bf6e5===_0x49fd51(0x1ef))return this[_0x49fd51(0x80a)](0x2);if(_0x5bf6e5===_0x49fd51(0x314))return this[_0x49fd51(0x80a)](0x3);if(_0x5bf6e5===_0x49fd51(0x43e))return this[_0x49fd51(0x80a)](0x4);if(_0x5bf6e5===_0x49fd51(0x67b))return this['param'](0x5);if(_0x5bf6e5===_0x49fd51(0x2b5))return this[_0x49fd51(0x80a)](0x6);if(_0x5bf6e5===_0x49fd51(0x96a))return this['param'](0x7);if(_0x5bf6e5===_0x49fd51(0x561))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x7d0)](0x0)*0x64))+'%':this[_0x49fd51(0x7d0)](0x0);if(_0x5bf6e5===_0x49fd51(0x2cc))return _0x2e49a8?String(Math['round'](this[_0x49fd51(0x7d0)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x5bf6e5==='CRI')return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x5bf6e5===_0x49fd51(0x28f))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x3)*0x64))+'%':this[_0x49fd51(0x7d0)](0x3);if(_0x5bf6e5==='MEV')return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x5bf6e5===_0x49fd51(0x497))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x7d0)](0x5)*0x64))+'%':this[_0x49fd51(0x7d0)](0x5);if(_0x5bf6e5==='CNT')return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x6)*0x64))+'%':this[_0x49fd51(0x7d0)](0x6);if(_0x5bf6e5===_0x49fd51(0x92a))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x5bf6e5===_0x49fd51(0x143))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x7d0)](0x8)*0x64))+'%':this[_0x49fd51(0x7d0)](0x8);if(_0x5bf6e5===_0x49fd51(0x13e))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['xparam'](0x9)*0x64))+'%':this[_0x49fd51(0x7d0)](0x9);if(_0x5bf6e5==='TGR')return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x96c)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x5bf6e5===_0x49fd51(0x1c0))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['sparam'](0x1)*0x64))+'%':this[_0x49fd51(0x96c)](0x1);if(_0x5bf6e5===_0x49fd51(0x44c))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x96c)](0x2)*0x64))+'%':this[_0x49fd51(0x96c)](0x2);if(_0x5bf6e5===_0x49fd51(0x6d4))return _0x2e49a8?String(Math['round'](this[_0x49fd51(0x96c)](0x3)*0x64))+'%':this[_0x49fd51(0x96c)](0x3);if(_0x5bf6e5===_0x49fd51(0x412))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['sparam'](0x4)*0x64))+'%':this[_0x49fd51(0x96c)](0x4);if(_0x5bf6e5===_0x49fd51(0x90a))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x5bf6e5===_0x49fd51(0x53e))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x96c)](0x6)*0x64))+'%':this[_0x49fd51(0x96c)](0x6);if(_0x5bf6e5===_0x49fd51(0x535))return _0x2e49a8?String(Math['round'](this[_0x49fd51(0x96c)](0x7)*0x64))+'%':this[_0x49fd51(0x96c)](0x7);if(_0x5bf6e5===_0x49fd51(0x5f8))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x96c)](0x8)*0x64))+'%':this[_0x49fd51(0x96c)](0x8);if(_0x5bf6e5===_0x49fd51(0x550))return _0x2e49a8?String(Math[_0x49fd51(0xe2)](this[_0x49fd51(0x96c)](0x9)*0x64))+'%':this[_0x49fd51(0x96c)](0x9);if(VisuMZ[_0x49fd51(0x98c)][_0x49fd51(0x907)][_0x5bf6e5]){const _0x2843e3=VisuMZ['CoreEngine']['CustomParamAbb'][_0x5bf6e5],_0x477e9f=this[_0x2843e3];return VisuMZ['CoreEngine'][_0x49fd51(0x870)][_0x5bf6e5]===_0x49fd51(0xdd)?_0x477e9f:_0x2e49a8?String(Math[_0x49fd51(0xe2)](_0x477e9f*0x64))+'%':_0x477e9f;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x4d4db5=_0x54467d;return this['isAlive']()&&this[_0x4d4db5(0x450)]<this['mhp']*VisuMZ[_0x4d4db5(0x98c)][_0x4d4db5(0x357)][_0x4d4db5(0x1e2)]['CrisisRate'];},Game_Battler[_0x54467d(0x895)][_0x54467d(0x5dd)]=function(){const _0x42a970=_0x54467d;SoundManager[_0x42a970(0x7ca)](),this[_0x42a970(0x121)]('evade');},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x93c)]=Game_Actor[_0x54467d(0x895)]['paramBase'],Game_Actor[_0x54467d(0x895)][_0x54467d(0x4d4)]=function(_0x49a8d4){const _0x1b72c6=_0x54467d;if(this[_0x1b72c6(0x8d1)]>0x63)return this[_0x1b72c6(0x3a0)](_0x49a8d4);return VisuMZ[_0x1b72c6(0x98c)][_0x1b72c6(0x93c)]['call'](this,_0x49a8d4);},Game_Actor[_0x54467d(0x895)]['paramBaseAboveLevel99']=function(_0x2edc12){const _0x2f05c1=_0x54467d,_0x1285cd=this[_0x2f05c1(0x3be)]()[_0x2f05c1(0x4a7)][_0x2edc12][0x63],_0x1b2d66=this['currentClass']()[_0x2f05c1(0x4a7)][_0x2edc12][0x62];return _0x1285cd+(_0x1285cd-_0x1b2d66)*(this[_0x2f05c1(0x8d1)]-0x63);},VisuMZ[_0x54467d(0x98c)]['Game_Actor_changeClass']=Game_Actor[_0x54467d(0x895)][_0x54467d(0x376)],Game_Actor[_0x54467d(0x895)]['changeClass']=function(_0x205284,_0x12a05b){const _0xef104e=_0x54467d;$gameTemp[_0xef104e(0x24d)]=!![],VisuMZ[_0xef104e(0x98c)][_0xef104e(0xde)][_0xef104e(0x52e)](this,_0x205284,_0x12a05b),$gameTemp[_0xef104e(0x24d)]=undefined;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x3c1)]=Game_Actor[_0x54467d(0x895)][_0x54467d(0x7de)],Game_Actor[_0x54467d(0x895)][_0x54467d(0x7de)]=function(){const _0x33ccb9=_0x54467d;VisuMZ[_0x33ccb9(0x98c)][_0x33ccb9(0x3c1)][_0x33ccb9(0x52e)](this);if(!$gameTemp['_changingClass'])this[_0x33ccb9(0x65d)]();},Game_Actor[_0x54467d(0x895)][_0x54467d(0x65d)]=function(){const _0x8deb70=_0x54467d;this[_0x8deb70(0x605)]={};if(VisuMZ[_0x8deb70(0x98c)][_0x8deb70(0x357)][_0x8deb70(0x355)][_0x8deb70(0x71d)])this[_0x8deb70(0x450)]=this['mhp'];if(VisuMZ[_0x8deb70(0x98c)][_0x8deb70(0x357)]['QoL'][_0x8deb70(0x677)])this[_0x8deb70(0x3d0)]=this[_0x8deb70(0x5af)];},Game_Actor['prototype'][_0x54467d(0x2c1)]=function(){const _0x1f9a0=_0x54467d;if(this[_0x1f9a0(0x4f5)]())return 0x1;const _0x92dd41=this[_0x1f9a0(0x750)]()-this[_0x1f9a0(0x751)](),_0xf4e39d=this['currentExp']()-this['currentLevelExp']();return(_0xf4e39d/_0x92dd41)['clamp'](0x0,0x1);},Game_Actor[_0x54467d(0x895)][_0x54467d(0x6ca)]=function(){const _0x5d677a=_0x54467d,_0x54f62f=Game_Battler[_0x5d677a(0x895)]['traitObjects'][_0x5d677a(0x52e)](this);for(const _0x16b4ba of this[_0x5d677a(0x522)]()){'ATXlf'===_0x5d677a(0x511)?_0x16b4ba&&_0x54f62f[_0x5d677a(0x37e)](_0x16b4ba):this[_0x5d677a(0x891)]();}return _0x54f62f[_0x5d677a(0x37e)](this['currentClass'](),this['actor']()),_0x54f62f;},Object[_0x54467d(0x2a4)](Game_Enemy[_0x54467d(0x895)],'level',{'get':function(){const _0x1413f6=_0x54467d;return this[_0x1413f6(0x692)]();},'configurable':!![]}),Game_Enemy[_0x54467d(0x895)][_0x54467d(0x692)]=function(){const _0x570bef=_0x54467d;return this[_0x570bef(0x8e1)]()[_0x570bef(0x8d1)];},Game_Enemy[_0x54467d(0x895)][_0x54467d(0x862)]=function(){const _0x43aa3b=_0x54467d;if(!this[_0x43aa3b(0x802)]){if('NWBTe'!=='wVFfG')this[_0x43aa3b(0x2fb)]+=Math[_0x43aa3b(0xe2)]((Graphics[_0x43aa3b(0x2d9)]-0x270)/0x2),this[_0x43aa3b(0x2fb)]-=Math['floor']((Graphics[_0x43aa3b(0x2d9)]-Graphics[_0x43aa3b(0x94f)])/0x2),$gameSystem[_0x43aa3b(0x29e)]()?this[_0x43aa3b(0x89a)]-=Math[_0x43aa3b(0x881)]((Graphics[_0x43aa3b(0x36d)]-Graphics['boxWidth'])/0x2):this['_screenX']+=Math[_0x43aa3b(0xe2)]((Graphics[_0x43aa3b(0x7c0)]-0x330)/0x2);else return _0x33bdcc['CoreEngine'][_0x43aa3b(0x357)][_0x43aa3b(0x211)]['ItemBackColor1'];}this[_0x43aa3b(0x802)]=!![];},Game_Party['prototype'][_0x54467d(0x44e)]=function(){const _0x5b5b1b=_0x54467d;return VisuMZ[_0x5b5b1b(0x98c)]['Settings']['Gold']['GoldMax'];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x4c7)]=Game_Party[_0x54467d(0x895)][_0x54467d(0x6a1)],Game_Party[_0x54467d(0x895)][_0x54467d(0x6a1)]=function(_0x2d8352){const _0x3cd0b9=_0x54467d;if(VisuMZ[_0x3cd0b9(0x98c)][_0x3cd0b9(0x357)][_0x3cd0b9(0x355)][_0x3cd0b9(0x128)]&&DataManager[_0x3cd0b9(0x1fa)](_0x2d8352))return;VisuMZ[_0x3cd0b9(0x98c)]['Game_Party_consumeItem'][_0x3cd0b9(0x52e)](this,_0x2d8352);},Game_Party[_0x54467d(0x895)]['setupBattleTestItems']=function(){const _0x2265c0=_0x54467d,_0x343b7c=VisuMZ['CoreEngine'][_0x2265c0(0x357)][_0x2265c0(0x355)],_0x7feed3=_0x343b7c[_0x2265c0(0x7a2)]??0x63;let _0x2d8d2b=[];(_0x343b7c[_0x2265c0(0x300)]??!![])&&(_0x2d8d2b=_0x2d8d2b[_0x2265c0(0x3b0)]($dataItems));(_0x343b7c[_0x2265c0(0x549)]??!![])&&(_0x2265c0(0x3b7)!==_0x2265c0(0x3b7)?this['select'](0x0):_0x2d8d2b=_0x2d8d2b['concat']($dataWeapons));(_0x343b7c['BTestArmors']??!![])&&(_0x2d8d2b=_0x2d8d2b['concat']($dataArmors));for(const _0x2d4e4b of _0x2d8d2b){if('MEoDT'===_0x2265c0(0x468)){if(!_0xfebe62[_0x2265c0(0x98c)][_0x2265c0(0x357)][_0x2265c0(0x355)][_0x2265c0(0x955)])return;if(this[_0x2265c0(0x4c1)]===this['scale']['x']&&this[_0x2265c0(0x9a2)]===this[_0x2265c0(0x12d)]['y'])return;this[_0x2265c0(0x1cd)](),this[_0x2265c0(0x4c1)]=this[_0x2265c0(0x12d)]['x'],this[_0x2265c0(0x9a2)]=this[_0x2265c0(0x12d)]['y'];}else{if(!_0x2d4e4b)continue;if(_0x2d4e4b[_0x2265c0(0x33a)][_0x2265c0(0x747)]()<=0x0)continue;if(_0x2d4e4b[_0x2265c0(0x33a)][_0x2265c0(0x8b6)](/-----/i))continue;this[_0x2265c0(0x671)](_0x2d4e4b,_0x7feed3);}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x3af)]=Game_Troop[_0x54467d(0x895)]['setup'],Game_Troop[_0x54467d(0x895)]['setup']=function(_0x35bbde){const _0x3fbc91=_0x54467d;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x3fbc91(0x5a3)](_0x35bbde),VisuMZ[_0x3fbc91(0x98c)][_0x3fbc91(0x3af)][_0x3fbc91(0x52e)](this,_0x35bbde);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x312)]=Game_Map['prototype']['setup'],Game_Map[_0x54467d(0x895)][_0x54467d(0x449)]=function(_0x207360){const _0x3c2256=_0x54467d;VisuMZ['CoreEngine'][_0x3c2256(0x312)][_0x3c2256(0x52e)](this,_0x207360),this[_0x3c2256(0x3e9)](),this[_0x3c2256(0x195)](_0x207360);},Game_Map[_0x54467d(0x895)]['setupCoreEngine']=function(){const _0x3617c1=_0x54467d;this['_hideTileShadows']=VisuMZ[_0x3617c1(0x98c)][_0x3617c1(0x357)][_0x3617c1(0x355)][_0x3617c1(0x5e9)]||![];const _0x9567ea=VisuMZ[_0x3617c1(0x98c)]['Settings'][_0x3617c1(0x3cd)],_0x1ea3ed=$dataMap?$dataMap[_0x3617c1(0x944)]||'':'';if(_0x1ea3ed[_0x3617c1(0x8b6)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else{if(_0x1ea3ed[_0x3617c1(0x8b6)](/<HIDE TILE SHADOWS>/i)){if(_0x3617c1(0x385)!==_0x3617c1(0x385))return _0x30d6ba['boxHeight']-this[_0x3617c1(0x847)]();else this[_0x3617c1(0x734)]=!![];}}if(_0x1ea3ed['match'](/<SCROLL LOCK X>/i)){if(_0x3617c1(0x30e)!==_0x3617c1(0x485))this[_0x3617c1(0x5a0)]()['centerX']=!![],this[_0x3617c1(0x5a0)]()[_0x3617c1(0x10b)]=_0x9567ea[_0x3617c1(0x947)];else{const _0x3afc12=this[_0x3617c1(0x985)](_0x5e42a6),_0x3a5e75=new(_0x3afc12?_0x4575c0:_0x5608e6)();_0x3a5e75[_0x3617c1(0x3ab)]=_0x1e0f51,_0x3a5e75[_0x3617c1(0x449)](_0x403c96,_0x5dda3d,_0x1b4c2e,_0x22a44c),_0x3a5e75[_0x3617c1(0x4a1)](_0x316fff),this[_0x3617c1(0x4d0)](_0x3a5e75),this['_pointAnimationSprites'][_0x3617c1(0x37e)](_0x3a5e75);}}else _0x1ea3ed[_0x3617c1(0x8b6)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x3617c1(0x5a0)]()['centerX']=!![],this[_0x3617c1(0x5a0)]()[_0x3617c1(0x10b)]=Number(RegExp['$1']));if(_0x1ea3ed[_0x3617c1(0x8b6)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x3617c1(0x4dc)]=!![],this[_0x3617c1(0x5a0)]()[_0x3617c1(0x2f8)]=_0x9567ea['DisplayLockY'];else _0x1ea3ed[_0x3617c1(0x8b6)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x3617c1(0x5a0)]()[_0x3617c1(0x4dc)]=!![],this['centerCameraCheckData']()['displayY']=Number(RegExp['$1']));},Game_Map[_0x54467d(0x895)]['areTileShadowsHidden']=function(){const _0x26a490=_0x54467d;if(this[_0x26a490(0x734)]===undefined)this[_0x26a490(0x195)]();return this[_0x26a490(0x734)];},Game_Map[_0x54467d(0x895)][_0x54467d(0x3e9)]=function(){const _0x5b02cf=_0x54467d,_0x9a916f=VisuMZ[_0x5b02cf(0x98c)][_0x5b02cf(0x357)][_0x5b02cf(0x3cd)];this[_0x5b02cf(0x335)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x9a916f[_0x5b02cf(0x402)]){if('XCXHm'!==_0x5b02cf(0x31d)){const _0x5825f2=Graphics[_0x5b02cf(0x36d)]/this[_0x5b02cf(0x145)]();_0x5825f2%0x1!==0x0&&Math[_0x5b02cf(0x948)](_0x5825f2)===this[_0x5b02cf(0x36d)]()&&!this[_0x5b02cf(0x185)]()&&('TfMys'!==_0x5b02cf(0x4e8)?(this[_0x5b02cf(0x335)][_0x5b02cf(0x315)]=!![],this[_0x5b02cf(0x335)][_0x5b02cf(0x10b)]=_0x9a916f[_0x5b02cf(0x947)]||0x0):_0x5afc50=_0x5b02cf(0x3bb)[_0x5b02cf(0x875)](_0x497017,_0x516fce));}else return this['_pointAnimationSprites'][_0x5b02cf(0x959)]>0x0;}if(_0x9a916f[_0x5b02cf(0x78a)]){const _0x2bba97=Graphics[_0x5b02cf(0x2d9)]/this[_0x5b02cf(0x573)]();_0x2bba97%0x1!==0x0&&Math[_0x5b02cf(0x948)](_0x2bba97)===this[_0x5b02cf(0x2d9)]()&&!this[_0x5b02cf(0x6b7)]()&&(this[_0x5b02cf(0x335)][_0x5b02cf(0x4dc)]=!![],this[_0x5b02cf(0x335)][_0x5b02cf(0x2f8)]=_0x9a916f['DisplayLockY']||0x0);}},Game_Map[_0x54467d(0x895)][_0x54467d(0x5a0)]=function(){const _0x3cecab=_0x54467d;if(this['_centerCameraCheck']===undefined)this[_0x3cecab(0x3e9)]();return this['_centerCameraCheck'];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x7f0)]=Game_Map[_0x54467d(0x895)][_0x54467d(0x2eb)],Game_Map[_0x54467d(0x895)][_0x54467d(0x2eb)]=function(_0x27a8c7){const _0x747d96=_0x54467d;if(this[_0x747d96(0x5a0)]()['centerY']&&$gameScreen[_0x747d96(0x863)]()===0x1){this['_displayY']=this['centerCameraCheckData']()[_0x747d96(0x2f8)];return;}VisuMZ['CoreEngine'][_0x747d96(0x7f0)][_0x747d96(0x52e)](this,_0x27a8c7);},VisuMZ['CoreEngine'][_0x54467d(0x900)]=Game_Map['prototype']['scrollLeft'],Game_Map[_0x54467d(0x895)][_0x54467d(0x7fc)]=function(_0x195ca7){const _0x43e68d=_0x54467d;if(this[_0x43e68d(0x5a0)]()[_0x43e68d(0x315)]&&$gameScreen[_0x43e68d(0x863)]()===0x1){this[_0x43e68d(0x87a)]=this['centerCameraCheckData']()[_0x43e68d(0x10b)];return;}VisuMZ[_0x43e68d(0x98c)][_0x43e68d(0x900)][_0x43e68d(0x52e)](this,_0x195ca7);},VisuMZ['CoreEngine'][_0x54467d(0x719)]=Game_Map['prototype']['scrollRight'],Game_Map[_0x54467d(0x895)]['scrollRight']=function(_0x3e4817){const _0x489f9a=_0x54467d;if(this[_0x489f9a(0x5a0)]()['centerX']&&$gameScreen[_0x489f9a(0x863)]()===0x1){this['_displayX']=this[_0x489f9a(0x5a0)]()[_0x489f9a(0x10b)];return;}VisuMZ[_0x489f9a(0x98c)]['Game_Map_scrollRight'][_0x489f9a(0x52e)](this,_0x3e4817);},VisuMZ['CoreEngine'][_0x54467d(0x430)]=Game_Map[_0x54467d(0x895)][_0x54467d(0x50c)],Game_Map[_0x54467d(0x895)][_0x54467d(0x50c)]=function(_0x5cad89){const _0x27496a=_0x54467d;if(this[_0x27496a(0x5a0)]()['centerY']&&$gameScreen[_0x27496a(0x863)]()===0x1){if(_0x27496a(0x3db)!==_0x27496a(0x350)){this['_displayY']=this[_0x27496a(0x5a0)]()[_0x27496a(0x2f8)];return;}else this[_0x27496a(0x8c4)]=0x0;}VisuMZ[_0x27496a(0x98c)]['Game_Map_scrollUp'][_0x27496a(0x52e)](this,_0x5cad89);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x404)]=Game_Character['prototype'][_0x54467d(0xed)],Game_Character[_0x54467d(0x895)][_0x54467d(0xed)]=function(_0x2d7ef7){const _0x3ea306=_0x54467d;try{VisuMZ['CoreEngine'][_0x3ea306(0x404)]['call'](this,_0x2d7ef7);}catch(_0x42b66a){if($gameTemp[_0x3ea306(0x595)]())console[_0x3ea306(0x56f)](_0x42b66a);}},Game_Player[_0x54467d(0x895)][_0x54467d(0x75d)]=function(){const _0x246201=_0x54467d,_0x1dfed9=$gameMap[_0x246201(0x382)]();this['_encounterCount']=Math['randomInt'](_0x1dfed9)+Math[_0x246201(0x9b8)](_0x1dfed9)+this[_0x246201(0x801)]();},Game_Player[_0x54467d(0x895)][_0x54467d(0x801)]=function(){const _0x4ebdb8=_0x54467d;return $dataMap&&$dataMap['note']&&$dataMap[_0x4ebdb8(0x944)][_0x4ebdb8(0x8b6)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x4ebdb8(0x98c)][_0x4ebdb8(0x357)][_0x4ebdb8(0x355)][_0x4ebdb8(0x7ea)];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x80c)]=Game_Event[_0x54467d(0x895)][_0x54467d(0x689)],Game_Event[_0x54467d(0x895)][_0x54467d(0x689)]=function(_0x4fc732,_0x46b17b){const _0x28645b=_0x54467d;return this[_0x28645b(0x6ed)]()?this[_0x28645b(0x4bc)](_0x4fc732,_0x46b17b):VisuMZ[_0x28645b(0x98c)][_0x28645b(0x80c)][_0x28645b(0x52e)](this,_0x4fc732,_0x46b17b);},Game_Event[_0x54467d(0x895)][_0x54467d(0x6ed)]=function(){const _0x26655f=_0x54467d;return VisuMZ[_0x26655f(0x98c)][_0x26655f(0x357)]['QoL'][_0x26655f(0x5c0)];},Game_Event['prototype'][_0x54467d(0x4bc)]=function(_0x500561,_0x23742e){const _0x121c66=_0x54467d;if(!this[_0x121c66(0x496)]()){if('bPxjF'===_0x121c66(0xca)){const _0x3130c3=_0x3a4dc2[_0x19f4d0[_0x121c66(0x2db)]],_0x1cd18f=_0x500bb0[_0x121c66(0x35e)],_0x282af8=_0x107295[_0x121c66(0x810)],_0x130fee=_0x1bf870[_0x121c66(0x141)];let _0x1ec943=this[_0x121c66(0x5cd)]();const _0x1a1374=this[_0x121c66(0x5e7)]();if(this[_0x121c66(0x363)](_0x3130c3))for(const _0x3ea78f of _0x1cd18f){this['createFauxAnimationSprite']([_0x3ea78f],_0x3130c3,_0x282af8,_0x1ec943,_0x130fee),_0x1ec943+=_0x1a1374;}else this[_0x121c66(0x245)](_0x1cd18f,_0x3130c3,_0x282af8,_0x1ec943,_0x130fee);}else return![];}else{const _0x105f8f=$gameMap[_0x121c66(0x848)](_0x500561,_0x23742e)['filter'](_0x441479=>_0x441479['isNormalPriority']());return _0x105f8f[_0x121c66(0x959)]>0x0;}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x556)]=Game_Interpreter['prototype']['command105'],Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x644)]=function(_0x5c8209){const _0x3cc126=_0x54467d,_0x3334ea=this[_0x3cc126(0x67f)]();return _0x3334ea['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x3cc126(0x814)](_0x3334ea):VisuMZ[_0x3cc126(0x98c)][_0x3cc126(0x556)][_0x3cc126(0x52e)](this,_0x5c8209);},Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x67f)]=function(){const _0x2dc562=_0x54467d;let _0x2ff3b3='',_0x42a900=this[_0x2dc562(0x21b)]+0x1;while(this[_0x2dc562(0x112)][_0x42a900]&&this['_list'][_0x42a900][_0x2dc562(0x587)]===0x195){if(_0x2dc562(0x688)===_0x2dc562(0x904)){const _0xed5984=_0x2dc562(0x3f6);this[_0x2dc562(0x38e)]=this['_colorCache']||{};if(this[_0x2dc562(0x38e)][_0xed5984])return this['_colorCache'][_0xed5984];const _0x5c8e6b=_0x2ef5a1[_0x2dc562(0x98c)]['Settings'][_0x2dc562(0x211)][_0x2dc562(0x18d)];return this[_0x2dc562(0x7b7)](_0xed5984,_0x5c8e6b);}else _0x2ff3b3+=this['_list'][_0x42a900][_0x2dc562(0x3d2)][0x0]+'\x0a',_0x42a900++;}return _0x2ff3b3;},Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x814)]=function(_0x398bca){const _0x53068d=_0x54467d;try{'BxOgu'!==_0x53068d(0x6ff)?eval(_0x398bca):(_0x476b51['prototype'][_0x53068d(0x26b)][_0x53068d(0x52e)](this),this[_0x53068d(0x9b4)]());}catch(_0x1f5b1a){$gameTemp[_0x53068d(0x595)]()&&(console[_0x53068d(0x56f)](_0x53068d(0x20c)),console['log'](_0x1f5b1a));}return!![];},VisuMZ[_0x54467d(0x98c)]['Game_Interpreter_command111']=Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x34f)],Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x34f)]=function(_0x3b9f46){const _0x267544=_0x54467d;try{VisuMZ[_0x267544(0x98c)]['Game_Interpreter_command111'][_0x267544(0x52e)](this,_0x3b9f46);}catch(_0x387f55){_0x267544(0x102)===_0x267544(0x422)?this[_0x267544(0x5a8)][_0x267544(0x48c)]-=0x6:($gameTemp[_0x267544(0x595)]()&&(console[_0x267544(0x56f)](_0x267544(0x354)),console[_0x267544(0x56f)](_0x387f55)),this[_0x267544(0x415)]());}return!![];},VisuMZ[_0x54467d(0x98c)]['Game_Interpreter_command122']=Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x55b)],Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x55b)]=function(_0x566dac){const _0x267ffb=_0x54467d;try{if(_0x267ffb(0x803)==='dAkiS')return this[_0x267ffb(0x1fe)]?this[_0x267ffb(0x1fe)][_0x267ffb(0x813)]():_0x3123b8['CoreEngine'][_0x267ffb(0x357)][_0x267ffb(0x1e8)]['length'];else VisuMZ['CoreEngine'][_0x267ffb(0x80e)]['call'](this,_0x566dac);}catch(_0x34a0d0){_0x267ffb(0x772)==='ZyrHF'?$gameTemp[_0x267ffb(0x595)]()&&(_0x267ffb(0x3eb)===_0x267ffb(0x3eb)?(console[_0x267ffb(0x56f)](_0x267ffb(0x9a5)),console[_0x267ffb(0x56f)](_0x34a0d0)):_0x1e2259[_0x267ffb(0x98c)]['Game_Interpreter_command355']['call'](this)):(_0x2b651d[_0x267ffb(0x895)][_0x267ffb(0xf0)][_0x267ffb(0x52e)](this),this[_0x267ffb(0x771)](),this[_0x267ffb(0x1ff)][_0x267ffb(0x4db)](),this[_0x267ffb(0x1ff)][_0x267ffb(0x60e)](),this[_0x267ffb(0x2a3)][_0x267ffb(0x52a)]());}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x7b6)],Game_Interpreter['prototype'][_0x54467d(0x7b6)]=function(){const _0x4f0430=_0x54467d;try{VisuMZ[_0x4f0430(0x98c)][_0x4f0430(0x817)][_0x4f0430(0x52e)](this);}catch(_0x1a7e3c){if($gameTemp['isPlaytest']()){if(_0x4f0430(0x680)!==_0x4f0430(0x7e6))console[_0x4f0430(0x56f)](_0x4f0430(0x4e7)),console[_0x4f0430(0x56f)](_0x1a7e3c);else{if(_0x4af93e['isPlaytest']())_0x4eaba1[_0x4f0430(0x56f)](_0x1d4de1);}}}return!![];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x76c)]=Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x9b0)],Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x9b0)]=function(_0x5a6c38){const _0x5c65e7=_0x54467d;return $gameTemp[_0x5c65e7(0x62f)](this),VisuMZ[_0x5c65e7(0x98c)][_0x5c65e7(0x76c)][_0x5c65e7(0x52e)](this,_0x5a6c38);},Scene_Base['prototype'][_0x54467d(0x264)]=function(){const _0x2b51c4=_0x54467d;return VisuMZ[_0x2b51c4(0x98c)]['Settings']['UI']['FadeSpeed'];},Scene_Base[_0x54467d(0x895)][_0x54467d(0x98f)]=function(){const _0xdc6009=_0x54467d;return VisuMZ['CoreEngine'][_0xdc6009(0x357)]['UI'][_0xdc6009(0x921)];},Scene_Base[_0x54467d(0x895)]['isBottomButtonMode']=function(){const _0x416352=_0x54467d;return VisuMZ[_0x416352(0x98c)][_0x416352(0x357)]['UI'][_0x416352(0x3b1)];},Scene_Base[_0x54467d(0x895)][_0x54467d(0x62b)]=function(){const _0x344cde=_0x54467d;return VisuMZ['CoreEngine'][_0x344cde(0x357)]['UI']['RightMenus'];},Scene_Base[_0x54467d(0x895)][_0x54467d(0x21a)]=function(){const _0x1f3a1f=_0x54467d;return VisuMZ[_0x1f3a1f(0x98c)][_0x1f3a1f(0x357)]['UI'][_0x1f3a1f(0x6a3)];},Scene_Base[_0x54467d(0x895)][_0x54467d(0x198)]=function(){const _0x28401f=_0x54467d;return VisuMZ[_0x28401f(0x98c)][_0x28401f(0x357)]['UI'][_0x28401f(0xf2)];},Scene_Base['prototype'][_0x54467d(0x62d)]=function(){const _0x2626ae=_0x54467d;return VisuMZ[_0x2626ae(0x98c)][_0x2626ae(0x357)]['Window'][_0x2626ae(0x1d9)];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8e4)]=Scene_Base[_0x54467d(0x895)][_0x54467d(0x927)],Scene_Base[_0x54467d(0x895)][_0x54467d(0x927)]=function(){const _0x2c874a=_0x54467d;VisuMZ[_0x2c874a(0x98c)][_0x2c874a(0x8e4)][_0x2c874a(0x52e)](this),this[_0x2c874a(0x96e)](),this['_windowLayer']['x']=Math['round'](this[_0x2c874a(0x7d6)]['x']),this[_0x2c874a(0x7d6)]['y']=Math[_0x2c874a(0xe2)](this['_windowLayer']['y']);},Scene_Base[_0x54467d(0x895)][_0x54467d(0x96e)]=function(){},Scene_Base['prototype'][_0x54467d(0x969)]=function(){const _0x739c45=_0x54467d;return TextManager[_0x739c45(0x8f4)](_0x739c45(0x42a),_0x739c45(0x5c1));},Scene_Base[_0x54467d(0x895)][_0x54467d(0x828)]=function(){const _0x14738e=_0x54467d;return TextManager[_0x14738e(0x307)](_0x14738e(0x6df));},Scene_Base['prototype'][_0x54467d(0x623)]=function(){const _0x221d48=_0x54467d;return TextManager[_0x221d48(0x307)](_0x221d48(0x934));},Scene_Base[_0x54467d(0x895)]['buttonAssistKey4']=function(){const _0x177125=_0x54467d;return TextManager[_0x177125(0x307)]('ok');},Scene_Base[_0x54467d(0x895)][_0x54467d(0x8a8)]=function(){const _0x36404c=_0x54467d;return TextManager[_0x36404c(0x307)](_0x36404c(0xf3));},Scene_Base['prototype'][_0x54467d(0x92d)]=function(){const _0x8f11d1=_0x54467d;if(this['_pageupButton']&&this['_pageupButton'][_0x8f11d1(0x4dd)])return _0x8f11d1(0x7a5)!=='vPDrP'?_0x6a6c8d['layoutSettings'][_0x8f11d1(0x674)][_0x8f11d1(0x52e)](this):TextManager[_0x8f11d1(0x2cd)];else{if(_0x8f11d1(0x6d5)!==_0x8f11d1(0x6d5))_0x55edff['loadBitmap'](_0x4955e5,_0x44ba09);else return'';}},Scene_Base['prototype'][_0x54467d(0x5cc)]=function(){return'';},Scene_Base['prototype'][_0x54467d(0x6d9)]=function(){return'';},Scene_Base[_0x54467d(0x895)][_0x54467d(0x1b3)]=function(){const _0x382327=_0x54467d;return TextManager[_0x382327(0x7d9)];},Scene_Base[_0x54467d(0x895)][_0x54467d(0x6c7)]=function(){const _0x2a5214=_0x54467d;return TextManager[_0x2a5214(0x785)];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x54467d(0x895)][_0x54467d(0x6a8)]=function(){return 0x0;},Scene_Base['prototype'][_0x54467d(0x4a5)]=function(){return 0x0;},Scene_Base[_0x54467d(0x895)][_0x54467d(0x706)]=function(){return 0x0;},VisuMZ[_0x54467d(0x98c)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x54467d(0x895)][_0x54467d(0x95f)],Scene_Boot['prototype'][_0x54467d(0x95f)]=function(){const _0x433ad7=_0x54467d;VisuMZ[_0x433ad7(0x98c)][_0x433ad7(0x242)]['call'](this),this[_0x433ad7(0x137)]();},Scene_Boot['prototype'][_0x54467d(0x137)]=function(){const _0x2dd162=_0x54467d,_0x11ab74=[_0x2dd162(0x7af),_0x2dd162(0x5e0),'battlebacks2',_0x2dd162(0x64a),_0x2dd162(0x820),_0x2dd162(0x8c3),_0x2dd162(0x196),_0x2dd162(0x1fc),'sv_actors',_0x2dd162(0x75e),_0x2dd162(0x698),'tilesets',_0x2dd162(0x4c0),'titles2'];for(const _0x967b13 of _0x11ab74){if(_0x2dd162(0x630)===_0x2dd162(0x279))return!![];else{const _0x53c720=VisuMZ['CoreEngine'][_0x2dd162(0x357)][_0x2dd162(0x60d)][_0x967b13],_0x318fa4=_0x2dd162(0x905)['format'](_0x967b13);for(const _0x1b8d56 of _0x53c720){_0x2dd162(0x872)===_0x2dd162(0x872)?ImageManager[_0x2dd162(0x2a0)](_0x318fa4,_0x1b8d56):_0x4fcb17+=_0x5ac0f4(_0x4562ff);}}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x786)]=Scene_Boot[_0x54467d(0x895)]['startNormalGame'],Scene_Boot['prototype']['startNormalGame']=function(){const _0x5eea15=_0x54467d;if(Utils[_0x5eea15(0x685)]('test')&&VisuMZ[_0x5eea15(0x98c)][_0x5eea15(0x357)][_0x5eea15(0x355)][_0x5eea15(0x5e8)]){if(_0x5eea15(0x8bf)!=='AWPHV'){const _0x13b3b3=_0x53c14d['CoreEngine'][_0x5eea15(0x357)]['ScreenShake'];if(_0x13b3b3&&_0x13b3b3[_0x5eea15(0x914)])return _0x13b3b3[_0x5eea15(0x914)][_0x5eea15(0x52e)](this);const _0x41f86b=_0x6f4d7b['_shakePower']*0.75,_0x1ff900=_0x54cffe[_0x5eea15(0x50f)]*0.6,_0x35dfb0=_0x41e412[_0x5eea15(0x648)];this['x']+=_0x2aaed8[_0x5eea15(0xe2)](_0x19d529['randomInt'](_0x41f86b)-_0x5451bf[_0x5eea15(0x9b8)](_0x1ff900))*(_0x44fd13[_0x5eea15(0x625)](_0x35dfb0,0x1e)*0.5),this['y']+=_0xe4f351[_0x5eea15(0xe2)](_0x3bb619[_0x5eea15(0x9b8)](_0x41f86b)-_0x46a6f7[_0x5eea15(0x9b8)](_0x1ff900))*(_0x26509e[_0x5eea15(0x625)](_0x35dfb0,0x1e)*0.5);}else this[_0x5eea15(0x30d)]();}else{if(_0x5eea15(0x3b3)!==_0x5eea15(0x3b3)){if(this['isMaxLevel']())return 0x1;const _0x16d792=this[_0x5eea15(0x750)]()-this['currentLevelExp'](),_0x18f5a4=this['currentExp']()-this['currentLevelExp']();return(_0x18f5a4/_0x16d792)['clamp'](0x0,0x1);}else VisuMZ[_0x5eea15(0x98c)][_0x5eea15(0x786)]['call'](this);}},Scene_Boot['prototype'][_0x54467d(0x30d)]=function(){const _0x1aa132=_0x54467d;DataManager[_0x1aa132(0x126)](),SceneManager[_0x1aa132(0x39c)](Scene_Map);},Scene_Boot[_0x54467d(0x895)][_0x54467d(0x9b5)]=function(){const _0x5b24da=_0x54467d,_0x2e500b=$dataSystem['advanced'][_0x5b24da(0x6b3)],_0x19b720=$dataSystem[_0x5b24da(0x88f)]['uiAreaHeight'],_0x4365f7=VisuMZ[_0x5b24da(0x98c)][_0x5b24da(0x357)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x2e500b-_0x4365f7*0x2,Graphics[_0x5b24da(0x94f)]=_0x19b720-_0x4365f7*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x88d)]=Scene_Boot[_0x54467d(0x895)][_0x54467d(0x11e)],Scene_Boot[_0x54467d(0x895)][_0x54467d(0x11e)]=function(){const _0x213d72=_0x54467d;this[_0x213d72(0x66f)]()?_0x213d72(0x2b8)===_0x213d72(0x79b)?_0xa87083['CoreEngine'][_0x213d72(0x1fd)]['call'](this):this[_0x213d72(0x2b0)]():VisuMZ[_0x213d72(0x98c)][_0x213d72(0x88d)][_0x213d72(0x52e)](this);},Scene_Boot[_0x54467d(0x895)][_0x54467d(0x66f)]=function(){const _0x17253a=_0x54467d;if(Scene_Title[_0x17253a(0x184)]==='')return![];if(Scene_Title[_0x17253a(0x184)]===_0x17253a(0x4d5))return![];if(Scene_Title[_0x17253a(0x43b)]==='')return![];if(Scene_Title[_0x17253a(0x43b)]===_0x17253a(0x255))return![];return!![];},Scene_Boot['prototype'][_0x54467d(0x2b0)]=function(){const _0x15f8d0=_0x54467d,_0x14ce0d=$dataSystem['gameTitle'],_0x5a6cfe=Scene_Title['subtitle']||'',_0x2a1d55=Scene_Title[_0x15f8d0(0x43b)]||'',_0xdf278e=VisuMZ[_0x15f8d0(0x98c)]['Settings'][_0x15f8d0(0x2fe)][_0x15f8d0(0x30a)][_0x15f8d0(0x950)],_0x1abd80=_0xdf278e[_0x15f8d0(0x875)](_0x14ce0d,_0x5a6cfe,_0x2a1d55);document[_0x15f8d0(0x42f)]=_0x1abd80;},Scene_Boot['prototype'][_0x54467d(0x3c9)]=function(){const _0x5ed33b=_0x54467d;if(VisuMZ[_0x5ed33b(0x98c)]['Settings']['UI'][_0x5ed33b(0x3c3)]){if(_0x5ed33b(0x86e)===_0x5ed33b(0x86e)){const _0x5a80b5=Graphics['width']-Graphics[_0x5ed33b(0x7c0)]-VisuMZ[_0x5ed33b(0x98c)][_0x5ed33b(0x357)]['UI'][_0x5ed33b(0x1d0)]*0x2,_0x3cc560=Sprite_Button[_0x5ed33b(0x895)][_0x5ed33b(0x6e2)]['call'](this)*0x4;if(_0x5a80b5>=_0x3cc560)SceneManager[_0x5ed33b(0x460)](!![]);}else this[_0x5ed33b(0x1c1)]['onload']=null,this['_onLoad']();}},Scene_Title[_0x54467d(0x184)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['MenuLayout'][_0x54467d(0x30a)]['Subtitle'],Scene_Title[_0x54467d(0x43b)]=VisuMZ['CoreEngine'][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x30a)][_0x54467d(0xfc)],Scene_Title[_0x54467d(0x18f)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x2e1)],VisuMZ['CoreEngine'][_0x54467d(0x298)]=Scene_Title[_0x54467d(0x895)]['drawGameTitle'],Scene_Title['prototype'][_0x54467d(0x56e)]=function(){const _0x26ee46=_0x54467d;VisuMZ[_0x26ee46(0x98c)][_0x26ee46(0x357)][_0x26ee46(0x2fe)][_0x26ee46(0x30a)]['drawGameTitle']['call'](this);if(Scene_Title[_0x26ee46(0x184)]!==''&&Scene_Title[_0x26ee46(0x184)]!==_0x26ee46(0x4d5))this[_0x26ee46(0x4d9)]();if(Scene_Title['version']!==''&&Scene_Title[_0x26ee46(0x43b)]!==_0x26ee46(0x255))this[_0x26ee46(0x8ec)]();},Scene_Title[_0x54467d(0x895)][_0x54467d(0x4d9)]=function(){const _0xe6a68e=_0x54467d;VisuMZ[_0xe6a68e(0x98c)][_0xe6a68e(0x357)][_0xe6a68e(0x2fe)][_0xe6a68e(0x30a)]['drawGameSubtitle'][_0xe6a68e(0x52e)](this);},Scene_Title[_0x54467d(0x895)][_0x54467d(0x8ec)]=function(){const _0x2d7664=_0x54467d;VisuMZ[_0x2d7664(0x98c)][_0x2d7664(0x357)]['MenuLayout']['Title'][_0x2d7664(0x8ec)][_0x2d7664(0x52e)](this);},Scene_Title[_0x54467d(0x895)][_0x54467d(0x7f6)]=function(){const _0x40cc37=_0x54467d;this[_0x40cc37(0x65c)]();const _0x20ffe9=$dataSystem[_0x40cc37(0x16e)]['background'],_0x5b7da5=this[_0x40cc37(0x861)]();this[_0x40cc37(0x1fe)]=new Window_TitleCommand(_0x5b7da5),this[_0x40cc37(0x1fe)]['setBackgroundType'](_0x20ffe9);const _0x3cd99e=this[_0x40cc37(0x861)]();this[_0x40cc37(0x1fe)][_0x40cc37(0x1bd)](_0x3cd99e['x'],_0x3cd99e['y'],_0x3cd99e['width'],_0x3cd99e['height']),this['_commandWindow'][_0x40cc37(0x6d2)](),this[_0x40cc37(0x1fe)][_0x40cc37(0x527)](),this[_0x40cc37(0x1fe)]['selectLast'](),this['addWindow'](this[_0x40cc37(0x1fe)]);},Scene_Title['prototype'][_0x54467d(0x233)]=function(){const _0x1b8699=_0x54467d;return this['_commandWindow']?this[_0x1b8699(0x1fe)]['maxItems']():_0x1b8699(0x74b)==='QzEaX'?_0x43fb18[_0x1b8699(0x161)](0x0,this[_0x1b8699(0x37f)]):VisuMZ[_0x1b8699(0x98c)][_0x1b8699(0x357)][_0x1b8699(0x1e8)][_0x1b8699(0x959)];},Scene_Title[_0x54467d(0x895)][_0x54467d(0x861)]=function(){const _0x3546c1=_0x54467d;return VisuMZ[_0x3546c1(0x98c)]['Settings'][_0x3546c1(0x2fe)][_0x3546c1(0x30a)][_0x3546c1(0x710)]['call'](this);},Scene_Title['prototype'][_0x54467d(0x65c)]=function(){const _0x8673e7=_0x54467d;for(const _0xd28922 of Scene_Title[_0x8673e7(0x18f)]){if(_0x8673e7(0x100)!==_0x8673e7(0xd7)){const _0x38bcb4=new Sprite_TitlePictureButton(_0xd28922);this[_0x8673e7(0x2c0)](_0x38bcb4);}else return _0x75d2d[_0x8673e7(0x98c)][_0x8673e7(0x357)][_0x8673e7(0x211)][_0x8673e7(0x536)]||_0x8673e7(0x640);}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x169)]=Scene_Map[_0x54467d(0x895)]['initialize'],Scene_Map[_0x54467d(0x895)][_0x54467d(0x15b)]=function(){const _0x26553e=_0x54467d;VisuMZ[_0x26553e(0x98c)][_0x26553e(0x169)][_0x26553e(0x52e)](this),$gameTemp[_0x26553e(0x97a)](),this[_0x26553e(0x8aa)]();},VisuMZ[_0x54467d(0x98c)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x54467d(0x895)][_0x54467d(0x773)],Scene_Map[_0x54467d(0x895)][_0x54467d(0x773)]=function(){const _0x3efb0d=_0x54467d;VisuMZ[_0x3efb0d(0x98c)][_0x3efb0d(0x339)][_0x3efb0d(0x52e)](this),$gameTemp[_0x3efb0d(0x577)]&&!$gameMessage[_0x3efb0d(0x33b)]()&&(this[_0x3efb0d(0x963)](),SceneManager['updateEffekseer']());},Scene_Map['prototype'][_0x54467d(0x2d3)]=function(){const _0x191f8e=_0x54467d;Scene_Message[_0x191f8e(0x895)]['terminate'][_0x191f8e(0x52e)](this),!SceneManager[_0x191f8e(0x684)](Scene_Battle)&&(this[_0x191f8e(0x775)][_0x191f8e(0x6f1)](),this[_0x191f8e(0x81c)][_0x191f8e(0x282)](),this[_0x191f8e(0x7d6)]['visible']=![],SceneManager[_0x191f8e(0x582)]()),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x24f)]=Scene_Map[_0x54467d(0x895)][_0x54467d(0x591)],Scene_Map[_0x54467d(0x895)]['createMenuButton']=function(){const _0x4ab4bd=_0x54467d;VisuMZ[_0x4ab4bd(0x98c)][_0x4ab4bd(0x24f)][_0x4ab4bd(0x52e)](this),SceneManager[_0x4ab4bd(0x97e)]()&&(_0x4ab4bd(0x557)!=='YqyzB'?this['moveMenuButtonSideButtonLayout']():(this[_0x4ab4bd(0x7df)](_0xf9c247,_0x840ae5,_0x5c9328,this[_0x4ab4bd(0x463)]()),_0x14c1ed-=this['gaugeLineHeight']()+0x2,_0x22c0e1+=this['gaugeLineHeight']()+0x2));},Scene_Map[_0x54467d(0x895)][_0x54467d(0x4da)]=function(){const _0x29038d=_0x54467d;this[_0x29038d(0x2c6)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x261)]=Scene_Map['prototype'][_0x54467d(0x48b)],Scene_Map[_0x54467d(0x895)][_0x54467d(0x48b)]=function(){const _0x210832=_0x54467d;VisuMZ['CoreEngine']['Scene_Map_updateScene'][_0x210832(0x52e)](this),this[_0x210832(0x2f3)]();},Scene_Map[_0x54467d(0x895)][_0x54467d(0x2f3)]=function(){const _0x5c52cc=_0x54467d;Input[_0x5c52cc(0x119)](_0x5c52cc(0x75a))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x5c52cc(0x29b)],ConfigManager[_0x5c52cc(0xc6)]());},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x766)]=Scene_Map[_0x54467d(0x895)][_0x54467d(0x963)],Scene_Map[_0x54467d(0x895)][_0x54467d(0x963)]=function(){const _0x2a3132=_0x54467d;VisuMZ[_0x2a3132(0x98c)][_0x2a3132(0x766)]['call'](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x54467d(0x895)][_0x54467d(0x8aa)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x54467d(0x895)][_0x54467d(0x970)]=function(){const _0x2808f9=_0x54467d;if(!this[_0x2808f9(0x6a5)])return;for(const _0x7fb777 of this[_0x2808f9(0x6a5)]){_0x7fb777&&_0x7fb777[_0x2808f9(0x6f1)]();}},Scene_Map['prototype'][_0x54467d(0x1d1)]=function(_0x23f57d){const _0x40ba19=_0x54467d,_0x2f0dfa=$dataCommonEvents[_0x23f57d];if(!_0x2f0dfa)return;const _0x59617f=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x59617f),_0x59617f[_0x40ba19(0x2a8)](_0x23f57d);},Scene_Map['prototype']['addOnceParallelInterpreter']=function(_0x54f9c3){const _0x51456c=_0x54467d;this[_0x51456c(0x6a5)]=this['_onceParallelInterpreters']||[],this[_0x51456c(0x6a5)][_0x51456c(0x37e)](_0x54f9c3);},Scene_Map['prototype'][_0x54467d(0x4fb)]=function(_0x2d9deb){const _0x150f83=_0x54467d;this[_0x150f83(0x6a5)]=this[_0x150f83(0x6a5)]||[],this[_0x150f83(0x6a5)]['remove'](_0x2d9deb);};function Game_OnceParallelInterpreter(){const _0x53ee59=_0x54467d;this[_0x53ee59(0x15b)](...arguments);}Game_OnceParallelInterpreter[_0x54467d(0x895)]=Object[_0x54467d(0x26b)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter['prototype'][_0x54467d(0x615)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x54467d(0x2a8)]=function(_0xd938e4){const _0x4310b3=_0x54467d,_0x5329a5=$dataCommonEvents[_0xd938e4];_0x5329a5?this[_0x4310b3(0x449)](_0x5329a5[_0x4310b3(0x2ef)],0x0):this[_0x4310b3(0x2d3)]();},Game_OnceParallelInterpreter[_0x54467d(0x895)][_0x54467d(0x2d3)]=function(){const _0xeb7f08=_0x54467d;if(!SceneManager[_0xeb7f08(0x425)]())return;SceneManager[_0xeb7f08(0x574)]['removeOnceParallelInterpreter'](this),Game_Interpreter[_0xeb7f08(0x895)][_0xeb7f08(0x2d3)][_0xeb7f08(0x52e)](this);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x462)]=Scene_MenuBase['prototype'][_0x54467d(0x1d4)],Scene_MenuBase[_0x54467d(0x895)]['helpAreaTop']=function(){const _0x1dd02f=_0x54467d;let _0x108b7f=0x0;if(SceneManager[_0x1dd02f(0x866)]()){if(_0x1dd02f(0x240)!=='nNsMQ'){const _0xe7784=_0x5add4f[_0x1dd02f(0x98c)][_0x1dd02f(0x357)][_0x1dd02f(0x569)];for(const _0x1960f7 of _0xe7784){const _0x57bdcf=(_0x1960f7['Name']||'')[_0x1dd02f(0x57d)]()[_0x1dd02f(0x747)](),_0x33c88e=(_0x1960f7[_0x1dd02f(0x94c)]||'')[_0x1dd02f(0x57d)]()[_0x1dd02f(0x747)]();_0x278e2f[_0x1dd02f(0x98c)][_0x1dd02f(0x569)][_0x57bdcf]=_0x1960f7,_0x4931b2[_0x1dd02f(0x98c)][_0x1dd02f(0x35c)][_0x33c88e]=_0x57bdcf;}}else _0x108b7f=this['helpAreaTopSideButtonLayout']();}else'cuphW'!==_0x1dd02f(0x798)?_0x108b7f=VisuMZ[_0x1dd02f(0x98c)][_0x1dd02f(0x462)][_0x1dd02f(0x52e)](this):(this[_0x1dd02f(0x266)][_0x1dd02f(0x12d)]['y']=0x1/this[_0x1dd02f(0x12d)]['y'],this[_0x1dd02f(0x266)]['y']=-(this['y']/this[_0x1dd02f(0x12d)]['y']));return _0x108b7f;},Scene_MenuBase[_0x54467d(0x895)]['helpAreaTopSideButtonLayout']=function(){const _0x5268b9=_0x54467d;if(this[_0x5268b9(0x98f)]()){if(_0x5268b9(0x91c)==='qsjcW')return this['mainAreaBottom']();else this['x']=_0x5c784f[_0x5268b9(0x36d)],this['y']=_0x4372fe[_0x5268b9(0x2d9)],this[_0x5268b9(0x4dd)]=![],this[_0x5268b9(0x9bc)]();}else return 0x0;},VisuMZ[_0x54467d(0x98c)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x1cc)],Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x1cc)]=function(){const _0x31dc3c=_0x54467d;return SceneManager[_0x31dc3c(0x866)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x31dc3c(0x98c)][_0x31dc3c(0x99d)]['call'](this);},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8db)]=function(){const _0x26c8ec=_0x54467d;if(!this[_0x26c8ec(0x98f)]()){if(_0x26c8ec(0x1b4)===_0x26c8ec(0x1b4))return this[_0x26c8ec(0x84f)]();else this[_0x26c8ec(0x829)]=!![];}else return this[_0x26c8ec(0x191)]()&&this[_0x26c8ec(0x864)]()==='top'?_0x26c8ec(0x1e0)===_0x26c8ec(0x1e0)?Window_ButtonAssist[_0x26c8ec(0x895)]['lineHeight']():_0x444b77[_0x26c8ec(0x307)](_0x26c8ec(0x6df)):0x0;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x753)]=Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8d5)],Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8d5)]=function(){const _0x490a95=_0x54467d;let _0x533072=0x0;SceneManager[_0x490a95(0x866)]()?_0x533072=this['mainAreaHeightSideButtonLayout']():_0x533072=VisuMZ[_0x490a95(0x98c)][_0x490a95(0x753)][_0x490a95(0x52e)](this);if(this[_0x490a95(0x191)]()&&this[_0x490a95(0x864)]()!==_0x490a95(0x90c)){if(_0x490a95(0x8ce)===_0x490a95(0x7cd))return 0x0;else _0x533072-=Window_ButtonAssist[_0x490a95(0x895)][_0x490a95(0x984)]();}return _0x533072;},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8a1)]=function(){const _0x4d37a7=_0x54467d;return Graphics[_0x4d37a7(0x94f)]-this['helpAreaHeight']();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1cb)]=Scene_MenuBase[_0x54467d(0x895)]['createBackground'],Scene_MenuBase[_0x54467d(0x895)]['createBackground']=function(){const _0x484b4e=_0x54467d,_0x34d01f=VisuMZ[_0x484b4e(0x98c)][_0x484b4e(0x357)][_0x484b4e(0x129)][_0x484b4e(0x13b)]??0x8;this[_0x484b4e(0x4d3)]=new PIXI['filters'][(_0x484b4e(0x1ac))](_0x34d01f),this[_0x484b4e(0x8ea)]=new Sprite(),this[_0x484b4e(0x8ea)][_0x484b4e(0x55d)]=SceneManager[_0x484b4e(0x501)](),this[_0x484b4e(0x8ea)]['filters']=[this[_0x484b4e(0x4d3)]],this[_0x484b4e(0x2c0)](this[_0x484b4e(0x8ea)]),this[_0x484b4e(0x6e3)](0xc0),this[_0x484b4e(0x6e3)](this[_0x484b4e(0x40c)]()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype']['getBackgroundOpacity']=function(){const _0x4ddfb0=_0x54467d,_0x2e5958=String(this[_0x4ddfb0(0x615)]['name']),_0x5c1643=this[_0x4ddfb0(0x8b3)](_0x2e5958);return _0x5c1643?_0x5c1643[_0x4ddfb0(0x26a)]:0xc0;},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8dd)]=function(){const _0x5122bd=_0x54467d,_0x5a9c3a=String(this[_0x5122bd(0x615)][_0x5122bd(0x33a)]),_0x2c6ecf=this[_0x5122bd(0x8b3)](_0x5a9c3a);if(_0x2c6ecf&&(_0x2c6ecf[_0x5122bd(0x33d)]!==''||_0x2c6ecf[_0x5122bd(0x46a)]!=='')){if('qBVGk'!==_0x5122bd(0x922))this['_backSprite1']=new Sprite(ImageManager[_0x5122bd(0x2a6)](_0x2c6ecf['BgFilename1'])),this[_0x5122bd(0x9a7)]=new Sprite(ImageManager[_0x5122bd(0x70c)](_0x2c6ecf[_0x5122bd(0x46a)])),this[_0x5122bd(0x2c0)](this[_0x5122bd(0x5c2)]),this[_0x5122bd(0x2c0)](this[_0x5122bd(0x9a7)]),this[_0x5122bd(0x5c2)][_0x5122bd(0x55d)]['addLoadListener'](this[_0x5122bd(0x7b5)]['bind'](this,this[_0x5122bd(0x5c2)])),this[_0x5122bd(0x9a7)][_0x5122bd(0x55d)][_0x5122bd(0x9ab)](this['adjustSprite'][_0x5122bd(0x11b)](this,this['_backSprite2']));else return _0x2e11e9[_0x5122bd(0x88a)]['CommandRect'][_0x5122bd(0x52e)](this);}},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x8b3)]=function(_0x5e2cb5){const _0x156d30=_0x54467d;return VisuMZ['CoreEngine']['Settings'][_0x156d30(0x129)][_0x5e2cb5]||VisuMZ[_0x156d30(0x98c)]['Settings'][_0x156d30(0x129)]['Scene_Unlisted'];},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x7b5)]=function(_0x23f265){const _0x4982d0=_0x54467d;this[_0x4982d0(0x541)](_0x23f265),this['centerSprite'](_0x23f265);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x4b5)]=Scene_MenuBase[_0x54467d(0x895)]['createCancelButton'],Scene_MenuBase[_0x54467d(0x895)]['createCancelButton']=function(){const _0xa964ef=_0x54467d;VisuMZ[_0xa964ef(0x98c)][_0xa964ef(0x4b5)][_0xa964ef(0x52e)](this),SceneManager[_0xa964ef(0x97e)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x304)]=function(){const _0x49f3a9=_0x54467d;this[_0x49f3a9(0x945)]['x']=Graphics[_0x49f3a9(0x7c0)]+0x4;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8ad)]=Scene_MenuBase['prototype']['createPageButtons'],Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x158)]=function(){const _0xeffc23=_0x54467d;VisuMZ[_0xeffc23(0x98c)][_0xeffc23(0x8ad)]['call'](this);if(SceneManager['isSideButtonLayout']()){if(_0xeffc23(0x6c5)===_0xeffc23(0x968))return this[_0xeffc23(0x183)]&&this[_0xeffc23(0x183)][_0xeffc23(0x4dd)]?_0x59d529[_0xeffc23(0x2cd)]:'';else this['movePageButtonSideButtonLayout']();}},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x2bb)]=function(){const _0x374370=_0x54467d;this['_pageupButton']['x']=-0x1*(this['_pageupButton']['width']+this[_0x374370(0x7f2)][_0x374370(0x36d)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x374370(0x7f2)][_0x374370(0x36d)]+0x4);},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x191)]=function(){const _0x27284d=_0x54467d;return VisuMZ[_0x27284d(0x98c)][_0x27284d(0x357)]['ButtonAssist']['Enable'];},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x864)]=function(){const _0x24277b=_0x54467d;return SceneManager[_0x24277b(0x97e)]()||SceneManager[_0x24277b(0x46c)]()?VisuMZ[_0x24277b(0x98c)][_0x24277b(0x357)]['ButtonAssist'][_0x24277b(0x154)]:_0x24277b(0x90c);},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x96e)]=function(){const _0x576dbb=_0x54467d;if(!this[_0x576dbb(0x191)]())return;const _0x5d3a2b=this[_0x576dbb(0x74e)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x5d3a2b),this['addWindow'](this['_buttonAssistWindow']);},Scene_MenuBase[_0x54467d(0x895)]['buttonAssistWindowRect']=function(){const _0x2df3b0=_0x54467d;if(this[_0x2df3b0(0x864)]()==='button'){if(_0x2df3b0(0x89f)!=='JTqGJ')return this['buttonAssistWindowButtonRect']();else this['smoothSelect']((_0x3a43fd+_0xdc858f)%_0x4dc05e);}else return _0x2df3b0(0x18c)===_0x2df3b0(0x1ab)?_0xb3506d[_0x2df3b0(0x88c)]||_0x2df3b0(0x88c):this[_0x2df3b0(0x90d)]();},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x77c)]=function(){const _0x5ab696=_0x54467d,_0x5a5030=ConfigManager[_0x5ab696(0x86b)]?(Sprite_Button[_0x5ab696(0x895)][_0x5ab696(0x6e2)]()+0x6)*0x2:0x0,_0xff19ee=this['buttonY'](),_0xf8c16c=Graphics['boxWidth']-_0x5a5030*0x2,_0x407e6c=this['buttonAreaHeight']();return new Rectangle(_0x5a5030,_0xff19ee,_0xf8c16c,_0x407e6c);},Scene_MenuBase[_0x54467d(0x895)][_0x54467d(0x90d)]=function(){const _0x5458c4=_0x54467d,_0x5da9f2=Graphics[_0x5458c4(0x7c0)],_0x568d13=Window_ButtonAssist[_0x5458c4(0x895)]['lineHeight'](),_0x14f615=0x0;let _0x3db00c=0x0;if(this[_0x5458c4(0x864)]()===_0x5458c4(0x593))_0x3db00c=0x0;else{if('KFuuV'==='nitho'){if(this['_allTextHeight']!==_0x3d39eb)return _0x2c232f?this[_0x5458c4(0x62a)]():this[_0x5458c4(0x653)]['y'];return _0x532ddd?this['scrollX']():this[_0x5458c4(0x560)]();}else _0x3db00c=Graphics[_0x5458c4(0x94f)]-_0x568d13;}return new Rectangle(_0x14f615,_0x3db00c,_0x5da9f2,_0x568d13);},Scene_Menu[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x7c5)],VisuMZ[_0x54467d(0x98c)]['Scene_Menu_create']=Scene_Menu[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Menu[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x167e04=_0x54467d;VisuMZ[_0x167e04(0x98c)][_0x167e04(0x5c3)][_0x167e04(0x52e)](this),this[_0x167e04(0x9b4)]();},Scene_Menu['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x58322f=_0x54467d;this['_commandWindow']&&this['_commandWindow'][_0x58322f(0x12a)](Scene_Menu[_0x58322f(0x88a)]['CommandBgType']),this[_0x58322f(0x194)]&&this['_goldWindow'][_0x58322f(0x12a)](Scene_Menu[_0x58322f(0x88a)]['GoldBgType']),this[_0x58322f(0x3fb)]&&('nRRcj'===_0x58322f(0x6bc)?this[_0x58322f(0x3fb)][_0x58322f(0x12a)](Scene_Menu[_0x58322f(0x88a)][_0x58322f(0x2f4)]):_0xec3355[_0x58322f(0x349)]&&(this['_forcedBattleSys']='CTB'));},Scene_Menu['prototype'][_0x54467d(0x861)]=function(){const _0x352e79=_0x54467d;return Scene_Menu[_0x352e79(0x88a)]['CommandRect']['call'](this);},Scene_Menu['prototype']['goldWindowRect']=function(){const _0x755913=_0x54467d;return Scene_Menu[_0x755913(0x88a)][_0x755913(0x884)]['call'](this);},Scene_Menu[_0x54467d(0x895)]['statusWindowRect']=function(){const _0xe2c716=_0x54467d;return Scene_Menu[_0xe2c716(0x88a)]['StatusRect']['call'](this);},Scene_Item[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)]['Settings']['MenuLayout'][_0x54467d(0x7dc)],VisuMZ['CoreEngine'][_0x54467d(0x4cd)]=Scene_Item[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Item[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x3aaf69=_0x54467d;VisuMZ[_0x3aaf69(0x98c)][_0x3aaf69(0x4cd)][_0x3aaf69(0x52e)](this),this[_0x3aaf69(0x9b4)]();},Scene_Item[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x205fbb=_0x54467d;this[_0x205fbb(0x840)]&&this['_helpWindow'][_0x205fbb(0x12a)](Scene_Item['layoutSettings'][_0x205fbb(0x4f3)]);this[_0x205fbb(0x486)]&&(_0x205fbb(0x1d7)!==_0x205fbb(0xda)?this[_0x205fbb(0x486)][_0x205fbb(0x12a)](Scene_Item[_0x205fbb(0x88a)][_0x205fbb(0x481)]):(this['centerCameraCheckData']()[_0x205fbb(0x315)]=!![],this[_0x205fbb(0x5a0)]()[_0x205fbb(0x10b)]=_0x295309[_0x205fbb(0x947)]));if(this[_0x205fbb(0x1ff)]){if(_0x205fbb(0xc9)!==_0x205fbb(0x237))this[_0x205fbb(0x1ff)][_0x205fbb(0x12a)](Scene_Item['layoutSettings'][_0x205fbb(0x642)]);else{if(_0x34e762[_0x205fbb(0xd4)]())return;_0x4fbfec[_0x205fbb(0x2e6)](_0x2a8f8e,_0x46ede2);const _0x42babf=_0x26e2ce[_0x205fbb(0x625)](_0x1d3a68[_0x205fbb(0x67e)],_0x42196d['EndingID']),_0x212b6e=_0x3d4a47['max'](_0x171752[_0x205fbb(0x67e)],_0x4beaa2[_0x205fbb(0x156)]);for(let _0x5b8dad=_0x42babf;_0x5b8dad<=_0x212b6e;_0x5b8dad++){const _0x53f5f3=_0x515f4b[_0x205fbb(0x57c)](_0x5b8dad);_0xa30e80[_0x205fbb(0x53b)](_0x5b8dad,!_0x53f5f3);}}}this[_0x205fbb(0x27b)]&&this[_0x205fbb(0x27b)][_0x205fbb(0x12a)](Scene_Item[_0x205fbb(0x88a)][_0x205fbb(0x153)]);},Scene_Item[_0x54467d(0x895)][_0x54467d(0x225)]=function(){const _0x33c7a1=_0x54467d;return Scene_Item[_0x33c7a1(0x88a)][_0x33c7a1(0x5ab)][_0x33c7a1(0x52e)](this);},Scene_Item['prototype']['categoryWindowRect']=function(){const _0x5d3708=_0x54467d;return Scene_Item[_0x5d3708(0x88a)][_0x5d3708(0x99c)]['call'](this);},Scene_Item[_0x54467d(0x895)][_0x54467d(0x200)]=function(){const _0x550cef=_0x54467d;return Scene_Item['layoutSettings'][_0x550cef(0x87e)][_0x550cef(0x52e)](this);},Scene_Item[_0x54467d(0x895)][_0x54467d(0x24a)]=function(){const _0x73fc2d=_0x54467d;return Scene_Item[_0x73fc2d(0x88a)][_0x73fc2d(0x674)]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['MenuLayout'][_0x54467d(0x219)],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x361)]=Scene_Skill['prototype'][_0x54467d(0x26b)],Scene_Skill[_0x54467d(0x895)]['create']=function(){const _0x11e224=_0x54467d;VisuMZ[_0x11e224(0x98c)][_0x11e224(0x361)][_0x11e224(0x52e)](this),this[_0x11e224(0x9b4)]();},Scene_Skill[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x3b511f=_0x54467d;if(this['_helpWindow']){if('dZQYv'===_0x3b511f(0x1f9)){if(_0x1d6e7a)_0x5bf801['ParseWeaponNotetags'](_0xaeae7e);}else this[_0x3b511f(0x840)][_0x3b511f(0x12a)](Scene_Skill[_0x3b511f(0x88a)][_0x3b511f(0x4f3)]);}this['_skillTypeWindow']&&this[_0x3b511f(0x2a3)]['setBackgroundType'](Scene_Skill['layoutSettings']['SkillTypeBgType']);this[_0x3b511f(0x3fb)]&&this[_0x3b511f(0x3fb)]['setBackgroundType'](Scene_Skill[_0x3b511f(0x88a)][_0x3b511f(0x2f4)]);if(this[_0x3b511f(0x1ff)]){if(_0x3b511f(0x853)!=='yloni')this[_0x3b511f(0x1ff)][_0x3b511f(0x12a)](Scene_Skill['layoutSettings']['ItemBgType']);else return _0x2f1436[_0x3b511f(0x228)](_0x89b699,'[',']');}this[_0x3b511f(0x27b)]&&(_0x3b511f(0xc8)==='Osflw'?this[_0x3b511f(0x27b)][_0x3b511f(0x12a)](Scene_Skill[_0x3b511f(0x88a)][_0x3b511f(0x153)]):_0x1d407e[_0x3b511f(0x98c)]['Scene_Name_onInputOk'][_0x3b511f(0x52e)](this));},Scene_Skill[_0x54467d(0x895)]['helpWindowRect']=function(){const _0x2ba38b=_0x54467d;return Scene_Skill['layoutSettings'][_0x2ba38b(0x5ab)][_0x2ba38b(0x52e)](this);},Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x401323=_0x54467d;return Scene_Skill[_0x401323(0x88a)][_0x401323(0x365)][_0x401323(0x52e)](this);},Scene_Skill[_0x54467d(0x895)][_0x54467d(0x77d)]=function(){const _0x4b155a=_0x54467d;return Scene_Skill[_0x4b155a(0x88a)][_0x4b155a(0x273)][_0x4b155a(0x52e)](this);},Scene_Skill['prototype']['itemWindowRect']=function(){const _0x3da0a4=_0x54467d;return Scene_Skill['layoutSettings'][_0x3da0a4(0x87e)][_0x3da0a4(0x52e)](this);},Scene_Skill[_0x54467d(0x895)][_0x54467d(0x24a)]=function(){const _0x353ac7=_0x54467d;return Scene_Skill['layoutSettings']['ActorRect'][_0x353ac7(0x52e)](this);},Scene_Equip[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['MenuLayout'][_0x54467d(0x6fd)],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x740)]=Scene_Equip[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Equip[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x442b89=_0x54467d;VisuMZ[_0x442b89(0x98c)][_0x442b89(0x740)]['call'](this),this[_0x442b89(0x9b4)]();},Scene_Equip[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x2866a4=_0x54467d;this[_0x2866a4(0x840)]&&this[_0x2866a4(0x840)][_0x2866a4(0x12a)](Scene_Equip[_0x2866a4(0x88a)]['HelpBgType']);this['_statusWindow']&&this[_0x2866a4(0x3fb)]['setBackgroundType'](Scene_Equip[_0x2866a4(0x88a)]['StatusBgType']);this[_0x2866a4(0x1fe)]&&this[_0x2866a4(0x1fe)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x2866a4(0x51e)]);if(this[_0x2866a4(0x192)]){if(_0x2866a4(0x999)===_0x2866a4(0x17d)){_0x1917aa[_0x2866a4(0x2e6)](_0x4c8eca,_0x6e80e9);const _0xedb39=_0x2f414a['pictureId']||0x1,_0x25ffb1=_0x586147[_0x2866a4(0x495)]||_0x2866a4(0x420),_0x272ec9=_0xdb3894[_0x2866a4(0x3c4)](_0xedb39);_0x272ec9&&_0x272ec9[_0x2866a4(0x822)](_0x25ffb1);}else this[_0x2866a4(0x192)][_0x2866a4(0x12a)](Scene_Equip['layoutSettings'][_0x2866a4(0x563)]);}if(this['_itemWindow']){if(_0x2866a4(0x238)==='Hhgxj')this['_itemWindow'][_0x2866a4(0x12a)](Scene_Equip[_0x2866a4(0x88a)][_0x2866a4(0x642)]);else{const _0x1b8062=_0x1286d0[_0x2866a4(0x574)];for(let _0x52d6c5=0x1;_0x52d6c5<=0x5;_0x52d6c5++){if(this[_0x2866a4(0x34a)][_0x2866a4(0x96f)['format'](_0x52d6c5)]!==_0x1b8062[_0x2866a4(0x774)[_0x2866a4(0x875)](_0x52d6c5)]())return this[_0x2866a4(0x527)]();if(this[_0x2866a4(0x34a)][_0x2866a4(0x858)['format'](_0x52d6c5)]!==_0x1b8062[_0x2866a4(0x23f)[_0x2866a4(0x875)](_0x52d6c5)]())return this[_0x2866a4(0x527)]();}}}},Scene_Equip['prototype'][_0x54467d(0x225)]=function(){const _0x1fe521=_0x54467d;return Scene_Equip[_0x1fe521(0x88a)][_0x1fe521(0x5ab)][_0x1fe521(0x52e)](this);},Scene_Equip[_0x54467d(0x895)]['statusWindowRect']=function(){const _0x31bb0a=_0x54467d;return Scene_Equip[_0x31bb0a(0x88a)]['StatusRect']['call'](this);},Scene_Equip[_0x54467d(0x895)][_0x54467d(0x861)]=function(){const _0x4ab29a=_0x54467d;return Scene_Equip[_0x4ab29a(0x88a)][_0x4ab29a(0x710)][_0x4ab29a(0x52e)](this);},Scene_Equip['prototype'][_0x54467d(0x8fb)]=function(){const _0x2c6de8=_0x54467d;return Scene_Equip[_0x2c6de8(0x88a)]['SlotRect']['call'](this);},Scene_Equip[_0x54467d(0x895)][_0x54467d(0x200)]=function(){const _0xd03c86=_0x54467d;return Scene_Equip[_0xd03c86(0x88a)][_0xd03c86(0x87e)][_0xd03c86(0x52e)](this);},Scene_Status[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['MenuLayout'][_0x54467d(0x857)],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x937)]=Scene_Status['prototype']['create'],Scene_Status['prototype'][_0x54467d(0x26b)]=function(){const _0x555a1a=_0x54467d;VisuMZ[_0x555a1a(0x98c)][_0x555a1a(0x937)][_0x555a1a(0x52e)](this),this[_0x555a1a(0x9b4)]();},Scene_Status[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x94e8c=_0x54467d;if(this['_profileWindow']){if(_0x94e8c(0x2f1)===_0x94e8c(0x7e9)){const _0xa387d3=_0x94e8c(0x23b);this[_0x94e8c(0x38e)]=this['_colorCache']||{};if(this[_0x94e8c(0x38e)][_0xa387d3])return this[_0x94e8c(0x38e)][_0xa387d3];const _0x25c2c2=_0x4ad096['CoreEngine'][_0x94e8c(0x357)]['Color']['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0xa387d3,_0x25c2c2);}else this[_0x94e8c(0x8de)]['setBackgroundType'](Scene_Status[_0x94e8c(0x88a)][_0x94e8c(0x5c9)]);}this['_statusWindow']&&this['_statusWindow'][_0x94e8c(0x12a)](Scene_Status['layoutSettings'][_0x94e8c(0x2f4)]);if(this[_0x94e8c(0x175)]){if(_0x94e8c(0x901)!==_0x94e8c(0x901)){const _0x3df38a=_0x57f812['boxWidth'],_0x165cf3=_0x40f864[_0x94e8c(0x895)]['lineHeight'](),_0x1ddb4d=0x0;let _0x53c5ab=0x0;return this['getButtonAssistLocation']()===_0x94e8c(0x593)?_0x53c5ab=0x0:_0x53c5ab=_0x69056a['boxHeight']-_0x165cf3,new _0x458df2(_0x1ddb4d,_0x53c5ab,_0x3df38a,_0x165cf3);}else this[_0x94e8c(0x175)][_0x94e8c(0x12a)](Scene_Status[_0x94e8c(0x88a)][_0x94e8c(0x98d)]);}if(this['_statusEquipWindow']){if('mgOKs'!==_0x94e8c(0x672))this[_0x94e8c(0x386)][_0x94e8c(0x12a)](Scene_Status[_0x94e8c(0x88a)][_0x94e8c(0x6cf)]);else{this['_fauxAnimationSprites'][_0x94e8c(0x8d2)](_0x489b08),this[_0x94e8c(0x95e)](_0x58231f);for(const _0x43f02c of _0x41269e[_0x94e8c(0x3ab)]){_0x43f02c[_0x94e8c(0x759)]&&_0x43f02c[_0x94e8c(0x759)]();}_0x147c4d[_0x94e8c(0x52b)]();}}},Scene_Status[_0x54467d(0x895)][_0x54467d(0x274)]=function(){const _0x579679=_0x54467d;return Scene_Status[_0x579679(0x88a)]['ProfileRect'][_0x579679(0x52e)](this);},Scene_Status[_0x54467d(0x895)][_0x54467d(0x77d)]=function(){const _0x40be17=_0x54467d;return Scene_Status[_0x40be17(0x88a)][_0x40be17(0x273)]['call'](this);},Scene_Status[_0x54467d(0x895)][_0x54467d(0x628)]=function(){const _0x102ad6=_0x54467d;return Scene_Status[_0x102ad6(0x88a)]['StatusParamsRect'][_0x102ad6(0x52e)](this);},Scene_Status[_0x54467d(0x895)]['statusEquipWindowRect']=function(){const _0x5dbe8f=_0x54467d;return Scene_Status[_0x5dbe8f(0x88a)][_0x5dbe8f(0x682)][_0x5dbe8f(0x52e)](this);},Scene_Options[_0x54467d(0x88a)]=VisuMZ['CoreEngine'][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x432)],VisuMZ['CoreEngine'][_0x54467d(0x189)]=Scene_Options[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Options[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x3b459b=_0x54467d;VisuMZ['CoreEngine'][_0x3b459b(0x189)][_0x3b459b(0x52e)](this),this[_0x3b459b(0x9b4)]();},Scene_Options[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x15c063=_0x54467d;this[_0x15c063(0x9bd)]&&(_0x15c063(0x807)!=='Ewtui'?this[_0x15c063(0x1ba)](_0x4fac51):this[_0x15c063(0x9bd)]['setBackgroundType'](Scene_Options[_0x15c063(0x88a)]['OptionsBgType']));},Scene_Options[_0x54467d(0x895)][_0x54467d(0x8fe)]=function(){const _0x36f6bb=_0x54467d;return Scene_Options[_0x36f6bb(0x88a)][_0x36f6bb(0x845)][_0x36f6bb(0x52e)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x4b3)],Scene_Save[_0x54467d(0x895)]['create']=function(){const _0x22c756=_0x54467d;Scene_File[_0x22c756(0x895)]['create'][_0x22c756(0x52e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x54467d(0x895)][_0x54467d(0x9b4)]=function(){const _0x5d0541=_0x54467d;this[_0x5d0541(0x840)]&&this[_0x5d0541(0x840)][_0x5d0541(0x12a)](Scene_Save[_0x5d0541(0x88a)][_0x5d0541(0x4f3)]),this[_0x5d0541(0x9a8)]&&this['_listWindow'][_0x5d0541(0x12a)](Scene_Save[_0x5d0541(0x88a)][_0x5d0541(0x68a)]);},Scene_Save[_0x54467d(0x895)][_0x54467d(0x225)]=function(){const _0x566922=_0x54467d;return Scene_Save[_0x566922(0x88a)][_0x566922(0x5ab)][_0x566922(0x52e)](this);},Scene_Save[_0x54467d(0x895)][_0x54467d(0x29c)]=function(){const _0x15b2a5=_0x54467d;return Scene_Save[_0x15b2a5(0x88a)][_0x15b2a5(0x3dd)][_0x15b2a5(0x52e)](this);},Scene_Load[_0x54467d(0x88a)]=VisuMZ['CoreEngine'][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x7ed)],Scene_Load[_0x54467d(0x895)]['create']=function(){const _0x310586=_0x54467d;Scene_File[_0x310586(0x895)][_0x310586(0x26b)]['call'](this),this[_0x310586(0x9b4)]();},Scene_Load['prototype'][_0x54467d(0x9b4)]=function(){const _0x1ee714=_0x54467d;if(this[_0x1ee714(0x840)]){if(_0x1ee714(0x4ec)!==_0x1ee714(0x4ec))return _0x1735bc[_0x1ee714(0x98c)][_0x1ee714(0x357)][_0x1ee714(0x2fe)]['Title'][_0x1ee714(0x710)][_0x1ee714(0x52e)](this);else this[_0x1ee714(0x840)][_0x1ee714(0x12a)](Scene_Load[_0x1ee714(0x88a)][_0x1ee714(0x4f3)]);}if(this[_0x1ee714(0x9a8)]){if(_0x1ee714(0x1dd)!=='zTBbV')this['_listWindow'][_0x1ee714(0x12a)](Scene_Load[_0x1ee714(0x88a)]['ListBgType']);else return _0x53f7b8[_0x1ee714(0x98c)][_0x1ee714(0x567)][_0x1ee714(0x52e)](this);}},Scene_Load[_0x54467d(0x895)][_0x54467d(0x225)]=function(){const _0x44db0d=_0x54467d;return Scene_Load[_0x44db0d(0x88a)][_0x44db0d(0x5ab)][_0x44db0d(0x52e)](this);},Scene_Load[_0x54467d(0x895)][_0x54467d(0x29c)]=function(){const _0x2ceeaf=_0x54467d;return Scene_Load[_0x2ceeaf(0x88a)][_0x2ceeaf(0x3dd)][_0x2ceeaf(0x52e)](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine'][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x3d3)],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x155)]=Scene_GameEnd[_0x54467d(0x895)]['createBackground'],Scene_GameEnd[_0x54467d(0x895)][_0x54467d(0x8a2)]=function(){const _0x245321=_0x54467d;Scene_MenuBase[_0x245321(0x895)]['createBackground'][_0x245321(0x52e)](this);},Scene_GameEnd[_0x54467d(0x895)][_0x54467d(0x7f6)]=function(){const _0x3648ce=_0x54467d,_0x4bbb2f=this['commandWindowRect']();this[_0x3648ce(0x1fe)]=new Window_GameEnd(_0x4bbb2f),this[_0x3648ce(0x1fe)][_0x3648ce(0x962)](_0x3648ce(0xf3),this['popScene'][_0x3648ce(0x11b)](this)),this['addWindow'](this[_0x3648ce(0x1fe)]),this[_0x3648ce(0x1fe)][_0x3648ce(0x12a)](Scene_GameEnd[_0x3648ce(0x88a)][_0x3648ce(0x51e)]);},Scene_GameEnd[_0x54467d(0x895)][_0x54467d(0x861)]=function(){const _0xea3e23=_0x54467d;return Scene_GameEnd['layoutSettings'][_0xea3e23(0x710)][_0xea3e23(0x52e)](this);},Scene_Shop[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x2fe)]['ShopMenu'],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x448)]=Scene_Shop['prototype'][_0x54467d(0x26b)],Scene_Shop[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x2fa6d4=_0x54467d;VisuMZ[_0x2fa6d4(0x98c)]['Scene_Shop_create'][_0x2fa6d4(0x52e)](this),this[_0x2fa6d4(0x9b4)]();},Scene_Shop[_0x54467d(0x895)]['setCoreEngineUpdateWindowBg']=function(){const _0x405894=_0x54467d;this[_0x405894(0x840)]&&this[_0x405894(0x840)][_0x405894(0x12a)](Scene_Shop['layoutSettings']['HelpBgType']);if(this['_goldWindow']){if(_0x405894(0x4f7)!==_0x405894(0x4f7))for(const _0x4df8f8 of _0x49b960[_0x405894(0x9aa)]){if(_0x4df8f8['ShowJS'][_0x405894(0x52e)](this)){const _0xce051e=_0x4df8f8[_0x405894(0x139)];let _0x4be427=_0x4df8f8[_0x405894(0x975)];if(['',_0x405894(0x7c8)]['includes'](_0x4be427))_0x4be427=_0x4df8f8['TextJS']['call'](this);const _0x154375=_0x4df8f8[_0x405894(0x62e)]['call'](this),_0x4360d0=_0x4df8f8[_0x405894(0x135)][_0x405894(0x52e)](this);this[_0x405894(0x8ef)](_0x4be427,_0xce051e,_0x154375,_0x4360d0),this[_0x405894(0x962)](_0xce051e,_0x4df8f8[_0x405894(0xc7)][_0x405894(0x11b)](this,_0x4360d0));}}else this['_goldWindow'][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)][_0x405894(0x172)]);}this['_commandWindow']&&('tOEvR'===_0x405894(0x5b0)?(this['_muteSound']&&(_0x5ac3f1=_0x3e6d33['makeDeepCopy'](_0x6b3ef0),_0x53166b['se']&&(_0x10fd01['se'][_0x405894(0x4c5)]=0x0)),_0x485385[_0x405894(0x98c)]['Sprite_AnimationMV_processTimingData'][_0x405894(0x52e)](this,_0x54082b)):this[_0x405894(0x1fe)][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)][_0x405894(0x51e)]));this[_0x405894(0x4e2)]&&this[_0x405894(0x4e2)][_0x405894(0x12a)](Scene_Shop['layoutSettings']['DummyBgType']);if(this['_numberWindow']){if(_0x405894(0x25b)!=='BmzrU')return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);else this['_numberWindow'][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)][_0x405894(0x838)]);}this[_0x405894(0x3fb)]&&(_0x405894(0xfe)===_0x405894(0xfe)?this[_0x405894(0x3fb)][_0x405894(0x12a)](Scene_Shop['layoutSettings'][_0x405894(0x2f4)]):this[_0x405894(0x634)]());this[_0x405894(0x7d7)]&&this[_0x405894(0x7d7)][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)]['BuyBgType']);this[_0x405894(0x486)]&&(_0x405894(0x6bf)===_0x405894(0x736)?this[_0x405894(0x3b9)]():this[_0x405894(0x486)][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)][_0x405894(0x481)]));if(this[_0x405894(0x22a)]){if(_0x405894(0x4c2)===_0x405894(0x9a4))return _0x2eaa3f[_0x405894(0x2cd)];else this[_0x405894(0x22a)][_0x405894(0x12a)](Scene_Shop[_0x405894(0x88a)]['SellBgType']);}},Scene_Shop[_0x54467d(0x895)][_0x54467d(0x225)]=function(){const _0x2a379c=_0x54467d;return Scene_Shop[_0x2a379c(0x88a)]['HelpRect'][_0x2a379c(0x52e)](this);},Scene_Shop[_0x54467d(0x895)][_0x54467d(0x564)]=function(){const _0x187696=_0x54467d;return Scene_Shop[_0x187696(0x88a)][_0x187696(0x884)][_0x187696(0x52e)](this);},Scene_Shop['prototype'][_0x54467d(0x861)]=function(){const _0x1d2b90=_0x54467d;return Scene_Shop[_0x1d2b90(0x88a)]['CommandRect'][_0x1d2b90(0x52e)](this);},Scene_Shop[_0x54467d(0x895)][_0x54467d(0x795)]=function(){const _0x1994ee=_0x54467d;return Scene_Shop[_0x1994ee(0x88a)][_0x1994ee(0x23d)][_0x1994ee(0x52e)](this);},Scene_Shop[_0x54467d(0x895)][_0x54467d(0x4ab)]=function(){const _0x3dc2d3=_0x54467d;return Scene_Shop[_0x3dc2d3(0x88a)][_0x3dc2d3(0x8e8)][_0x3dc2d3(0x52e)](this);},Scene_Shop[_0x54467d(0x895)]['statusWindowRect']=function(){const _0x3a149f=_0x54467d;return Scene_Shop[_0x3a149f(0x88a)][_0x3a149f(0x273)][_0x3a149f(0x52e)](this);},Scene_Shop['prototype'][_0x54467d(0xc3)]=function(){const _0x1230fa=_0x54467d;return Scene_Shop[_0x1230fa(0x88a)][_0x1230fa(0x865)][_0x1230fa(0x52e)](this);},Scene_Shop['prototype'][_0x54467d(0x5a4)]=function(){const _0x53acb9=_0x54467d;return Scene_Shop[_0x53acb9(0x88a)]['CategoryRect'][_0x53acb9(0x52e)](this);},Scene_Shop['prototype']['sellWindowRect']=function(){const _0x1d7f59=_0x54467d;return Scene_Shop[_0x1d7f59(0x88a)][_0x1d7f59(0x209)][_0x1d7f59(0x52e)](this);},Scene_Name[_0x54467d(0x88a)]=VisuMZ[_0x54467d(0x98c)]['Settings']['MenuLayout'][_0x54467d(0x487)],VisuMZ[_0x54467d(0x98c)]['Scene_Name_create']=Scene_Name[_0x54467d(0x895)][_0x54467d(0x26b)],Scene_Name[_0x54467d(0x895)][_0x54467d(0x26b)]=function(){const _0x558f34=_0x54467d;VisuMZ[_0x558f34(0x98c)][_0x558f34(0x50d)][_0x558f34(0x52e)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype'][_0x54467d(0x9b4)]=function(){const _0x32b5c0=_0x54467d;this['_editWindow']&&this['_editWindow'][_0x32b5c0(0x12a)](Scene_Name[_0x32b5c0(0x88a)][_0x32b5c0(0x8b0)]),this[_0x32b5c0(0x7eb)]&&this[_0x32b5c0(0x7eb)]['setBackgroundType'](Scene_Name[_0x32b5c0(0x88a)][_0x32b5c0(0x3f7)]);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x847)]=function(){return 0x0;},Scene_Name['prototype'][_0x54467d(0x6e0)]=function(){const _0x59b771=_0x54467d;return Scene_Name[_0x59b771(0x88a)][_0x59b771(0x71e)][_0x59b771(0x52e)](this);},Scene_Name['prototype'][_0x54467d(0x621)]=function(){const _0x5a9c25=_0x54467d;return Scene_Name[_0x5a9c25(0x88a)][_0x5a9c25(0x552)][_0x5a9c25(0x52e)](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x2b9)]=function(){const _0x4bee5f=_0x54467d;if(!this[_0x4bee5f(0x7eb)])return![];return VisuMZ[_0x4bee5f(0x98c)]['Settings'][_0x4bee5f(0xcc)][_0x4bee5f(0x2b9)];},Scene_Name[_0x54467d(0x895)][_0x54467d(0x969)]=function(){const _0x509308=_0x54467d;if(this['EnableNameInput']()&&this['_inputWindow'][_0x509308(0x84c)]!==_0x509308(0x13a))return TextManager[_0x509308(0x8f4)](_0x509308(0x42a),_0x509308(0x5c1));return Scene_MenuBase[_0x509308(0x895)][_0x509308(0x969)][_0x509308(0x52e)](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x623)]=function(){const _0x21fab6=_0x54467d;if(this['EnableNameInput']()){if(_0x21fab6(0x38f)!==_0x21fab6(0x330))return TextManager[_0x21fab6(0x307)]('tab');else this[_0x21fab6(0x15b)](...arguments);}else return Scene_MenuBase[_0x21fab6(0x895)][_0x21fab6(0x623)]['call'](this);},Scene_Name[_0x54467d(0x895)]['buttonAssistKey4']=function(){const _0x233738=_0x54467d;if(this['EnableNameInput']()&&this[_0x233738(0x7eb)]['_mode']===_0x233738(0x13a))return TextManager['makeInputButtonString'](['ENTER']);return Scene_MenuBase[_0x233738(0x895)][_0x233738(0x7c1)][_0x233738(0x52e)](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x8a8)]=function(){const _0x20ddda=_0x54467d;if(this[_0x20ddda(0x2b9)]()&&this['_inputWindow'][_0x20ddda(0x84c)]===_0x20ddda(0x13a)){if(_0x20ddda(0x326)!==_0x20ddda(0x326))_0x426118[_0x20ddda(0x98c)][_0x20ddda(0x90e)][_0x20ddda(0x52e)](this,_0x268633),(this[_0x20ddda(0x2c4)](_0x378755)||this['isGamepadAxisMoved'](_0x3aa56c))&&this['setLastGamepadUsed'](_0x1d5412);else return TextManager[_0x20ddda(0x743)]([_0x20ddda(0x513)]);}return Scene_MenuBase['prototype']['buttonAssistKey5'][_0x20ddda(0x52e)](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x92d)]=function(){const _0x377db7=_0x54467d;if(this['EnableNameInput']()&&this[_0x377db7(0x7eb)]['_mode']!==_0x377db7(0x13a)){const _0x3dc13a=VisuMZ[_0x377db7(0x98c)]['Settings'][_0x377db7(0xcc)];return _0x3dc13a[_0x377db7(0x925)]||_0x377db7(0x22c);}return Scene_MenuBase[_0x377db7(0x895)]['buttonAssistText1']['call'](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x6d9)]=function(){const _0xebe04e=_0x54467d;if(this[_0xebe04e(0x2b9)]()){if(_0xebe04e(0x715)==='ZaJLP'){const _0x4ae65b=VisuMZ[_0xebe04e(0x98c)][_0xebe04e(0x357)]['KeyboardInput'];if(this[_0xebe04e(0x7eb)][_0xebe04e(0x84c)]===_0xebe04e(0x13a))return _0x4ae65b[_0xebe04e(0x88c)]||'Keyboard';else{if(_0xebe04e(0x5b5)!==_0xebe04e(0x996))return _0x4ae65b[_0xebe04e(0x27c)]||_0xebe04e(0x27c);else this['repositionEnemiesByResolution']();}}else{const _0x18ba97=_0x15f397[_0xebe04e(0x381)]()<=_0x547e03;_0x519e51[_0xebe04e(0x53b)](_0x127bf9,_0x18ba97);}}else return Scene_MenuBase['prototype'][_0xebe04e(0x6d9)][_0xebe04e(0x52e)](this);},Scene_Name[_0x54467d(0x895)][_0x54467d(0x1b3)]=function(){const _0x479c6c=_0x54467d;if(this[_0x479c6c(0x2b9)]()){if(_0x479c6c(0x570)!==_0x479c6c(0x63f)){const _0x4d7fe3=VisuMZ[_0x479c6c(0x98c)][_0x479c6c(0x357)]['KeyboardInput'];if(this[_0x479c6c(0x7eb)][_0x479c6c(0x84c)]===_0x479c6c(0x13a))return _0x4d7fe3[_0x479c6c(0x98a)]||_0x479c6c(0x98a);}else _0x4006c4['createBuffer'](_0x1a3415,_0x5576a8);}return Scene_MenuBase['prototype'][_0x479c6c(0x1b3)][_0x479c6c(0x52e)](this);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x132)]=Scene_Name[_0x54467d(0x895)]['onInputOk'],Scene_Name[_0x54467d(0x895)][_0x54467d(0x7a4)]=function(){const _0x5a1b24=_0x54467d;if(this[_0x5a1b24(0x8a4)]())this[_0x5a1b24(0x1da)]();else{if(_0x5a1b24(0x54a)!==_0x5a1b24(0x54a)){const _0x12f897=_0x4a45ed[_0x5a1b24(0x98c)][_0x5a1b24(0x357)][_0x5a1b24(0xcc)];return _0x12f897['PageChange']||_0x5a1b24(0x22c);}else VisuMZ['CoreEngine'][_0x5a1b24(0x132)][_0x5a1b24(0x52e)](this);}},Scene_Name['prototype'][_0x54467d(0x8a4)]=function(){const _0x56eff8=_0x54467d,_0x3fe793=VisuMZ['CoreEngine'][_0x56eff8(0x357)][_0x56eff8(0xcc)];if(!_0x3fe793)return![];const _0x44f646=_0x3fe793['BannedWords'];if(!_0x44f646)return![];const _0x2a8dd8=this['_editWindow']['name']()[_0x56eff8(0x57d)]();for(const _0x5455a6 of _0x44f646){if(_0x2a8dd8[_0x56eff8(0x356)](_0x5455a6[_0x56eff8(0x57d)]()))return!![];}return![];},Scene_Name['prototype'][_0x54467d(0x1da)]=function(){const _0x4b3f1f=_0x54467d;SoundManager[_0x4b3f1f(0x20a)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x56a)]=Scene_Battle['prototype'][_0x54467d(0x6f1)],Scene_Battle['prototype'][_0x54467d(0x6f1)]=function(){const _0x2511d5=_0x54467d;VisuMZ[_0x2511d5(0x98c)][_0x2511d5(0x56a)]['call'](this);if($gameTemp[_0x2511d5(0x577)])this[_0x2511d5(0x41d)]();},Scene_Battle[_0x54467d(0x895)][_0x54467d(0x41d)]=function(){const _0x413691=_0x54467d;!BattleManager[_0x413691(0x3e0)]()&&!this[_0x413691(0x1db)]&&!$gameMessage['isBusy']()&&(this[_0x413691(0x1db)]=!![],this[_0x413691(0x6f1)](),SceneManager[_0x413691(0x75f)](),this[_0x413691(0x1db)]=![]);},VisuMZ['CoreEngine'][_0x54467d(0x626)]=Scene_Battle['prototype'][_0x54467d(0x5d9)],Scene_Battle['prototype'][_0x54467d(0x5d9)]=function(){const _0x3ba51f=_0x54467d;VisuMZ['CoreEngine'][_0x3ba51f(0x626)][_0x3ba51f(0x52e)](this);if(SceneManager[_0x3ba51f(0x97e)]()){if(_0x3ba51f(0x360)===_0x3ba51f(0x360))this[_0x3ba51f(0x3b9)]();else return _0x5442a4['layoutSettings'][_0x3ba51f(0x5ab)][_0x3ba51f(0x52e)](this);}},Scene_Battle[_0x54467d(0x895)][_0x54467d(0x3b9)]=function(){const _0x318ae0=_0x54467d;this[_0x318ae0(0x945)]['x']=Graphics['boxWidth']+0x4,this[_0x318ae0(0x4ee)]()?this[_0x318ae0(0x945)]['y']=Graphics[_0x318ae0(0x94f)]-this[_0x318ae0(0x198)]():this[_0x318ae0(0x945)]['y']=0x0;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x697)]=Sprite_Button[_0x54467d(0x895)][_0x54467d(0x15b)],Sprite_Button['prototype']['initialize']=function(_0x3f0d57){const _0x35f9e2=_0x54467d;VisuMZ['CoreEngine']['Sprite_Button_initialize'][_0x35f9e2(0x52e)](this,_0x3f0d57),this[_0x35f9e2(0x659)]();},Sprite_Button['prototype'][_0x54467d(0x659)]=function(){const _0x24dce8=_0x54467d,_0x57bd96=VisuMZ[_0x24dce8(0x98c)][_0x24dce8(0x357)]['UI'];this[_0x24dce8(0x33c)]=![];switch(this[_0x24dce8(0x35a)]){case _0x24dce8(0xf3):this[_0x24dce8(0x33c)]=!_0x57bd96[_0x24dce8(0x26f)];break;case _0x24dce8(0x42a):case _0x24dce8(0x5c1):this[_0x24dce8(0x33c)]=!_0x57bd96['pagedownShowButton'];break;case _0x24dce8(0x53f):case'up':case _0x24dce8(0x3ea):case _0x24dce8(0x11a):case'ok':this['_isButtonHidden']=!_0x57bd96[_0x24dce8(0x742)];break;case _0x24dce8(0x687):this[_0x24dce8(0x33c)]=!_0x57bd96['menuShowButton'];break;}},VisuMZ['CoreEngine'][_0x54467d(0x77b)]=Sprite_Button[_0x54467d(0x895)][_0x54467d(0x606)],Sprite_Button[_0x54467d(0x895)][_0x54467d(0x606)]=function(){const _0x1af6be=_0x54467d;SceneManager['areButtonsHidden']()||this['_isButtonHidden']?this[_0x1af6be(0x101)]():VisuMZ[_0x1af6be(0x98c)][_0x1af6be(0x77b)][_0x1af6be(0x52e)](this);},Sprite_Button[_0x54467d(0x895)][_0x54467d(0x101)]=function(){const _0xf30010=_0x54467d;this[_0xf30010(0x4dd)]=![],this[_0xf30010(0xdc)]=0x0,this['x']=Graphics[_0xf30010(0x36d)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x84b)]=Sprite_Battler[_0x54467d(0x895)][_0x54467d(0x3a8)],Sprite_Battler[_0x54467d(0x895)]['startMove']=function(_0x30b1e6,_0x1664c7,_0x3140e6){const _0x50f962=_0x54467d;(this[_0x50f962(0x4a0)]!==_0x30b1e6||this[_0x50f962(0xf7)]!==_0x1664c7)&&(this[_0x50f962(0x3fd)](_0x50f962(0x420)),this[_0x50f962(0x6a7)]=_0x3140e6),VisuMZ[_0x50f962(0x98c)][_0x50f962(0x84b)][_0x50f962(0x52e)](this,_0x30b1e6,_0x1664c7,_0x3140e6);},Sprite_Battler[_0x54467d(0x895)][_0x54467d(0x3fd)]=function(_0x2a8c12){const _0x4a9233=_0x54467d;this[_0x4a9233(0x5be)]=_0x2a8c12;},Sprite_Battler[_0x54467d(0x895)][_0x54467d(0x9b3)]=function(){const _0x328098=_0x54467d;if(this[_0x328098(0x413)]<=0x0)return;const _0x561da5=this[_0x328098(0x413)],_0x2e3062=this[_0x328098(0x6a7)],_0x4ba230=this[_0x328098(0x5be)];this[_0x328098(0xe9)]=this['applyEasing'](this[_0x328098(0xe9)],this[_0x328098(0x4a0)],_0x561da5,_0x2e3062,_0x4ba230),this['_offsetY']=this[_0x328098(0x610)](this[_0x328098(0x7cb)],this[_0x328098(0xf7)],_0x561da5,_0x2e3062,_0x4ba230),this['_movementDuration']--;if(this[_0x328098(0x413)]<=0x0)this[_0x328098(0x2ac)]();},Sprite_Battler[_0x54467d(0x895)]['applyEasing']=function(_0x10dfef,_0x51cf23,_0x4748c7,_0x5e3c2f,_0x35da28){const _0x214719=_0x54467d,_0x2895b6=VisuMZ[_0x214719(0x40d)]((_0x5e3c2f-_0x4748c7)/_0x5e3c2f,_0x35da28||_0x214719(0x420)),_0x40801c=VisuMZ['ApplyEasing']((_0x5e3c2f-_0x4748c7+0x1)/_0x5e3c2f,_0x35da28||'Linear'),_0x22dc2c=(_0x10dfef-_0x51cf23*_0x2895b6)/(0x1-_0x2895b6);return _0x22dc2c+(_0x51cf23-_0x22dc2c)*_0x40801c;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x89d)]=Sprite_Actor[_0x54467d(0x895)][_0x54467d(0xff)],Sprite_Actor[_0x54467d(0x895)]['setActorHome']=function(_0x41ae86){const _0x55b5a3=_0x54467d;VisuMZ[_0x55b5a3(0x98c)][_0x55b5a3(0x357)]['UI'][_0x55b5a3(0x867)]?this[_0x55b5a3(0x827)](_0x41ae86):'RoDLC'===_0x55b5a3(0x6ee)?_0x5f3f14&&_0x5d0fed['push'](_0x12b2c2):VisuMZ[_0x55b5a3(0x98c)][_0x55b5a3(0x89d)][_0x55b5a3(0x52e)](this,_0x41ae86);},Sprite_Actor[_0x54467d(0x895)]['setActorHomeRepositioned']=function(_0x527f8e){const _0x3b4945=_0x54467d;let _0x385959=Math[_0x3b4945(0xe2)](Graphics['width']/0x2+0xc0);_0x385959-=Math[_0x3b4945(0x881)]((Graphics[_0x3b4945(0x36d)]-Graphics['boxWidth'])/0x2),_0x385959+=_0x527f8e*0x20;let _0x6f40fc=Graphics[_0x3b4945(0x2d9)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x6f40fc-=Math['floor']((Graphics[_0x3b4945(0x2d9)]-Graphics['boxHeight'])/0x2),_0x6f40fc+=_0x527f8e*0x30,this['setHome'](_0x385959,_0x6f40fc);},Sprite_Actor[_0x54467d(0x895)]['retreat']=function(){const _0xd8974f=_0x54467d;this[_0xd8974f(0x3a8)](0x4b0,0x0,0x78);},Sprite_Animation[_0x54467d(0x895)][_0x54467d(0x4a1)]=function(_0x5e808c){this['_muteSound']=_0x5e808c;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x5ed)]=Sprite_Animation[_0x54467d(0x895)][_0x54467d(0x138)],Sprite_Animation[_0x54467d(0x895)][_0x54467d(0x138)]=function(){const _0x53478c=_0x54467d;if(this[_0x53478c(0x581)])return;VisuMZ[_0x53478c(0x98c)][_0x53478c(0x5ed)][_0x53478c(0x52e)](this);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x942)]=Sprite_Animation[_0x54467d(0x895)]['setViewport'],Sprite_Animation[_0x54467d(0x895)]['setViewport']=function(_0x2b99e5){const _0x1c7c8d=_0x54467d;if(this['isAnimationOffsetXMirrored']()){if(_0x1c7c8d(0x608)!=='FBDWN'){let _0x4d5270=_0x52fd33[_0x1c7c8d(0x603)](/[\d+]/g,'')[_0x1c7c8d(0x879)]();const _0x1bc205=_0xd6b394[_0x1c7c8d(0x875)](_0x4c7399,_0x4d5270);_0x28566e[_0x1c7c8d(0x98c)][_0x1c7c8d(0xcb)][_0xc36da9][_0x1c7c8d(0x37e)](new _0x267a8d(_0x1bc205,'i'));const _0x4e7f87=_0x1c7c8d(0x34b)[_0x1c7c8d(0x875)](_0x218c57,_0x4d5270);_0x241501[_0x1c7c8d(0x98c)][_0x1c7c8d(0xcb)][_0x2e72b7+'JS'][_0x1c7c8d(0x37e)](new _0xd22103(_0x4e7f87,'i'));}else this[_0x1c7c8d(0x1ba)](_0x2b99e5);}else VisuMZ[_0x1c7c8d(0x98c)][_0x1c7c8d(0x942)][_0x1c7c8d(0x52e)](this,_0x2b99e5);},Sprite_Animation[_0x54467d(0x895)]['isAnimationOffsetXMirrored']=function(){const _0x25f3f5=_0x54467d;if(!this[_0x25f3f5(0x25a)])return![];const _0x21d0ad=this[_0x25f3f5(0x25a)][_0x25f3f5(0x33a)]||'';if(_0x21d0ad['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x21d0ad[_0x25f3f5(0x8b6)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine'][_0x25f3f5(0x357)][_0x25f3f5(0x355)][_0x25f3f5(0x2f7)];},Sprite_Animation[_0x54467d(0x895)][_0x54467d(0x1ba)]=function(_0x41bb60){const _0x202b33=_0x54467d,_0x308f37=this[_0x202b33(0x55f)],_0xfe3b82=this[_0x202b33(0x55f)],_0x13810f=this['_animation']['offsetX']*(this[_0x202b33(0x792)]?-0x1:0x1)-_0x308f37/0x2,_0x435571=this[_0x202b33(0x25a)]['offsetY']-_0xfe3b82/0x2,_0x6dfc42=this[_0x202b33(0x1dc)](_0x41bb60);_0x41bb60['gl'][_0x202b33(0x761)](_0x13810f+_0x6dfc42['x'],_0x435571+_0x6dfc42['y'],_0x308f37,_0xfe3b82);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x42592a){const _0xca8c9a=_0x54467d;if(_0x42592a['_mainSprite']){}const _0x2f9a8b=this[_0xca8c9a(0x25a)][_0xca8c9a(0x33a)];let _0x43c387=_0x42592a[_0xca8c9a(0x2d9)]*_0x42592a['scale']['y'],_0x428e58=0x0,_0x738502=-_0x43c387/0x2;if(_0x2f9a8b['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x738502=-_0x43c387;if(_0x2f9a8b[_0xca8c9a(0x8b6)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x738502=0x0;if(this[_0xca8c9a(0x25a)][_0xca8c9a(0x5e3)])_0x738502=0x0;if(_0x2f9a8b[_0xca8c9a(0x8b6)](/<(?:LEFT)>/i))_0x428e58=-_0x42592a[_0xca8c9a(0x36d)]/0x2;if(_0x2f9a8b[_0xca8c9a(0x8b6)](/<(?:RIGHT)>/i))_0x428e58=_0x42592a[_0xca8c9a(0x36d)]/0x2;_0x2f9a8b[_0xca8c9a(0x8b6)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x428e58=Number(RegExp['$1'])*_0x42592a[_0xca8c9a(0x36d)]);_0x2f9a8b[_0xca8c9a(0x8b6)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x738502=(0x1-Number(RegExp['$1']))*-_0x43c387);_0x2f9a8b['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0xca8c9a(0x43d)!=='rrXcI'?(_0x428e58=Number(RegExp['$1'])*_0x42592a[_0xca8c9a(0x36d)],_0x738502=(0x1-Number(RegExp['$2']))*-_0x43c387):this[_0xca8c9a(0x3a8)](0x4b0,0x0,0x78));if(_0x2f9a8b['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x428e58+=Number(RegExp['$1']);if(_0x2f9a8b['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x738502+=Number(RegExp['$1']);_0x2f9a8b[_0xca8c9a(0x8b6)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x428e58+=Number(RegExp['$1']),_0x738502+=Number(RegExp['$2']));const _0x2146e9=new Point(_0x428e58,_0x738502);return _0x42592a[_0xca8c9a(0x4cc)](),_0x42592a[_0xca8c9a(0x303)][_0xca8c9a(0x74a)](_0x2146e9);},Sprite_AnimationMV['prototype'][_0x54467d(0x68d)]=function(){const _0x104b85=_0x54467d;this[_0x104b85(0x4fa)]=VisuMZ[_0x104b85(0x98c)][_0x104b85(0x357)][_0x104b85(0x355)][_0x104b85(0x976)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x104b85(0x4fa)]=this[_0x104b85(0x4fa)]['clamp'](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x54467d(0x182)]=function(){const _0x4c6a02=_0x54467d;if(!this[_0x4c6a02(0x25a)]);const _0x319dce=this[_0x4c6a02(0x25a)][_0x4c6a02(0x33a)]||'';_0x319dce[_0x4c6a02(0x8b6)](/<RATE:[ ](\d+)>/i)&&(_0x4c6a02(0x32e)===_0x4c6a02(0x32e)?this[_0x4c6a02(0x4fa)]=(Number(RegExp['$1'])||0x1)[_0x4c6a02(0x2ec)](0x1,0xa):(_0x15760c['CoreEngine'][_0x4c6a02(0x626)]['call'](this),_0x1eefe3[_0x4c6a02(0x97e)]()&&this[_0x4c6a02(0x3b9)]()));},Sprite_AnimationMV['prototype'][_0x54467d(0x4a1)]=function(_0x1a330c){const _0x4b8f04=_0x54467d;this[_0x4b8f04(0x581)]=_0x1a330c;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x794)]=Sprite_AnimationMV[_0x54467d(0x895)][_0x54467d(0x74c)],Sprite_AnimationMV[_0x54467d(0x895)][_0x54467d(0x74c)]=function(_0x2cf4d1){const _0x90fab=_0x54467d;if(this['_muteSound']){if('QHYKm'===_0x90fab(0x965)){const _0x41f0c6=_0x188793(this[_0x90fab(0x615)][_0x90fab(0x33a)]),_0x3228cb=this['getCustomBackgroundSettings'](_0x41f0c6);_0x3228cb&&(_0x3228cb[_0x90fab(0x33d)]!==''||_0x3228cb['BgFilename2']!=='')&&(this[_0x90fab(0x5c2)]=new _0x43ad89(_0xe0bae0[_0x90fab(0x2a6)](_0x3228cb['BgFilename1'])),this[_0x90fab(0x9a7)]=new _0x341f00(_0x12a87a[_0x90fab(0x70c)](_0x3228cb[_0x90fab(0x46a)])),this[_0x90fab(0x2c0)](this[_0x90fab(0x5c2)]),this[_0x90fab(0x2c0)](this[_0x90fab(0x9a7)]),this['_backSprite1'][_0x90fab(0x55d)][_0x90fab(0x9ab)](this['adjustSprite'][_0x90fab(0x11b)](this,this['_backSprite1'])),this[_0x90fab(0x9a7)][_0x90fab(0x55d)]['addLoadListener'](this[_0x90fab(0x7b5)]['bind'](this,this['_backSprite2'])));}else{_0x2cf4d1=JsonEx['makeDeepCopy'](_0x2cf4d1);if(_0x2cf4d1['se']){if('fwERk'==='XmcEs')return _0x38ed28[_0x90fab(0x7d9)];else _0x2cf4d1['se']['volume']=0x0;}}}VisuMZ[_0x90fab(0x98c)][_0x90fab(0x794)]['call'](this,_0x2cf4d1);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x559)]=Sprite_AnimationMV['prototype'][_0x54467d(0x34e)],Sprite_AnimationMV[_0x54467d(0x895)][_0x54467d(0x34e)]=function(){const _0x6b2c31=_0x54467d;VisuMZ[_0x6b2c31(0x98c)][_0x6b2c31(0x559)][_0x6b2c31(0x52e)](this);if(this[_0x6b2c31(0x25a)]['position']===0x3){if(this['x']===0x0)this['x']=Math[_0x6b2c31(0xe2)](Graphics[_0x6b2c31(0x36d)]/0x2);if(this['y']===0x0)this['y']=Math[_0x6b2c31(0xe2)](Graphics[_0x6b2c31(0x2d9)]/0x2);}},Sprite_Damage[_0x54467d(0x895)][_0x54467d(0x1e6)]=function(_0x2aacca){const _0x48efd2=_0x54467d;let _0x94c13e=Math['abs'](_0x2aacca)['toString']();this[_0x48efd2(0x1c7)]()&&(_0x94c13e=VisuMZ['GroupDigits'](_0x94c13e));const _0x1b5ff6=this[_0x48efd2(0x48c)](),_0x149f95=Math['floor'](_0x1b5ff6*0.75);for(let _0xac49ac=0x0;_0xac49ac<_0x94c13e[_0x48efd2(0x959)];_0xac49ac++){const _0x5b892f=this['createChildSprite'](_0x149f95,_0x1b5ff6);_0x5b892f[_0x48efd2(0x55d)][_0x48efd2(0xeb)](_0x94c13e[_0xac49ac],0x0,0x0,_0x149f95,_0x1b5ff6,_0x48efd2(0x226)),_0x5b892f['x']=(_0xac49ac-(_0x94c13e[_0x48efd2(0x959)]-0x1)/0x2)*_0x149f95,_0x5b892f['dy']=-_0xac49ac;}},Sprite_Damage[_0x54467d(0x895)][_0x54467d(0x1c7)]=function(){const _0xac8230=_0x54467d;return VisuMZ[_0xac8230(0x98c)][_0xac8230(0x357)]['QoL']['DigitGroupingDamageSprites'];},Sprite_Damage[_0x54467d(0x895)][_0x54467d(0xfb)]=function(){const _0x7b0d2f=_0x54467d;return ColorManager[_0x7b0d2f(0x3bd)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x253)]=Sprite_Gauge[_0x54467d(0x895)][_0x54467d(0x3cb)],Sprite_Gauge[_0x54467d(0x895)][_0x54467d(0x3cb)]=function(){const _0x2d5d16=_0x54467d;return VisuMZ[_0x2d5d16(0x98c)]['Sprite_Gauge_gaugeRate']['call'](this)[_0x2d5d16(0x2ec)](0x0,0x1);},VisuMZ['CoreEngine'][_0x54467d(0x6ef)]=Sprite_Gauge[_0x54467d(0x895)][_0x54467d(0x25f)],Sprite_Gauge[_0x54467d(0x895)]['currentValue']=function(){const _0x6fe338=_0x54467d;let _0x17e31c=VisuMZ[_0x6fe338(0x98c)][_0x6fe338(0x6ef)][_0x6fe338(0x52e)](this);return _0x17e31c;},Sprite_Gauge[_0x54467d(0x895)][_0x54467d(0x19f)]=function(){const _0x4e9f1c=_0x54467d;let _0xfa968e=this[_0x4e9f1c(0x25f)]();this[_0x4e9f1c(0x1c7)]()&&(_0x4e9f1c(0x3e8)===_0x4e9f1c(0x3e8)?_0xfa968e=VisuMZ[_0x4e9f1c(0x1a2)](_0xfa968e):(_0x405231['CoreEngine'][_0x4e9f1c(0x59a)][_0x4e9f1c(0x52e)](this),_0xb524b5=this[_0x4e9f1c(0x775)]));const _0x79f5c4=this[_0x4e9f1c(0x80d)]()-0x1,_0xfd7594=this[_0x4e9f1c(0x8f0)]?this['textHeight']():this[_0x4e9f1c(0x379)]();this[_0x4e9f1c(0x419)](),this[_0x4e9f1c(0x55d)][_0x4e9f1c(0xeb)](_0xfa968e,0x0,0x0,_0x79f5c4,_0xfd7594,_0x4e9f1c(0x49d));},Sprite_Gauge[_0x54467d(0x895)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x54467d(0x895)]['useDigitGrouping']=function(){const _0x21e8b2=_0x54467d;return VisuMZ['CoreEngine'][_0x21e8b2(0x357)][_0x21e8b2(0x355)][_0x21e8b2(0x980)];},Sprite_Gauge['prototype'][_0x54467d(0xfb)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ['CoreEngine'][_0x54467d(0x4c6)]=Sprite_Picture[_0x54467d(0x895)][_0x54467d(0x2a0)],Sprite_Picture[_0x54467d(0x895)][_0x54467d(0x2a0)]=function(){const _0x128306=_0x54467d;if(this[_0x128306(0x823)]&&this[_0x128306(0x823)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)){if(_0x128306(0x850)===_0x128306(0x850))this[_0x128306(0x894)](Number(RegExp['$1']));else return _0x813b82[_0x128306(0x98c)]['Game_Event_isCollidedWithEvents'][_0x128306(0x52e)](this,_0x4b4574,_0x3ccc69);}else _0x128306(0x370)!==_0x128306(0x370)?(this['changeTextColor'](_0x208bdf[_0x128306(0x3e4)]()),this[_0x128306(0xeb)](_0x2efb77,_0x2c0a02,_0xc17ccd,_0x1e8335,_0x128306(0x49d)),_0x5b70ed-=this['textWidth'](_0x1f2c7d)+0x6):VisuMZ[_0x128306(0x98c)][_0x128306(0x4c6)][_0x128306(0x52e)](this);},Sprite_Picture[_0x54467d(0x895)][_0x54467d(0x894)]=function(_0x3ed4fa){const _0x4200e7=_0x54467d,_0x59a951=ImageManager[_0x4200e7(0x308)],_0x545664=ImageManager[_0x4200e7(0x633)],_0x36102a=this[_0x4200e7(0x823)][_0x4200e7(0x8b6)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x59a951,_0x545664);const _0xcc1359=ImageManager['loadSystem'](_0x4200e7(0x6dd)),_0x50de6f=_0x3ed4fa%0x10*_0x59a951,_0x3b5cd8=Math[_0x4200e7(0x881)](_0x3ed4fa/0x10)*_0x545664;this[_0x4200e7(0x55d)][_0x4200e7(0x272)]=_0x36102a,this[_0x4200e7(0x55d)][_0x4200e7(0x738)](_0xcc1359,_0x50de6f,_0x3b5cd8,_0x59a951,_0x545664,0x0,0x0,_0x59a951,_0x545664);};function _0x40b4(){const _0x2dd9b4=['advanced','maxTp','_clickHandler','SParamVocab0','Wait','loadIconBitmap','prototype','FOXvG','FcOpD','_scrollDuration','Input_clear','_screenX','ItemBackColor1','paramX','Sprite_Actor_setActorHome','_forcedBattleSys','foGsf','gaugeHeight','mainAreaHeightSideButtonLayout','createBackground','INOUTELASTIC','doesNameContainBannedWords','ARRAYFUNC','BarThickness','qrYJB','buttonAssistKey5','_troopId','clearOnceParallelInterpreters','xparamRate1','MMfAM','Scene_MenuBase_createPageButtons','ediJP','initCoreEasing','EditBgType','XOBmx','Mirror','getCustomBackgroundSettings','_inputSpecialKeyCode','hasEncryptedImages','match','paramMax','PositionJS','string','(\x5cd+)>','PictureShowIcon','ptbOh','733914MgdIKC','textColor','AWPHV','txcJs','traitsPi','INSINE','faces','padding','altKey','DETACH_PICTURE_CONTAINER','Ivsza','_target','Scene_Battle_createSpritesetFix','Window','drawActorClass','createPointAnimationQueue','nQOpF','CEXrR','filter','processKeyboardHandling','level','remove','description','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','mainAreaHeight','_anchor','_stored_normalColor','_baseTexture','keyRepeatWait','zchSn','mainAreaTopSideButtonLayout','vGGpP','createCustomBackgroundImages','_profileWindow','_pictureCoordinatesMode','powerUpColor','enemy','LaKAf','ShortcutScripts','Scene_Base_createWindowLayer','ATTN','ENTER_SPECIAL','\x5c}❪SHIFT❫\x5c{','NumberRect','Spriteset_Base_updatePosition','_backgroundSprite','oLqHB','drawGameVersion','Game_Action_itemEva','scaleMode','addCommand','textHeight','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','useFontWidthFix','processCursorHomeEndTrigger','getInputMultiButtonStrings','ExportString','initCoreEngine','targetY','IconXParam9','TGR','Game_Action_numRepeats','slotWindowRect','_stored_ctGaugeColor2','SParamVocab6','optionsWindowRect','Window_Base_drawIcon','Game_Map_scrollLeft','hKldq','paramPlusJS','YGddY','nAMmi','img/%1/','Scene_Boot_onDatabaseLoaded','CustomParamAbb','showPicture','xparamRate','TCR','IconXParam2','button','buttonAssistWindowSideRect','Input_updateGamepadState','ColorCrisis','ALWAYS','ExtractStrFromMap','dYjre','transform','randomJS','LmqPq','parse','F22','_digitGroupingEx','FontShadows','makeDeepCopy','select','qsjcW','updateMotion','TRAIT_PARAM','arePageButtonsEnabled','isExpGaugeDrawn','BottomHelp','pBxFx','LESS_THAN','_upArrowSprite','PageChange','showDevTools','createWindowLayer','drawActorLevel','QZwQt','HRG','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','expGaugeColor2','buttonAssistText1','_realScale','refreshDimmerBitmap','OutlineColor','QZRZV','WindowLayer_render','_lastY','shift','BattleManager_update','processFauxAnimationRequests','Scene_Status_create','Window_NameInput_cursorPagedown','buttonAssistOffset%1','lAQgp','lastAnimationSprite','Game_Actor_paramBase','Window_NameInput_refresh','VvOQH','paramRate','onKeyDown','ITrKf','Sprite_Animation_setViewport','resetTextColor','note','_cancelButton','map','DisplayLockX','ceil','startShake','_margin','ParbU','Match','_stored_tpCostColor','CRI','boxHeight','DocumentTitleFmt','meVolume','INOUTCIRC','reserveNewGameCommonEvent','faceWidth','AntiZoomPictures','FontSize','YhfwX','ColorTPGauge2','length','_pauseSignSprite','add','JExIN','GoldFontSize','removeAnimationFromContainer','loadSystemImages','LcfKi','qXJKl','setHandler','updateMain','_storedMapText','hOjMb','itemLineRect','showPointAnimations','kvFsw','buttonAssistKey1','LUK','yScrollLinkedOffset','sparam','processHandling','createButtonAssistWindow','key%1','updateOnceParallelInterpreters','ItemBackColor2','render','F19','position','TextStr','MvAnimationRate','PositionX','\x5c}❪TAB❫\x5c{','xuMly','clearForcedGameTroopSettingsCoreEngine','type','gVacy','SceneManager_exit','isSideButtonLayout','iDPxa','DigitGroupingGaugeSprites','AutoStretch','LINEAR','drawCurrencyValue','lineHeight','isMVAnimation','CRSEL','isGamepadAxisMoved','DqClO','isActiveTpb','Finish','SceneManager_isGameActive','CoreEngine','StatusParamsBgType','SystemLoadAudio','isBottomHelpMode','charCode','overrideMimeType','updateOrigin','drawCurrentParam','src','_stored_expGaugeColor2','ZRGyM','OBDVs','sDOMt','WdSAU','Bitmap_fillRect','%1\x0a','CategoryRect','Scene_MenuBase_mainAreaTop','_lastX','F6key','rightArrowWidth','UBHli','_cacheScaleY','Window_StatusBase_drawActorLevel','Uwibs','Control\x20Variables\x20Script\x20Error','darwin','_backSprite2','_listWindow','ColorMPGauge1','_commandList','addLoadListener','isHandled','SParameterFormula','ParamName','_originalViewport','command357','_stored_powerUpColor','AudioChangeBgmVolume','updateMove','setCoreEngineUpdateWindowBg','adjustBoxSize','Input_update','innerWidth','randomInt','playOk','setGuard','_windowskin','setupButtonImage','_optionsWindow','tpCostColor','buyWindowRect','RxecP','NUM','save','CallHandlerJS','Osflw','xclDP','ptCwI','RegExp','KeyboardInput','WIN_ICO_CLEAR','selectLast','drawGauge','removeFauxAnimation','DCdzW','animationShouldMirror','PIPE','inBattle','INQUAD','_stored_ctGaugeColor1','QuYHf','YOEFy','batch','wcHQB','original','opacity','integer','Game_Actor_changeClass','IconXParam3','gtCqR','createKeyJS','round','fxetL','Bitmap_blt','1.3.0','Bitmap_resize','paramPlus','rTUGy','_offsetX','makeFontSmaller','drawText','uHPko','processMoveCommand','STRUCT','CONTEXT_MENU','onActorChange','IconParam6','ButtonHeight','cancel','updatePositionCoreEngine','children','XParamVocab2','_targetOffsetY','outlineColor','uRemM','drawAllParams','valueOutlineColor','Version','_scaleX','mjJbv','setActorHome','XGtjx','hideButtonFromView','Gumhm','NUMPAD8','Map%1','destroyContents','fUJKu','switchModes','drawItem','_destroyCanvas','viZGd','displayX','vLntr','createFauxAnimationQueue','_lastOrigin','filters','windowPadding','RnFwX','_list','kVMyO','jsonToZip','drawFace','initBasic','Enemy','IconSParam1','isTriggered','up2','bind','PLUS','canAttack','updateDocumentTitle','maxCols','WLgHk','requestMotion','pixelated','Window_MapName_refresh','members','Window_NameInput_initialize','setupNewGame','SubfolderParse','KeyItemProtect','MenuBg','setBackgroundType','%1/','BattleSystem','scale','xparamFlatJS','clipboard','WIN_OEM_FJ_TOUROKU','skayq','Scene_Name_onInputOk','DECIMAL','helpAreaTopSideButtonLayout','ExtJS','targetOpacity','loadGameImagesCoreEngine','processSoundTimings','Symbol','keyboard','BlurStrength','setBattleSystem','sczeK','TRG','Bitmap_gradientFillRect','createSpriteset','mute','AnimationID','MRG','_drawTextOutline','tileWidth','Window_NameInput_cursorPageup','text','SEPARATOR','setEnemyAction','_centerElementCoreEngine','paramName','dropItems','reduce','ZkeXo','SwitchToggleRange','【%1】\x0a','_isPlaytest','crisisColor','ActorBgType','Location','Scene_GameEnd_createBackground','EndingID','_hideButtons','createPageButtons','font','4619910fFNLGs','initialize','yMWYX','HbGwd','_drawTextShadow','\x0a\x0a\x0a\x0a\x0a','aLzxh','max','maxScrollY','setAnchor','INBOUNCE','ShowJS','jtZlJ','_opening','CreateBattleSystemID','Scene_Map_initialize','wcDLq','getParameter','TextManager_param','isMapScrollLinked','titleCommandWindow','WIN_OEM_ATTN','Basic','hAdTE','GoldBgType','process_VisuMZ_CoreEngine_Notetags','ParseActorNotetags','_statusParamsWindow','playTestF6','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','ZNRpr','xparamPlus2','connected','wait','URL','dxhbp','BasicParameterFormula','KOwGB','ColorSystem','_number','setupCustomRateCoreEngine','_pageupButton','subtitle','isLoopHorizontal','gradientFillRect','PositionY','JArEn','Scene_Options_create','JEAtY','ExportStrFromAllTroops','jmdYd','ColorHPGauge2','ZItFn','pictureButtons','UWvvo','isMenuButtonAssistEnabled','_slotWindow','strokeRect','_goldWindow','setupCoreEngine','parallaxes','BTB','buttonAreaHeight','SideView','processKeyboardHome','soeYb','duration','MAXHP','Rate2','drawValue','Window_Base_createTextState','processCursorMove','GroupDigits','F23','requestPointAnimation','cursorRight','ACCEPT','mpCostColor','LEFT','VisuMZ_1_OptionsCore','EscapeAlways','pjVrm','BlurFilter','CIRCUMFLEX','8stVnkY','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','pitch','Game_Temp_initialize','LppzE','buttonAssistText4','kftOi','egSpj','baseId','MAX_SAFE_INTEGER','uTvmP','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setViewportCoreEngineFix','AudioChangeBgmPan','_scrollBarHorz','move','Game_Picture_scaleX','QUESTION_MARK','GRD','_image','Scene_Map_createSpritesetFix','iSYlj','refreshScrollBarBitmap','_createInternalTextures','skillId','useDigitGrouping','KjpqE','_lastCommandSymbol','expParams','Scene_MenuBase_createBackground','mainAreaTop','adjustPictureAntiZoom','TXBSN','JwqUb','BoxMargin','playOnceParallelInterpreter','playBgm','drawBackgroundRect','helpAreaTop','KSRAX','sparamFlat2','VfXOE','updateLastTarget','EnableMasking','onInputBannedWords','_playtestF7Looping','targetPosition','NnWwG','fillText','FBUEL','NXmbd','SnVoM','Param','isScrollBarVisible','25aaVeXo','focus','createDigits','Window_Selectable_processTouch','TitleCommandList','iqvPb','IconXParam1','removeAllFauxAnimations','storeMapData','ExportCurMapText','stencilFunc','ATK','pFGHq','DTB','style','cqEuU','F20','isEnabled','XParamVocab4','_gamepadWait','Window_NameInput_processTouch','SAHky','isKeyItem','isActor','pictures','Game_Action_setAttack','_commandWindow','_itemWindow','itemWindowRect','Window_ShopSell_isEnabled','VisuMZ_1_BattleCore','isMaskingEnabled','INEXPO','_pointAnimationSprites','itemBackColor1','Window_Selectable_drawBackgroundRect','_currentBgs','SellRect','playBuzzer','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','Show\x20Scrolling\x20Text\x20Script\x20Error','HELP','updateScrollBarVisibility','1634234cfoXVi','mainFontSize','Color','ColorHPGauge1','_targetOpacity','toFixed','PWNap','createEnemies','%1%2','AnimationPoint','SkillMenu','mainCommandWidth','_index','cursorLeft','_registerKeyInput','_onError','enabled','SEMICOLON','SParamVocab5','gainGold','Scene_Base_terminate','maxScrollbar','helpWindowRect','center','IconSParam7','PreserveNumbers','IconXParam4','_sellWindow','VisuMZ_2_BattleSystemOTB','Page','_makeFontNameText','xparamFlat2','home','popScene','ParamChange','isPhysical','commandWindowRows','updateData','parseForcedGameTroopSettingsCoreEngine','ColorManager_loadWindowskin','zjHsa','Hhgxj','updateScrollBars','processDigitChange','_stored_tpGaugeColor2','NUMPAD1','DummyRect','OpenConsole','buttonAssistText%1','nNsMQ','PxmhC','Scene_Boot_loadSystemImages','removeChild','targetScaleX','createFauxAnimationSprite','EhgAj','setMainFontSize','processAlwaysEscape','JcQaN','actorWindowRect','updatePositionCoreEngineShakeRand','xKXiI','_changingClass','_origin','Scene_Map_createMenuButton','onerror','XParamVocab8','hkHup','Sprite_Gauge_gaugeRate','endBattlerActions','0.00','KBmbT','isPressed','ParseAllNotetags','tilesets','_animation','BmzrU','Window_StatusBase_drawActorSimpleStatus','sparamRate','LvExpGauge','currentValue','DigitGroupingLocale','Scene_Map_updateScene','FunctionName','WIN_OEM_PA3','fadeSpeed','ImprovedAccuracySystem','_pictureContainer','gDRow','ColorTPGauge1','image-rendering','SnapshotOpacity','create','RPGMAKER_VERSION','JstFw','TkLWO','cancelShowButton','numRepeats','getLastGamepadUsed','smooth','StatusRect','profileWindowRect','EREOF','EXCLAMATION','NUM_LOCK','NEyqe','aCaKR','createPointAnimationTargets','_actorWindow','Manual','vxxil','Speed','xdg-open','JADwN','subjectHitRate','hide','_stored_expGaugeColor1','rlSDs','tBhOz','hewTs','Input_shouldPreventDefault','catchUnknownError','_shakePower','BlendMode','SceneManager_onKeyDown','NUMPAD6','JXlCv','object','CEV','_baseSprite','playCursor','〘Scrolling\x20Text〙\x0a','gainSilentTp','rowSpacing','isForFriend','thickness','Y:\x20%1','Scene_Title_drawGameTitle','paramRate2','NONCONVERT','alwaysDash','listWindowRect','waiting','isSideView','cos','loadBitmap','drawIcon','start','_skillTypeWindow','defineProperty','bodyColor','loadTitle1','kDcIZ','setCommonEvent','skillTypes','IpMFc','TPB\x20ACTIVE','onMoveEnd','drawCharacter','1.4.4','YnpmJ','makeDocumentTitle','hyaLQ','offset','vert','nickname','AGI','_targetScaleY','ONE_MINUS_SRC_ALPHA','fdiFd','EnableNameInput','getLastUsedGamepadType','movePageButtonSideButtonLayout','VisuMZ_2_BattleSystemFTB','yMJGw','sparamFlatBonus','wtypeId','addChild','expRate','outlineColorGauge','Game_Screen_initialize','isGamepadButtonPressed','REPLACE','_menuButton','maxLvGaugeColor1','addEventListener','ColorCTGauge2','backOpacity','operation','EVA','buttonAssistSwitch','clearRect','ParseItemNotetags','PGUP','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','resetBattleSystem','terminate','_subject','Spriteset_Base_initialize','responseText','isGamepadConnected','RequireFocus','height','sparamRateJS','animationId','drawActorSimpleStatus','erasePicture','framebuffer','Graphics_printError','ZwSth','TitlePicButtons','TILDE','(\x5cd+)([%％])>','_smooth','displayName','ConvertParams','FUNC','isUseModernControls','canUse','3282yNmuem','scrollDown','clamp','XParamVocab3','usableSkills','list','fWqOe','BbZjd','flush','updateDashToggle','StatusBgType','ETB','reserveCommonEvent','AnimationMirrorOffset','displayY','escape','substring','_screenY','STENCIL_TEST','UkgZT','MenuLayout','DrawIcons','BTestItems','dTuYA','XGDqX','worldTransform','moveCancelButtonSideButtonLayout','SParamVocab4','DimColor2','getInputButtonString','iconWidth','allowShiftScrolling','Title','markCoreEngineModified','BgType','startAutoNewGame','hpVcs','anchor','lEEpJ','_currentMap','Game_Map_setup','mCsLw','DEF','centerX','ParamArrow','IconXParam5','InIBV','VIEWPORT','createPointAnimationSprite','drawGoldItemStyle','maxLvGaugeColor2','bHzkj','jsQuickFunc','_coreEngineShakeStyle','ZERO','calcEasing','_context','registerCommand','addWindow','optSideView','yMPpO','SystemSetWindowPadding','WIN_OEM_FJ_LOYA','processPointAnimationRequests','measureTextWidthNoRounding','pages','contentsBack','PRINTSCREEN','aHwLu','eDGqA','nQHHE','DamageColor','Sprite_destroy','scaleX','platform','_centerCameraCheck','exportAllMapStrings','overallHeight','horizontal','Scene_Map_updateMainMultiply','name','isBusy','_isButtonHidden','BgFilename1','mGIZI','UrLQm','CustomParamIcons','jLOdv','xparamPlusJS','INQUINT','ExtractStrFromList','status','ScaleX','STR','ButtonAssist','VisuMZ_2_BattleSystemCTB','_data','<JS\x20%1\x20%2:[\x20](.*)>','Window_Base_drawCharacter','UpdatePictureCoordinates','updatePosition','command111','JttmS','Upper\x20Left','Plus2','charAt','Conditional\x20Branch\x20Script\x20Error','QoL','includes','Settings','FAZSH','Window_Base_createContents','_buttonType','XParamVocab7','ControllerMatches','zzYoV','targets','qaJli','dwvKS','Scene_Skill_create','ColorMPCost','isAnimationForEach','ColorPowerUp','SkillTypeRect','HOME','_stored_powerDownColor','keyMapper','LrEMW','onButtonImageLoad','FontSmoothing','coreEngineRepositionEnemies','width','restore','BarBodyColor','RWWTo','setCoreEngineScreenShakeStyle','forceStencil','bgmVolume','SCROLLBAR','SLASH','changeClass','Game_BattlerBase_initMembers','PvbhP','bitmapHeight','playCancel','_action','isPlaying','OUTQUAD','push','_allTextHeight','option','random','encounterStep','Game_Picture_move','ParseArmorNotetags','mZGfi','_statusEquipWindow','isOpen','AMPERSAND','OpenSpeed','Total','_downArrowSprite','sv_actors','keyCode','_colorCache','khlCj','ICekz','sQTwH','itemSuccessRate','QzZfM','BattleManager_checkSubstitute','deflate','DebugConsoleLastControllerID','Plus1','HTQQm','sparamFlat1','fhKQO','showFauxAnimations','goto','FDqzw','PAUSE','paramFlatJS','paramBaseAboveLevel99','hit','setSideView','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','destroyed','pan','getCoreEngineScreenShakeStyle','%1:\x20Exit\x20','startMove','PRINT','indexOf','targetObjects','FamGe','INCUBIC','cursorPagedown','Game_Troop_setup','concat','BottomButtons','imageSmoothingEnabled','LAjjc','OTB','zxuTF','PixelateImageRendering','CLzoe','ExtractStrFromTroop','repositionCancelButtonSideButtonLayout','DigitGroupingDamageSprites','Weapon-%1-%2','font-smooth','outlineColorDmg','currentClass','loadMapData','WIN_OEM_ENLW','Game_Actor_levelUp','SwitchRandomizeRange','SideButtons','picture','paramRate1','Bitmap_drawText','OpenURL','_width','determineSideButtonLayoutValid','paintOpacity','gaugeRate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ScreenResolution','catchException','onXhrError','_mp','OPEN_BRACKET','parameters','GameEnd','INSERT','ftFae','repeat','zxmrF','ZBFKP','openness','_height','yxzfl','bgXJe','ListRect','isGamepadTriggered','PictureEraseAll','isInputting','rLNEW','loadWindowskin','Window_Selectable_cursorUp','systemColor','getKeyboardInputButtonString','powerDownColor','BackOpacity','zMFIl','checkCoreEngineDisplayCenter','down2','wgVke','exec','EKEHU','DOLLAR','COMMA','PdFDV','PA1','YCuoW','Bitmap_initialize','ValueJS','updateBgmParameters','_stored_hpGaugeColor2','InputBgType','X:\x20%1','retrieveFauxAnimation','WLpGH','_statusWindow','isArrowPressed','setMoveEasingType','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_lastGamepad','MultiKeyFmt','QUOTE','AutoScrollLockX','expGaugeColor1','Game_Character_processMoveCommand','_coreEasingType','_fauxAnimationSprites','colSpacing','_updateFilterArea','Window_Selectable_itemRect','nfIFy','drawParamName','getBackgroundOpacity','ApplyEasing','pressed','ShowScrollBar','NUMPAD7','wIXqP','MCR','_movementDuration','hqxUS','skipBranch','eiPRX','ULQVF','TranslucentOpacity','setupValueFont','Padding','_startPlaying','setColorTone','updatePlayTestF7','DSouh','tilesetFlags','Linear','drawSegment','ieGzi','setFrame','([\x5c+\x5c-]\x5cd+)>','isSceneMap','changeTextColor','paramchangeTextColor','OUTCIRC','updateKeyText','pageup','playCursorSound','_stored_pendingColor','result','QvPnR','title','Game_Map_scrollUp','isItemStyle','OptionsMenu','_editWindow','processKeyboardDigitChange','ubHop','355yWeLtq','ColorPowerDown','XParamVocab1','bfbPC','processTouch','version','_hovered','Ktuqi','MAT','repositionEnemiesByResolution','Smooth','isCursorMovable','Window_Base_drawFace','_defaultStretchMode','XParamVocab6','zBbbS','turn','XyZTK','Scene_Shop_create','setup','CLOSE_BRACKET','AudioChangeBgsPitch','REC','INNYt','maxGold','KOnIr','_hp','textAlign','clearCachedKeys','AudioChangeBgsVolume','RlOPH','JAIaD','drawTextTopAligned','pkzkl','Spriteset_Base_destroy','loadSystem','OUTSINE','HpjEJ','Unnamed','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','_actor','process_VisuMZ_CoreEngine_ControllerButtons','setSideButtonLayout','addChildToBack','Scene_MenuBase_helpAreaTop','gaugeLineHeight','wjBue','Enemy-%1-%2','sparamPlus2','Rate','ZuKiR','index','BgFilename2','Opacity','areButtonsHidden','LATIN1','ShowDevTools','_fauxAnimationQueue','isEventRunning','IconParam0','createTextState','WIN_OEM_CLEAR','removeAnimation','_timerSprite','ojzoe','WIN_OEM_FJ_MASSHOU','ParamMax','CustomParam','default','Scene_Base_terminateAnimationClearBugFix','State-%1-%2','RevertPreserveNumbers','uVeaR','tpGaugeColor1','active','CategoryBgType','hyUWx','setupScrollBarBitmap','updateScrollBarPosition','WXYYq','_categoryWindow','NameMenu','createPointAnimation','_pointAnimationQueue','oSkdN','updateScene','fontSize','wnfSD','Window_Base_drawText','NAAqe','IconSParam9','allTiles','win32','ShowButtons','subject','easingType','isNormalPriority','MRF','BTson','ASTERISK','VisuMZ_2_BattleSystemSTB','Abbreviation','Rate1','right','backspace','QDKDX','_targetOffsetX','setMute','updateCurrentEvent','getBattleSystem','createCustomParameter','buttonAssistOffset4','_battleField','params','_showDevTools','MPMSb','Window_EquipItem_isEnabled','numberWindowRect','WIN_OEM_PA1','_bgsBuffer','ARRAYSTRUCT','INBACK','NSQzi','OUTBOUNCE','ActorTPColor','SaveMenu','Ryxfs','Scene_MenuBase_createCancelButton','Sprite_Picture_updateOrigin','context','pop','SParamVocab7','slice','lCOOr','checkSmartEventCollision','setSize','number','Skill-%1-%2','titles1','_cacheScaleX','jAeot','initialLevel','updateSmoothScroll','volume','Sprite_Picture_loadBitmap','Game_Party_consumeItem','applyCoreEasing','paramRateJS','NUMPAD4','getPointAnimationLayer','updateTransform','Scene_Item_create','olZLT','updateWaitMode','addAnimationSpriteToContainer','%2%1%3','updatePositionCoreEngineShakeOriginal','_backgroundFilter','paramBase','Subtitle','fNeZp','kwzeQ','CLOSE_PAREN','drawGameSubtitle','moveMenuButtonSideButtonLayout','deactivate','centerY','visible','stypeId','VisuMZ_3_EventChainReact','itypeId','kWZLS','_dummyWindow','Bitmap_strokeRect','Window_Base_initialize','globalAlpha','IconSParam5','Script\x20Call\x20Error','hXGRO','XParamVocab0','DigitGroupingStandardText','Input_onKeyDown','iUzEo','clone','isBottomButtonMode','evaded','pointY','ARRAYJSON','ModernControls','HelpBgType','initMembers','isMaxLevel','skills','ynIDy','LzEVI','MapOnceParallel','_rate','removeOnceParallelInterpreter','maxHorz','numActions','ParseStateNotetags','INOUTBOUNCE','Window_NameInput_cursorRight','backgroundBitmap','originalJS','ADD','VisuMZ_2_BattleSystemETB','damageColor','_CoreEngineSettings','Window_NumberInput_start','XParamVocab9','tpColor','textWidth','drawRightArrow','scrollUp','Scene_Name_create','WIN_OEM_RESET','_shakeSpeed','ExportStrFromAllMaps','ATXlf','Scene_Battle_createSpriteset_detach','BKSP','getControllerInputButtonMatch','WkmtA','NUMPAD0','events','BattleManager_processEscape','DcIpT','process_VisuMZ_CoreEngine_CustomParameters','_closing','Game_Picture_y','refreshWithTextCodeSupport','CommandBgType','NewGameCommonEventAll','itemBackColor2','IcbPq','equips','FontWidthFix','Window_NameInput_cursorLeft','Center','cursorDown','refresh','itemRect','AllMaps','activate','destroy','windowOpacity','ColorGaugeBack','call','pendingColor','》Comment《\x0a%1\x0a','Game_Action_itemHit','Bitmap_measureTextWidth','Max','_refreshArrows','MDR','OutlineColorGauge','Game_Action_updateLastTarget','_coreEasing','BACK_SLASH','SParamVocab1','setValue','ParseClassNotetags','playLoad','PDR','down','textBaseline','scaleSprite','VOLUME_UP','GetParamIcon','pow','Map%1.json','_centerElement','PWVCh','PTB','BTestWeapons','OJFaJ','maxVert','_currentBgm','EXECUTE','ScreenShake','ParseEnemyNotetags','EXR','〘Common\x20Event\x20%1:\x20%2〙\x20End','InputRect','(\x5cd+\x5c.?\x5cd+)>','scrollbarHeight','olejA','Game_Interpreter_command105','RjgDw','Window_Gold_refresh','Sprite_AnimationMV_updatePosition','padZero','command122','return\x200','bitmap','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_viewportSize','scrollY','HIT','getColor','SlotBgType','goldWindowRect','CLEAR','OnLoadJS','Game_Picture_x','SUBTRACT','ControllerButtons','Scene_Battle_update','isItem','_balloonQueue','setTopRow','drawGameTitle','log','reICG','OTuDH','\x20Origin:\x20%1','tileHeight','_scene','checkCacheKey','alpha','_playTestFastMode','isEnemy','gQLNo','F12','enableDigitGrouping','value','toLowerCase','targetX','eTdtP','F10','_muteSound','snapForBackground','Ojwot','FINAL','pos','ALT','code','initVisuMZCoreEngine','IconParam2','eWzIW','normal','makeActionList','Flat2','_lastPluginCommandInterpreter','makeCoreEngineCommandList','enter','createMenuButton','openingSpeed','top','SParamVocab9','isPlaytest','test','SwitchToggleOne','processCursorMoveModernControls','_sideButtonLayout','Scene_Battle_createSpriteset','FDyPv','_updateGamepadState','Window_NameInput_processHandling','updateAnchor','itemHitImprovedAccuracy','centerCameraCheckData','Icon','ParseWeaponNotetags','applyForcedGameTroopSettingsCoreEngine','categoryWindowRect','Game_Picture_updateMove','_internalTextures','_onKeyPress','contents','_tempActor','_animationSprites','HelpRect','ExtDisplayedParams','sceneTerminationClearEffects','CmPTp','mmp','GpwGG','IvgUj','and\x20add\x20it\x20onto\x20this\x20one.','_paramPlus','CNT','FElDC','SParamVocab2','_stored_maxLvGaugeColor1','FsVjo','F16','wholeDuration','fCbtJ','_colorTone','xparamFlatBonus','_moveEasingType','NameInputMessage','SmartEventCollisionPriority','pagedown','_backSprite1','Scene_Menu_create','sDGWf','qhdQt','EnableNumberInput','Hsetn','pXvpZ','ProfileBgType','updatePositionCoreEngineShakeVert','item','buttonAssistText2','animationBaseDelay','clear','isCancelled','Game_Interpreter_updateWaitMode','Flat','removePointAnimation','contains','nesPu','stencilOp','KnEKP','_tilemap','RIGHT','createCancelButton','VariableJsBlock','HtVoR','Chance','performMiss','IconXParam0','fsGMc','battlebacks1','NUMPAD5','processEscape','alignBottom','drawNewParam','checkScrollBarBitmap','aQkhz','animationNextDelay','NewGameBoot','NoTileShadows','Window_Selectable_cursorDown','enable','CommonEventID','Sprite_Animation_processSoundTimings','sin','_shouldPreventDefault','xScrollLinkedOffset','Actor-%1-%2','sparamRate1','DBiec','itemEva','STB','_isWindow','AudioChangeBgmPitch','FDR','noDZb','WWcxR','_effectsContainer','NewGameCommonEvent','DisplayedParams','open','terms','vrziY','TextJS','nCoij','replace','952731YzbmBA','_cache','updateOpacity','ARRAYNUM','FBDWN','Graphics_defaultStretchMode','INCIRC','updateFauxAnimations','INOUTQUART','ImgLoad','deselect','Plus','applyEasing','ConvertNumberToString','_commonEventLayers','anchorCoreEasing','WIN_OEM_FJ_ROYA','constructor','isAnimationPlaying','Gold','VisuMZ_4_UniqueTileEffects','11FjLNBc','RepositionEnemies130','xparamFlat1','SystemLoadImages','smoothSelect','AccuracyBoost','uUNZk','ForceNoPlayTest','inputWindowRect','qwyly','buttonAssistKey3','retrievePointAnimation','min','Scene_Battle_createCancelButton','axes','statusParamsWindowRect','udlNF','scrollX','isRightInputMode','endAction','isWindowMaskingEnabled','EnableJS','setLastPluginCommandInterpreter','QkxwD','GoldOverlap','needsUpdate','iconHeight','process_VisuMZ_CoreEngine_jsQuickFunctions','WIN_OEM_AUTO','_addShadow','IconSParam0','printError','fromCharCode','setAction','CTRL','isEventTest','offOpacity','FgHPw','mHjQl','rgba(0,\x200,\x200,\x201.0)','mgUhN','ItemBgType','setWindowPadding','command105','isSpecialCode','updateCoreEasing','_refreshBack','_shakeDuration','ExportAllTroopText','characters','_pollGamepads','guardSkillId','seek','_refreshPauseSign','SCALE_MODES','setActionState','UgIWL','Bitmap_clearRect','origin','drawBackground','pOFtp','ALTGR','1415928gHIyuw','isInstanceOfSceneMap','initButtonHidden','PLAY','OkText','createTitleButtons','levelUpRecovery','INOUTQUINT','processKeyboardEnd','_pressed','QHAwg','_lastScrollBarValues','PictureID','#%1','gaugeBackColor','paramMaxJS','GET','OdBkh','TNVLC','battlebacks2','TextCodeClassNames','alphabetic','INOUTQUAD','getControllerInputButtonString','isFullDocumentTitle','initCoreEngineScreenShake','gainItem','RZark','Scene_Map_update','ActorRect','_backSprite','quit','LevelUpFullMp','en-US','mdpfX','uSJbf','MDF','NFaqc','Game_Picture_calcEasing','StartID','getCombinedScrollingText','AMGoL','defaultInputMode','StatusEquipRect','ZRlYQ','isNextScene','isOptionValid','get','menu','tbntm','isCollidedWithEvents','ListBgType','missed','ctrl','setupRate','MapNameTextCode','Type','calcCoreEasing','OPEN_CURLY_BRACKET','getLevel','isRepeated','isFauxAnimationPlaying','lrPqD','ZaQAt','Sprite_Button_initialize','system','gIGeq','itemHit','_onLoad','GTzSf','removeAllPointAnimations','blendFunc','ZHxTs','_scrollBarVert','consumeItem','maxScrollX','CommandWidth','itMng','_onceParallelInterpreters','resize','_movementWholeDuration','buttonAssistOffset3','_inputString','F13','writeFile','sceQF','IconParam7','_digitGrouping','oEfnN','mainAreaBottom','updatePictureAntiZoom','KeySHIFT','uiAreaWidth','mapId','Window_Selectable_processCursorMove','Key%1','isLoopVertical','toXHo','Window_Base_destroyContents','DOUBLE_QUOTE','WIN_OEM_FJ_JISHO','nRRcj','_url','hpColor','zORWM','BjJrX','MEV','IconParam1','learnings','_duration','YYqDb','SwitchRandomizeOne','buttonAssistText5','Renderer','MAX_GL_TEXTURES','traitObjects','checkSubstitute','stop','bgm','autoRemovalTiming','StatusEquipBgType','Spriteset_Base_isAnimationPlaying','DimColor1','createContents','Mute','PHA','yaqXd','KBKei','eva','wZgBP','buttonAssistText3','ARRAYSTR','createScrollBarSprites','smzmT','IconSet','Game_Picture_initBasic','tab','editWindowRect','Bitmap_drawCircle','blockWidth','setBackgroundOpacity','drawParamText','toLocaleString','INOUTSINE','processKeyboardDelete','PhcSY','mpGaugeColor2','_setupEventHandlers','_forcedTroopView','OffBarColor','isSmartEventCollisionOn','yZcLF','Sprite_Gauge_currentValue','initDigitGrouping','update','isNumpadPressed','ohEMx','xparamPlus1','processKeyboardBackspace','isGameActive','oesXF','updatePadding','_dimmerSprite','_targetAnchor','CgsZg','BarOffset','EquipMenu','reservePlayTestNewGameCommonEvent','wUlmk','RKjQb','setupCoreEasing','isPointAnimationPlaying','faceHeight','updatePositionCoreEngineShakeHorz','Window_NameInput_cursorDown','buttonAssistOffset5','Window_NameInput_cursorUp','GREATER_THAN','setLastGamepadUsed','measureTextWidth','ActorMPColor','loadTitle2','NobDX','shake','_bgmBuffer','CommandRect','bgsVolume','GqFGS','updateBackOpacity','drawCircle','ZaJLP','sparamPlus','updatePointAnimations','etypeId','Game_Map_scrollRight','vertical','end','stringKeyMap','LevelUpFullHp','EditRect','WIN_OEM_COPY','Spriteset_Battle_createEnemies','GoldIcon','cursorUp','PjFGs','KEEP','qwSaC','maxLevel','createFauxAnimation','MAXMP','setSkill','process_VisuMZ_CoreEngine_Settings','filterArea','itemPadding','$dataMap','〘Show\x20Text〙\x0a','_stored_crisisColor','SELECT','ColorTPCost','Flat1','DIVIDE','_hideTileShadows','qcjej','fFRet','NqcTs','blt','actor','Input_pollGamepads','EXSEL','asin','sparamFlatJS','forceOutOfPlaytest','isSceneBattle','Scene_Equip_create','WJScG','numberShowButton','makeInputButtonString','IHiKK','onload','application/json','trim','IDs','drawTextEx','apply','tfGNE','processTimingData','dDWWa','buttonAssistWindowRect','SkillTypeBgType','nextLevelExp','currentLevelExp','targetEvaRate','Scene_MenuBase_mainAreaHeight','TimeProgress','OffBarOpacity','Window_Scrollable_update','seVolume','vBhkn','endAnimation','dashToggle','getGamepads','JSON','makeEncounterCount','sv_enemies','updateEffekseer','smallParamFontSize','viewport','RWzfb','updateClose','ONE','createTroopNote','Scene_Map_updateMain','_clientArea','OutlineColorDmg','setClickHandler','_pictureCoordinatesWindow','vertJS','Game_Interpreter_PluginCommand','QPzBf','isNwjs','Window_TitleCommand_selectLast','DataManager_setupNewGame','refreshActor','ZyrHF','updateMainMultiply','buttonAssistKey%1','_spriteset','cursorPageup','kCUnz','bvjGK','_bitmap','OUTCUBIC','Sprite_Button_updateOpacity','buttonAssistWindowButtonRect','statusWindowRect','HASH','catchLoadError','paramFlatBonus','itemHeight','ColSpacing','4YyotzM','scrollbar','buttonAssistCancel','Scene_Boot_startNormalGame','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','scaleY','IjPHu','AutoScrollLockY','fvfpR','aJfPx','ColorMPGauge2','_drawTextBody','xparamRateJS','checkPassage','BACK_QUOTE','_mirror','initialBattleSystem','Sprite_AnimationMV_processTimingData','dummyWindowRect','ColorCTGauge1','F24','RKyLA','sqrt','CustomParamNames','prVHm','join','paramWidth','updateOpen','processTouchModernControls','VariableEvalReference','writeText','BTestAddedQuantity','vipRJ','onInputOk','vPDrP','SamoH','makeFontBigger','ColorExpGauge1','offColor','jeHzb','canEquip','maxTurns','KcUbd','useDigitGroupingEx','animations','EQUALS','ESC','targetContentsOpacity','LoadError','destroyScrollBarBitmaps','adjustSprite','command355','getColorDataFromPluginParameters','Game_BattlerBase_refresh','SNeIS','TAB','_startDecrypting','innerHeight','Layer','_startLoading','_targetY','boxWidth','buttonAssistKey4','atypeId','windowRect','isOpenAndActive','MainMenu','paramY','RepositionEnemies','Untitled','ZqeTh','playMiss','_offsetY','DigitGroupingExText','bpsfs','Game_Event_start','paramFlat','xparam','Window_Base_update','evaluate','eGZTD','COLON','isClosed','_windowLayer','_buyWindow','currencyUnit','buttonAssistOk','INQUART','left','ItemMenu','Graphics_centerElement','levelUp','drawIconBySize','openURL','sparamPlus1','setTargetAnchor','_stored_mpGaugeColor2','createBuffer','_maxDigits','mKsel','Game_System_initialize','CancelText','rTajW','EncounterRateMinimum','_inputWindow','titles2','LoadMenu','Scene_Map_createSpriteset_detach','F11','Game_Map_scrollDown','VOLUME_MUTE','_pagedownButton','_targets','horzJS','Scene_Map_createSpriteset','createCommandWindow','dimColor1','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','nOSVW','ENTER','_opacity','scrollLeft','STENCIL_BUFFER_BIT','VisuMZ_2_BattleSystemPTB','tkswb','exit','encounterStepsMinimum','_repositioned','SPivb','paramValueByName','SCROLL_LOCK','contentsOpacity','Ewtui','onDatabaseLoaded','ACkDz','param','NUMPAD9','Game_Event_isCollidedWithEvents','bitmapWidth','Game_Interpreter_command122','WIN_OEM_WSCTRL','mirror','findSymbol','VhBdq','maxItems','runCombinedScrollingTextAsCode','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','ItemHeight','Game_Interpreter_command355','VisuMZ_2_BattleSystemBTB','358779FQPgEz','YuExK','gGXVB','_mapNameWindow','PictureFilename','_active','setAttack','enemies','IconSParam8','setEasingType','_pictureName','rBrUl','ActorHPColor','fmXvV','setActorHomeRepositioned','buttonAssistKey2','_customModified','outbounce','Game_Picture_scaleY','mpColor','sparamPlusJS','INOUTEXPO','Actor','OS_KEY','aFOMv','PictureCoordinatesMode','loadPicture','_battlerName','EJaJu','playTestCtrlT','textSizeEx','NumberBgType','ParseSkillNotetags','renderNoMask','SceneManager_initialize','_onKeyDown','MULTIPLY','_scaleY','resetFontSettings','_helpWindow','_loadingState','ctGaugeColor1','_stored_maxLvGaugeColor2','sEriC','OptionsRect','Tilemap_addShadow','helpAreaHeight','eventsXyNt','destroyCoreEngineMarkedBitmaps','_storedStack','Sprite_Battler_startMove','_mode','DefaultMode','%1〘End\x20Choice\x20Selection〙%1','helpAreaBottom','FlAtI','onLoad','F7key','xbWCg','makeCommandList','attackSkillId','XParamVocab5','StatusMenu','text%1','makeTargetSprites','targetBackOpacity','CTB','show','clearStencil','initMembersCoreEngine','onKeyDownKeysF6F7','([\x5c+\x5c-]\x5cd+)([%％])>','commandWindowRect','moveRelativeToResolutionChange','zoomScale','getButtonAssistLocation','BuyRect','areButtonsOutsideMainUI','RepositionActors','none','Window_NumberInput_processDigitChange','fillRect','touchUI','nah','updatePictureCoordinates','geimE','WIN_OEM_PA2','CustomParamType','_stored_tpGaugeColor1','DCkzu','areTileShadowsHidden','drawActorExpGauge','format','Power','zIZIg','WIN_ICO_HELP','toUpperCase','_displayX','rgba(0,\x200,\x200,\x200.7)','jzYqX','mzdpR','ItemRect','ajskI','DrawItemBackgroundJS','floor','process_VisuMZ_CoreEngine_Functions','FTB','GoldRect','KeyTAB','ytXTa','emdMc','RowSpacing','UyNFs','layoutSettings','_stored_mpGaugeColor1','Keyboard','Scene_Boot_updateDocumentTitle','YJdde'];_0x40b4=function(){return _0x2dd9b4;};return _0x40b4();}function Sprite_TitlePictureButton(){const _0x2e5135=_0x54467d;this[_0x2e5135(0x15b)](...arguments);}Sprite_TitlePictureButton[_0x54467d(0x895)]=Object[_0x54467d(0x26b)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x54467d(0x895)][_0x54467d(0x615)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x54467d(0x895)][_0x54467d(0x15b)]=function(_0x4e6b5b){const _0x74ca15=_0x54467d;Sprite_Clickable['prototype'][_0x74ca15(0x15b)]['call'](this),this['_data']=_0x4e6b5b,this['_clickHandler']=null,this['setup']();},Sprite_TitlePictureButton[_0x54467d(0x895)]['setup']=function(){const _0x192925=_0x54467d;this['x']=Graphics[_0x192925(0x36d)],this['y']=Graphics[_0x192925(0x2d9)],this['visible']=![],this[_0x192925(0x9bc)]();},Sprite_TitlePictureButton[_0x54467d(0x895)]['setupButtonImage']=function(){const _0x18306f=_0x54467d;this['bitmap']=ImageManager[_0x18306f(0x833)](this[_0x18306f(0x34a)][_0x18306f(0x81d)]),this[_0x18306f(0x55d)]['addLoadListener'](this[_0x18306f(0x36a)][_0x18306f(0x11b)](this));},Sprite_TitlePictureButton[_0x54467d(0x895)][_0x54467d(0x36a)]=function(){const _0x4ed150=_0x54467d;this['_data'][_0x4ed150(0x566)]['call'](this),this[_0x4ed150(0x34a)][_0x4ed150(0x8b8)][_0x4ed150(0x52e)](this),this[_0x4ed150(0x769)](this[_0x4ed150(0x34a)][_0x4ed150(0xc7)][_0x4ed150(0x11b)](this));},Sprite_TitlePictureButton[_0x54467d(0x895)][_0x54467d(0x6f1)]=function(){const _0x4a4e90=_0x54467d;Sprite_Clickable[_0x4a4e90(0x895)][_0x4a4e90(0x6f1)]['call'](this),this[_0x4a4e90(0x606)](),this[_0x4a4e90(0x43a)]();},Sprite_TitlePictureButton[_0x54467d(0x895)][_0x54467d(0x264)]=function(){const _0x413d41=_0x54467d;return VisuMZ[_0x413d41(0x98c)][_0x413d41(0x357)][_0x413d41(0x2fe)]['Title']['ButtonFadeSpeed'];},Sprite_TitlePictureButton['prototype'][_0x54467d(0x606)]=function(){const _0xab57fd=_0x54467d;this[_0xab57fd(0x660)]||this[_0xab57fd(0x43c)]?this[_0xab57fd(0xdc)]=0xff:_0xab57fd(0x6d6)!==_0xab57fd(0x998)?(this[_0xab57fd(0xdc)]+=this[_0xab57fd(0x4dd)]?this['fadeSpeed']():-0x1*this[_0xab57fd(0x264)](),this[_0xab57fd(0xdc)]=Math[_0xab57fd(0x625)](0xc0,this[_0xab57fd(0xdc)])):this[_0xab57fd(0x3fb)][_0xab57fd(0x12a)](_0x255c6f[_0xab57fd(0x88a)][_0xab57fd(0x2f4)]);},Sprite_TitlePictureButton['prototype'][_0x54467d(0x769)]=function(_0x84d0c1){const _0x1ca875=_0x54467d;this[_0x1ca875(0x891)]=_0x84d0c1;},Sprite_TitlePictureButton[_0x54467d(0x895)]['onClick']=function(){const _0x297c07=_0x54467d;if(this[_0x297c07(0x891)]){if(_0x297c07(0x8ae)!==_0x297c07(0x6c0))this['_clickHandler']();else{const _0x1f0358=this[_0x297c07(0x985)](_0xb8f157),_0x316f81=new(_0x1f0358?_0x42ad00:_0x2808ef)(),_0x3c7837=this['makeTargetSprites'](_0x132909);this[_0x297c07(0xd2)](_0x1ac2fb[0x0])&&(_0x30c62d=!_0x1d3d0b);_0x316f81[_0x297c07(0x3ab)]=_0x333401,_0x316f81[_0x297c07(0x449)](_0x3c7837,_0x192b03,_0x232779,_0x20cfd3),_0x316f81['setMute'](_0xacbd97),this[_0x297c07(0x4d0)](_0x316f81);if(this[_0x297c07(0x5aa)])this[_0x297c07(0x5aa)][_0x297c07(0x8d2)](_0x316f81);this[_0x297c07(0x406)]['push'](_0x316f81);}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x2d5)]=Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x15b)],Spriteset_Base['prototype'][_0x54467d(0x15b)]=function(){const _0x148b3b=_0x54467d;VisuMZ[_0x148b3b(0x98c)][_0x148b3b(0x2d5)][_0x148b3b(0x52e)](this),this[_0x148b3b(0x85e)]();},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x85e)]=function(){const _0x133b63=_0x54467d;this[_0x133b63(0x406)]=[],this['_pointAnimationSprites']=[],this[_0x133b63(0x4c1)]=this[_0x133b63(0x12d)]['x'],this[_0x133b63(0x9a2)]=this[_0x133b63(0x12d)]['y'];},VisuMZ[_0x54467d(0x98c)]['Spriteset_Base_destroy']=Spriteset_Base['prototype'][_0x54467d(0x52b)],Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x52b)]=function(_0x5bac95){const _0x4f82fc=_0x54467d;this[_0x4f82fc(0x1eb)](),this['removeAllPointAnimations'](),VisuMZ[_0x4f82fc(0x98c)][_0x4f82fc(0x458)]['call'](this,_0x5bac95);},VisuMZ[_0x54467d(0x98c)]['Spriteset_Base_update']=Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x6f1)],Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x6f1)]=function(){const _0xd5ad0b=_0x54467d;VisuMZ[_0xd5ad0b(0x98c)]['Spriteset_Base_update']['call'](this),this['updatePictureAntiZoom'](),this[_0xd5ad0b(0x60b)](),this[_0xd5ad0b(0x717)]();},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x6b1)]=function(){const _0x3b558e=_0x54467d;if(!VisuMZ[_0x3b558e(0x98c)][_0x3b558e(0x357)][_0x3b558e(0x355)][_0x3b558e(0x955)])return;if(this['_cacheScaleX']===this['scale']['x']&&this[_0x3b558e(0x9a2)]===this[_0x3b558e(0x12d)]['y'])return;this[_0x3b558e(0x1cd)](),this['_cacheScaleX']=this[_0x3b558e(0x12d)]['x'],this[_0x3b558e(0x9a2)]=this[_0x3b558e(0x12d)]['y'];},Spriteset_Base['prototype'][_0x54467d(0x1cd)]=function(){const _0x36daee=_0x54467d;if(SceneManager[_0x36daee(0x425)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x36daee(0x73f)]()&&Spriteset_Battle[_0x36daee(0x8c6)]){if(_0x36daee(0x896)==='Qthnk')return _0x16f4dc&&this[_0x36daee(0x45e)]?this[_0x36daee(0x45e)][_0x36daee(0x7ab)](_0x9d1f2e):_0x2ad046[_0x36daee(0x98c)][_0x36daee(0x4aa)][_0x36daee(0x52e)](this,_0x400ef7);else return;}}if(this['scale']['x']!==0x0){if(_0x36daee(0x931)!=='QZRZV')return _0x5726c9['layoutSettings'][_0x36daee(0x3dd)][_0x36daee(0x52e)](this);else this[_0x36daee(0x266)][_0x36daee(0x12d)]['x']=0x1/this[_0x36daee(0x12d)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x36daee(0x12d)]['x']);}this['scale']['y']!==0x0&&(this['_pictureContainer'][_0x36daee(0x12d)]['y']=0x1/this[_0x36daee(0x12d)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x36daee(0x12d)]['y']));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8e9)]=Spriteset_Base[_0x54467d(0x895)]['updatePosition'],Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x34e)]=function(){const _0x30c4a6=_0x54467d;VisuMZ[_0x30c4a6(0x98c)][_0x30c4a6(0x8e9)][_0x30c4a6(0x52e)](this),this[_0x30c4a6(0xf4)]();},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0xf4)]=function(){const _0x4bf199=_0x54467d;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x4bf199(0xe2)]($gameScreen[_0x4bf199(0x70e)]());const _0x57f291=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x4bf199(0xdb):this[_0x4bf199(0x4d2)]();break;case _0x4bf199(0x338):this[_0x4bf199(0x704)]();break;case _0x4bf199(0x71a):this[_0x4bf199(0x5ca)]();break;default:this[_0x4bf199(0x24b)]();break;}},Spriteset_Base['prototype'][_0x54467d(0x4d2)]=function(){const _0x128bfc=_0x54467d,_0x2a5279=VisuMZ['CoreEngine']['Settings'][_0x128bfc(0x54e)];if(_0x2a5279&&_0x2a5279[_0x128bfc(0x502)])return _0x2a5279[_0x128bfc(0x502)][_0x128bfc(0x52e)](this);this['x']+=Math[_0x128bfc(0xe2)]($gameScreen[_0x128bfc(0x70e)]());},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x24b)]=function(){const _0x42ab3a=_0x54467d,_0xd4f74e=VisuMZ[_0x42ab3a(0x98c)][_0x42ab3a(0x357)]['ScreenShake'];if(_0xd4f74e&&_0xd4f74e[_0x42ab3a(0x914)])return _0xd4f74e['randomJS'][_0x42ab3a(0x52e)](this);const _0xbf32ca=$gameScreen['_shakePower']*0.75,_0x17e042=$gameScreen[_0x42ab3a(0x50f)]*0.6,_0xd82b2e=$gameScreen['_shakeDuration'];this['x']+=Math[_0x42ab3a(0xe2)](Math[_0x42ab3a(0x9b8)](_0xbf32ca)-Math[_0x42ab3a(0x9b8)](_0x17e042))*(Math['min'](_0xd82b2e,0x1e)*0.5),this['y']+=Math['round'](Math[_0x42ab3a(0x9b8)](_0xbf32ca)-Math[_0x42ab3a(0x9b8)](_0x17e042))*(Math['min'](_0xd82b2e,0x1e)*0.5);},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x704)]=function(){const _0x11d862=_0x54467d,_0x14c9ce=VisuMZ[_0x11d862(0x98c)][_0x11d862(0x357)][_0x11d862(0x54e)];if(_0x14c9ce&&_0x14c9ce[_0x11d862(0x7f4)])return _0x14c9ce[_0x11d862(0x7f4)][_0x11d862(0x52e)](this);const _0x4c36d0=$gameScreen['_shakePower']*0.75,_0xcd07b5=$gameScreen[_0x11d862(0x50f)]*0.6,_0xab427b=$gameScreen['_shakeDuration'];this['x']+=Math[_0x11d862(0xe2)](Math[_0x11d862(0x9b8)](_0x4c36d0)-Math[_0x11d862(0x9b8)](_0xcd07b5))*(Math['min'](_0xab427b,0x1e)*0.5);},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x5ca)]=function(){const _0xa9b751=_0x54467d,_0x57e903=VisuMZ['CoreEngine'][_0xa9b751(0x357)][_0xa9b751(0x54e)];if(_0x57e903&&_0x57e903[_0xa9b751(0x76b)])return _0x57e903[_0xa9b751(0x76b)][_0xa9b751(0x52e)](this);const _0xb3f075=$gameScreen[_0xa9b751(0x289)]*0.75,_0x23de46=$gameScreen[_0xa9b751(0x50f)]*0.6,_0x5a0c82=$gameScreen[_0xa9b751(0x648)];this['y']+=Math[_0xa9b751(0xe2)](Math[_0xa9b751(0x9b8)](_0xb3f075)-Math[_0xa9b751(0x9b8)](_0x23de46))*(Math[_0xa9b751(0x625)](_0x5a0c82,0x1e)*0.5);},Spriteset_Base['prototype'][_0x54467d(0x60b)]=function(){const _0x447634=_0x54467d;for(const _0x2fd04c of this['_fauxAnimationSprites']){if(!_0x2fd04c[_0x447634(0x37c)]()){if(_0x447634(0x877)===_0x447634(0x4b0))return _0x5696f7[_0x447634(0x739)]()?_0xfe74c9[_0x447634(0x739)]()['canUse'](_0x24aad8):_0x5c1a31['prototype']['isEnabled']['call'](this,_0x50dbdd);else this['removeFauxAnimation'](_0x2fd04c);}}this[_0x447634(0x936)]();},Spriteset_Base['prototype'][_0x54467d(0x936)]=function(){const _0xd94a15=_0x54467d;for(;;){const _0x5d8bb8=$gameTemp[_0xd94a15(0x3f9)]();if(_0x5d8bb8)_0xd94a15(0x48f)!==_0xd94a15(0x48f)?this[_0xd94a15(0x89e)]=_0xd94a15(0x883):this[_0xd94a15(0x727)](_0x5d8bb8);else break;}},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x727)]=function(_0xe008a2){const _0x30702a=_0x54467d,_0x3a210e=$dataAnimations[_0xe008a2[_0x30702a(0x2db)]],_0x554fcd=_0xe008a2['targets'],_0x3bf02c=_0xe008a2[_0x30702a(0x810)],_0x4beb62=_0xe008a2[_0x30702a(0x141)];let _0xb421bc=this[_0x30702a(0x5cd)]();const _0x9ac775=this[_0x30702a(0x5e7)]();if(this[_0x30702a(0x363)](_0x3a210e))for(const _0x357384 of _0x554fcd){this[_0x30702a(0x245)]([_0x357384],_0x3a210e,_0x3bf02c,_0xb421bc,_0x4beb62),_0xb421bc+=_0x9ac775;}else{if(_0x30702a(0x929)===_0x30702a(0x120)){const _0x183252=_0x345c22['gameTitle'],_0x3643b=_0x2c642e[_0x30702a(0x184)]||'',_0x18d61c=_0x1aa01f[_0x30702a(0x43b)]||'',_0x18c41b=_0x558e6d[_0x30702a(0x98c)][_0x30702a(0x357)][_0x30702a(0x2fe)][_0x30702a(0x30a)][_0x30702a(0x950)],_0x403766=_0x18c41b[_0x30702a(0x875)](_0x183252,_0x3643b,_0x18d61c);_0x3a2581['title']=_0x403766;}else this[_0x30702a(0x245)](_0x554fcd,_0x3a210e,_0x3bf02c,_0xb421bc,_0x4beb62);}},Spriteset_Base[_0x54467d(0x895)]['createAnimationSprite']=function(_0x283fd1,_0xb5f12f,_0x16e3de,_0x3bf4cf){const _0x4381bf=_0x54467d,_0x106995=this[_0x4381bf(0x985)](_0xb5f12f),_0x5b1042=new(_0x106995?Sprite_AnimationMV:Sprite_Animation)(),_0x3e89b4=this[_0x4381bf(0x859)](_0x283fd1),_0x5b0760=this[_0x4381bf(0x5cd)](),_0x589522=_0x3bf4cf>_0x5b0760?this[_0x4381bf(0x93b)]():null;this['animationShouldMirror'](_0x283fd1[0x0])&&(_0x16e3de=!_0x16e3de),_0x5b1042['targetObjects']=_0x283fd1,_0x5b1042[_0x4381bf(0x449)](_0x3e89b4,_0xb5f12f,_0x16e3de,_0x3bf4cf,_0x589522),this['addAnimationSpriteToContainer'](_0x5b1042),this[_0x4381bf(0x5aa)][_0x4381bf(0x37e)](_0x5b1042);},Spriteset_Base['prototype'][_0x54467d(0x245)]=function(_0x25611a,_0x428254,_0x10dc77,_0x20e922,_0x1e7fd2){const _0x117e21=_0x54467d,_0x534758=this[_0x117e21(0x985)](_0x428254),_0x4e3d99=new(_0x534758?Sprite_AnimationMV:Sprite_Animation)(),_0x3de86b=this[_0x117e21(0x859)](_0x25611a);if(this['animationShouldMirror'](_0x25611a[0x0])){if(_0x117e21(0x45b)!==_0x117e21(0x7f9))_0x10dc77=!_0x10dc77;else{const _0x180347=_0x117e21(0x72f);this[_0x117e21(0x38e)]=this['_colorCache']||{};if(this[_0x117e21(0x38e)][_0x180347])return this[_0x117e21(0x38e)][_0x180347];const _0x550870=_0x10ef3a['CoreEngine'][_0x117e21(0x357)]['Color'][_0x117e21(0x90f)];return this[_0x117e21(0x7b7)](_0x180347,_0x550870);}}_0x4e3d99[_0x117e21(0x3ab)]=_0x25611a,_0x4e3d99[_0x117e21(0x449)](_0x3de86b,_0x428254,_0x10dc77,_0x20e922),_0x4e3d99[_0x117e21(0x4a1)](_0x1e7fd2),this[_0x117e21(0x4d0)](_0x4e3d99);if(this[_0x117e21(0x5aa)])this['_animationSprites'][_0x117e21(0x8d2)](_0x4e3d99);this[_0x117e21(0x406)]['push'](_0x4e3d99);},Spriteset_Base['prototype'][_0x54467d(0x4d0)]=function(_0x4cc91b){const _0x3ff739=_0x54467d;this['_effectsContainer'][_0x3ff739(0x2c0)](_0x4cc91b);},Spriteset_Base['prototype'][_0x54467d(0x474)]=function(_0x548678){const _0x3d98b4=_0x54467d;this[_0x3d98b4(0x5aa)][_0x3d98b4(0x8d2)](_0x548678),this['removeAnimationFromContainer'](_0x548678);for(const _0x4ab1ec of _0x548678[_0x3d98b4(0x3ab)]){_0x4ab1ec['endAnimation']&&(_0x3d98b4(0x14e)===_0x3d98b4(0x14e)?_0x4ab1ec[_0x3d98b4(0x759)]():(_0x7af983[_0x3d98b4(0x373)]=0x0,_0x225871[_0x3d98b4(0x711)]=0x0,_0x5b22a7[_0x3d98b4(0x951)]=0x0,_0x2ae0f7[_0x3d98b4(0x757)]=0x0));}_0x548678[_0x3d98b4(0x52b)]();},Spriteset_Base['prototype'][_0x54467d(0xd0)]=function(_0x3adcfc){const _0x33ffc0=_0x54467d;this['_fauxAnimationSprites'][_0x33ffc0(0x8d2)](_0x3adcfc),this[_0x33ffc0(0x95e)](_0x3adcfc);for(const _0x3e7789 of _0x3adcfc[_0x33ffc0(0x3ab)]){_0x3e7789[_0x33ffc0(0x759)]&&_0x3e7789[_0x33ffc0(0x759)]();}_0x3adcfc[_0x33ffc0(0x52b)]();},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x95e)]=function(_0x3bedcf){const _0x3b3e74=_0x54467d;this[_0x3b3e74(0x5fb)]['removeChild'](_0x3bedcf);},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x1eb)]=function(){const _0x33b2d9=_0x54467d;for(const _0x5a4088 of this[_0x33b2d9(0x406)]){_0x33b2d9(0x341)!==_0x33b2d9(0x93a)?this[_0x33b2d9(0xd0)](_0x5a4088):(_0x370b07[_0x33b2d9(0x368)][0x57]='up',_0xbc93a3[_0x33b2d9(0x368)][0x41]=_0x33b2d9(0x7db),_0x1d33ae[_0x33b2d9(0x368)][0x53]=_0x33b2d9(0x53f),_0x5ca1a4[_0x33b2d9(0x368)][0x44]=_0x33b2d9(0x49d),_0xa5061f['keyMapper'][0x45]='pagedown');}},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x694)]=function(){const _0x39ef04=_0x54467d;return this[_0x39ef04(0x406)]['length']>0x0;},Spriteset_Base['prototype'][_0x54467d(0x717)]=function(){const _0x615439=_0x54467d;for(const _0x25046b of this[_0x615439(0x205)]){if(!_0x25046b[_0x615439(0x37c)]()){if('XcsAz'!==_0x615439(0x416))this[_0x615439(0x5d2)](_0x25046b);else{if(!this[_0x615439(0x496)]())return![];else{const _0x782f08=_0x4f031d[_0x615439(0x848)](_0x2b4656,_0x2884bc)['filter'](_0x37d6d5=>_0x37d6d5[_0x615439(0x496)]());return _0x782f08['length']>0x0;}}}}this[_0x615439(0x329)]();},Spriteset_Base['prototype']['processPointAnimationRequests']=function(){const _0x23e64e=_0x54467d;for(;;){if(_0x23e64e(0x831)!=='OVasy'){const _0x4c4f47=$gameTemp['retrievePointAnimation']();if(_0x4c4f47){if(_0x23e64e(0x4b4)===_0x23e64e(0x447)){_0x1cf458[_0x23e64e(0x2e6)](_0x19f784,_0x3aada7);const _0x40b85f=_0xad1f36[_0x23e64e(0xe2)](_0x189aed['volume'])['clamp'](0x0,0x64),_0x5ae594=_0x4b0bf5[_0x23e64e(0x208)];_0x5ae594&&(_0x5ae594[_0x23e64e(0x4c5)]=_0x40b85f,_0x5ae594[_0x23e64e(0x585)]=_0x5c327c['_bgsBuffer']['seek'](),_0x35ec73['updateBgmParameters'](_0x5ae594),_0x41978a[_0x23e64e(0x1d2)](_0x5ae594,_0x5ae594[_0x23e64e(0x585)]),_0x580d76['_bgmBuffer']['_startPlaying'](_0x5ae594[_0x23e64e(0x585)]));}else this[_0x23e64e(0x488)](_0x4c4f47);}else break;}else _0x5912fc['se'][_0x23e64e(0x4c5)]=0x0;}},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x488)]=function(_0x39f9af){const _0x30c7f5=_0x54467d,_0x5b1253=$dataAnimations[_0x39f9af[_0x30c7f5(0x2db)]],_0x3f06a3=this[_0x30c7f5(0x27a)](_0x39f9af),_0x40b3bb=_0x39f9af[_0x30c7f5(0x810)],_0x2cf04f=_0x39f9af[_0x30c7f5(0x141)];let _0x2bed78=this[_0x30c7f5(0x5cd)]();const _0x5bf84a=this['animationNextDelay']();if(this[_0x30c7f5(0x363)](_0x5b1253))for(const _0x4537ad of _0x3f06a3){if(_0x30c7f5(0x6b8)!=='toXHo'){const _0x569787=this['getCombinedScrollingText']();return _0x569787['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x30c7f5(0x814)](_0x569787):_0x23c8a5[_0x30c7f5(0x98c)][_0x30c7f5(0x556)][_0x30c7f5(0x52e)](this,_0x2499fc);}else this[_0x30c7f5(0x31a)]([_0x4537ad],_0x5b1253,_0x40b3bb,_0x2bed78,_0x2cf04f),_0x2bed78+=_0x5bf84a;}else{if('PyIma'===_0x30c7f5(0x33f))return _0x10dd5d[_0x30c7f5(0x307)]('cancel');else this[_0x30c7f5(0x31a)](_0x3f06a3,_0x5b1253,_0x40b3bb,_0x2bed78,_0x2cf04f);}},Spriteset_Base['prototype'][_0x54467d(0x27a)]=function(_0x1c7fa1){const _0x3ffcc5=_0x54467d,_0xdbd69f=new Sprite_Clickable(),_0x1f59f1=this[_0x3ffcc5(0x4cb)]();_0xdbd69f['x']=_0x1c7fa1['x']-_0x1f59f1['x'],_0xdbd69f['y']=_0x1c7fa1['y']-_0x1f59f1['y'],_0xdbd69f['z']=0x64;const _0x388528=this[_0x3ffcc5(0x4cb)]();return _0x388528[_0x3ffcc5(0x2c0)](_0xdbd69f),[_0xdbd69f];},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x4cb)]=function(){return this;},Spriteset_Map[_0x54467d(0x895)][_0x54467d(0x4cb)]=function(){const _0x54dab6=_0x54467d;return this[_0x54dab6(0x5d7)]||this;},Spriteset_Battle[_0x54467d(0x895)]['getPointAnimationLayer']=function(){const _0x3dc399=_0x54467d;return this[_0x3dc399(0x4a6)]||this;},Spriteset_Base[_0x54467d(0x895)]['createPointAnimationSprite']=function(_0x1c5216,_0x3778a0,_0x615aa3,_0x370891,_0x21c230){const _0x46cd36=_0x54467d,_0x276983=this[_0x46cd36(0x985)](_0x3778a0),_0x54f0ca=new(_0x276983?Sprite_AnimationMV:Sprite_Animation)();_0x54f0ca[_0x46cd36(0x3ab)]=_0x1c5216,_0x54f0ca[_0x46cd36(0x449)](_0x1c5216,_0x3778a0,_0x615aa3,_0x370891),_0x54f0ca[_0x46cd36(0x4a1)](_0x21c230),this[_0x46cd36(0x4d0)](_0x54f0ca),this[_0x46cd36(0x205)][_0x46cd36(0x37e)](_0x54f0ca);},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x5d2)]=function(_0x1caa6f){const _0x57b14b=_0x54467d;this[_0x57b14b(0x205)][_0x57b14b(0x8d2)](_0x1caa6f),this[_0x57b14b(0x5fb)][_0x57b14b(0x243)](_0x1caa6f);for(const _0x170aa2 of _0x1caa6f[_0x57b14b(0x3ab)]){if(_0x170aa2[_0x57b14b(0x759)]){if(_0x57b14b(0x2a7)===_0x57b14b(0x600))return this[_0x57b14b(0x599)];else _0x170aa2[_0x57b14b(0x759)]();}const _0x2bc546=this[_0x57b14b(0x4cb)]();if(_0x2bc546)_0x2bc546[_0x57b14b(0x243)](_0x170aa2);}_0x1caa6f[_0x57b14b(0x52b)]();},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x69d)]=function(){const _0x4f3f8c=_0x54467d;for(const _0x5ad35e of this['_pointAnimationSprites']){this[_0x4f3f8c(0x5d2)](_0x5ad35e);}},Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x702)]=function(){const _0xd89441=_0x54467d;return this[_0xd89441(0x205)][_0xd89441(0x959)]>0x0;},VisuMZ[_0x54467d(0x98c)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x616)],Spriteset_Base[_0x54467d(0x895)][_0x54467d(0x616)]=function(){const _0x5c0327=_0x54467d;return VisuMZ[_0x5c0327(0x98c)][_0x5c0327(0x6d0)]['call'](this)||this[_0x5c0327(0x702)]();},Spriteset_Map[_0x54467d(0x8c6)]=VisuMZ[_0x54467d(0x98c)]['Settings'][_0x54467d(0x355)]['DetachMapPictureContainer']||![],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x7ee)]=Scene_Map['prototype'][_0x54467d(0x140)],Scene_Map[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0x2fcbeb=_0x54467d;VisuMZ[_0x2fcbeb(0x98c)][_0x2fcbeb(0x7ee)][_0x2fcbeb(0x52e)](this);if(!Spriteset_Map[_0x2fcbeb(0x8c6)])return;const _0x2dc849=this[_0x2fcbeb(0x775)];if(!_0x2dc849)return;this['_pictureContainer']=_0x2dc849[_0x2fcbeb(0x266)];if(!this[_0x2fcbeb(0x266)])return;this['addChild'](this[_0x2fcbeb(0x266)]);},Spriteset_Battle[_0x54467d(0x8c6)]=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x355)]['DetachBattlePictureContainer']||![],VisuMZ[_0x54467d(0x98c)][_0x54467d(0x512)]=Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)],Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0x2a5835=_0x54467d;VisuMZ[_0x2a5835(0x98c)][_0x2a5835(0x512)]['call'](this);if(!Spriteset_Battle[_0x2a5835(0x8c6)])return;const _0x615d4c=this[_0x2a5835(0x775)];if(!_0x615d4c)return;this['_pictureContainer']=_0x615d4c['_pictureContainer'];if(!this['_pictureContainer'])return;this[_0x2a5835(0x2c0)](this['_pictureContainer']);},Spriteset_Battle[_0x54467d(0x895)][_0x54467d(0x8a2)]=function(){const _0x29294a=_0x54467d;this[_0x29294a(0x4d3)]=new PIXI['filters'][(_0x29294a(0x1ac))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite'][_0x29294a(0x55d)]=SceneManager[_0x29294a(0x501)](),this[_0x29294a(0x8ea)][_0x29294a(0x10f)]=[this['_backgroundFilter']],this[_0x29294a(0x290)][_0x29294a(0x2c0)](this[_0x29294a(0x8ea)]);},VisuMZ['CoreEngine'][_0x54467d(0x720)]=Spriteset_Battle[_0x54467d(0x895)][_0x54467d(0x216)],Spriteset_Battle[_0x54467d(0x895)][_0x54467d(0x216)]=function(){const _0x58260f=_0x54467d;this['coreEngineRepositionEnemies']()&&this[_0x58260f(0x43f)](),VisuMZ[_0x58260f(0x98c)][_0x58260f(0x720)][_0x58260f(0x52e)](this);},Spriteset_Battle[_0x54467d(0x895)][_0x54467d(0x36c)]=function(){const _0x1dea70=_0x54467d,_0x18a5fc=VisuMZ[_0x1dea70(0x98c)][_0x1dea70(0x357)][_0x1dea70(0x3cd)];if(!_0x18a5fc)return![];if(Utils[_0x1dea70(0x26c)]>=_0x1dea70(0xe5)&&!_0x18a5fc[_0x1dea70(0x61a)])return![];return _0x18a5fc[_0x1dea70(0x7c7)];},Spriteset_Battle['prototype'][_0x54467d(0x43f)]=function(){const _0x22410b=_0x54467d;for(member of $gameTroop[_0x22410b(0x124)]()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine'][_0x54467d(0x4e4)]=Window_Base[_0x54467d(0x895)]['initialize'],Window_Base['prototype'][_0x54467d(0x15b)]=function(_0x38062f){const _0xcc7295=_0x54467d;_0x38062f['x']=Math[_0xcc7295(0xe2)](_0x38062f['x']),_0x38062f['y']=Math['round'](_0x38062f['y']),_0x38062f[_0xcc7295(0x36d)]=Math['round'](_0x38062f[_0xcc7295(0x36d)]),_0x38062f[_0xcc7295(0x2d9)]=Math[_0xcc7295(0xe2)](_0x38062f[_0xcc7295(0x2d9)]),this[_0xcc7295(0x6f0)](),VisuMZ[_0xcc7295(0x98c)][_0xcc7295(0x4e4)][_0xcc7295(0x52e)](this,_0x38062f),this[_0xcc7295(0x8af)]();},Window_Base[_0x54467d(0x895)]['initDigitGrouping']=function(){const _0x5ac4c7=_0x54467d;this[_0x5ac4c7(0x6ae)]=VisuMZ[_0x5ac4c7(0x98c)]['Settings'][_0x5ac4c7(0x355)][_0x5ac4c7(0x4ea)],this['_digitGroupingEx']=VisuMZ['CoreEngine']['Settings']['QoL'][_0x5ac4c7(0x7cc)];},Window_Base[_0x54467d(0x895)][_0x54467d(0x984)]=function(){const _0x45a4cf=_0x54467d;return VisuMZ[_0x45a4cf(0x98c)]['Settings']['Window']['LineHeight'];},Window_Base['prototype']['itemPadding']=function(){const _0x2b28d9=_0x54467d;return VisuMZ['CoreEngine']['Settings'][_0x2b28d9(0x8ca)]['ItemPadding'];},Window_Base[_0x54467d(0x895)][_0x54467d(0x713)]=function(){const _0xe4a7e8=_0x54467d;if($gameSystem[_0xe4a7e8(0x52c)])this[_0xe4a7e8(0x2ca)]=$gameSystem[_0xe4a7e8(0x52c)]();else{if(_0xe4a7e8(0x398)===_0xe4a7e8(0x7aa)){const _0x1ff06e=this[_0xe4a7e8(0x392)](_0x3ab13d),_0x49fa5f=this['subjectHitRate'](_0x4de590),_0xc34e61=this[_0xe4a7e8(0x752)](_0x259b83);return _0x1ff06e*(_0x49fa5f-_0xc34e61);}else this[_0xe4a7e8(0x2ca)]=VisuMZ[_0xe4a7e8(0x98c)]['Settings'][_0xe4a7e8(0x8ca)]['BackOpacity'];}},Window_Base['prototype']['translucentOpacity']=function(){const _0x14bfab=_0x54467d;return VisuMZ[_0x14bfab(0x98c)][_0x14bfab(0x357)]['Window'][_0x14bfab(0x418)];},Window_Base[_0x54467d(0x895)][_0x54467d(0x592)]=function(){const _0x22f9a6=_0x54467d;return VisuMZ[_0x22f9a6(0x98c)][_0x22f9a6(0x357)]['Window'][_0x22f9a6(0x389)];},VisuMZ[_0x54467d(0x98c)]['Window_Base_update']=Window_Base[_0x54467d(0x895)][_0x54467d(0x6f1)],Window_Base[_0x54467d(0x895)][_0x54467d(0x6f1)]=function(){const _0x291dd8=_0x54467d;VisuMZ[_0x291dd8(0x98c)][_0x291dd8(0x7d1)][_0x291dd8(0x52e)](this),this[_0x291dd8(0x646)]();},Window_Base[_0x54467d(0x895)][_0x54467d(0x79e)]=function(){const _0x5c0a68=_0x54467d;if(this[_0x5c0a68(0x167)]){if(_0x5c0a68(0x4a9)!=='MPMSb'){_0x1eccf0[_0x5c0a68(0x98c)]['Sprite_AnimationMV_updatePosition']['call'](this);if(this['_animation'][_0x5c0a68(0x974)]===0x3){if(this['x']===0x0)this['x']=_0x295204[_0x5c0a68(0xe2)](_0x46e7d0[_0x5c0a68(0x36d)]/0x2);if(this['y']===0x0)this['y']=_0x4f7b6d[_0x5c0a68(0xe2)](_0x405226[_0x5c0a68(0x2d9)]/0x2);}}else this['openness']+=this[_0x5c0a68(0x592)](),this[_0x5c0a68(0x387)]()&&(_0x5c0a68(0x15c)===_0x5c0a68(0x15c)?this[_0x5c0a68(0x167)]=![]:_0x352027+=_0x1fbe63(_0x2acb16));}},Window_Base[_0x54467d(0x895)][_0x54467d(0x763)]=function(){const _0x1766ab=_0x54467d;if(this[_0x1766ab(0x51b)]){if(_0x1766ab(0x3d5)!==_0x1766ab(0x3d5))return _0x48ed86[_0x1766ab(0x88a)]['BuyRect']['call'](this);else{this[_0x1766ab(0x3d9)]-=this[_0x1766ab(0x592)]();if(this[_0x1766ab(0x7d5)]()){if(_0x1766ab(0x5b8)!==_0x1766ab(0x5f3))this[_0x1766ab(0x51b)]=![];else return _0x4c0ed3[_0x1766ab(0x6d7)];}}}},VisuMZ['CoreEngine'][_0x54467d(0x48e)]=Window_Base[_0x54467d(0x895)][_0x54467d(0xeb)],Window_Base['prototype'][_0x54467d(0xeb)]=function(_0x544c67,_0x1a9eff,_0x18f1de,_0x558907,_0x41ae4d){const _0x19a5dc=_0x54467d;if(this['useDigitGrouping']())_0x544c67=VisuMZ[_0x19a5dc(0x1a2)](_0x544c67);VisuMZ[_0x19a5dc(0x98c)][_0x19a5dc(0x48e)][_0x19a5dc(0x52e)](this,_0x544c67,_0x1a9eff,_0x18f1de,_0x558907,_0x41ae4d);},Window_Base[_0x54467d(0x895)][_0x54467d(0x1c7)]=function(){const _0x79fdb0=_0x54467d;return this[_0x79fdb0(0x6ae)];},VisuMZ['CoreEngine'][_0x54467d(0x1a0)]=Window_Base['prototype'][_0x54467d(0x472)],Window_Base[_0x54467d(0x895)]['createTextState']=function(_0x30004b,_0x483820,_0x2e6fc0,_0x227ae6){const _0xd3d9de=_0x54467d;var _0x5189b1=VisuMZ[_0xd3d9de(0x98c)][_0xd3d9de(0x1a0)][_0xd3d9de(0x52e)](this,_0x30004b,_0x483820,_0x2e6fc0,_0x227ae6);if(this[_0xd3d9de(0x7ae)]())_0x5189b1['text']=VisuMZ[_0xd3d9de(0x1a2)](_0x5189b1[_0xd3d9de(0x147)]);return _0x5189b1;},Window_Base['prototype'][_0x54467d(0x7ae)]=function(){const _0x198bae=_0x54467d;return this[_0x198bae(0x918)];},Window_Base['prototype'][_0x54467d(0x57b)]=function(_0x31c579){const _0x37df34=_0x54467d;this[_0x37df34(0x6ae)]=_0x31c579;},Window_Base[_0x54467d(0x895)]['enableDigitGroupingEx']=function(_0x1494ee){const _0x2e95d4=_0x54467d;this[_0x2e95d4(0x918)]=_0x1494ee;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8ff)]=Window_Base[_0x54467d(0x895)][_0x54467d(0x2a1)],Window_Base[_0x54467d(0x895)][_0x54467d(0x2a1)]=function(_0x1f2717,_0x880434,_0x3e9b1e){const _0x1988f7=_0x54467d;_0x880434=Math[_0x1988f7(0xe2)](_0x880434),_0x3e9b1e=Math['round'](_0x3e9b1e),VisuMZ['CoreEngine'][_0x1988f7(0x8ff)]['call'](this,_0x1f2717,_0x880434,_0x3e9b1e);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x54467d(0x895)][_0x54467d(0x115)],Window_Base['prototype']['drawFace']=function(_0x4bd69b,_0x3eb763,_0x2a916f,_0x522a81,_0x497968,_0x249441){const _0x161de3=_0x54467d;_0x497968=_0x497968||ImageManager[_0x161de3(0x954)],_0x249441=_0x249441||ImageManager[_0x161de3(0x703)],_0x2a916f=Math['round'](_0x2a916f),_0x522a81=Math[_0x161de3(0xe2)](_0x522a81),_0x497968=Math[_0x161de3(0xe2)](_0x497968),_0x249441=Math[_0x161de3(0xe2)](_0x249441),VisuMZ[_0x161de3(0x98c)][_0x161de3(0x442)][_0x161de3(0x52e)](this,_0x4bd69b,_0x3eb763,_0x2a916f,_0x522a81,_0x497968,_0x249441);},VisuMZ[_0x54467d(0x98c)]['Window_Base_drawCharacter']=Window_Base['prototype'][_0x54467d(0x2ad)],Window_Base[_0x54467d(0x895)][_0x54467d(0x2ad)]=function(_0x3bdcfc,_0x1e053e,_0x3e486d,_0x278c1f){const _0x2615ba=_0x54467d;_0x3e486d=Math[_0x2615ba(0xe2)](_0x3e486d),_0x278c1f=Math[_0x2615ba(0xe2)](_0x278c1f),VisuMZ[_0x2615ba(0x98c)][_0x2615ba(0x34c)][_0x2615ba(0x52e)](this,_0x3bdcfc,_0x1e053e,_0x3e486d,_0x278c1f);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x409)]=Window_Selectable['prototype'][_0x54467d(0x528)],Window_Selectable[_0x54467d(0x895)][_0x54467d(0x528)]=function(_0x1c84b7){const _0x3570b7=_0x54467d;let _0x5e459c=VisuMZ[_0x3570b7(0x98c)][_0x3570b7(0x409)][_0x3570b7(0x52e)](this,_0x1c84b7);return _0x5e459c['x']=Math[_0x3570b7(0xe2)](_0x5e459c['x']),_0x5e459c['y']=Math[_0x3570b7(0xe2)](_0x5e459c['y']),_0x5e459c[_0x3570b7(0x36d)]=Math['round'](_0x5e459c[_0x3570b7(0x36d)]),_0x5e459c['height']=Math['round'](_0x5e459c['height']),_0x5e459c;},VisuMZ[_0x54467d(0x98c)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x2dc)],Window_StatusBase[_0x54467d(0x895)]['drawActorSimpleStatus']=function(_0x5c128d,_0x395c3e,_0x58c4b4){const _0x501df0=_0x54467d;_0x395c3e=Math[_0x501df0(0xe2)](_0x395c3e),_0x58c4b4=Math[_0x501df0(0xe2)](_0x58c4b4),VisuMZ[_0x501df0(0x98c)]['Window_StatusBase_drawActorSimpleStatus'][_0x501df0(0x52e)](this,_0x5c128d,_0x395c3e,_0x58c4b4);},Window_Base[_0x54467d(0x895)][_0x54467d(0x8af)]=function(){const _0x482e15=_0x54467d;this[_0x482e15(0x538)]={'duration':0x0,'wholeDuration':0x0,'type':_0x482e15(0x982),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x482e15(0x12d)]['x'],'targetScaleY':this[_0x482e15(0x12d)]['y'],'targetOpacity':this[_0x482e15(0xdc)],'targetBackOpacity':this[_0x482e15(0x2ca)],'targetContentsOpacity':this[_0x482e15(0x806)]};},Window_Base[_0x54467d(0x895)][_0x54467d(0x646)]=function(){const _0xaffa10=_0x54467d;if(!this[_0xaffa10(0x538)])return;if(this[_0xaffa10(0x538)][_0xaffa10(0x19c)]<=0x0)return;this['x']=this[_0xaffa10(0x4c8)](this['x'],this[_0xaffa10(0x538)][_0xaffa10(0x57e)]),this['y']=this[_0xaffa10(0x4c8)](this['y'],this[_0xaffa10(0x538)][_0xaffa10(0x8f7)]),this['scale']['x']=this[_0xaffa10(0x4c8)](this[_0xaffa10(0x12d)]['x'],this[_0xaffa10(0x538)][_0xaffa10(0x244)]),this['scale']['y']=this['applyCoreEasing'](this['scale']['y'],this[_0xaffa10(0x538)]['targetScaleY']),this['opacity']=this[_0xaffa10(0x4c8)](this[_0xaffa10(0xdc)],this['_coreEasing'][_0xaffa10(0x136)]),this[_0xaffa10(0x2ca)]=this[_0xaffa10(0x4c8)](this[_0xaffa10(0x2ca)],this[_0xaffa10(0x538)][_0xaffa10(0x85a)]),this['contentsOpacity']=this[_0xaffa10(0x4c8)](this[_0xaffa10(0x806)],this['_coreEasing'][_0xaffa10(0x7b2)]),this[_0xaffa10(0x538)][_0xaffa10(0x19c)]--;},Window_Base[_0x54467d(0x895)]['applyCoreEasing']=function(_0x55c1e6,_0x56591a){const _0x3576e5=_0x54467d;if(!this[_0x3576e5(0x538)])return _0x56591a;const _0x204064=this[_0x3576e5(0x538)][_0x3576e5(0x19c)],_0x29b3e9=this[_0x3576e5(0x538)][_0x3576e5(0x5ba)],_0x1b7dd5=this[_0x3576e5(0x690)]((_0x29b3e9-_0x204064)/_0x29b3e9),_0x34f6df=this[_0x3576e5(0x690)]((_0x29b3e9-_0x204064+0x1)/_0x29b3e9),_0x3f2e6e=(_0x55c1e6-_0x56591a*_0x1b7dd5)/(0x1-_0x1b7dd5);return _0x3f2e6e+(_0x56591a-_0x3f2e6e)*_0x34f6df;},Window_Base['prototype'][_0x54467d(0x690)]=function(_0x35838e){const _0x238dc0=_0x54467d;if(!this[_0x238dc0(0x538)])return _0x35838e;return VisuMZ[_0x238dc0(0x40d)](_0x35838e,this[_0x238dc0(0x538)][_0x238dc0(0x97b)]||_0x238dc0(0x982));},Window_Base['prototype'][_0x54467d(0x613)]=function(_0x219a05,_0x24856f){const _0x5621fe=_0x54467d;if(!this[_0x5621fe(0x538)])return;this['x']=this[_0x5621fe(0x538)][_0x5621fe(0x57e)],this['y']=this[_0x5621fe(0x538)][_0x5621fe(0x8f7)],this[_0x5621fe(0x12d)]['x']=this[_0x5621fe(0x538)]['targetScaleX'],this[_0x5621fe(0x12d)]['y']=this[_0x5621fe(0x538)]['targetScaleY'],this[_0x5621fe(0xdc)]=this[_0x5621fe(0x538)]['targetOpacity'],this[_0x5621fe(0x2ca)]=this[_0x5621fe(0x538)][_0x5621fe(0x85a)],this[_0x5621fe(0x806)]=this[_0x5621fe(0x538)]['targetContentsOpacity'],this[_0x5621fe(0x701)](_0x219a05,_0x24856f,this['x'],this['y'],this['scale']['x'],this[_0x5621fe(0x12d)]['y'],this[_0x5621fe(0xdc)],this[_0x5621fe(0x2ca)],this['contentsOpacity']);},Window_Base[_0x54467d(0x895)][_0x54467d(0x701)]=function(_0x28cf8e,_0x59d812,_0x5c0f83,_0x4ce044,_0x417838,_0x191a9d,_0x86d260,_0xfc290,_0x42dd31){const _0x1a5d90=_0x54467d;this[_0x1a5d90(0x538)]={'duration':_0x28cf8e,'wholeDuration':_0x28cf8e,'type':_0x59d812,'targetX':_0x5c0f83,'targetY':_0x4ce044,'targetScaleX':_0x417838,'targetScaleY':_0x191a9d,'targetOpacity':_0x86d260,'targetBackOpacity':_0xfc290,'targetContentsOpacity':_0x42dd31};},Window_Base[_0x54467d(0x895)][_0x54467d(0x983)]=function(_0x260947,_0x515cf8,_0x10ddb5,_0x26b8a1,_0x353bee){const _0x2bab00=_0x54467d;this[_0x2bab00(0x83f)](),this[_0x2bab00(0x5a8)][_0x2bab00(0x48c)]=VisuMZ[_0x2bab00(0x98c)][_0x2bab00(0x357)][_0x2bab00(0x617)][_0x2bab00(0x95d)];const _0x1b9441=VisuMZ[_0x2bab00(0x98c)]['Settings']['Gold'][_0x2bab00(0x721)];if(_0x1b9441>0x0&&_0x515cf8===TextManager[_0x2bab00(0x7d8)]){if('OHTKL'==='OHTKL'){const _0x2f4d64=_0x26b8a1+(this[_0x2bab00(0x984)]()-ImageManager['iconHeight'])/0x2;this[_0x2bab00(0x2a1)](_0x1b9441,_0x10ddb5+(_0x353bee-ImageManager[_0x2bab00(0x308)]),_0x2f4d64),_0x353bee-=ImageManager['iconWidth']+0x4;}else _0x4f7e72[_0x2bab00(0x972)](_0xeff1ce);}else{if('xKXiI'===_0x2bab00(0x24c))this[_0x2bab00(0x426)](ColorManager[_0x2bab00(0x3e4)]()),this['drawText'](_0x515cf8,_0x10ddb5,_0x26b8a1,_0x353bee,_0x2bab00(0x49d)),_0x353bee-=this[_0x2bab00(0x50a)](_0x515cf8)+0x6;else{const _0x34229c=_0x16db30[_0x2bab00(0x75b)]();if(_0x34229c)for(const _0x4e0749 of _0x34229c){if(_0x4e0749&&_0x4e0749[_0x2bab00(0x17a)])return!![];}}}this[_0x2bab00(0x943)]();const _0x5176ee=this[_0x2bab00(0x50a)](this[_0x2bab00(0x6ae)]?VisuMZ[_0x2bab00(0x1a2)](_0x260947):_0x260947);_0x5176ee>_0x353bee?this[_0x2bab00(0xeb)](VisuMZ[_0x2bab00(0x98c)]['Settings']['Gold']['GoldOverlap'],_0x10ddb5,_0x26b8a1,_0x353bee,_0x2bab00(0x49d)):this[_0x2bab00(0xeb)](_0x260947,_0x10ddb5,_0x26b8a1,_0x353bee,_0x2bab00(0x49d)),this['resetFontSettings']();},Window_Base[_0x54467d(0x895)][_0x54467d(0x7df)]=function(_0xf221f8,_0x1e5c6d,_0x2e1969,_0x3b4c3e,_0x2ae087){const _0xbd7f11=_0x54467d,_0x42cabf=ImageManager[_0xbd7f11(0x459)](_0xbd7f11(0x6dd)),_0x178158=ImageManager[_0xbd7f11(0x308)],_0x3d3cdf=ImageManager[_0xbd7f11(0x633)],_0x1e218d=_0xf221f8%0x10*_0x178158,_0x1b45a9=Math[_0xbd7f11(0x881)](_0xf221f8/0x10)*_0x3d3cdf,_0x417ff1=_0x3b4c3e,_0x57468a=_0x3b4c3e;this['contents'][_0xbd7f11(0x322)][_0xbd7f11(0x3b2)]=_0x2ae087,this[_0xbd7f11(0x5a8)][_0xbd7f11(0x738)](_0x42cabf,_0x1e218d,_0x1b45a9,_0x178158,_0x3d3cdf,_0x1e5c6d,_0x2e1969,_0x417ff1,_0x57468a),this['contents'][_0xbd7f11(0x322)][_0xbd7f11(0x3b2)]=!![];},Window_Base[_0x54467d(0x895)][_0x54467d(0xcf)]=function(_0x23a6c5,_0x45d1d1,_0x28896d,_0x2e16eb,_0x4307b9,_0x44744f){const _0x3075f5=_0x54467d,_0x50e121=Math[_0x3075f5(0x881)]((_0x28896d-0x2)*_0x2e16eb),_0x43a692=Sprite_Gauge[_0x3075f5(0x895)][_0x3075f5(0x8a0)]['call'](this),_0x5874f3=_0x45d1d1+this[_0x3075f5(0x984)]()-_0x43a692-0x2;this[_0x3075f5(0x5a8)][_0x3075f5(0x86a)](_0x23a6c5,_0x5874f3,_0x28896d,_0x43a692,ColorManager['gaugeBackColor']()),this[_0x3075f5(0x5a8)]['gradientFillRect'](_0x23a6c5+0x1,_0x5874f3+0x1,_0x50e121,_0x43a692-0x2,_0x4307b9,_0x44744f);},Window_Scrollable[_0x54467d(0x374)]={'enabled':VisuMZ[_0x54467d(0x98c)]['Settings']['Window'][_0x54467d(0x40f)]??!![],'thickness':VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['Window'][_0x54467d(0x8a6)]??0x2,'offset':VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x8ca)][_0x54467d(0x6fc)]??0x2,'bodyColor':VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x8ca)][_0x54467d(0x36f)]??0x0,'offColor':VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['Window'][_0x54467d(0x6ec)]??0x7,'offOpacity':VisuMZ['CoreEngine']['Settings'][_0x54467d(0x8ca)][_0x54467d(0x755)]??0x80},Window_Base['prototype'][_0x54467d(0x1e3)]=function(){const _0x5e9f02=_0x54467d;return Window_Scrollable[_0x5e9f02(0x374)][_0x5e9f02(0x21f)]&&Window_Scrollable[_0x5e9f02(0x374)][_0x5e9f02(0x296)]>0x0;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x359)]=Window_Base[_0x54467d(0x895)]['createContents'],Window_Base[_0x54467d(0x895)]['createContents']=function(){const _0x38835b=_0x54467d;VisuMZ[_0x38835b(0x98c)][_0x38835b(0x359)]['call'](this),this[_0x38835b(0x6db)](),this['setupScrollBarBitmap'](!![]),this[_0x38835b(0x483)](![]);},Window_Base['prototype'][_0x54467d(0x6db)]=function(){const _0x288a2c=_0x54467d;if(!this[_0x288a2c(0x1e3)]())return;if(this[_0x288a2c(0x1bc)]||this[_0x288a2c(0x6a0)])return;this[_0x288a2c(0x662)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x288a2c(0x1bc)]=new Sprite(),this[_0x288a2c(0x6a0)]=new Sprite(),this['addChild'](this[_0x288a2c(0x1bc)]),this['addChild'](this[_0x288a2c(0x6a0)]);},Window_Base['prototype']['setupScrollBarBitmap']=function(_0x1720c1){const _0x4b2660=_0x54467d,_0x32b3c7=_0x1720c1?this[_0x4b2660(0x1bc)]:this['_scrollBarVert'];if(!_0x32b3c7)return;const _0x5e03db=Window_Scrollable['SCROLLBAR'],_0x56ba83=_0x5e03db[_0x4b2660(0x296)],_0x56a7a4=_0x1720c1?this[_0x4b2660(0x9b7)]-_0x56ba83*0x2:_0x56ba83,_0xc74203=_0x1720c1?_0x56ba83:this['innerHeight']-_0x56ba83*0x2;_0x32b3c7[_0x4b2660(0x55d)]=new Bitmap(_0x56a7a4,_0xc74203),_0x32b3c7[_0x4b2660(0x423)](0x0,0x0,_0x56a7a4,_0xc74203),this[_0x4b2660(0x484)](_0x1720c1);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x6b9)]=Window_Base['prototype'][_0x54467d(0x105)],Window_Base[_0x54467d(0x895)][_0x54467d(0x105)]=function(){const _0x14ae10=_0x54467d;VisuMZ['CoreEngine'][_0x14ae10(0x6b9)][_0x14ae10(0x52e)](this),this['destroyScrollBarBitmaps']();},Window_Base[_0x54467d(0x895)][_0x54467d(0x7b4)]=function(){const _0x5096d5=_0x54467d,_0x57e50a=[this[_0x5096d5(0x1bc)],this[_0x5096d5(0x6a0)]];for(const _0x2fb03a of _0x57e50a){if(_0x2fb03a&&_0x2fb03a[_0x5096d5(0x55d)])_0x2fb03a[_0x5096d5(0x55d)][_0x5096d5(0x52b)]();}},VisuMZ['CoreEngine'][_0x54467d(0x756)]=Window_Scrollable[_0x54467d(0x895)]['update'],Window_Scrollable[_0x54467d(0x895)]['update']=function(){const _0x1ef463=_0x54467d;VisuMZ['CoreEngine']['Window_Scrollable_update'][_0x1ef463(0x52e)](this),this['updateScrollBars']();},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x239)]=function(){const _0x21ece9=_0x54467d;this[_0x21ece9(0x20e)](),this[_0x21ece9(0x5e5)](!![]),this[_0x21ece9(0x5e5)](![]),this[_0x21ece9(0x484)](!![]),this[_0x21ece9(0x484)](![]);},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x20e)]=function(){const _0x45bd39=_0x54467d,_0x53bd5c=[this[_0x45bd39(0x1bc)],this[_0x45bd39(0x6a0)]];for(const _0x20f27d of _0x53bd5c){if(_0x45bd39(0x19b)===_0x45bd39(0x19b))_0x20f27d&&(_0x20f27d[_0x45bd39(0x4dd)]=this['isScrollBarVisible']()&&this[_0x45bd39(0x387)]());else{if(_0x139eaf[_0x45bd39(0x959)]>0x0)_0xcd1e4e+=_0x5e9f36+_0x45bd39(0x15f);else{const _0x4ee679=_0x2177aa[_0x5f0b8a]['name'];_0x249b47+=_0x5cef8c+_0x45bd39(0x1af)[_0x45bd39(0x875)](_0x2f3499,_0x4ee679||'Unnamed')+_0x3f83e4;}_0x2a68bd+=_0x1cddb6[_0x45bd39(0x875)](_0x1b7a81,_0x235c44,_0x5c39eb,_0x355b4f);}}},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x5e5)]=function(_0x24e713){const _0x1d3693=_0x54467d;if(!this[_0x1d3693(0x662)])return;const _0x46f621=this[_0x1d3693(0x784)](_0x24e713),_0x8c4f65=this[_0x1d3693(0x224)](_0x24e713),_0xe4dce1=_0x24e713?'horz':_0x1d3693(0x2b3),_0x5870fb=_0x24e713?_0x1d3693(0x4fc):_0x1d3693(0x54b);(this['_lastScrollBarValues'][_0xe4dce1]!==_0x46f621||this[_0x1d3693(0x662)][_0x5870fb]!==_0x8c4f65)&&(this['_lastScrollBarValues'][_0xe4dce1]=_0x46f621,this['_lastScrollBarValues'][_0x5870fb]=_0x8c4f65,this[_0x1d3693(0x1c4)](_0x24e713,_0x46f621,_0x8c4f65));},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x784)]=function(_0x162577){const _0x1eeb00=_0x54467d;if(this[_0x1eeb00(0x37f)]!==undefined)return _0x162577?this['scrollX']():this[_0x1eeb00(0x653)]['y'];return _0x162577?this[_0x1eeb00(0x62a)]():this[_0x1eeb00(0x560)]();},Window_Scrollable['prototype'][_0x54467d(0x224)]=function(_0x85bc25){const _0x4d4e58=_0x54467d;if(this[_0x4d4e58(0x37f)]!==undefined){if(_0x4d4e58(0x8ac)!==_0x4d4e58(0x67a))return _0x85bc25?this[_0x4d4e58(0x6a2)]():Math['max'](0x0,this[_0x4d4e58(0x37f)]-this[_0x4d4e58(0x7bc)]);else{let _0x3a7940=_0x4d4e58(0x80a)+_0x44974b+_0x4d4e58(0x38a);if(this[_0x4d4e58(0x575)](_0x3a7940))return this[_0x4d4e58(0x605)][_0x3a7940];return this[_0x4d4e58(0x605)][_0x3a7940]=_0xf9f80a[_0x4d4e58(0xe2)](_0x4969e6[_0x4d4e58(0x98c)][_0x4d4e58(0x357)][_0x4d4e58(0x1e2)]['BasicParameterFormula'][_0x4d4e58(0x52e)](this,_0x4cb7ee)),this[_0x4d4e58(0x605)][_0x3a7940];}}return _0x85bc25?this['maxScrollX']():this[_0x4d4e58(0x162)]();},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x554)]=function(){const _0x243838=_0x54467d;if(this[_0x243838(0x37f)]!==undefined){if(_0x243838(0x812)==='cAzrg')this[_0x243838(0x526)](_0x2a8398['isTriggered'](_0x243838(0x53f)));else return Math['max'](0x0,this[_0x243838(0x37f)]);}return this[_0x243838(0x337)]();},Window_Scrollable[_0x54467d(0x895)][_0x54467d(0x1c4)]=function(_0x5a18bb,_0xfb57a6,_0x5896fe){const _0x4ba8f3=_0x54467d,_0x121e31=_0x5a18bb?this['_scrollBarHorz']:this[_0x4ba8f3(0x6a0)];if(!_0x121e31)return;if(!_0x121e31[_0x4ba8f3(0x55d)])return;const _0x2a3f00=_0x121e31['bitmap'];_0x2a3f00[_0x4ba8f3(0x5ce)]();if(_0x5896fe<=0x0)return;const _0x1e7cf1=_0x5a18bb?this[_0x4ba8f3(0x9b7)]/this['overallWidth']():this[_0x4ba8f3(0x7bc)]/this[_0x4ba8f3(0x554)](),_0x2d26b7=_0x5a18bb?Math[_0x4ba8f3(0xe2)](_0xfb57a6*_0x1e7cf1):0x0,_0x3d5d97=_0x5a18bb?0x0:Math['round'](_0xfb57a6*_0x1e7cf1),_0x512572=_0x5a18bb?Math[_0x4ba8f3(0xe2)](_0x2a3f00['width']*_0x1e7cf1):_0x2a3f00[_0x4ba8f3(0x36d)],_0x43492d=_0x5a18bb?_0x2a3f00['height']:Math['round'](_0x2a3f00['height']*_0x1e7cf1),_0x374b18=Window_Scrollable[_0x4ba8f3(0x374)],_0x25e3a7=ColorManager[_0x4ba8f3(0x562)](_0x374b18[_0x4ba8f3(0x7a9)]),_0x3f2287=ColorManager[_0x4ba8f3(0x562)](_0x374b18[_0x4ba8f3(0x2a5)]),_0xc4b13d=_0x374b18[_0x4ba8f3(0x63d)];_0x2a3f00[_0x4ba8f3(0x3ca)]=_0xc4b13d,_0x2a3f00['fillAll'](_0x25e3a7),_0x2a3f00[_0x4ba8f3(0x3ca)]=0xff,_0x2a3f00[_0x4ba8f3(0x86a)](_0x2d26b7,_0x3d5d97,_0x512572,_0x43492d,_0x3f2287);},Window_Base[_0x54467d(0x895)][_0x54467d(0x484)]=function(_0x8a16c6){const _0x57f2f5=_0x54467d,_0xac17d=_0x8a16c6?this['_scrollBarHorz']:this[_0x57f2f5(0x6a0)];if(!_0xac17d)return;const _0x2d513f=Window_Scrollable[_0x57f2f5(0x374)],_0x334a05=_0x2d513f[_0x57f2f5(0x296)],_0x11fd14=_0x2d513f[_0x57f2f5(0x2b2)];if(!_0xac17d[_0x57f2f5(0x913)])return;_0xac17d['x']=this[_0x57f2f5(0x8c4)]+(_0x8a16c6?_0x334a05:this[_0x57f2f5(0x9b7)]+_0x11fd14),_0xac17d['y']=this['padding']+(_0x8a16c6?this[_0x57f2f5(0x7bc)]+_0x11fd14:_0x334a05);},Window_Selectable[_0x54467d(0x895)]['cursorDown']=function(_0x2863ee){const _0x5308c3=_0x54467d;let _0x2980ef=this[_0x5308c3(0x469)]();const _0x48fb43=this[_0x5308c3(0x813)](),_0x263dbf=this[_0x5308c3(0x11f)]();if(this['isUseModernControls']()&&(_0x2980ef<_0x48fb43||_0x2863ee&&_0x263dbf===0x1)){_0x2980ef+=_0x263dbf;if(_0x2980ef>=_0x48fb43)_0x2980ef=_0x48fb43-0x1;this[_0x5308c3(0x61d)](_0x2980ef);}else{if(!this[_0x5308c3(0x2e8)]()){if('KJtzu'==='BDfAF'){const _0x290539=_0x52d680[_0x5308c3(0x2d9)]/this['tileHeight']();_0x290539%0x1!==0x0&&_0x5f1a8b[_0x5308c3(0x948)](_0x290539)===this[_0x5308c3(0x2d9)]()&&!this[_0x5308c3(0x6b7)]()&&(this[_0x5308c3(0x335)][_0x5308c3(0x4dc)]=!![],this[_0x5308c3(0x335)]['displayY']=_0x388603['DisplayLockY']||0x0);}else(_0x2980ef<_0x48fb43-_0x263dbf||_0x2863ee&&_0x263dbf===0x1)&&(_0x5308c3(0x4d7)!==_0x5308c3(0x4d7)?(this[_0x5308c3(0x3fd)](_0x5308c3(0x420)),this[_0x5308c3(0x6a7)]=_0x36e0e2):this['smoothSelect']((_0x2980ef+_0x263dbf)%_0x48fb43));}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x5ea)]=Window_Selectable[_0x54467d(0x895)][_0x54467d(0x526)],Window_Selectable[_0x54467d(0x895)][_0x54467d(0x526)]=function(_0x503161){const _0x134d04=_0x54467d;this[_0x134d04(0x2e8)]()&&_0x503161&&this['maxCols']()===0x1&&this['index']()===this[_0x134d04(0x813)]()-0x1?this[_0x134d04(0x61d)](0x0):VisuMZ['CoreEngine'][_0x134d04(0x5ea)][_0x134d04(0x52e)](this,_0x503161);},Window_Selectable[_0x54467d(0x895)]['cursorUp']=function(_0x3951b3){const _0x16d75e=_0x54467d;let _0x5d52e7=Math[_0x16d75e(0x161)](0x0,this[_0x16d75e(0x469)]());const _0x13b907=this[_0x16d75e(0x813)](),_0x1b8762=this[_0x16d75e(0x11f)]();if(this[_0x16d75e(0x2e8)]()&&_0x5d52e7>0x0||_0x3951b3&&_0x1b8762===0x1){_0x5d52e7-=_0x1b8762;if(_0x5d52e7<=0x0)_0x5d52e7=0x0;this[_0x16d75e(0x61d)](_0x5d52e7);}else{if(!this[_0x16d75e(0x2e8)]()){if(_0x5d52e7>=_0x1b8762||_0x3951b3&&_0x1b8762===0x1){if(_0x16d75e(0x3d7)===_0x16d75e(0x284)){if(_0x56a3ba)_0x33664f[_0x16d75e(0x54f)](_0x3e058d);}else this[_0x16d75e(0x61d)]((_0x5d52e7-_0x1b8762+_0x13b907)%_0x13b907);}}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x3e3)]=Window_Selectable['prototype'][_0x54467d(0x722)],Window_Selectable[_0x54467d(0x895)][_0x54467d(0x722)]=function(_0xa23c32){const _0x3524fa=_0x54467d;if(this['isUseModernControls']()&&_0xa23c32&&this[_0x3524fa(0x11f)]()===0x1&&this[_0x3524fa(0x469)]()===0x0)this[_0x3524fa(0x61d)](this[_0x3524fa(0x813)]()-0x1);else{if(_0x3524fa(0x97f)!=='iDPxa'){let _0x3da044=_0x121b11[_0x3524fa(0x98c)][_0x3524fa(0x1be)]['call'](this);return this[_0x3524fa(0x16d)]()&&(_0x3da044*=_0x29254b[_0x3524fa(0x863)]()),_0x3da044;}else VisuMZ[_0x3524fa(0x98c)][_0x3524fa(0x3e3)][_0x3524fa(0x52e)](this,_0xa23c32);}},Window_Selectable[_0x54467d(0x895)]['isUseModernControls']=function(){const _0x742fca=_0x54467d;return VisuMZ['CoreEngine'][_0x742fca(0x357)]['QoL'][_0x742fca(0x4f2)];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x6b5)]=Window_Selectable[_0x54467d(0x895)]['processCursorMove'],Window_Selectable[_0x54467d(0x895)]['processCursorMove']=function(){const _0x1217c6=_0x54467d;if(this[_0x1217c6(0x2e8)]()){if(_0x1217c6(0x439)==='bfbPC')this['processCursorMoveModernControls'](),this[_0x1217c6(0x8f3)]();else return _0x4f1ffb['status']&&_0x50efd5[_0x1217c6(0x8d3)][_0x1217c6(0x356)]('['+_0x29010f+']');}else _0x1217c6(0x106)===_0x1217c6(0x957)?this[_0x1217c6(0x722)](_0x5e502e['isTriggered']('up')):VisuMZ[_0x1217c6(0x98c)][_0x1217c6(0x6b5)]['call'](this);},Window_Selectable['prototype']['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x598)]=function(){const _0x505aa4=_0x54467d;if(this[_0x505aa4(0x441)]()){if(_0x505aa4(0x661)!==_0x505aa4(0x661))this[_0x505aa4(0x30d)]();else{const _0x1cfe9f=this[_0x505aa4(0x469)]();if(Input[_0x505aa4(0x693)](_0x505aa4(0x53f))){if(Input[_0x505aa4(0x257)](_0x505aa4(0x934))&&this['allowShiftScrolling']()){if(_0x505aa4(0x7c9)==='nqHoC'){const _0x5ef439=_0xe48840[_0x505aa4(0x8df)],_0x17cf47=_0x1afa80[_0x505aa4(0x3c4)](_0x5ef439);return _0x17cf47?this[_0x505aa4(0x10e)]!==_0x17cf47[_0x505aa4(0x24e)]||this['_lastX']!==_0x17cf47['_x']||this[_0x505aa4(0x933)]!==_0x17cf47['_y']:![];}else this['cursorPagedown']();}else{if(_0x505aa4(0x521)==='IcbPq')this['cursorDown'](Input[_0x505aa4(0x119)](_0x505aa4(0x53f)));else return _0x140793[_0x505aa4(0x98c)]['Settings']['Color'][_0x505aa4(0x930)];}}if(Input['isRepeated']('up')){if(Input[_0x505aa4(0x257)](_0x505aa4(0x934))&&this[_0x505aa4(0x309)]())this[_0x505aa4(0x776)]();else{if(_0x505aa4(0x1f0)!=='pFGHq'){var _0x551ab2=_0x18de51(_0x2d332a['$1']);_0x843cb2+=_0x551ab2;}else this['cursorUp'](Input[_0x505aa4(0x119)]('up'));}}Input[_0x505aa4(0x693)](_0x505aa4(0x49d))&&this[_0x505aa4(0x1a5)](Input[_0x505aa4(0x119)](_0x505aa4(0x49d)));Input['isRepeated'](_0x505aa4(0x7db))&&this[_0x505aa4(0x21c)](Input[_0x505aa4(0x119)](_0x505aa4(0x7db)));if(!this[_0x505aa4(0x9ac)](_0x505aa4(0x5c1))&&Input[_0x505aa4(0x693)]('pagedown')){if('OTuDH'===_0x505aa4(0x571))this[_0x505aa4(0x3ae)]();else{_0x2e625c[_0x505aa4(0x2e6)](_0x12637a,_0x4b42b1);const _0x144f57=_0x44179b['min'](_0x2996bf[_0x505aa4(0x67e)],_0x1333f2[_0x505aa4(0x156)]),_0x4b9609=_0x4cd924[_0x505aa4(0x161)](_0x90d941[_0x505aa4(0x67e)],_0xe3c4cc[_0x505aa4(0x156)]);for(let _0x567664=_0x144f57;_0x567664<=_0x4b9609;_0x567664++){_0x573106[_0x505aa4(0x2dd)](_0x567664);}}}!this[_0x505aa4(0x9ac)](_0x505aa4(0x42a))&&Input['isRepeated'](_0x505aa4(0x42a))&&('IALZK'==='RImLU'?this['catchLoadError'](_0x45bd9d):this[_0x505aa4(0x776)]()),this[_0x505aa4(0x469)]()!==_0x1cfe9f&&this[_0x505aa4(0x42b)]();}}},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x8f3)]=function(){const _0x3d3525=_0x54467d;if(this[_0x3d3525(0x441)]()){if('KOnIr'===_0x3d3525(0x44f)){const _0x3b94a0=this[_0x3d3525(0x469)]();Input['isTriggered'](_0x3d3525(0x22f))&&this['smoothSelect'](Math['min'](this[_0x3d3525(0x469)](),0x0)),Input[_0x3d3525(0x119)](_0x3d3525(0x71b))&&('vXEBZ'===_0x3d3525(0x555)?(_0x2b8a5d=_0x35afde,this[_0x3d3525(0x63a)](_0x4402db,_0x33a6ff)):this[_0x3d3525(0x61d)](Math[_0x3d3525(0x161)](this[_0x3d3525(0x469)](),this['maxItems']()-0x1))),this[_0x3d3525(0x469)]()!==_0x3b94a0&&this[_0x3d3525(0x42b)]();}else return this['subject']()['hit']+0.05;}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1e7)]=Window_Selectable[_0x54467d(0x895)][_0x54467d(0x43a)],Window_Selectable['prototype'][_0x54467d(0x43a)]=function(){const _0x105d35=_0x54467d;this[_0x105d35(0x2e8)]()?this[_0x105d35(0x79f)]():VisuMZ[_0x105d35(0x98c)][_0x105d35(0x1e7)][_0x105d35(0x52e)](this);},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x79f)]=function(){const _0x4fc11e=_0x54467d;VisuMZ['CoreEngine'][_0x4fc11e(0x1e7)][_0x4fc11e(0x52e)](this);},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x407)]=function(){const _0x33fabb=_0x54467d;return VisuMZ['CoreEngine'][_0x33fabb(0x357)][_0x33fabb(0x8ca)][_0x33fabb(0x782)];},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x294)]=function(){const _0x1a6e47=_0x54467d;return VisuMZ[_0x1a6e47(0x98c)][_0x1a6e47(0x357)][_0x1a6e47(0x8ca)][_0x1a6e47(0x888)];},Window_Selectable[_0x54467d(0x895)][_0x54467d(0x781)]=function(){const _0x447ce8=_0x54467d;return Window_Scrollable[_0x447ce8(0x895)][_0x447ce8(0x781)]['call'](this)+VisuMZ[_0x447ce8(0x98c)][_0x447ce8(0x357)][_0x447ce8(0x8ca)][_0x447ce8(0x816)];;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x207)]=Window_Selectable[_0x54467d(0x895)][_0x54467d(0x1d3)],Window_Selectable[_0x54467d(0x895)][_0x54467d(0x1d3)]=function(_0x56d2f7){const _0x3d3954=_0x54467d,_0x3e3950=VisuMZ[_0x3d3954(0x98c)][_0x3d3954(0x357)][_0x3d3954(0x8ca)];if(_0x3e3950['ShowItemBackground']===![])return;if(_0x3e3950['DrawItemBackgroundJS']){if('EJaJu'!==_0x3d3954(0x835)){_0x3eb976[_0x3d3954(0x2e6)](_0x1e9793,_0x9ec46f);const _0x52f51d=_0x315bf6['option']||0x1;_0xba6527[_0x3d3954(0x643)](_0x52f51d);}else _0x3e3950[_0x3d3954(0x880)][_0x3d3954(0x52e)](this,_0x56d2f7);}else VisuMZ['CoreEngine'][_0x3d3954(0x207)][_0x3d3954(0x52e)](this,_0x56d2f7);},VisuMZ['CoreEngine'][_0x54467d(0x558)]=Window_Gold[_0x54467d(0x895)][_0x54467d(0x527)],Window_Gold[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x5d0e13=_0x54467d;this[_0x5d0e13(0x431)]()?this[_0x5d0e13(0x31b)]():_0x5d0e13(0x256)===_0x5d0e13(0x32f)?_0x5446fb[_0x5d0e13(0x880)][_0x5d0e13(0x52e)](this,_0x191749):VisuMZ[_0x5d0e13(0x98c)][_0x5d0e13(0x558)][_0x5d0e13(0x52e)](this);},Window_Gold[_0x54467d(0x895)]['isItemStyle']=function(){const _0x832e66=_0x54467d;if(TextManager['currencyUnit']!==this[_0x832e66(0x7d8)]())return![];return VisuMZ[_0x832e66(0x98c)][_0x832e66(0x357)]['Gold']['ItemStyle'];},Window_Gold[_0x54467d(0x895)]['drawGoldItemStyle']=function(){const _0x16bbec=_0x54467d;this[_0x16bbec(0x83f)](),this[_0x16bbec(0x5a8)]['clear'](),this[_0x16bbec(0x5a8)][_0x16bbec(0x48c)]=VisuMZ[_0x16bbec(0x98c)][_0x16bbec(0x357)][_0x16bbec(0x617)][_0x16bbec(0x95d)];const _0x30365f=VisuMZ[_0x16bbec(0x98c)][_0x16bbec(0x357)][_0x16bbec(0x617)][_0x16bbec(0x721)],_0x5747ea=this['itemLineRect'](0x0);if(_0x30365f>0x0){if(_0x16bbec(0x455)!==_0x16bbec(0x6fb)){const _0x4732b8=_0x5747ea['y']+(this[_0x16bbec(0x984)]()-ImageManager[_0x16bbec(0x633)])/0x2;this['drawIcon'](_0x30365f,_0x5747ea['x'],_0x4732b8);const _0x1338da=ImageManager['iconWidth']+0x4;_0x5747ea['x']+=_0x1338da,_0x5747ea['width']-=_0x1338da;}else _0x2d4bc9[_0x3b134e]=_0x970879[_0x16bbec(0x71c)][_0x539fe2[_0x3cf5e7]];}this[_0x16bbec(0x426)](ColorManager[_0x16bbec(0x3e4)]()),this[_0x16bbec(0xeb)](this[_0x16bbec(0x7d8)](),_0x5747ea['x'],_0x5747ea['y'],_0x5747ea[_0x16bbec(0x36d)],_0x16bbec(0x7db));const _0x395adc=this[_0x16bbec(0x50a)](this[_0x16bbec(0x7d8)]())+0x6;;_0x5747ea['x']+=_0x395adc,_0x5747ea['width']-=_0x395adc,this['resetTextColor']();const _0x408dbe=this[_0x16bbec(0x57c)](),_0xa74a5a=this[_0x16bbec(0x50a)](this['_digitGrouping']?VisuMZ[_0x16bbec(0x1a2)](this['value']()):this['value']());_0xa74a5a>_0x5747ea[_0x16bbec(0x36d)]?'OGSxR'===_0x16bbec(0x668)?_0x5617ac[_0x16bbec(0x98c)][_0x16bbec(0x357)][_0x16bbec(0x2fe)]['Title'][_0x16bbec(0x8ec)][_0x16bbec(0x52e)](this):this['drawText'](VisuMZ[_0x16bbec(0x98c)]['Settings'][_0x16bbec(0x617)]['GoldOverlap'],_0x5747ea['x'],_0x5747ea['y'],_0x5747ea[_0x16bbec(0x36d)],'right'):this[_0x16bbec(0xeb)](this['value'](),_0x5747ea['x'],_0x5747ea['y'],_0x5747ea[_0x16bbec(0x36d)],'right'),this[_0x16bbec(0x83f)]();},Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x6e4)]=function(_0x388d77,_0x3b3a73,_0x3dbd9d,_0x256111,_0x48cf13){const _0x1238e5=_0x54467d;_0x256111=String(_0x256111||'')[_0x1238e5(0x879)]();if(VisuMZ[_0x1238e5(0x98c)][_0x1238e5(0x357)][_0x1238e5(0x1e2)][_0x1238e5(0x2ff)]){if(_0x1238e5(0x390)===_0x1238e5(0x622))this['_registerKeyInput'](_0x3f72dc);else{const _0x2c4127=VisuMZ[_0x1238e5(0x543)](_0x256111);_0x48cf13?(this[_0x1238e5(0x7df)](_0x2c4127,_0x388d77,_0x3b3a73,this[_0x1238e5(0x463)]()),_0x3dbd9d-=this[_0x1238e5(0x463)]()+0x2,_0x388d77+=this[_0x1238e5(0x463)]()+0x2):(this[_0x1238e5(0x2a1)](_0x2c4127,_0x388d77+0x2,_0x3b3a73+0x2),_0x3dbd9d-=ImageManager[_0x1238e5(0x308)]+0x4,_0x388d77+=ImageManager[_0x1238e5(0x308)]+0x4);}}const _0x4f07ef=TextManager[_0x1238e5(0x80a)](_0x256111);this[_0x1238e5(0x83f)](),this['changeTextColor'](ColorManager[_0x1238e5(0x3e4)]()),_0x48cf13?(this[_0x1238e5(0x5a8)][_0x1238e5(0x48c)]=this[_0x1238e5(0x760)](),this[_0x1238e5(0x5a8)][_0x1238e5(0xeb)](_0x4f07ef,_0x388d77,_0x3b3a73,_0x3dbd9d,this[_0x1238e5(0x463)](),_0x1238e5(0x7db))):this[_0x1238e5(0xeb)](_0x4f07ef,_0x388d77,_0x3b3a73,_0x3dbd9d),this[_0x1238e5(0x83f)]();},Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x760)]=function(){const _0x2733aa=_0x54467d;return $gameSystem[_0x2733aa(0x210)]()-0x8;},Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x8cb)]=function(_0x4e5a0c,_0x4bb546,_0x24314d,_0x44737e){const _0x493aed=_0x54467d;_0x44737e=_0x44737e||0xa8,this[_0x493aed(0x943)]();if(VisuMZ[_0x493aed(0x98c)]['Settings']['UI'][_0x493aed(0x66b)])this[_0x493aed(0x749)](_0x4e5a0c[_0x493aed(0x3be)]()[_0x493aed(0x33a)],_0x4bb546,_0x24314d,_0x44737e);else{const _0x37df92=_0x4e5a0c[_0x493aed(0x3be)]()[_0x493aed(0x33a)][_0x493aed(0x603)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x37df92,_0x4bb546,_0x24314d,_0x44737e);}},Window_StatusBase[_0x54467d(0x895)]['drawActorNickname']=function(_0x5bd48a,_0xbb66c3,_0x5ee958,_0x454847){const _0x2010b5=_0x54467d;_0x454847=_0x454847||0x10e,this[_0x2010b5(0x943)]();if(VisuMZ['CoreEngine']['Settings']['UI']['TextCodeNicknames'])_0x2010b5(0x778)!==_0x2010b5(0x778)?(this[_0x2010b5(0x4d3)]=new _0x246614[(_0x2010b5(0x10f))][(_0x2010b5(0x1ac))](_0xbb59fa=!![]),this['_backgroundSprite']=new _0x1811fa(),this[_0x2010b5(0x8ea)][_0x2010b5(0x55d)]=_0x423593[_0x2010b5(0x501)](),this[_0x2010b5(0x8ea)][_0x2010b5(0x10f)]=[this['_backgroundFilter']],this[_0x2010b5(0x290)][_0x2010b5(0x2c0)](this[_0x2010b5(0x8ea)])):this[_0x2010b5(0x749)](_0x5bd48a[_0x2010b5(0x2b4)](),_0xbb66c3,_0x5ee958,_0x454847);else{if(_0x2010b5(0x826)===_0x2010b5(0x246))this[_0x2010b5(0x3d9)]+=this['openingSpeed'](),this[_0x2010b5(0x387)]()&&(this[_0x2010b5(0x167)]=![]);else{const _0x23a27f=_0x5bd48a[_0x2010b5(0x2b4)]()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x5bd48a[_0x2010b5(0x2b4)](),_0xbb66c3,_0x5ee958,_0x454847);}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x9a3)]=Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x928)],Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x928)]=function(_0x5ca0c7,_0x29977c,_0x440194){const _0x47dca4=_0x54467d;if(VisuMZ[_0x47dca4(0x98c)]['Settings'][_0x47dca4(0x1e2)]['ShowActorLevel']===![])return;if(this[_0x47dca4(0x920)]())this[_0x47dca4(0x874)](_0x5ca0c7,_0x29977c,_0x440194);VisuMZ['CoreEngine'][_0x47dca4(0x9a3)]['call'](this,_0x5ca0c7,_0x29977c,_0x440194);},Window_StatusBase[_0x54467d(0x895)][_0x54467d(0x920)]=function(){const _0x41dfa4=_0x54467d;return VisuMZ[_0x41dfa4(0x98c)][_0x41dfa4(0x357)]['UI']['LvExpGauge'];},Window_StatusBase[_0x54467d(0x895)]['drawActorExpGauge']=function(_0x52b8ab,_0x5077b6,_0x43cdaf){const _0x235453=_0x54467d;if(!_0x52b8ab)return;if(!_0x52b8ab[_0x235453(0x1fb)]())return;const _0x58e397=0x80,_0x164c63=_0x52b8ab['expRate']();let _0x2680ec=ColorManager[_0x235453(0x403)](),_0x56a3aa=ColorManager[_0x235453(0x92c)]();_0x164c63>=0x1&&(_0x2680ec=ColorManager['maxLvGaugeColor1'](),_0x56a3aa=ColorManager[_0x235453(0x31c)]()),this['drawGauge'](_0x5077b6,_0x43cdaf,_0x58e397,_0x164c63,_0x2680ec,_0x56a3aa);},Window_EquipStatus[_0x54467d(0x895)][_0x54467d(0xfa)]=function(){const _0xdeace5=_0x54467d;let _0x42f077=0x0;for(const _0x5bffc1 of VisuMZ[_0xdeace5(0x98c)][_0xdeace5(0x357)][_0xdeace5(0x1e2)]['DisplayedParams']){if(_0xdeace5(0x915)!==_0xdeace5(0x915))this[_0xdeace5(0x5ce)]();else{const _0x297564=this[_0xdeace5(0x72c)](),_0x9a047a=this[_0xdeace5(0x7c6)](_0x42f077);this[_0xdeace5(0x108)](_0x297564,_0x9a047a,_0x5bffc1),_0x42f077++;}}},Window_EquipStatus[_0x54467d(0x895)][_0x54467d(0x40b)]=function(_0x13cba0,_0x431e5b,_0x10c5a6){const _0x24e1a9=_0x54467d,_0x4487b4=this[_0x24e1a9(0x89c)]()-this[_0x24e1a9(0x72c)]()*0x2;this['drawParamText'](_0x13cba0,_0x431e5b,_0x4487b4,_0x10c5a6,![]);},Window_EquipStatus[_0x54467d(0x895)][_0x54467d(0x993)]=function(_0x50f055,_0x4c0863,_0x497e67){const _0x3f38a3=_0x54467d,_0x3e0ead=this[_0x3f38a3(0x79d)]();this[_0x3f38a3(0x943)](),this[_0x3f38a3(0xeb)](this[_0x3f38a3(0x45e)][_0x3f38a3(0x804)](_0x497e67,!![]),_0x50f055,_0x4c0863,_0x3e0ead,_0x3f38a3(0x49d));},Window_EquipStatus['prototype'][_0x54467d(0x50b)]=function(_0x7d99a6,_0x47523b){const _0x5b3d1a=_0x54467d,_0x45b255=this[_0x5b3d1a(0x9a0)]();this[_0x5b3d1a(0x426)](ColorManager['systemColor']());const _0x3d0b5b=VisuMZ['CoreEngine'][_0x5b3d1a(0x357)]['UI'][_0x5b3d1a(0x316)];this[_0x5b3d1a(0xeb)](_0x3d0b5b,_0x7d99a6,_0x47523b,_0x45b255,_0x5b3d1a(0x226));},Window_EquipStatus[_0x54467d(0x895)][_0x54467d(0x5e4)]=function(_0x1718a1,_0x57c155,_0x348993){const _0xd74294=_0x54467d,_0x24a143=this['paramWidth'](),_0xb25232=this['_tempActor'][_0xd74294(0x804)](_0x348993),_0x34e9a6=_0xb25232-this[_0xd74294(0x45e)][_0xd74294(0x804)](_0x348993);this[_0xd74294(0x426)](ColorManager[_0xd74294(0x427)](_0x34e9a6)),this[_0xd74294(0xeb)](this[_0xd74294(0x5a9)][_0xd74294(0x804)](_0x348993,!![]),_0x1718a1,_0x57c155,_0x24a143,_0xd74294(0x49d));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x4aa)]=Window_EquipItem[_0x54467d(0x895)][_0x54467d(0x1f5)],Window_EquipItem['prototype']['isEnabled']=function(_0x2a65e2){const _0x2f63b7=_0x54467d;if(_0x2a65e2&&this[_0x2f63b7(0x45e)]){if(_0x2f63b7(0x583)!=='Ojwot'){if(!this['_animation']);const _0x10f86b=this[_0x2f63b7(0x25a)][_0x2f63b7(0x33a)]||'';_0x10f86b['match'](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(_0xb3d760(_0x1c20eb['$1'])||0x1)['clamp'](0x1,0xa));}else return this[_0x2f63b7(0x45e)][_0x2f63b7(0x7ab)](_0x2a65e2);}else return'mxQLR'==='FzBxC'?_0x406abb[_0x2f63b7(0x88a)]['StatusRect'][_0x2f63b7(0x52e)](this):VisuMZ[_0x2f63b7(0x98c)]['Window_EquipItem_isEnabled'][_0x2f63b7(0x52e)](this,_0x2a65e2);},Window_StatusParams[_0x54467d(0x895)][_0x54467d(0x813)]=function(){const _0x534692=_0x54467d;return VisuMZ[_0x534692(0x98c)]['Settings']['Param'][_0x534692(0x5fd)][_0x534692(0x959)];},Window_StatusParams[_0x54467d(0x895)][_0x54467d(0x108)]=function(_0x36313f){const _0x36aa8b=_0x54467d,_0x5f441a=this[_0x36aa8b(0x966)](_0x36313f),_0x33aabe=VisuMZ[_0x36aa8b(0x98c)][_0x36aa8b(0x357)][_0x36aa8b(0x1e2)][_0x36aa8b(0x5fd)][_0x36313f],_0x5f156b=TextManager[_0x36aa8b(0x80a)](_0x33aabe),_0x5241bf=this[_0x36aa8b(0x45e)][_0x36aa8b(0x804)](_0x33aabe,!![]);this[_0x36aa8b(0x6e4)](_0x5f441a['x'],_0x5f441a['y'],0xa0,_0x33aabe,![]),this[_0x36aa8b(0x943)](),this[_0x36aa8b(0xeb)](_0x5241bf,_0x5f441a['x']+0xa0,_0x5f441a['y'],0x3c,'right');};if(VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0xcc)][_0x54467d(0x2b9)]){VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0xcc)]['QwertyLayout']&&(Window_NameInput[_0x54467d(0x46d)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x54467d(0x22c),'OK']);;VisuMZ[_0x54467d(0x98c)][_0x54467d(0x125)]=Window_NameInput[_0x54467d(0x895)]['initialize'],Window_NameInput[_0x54467d(0x895)]['initialize']=function(_0x4e9d2e){const _0x4f632b=_0x54467d;this[_0x4f632b(0x84c)]=this['defaultInputMode'](),VisuMZ[_0x4f632b(0x98c)]['Window_NameInput_initialize'][_0x4f632b(0x52e)](this,_0x4e9d2e),this[_0x4f632b(0x84c)]===_0x4f632b(0x47a)?this[_0x4f632b(0x91b)](0x0):_0x4f632b(0xe0)==='gtCqR'?(Input[_0x4f632b(0x5ce)](),this[_0x4f632b(0x60e)]()):this[_0x4f632b(0x2ca)]=_0x3bf342['windowOpacity']();},Window_NameInput[_0x54467d(0x895)][_0x54467d(0x681)]=function(){const _0x212d9a=_0x54467d;if(Input[_0x212d9a(0x2d7)]())return _0x212d9a(0x47a);return VisuMZ['CoreEngine'][_0x212d9a(0x357)][_0x212d9a(0xcc)][_0x212d9a(0x84d)]||_0x212d9a(0x13a);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x59d)]=Window_NameInput[_0x54467d(0x895)][_0x54467d(0x96d)],Window_NameInput['prototype'][_0x54467d(0x96d)]=function(){const _0x2e01a0=_0x54467d;if(!this[_0x2e01a0(0x387)]())return;if(!this[_0x2e01a0(0x480)])return;if(this[_0x2e01a0(0x84c)]==='keyboard'&&Input[_0x2e01a0(0x3de)]())this[_0x2e01a0(0x107)]('default');else{if(Input[_0x2e01a0(0x645)](_0x2e01a0(0x49e)))_0x2e01a0(0x3f2)!==_0x2e01a0(0x3f2)?_0x50f48f[_0x2e01a0(0x33a)]=_0xf55e5a(_0xe442ab['$2']['trim']()):(Input['clear'](),this['processBack']());else{if(Input['isTriggered'](_0x2e01a0(0x6df)))_0x2e01a0(0x579)===_0x2e01a0(0x679)?(this[_0x2e01a0(0x34a)]['OnLoadJS'][_0x2e01a0(0x52e)](this),this[_0x2e01a0(0x34a)]['PositionJS']['call'](this),this['setClickHandler'](this[_0x2e01a0(0x34a)][_0x2e01a0(0xc7)][_0x2e01a0(0x11b)](this))):(Input[_0x2e01a0(0x5ce)](),this[_0x2e01a0(0x84c)]===_0x2e01a0(0x13a)?this['switchModes']('default'):this[_0x2e01a0(0x107)](_0x2e01a0(0x13a)));else{if(this['_mode']===_0x2e01a0(0x13a))this[_0x2e01a0(0x8d0)]();else Input[_0x2e01a0(0x645)](_0x2e01a0(0x2f9))?(Input['clear'](),this[_0x2e01a0(0x107)]('keyboard')):_0x2e01a0(0x3e1)===_0x2e01a0(0x6f3)?(_0xc75c90=_0x3cc6e8['parse'](_0x37968a[_0x2e01a0(0x2d6)]),_0xc39737[_0x2e01a0(0x851)](_0x2c28d1),this[_0x2e01a0(0x964)][_0x39e3ae]=_0x2a6b67['CoreEngine'][_0x2e01a0(0x911)](_0x16c7d1),_0x1b9602=this[_0x2e01a0(0x311)]):VisuMZ[_0x2e01a0(0x98c)][_0x2e01a0(0x59d)][_0x2e01a0(0x52e)](this);}}}},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1f8)]=Window_NameInput[_0x54467d(0x895)]['processTouch'],Window_NameInput[_0x54467d(0x895)]['processTouch']=function(){const _0x160621=_0x54467d;if(!this[_0x160621(0x7c4)]())return;if(this[_0x160621(0x84c)]===_0x160621(0x13a)){if(TouchInput[_0x160621(0x119)]()&&this['isTouchedInsideFrame']())this[_0x160621(0x107)](_0x160621(0x47a));else{if(TouchInput['isCancelled']()){if(_0x160621(0x651)===_0x160621(0x651))this[_0x160621(0x107)](_0x160621(0x47a));else{if(this['_centerCameraCheck']===_0x24bee2)this[_0x160621(0x3e9)]();return this[_0x160621(0x335)];}}}}else VisuMZ[_0x160621(0x98c)][_0x160621(0x1f8)]['call'](this);},Window_NameInput[_0x54467d(0x895)][_0x54467d(0x8d0)]=function(){const _0x439e70=_0x54467d;if(Input[_0x439e70(0x645)](_0x439e70(0x590)))_0x439e70(0x215)!=='Cjbmc'?(Input[_0x439e70(0x5ce)](),this['onNameOk']()):(_0x542c7f['CoreEngine'][_0x439e70(0x756)][_0x439e70(0x52e)](this),this[_0x439e70(0x239)]());else{if(Input[_0x439e70(0x6a9)]!==undefined){if('RxecP'===_0x439e70(0xc4)){let _0x5371b6=Input[_0x439e70(0x6a9)],_0x222780=_0x5371b6['length'];for(let _0x33779e=0x0;_0x33779e<_0x222780;++_0x33779e){this[_0x439e70(0x433)][_0x439e70(0x95b)](_0x5371b6[_0x33779e])?SoundManager[_0x439e70(0x9b9)]():SoundManager[_0x439e70(0x20a)]();}Input[_0x439e70(0x5ce)]();}else _0x2ed1c5[_0x439e70(0x98c)][_0x439e70(0x242)]['call'](this),this['loadGameImagesCoreEngine']();}}},Window_NameInput['prototype'][_0x54467d(0x107)]=function(_0x158bb5){const _0x1ace76=_0x54467d;let _0x5332c7=this[_0x1ace76(0x84c)];this[_0x1ace76(0x84c)]=_0x158bb5,_0x5332c7!==this['_mode']&&(this[_0x1ace76(0x527)](),SoundManager[_0x1ace76(0x9b9)](),this['_mode']==='default'?this[_0x1ace76(0x91b)](0x0):_0x1ace76(0x903)===_0x1ace76(0x903)?this[_0x1ace76(0x91b)](-0x1):_0x2c8333[_0x1ace76(0x98c)]['Window_Selectable_processTouch'][_0x1ace76(0x52e)](this));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x705)]=Window_NameInput['prototype'][_0x54467d(0x526)],Window_NameInput['prototype']['cursorDown']=function(_0x4665cf){const _0x2a5155=_0x54467d;if(this['_mode']===_0x2a5155(0x13a)&&!Input['isArrowPressed']())return;if(Input[_0x2a5155(0x6f2)]())return;VisuMZ[_0x2a5155(0x98c)][_0x2a5155(0x705)]['call'](this,_0x4665cf),this[_0x2a5155(0x107)](_0x2a5155(0x47a));},VisuMZ[_0x54467d(0x98c)]['Window_NameInput_cursorUp']=Window_NameInput['prototype'][_0x54467d(0x722)],Window_NameInput[_0x54467d(0x895)][_0x54467d(0x722)]=function(_0xfe9e4e){const _0x3c8b18=_0x54467d;if(this[_0x3c8b18(0x84c)]==='keyboard'&&!Input[_0x3c8b18(0x3fc)]())return;if(Input[_0x3c8b18(0x6f2)]())return;VisuMZ[_0x3c8b18(0x98c)][_0x3c8b18(0x707)][_0x3c8b18(0x52e)](this,_0xfe9e4e),this[_0x3c8b18(0x107)](_0x3c8b18(0x47a));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x500)]=Window_NameInput[_0x54467d(0x895)][_0x54467d(0x1a5)],Window_NameInput[_0x54467d(0x895)]['cursorRight']=function(_0x37b542){const _0x22f169=_0x54467d;if(this[_0x22f169(0x84c)]===_0x22f169(0x13a)&&!Input[_0x22f169(0x3fc)]())return;if(Input[_0x22f169(0x6f2)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorRight'][_0x22f169(0x52e)](this,_0x37b542),this[_0x22f169(0x107)](_0x22f169(0x47a));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x524)]=Window_NameInput[_0x54467d(0x895)][_0x54467d(0x21c)],Window_NameInput[_0x54467d(0x895)][_0x54467d(0x21c)]=function(_0x9bd37){const _0x39c22f=_0x54467d;if(this[_0x39c22f(0x84c)]===_0x39c22f(0x13a)&&!Input[_0x39c22f(0x3fc)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft'][_0x39c22f(0x52e)](this,_0x9bd37),this[_0x39c22f(0x107)](_0x39c22f(0x47a));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x938)]=Window_NameInput[_0x54467d(0x895)][_0x54467d(0x3ae)],Window_NameInput[_0x54467d(0x895)][_0x54467d(0x3ae)]=function(){const _0x303d73=_0x54467d;if(this[_0x303d73(0x84c)]===_0x303d73(0x13a))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x303d73(0x98c)][_0x303d73(0x938)][_0x303d73(0x52e)](this),this['switchModes'](_0x303d73(0x47a));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x146)]=Window_NameInput['prototype'][_0x54467d(0x776)],Window_NameInput[_0x54467d(0x895)]['cursorPageup']=function(){const _0x50cfba=_0x54467d;if(this[_0x50cfba(0x84c)]===_0x50cfba(0x13a))return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x50cfba(0x146)][_0x50cfba(0x52e)](this),this[_0x50cfba(0x107)](_0x50cfba(0x47a));},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x93d)]=Window_NameInput[_0x54467d(0x895)][_0x54467d(0x527)],Window_NameInput[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x4149f5=_0x54467d;if(this[_0x4149f5(0x84c)]===_0x4149f5(0x13a)){if(_0x4149f5(0x457)===_0x4149f5(0x97c))return _0x386797[_0x4149f5(0x574)][_0x4149f5(0x62d)]();else{this[_0x4149f5(0x5a8)][_0x4149f5(0x5ce)](),this[_0x4149f5(0x32c)][_0x4149f5(0x5ce)](),this[_0x4149f5(0x943)]();let _0x4afe81=VisuMZ[_0x4149f5(0x98c)][_0x4149f5(0x357)]['KeyboardInput'][_0x4149f5(0x5bf)]['split']('\x0a'),_0x1b9b2b=_0x4afe81[_0x4149f5(0x959)],_0x3bebd5=(this['innerHeight']-_0x1b9b2b*this[_0x4149f5(0x984)]())/0x2;for(let _0x36139e=0x0;_0x36139e<_0x1b9b2b;++_0x36139e){let _0x1e0a86=_0x4afe81[_0x36139e],_0x24f9d1=this['textSizeEx'](_0x1e0a86)[_0x4149f5(0x36d)],_0x2ab661=Math[_0x4149f5(0x881)]((this[_0x4149f5(0x5a8)][_0x4149f5(0x36d)]-_0x24f9d1)/0x2);this['drawTextEx'](_0x1e0a86,_0x2ab661,_0x3bebd5),_0x3bebd5+=this['lineHeight']();}}}else{if('GTzSf'===_0x4149f5(0x69c))VisuMZ['CoreEngine'][_0x4149f5(0x93d)][_0x4149f5(0x52e)](this);else{if(this[_0x4149f5(0x84c)]==='keyboard'&&!_0x2ce84e[_0x4149f5(0x3fc)]())return;if(_0x22c048[_0x4149f5(0x6f2)]())return;_0x5a82b0[_0x4149f5(0x98c)][_0x4149f5(0x524)][_0x4149f5(0x52e)](this,_0x49c989),this[_0x4149f5(0x107)](_0x4149f5(0x47a));}}};};VisuMZ['CoreEngine'][_0x54467d(0x201)]=Window_ShopSell[_0x54467d(0x895)][_0x54467d(0x1f5)],Window_ShopSell[_0x54467d(0x895)]['isEnabled']=function(_0x500c29){const _0x12db08=_0x54467d;if(VisuMZ[_0x12db08(0x98c)]['Settings'][_0x12db08(0x355)]['KeyItemProtect']&&DataManager['isKeyItem'](_0x500c29))return![];else{if(_0x12db08(0x3dc)!=='bgXJe'){this[_0x12db08(0x5a8)][_0x12db08(0x5ce)]();const _0xf12881=_0x903b21['_pictureCoordinatesMode'],_0x4655ff=_0x57d656['picture'](_0xf12881);if(!_0x4655ff)return;this[_0x12db08(0x10e)]=_0x4655ff[_0x12db08(0x24e)],this[_0x12db08(0x99e)]=_0x4655ff['_x'],this['_lastY']=_0x4655ff['_y'];const _0x262c4d=_0x506a47[_0x12db08(0x206)]();this[_0x12db08(0x5a8)][_0x12db08(0x86a)](0x0,0x0,this[_0x12db08(0x9b7)],this[_0x12db08(0x7bc)],_0x262c4d);const _0x1ebcd1=_0x12db08(0x572)[_0x12db08(0x875)](_0x4655ff['_origin']===0x0?_0x12db08(0x351):_0x12db08(0x525)),_0x2dab47=_0x12db08(0x3f8)['format'](_0x4655ff['_x']),_0x4dc0ac=_0x12db08(0x297)[_0x12db08(0x875)](_0x4655ff['_y']),_0x555cb3='%1:\x20Exit\x20'[_0x12db08(0x875)](_0xf4301[_0x12db08(0x307)](_0x12db08(0xf3)));let _0x1a3afa=_0x18fb61[_0x12db08(0x881)](this['innerWidth']/0x4);this[_0x12db08(0xeb)](_0x1ebcd1,_0x1a3afa*0x0,0x0,_0x1a3afa),this['drawText'](_0x2dab47,_0x1a3afa*0x1,0x0,_0x1a3afa,_0x12db08(0x226)),this['drawText'](_0x4dc0ac,_0x1a3afa*0x2,0x0,_0x1a3afa,_0x12db08(0x226));const _0x5431ac=this[_0x12db08(0x837)](_0x555cb3)[_0x12db08(0x36d)],_0x11eab7=this[_0x12db08(0x9b7)]-_0x5431ac;this[_0x12db08(0x749)](_0x555cb3,_0x11eab7,0x0,_0x5431ac);}else return VisuMZ[_0x12db08(0x98c)][_0x12db08(0x201)]['call'](this,_0x500c29);}},Window_NumberInput['prototype'][_0x54467d(0x2e8)]=function(){return![];};VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)]['KeyboardInput'][_0x54467d(0x5c6)]&&(VisuMZ[_0x54467d(0x98c)][_0x54467d(0x507)]=Window_NumberInput[_0x54467d(0x895)]['start'],Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x2a2)]=function(){const _0x2776af=_0x54467d;VisuMZ[_0x2776af(0x98c)][_0x2776af(0x507)][_0x2776af(0x52e)](this),this[_0x2776af(0x91b)](this[_0x2776af(0x7e5)]-0x1),Input[_0x2776af(0x5ce)]();},VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x23a)],Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x23a)]=function(){const _0x168882=_0x54467d;if(!this[_0x168882(0x7c4)]())return;if(Input['isNumpadPressed']())this[_0x168882(0x434)]();else{if(Input[_0x168882(0x645)](_0x168882(0x49e)))_0x168882(0x8c7)===_0x168882(0x8c7)?this[_0x168882(0x6f5)]():_0x1816da[_0x168882(0x98c)][_0x168882(0x4c6)][_0x168882(0x52e)](this);else{if(Input[_0x168882(0x8b4)]===0x2e)'ATKcp'===_0x168882(0x78c)?_0x1377a5[_0x168882(0x37e)](_0x38982c):this['processKeyboardDelete']();else{if(Input[_0x168882(0x8b4)]===0x24)this[_0x168882(0x19a)]();else Input[_0x168882(0x8b4)]===0x23?_0x168882(0x476)===_0x168882(0x476)?this['processKeyboardEnd']():(_0xfeab45['CoreEngine'][_0x168882(0x7e7)]['call'](this),this['initCoreEngine']()):VisuMZ[_0x168882(0x98c)][_0x168882(0x869)][_0x168882(0x52e)](this);}}}},Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x1a1)]=function(){const _0xfb62a2=_0x54467d;if(!this[_0xfb62a2(0x441)]())return;Input[_0xfb62a2(0x6f2)]()?this[_0xfb62a2(0x434)]():Window_Selectable[_0xfb62a2(0x895)]['processCursorMove'][_0xfb62a2(0x52e)](this);},Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x8f3)]=function(){},Window_NumberInput['prototype'][_0x54467d(0x434)]=function(){const _0x35d229=_0x54467d;if(String(this[_0x35d229(0x181)])[_0x35d229(0x959)]>=this[_0x35d229(0x7e5)])return;const _0x450248=Number(String(this[_0x35d229(0x181)])+Input[_0x35d229(0x6a9)]);if(isNaN(_0x450248))return;this['_number']=_0x450248;const _0x46d35f='9'['repeat'](this[_0x35d229(0x7e5)]);this[_0x35d229(0x181)]=this[_0x35d229(0x181)][_0x35d229(0x2ec)](0x0,_0x46d35f),Input[_0x35d229(0x5ce)](),this[_0x35d229(0x527)](),SoundManager[_0x35d229(0x291)](),this['select'](this[_0x35d229(0x7e5)]-0x1);},Window_NumberInput[_0x54467d(0x895)]['processKeyboardBackspace']=function(){const _0xd46b25=_0x54467d;this[_0xd46b25(0x181)]=Number(String(this[_0xd46b25(0x181)])[_0xd46b25(0x4ba)](0x0,-0x1)),this[_0xd46b25(0x181)]=Math[_0xd46b25(0x161)](0x0,this['_number']),Input['clear'](),this[_0xd46b25(0x527)](),SoundManager[_0xd46b25(0x291)](),this[_0xd46b25(0x91b)](this[_0xd46b25(0x7e5)]-0x1);},Window_NumberInput['prototype'][_0x54467d(0x6e7)]=function(){const _0x34a183=_0x54467d;this[_0x34a183(0x181)]=Number(String(this[_0x34a183(0x181)])[_0x34a183(0x2fa)](0x1)),this['_number']=Math[_0x34a183(0x161)](0x0,this[_0x34a183(0x181)]),Input['clear'](),this[_0x34a183(0x527)](),SoundManager[_0x34a183(0x291)](),this[_0x34a183(0x91b)](this['_maxDigits']-0x1);},Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x19a)]=function(){const _0x2d9167=_0x54467d;if(this[_0x2d9167(0x469)]()===0x0)return;Input['clear'](),this[_0x2d9167(0x527)](),SoundManager['playCursor'](),this[_0x2d9167(0x91b)](0x0);},Window_NumberInput[_0x54467d(0x895)][_0x54467d(0x65f)]=function(){const _0x30cb8e=_0x54467d;if(this[_0x30cb8e(0x469)]()===this[_0x30cb8e(0x7e5)]-0x1)return;Input[_0x30cb8e(0x5ce)](),this[_0x30cb8e(0x527)](),SoundManager['playCursor'](),this['select'](this[_0x30cb8e(0x7e5)]-0x1);});;VisuMZ[_0x54467d(0x98c)][_0x54467d(0x123)]=Window_MapName[_0x54467d(0x895)]['refresh'],Window_MapName[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x516f37=_0x54467d;if(VisuMZ[_0x516f37(0x98c)]['Settings'][_0x516f37(0x355)][_0x516f37(0x68e)]){if(_0x516f37(0x49f)!==_0x516f37(0x49f))return this[_0x516f37(0x494)]()[_0x516f37(0x3a1)];else this['refreshWithTextCodeSupport']();}else{if('AfzUV'!==_0x516f37(0x8e2))VisuMZ[_0x516f37(0x98c)]['Window_MapName_refresh'][_0x516f37(0x52e)](this);else{const _0x353cc0=this[_0x516f37(0x469)]();_0x5b3e41[_0x516f37(0x119)](_0x516f37(0x22f))&&this[_0x516f37(0x61d)](_0x3319cf[_0x516f37(0x625)](this['index'](),0x0)),_0xfdd6ef[_0x516f37(0x119)]('end')&&this[_0x516f37(0x61d)](_0x135164[_0x516f37(0x161)](this['index'](),this['maxItems']()-0x1)),this['index']()!==_0x353cc0&&this[_0x516f37(0x42b)]();}}},Window_MapName['prototype'][_0x54467d(0x51d)]=function(){const _0x56be6b=_0x54467d;this['contents'][_0x56be6b(0x5ce)]();if($gameMap[_0x56be6b(0x2e5)]()){if(_0x56be6b(0x4bb)!==_0x56be6b(0x4bb))_0x1ed5ba[_0x56be6b(0x98c)]['Scene_Base_terminate'][_0x56be6b(0x52e)](this),_0x91c7cc=null,_0x2920d9=null,_0x1265d1=null,_0x2e6855=null;else{const _0x4c786f=this[_0x56be6b(0x9b7)];this[_0x56be6b(0x654)](0x0,0x0,_0x4c786f,this['lineHeight']());const _0x543507=this['textSizeEx']($gameMap[_0x56be6b(0x2e5)]())[_0x56be6b(0x36d)];this[_0x56be6b(0x749)]($gameMap[_0x56be6b(0x2e5)](),Math[_0x56be6b(0x881)]((_0x4c786f-_0x543507)/0x2),0x0);}}},Window_TitleCommand['_commandList']=VisuMZ[_0x54467d(0x98c)][_0x54467d(0x357)][_0x54467d(0x1e8)],Window_TitleCommand[_0x54467d(0x895)][_0x54467d(0x854)]=function(){const _0x5c591e=_0x54467d;this[_0x5c591e(0x58f)]();},Window_TitleCommand[_0x54467d(0x895)]['makeCoreEngineCommandList']=function(){const _0x818dcc=_0x54467d;for(const _0x25c906 of Window_TitleCommand[_0x818dcc(0x9aa)]){if(_0x25c906['ShowJS']['call'](this)){if(_0x818dcc(0x39d)!==_0x818dcc(0x39d))_0x58f655[_0x818dcc(0x98c)]['Game_Interpreter_command111'][_0x818dcc(0x52e)](this,_0x3ff92c);else{const _0xfe402c=_0x25c906[_0x818dcc(0x139)];let _0x2f807f=_0x25c906['TextStr'];if(['','Untitled'][_0x818dcc(0x356)](_0x2f807f))_0x2f807f=_0x25c906[_0x818dcc(0x601)][_0x818dcc(0x52e)](this);const _0x3b9ec1=_0x25c906['EnableJS']['call'](this),_0x22d333=_0x25c906[_0x818dcc(0x135)][_0x818dcc(0x52e)](this);this['addCommand'](_0x2f807f,_0xfe402c,_0x3b9ec1,_0x22d333),this['setHandler'](_0xfe402c,_0x25c906['CallHandlerJS']['bind'](this,_0x22d333));}}}},VisuMZ['CoreEngine'][_0x54467d(0x76f)]=Window_TitleCommand[_0x54467d(0x895)][_0x54467d(0xce)],Window_TitleCommand[_0x54467d(0x895)][_0x54467d(0xce)]=function(){const _0x655a5f=_0x54467d;VisuMZ[_0x655a5f(0x98c)][_0x655a5f(0x76f)]['call'](this);if(!Window_TitleCommand['_lastCommandSymbol'])return;const _0x49c457=this[_0x655a5f(0x811)](Window_TitleCommand[_0x655a5f(0x1c9)]),_0x42d449=Math['floor'](this['maxVisibleItems']()/0x2)-0x1;this['smoothSelect'](_0x49c457);if(this[_0x655a5f(0x898)]>0x1){if(_0x655a5f(0x7ad)===_0x655a5f(0x7ad))this[_0x655a5f(0x898)]=0x1,this[_0x655a5f(0x4c4)]();else return _0x5cff2b=_0xa407b4[_0x655a5f(0x603)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x56d539,_0x209dd4)=>_0x1220fa(_0x5e057d(_0x209dd4))),_0x4219a0;}this[_0x655a5f(0x56d)](_0x49c457-_0x42d449);},Window_GameEnd['_commandList']=VisuMZ['CoreEngine'][_0x54467d(0x357)][_0x54467d(0x2fe)][_0x54467d(0x3d3)]['CommandList'],Window_GameEnd['prototype'][_0x54467d(0x854)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x54467d(0x895)][_0x54467d(0x58f)]=function(){const _0x2ab3e0=_0x54467d;for(const _0x422f40 of Window_GameEnd[_0x2ab3e0(0x9aa)]){if(_0x422f40[_0x2ab3e0(0x165)]['call'](this)){if(_0x2ab3e0(0x1df)===_0x2ab3e0(0x1df)){const _0x2ecd51=_0x422f40[_0x2ab3e0(0x139)];let _0x16dc51=_0x422f40['TextStr'];if(['',_0x2ab3e0(0x7c8)]['includes'](_0x16dc51))_0x16dc51=_0x422f40[_0x2ab3e0(0x601)][_0x2ab3e0(0x52e)](this);const _0x4970c3=_0x422f40['EnableJS'][_0x2ab3e0(0x52e)](this),_0x492cbb=_0x422f40[_0x2ab3e0(0x135)][_0x2ab3e0(0x52e)](this);this[_0x2ab3e0(0x8ef)](_0x16dc51,_0x2ecd51,_0x4970c3,_0x492cbb),this['setHandler'](_0x2ecd51,_0x422f40[_0x2ab3e0(0xc7)]['bind'](this,_0x492cbb));}else this[_0x2ab3e0(0x15e)](_0x50a537,_0xcfde26,_0x43c4cb,_0x35704a);}}};function Window_ButtonAssist(){const _0x31c8a4=_0x54467d;this[_0x31c8a4(0x15b)](...arguments);}function _0x3325(_0x4ccdb9,_0x16280c){const _0x40b4a2=_0x40b4();return _0x3325=function(_0x3325d0,_0x1f6e73){_0x3325d0=_0x3325d0-0xc3;let _0x2a227d=_0x40b4a2[_0x3325d0];return _0x2a227d;},_0x3325(_0x4ccdb9,_0x16280c);}Window_ButtonAssist[_0x54467d(0x895)]=Object['create'](Window_Base['prototype']),Window_ButtonAssist['prototype'][_0x54467d(0x615)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x54467d(0x15b)]=function(_0x578535){const _0x135079=_0x54467d;this[_0x135079(0x34a)]={},Window_Base[_0x135079(0x895)][_0x135079(0x15b)][_0x135079(0x52e)](this,_0x578535),this[_0x135079(0x12a)](VisuMZ[_0x135079(0x98c)][_0x135079(0x357)][_0x135079(0x348)][_0x135079(0x30c)]||0x0),this[_0x135079(0x527)]();},Window_ButtonAssist[_0x54467d(0x895)][_0x54467d(0x7a7)]=function(){const _0x3b741a=_0x54467d;this['contents'][_0x3b741a(0x48c)]<=0x60&&(this['contents'][_0x3b741a(0x48c)]+=0x6);},Window_ButtonAssist[_0x54467d(0x895)][_0x54467d(0xea)]=function(){const _0x5d38c8=_0x54467d;this[_0x5d38c8(0x5a8)][_0x5d38c8(0x48c)]>=0x18&&(_0x5d38c8(0x8cd)!=='hOiFh'?this[_0x5d38c8(0x5a8)][_0x5d38c8(0x48c)]-=0x6:(this[_0x5d38c8(0x183)]['x']=-0x1*(this[_0x5d38c8(0x183)][_0x5d38c8(0x36d)]+this[_0x5d38c8(0x7f2)][_0x5d38c8(0x36d)]+0x8),this[_0x5d38c8(0x7f2)]['x']=-0x1*(this[_0x5d38c8(0x7f2)][_0x5d38c8(0x36d)]+0x4)));},Window_ButtonAssist[_0x54467d(0x895)][_0x54467d(0x6f1)]=function(){const _0x1b49f6=_0x54467d;Window_Base[_0x1b49f6(0x895)][_0x1b49f6(0x6f1)][_0x1b49f6(0x52e)](this),this[_0x1b49f6(0x429)]();},Window_ButtonAssist[_0x54467d(0x895)]['updatePadding']=function(){const _0x66c405=_0x54467d;this['padding']=SceneManager[_0x66c405(0x574)][_0x66c405(0x864)]()!=='button'?0x0:0x8;},Window_ButtonAssist['prototype'][_0x54467d(0x429)]=function(){const _0x4c3f68=_0x54467d,_0x24a9eb=SceneManager[_0x4c3f68(0x574)];for(let _0x7e779e=0x1;_0x7e779e<=0x5;_0x7e779e++){if(this[_0x4c3f68(0x34a)]['key%1'['format'](_0x7e779e)]!==_0x24a9eb[_0x4c3f68(0x774)[_0x4c3f68(0x875)](_0x7e779e)]()){if(_0x4c3f68(0x13d)===_0x4c3f68(0x39a)){var _0x559547=_0x4cc1b4(_0x48a2fc['$1']);_0x5a86cc+=_0x559547;}else return this[_0x4c3f68(0x527)]();}if(this['_data'][_0x4c3f68(0x858)[_0x4c3f68(0x875)](_0x7e779e)]!==_0x24a9eb[_0x4c3f68(0x23f)[_0x4c3f68(0x875)](_0x7e779e)]())return this[_0x4c3f68(0x527)]();}},Window_ButtonAssist[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x1db4a9=_0x54467d;this['contents']['clear']();for(let _0x267909=0x1;_0x267909<=0x5;_0x267909++){this[_0x1db4a9(0x421)](_0x267909);}},Window_ButtonAssist['prototype'][_0x54467d(0x421)]=function(_0x2d6c45){const _0x3e7ef5=_0x54467d,_0x313ca7=this['innerWidth']/0x5,_0x3fbcb5=SceneManager['_scene'],_0x1fb7c1=_0x3fbcb5['buttonAssistKey%1'[_0x3e7ef5(0x875)](_0x2d6c45)](),_0x2d2905=_0x3fbcb5[_0x3e7ef5(0x23f)[_0x3e7ef5(0x875)](_0x2d6c45)]();this[_0x3e7ef5(0x34a)][_0x3e7ef5(0x96f)[_0x3e7ef5(0x875)](_0x2d6c45)]=_0x1fb7c1,this[_0x3e7ef5(0x34a)]['text%1'[_0x3e7ef5(0x875)](_0x2d6c45)]=_0x2d2905;if(_0x1fb7c1==='')return;if(_0x2d2905==='')return;const _0x3be023=_0x3fbcb5[_0x3e7ef5(0x939)[_0x3e7ef5(0x875)](_0x2d6c45)](),_0x4358f9=this[_0x3e7ef5(0x72c)](),_0x58eee5=_0x313ca7*(_0x2d6c45-0x1)+_0x4358f9+_0x3be023,_0x40984a=VisuMZ[_0x3e7ef5(0x98c)]['Settings'][_0x3e7ef5(0x348)]['TextFmt'];this[_0x3e7ef5(0x749)](_0x40984a[_0x3e7ef5(0x875)](_0x1fb7c1,_0x2d2905),_0x58eee5,0x0,_0x313ca7-_0x4358f9*0x2);},VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x4cf)],Game_Interpreter[_0x54467d(0x895)][_0x54467d(0x4cf)]=function(){const _0x296c05=_0x54467d;if($gameTemp[_0x296c05(0x8df)]!==undefined)return _0x296c05(0x5f9)!=='wxLMz'?VisuMZ[_0x296c05(0x98c)][_0x296c05(0x34d)]():_0x154cc1(_0x479dd3)[_0x296c05(0x6e5)](_0x5cf626,_0x2c9f2a)+',';return VisuMZ[_0x296c05(0x98c)][_0x296c05(0x5d0)]['call'](this);},VisuMZ['CoreEngine'][_0x54467d(0x34d)]=function(){const _0x6d901f=_0x54467d,_0x20a10a=$gameTemp['_pictureCoordinatesMode']||0x0;(_0x20a10a<0x0||_0x20a10a>0x64||TouchInput[_0x6d901f(0x5cf)]()||Input[_0x6d901f(0x119)]('cancel'))&&($gameTemp[_0x6d901f(0x8df)]=undefined,Input[_0x6d901f(0x5ce)](),TouchInput[_0x6d901f(0x5ce)]());const _0x393a19=$gameScreen['picture'](_0x20a10a);if(_0x393a19){if(_0x6d901f(0x725)!==_0x6d901f(0x725))return this['isMapScrollLinked']()?this['xScrollLinkedOffset']():_0x6e1741[_0x6d901f(0x98c)][_0x6d901f(0x567)][_0x6d901f(0x52e)](this);else _0x393a19['_x']=TouchInput['_x'],_0x393a19['_y']=TouchInput['_y'];}return VisuMZ['CoreEngine'][_0x6d901f(0x86d)](),$gameTemp[_0x6d901f(0x8df)]!==undefined;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x86d)]=function(){const _0x376c10=_0x54467d,_0x5d99ec=SceneManager['_scene'];if(!_0x5d99ec)return;if(!_0x5d99ec[_0x376c10(0x76a)]){if(_0x376c10(0x10c)!==_0x376c10(0x7a3))SoundManager['playLoad'](),_0x5d99ec['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x5d99ec['addChild'](_0x5d99ec[_0x376c10(0x76a)]);else return-0.5*(_0x3579aa['sqrt'](0x1-_0x48c8c7*_0x4ebe1d)-0x1);}$gameTemp[_0x376c10(0x8df)]===undefined&&(SoundManager[_0x376c10(0x37a)](),_0x5d99ec[_0x376c10(0x243)](_0x5d99ec[_0x376c10(0x76a)]),_0x5d99ec['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x333ade=_0x54467d;this[_0x333ade(0x15b)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x54467d(0x26b)](Window_Base[_0x54467d(0x895)]),Window_PictureCoordinates[_0x54467d(0x895)][_0x54467d(0x615)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x54467d(0x15b)]=function(){const _0x158b8f=_0x54467d;this[_0x158b8f(0x10e)]='nah',this[_0x158b8f(0x99e)]=_0x158b8f(0x86c),this[_0x158b8f(0x933)]=_0x158b8f(0x86c);const _0x3a2c09=this[_0x158b8f(0x7c3)]();Window_Base[_0x158b8f(0x895)][_0x158b8f(0x15b)]['call'](this,_0x3a2c09),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x54467d(0x895)]['windowRect']=function(){const _0x586f29=_0x54467d;let _0x2c50af=0x0,_0x482287=Graphics[_0x586f29(0x2d9)]-this['lineHeight'](),_0xe1378b=Graphics[_0x586f29(0x36d)],_0x507ac7=this[_0x586f29(0x984)]();return new Rectangle(_0x2c50af,_0x482287,_0xe1378b,_0x507ac7);},Window_PictureCoordinates[_0x54467d(0x895)][_0x54467d(0x6f8)]=function(){const _0x1a2dd0=_0x54467d;this[_0x1a2dd0(0x8c4)]=0x0;},Window_PictureCoordinates['prototype'][_0x54467d(0x6f1)]=function(){const _0x18b349=_0x54467d;Window_Base['prototype'][_0x18b349(0x6f1)][_0x18b349(0x52e)](this),this[_0x18b349(0x234)]();},Window_PictureCoordinates[_0x54467d(0x895)][_0x54467d(0x234)]=function(){const _0x58fead=_0x54467d;if(!this[_0x58fead(0x632)]())return;this[_0x58fead(0x527)]();},Window_PictureCoordinates[_0x54467d(0x895)]['needsUpdate']=function(){const _0x150cbb=_0x54467d,_0x55dc1a=$gameTemp[_0x150cbb(0x8df)],_0x4431c5=$gameScreen['picture'](_0x55dc1a);return _0x4431c5?this[_0x150cbb(0x10e)]!==_0x4431c5[_0x150cbb(0x24e)]||this[_0x150cbb(0x99e)]!==_0x4431c5['_x']||this[_0x150cbb(0x933)]!==_0x4431c5['_y']:![];},Window_PictureCoordinates[_0x54467d(0x895)][_0x54467d(0x527)]=function(){const _0x3f395e=_0x54467d;this['contents'][_0x3f395e(0x5ce)]();const _0x4dd9f2=$gameTemp[_0x3f395e(0x8df)],_0x385589=$gameScreen[_0x3f395e(0x3c4)](_0x4dd9f2);if(!_0x385589)return;this[_0x3f395e(0x10e)]=_0x385589[_0x3f395e(0x24e)],this[_0x3f395e(0x99e)]=_0x385589['_x'],this['_lastY']=_0x385589['_y'];const _0x4e51e6=ColorManager['itemBackColor1']();this['contents'][_0x3f395e(0x86a)](0x0,0x0,this['innerWidth'],this['innerHeight'],_0x4e51e6);const _0x459605=_0x3f395e(0x572)['format'](_0x385589[_0x3f395e(0x24e)]===0x0?_0x3f395e(0x351):_0x3f395e(0x525)),_0x30b154='X:\x20%1'[_0x3f395e(0x875)](_0x385589['_x']),_0x2002a0=_0x3f395e(0x297)[_0x3f395e(0x875)](_0x385589['_y']),_0x4e88c9=_0x3f395e(0x3a7)[_0x3f395e(0x875)](TextManager[_0x3f395e(0x307)](_0x3f395e(0xf3)));let _0x101383=Math['floor'](this['innerWidth']/0x4);this['drawText'](_0x459605,_0x101383*0x0,0x0,_0x101383),this[_0x3f395e(0xeb)](_0x30b154,_0x101383*0x1,0x0,_0x101383,_0x3f395e(0x226)),this['drawText'](_0x2002a0,_0x101383*0x2,0x0,_0x101383,_0x3f395e(0x226));const _0x2f3fdd=this[_0x3f395e(0x837)](_0x4e88c9)[_0x3f395e(0x36d)],_0x50649e=this[_0x3f395e(0x9b7)]-_0x2f3fdd;this[_0x3f395e(0x749)](_0x4e88c9,_0x50649e,0x0,_0x2f3fdd);},VisuMZ[_0x54467d(0x46e)]=function(_0x270b5b){const _0x443c89=_0x54467d;if(Utils['isOptionValid'](_0x443c89(0x596))){if(_0x443c89(0x515)!=='GIxZi'){var _0x2e3918=require('nw.gui')[_0x443c89(0x8ca)][_0x443c89(0x686)]();SceneManager['showDevTools']();if(_0x270b5b)setTimeout(_0x2e3918[_0x443c89(0x1e5)][_0x443c89(0x11b)](_0x2e3918),0x190);}else _0x5c2204['VisuMZ_2_BattleSystemPTB']&&(this[_0x443c89(0x89e)]='PTB');}},VisuMZ[_0x54467d(0x40d)]=function(_0x59f62c,_0x3a8f98){const _0xbc344f=_0x54467d;_0x3a8f98=_0x3a8f98[_0xbc344f(0x879)]();var _0x2b1219=1.70158,_0x5ca524=0.7;switch(_0x3a8f98){case _0xbc344f(0x982):return _0x59f62c;case _0xbc344f(0x8c2):return-0x1*Math[_0xbc344f(0x29f)](_0x59f62c*(Math['PI']/0x2))+0x1;case _0xbc344f(0x45a):return Math[_0xbc344f(0x5ee)](_0x59f62c*(Math['PI']/0x2));case _0xbc344f(0x6e6):return-0.5*(Math['cos'](Math['PI']*_0x59f62c)-0x1);case _0xbc344f(0xd5):return _0x59f62c*_0x59f62c;case _0xbc344f(0x37d):return _0x59f62c*(0x2-_0x59f62c);case _0xbc344f(0x66d):return _0x59f62c<0.5?0x2*_0x59f62c*_0x59f62c:-0x1+(0x4-0x2*_0x59f62c)*_0x59f62c;case _0xbc344f(0x3ad):return _0x59f62c*_0x59f62c*_0x59f62c;case _0xbc344f(0x77a):var _0x373f26=_0x59f62c-0x1;return _0x373f26*_0x373f26*_0x373f26+0x1;case'INOUTCUBIC':return _0x59f62c<0.5?0x4*_0x59f62c*_0x59f62c*_0x59f62c:(_0x59f62c-0x1)*(0x2*_0x59f62c-0x2)*(0x2*_0x59f62c-0x2)+0x1;case _0xbc344f(0x7da):return _0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c;case'OUTQUART':var _0x373f26=_0x59f62c-0x1;return 0x1-_0x373f26*_0x373f26*_0x373f26*_0x373f26;case _0xbc344f(0x60c):var _0x373f26=_0x59f62c-0x1;return _0x59f62c<0.5?0x8*_0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c:0x1-0x8*_0x373f26*_0x373f26*_0x373f26*_0x373f26;case _0xbc344f(0x343):return _0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c;case'OUTQUINT':var _0x373f26=_0x59f62c-0x1;return 0x1+_0x373f26*_0x373f26*_0x373f26*_0x373f26*_0x373f26;case _0xbc344f(0x65e):var _0x373f26=_0x59f62c-0x1;return _0x59f62c<0.5?0x10*_0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c*_0x59f62c:0x1+0x10*_0x373f26*_0x373f26*_0x373f26*_0x373f26*_0x373f26;case _0xbc344f(0x204):if(_0x59f62c===0x0){if(_0xbc344f(0x5d4)===_0xbc344f(0x5d4))return 0x0;else this[_0xbc344f(0x34a)]={},_0xb9b976['prototype'][_0xbc344f(0x15b)][_0xbc344f(0x52e)](this,_0x56c9ce),this[_0xbc344f(0x12a)](_0x502ece['CoreEngine'][_0xbc344f(0x357)][_0xbc344f(0x348)][_0xbc344f(0x30c)]||0x0),this[_0xbc344f(0x527)]();}return Math['pow'](0x2,0xa*(_0x59f62c-0x1));case'OUTEXPO':if(_0x59f62c===0x1){if(_0xbc344f(0x435)===_0xbc344f(0x7d3))this[_0xbc344f(0x2a3)][_0xbc344f(0x12a)](_0x373899[_0xbc344f(0x88a)][_0xbc344f(0x74f)]);else return 0x1;}return-Math[_0xbc344f(0x544)](0x2,-0xa*_0x59f62c)+0x1;case _0xbc344f(0x82e):if(_0x59f62c===0x0||_0x59f62c===0x1)return _0xbc344f(0x87d)!==_0xbc344f(0x87d)?_0x416a7d[_0xbc344f(0x98c)][_0xbc344f(0x357)][_0xbc344f(0x355)][_0xbc344f(0x265)]?this['itemHitImprovedAccuracy'](_0x4fbafd):_0x27afcf[_0xbc344f(0x98c)][_0xbc344f(0x531)][_0xbc344f(0x52e)](this,_0x8655c3):_0x59f62c;var _0x3e00db=_0x59f62c*0x2,_0x4c1985=_0x3e00db-0x1;if(_0x3e00db<0x1){if('hnLuR'==='uhFOL')this[_0xbc344f(0x107)](_0xbc344f(0x47a));else return 0.5*Math[_0xbc344f(0x544)](0x2,0xa*_0x4c1985);}return 0.5*(-Math[_0xbc344f(0x544)](0x2,-0xa*_0x4c1985)+0x2);case _0xbc344f(0x60a):var _0x3e00db=_0x59f62c/0x1;return-0x1*(Math[_0xbc344f(0x799)](0x1-_0x3e00db*_0x59f62c)-0x1);case _0xbc344f(0x428):var _0x373f26=_0x59f62c-0x1;return Math[_0xbc344f(0x799)](0x1-_0x373f26*_0x373f26);case _0xbc344f(0x952):var _0x3e00db=_0x59f62c*0x2,_0x4c1985=_0x3e00db-0x2;if(_0x3e00db<0x1)return-0.5*(Math['sqrt'](0x1-_0x3e00db*_0x3e00db)-0x1);return 0.5*(Math[_0xbc344f(0x799)](0x1-_0x4c1985*_0x4c1985)+0x1);case _0xbc344f(0x4af):return _0x59f62c*_0x59f62c*((_0x2b1219+0x1)*_0x59f62c-_0x2b1219);case'OUTBACK':var _0x3e00db=_0x59f62c/0x1-0x1;return _0x3e00db*_0x3e00db*((_0x2b1219+0x1)*_0x3e00db+_0x2b1219)+0x1;break;case'INOUTBACK':var _0x3e00db=_0x59f62c*0x2,_0x142172=_0x3e00db-0x2,_0x555fc8=_0x2b1219*1.525;if(_0x3e00db<0x1){if(_0xbc344f(0x8dc)==='dzWXw')this[_0xbc344f(0x2fb)]+=_0x2737bc[_0xbc344f(0xe2)]((_0x3cc746[_0xbc344f(0x2d9)]-0x270)/0x2),this[_0xbc344f(0x2fb)]-=_0x1a3410[_0xbc344f(0x881)]((_0x57edf1[_0xbc344f(0x2d9)]-_0x30b942['boxHeight'])/0x2),_0x4a06a4[_0xbc344f(0x29e)]()?this[_0xbc344f(0x89a)]-=_0x438dcb[_0xbc344f(0x881)]((_0x219ac5[_0xbc344f(0x36d)]-_0x643ec6[_0xbc344f(0x7c0)])/0x2):this['_screenX']+=_0x22f678[_0xbc344f(0xe2)]((_0x52baf2[_0xbc344f(0x7c0)]-0x330)/0x2);else return 0.5*_0x3e00db*_0x3e00db*((_0x555fc8+0x1)*_0x3e00db-_0x555fc8);}return 0.5*(_0x142172*_0x142172*((_0x555fc8+0x1)*_0x142172+_0x555fc8)+0x2);case'INELASTIC':if(_0x59f62c===0x0||_0x59f62c===0x1)return _0x59f62c;var _0x3e00db=_0x59f62c/0x1,_0x4c1985=_0x3e00db-0x1,_0x5bf63e=0x1-_0x5ca524,_0x555fc8=_0x5bf63e/(0x2*Math['PI'])*Math[_0xbc344f(0x73c)](0x1);return-(Math[_0xbc344f(0x544)](0x2,0xa*_0x4c1985)*Math[_0xbc344f(0x5ee)]((_0x4c1985-_0x555fc8)*(0x2*Math['PI'])/_0x5bf63e));case'OUTELASTIC':var _0x5bf63e=0x1-_0x5ca524,_0x3e00db=_0x59f62c*0x2;if(_0x59f62c===0x0||_0x59f62c===0x1)return _0x59f62c;var _0x555fc8=_0x5bf63e/(0x2*Math['PI'])*Math[_0xbc344f(0x73c)](0x1);return Math['pow'](0x2,-0xa*_0x3e00db)*Math['sin']((_0x3e00db-_0x555fc8)*(0x2*Math['PI'])/_0x5bf63e)+0x1;case _0xbc344f(0x8a3):var _0x5bf63e=0x1-_0x5ca524;if(_0x59f62c===0x0||_0x59f62c===0x1)return _0x59f62c;var _0x3e00db=_0x59f62c*0x2,_0x4c1985=_0x3e00db-0x1,_0x555fc8=_0x5bf63e/(0x2*Math['PI'])*Math[_0xbc344f(0x73c)](0x1);if(_0x3e00db<0x1)return-0.5*(Math['pow'](0x2,0xa*_0x4c1985)*Math[_0xbc344f(0x5ee)]((_0x4c1985-_0x555fc8)*(0x2*Math['PI'])/_0x5bf63e));return Math[_0xbc344f(0x544)](0x2,-0xa*_0x4c1985)*Math['sin']((_0x4c1985-_0x555fc8)*(0x2*Math['PI'])/_0x5bf63e)*0.5+0x1;case _0xbc344f(0x4b1):var _0x3e00db=_0x59f62c/0x1;if(_0x3e00db<0x1/2.75)return 7.5625*_0x3e00db*_0x3e00db;else{if(_0x3e00db<0x2/2.75){var _0x142172=_0x3e00db-1.5/2.75;return 7.5625*_0x142172*_0x142172+0.75;}else{if(_0x3e00db<2.5/2.75){if(_0xbc344f(0x758)===_0xbc344f(0x1e9))return!![];else{var _0x142172=_0x3e00db-2.25/2.75;return 7.5625*_0x142172*_0x142172+0.9375;}}else{var _0x142172=_0x3e00db-2.625/2.75;return 7.5625*_0x142172*_0x142172+0.984375;}}}case _0xbc344f(0x164):var _0x5ac8bb=0x1-VisuMZ[_0xbc344f(0x40d)](0x1-_0x59f62c,'outbounce');return _0x5ac8bb;case _0xbc344f(0x4ff):if(_0x59f62c<0.5)var _0x5ac8bb=VisuMZ[_0xbc344f(0x40d)](_0x59f62c*0x2,'inbounce')*0.5;else{if(_0xbc344f(0x57f)!==_0xbc344f(0x57f))this['_colorCache'][_0x85aeb1]=this[_0xbc344f(0x8be)](_0x547dea(_0x3dab19));else var _0x5ac8bb=VisuMZ[_0xbc344f(0x40d)](_0x59f62c*0x2-0x1,_0xbc344f(0x82a))*0.5+0.5;}return _0x5ac8bb;default:return _0x59f62c;}},VisuMZ['GetParamIcon']=function(_0x4e7711){const _0x4e8250=_0x54467d;_0x4e7711=String(_0x4e7711)[_0x4e8250(0x879)]();const _0xb3cc98=VisuMZ[_0x4e8250(0x98c)][_0x4e8250(0x357)]['Param'];if(_0x4e7711===_0x4e8250(0x19d))return _0xb3cc98[_0x4e8250(0x471)];if(_0x4e7711===_0x4e8250(0x728))return _0xb3cc98[_0x4e8250(0x6c2)];if(_0x4e7711===_0x4e8250(0x1ef))return _0xb3cc98[_0x4e8250(0x589)];if(_0x4e7711==='DEF')return _0xb3cc98['IconParam3'];if(_0x4e7711===_0x4e8250(0x43e))return _0xb3cc98['IconParam4'];if(_0x4e7711===_0x4e8250(0x67b))return _0xb3cc98['IconParam5'];if(_0x4e7711===_0x4e8250(0x2b5))return _0xb3cc98[_0x4e8250(0xf1)];if(_0x4e7711==='LUK')return _0xb3cc98[_0x4e8250(0x6ad)];if(_0x4e7711==='HIT')return _0xb3cc98[_0x4e8250(0x5de)];if(_0x4e7711===_0x4e8250(0x2cc))return _0xb3cc98[_0x4e8250(0x1ea)];if(_0x4e7711===_0x4e8250(0x94e))return _0xb3cc98[_0x4e8250(0x90b)];if(_0x4e7711==='CEV')return _0xb3cc98[_0x4e8250(0xdf)];if(_0x4e7711===_0x4e8250(0x6c1))return _0xb3cc98[_0x4e8250(0x229)];if(_0x4e7711==='MRF')return _0xb3cc98[_0x4e8250(0x317)];if(_0x4e7711==='CNT')return _0xb3cc98['IconXParam6'];if(_0x4e7711==='HRG')return _0xb3cc98['IconXParam7'];if(_0x4e7711==='MRG')return _0xb3cc98['IconXParam8'];if(_0x4e7711===_0x4e8250(0x13e))return _0xb3cc98[_0x4e8250(0x8f8)];if(_0x4e7711===_0x4e8250(0x8f9))return _0xb3cc98[_0x4e8250(0x637)];if(_0x4e7711===_0x4e8250(0x1c0))return _0xb3cc98[_0x4e8250(0x118)];if(_0x4e7711==='REC')return _0xb3cc98['IconSParam2'];if(_0x4e7711===_0x4e8250(0x6d4))return _0xb3cc98['IconSParam3'];if(_0x4e7711===_0x4e8250(0x412))return _0xb3cc98['IconSParam4'];if(_0x4e7711===_0x4e8250(0x90a))return _0xb3cc98[_0x4e8250(0x4e6)];if(_0x4e7711===_0x4e8250(0x53e))return _0xb3cc98['IconSParam6'];if(_0x4e7711===_0x4e8250(0x535))return _0xb3cc98[_0x4e8250(0x227)];if(_0x4e7711===_0x4e8250(0x5f8))return _0xb3cc98[_0x4e8250(0x821)];if(_0x4e7711===_0x4e8250(0x550))return _0xb3cc98[_0x4e8250(0x490)];if(VisuMZ[_0x4e8250(0x98c)][_0x4e8250(0x340)][_0x4e7711])return VisuMZ[_0x4e8250(0x98c)][_0x4e8250(0x340)][_0x4e7711]||0x0;return 0x0;},VisuMZ[_0x54467d(0x611)]=function(_0x1ef2d0,_0x629948,_0x526968){const _0x50f128=_0x54467d;if(_0x526968===undefined&&_0x1ef2d0%0x1===0x0)return _0x1ef2d0;if(_0x526968!==undefined&&[_0x50f128(0x19d),'MAXMP','ATK',_0x50f128(0x314),_0x50f128(0x43e),_0x50f128(0x67b),_0x50f128(0x2b5),_0x50f128(0x96a)][_0x50f128(0x356)](String(_0x526968)[_0x50f128(0x879)]()[_0x50f128(0x747)]()))return _0x1ef2d0;_0x629948=_0x629948||0x0;if(VisuMZ[_0x50f128(0x98c)]['CustomParamAbb'][_0x526968]){if(_0x50f128(0x5ae)===_0x50f128(0x683))_0x5312a1[_0x50f128(0x98c)][_0x50f128(0x123)][_0x50f128(0x52e)](this);else{if(VisuMZ[_0x50f128(0x98c)]['CustomParamType'][_0x526968]===_0x50f128(0xdd)){if('cJtSu'!==_0x50f128(0x1d5))return _0x1ef2d0;else _0x2036b5[_0x50f128(0x4c5)]=_0xf61d02,_0x214043[_0x50f128(0x585)]=_0x4a4545[_0x50f128(0x4ad)]['seek'](),_0x5c00a4['updateBgmParameters'](_0x48eddd),_0x288caf[_0x50f128(0x1d2)](_0x25b2ff,_0x2b57ee[_0x50f128(0x585)]),_0x4905e7[_0x50f128(0x70f)]['_startPlaying'](_0x1c5336[_0x50f128(0x585)]);}else return String((_0x1ef2d0*0x64)[_0x50f128(0x214)](_0x629948))+'%';}}return String((_0x1ef2d0*0x64)[_0x50f128(0x214)](_0x629948))+'%';},VisuMZ['GroupDigits']=function(_0x16e2e0){const _0x2e3188=_0x54467d;_0x16e2e0=String(_0x16e2e0);if(!_0x16e2e0)return _0x16e2e0;if(typeof _0x16e2e0!==_0x2e3188(0x8b9))return _0x16e2e0;const _0x74a3b1=VisuMZ[_0x2e3188(0x98c)][_0x2e3188(0x357)]['QoL'][_0x2e3188(0x260)]||_0x2e3188(0x678),_0x2e4c80={'maximumFractionDigits':0x6};_0x16e2e0=_0x16e2e0['replace'](/\[(.*?)\]/g,(_0x1608fb,_0x173a6b)=>{return VisuMZ['PreserveNumbers'](_0x173a6b,'[',']');}),_0x16e2e0=_0x16e2e0[_0x2e3188(0x603)](/<(.*?)>/g,(_0xa25b5,_0x5c4c5c)=>{const _0x5a2684=_0x2e3188;return VisuMZ[_0x5a2684(0x228)](_0x5c4c5c,'<','>');}),_0x16e2e0=_0x16e2e0[_0x2e3188(0x603)](/\{\{(.*?)\}\}/g,(_0x13d729,_0x448732)=>{const _0x10d2c7=_0x2e3188;return _0x10d2c7(0x190)!=='jgrZa'?VisuMZ[_0x10d2c7(0x228)](_0x448732,'',''):'';}),_0x16e2e0=_0x16e2e0['replace'](/(\d+\.?\d*)/g,(_0x32b0ce,_0x477e02)=>{const _0x364440=_0x2e3188;let _0x224ef7=_0x477e02;if(_0x224ef7[0x0]==='0')return _0x224ef7;if(_0x224ef7[_0x224ef7[_0x364440(0x959)]-0x1]==='.')return _0x364440(0x454)===_0x364440(0x454)?Number(_0x224ef7)['toLocaleString'](_0x74a3b1,_0x2e4c80)+'.':_0x582ba3[_0x364440(0x88a)]['StatusRect'][_0x364440(0x52e)](this);else return _0x224ef7[_0x224ef7[_0x364440(0x959)]-0x1]===','?Number(_0x224ef7)[_0x364440(0x6e5)](_0x74a3b1,_0x2e4c80)+',':Number(_0x224ef7)[_0x364440(0x6e5)](_0x74a3b1,_0x2e4c80);});let _0x56ce7d=0x3;while(_0x56ce7d--){if(_0x2e3188(0x94b)===_0x2e3188(0x4ce))return _0x3341ff[_0x2e3188(0x98c)]['CustomParamNames'][_0x40affa];else _0x16e2e0=VisuMZ['RevertPreserveNumbers'](_0x16e2e0);}return _0x16e2e0;},VisuMZ['PreserveNumbers']=function(_0x4d8b11,_0x26af2e,_0x57a595){const _0x491580=_0x54467d;return _0x4d8b11=_0x4d8b11[_0x491580(0x603)](/(\d)/gi,(_0x5f1782,_0x1e13c6)=>'PRESERVCONVERSION(%1)'[_0x491580(0x875)](Number(_0x1e13c6))),_0x491580(0x4d1)[_0x491580(0x875)](_0x4d8b11,_0x26af2e,_0x57a595);},VisuMZ[_0x54467d(0x47d)]=function(_0x5955a9){return _0x5955a9=_0x5955a9['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4d6627,_0x366dd2)=>Number(parseInt(_0x366dd2))),_0x5955a9;},VisuMZ['openURL']=function(_0x42a86a){const _0x5ccb0b=_0x54467d;SoundManager[_0x5ccb0b(0x9b9)]();if(!Utils[_0x5ccb0b(0x76e)]()){const _0x11a7da=window[_0x5ccb0b(0x5fe)](_0x42a86a,'_blank');}else{const _0x10f254=process[_0x5ccb0b(0x334)]==_0x5ccb0b(0x9a6)?_0x5ccb0b(0x5fe):process[_0x5ccb0b(0x334)]==_0x5ccb0b(0x492)?_0x5ccb0b(0x2a2):_0x5ccb0b(0x27f);require('child_process')[_0x5ccb0b(0x3ec)](_0x10f254+'\x20'+_0x42a86a);}},VisuMZ[_0x54467d(0xe1)]=function(_0x3659ca,_0x57989c){const _0x5ecd5d=_0x54467d;if(!_0x3659ca)return'';const _0x2e3d41=_0x3659ca[_0x5ecd5d(0x1b6)]||_0x3659ca['id'];let _0x5dc5f6='';_0x3659ca[_0x5ecd5d(0x4c3)]!==undefined&&_0x3659ca[_0x5ecd5d(0x2b4)]!==undefined&&(_0x5ecd5d(0x777)===_0x5ecd5d(0x5c5)?(_0x741cbc[_0x5ecd5d(0x7ca)](),this[_0x5ecd5d(0x121)]('evade')):_0x5dc5f6=_0x5ecd5d(0x5f1)[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c));if(_0x3659ca[_0x5ecd5d(0x1ca)]!==undefined&&_0x3659ca[_0x5ecd5d(0x6c3)]!==undefined){if(_0x5ecd5d(0xf9)!==_0x5ecd5d(0xf9)){const _0x2982d6=_0x2ef9ae[_0x5ecd5d(0x40d)]((_0x1a6fb2-_0x327535)/_0x215391,_0x552fc0||_0x5ecd5d(0x420)),_0x23b22f=_0x3d56ef[_0x5ecd5d(0x40d)]((_0x2d1540-_0x3f6e52+0x1)/_0x34b2d3,_0x1ed97e||'Linear'),_0x213f7e=(_0x511437-_0x3c894f*_0x2982d6)/(0x1-_0x2982d6);return _0x213f7e+(_0x3a32f7-_0x213f7e)*_0x23b22f;}else _0x5dc5f6='Class-%1-%2'[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c);}return _0x3659ca[_0x5ecd5d(0x4de)]!==undefined&&_0x3659ca['requiredWtypeId1']!==undefined&&(_0x5ecd5d(0x35f)!==_0x5ecd5d(0x285)?_0x5dc5f6=_0x5ecd5d(0x4bf)[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c):(this[_0x5ecd5d(0x3d9)]-=this[_0x5ecd5d(0x592)](),this[_0x5ecd5d(0x7d5)]()&&(this[_0x5ecd5d(0x51b)]=![]))),_0x3659ca[_0x5ecd5d(0x4e0)]!==undefined&&_0x3659ca['consumable']!==undefined&&(_0x5dc5f6='Item-%1-%2'[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c)),_0x3659ca[_0x5ecd5d(0x2bf)]!==undefined&&_0x3659ca[_0x5ecd5d(0x718)]===0x1&&(_0x5dc5f6=_0x5ecd5d(0x3bb)[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c)),_0x3659ca[_0x5ecd5d(0x7c2)]!==undefined&&_0x3659ca[_0x5ecd5d(0x718)]>0x1&&('seNtA'===_0x5ecd5d(0x15d)?this[_0x5ecd5d(0x203)]()?_0x1ea461['CoreEngine'][_0x5ecd5d(0x932)]['call'](this,_0x544066):this[_0x5ecd5d(0x83a)](_0xa1631f):_0x5dc5f6='Armor-%1-%2'[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c)),_0x3659ca[_0x5ecd5d(0x14c)]!==undefined&&_0x3659ca['battlerHue']!==undefined&&(_0x5dc5f6=_0x5ecd5d(0x465)[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c)),_0x3659ca[_0x5ecd5d(0x6ce)]!==undefined&&_0x3659ca[_0x5ecd5d(0x7ac)]!==undefined&&(_0x5dc5f6=_0x5ecd5d(0x47c)[_0x5ecd5d(0x875)](_0x2e3d41,_0x57989c)),_0x5dc5f6;},Game_Picture[_0x54467d(0x895)]['anchor']=function(){const _0x32aaaa=_0x54467d;return this[_0x32aaaa(0x8d6)];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture[_0x54467d(0x895)][_0x54467d(0x116)],Game_Picture[_0x54467d(0x895)][_0x54467d(0x116)]=function(){const _0x1005b7=_0x54467d;VisuMZ['CoreEngine'][_0x1005b7(0x6de)][_0x1005b7(0x52e)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x1005b7(0x6fa)]={'x':0x0,'y':0x0};},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x5a5)]=Game_Picture[_0x54467d(0x895)][_0x54467d(0x9b3)],Game_Picture['prototype'][_0x54467d(0x9b3)]=function(){const _0x57ba2d=_0x54467d;this[_0x57ba2d(0x59e)]();const _0x513e34=this[_0x57ba2d(0x6c4)];VisuMZ[_0x57ba2d(0x98c)][_0x57ba2d(0x5a5)][_0x57ba2d(0x52e)](this),_0x513e34>0x0&&this[_0x57ba2d(0x6c4)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x57ba2d(0x7bf)],this[_0x57ba2d(0xfd)]=this['_targetScaleX'],this[_0x57ba2d(0x83e)]=this[_0x57ba2d(0x2b6)],this[_0x57ba2d(0x7fb)]=this[_0x57ba2d(0x213)],this[_0x57ba2d(0x8d6)]&&(this[_0x57ba2d(0x8d6)]['x']=this[_0x57ba2d(0x6fa)]['x'],this[_0x57ba2d(0x8d6)]['y']=this[_0x57ba2d(0x6fa)]['y']));},VisuMZ[_0x54467d(0x98c)]['Game_Picture_show']=Game_Picture[_0x54467d(0x895)][_0x54467d(0x85c)],Game_Picture[_0x54467d(0x895)][_0x54467d(0x85c)]=function(_0x58ea78,_0x1b6bb5,_0x1ee117,_0x3a511e,_0x44fe90,_0x2a23fe,_0x37c8b4,_0x242cc2){const _0x37f6f2=_0x54467d;VisuMZ[_0x37f6f2(0x98c)]['Game_Picture_show'][_0x37f6f2(0x52e)](this,_0x58ea78,_0x1b6bb5,_0x1ee117,_0x3a511e,_0x44fe90,_0x2a23fe,_0x37c8b4,_0x242cc2),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1b6bb5]||{'x':0x0,'y':0x0});},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x383)]=Game_Picture[_0x54467d(0x895)][_0x54467d(0x1bd)],Game_Picture[_0x54467d(0x895)][_0x54467d(0x1bd)]=function(_0x247627,_0x4ba029,_0x5498f1,_0x5846f7,_0x1b6d21,_0xd6ce02,_0x25143a,_0x96e6f8,_0x4eac40){const _0x4d590c=_0x54467d;VisuMZ[_0x4d590c(0x98c)][_0x4d590c(0x383)][_0x4d590c(0x52e)](this,_0x247627,_0x4ba029,_0x5498f1,_0x5846f7,_0x1b6d21,_0xd6ce02,_0x25143a,_0x96e6f8,_0x4eac40),this[_0x4d590c(0x7e2)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x247627]||{'x':0x0,'y':0x0});},Game_Picture[_0x54467d(0x895)][_0x54467d(0x59e)]=function(){const _0x2b9067=_0x54467d;this['_duration']>0x0&&(this[_0x2b9067(0x8d6)]['x']=this[_0x2b9067(0x610)](this['_anchor']['x'],this[_0x2b9067(0x6fa)]['x']),this[_0x2b9067(0x8d6)]['y']=this[_0x2b9067(0x610)](this[_0x2b9067(0x8d6)]['y'],this[_0x2b9067(0x6fa)]['y']));},Game_Picture[_0x54467d(0x895)][_0x54467d(0x163)]=function(_0x4ce3ec){const _0x3cad9f=_0x54467d;this[_0x3cad9f(0x8d6)]=_0x4ce3ec,this[_0x3cad9f(0x6fa)]=JsonEx[_0x3cad9f(0x91a)](this[_0x3cad9f(0x8d6)]);},Game_Picture[_0x54467d(0x895)]['setTargetAnchor']=function(_0x4c78c2){const _0x250e24=_0x54467d;this[_0x250e24(0x6fa)]=_0x4c78c2;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x4b6)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x54467d(0x895)][_0x54467d(0x992)]=function(){const _0x562248=_0x54467d,_0x5be6e8=this[_0x562248(0x3c4)]();!_0x5be6e8[_0x562248(0x30f)]()?VisuMZ[_0x562248(0x98c)][_0x562248(0x4b6)][_0x562248(0x52e)](this):(this[_0x562248(0x30f)]['x']=_0x5be6e8[_0x562248(0x30f)]()['x'],this[_0x562248(0x30f)]['y']=_0x5be6e8[_0x562248(0x30f)]()['y']);},Game_Action[_0x54467d(0x895)][_0x54467d(0x149)]=function(_0x1c5e33){const _0x1c846e=_0x54467d;if(_0x1c5e33){const _0x3feaa5=_0x1c5e33[_0x1c846e(0x1c6)];if(_0x3feaa5===0x1&&this[_0x1c846e(0x494)]()['attackSkillId']()!==0x1){if(_0x1c846e(0x2f0)==='fWqOe')this[_0x1c846e(0x81f)]();else return this['_tilemap']||this;}else{if(_0x3feaa5===0x2&&this[_0x1c846e(0x494)]()[_0x1c846e(0x64c)]()!==0x2){if(_0x1c846e(0x88e)!=='OTSFW')this[_0x1c846e(0x9ba)]();else{_0x30f6b6[_0x1c846e(0x2e6)](_0x57c21c,_0x40875f);const _0x2d0504=_0x413cf7['value']||0x0;_0x1482e0['gainGold'](_0x2d0504);}}else this[_0x1c846e(0x729)](_0x3feaa5);}}else this[_0x1c846e(0x5ce)]();},Game_Actor['prototype'][_0x54467d(0x2ee)]=function(){const _0x175c10=_0x54467d;return this[_0x175c10(0x4f6)]()[_0x175c10(0x8cf)](_0x10a5af=>this['canUse'](_0x10a5af)&&this[_0x175c10(0x2a9)]()['includes'](_0x10a5af['stypeId']));},Window_Base['prototype']['createDimmerSprite']=function(){const _0x186c9a=_0x54467d;this['_dimmerSprite']=new Sprite(),this[_0x186c9a(0x6f9)][_0x186c9a(0x55d)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x186c9a(0x461)](this[_0x186c9a(0x6f9)]);},Window_Base['prototype'][_0x54467d(0x92f)]=function(){const _0x748305=_0x54467d;if(this['_dimmerSprite']){if(_0x748305(0x63e)===_0x748305(0x63e)){const _0x56e0d3=this['_dimmerSprite']['bitmap'],_0x155dfb=this['width'],_0x1f94c7=this['height'],_0x5b35b2=this[_0x748305(0x8c4)],_0x835749=ColorManager[_0x748305(0x7f7)](),_0x3e1ef3=ColorManager['dimColor2']();_0x56e0d3['resize'](_0x155dfb,_0x1f94c7),_0x56e0d3[_0x748305(0x186)](0x0,0x0,_0x155dfb,_0x5b35b2,_0x3e1ef3,_0x835749,!![]),_0x56e0d3[_0x748305(0x86a)](0x0,_0x5b35b2,_0x155dfb,_0x1f94c7-_0x5b35b2*0x2,_0x835749),_0x56e0d3[_0x748305(0x186)](0x0,_0x1f94c7-_0x5b35b2,_0x155dfb,_0x5b35b2,_0x835749,_0x3e1ef3,!![]),this['_dimmerSprite'][_0x748305(0x423)](0x0,0x0,_0x155dfb,_0x1f94c7);}else{let _0x5ef487=this[_0x748305(0x25f)]();this['useDigitGrouping']()&&(_0x5ef487=_0x4329a1[_0x748305(0x1a2)](_0x5ef487));const _0x1ce540=this[_0x748305(0x80d)]()-0x1,_0x2b4bd0=this['textHeight']?this[_0x748305(0x8f0)]():this[_0x748305(0x379)]();this[_0x748305(0x419)](),this[_0x748305(0x55d)][_0x748305(0xeb)](_0x5ef487,0x0,0x0,_0x1ce540,_0x2b4bd0,_0x748305(0x49d));}}},Game_Actor[_0x54467d(0x895)]['makeAutoBattleActions']=function(){const _0x4332ce=_0x54467d;for(let _0x416267=0x0;_0x416267<this[_0x4332ce(0x4fd)]();_0x416267++){if(_0x4332ce(0x93e)!==_0x4332ce(0x93e))_0x4411e9[_0x4332ce(0x98c)][_0x4332ce(0x357)][_0x4332ce(0x355)][_0x4332ce(0x620)]&&(this[_0x4332ce(0x151)]=![]);else{const _0x40d385=this[_0x4332ce(0x58c)]();let _0x28ebac=Number['MIN_SAFE_INTEGER'];this[_0x4332ce(0x63a)](_0x416267,_0x40d385[0x0]);for(const _0x3089ca of _0x40d385){const _0x21ee12=_0x3089ca[_0x4332ce(0x7d2)]();_0x21ee12>_0x28ebac&&(_0x28ebac=_0x21ee12,this[_0x4332ce(0x63a)](_0x416267,_0x3089ca));}}}this[_0x4332ce(0x650)](_0x4332ce(0x29d));},Window_BattleItem['prototype'][_0x54467d(0x1f5)]=function(_0xc79ad1){const _0x3a34a6=_0x54467d;return BattleManager[_0x3a34a6(0x739)]()?BattleManager[_0x3a34a6(0x739)]()[_0x3a34a6(0x2e9)](_0xc79ad1):Window_ItemList[_0x3a34a6(0x895)][_0x3a34a6(0x1f5)][_0x3a34a6(0x52e)](this,_0xc79ad1);},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1c2)]=Scene_Map[_0x54467d(0x895)][_0x54467d(0x140)],Scene_Map[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0x31e8bb=_0x54467d;VisuMZ[_0x31e8bb(0x98c)][_0x31e8bb(0x1c2)][_0x31e8bb(0x52e)](this);const _0x3a1d6a=this[_0x31e8bb(0x775)][_0x31e8bb(0x475)];if(_0x3a1d6a)this[_0x31e8bb(0x2c0)](_0x3a1d6a);},VisuMZ['CoreEngine'][_0x54467d(0x8c9)]=Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)],Scene_Battle[_0x54467d(0x895)][_0x54467d(0x140)]=function(){const _0x15e75a=_0x54467d;VisuMZ[_0x15e75a(0x98c)][_0x15e75a(0x8c9)][_0x15e75a(0x52e)](this);const _0x675e4e=this[_0x15e75a(0x775)][_0x15e75a(0x475)];if(_0x675e4e)this['addChild'](_0x675e4e);},Sprite_Actor[_0x54467d(0x895)][_0x54467d(0x6f1)]=function(){const _0x19eee3=_0x54467d;Sprite_Battler[_0x19eee3(0x895)][_0x19eee3(0x6f1)][_0x19eee3(0x52e)](this),this['updateShadow']();if(this[_0x19eee3(0x45e)])'zBbbS'!==_0x19eee3(0x445)?(_0x410c47+=_0x16c84a+'\x0a',_0x34f131+=_0x19eee3(0x530)['format'](_0x1d5744[_0x19eee3(0x3d2)][0x0])):this[_0x19eee3(0x91d)]();else{if(this[_0x19eee3(0x834)]!==''){if(_0x19eee3(0x3ac)===_0x19eee3(0x318)){var _0x4d69d5=_0x5872c9(_0x2e466a['$1'])/0x64;_0x153f9a+=_0x4d69d5;}else this[_0x19eee3(0x834)]='';}}},Window[_0x54467d(0x895)][_0x54467d(0x534)]=function(){const _0xc221db=_0x54467d,_0x30f221=this[_0xc221db(0x3c8)],_0x1a5e99=this[_0xc221db(0x3da)],_0x25efc1=0x18,_0x1a3863=_0x25efc1/0x2,_0x62be08=0x60+_0x25efc1,_0x118dcf=0x0+_0x25efc1;this[_0xc221db(0x38b)][_0xc221db(0x55d)]=this[_0xc221db(0x9bb)],this[_0xc221db(0x38b)]['anchor']['x']=0.5,this['_downArrowSprite'][_0xc221db(0x30f)]['y']=0.5,this[_0xc221db(0x38b)]['setFrame'](_0x62be08+_0x1a3863,_0x118dcf+_0x1a3863+_0x25efc1,_0x25efc1,_0x1a3863),this[_0xc221db(0x38b)][_0xc221db(0x1bd)](Math[_0xc221db(0xe2)](_0x30f221/0x2),Math['round'](_0x1a5e99-_0x1a3863)),this['_upArrowSprite'][_0xc221db(0x55d)]=this[_0xc221db(0x9bb)],this[_0xc221db(0x924)]['anchor']['x']=0.5,this[_0xc221db(0x924)]['anchor']['y']=0.5,this[_0xc221db(0x924)]['setFrame'](_0x62be08+_0x1a3863,_0x118dcf,_0x25efc1,_0x1a3863),this['_upArrowSprite'][_0xc221db(0x1bd)](Math[_0xc221db(0xe2)](_0x30f221/0x2),Math[_0xc221db(0xe2)](_0x1a3863));},Window[_0x54467d(0x895)][_0x54467d(0x64e)]=function(){const _0x4dd91d=_0x54467d,_0x158b99=0x90,_0x1e2d4b=0x60,_0x32d6b7=0x18;this[_0x4dd91d(0x95a)][_0x4dd91d(0x55d)]=this[_0x4dd91d(0x9bb)],this[_0x4dd91d(0x95a)][_0x4dd91d(0x30f)]['x']=0.5,this[_0x4dd91d(0x95a)][_0x4dd91d(0x30f)]['y']=0x1,this[_0x4dd91d(0x95a)][_0x4dd91d(0x1bd)](Math[_0x4dd91d(0xe2)](this['_width']/0x2),this['_height']),this[_0x4dd91d(0x95a)]['setFrame'](_0x158b99,_0x1e2d4b,_0x32d6b7,_0x32d6b7),this[_0x4dd91d(0x95a)][_0x4dd91d(0x576)]=0xff;},Window[_0x54467d(0x895)][_0x54467d(0x408)]=function(){const _0x11beea=_0x54467d,_0x171c2d=this[_0x11beea(0x767)][_0x11beea(0x303)][_0x11beea(0x74a)](new Point(0x0,0x0)),_0x17a5e8=this[_0x11beea(0x767)][_0x11beea(0x72b)];_0x17a5e8['x']=_0x171c2d['x']+this['origin']['x'],_0x17a5e8['y']=_0x171c2d['y']+this[_0x11beea(0x653)]['y'],_0x17a5e8['width']=Math[_0x11beea(0x948)](this[_0x11beea(0x9b7)]*this[_0x11beea(0x12d)]['x']),_0x17a5e8[_0x11beea(0x2d9)]=Math[_0x11beea(0x948)](this[_0x11beea(0x7bc)]*this[_0x11beea(0x12d)]['y']);},Window['prototype'][_0x54467d(0x647)]=function(){const _0x5111d5=_0x54467d,_0x2ce026=this[_0x5111d5(0x94a)],_0x3e0e6a=Math[_0x5111d5(0x161)](0x0,this['_width']-_0x2ce026*0x2),_0x4e584a=Math[_0x5111d5(0x161)](0x0,this[_0x5111d5(0x3da)]-_0x2ce026*0x2),_0x2390ee=this[_0x5111d5(0x675)],_0x4c71df=_0x2390ee[_0x5111d5(0xf5)][0x0];_0x2390ee['bitmap']=this[_0x5111d5(0x9bb)],_0x2390ee['setFrame'](0x0,0x0,0x60,0x60),_0x2390ee[_0x5111d5(0x1bd)](_0x2ce026,_0x2ce026),_0x2390ee[_0x5111d5(0x12d)]['x']=_0x3e0e6a/0x60,_0x2390ee['scale']['y']=_0x4e584a/0x60,_0x4c71df['bitmap']=this[_0x5111d5(0x9bb)],_0x4c71df[_0x5111d5(0x423)](0x0,0x60,0x60,0x60),_0x4c71df[_0x5111d5(0x1bd)](0x0,0x0,_0x3e0e6a,_0x4e584a),_0x4c71df[_0x5111d5(0x12d)]['x']=0x1/_0x2390ee['scale']['x'],_0x4c71df[_0x5111d5(0x12d)]['y']=0x1/_0x2390ee[_0x5111d5(0x12d)]['y'],_0x2390ee[_0x5111d5(0x41c)](this[_0x5111d5(0x5bc)]);},Game_Temp[_0x54467d(0x895)][_0x54467d(0x5ad)]=function(){const _0x2b61b4=_0x54467d;this['_animationQueue']=[],this[_0x2b61b4(0x46f)]=[],this[_0x2b61b4(0x489)]=[],this[_0x2b61b4(0x56c)]=[];},VisuMZ[_0x54467d(0x98c)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x54467d(0x895)][_0x54467d(0x2d3)],Scene_Base[_0x54467d(0x895)][_0x54467d(0x2d3)]=function(){const _0x2767e7=_0x54467d;if($gameTemp)$gameTemp[_0x2767e7(0x5ad)]();VisuMZ[_0x2767e7(0x98c)][_0x2767e7(0x47b)][_0x2767e7(0x52e)](this);},Bitmap[_0x54467d(0x895)][_0x54467d(0x32a)]=function(_0x751b3c){const _0x29ebb1=_0x54467d,_0xa8bc55=this[_0x29ebb1(0x4b7)];_0xa8bc55['save'](),_0xa8bc55['font']=this[_0x29ebb1(0x22d)]();const _0x519fe1=_0xa8bc55['measureText'](_0x751b3c)['width'];return _0xa8bc55[_0x29ebb1(0x36e)](),_0x519fe1;},Window_Message[_0x54467d(0x895)]['textWidth']=function(_0x1e8be0){const _0x56ad98=_0x54467d;if(this[_0x56ad98(0x8f2)]()){if(_0x56ad98(0x824)!=='rjyRs')return this[_0x56ad98(0x5a8)][_0x56ad98(0x32a)](_0x1e8be0);else{if(_0x3775a3['isPlaytest']())_0x21e047[_0x56ad98(0x56f)](_0x21777d);}}else return Window_Base[_0x56ad98(0x895)][_0x56ad98(0x50a)][_0x56ad98(0x52e)](this,_0x1e8be0);},Window_Message['prototype'][_0x54467d(0x8f2)]=function(){const _0x1a641e=_0x54467d;return VisuMZ['CoreEngine'][_0x1a641e(0x357)][_0x1a641e(0x355)][_0x1a641e(0x523)]??!![];},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x8fa)]=Game_Action[_0x54467d(0x895)][_0x54467d(0x270)],Game_Action[_0x54467d(0x895)][_0x54467d(0x270)]=function(){const _0x260994=_0x54467d;return this[_0x260994(0x5cb)]()?VisuMZ['CoreEngine'][_0x260994(0x8fa)][_0x260994(0x52e)](this):0x0;},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x1fd)]=Game_Action[_0x54467d(0x895)][_0x54467d(0x81f)],Game_Action[_0x54467d(0x895)][_0x54467d(0x81f)]=function(){const _0x21d4ce=_0x54467d;this[_0x21d4ce(0x494)]()&&this['subject']()[_0x21d4ce(0x11d)]()?VisuMZ['CoreEngine'][_0x21d4ce(0x1fd)][_0x21d4ce(0x52e)](this):this[_0x21d4ce(0x5ce)]();},Sprite_Name[_0x54467d(0x895)][_0x54467d(0x379)]=function(){return 0x24;},Sprite_Name[_0x54467d(0x895)]['redraw']=function(){const _0x258135=_0x54467d,_0x75c77b=this['name'](),_0x51e049=this['bitmapWidth'](),_0x58b283=this[_0x258135(0x379)]();this['setupFont'](),this['bitmap'][_0x258135(0x5ce)](),this[_0x258135(0x55d)][_0x258135(0x456)](_0x75c77b,0x4,0x0,_0x51e049-0xa,_0x58b283,_0x258135(0x7db));},Bitmap['prototype'][_0x54467d(0x456)]=function(_0x5bbd9c,_0x34b9c6,_0x256947,_0x32b0c6,_0xf336d4,_0x24ceb7){const _0x30ca4f=_0x54467d,_0x25f436=this['context'],_0x2de1a2=_0x25f436[_0x30ca4f(0x4e5)];_0x32b0c6=_0x32b0c6||0xffffffff;let _0x1a37e0=_0x34b9c6,_0x2cdc16=Math[_0x30ca4f(0xe2)](_0x256947+0x18/0x2+this[_0x30ca4f(0x48c)]*0.35);_0x24ceb7==='center'&&(_0x30ca4f(0x28d)==='felho'?this[_0x30ca4f(0x3ae)]():_0x1a37e0+=_0x32b0c6/0x2),_0x24ceb7===_0x30ca4f(0x49d)&&(_0x1a37e0+=_0x32b0c6),_0x25f436['save'](),_0x25f436[_0x30ca4f(0x159)]=this[_0x30ca4f(0x22d)](),_0x25f436[_0x30ca4f(0x451)]=_0x24ceb7,_0x25f436[_0x30ca4f(0x540)]=_0x30ca4f(0x66c),_0x25f436[_0x30ca4f(0x4e5)]=0x1,this[_0x30ca4f(0x144)](_0x5bbd9c,_0x1a37e0,_0x2cdc16,_0x32b0c6),_0x25f436[_0x30ca4f(0x4e5)]=_0x2de1a2,this['_drawTextBody'](_0x5bbd9c,_0x1a37e0,_0x2cdc16,_0x32b0c6),_0x25f436[_0x30ca4f(0x36e)](),this[_0x30ca4f(0x8d8)][_0x30ca4f(0x6f1)]();},VisuMZ[_0x54467d(0x98c)][_0x54467d(0x394)]=BattleManager['checkSubstitute'],BattleManager[_0x54467d(0x6cb)]=function(_0x1646bb){const _0xb54404=_0x54467d;if(this[_0xb54404(0x37b)][_0xb54404(0x295)]())return![];return VisuMZ[_0xb54404(0x98c)]['BattleManager_checkSubstitute'][_0xb54404(0x52e)](this,_0x1646bb);},BattleManager[_0x54467d(0x62c)]=function(){const _0x1f260d=_0x54467d;if(this[_0x1f260d(0x2d4)])this['_logWindow']['endAction'](this[_0x1f260d(0x2d4)]);this['_phase']=_0x1f260d(0x446),this[_0x1f260d(0x2d4)]&&this[_0x1f260d(0x2d4)][_0x1f260d(0x4fd)]()===0x0&&(_0x1f260d(0x267)===_0x1f260d(0x18a)?this[_0x1f260d(0x194)][_0x1f260d(0x12a)](_0x7125b9['layoutSettings'][_0x1f260d(0x172)]):(this[_0x1f260d(0x254)](this[_0x1f260d(0x2d4)]),this[_0x1f260d(0x2d4)]=null));},Bitmap[_0x54467d(0x895)][_0x54467d(0x7be)]=function(){const _0x4e6c92=_0x54467d;this['_image']=new Image(),this[_0x4e6c92(0x1c1)][_0x4e6c92(0x745)]=this[_0x4e6c92(0x69b)][_0x4e6c92(0x11b)](this),this[_0x4e6c92(0x1c1)][_0x4e6c92(0x250)]=this[_0x4e6c92(0x21e)]['bind'](this),this[_0x4e6c92(0x109)](),this[_0x4e6c92(0x841)]='loading',Utils[_0x4e6c92(0x8b5)]()?this[_0x4e6c92(0x7bb)]():(this[_0x4e6c92(0x1c1)][_0x4e6c92(0x994)]=this[_0x4e6c92(0x6bd)],![]&&this[_0x4e6c92(0x1c1)]['width']>0x0&&(_0x4e6c92(0x61f)!==_0x4e6c92(0x61f)?(_0x4d20f4[_0x4e6c92(0x98c)][_0x4e6c92(0x6de)][_0x4e6c92(0x52e)](this),this[_0x4e6c92(0x8d6)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0}):(this['_image'][_0x4e6c92(0x745)]=null,this[_0x4e6c92(0x69b)]())));},Scene_Skill[_0x54467d(0x895)]['onActorChange']=function(){const _0x204ff7=_0x54467d;Scene_MenuBase[_0x204ff7(0x895)][_0x204ff7(0xf0)][_0x204ff7(0x52e)](this),this['refreshActor'](),this[_0x204ff7(0x1ff)]['deactivate'](),this[_0x204ff7(0x1ff)][_0x204ff7(0x60e)](),this[_0x204ff7(0x2a3)][_0x204ff7(0x52a)]();},Scene_Skill['prototype'][_0x54467d(0x91f)]=function(){const _0x234854=_0x54467d;return this[_0x234854(0x2a3)]&&this[_0x234854(0x2a3)][_0x234854(0x480)];},Game_Map['prototype'][_0x54467d(0x790)]=function(_0x8e8471,_0x50b900,_0x2173d9){const _0x15b53f=_0x54467d,_0x542d08=this[_0x15b53f(0x41f)](),_0x4d613a=this[_0x15b53f(0x491)](_0x8e8471,_0x50b900);for(const _0x47f8f8 of _0x4d613a){const _0x8cb1da=_0x542d08[_0x47f8f8];if(_0x8cb1da===undefined||_0x8cb1da===null){if($gameTemp[_0x15b53f(0x595)]()&&!DataManager[_0x15b53f(0x63c)]()){let _0x587dbc=_0x15b53f(0x8f1)+'\x0a';_0x587dbc+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x587dbc+=_0x15b53f(0x5b2);if(Imported[_0x15b53f(0x4df)]||Imported[_0x15b53f(0x618)])alert(_0x587dbc),SceneManager[_0x15b53f(0x800)]();else{if('WDfmY'!=='WDfmY'){if(_0x2eacfd[_0x15b53f(0x356)](_0x5714f8['toLowerCase']()))return!![];}else console[_0x15b53f(0x56f)](_0x587dbc),!$gameTemp[_0x15b53f(0x4a8)]&&($gameTemp[_0x15b53f(0x4a8)]=!![],SceneManager[_0x15b53f(0x926)]());}}}if((_0x8cb1da&0x10)!==0x0)continue;if((_0x8cb1da&_0x2173d9)===0x0){if(_0x15b53f(0x700)==='maOjK')_0x5cc8dc=_0x1f10aa[_0x15b53f(0x3b0)](_0xe75128);else return!![];}if((_0x8cb1da&_0x2173d9)===_0x2173d9)return![];}return![];},Sprite_Animation[_0x54467d(0x895)]['saveViewport']=function(_0x58a94d){const _0x2a8e8b=_0x54467d;!this[_0x2a8e8b(0x9af)]&&(this[_0x2a8e8b(0x9af)]=_0x58a94d['gl'][_0x2a8e8b(0x16b)](_0x58a94d['gl'][_0x2a8e8b(0x319)]));};
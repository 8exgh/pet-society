# Original Pet Society feature audit and remake scope

Research completed 2026-08-30 before implementation. This is a clean-room feature inventory: the remake uses original code and art, not recovered client files or proprietary assets.

## Core loop

- Create and later restyle a pet: name, animal-like silhouette, color, ears, eyes, mouth/muzzle, markings, accessories, and gender in the original.
- Care actions: feed, wash/soap, brush/pet, play, sleep. Earlier versions exposed hunger, hygiene, and happiness bars; later versions hid some bars while keeping dirty/fly behavior.
- Earn Paw Points/XP, level up, unlock catalog items, improve care tools, and unlock additional house rooms.
- Earn coins from care, friends, daily lottery, races, awards, minigames, tree shaking, and selling/recycling. Premium cash existed in the original; this remake starts with earnable gems and no real-money purchase.

## Home, wardrobe, and collecting

- Multi-room house and two gardens, wallpapers/floors/windows/doors, lights, furniture, gadgets, toys, aquariums, outdoor decor, and exterior customization.
- Drag/place room decoration, wardrobe dress-up, storage chest, item gifting, resale/recycling, photos in room/pet/portrait formats.
- Rotating and seasonal catalogs, limited items, mystery boxes/eggs, glow-in-the-dark items, collaborative items, weekly crafting, stickers, and themed collections.
- 51 tiered trophies across 17 activities were documented, plus later challenges, quests, and daily missions.

## Neighborhood and social play

- Walkable town/neighborhood with friends' houses and coin-bearing trees.
- First daily visit rewards, repeat visit XP, wash/feed/play with a friend's pet, leave notes, exchange gifts, and see friend activity.
- Café enabled discovery and visits to random opted-in players.
- Hideeni appeared around town/houses/shops and unlocked a limited shared gift for friends.

## Shops and places

- Food, Furniture, Clothes, DIY, Outdoor/Garden, Market (including former Gadget/Luxury inventory), Mystery Shop, Boutique/Cash Shop, Stylist, and Café.
- Pond, Stadium, Treasure Map, gardens/yards, Friend Street, and the Mayor's area.

## Activities

- Fishing: food as bait, timing interaction, fish/rubbish collection, aquariums, rare catches.
- Cooking: stove, recipes, one timed dish at a time, burn window and recovery item, cooking levels.
- Gardening: flowers, trees, vegetables, growth timers, oversized produce, vegetable rot, second plot at level 10.
- Treasure Hunt: themed maps, proximity clues, four finds per map, five daily shovels, special travel unlocks.
- Stadium: practice, daily prize races, pro races, hurdle timing, bananas, and spectator betting.
- At-home toy minigames: ball, frisbee, and jump rope.
- Daily lottery evolved from letters to a wheel and then a five-day escalating streak with items/premium currency.
- Petlings: a pet for the pet, requested foods, three-day growth, randomized appearance, makeover/color items, and a collection cap.

## Product mapping

This implementation models writes as commands that append immutable aggregate events, and reads by replaying a user/pet stream. Shipped interactions include authentication, mandatory pet designer, care, needs, XP/levels/rooms, coins/gems, daily streak, shop/catalog level gates, inventory use/equip/place, room display, garden timers/harvest, fishing/treasure/racing/cooking rewards, collections, quests, trophies/stat surfaces, and petling state. Social visit/gift/note event types and expanded skill-based minigame canvases are the next production content expansion.

## Sources

- Wikipedia, “Pet Society” gameplay overview: https://en.wikipedia.org/wiki/Pet_Society
- Pet Society Wiki overview and location index: https://petpedia.fandom.com/wiki/Pet_Society
- Pet Society Wiki newbie guide: https://petpedia.fandom.com/wiki/PS_Newbie_Guide
- Pet Society Wiki pages for Garden, Cooking, Pond, Stadium, Race, Treasure Hunt, Petlings, Trophies, Café, Neighborhood, and Lottery.
- GameFAQs publisher description: https://gamefaqs.gamespot.com/webonly/636576-pet-society
- Gamezebo historical walkthrough: https://www.gamezebo.com/walkthroughs/pet-society-walkthrough/
- Archived official update posts: https://officialpetsociety.wordpress.com/

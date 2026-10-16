import { FriendCharacter, Ingredient, Recipe, WardrobeItem, DecorItem, MenuItem, GuestbookEntry, GameState, CoupleProfile, AnniversaryMilestone, BucketListItem } from '../types';

export const FRIENDS_DATA: FriendCharacter[] = [
  {
    id: 'kitty',
    name: 'Hello Kitty',
    title: 'Warm & Friendly Baker',
    avatarColor: '#ff4d6d',
    favoriteTreat: "Mama's Apple Pie",
    dialogueGreeting: "Hello friend! You can never have too many friends!",
    dialogueHappy: "Baking together makes my heart full of joy! Thank you!",
    friendshipLevel: 3,
    birthday: 'November 1',
    height: '5 apples tall',
    weight: '3 apples heavy',
    personality: 'Cheerful, warm-hearted, kind to everyone, enjoys baking.',
    funFact: "Her blood type is A, and she lives in the suburbs of London with her parents and twin sister Mimmy!"
  },
  {
    id: 'melody',
    name: 'My Melody',
    title: 'Gentle Bunny from Mariland',
    avatarColor: '#ff758f',
    favoriteTreat: 'Strawberry Shortcake',
    dialogueGreeting: "Mama taught me to always share sweet treats with kind friends!",
    dialogueHappy: "This is so delicious and sweet! You are the best baker ever!",
    friendshipLevel: 2,
    birthday: 'January 18',
    height: 'Like a small bunny',
    weight: 'Fluffy as a cotton ball',
    personality: 'Innocent, sweet, polite, and very caring.',
    funFact: "Her trademark hood was handcrafted with care by her grandmother!"
  },
  {
    id: 'cinnamoroll',
    name: 'Cinnamoroll',
    title: 'Cloud-Flying Puppy',
    avatarColor: '#70d6ff',
    favoriteTreat: 'Cinnamon Cloud Roll',
    dialogueGreeting: "I caught the sweet aroma all the way from the fluffy clouds!",
    dialogueHappy: "Yummy! My tail is doing happy cinnamon spirals!",
    friendshipLevel: 2,
    birthday: 'March 6',
    height: '21 cm',
    weight: 'Cloud-light',
    personality: 'Quiet, shy, friendly, enjoys napping on customers\' laps.',
    funFact: "He can fly through the sky by flapping his long, floppy ears!"
  },
  {
    id: 'purin',
    name: 'Pompompurin',
    title: 'Laidback Golden Pup',
    avatarColor: '#ffbe0b',
    favoriteTreat: 'Purin Custard Flan',
    dialogueGreeting: "Did somebody say caramel pudding? My beret is vibrating!",
    dialogueHappy: "Super jiggly and sweet! I'm going to take a cozy nap now!",
    friendshipLevel: 2,
    birthday: 'April 16',
    height: '5 medium puddings tall',
    weight: '1 giant watermelon',
    personality: 'Easygoing, enjoys napping, collecting shoes, and eating custard.',
    funFact: "His favorite phrase is 'Let's go out!' and his best friend is Muffin the hamster!"
  },
  {
    id: 'kuromi',
    name: 'Kuromi',
    title: 'Spunky Rebel with a Soft Heart',
    avatarColor: '#b5179e',
    favoriteTreat: 'Kuromi Blackberry Tart',
    dialogueGreeting: "Hmph! Don't think I'm here because I'm cute, but the treats look decent!",
    dialogueHappy: "Fine, I admit it! This is secretly magnificent! Don't tell Melody!",
    friendshipLevel: 1,
    birthday: 'October 31 (Halloween)',
    height: 'Cute compact pocket size',
    weight: 'Lighter than a spellbook',
    personality: 'Sassy tomboy on the outside, imaginative story diary-writer on the inside.',
    funFact: "She writes poems and mystery novels in her secret diary called 'The Kuromi Notebook'!"
  },
  {
    id: 'keroppi',
    name: 'Keroppi',
    title: 'Donut Pond Swimmer',
    avatarColor: '#52b788',
    favoriteTreat: 'Matcha Froggy Donut',
    dialogueGreeting: "Ribbit! Today is an energetic day for a picnic snack!",
    dialogueHappy: "Kero-kero! That was a triple-somersault level snack!",
    friendshipLevel: 1,
    birthday: 'July 10',
    height: '1 frog jump',
    weight: '3 water lilies',
    personality: 'Bubbly, athletic, enjoys swimming and boomerangs.',
    funFact: "He lives with his family in the Kero Kero House next to Donut Pond!"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu_anniversary_cake',
    name: '365-Day Anniversary Heart Cake',
    category: 'pastry',
    priceCoins: 100,
    description: 'Double-tier festive cake filled with strawberry champagne cream, decorated with white chocolate pearls and a golden "1 Year" candle.',
    icon: '🎂',
    sweetness: 5,
    tags: ['1st Anniversary Special', 'Celebration Duo', 'October 15'],
    favoriteOf: 'Best Friends Duo',
    prepTime: 'Handcrafted with Care'
  },
  {
    id: 'menu_anniversary_fondue',
    name: 'Besties Berry & Dark Chocolate Fondue',
    category: 'dessert',
    priceCoins: 85,
    description: 'Rich Belgian melted dark chocolate fondue served with fluffy marshmallows, fresh berries, and sweet butter wafers for sharing.',
    icon: '🍓',
    sweetness: 4,
    tags: ['Besties Sharing', 'Celebration', 'Warm Treat'],
    favoriteOf: 'Best Friends Duo',
    prepTime: '2 mins'
  },
  {
    id: 'menu_anniversary_rose_boba',
    name: 'Anniversary Blossom Rose Boba',
    category: 'drink',
    priceCoins: 65,
    description: 'Fragrant French rose milk tea brewed with strawberry blossom syrup, tender tapioca pearls, and crowned with edible sugar crystal stars.',
    icon: '🧋',
    sweetness: 4,
    tags: ['Anniversary Brew', 'Celebration', 'Limited Edition'],
    favoriteOf: 'Best Friends',
    prepTime: '3 mins'
  },
  {
    id: 'menu_apple_pie',
    name: "Mama's Signature Warm Apple Pie",
    category: 'pastry',
    priceCoins: 60,
    description: "Freshly sliced orchard apples tossed with aromatic cinnamon and baked in flaky golden butter crust. Topped with Kitty's red ribbon.",
    icon: '🥧',
    sweetness: 4,
    tags: ['Best Seller', 'Warm', 'Signature'],
    favoriteOf: 'Hello Kitty',
    prepTime: '5 mins'
  },
  {
    id: 'menu_melody_cake',
    name: 'My Melody Strawberry Chiffon Cake',
    category: 'pastry',
    priceCoins: 55,
    description: "Ultra-light vanilla chiffon layers filled with whipped fresh cream and topped with hand-picked organic strawberries.",
    icon: '🍰',
    sweetness: 5,
    tags: ['Fresh Fruit', 'Fluffy', 'Popular'],
    favoriteOf: 'My Melody',
    prepTime: '4 mins'
  },
  {
    id: 'menu_cinnamon_roll',
    name: 'Cinnamoroll Starlight Cloud Bun',
    category: 'pastry',
    priceCoins: 50,
    description: "Swirled sweet pastry dough filled with brown sugar cinnamon and frosted with melted vanilla marshmallow glaze and edible gold stars.",
    icon: '🥮',
    sweetness: 4,
    tags: ['Warm Spices', 'Soft', 'Cloud Foam'],
    favoriteOf: 'Cinnamoroll',
    prepTime: '3 mins'
  },
  {
    id: 'menu_purin_flan',
    name: 'Pompompurin Amber Caramel Flan',
    category: 'dessert',
    priceCoins: 45,
    description: "Rich whole-egg custard steamed to velvety perfection, draped with slow-cooked dark amber caramel and crowned with a ruby cherry.",
    icon: '🍮',
    sweetness: 4,
    tags: ['Jiggly', 'Caramel', 'Classic'],
    favoriteOf: 'Pompompurin',
    prepTime: '2 mins'
  },
  {
    id: 'menu_kuromi_tart',
    name: 'Kuromi Midnight Dark Berry Tart',
    category: 'pastry',
    priceCoins: 65,
    description: "Midnight dark cocoa tart shell filled with wild blackberry compote, bittersweet Belgian ganache, and dark sugar hearts.",
    icon: '🧁',
    sweetness: 3,
    tags: ['Dark Chocolate', 'Wild Berry', 'Gothic Sweet'],
    favoriteOf: 'Kuromi',
    prepTime: '4 mins'
  },
  {
    id: 'menu_keroppi_donut',
    name: 'Keroppi Matcha Pond Glazed Donut',
    category: 'pastry',
    priceCoins: 40,
    description: "Soft raised yeast donut coated in fragrant ceremonial Uji matcha glaze with rainbow sugar sprinkles.",
    icon: '🍩',
    sweetness: 3,
    tags: ['Matcha', 'Crisp Glaze', 'Vegetarian'],
    favoriteOf: 'Keroppi',
    prepTime: '2 mins'
  },
  {
    id: 'menu_kitty_boba',
    name: 'Hello Kitty Strawberry Cream Boba Tea',
    category: 'drink',
    priceCoins: 50,
    description: "Chilled Ceylon black milk tea blended with fresh strawberry puree, organic whole milk, and slow-simmered brown sugar pearls.",
    icon: '🧋',
    sweetness: 5,
    tags: ['Chilled', 'Chewy Boba', 'Creamy'],
    favoriteOf: 'Hello Kitty',
    prepTime: '3 mins'
  },
  {
    id: 'menu_cloud_latte',
    name: 'Cinnamoroll Fluffy Cloud Vanilla Latte',
    category: 'drink',
    priceCoins: 45,
    description: "Espresso combined with steamed Madagascar vanilla milk and piled high with pillowy cloud foam resembling Cinnamoroll's tail.",
    icon: '☕',
    sweetness: 3,
    tags: ['Warm Coffee', 'Artisan Foam', 'Aromatic'],
    favoriteOf: 'Cinnamoroll',
    prepTime: '3 mins'
  },
  {
    id: 'menu_ribbon_parfait',
    name: 'Sanrio Ribbon Festival Parfait',
    category: 'dessert',
    priceCoins: 75,
    description: "Tall glass layered with strawberry jelly, corn flakes crunch, soft-serve ice cream, macarons, and red ribbon sugar wafer.",
    icon: '🍨',
    sweetness: 5,
    tags: ['Grand Dessert', 'Multi-Layer', 'Festival Special'],
    favoriteOf: 'All Friends',
    prepTime: '6 mins'
  }
];

export const VILLAGE_LANDMARKS = [
  {
    id: 'anniversary_gazebo',
    name: 'Anniversary Sunset Rose Gazebo & Wish Bridge',
    icon: '🌟',
    description: 'A charming pastel pavilion adorned with pink rose arches, warm lanterns, and a golden friendship fence where companions lock friendship padlocks to celebrate their anniversaries.',
    hours: 'Open 24/7 for Stargazing & Hangouts',
    specialty: 'Friendship Locks, Heart Cakes & Sunset Wishes',
    visitors: 'Best Friends Celebrating 1 Year, Dear Daniel & Kitty'
  },
  {
    id: 'cottage_bakery',
    name: "Hello Kitty's Cottage & Bakery",
    icon: '🏡',
    description: 'The warm heart of the village filled with the sweet aroma of freshly baked apple pies and bubbling tea kettles.',
    hours: 'Open Daily 8:00 AM - 8:00 PM',
    specialty: 'Mama\'s Apple Pie & Ribbon Boba',
    visitors: 'Hello Kitty, Mimmy, Mama & Papa'
  },
  {
    id: 'apple_orchard',
    name: "Grandpa's Honey Apple Orchard",
    icon: '🍎',
    description: 'A sunlit grove of sprawling red apple trees where crisp honey apples, golden stars, and ribbon fruit are harvested.',
    hours: 'Sunrise to Sunset',
    specialty: 'Apple Picking & Rainbow Fever Gatherings',
    visitors: 'Hello Kitty, Joey the Mouse, Rory the Squirrel'
  },
  {
    id: 'mariland_meadow',
    name: "My Melody's Blossom Meadow",
    icon: '🌷',
    description: 'Rolling hills blanketed in pastel pink roses, wild strawberries, and sweet almond trees where My Melody picnicks.',
    hours: 'Always Peaceful',
    specialty: 'Fresh Strawberries & Almond Pound Cake',
    visitors: 'My Melody, Flat the Blue Mouse, Piano the Sheep'
  },
  {
    id: 'donut_pond',
    name: "Keroppi's Donut Pond",
    icon: '🐸',
    description: 'A sparkling freshwater pond shaped like a giant donut ring with giant floating lilypads and singing frogs.',
    hours: 'Splashing All Day',
    specialty: 'Matcha Iced Green Tea & Lilypad Donuts',
    visitors: 'Keroppi, Pikki, Koroppi, Teruteru'
  },
  {
    id: 'cloud_observatory',
    name: "Cinnamoroll's Starlight Cloud Terrace",
    icon: '☁️',
    description: 'A dreamy terrace floating high above the clouds where Cinnamoroll and friends watch shooting stars and sip fluffy lattes.',
    hours: 'Evening & Starry Nights',
    specialty: 'Cloud Vanilla Lattes & Star Sugar Buns',
    visitors: 'Cinnamoroll, Chiffon, Mocha, Espresso, Cappuccino'
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb_anniversary_daniel',
    author: 'Dear Daniel 🤵',
    message: 'Happy 1st Anniversary to the coolest, most wonderful duo in the whole world! 365 days of epic adventures and sharing smiles. Wishing you endless years of pure fun and memories! 🌟🎉',
    sticker: '⭐',
    date: 'Today',
    friendId: 'kitty'
  },
  {
    id: 'gb_anniversary_melody',
    author: 'My Melody 🌸',
    message: 'Happy 1 Year Anniversary! Mama baked an extra-special double strawberry star shortcake for the two of you! You make the best team ever! 🍓✨',
    sticker: '🎀',
    date: 'Today',
    friendId: 'melody'
  },
  {
    id: 'gb_anniversary_cinnamo',
    author: 'Cinnamoroll ☁️',
    message: 'I flew up into the highest clouds to scatter golden stardust for your 1-year anniversary! You two always have so much fun together! 🌟',
    sticker: '⭐',
    date: 'Yesterday',
    friendId: 'cinnamoroll'
  },
  {
    id: 'gb_anniversary_kuromi',
    author: 'Kuromi 🖤',
    message: 'Hmph! 365 days of being inseparable besties? I wrote a super cool tribute for your anniversary in my secret notebook, but do NOT tell anyone! You guys rock! 🎀',
    sticker: '🖤',
    date: 'Yesterday',
    friendId: 'kuromi'
  },
  {
    id: 'gb_anniversary_purin',
    author: 'Pompompurin 🍮',
    message: 'A whole year together calls for an extra-large custard pudding! May your journey ahead be as sweet and golden as caramel! 🍮',
    sticker: '🎀',
    date: '2 days ago',
    friendId: 'purin'
  }
];

export const DEFAULT_COUPLE_PROFILE: CoupleProfile = {
  partner1: 'Tafeh',
  partner2: 'Tafeha',
  anniversaryDate: '2025-10-15',
  customNote: 'n3mbou zinek :D,mkch harba muhehehe 😈',
  loveLockLocked: true,
  cakeCelebrated: false
};

export const ANNIVERSARY_MILESTONES: AnniversaryMilestone[] = [
  {
    id: 'm_day1',
    dayOrMonth: 'Day 1 • October 15',
    title: 'Where Our Journey Began ✨',
    description: 'The first day we met and decided to hang out. Big smiles, endless laughs, and knowing right away that we would be the best team ever.',
    icon: '🎀',
    category: 'milestone',
    dateStr: 'Day 1'
  },
  {
    id: 'm_month1',
    dayOrMonth: '1 Month • November',
    title: 'First Month of Non-Stop Laughs 🌟',
    description: 'Sending funny memes every single day, late-night chats talking about everything and nothing, and making our very first hangout plans.',
    icon: '💌',
    category: 'milestone',
    dateStr: 'Month 1'
  },
  {
    id: 'm_month3',
    dayOrMonth: '3 Months • January',
    title: 'Our First Roadtrip & Inside Jokes 🚗',
    description: 'Singing songs off-key at the top of our lungs with the windows cracked open, finding cute roadside cafes, and creating our legendary inside jokes.',
    icon: '☕',
    category: 'adventure',
    dateStr: 'Month 3'
  },
  {
    id: 'm_month6',
    dayOrMonth: '6 Months • April',
    title: 'Half a Year of Sweet Memories 🍓',
    description: 'Halfway to our 1-year mark! Having a blast sharing snacks, hanging out, and realizing we are completely on the same wavelength.',
    icon: '🏡',
    category: 'milestone',
    dateStr: 'Month 6'
  },
  {
    id: 'm_month9',
    dayOrMonth: '9 Months • July',
    title: 'True Friends & Unstoppable Team 🛡️',
    description: 'Supporting each other through busy work days and stressful weeks. Knowing you always have my back no matter what.',
    icon: '🌟',
    category: 'cozy',
    dateStr: 'Month 9'
  },
  {
    id: 'm_year1',
    dayOrMonth: '365 Days • Today!',
    title: 'Happy 1st Anniversary! 🌟',
    description: '365 days of pure happiness, 8,760 hours of warm smiles, and 525,600 minutes together. Thank you for being the most amazing friend and partner!',
    icon: '⭐',
    category: 'anniversary',
    dateStr: '1 Year!'
  }
];

export const COUPLE_BUCKET_LIST: BucketListItem[] = [
  { id: 'b1', title: 'ndourou fi il mahdiaa', category: 'Adventures', completed: false },
  { id: 'b2', title: 'nmchu lil soug ;)', category: 'Adventures', completed: false },
  { id: 'b3', title: 'nokl mn makeltk', category: 'Food', completed: false },
  { id: 'b4', title: 'tokli mn makelti 😊🤞', category: 'Food', completed: false },
  { id: 'b5', title: 'twali tokli 3la ro7k wa tochrbi il ma 💧', category: 'Care', completed: false },
  { id: 'b6', title: 'n7ki m3a sabah bi tari9aten ma 🤷‍♂️', category: 'Fun', completed: false },
  { id: 'b7', title: 'n9ru 3la rwa7na wa na3mlu ili n7bu 3lih 🙏', category: 'Goals', completed: false }
];

export const ANNIVERSARY_REASONS: string[] = [
  "The way your eyes crinkle with pure happiness when you laugh out loud 🌟",
  "How you always remember my favorite treats and coffee orders ☕",
  "How we can talk for hours about absolute nonsense and never get bored 🎈",
  "How safe and happy I feel whenever we hang out and catch up 🤗",
  "Your hilarious, goofy side that always makes me laugh until my stomach hurts 🤣",
  "How supportive you are of my dreams, always cheering me on like a #1 fan 🌟",
  "The way you make ordinary grocery store runs feel like an epic adventure 🛒",
  "How we always seem to know what the other is thinking with just one glance 👀",
  "How patient and understanding you are, even on my most stressful days 🌸",
  "How we share snacks, french fries, and desserts without even asking 🍟",
  "How we can burst out laughing just by making eye contact across a crowded room 😂",
  "The random hilarious memes and cheerful check-in messages you send in the middle of the day 💌",
  "How effortlessly you make every single day brighter and more fun just by being around ✨",
  "The fact that 365 days later, hanging out with you is still the highlight of my week 🌈",
  "Because you are the best companion, partner-in-crime, and friend in the whole universe 🌟"
];

export const INGREDIENTS_DATA: Ingredient[] = [
  { id: 'crust', name: 'Flaky Crust Base', icon: '🥧', color: '#e0a96d', category: 'base' },
  { id: 'sponge', name: 'Fluffy Sponge Cake', icon: '🍰', color: '#ffea79', category: 'base' },
  { id: 'dough', name: 'Glazed Donut Ring', icon: '🍩', color: '#d4a373', category: 'base' },
  { id: 'custard', name: 'Golden Custard Flan', icon: '🍮', color: '#fca311', category: 'base' },
  { id: 'cup', name: 'Pastel Boba Cup', icon: '🧋', color: '#ffd6a5', category: 'base' },

  { id: 'apple', name: 'Fresh Honey Crisp Apple', icon: '🍎', color: '#e63946', category: 'flavor' },
  { id: 'strawberry', name: 'Sweet Ripe Strawberry', icon: '🍓', color: '#ff4d6d', category: 'flavor' },
  { id: 'cinnamon', name: 'Warm Cinnamon Spice', icon: '🪵', color: '#9c6644', category: 'flavor' },
  { id: 'matcha', name: 'Zen Matcha Cream', icon: '🍵', color: '#74c69d', category: 'flavor' },
  { id: 'blackberry', name: 'Dark Wild Blackberry', icon: '🫐', color: '#480ca8', category: 'flavor' },
  { id: 'caramel', name: 'Warm Golden Caramel', icon: '🍯', color: '#b07d62', category: 'flavor' },

  { id: 'cream', name: 'Swirled Whipped Cream', icon: '🧁', color: '#f8f9fa', category: 'topping' },
  { id: 'chocolate', name: 'Rich Chocolate Ganache', icon: '🍫', color: '#4a2810', category: 'topping' },
  { id: 'pearls', name: 'Chewy Boba Pearls', icon: '🧋', color: '#2b2b2b', category: 'topping' },

  { id: 'ribbon', name: 'Kitty Red Bow Garnish', icon: '🎀', color: '#e63946', category: 'garnish' },
  { id: 'heart', name: 'Melody Sugar Heart', icon: '💖', color: '#ff70a6', category: 'garnish' },
  { id: 'star', name: 'Cinnamoroll Star Sparkle', icon: '⭐', color: '#ffb703', category: 'garnish' },
  { id: 'cherry', name: 'Glistening Ruby Cherry', icon: '🍒', color: '#d90429', category: 'garnish' }
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'recipe_apple_pie',
    name: "Mama's Classic Apple Pie",
    description: 'Hello Kitty\'s signature freshly-baked apple pie made with care and sweetness.',
    targetCustomer: 'kitty',
    requiredIngredients: ['crust', 'apple', 'cinnamon', 'ribbon'],
    rewardCoins: 45,
    rewardExp: 30,
    icon: '🥧',
    difficulty: 'easy'
  },
  {
    id: 'recipe_strawberry_shortcake',
    name: 'My Melody Strawberry Delight',
    description: 'Fluffy sponge cake layered with sweet cream and ripe red berries.',
    targetCustomer: 'melody',
    requiredIngredients: ['sponge', 'strawberry', 'cream', 'heart'],
    rewardCoins: 50,
    rewardExp: 35,
    icon: '🍰',
    difficulty: 'easy'
  },
  {
    id: 'recipe_cinnamon_roll',
    name: 'Cinnamoroll Cloud Bun',
    description: 'Soft cinnamon pastry topped with whipped cloud cream and a golden star.',
    targetCustomer: 'cinnamoroll',
    requiredIngredients: ['crust', 'cinnamon', 'cream', 'star'],
    rewardCoins: 55,
    rewardExp: 40,
    icon: '🥮',
    difficulty: 'medium'
  },
  {
    id: 'recipe_purin_flan',
    name: 'Purin Caramel Custard',
    description: 'Jiggly custard drenched in homemade amber caramel and topped with a cherry.',
    targetCustomer: 'purin',
    requiredIngredients: ['custard', 'caramel', 'cream', 'cherry'],
    rewardCoins: 60,
    rewardExp: 45,
    icon: '🍮',
    difficulty: 'medium'
  },
  {
    id: 'recipe_kuromi_tart',
    name: 'Kuromi Midnight Blackberry Tart',
    description: 'Decadent chocolate crust infused with wild blackberries and sweet cream.',
    targetCustomer: 'kuromi',
    requiredIngredients: ['crust', 'blackberry', 'chocolate', 'heart'],
    rewardCoins: 65,
    rewardExp: 50,
    icon: '🧁',
    difficulty: 'medium'
  },
  {
    id: 'recipe_keroppi_donut',
    name: 'Keroppi Matcha Pond Donut',
    description: 'Fresh glazed donut ring dipped in fragrant green tea matcha glaze.',
    targetCustomer: 'keroppi',
    requiredIngredients: ['dough', 'matcha', 'cream', 'star'],
    rewardCoins: 55,
    rewardExp: 40,
    icon: '🍩',
    difficulty: 'easy'
  },
  {
    id: 'recipe_kitty_boba',
    name: 'Hello Kitty Strawberry Boba Tea',
    description: 'Chilled sweet milk tea with fresh strawberry syrup and signature ribbon.',
    targetCustomer: 'kitty',
    requiredIngredients: ['cup', 'strawberry', 'pearls', 'ribbon'],
    rewardCoins: 70,
    rewardExp: 55,
    icon: '🧋',
    difficulty: 'master'
  }
];

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // Bows & Headwear
  { id: 'bow_classic', category: 'bow', name: 'Classic Red Bow', icon: '🎀', cost: 0, unlocked: true, colorHex: '#e63946' },
  { id: 'bow_polka', category: 'bow', name: 'Pink Polka Dot Bow', icon: '🎀', cost: 120, unlocked: false, colorHex: '#ff758f' },
  { id: 'bow_chef', category: 'bow', name: 'Little Chef Toque', icon: '👨‍🍳', cost: 180, unlocked: false, colorHex: '#ffffff' },
  { id: 'bow_crown', category: 'bow', name: 'Golden Princess Tiara', icon: '👑', cost: 350, unlocked: false, colorHex: '#ffd166' },
  { id: 'bow_flowers', category: 'bow', name: 'Blossom Flower Crown', icon: '🌸', cost: 220, unlocked: false, colorHex: '#ff99c8' },
  { id: 'bow_gothic', category: 'bow', name: 'Midnight Kuromi Bow', icon: '🖤', cost: 260, unlocked: false, colorHex: '#4a154b' },

  // Outfits
  { id: 'outfit_classic', category: 'outfit', name: 'Classic Blue Overalls', icon: '👖', cost: 0, unlocked: true, colorHex: '#2b59c3' },
  { id: 'outfit_apron', category: 'outfit', name: 'Sweet Bakery Apron', icon: '🎽', cost: 150, unlocked: false, colorHex: '#ff4d6d' },
  { id: 'outfit_strawberry', category: 'outfit', name: 'Strawberry Ruffle Dress', icon: '👗', cost: 280, unlocked: false, colorHex: '#ff85a1' },
  { id: 'outfit_kimono', category: 'outfit', name: 'Cherry Blossom Yukata', icon: '👘', cost: 400, unlocked: false, colorHex: '#f4a261' },
  { id: 'outfit_princess', category: 'outfit', name: 'Royal Pastel Gown', icon: '✨', cost: 500, unlocked: false, colorHex: '#cdb4db' },
  { id: 'outfit_sweater', category: 'outfit', name: 'Cozy Cloud Sweater', icon: '🧥', cost: 200, unlocked: false, colorHex: '#a2d2ff' },

  // Handheld items
  { id: 'hand_apple', category: 'handheld', name: 'Crisp Red Apple', icon: '🍎', cost: 0, unlocked: true },
  { id: 'hand_pie', category: 'handheld', name: 'Warm Apple Pie Slice', icon: '🥧', cost: 100, unlocked: false },
  { id: 'hand_whisk', category: 'handheld', name: 'Golden Baker Whisk', icon: '🥄', cost: 140, unlocked: false },
  { id: 'hand_teddy', category: 'handheld', name: 'Tiny Chum Bear Plush', icon: '🧸', cost: 260, unlocked: false },
  { id: 'hand_boba', category: 'handheld', name: 'Strawberry Boba Cup', icon: '🧋', cost: 200, unlocked: false },
  { id: 'hand_wand', category: 'handheld', name: 'Magic Ribbon Wand', icon: '🪄', cost: 380, unlocked: false },

  // Backgrounds
  { id: 'bg_bakery', category: 'background', name: 'Cozy Cottage Bakery', icon: '🏡', cost: 0, unlocked: true },
  { id: 'bg_anniversary_gazebo', category: 'background', name: 'Anniversary Sunset Rose Gazebo', icon: '🌅', cost: 0, unlocked: true },
  { id: 'bg_garden', category: 'background', name: 'Pastel Rose Tea Garden', icon: '🌷', cost: 150, unlocked: false },
  { id: 'bg_tokyo', category: 'background', name: 'Tokyo Rainbow Arcade', icon: '🌆', cost: 300, unlocked: false },
  { id: 'bg_starry', category: 'background', name: 'Cinnamoroll Star Sky', icon: '🌌', cost: 320, unlocked: false },
  { id: 'bg_bedroom', category: 'background', name: 'Kawaii Pink Bedroom', icon: '🎀', cost: 240, unlocked: false },

  // Anniversary Special Items
  { id: 'bow_anniversary_tiara', category: 'bow', name: 'Anniversary Sparkling Tiara', icon: '👑', cost: 0, unlocked: true, colorHex: '#ffd700' },
  { id: 'outfit_wedding_dress', category: 'outfit', name: 'Anniversary Sparkling Celebration Dress', icon: '👗', cost: 200, unlocked: false, colorHex: '#fff0f5' },
  { id: 'hand_rose_bouquet', category: 'handheld', name: 'Anniversary Red Rose Bouquet', icon: '💐', cost: 0, unlocked: true }
];

export const DECOR_ITEMS: DecorItem[] = [
  { id: 'wall_pink_gingham', category: 'wallpaper', name: 'Pink Gingham Check', cost: 0, unlocked: true, icon: '🪟', previewColor: '#ffe5ec' },
  { id: 'wall_anniversary_hearts', category: 'wallpaper', name: '1st Anniversary Golden Stars & Ribbons', cost: 0, unlocked: true, icon: '🌟', previewColor: '#fff0f3' },
  { id: 'wall_strawberry', category: 'wallpaper', name: 'Sweet Berry Vines', cost: 120, unlocked: false, icon: '🍓', previewColor: '#ffccd5' },
  { id: 'wall_cloud', category: 'wallpaper', name: 'Fluffy Blue Sky', cost: 180, unlocked: false, icon: '☁️', previewColor: '#d8f3dc' },
  { id: 'wall_lavender', category: 'wallpaper', name: 'Lavender Starlight', cost: 240, unlocked: false, icon: '✨', previewColor: '#e0c3fc' },

  { id: 'floor_wood', category: 'flooring', name: 'Honey Oak Parquet', cost: 0, unlocked: true, icon: '🪵', previewColor: '#ddb892' },
  { id: 'floor_tile', category: 'flooring', name: 'Checkerboard Pastel Tiles', cost: 100, unlocked: false, icon: '🏁', previewColor: '#faedcd' },
  { id: 'floor_pink_carpet', category: 'flooring', name: 'Fluffy Strawberry Carpet', cost: 220, unlocked: false, icon: '🧶', previewColor: '#ffb3c6' },

  { id: 'table_ribbon', category: 'table', name: 'Red Ribbon Dining Table', cost: 0, unlocked: true, icon: '🪑', previewColor: '#ff4d6d' },
  { id: 'table_anniversary_candle', category: 'table', name: 'Anniversary Candlelight Table', cost: 0, unlocked: true, icon: '🕯️', previewColor: '#ffe5ec' },
  { id: 'table_marble', category: 'table', name: 'Pastel Cafe Marble Table', cost: 160, unlocked: false, icon: '☕', previewColor: '#e9ecef' },
  { id: 'table_picnic', category: 'table', name: 'Garden Wood Picnic Table', cost: 250, unlocked: false, icon: '🧺', previewColor: '#cb997e' },

  { id: 'plush_kitty', category: 'plushie', name: 'Jumbo Hello Kitty Plushie', cost: 0, unlocked: true, icon: '🐱', previewColor: '#ffffff' },
  { id: 'plush_melody', category: 'plushie', name: 'Sweet My Melody Plushie', cost: 180, unlocked: false, icon: '🐰', previewColor: '#ff758f' },
  { id: 'plush_cinnamo', category: 'plushie', name: 'Fluffy Cinnamoroll Plushie', cost: 220, unlocked: false, icon: '🐶', previewColor: '#a2d2ff' },
  { id: 'plush_purin', category: 'plushie', name: 'Cozy Pompompurin Plushie', cost: 220, unlocked: false, icon: '🍮', previewColor: '#ffbe0b' },
  { id: 'plush_kuromi', category: 'plushie', name: 'Jester Kuromi Plushie', cost: 250, unlocked: false, icon: '🖤', previewColor: '#7209b7' }
];

export const INITIAL_GAME_STATE: GameState = {
  ribbonCoins: 520,
  strawberryGems: 30,
  highScoreCatcher: 0,
  applesHarvested: 0,
  ordersFulfilled: 0,
  soundEnabled: true,
  musicEnabled: true,
  activeMusicTrack: 'anniversary_love',
  unlockedItems: [
    'bow_classic', 
    'bow_anniversary_tiara',
    'outfit_classic', 
    'hand_apple', 
    'hand_rose_bouquet',
    'bg_bakery', 
    'bg_anniversary_gazebo',
    'wall_pink_gingham', 
    'wall_anniversary_hearts',
    'floor_wood', 
    'table_ribbon', 
    'table_anniversary_candle',
    'plush_kitty'
  ],
  activeBow: 'bow_anniversary_tiara',
  activeOutfit: 'outfit_classic',
  activeHandheld: 'hand_rose_bouquet',
  activeBackground: 'bg_anniversary_gazebo',
  cafeWallpaper: 'wall_anniversary_hearts',
  cafeFloor: 'floor_wood',
  cafeTable: 'table_anniversary_candle',
  cafePlushie: 'plush_kitty',
  album: [
    {
      id: 'photo_anniversary_default',
      date: 'Today • 1 Year',
      caption: 'Happy 1st Anniversary! 365 days together, and ready for many more adventures ahead! 🌟',
      outfit: {
        bowId: 'bow_anniversary_tiara',
        outfitId: 'outfit_classic',
        handheldId: 'hand_rose_bouquet',
        bgId: 'bg_anniversary_gazebo'
      },
      sticker: '💖'
    }
  ],
  guestbook: INITIAL_GUESTBOOK,
  coupleProfile: DEFAULT_COUPLE_PROFILE,
  bucketList: COUPLE_BUCKET_LIST
};

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==================== HOME & LIVING ====================
  {
    id: 'prod-001',
    slug: 'artisan-terracotta-fluted-vase',
    name: 'Artisan Fluted Terracotta Vase',
    tagline: 'Hand-thrown sculptural vase with warm matte mineral finish',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 2490,
    originalPrice: 2990,
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Individually wheel-thrown using locally sourced clay and fired at low temperatures for a velvety, tactile finish.',
    description: 'Each fluted vase is handcrafted by master potters, celebrating organic imperfections and natural tonal shifts in the earthen clay. Its generous fluted neck gently supports dried botanicals, branches, or fresh seasonal foliage.',
    features: [
      'Handcrafted on a traditional potter’s wheel',
      'Matte natural terracotta finish with unglazed exterior',
      'Waterproof interior sealing suitable for fresh flowers',
      'Protective felt pads on the base to safeguard wooden surfaces'
    ],
    specs: {
      'Material': '100% Natural Earthenware Clay',
      'Dimensions': 'Height: 24 cm | Base Diameter: 14 cm',
      'Weight': '1.3 kg',
      'Care': 'Wipe clean with a damp cotton cloth'
    },
    variants: [
      {
        id: 'var-finish',
        name: 'Finish',
        options: ['Raw Terracotta', 'Sand White', 'Smoked Charcoal']
      }
    ],
    inStock: true,
    stockCount: 14,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 38,
    keywords: ['vase', 'terracotta', 'pottery', 'ceramic', 'decor', 'home decor', 'fluted vase', 'artisan']
  },
  {
    id: 'prod-002',
    slug: 'pure-linen-waffle-throw-blanket',
    name: 'Pure French Linen Waffle Throw',
    tagline: 'Heavyweight pre-washed linen with honeycomb texture',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 3850,
    originalPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Loom-woven from flax with an airy waffle weave that offers breathable warmth through every season.',
    description: 'Our signature waffle throw is stonewashed for an exceptionally soft hand-feel from day one. Draped over a reading chair or styled on the foot of the bed, its natural drape and understated fringe trim bring serene tactile depth to your bedroom or living space.',
    features: [
      '100% Certified European Flax Linen',
      'Naturally hypoallergenic, thermoregulating and moisture-wicking',
      'Garment-washed for vintage softness and zero shrinkage',
      'Finished with delicate hand-pulled fringe edges'
    ],
    specs: {
      'Dimensions': '130 cm × 180 cm',
      'Weight': '850 g',
      'Origin': 'Ethically woven in Kerala, India',
      'Care': 'Gentle machine wash cold with eco-friendly detergent'
    },
    variants: [
      {
        id: 'var-color',
        name: 'Color',
        options: ['Oatmeal', 'Earthy Ochre', 'Faded Olive', 'Dusk Rose']
      }
    ],
    inStock: true,
    stockCount: 19,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 24,
    keywords: ['throw', 'blanket', 'linen', 'waffle', 'bedding', 'living room', 'soft furnishings']
  },
  {
    id: 'prod-003',
    slug: 'solid-brass-minimalist-candleholder',
    name: 'Cast Brass Taper Candleholder',
    tagline: 'Architectural weighted candleholder with a living patina',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 1890,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Solid sand-cast brass with clean geometric lines that balance timeless heritage with modern simplicity.',
    description: 'Cast by fourth-generation metalsmiths in Moradabad, this weighted taper holder cradles standard taper candles securely. Left unlacquered, the untreated brass slowly develops a rich, organic patina over time that tells the story of your home.',
    features: [
      'Solid virgin brass with substantial weighted base',
      'Unlacquered finish that deepens naturally with age',
      'Snug fit for standard 20–22mm taper candles',
      'Includes cork lining on base to protect tables'
    ],
    specs: {
      'Material': 'Solid Cast Brass',
      'Dimensions': 'Height: 12 cm | Base: 7.5 cm',
      'Weight': '620 g',
      'Care': 'Polish occasionally with lemon & baking soda, or let patina naturally'
    },
    variants: [
      {
        id: 'var-size',
        name: 'Height',
        options: ['Low (10 cm)', 'Medium (15 cm)', 'Tall (20 cm)']
      }
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 42,
    keywords: ['brass', 'candleholder', 'candlestick', 'decor', 'metalwork', 'dining table']
  },
  {
    id: 'prod-004',
    slug: 'sculptural-travertine-catchall-dish',
    name: 'Honed Travertine Catchall Dish',
    tagline: 'Solid natural stone bowl with organic porous veining',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 2150,
    originalPrice: 2600,
    images: [
      'https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Carved from a single block of natural beige travertine, featuring unique stone cavities and matte honed finish.',
    description: 'An understated centerpiece for nightstands, entryway consoles, or bathroom vanity counters. Ideal for holding everyday jewelry, keys, or sacred botanical trinkets. Every piece reveals one-of-a-kind sedimentary layering.',
    features: [
      'Solid honed Italian travertine stone',
      'Sculptural curved concave interior profile',
      'Silicone non-scratch bumper feet on base',
      'Distinct natural veining—no two pieces are identical'
    ],
    specs: {
      'Material': 'Natural Honed Travertine Stone',
      'Diameter': '16 cm | Height: 3.5 cm',
      'Weight': '950 g',
      'Care': 'Clean with pH-neutral stone cleaner or dry microfiber cloth'
    },
    inStock: true,
    stockCount: 11,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 19,
    keywords: ['travertine', 'dish', 'tray', 'catchall', 'stone', 'marble', 'entryway', 'jewelry dish']
  },
  {
    id: 'prod-005',
    slug: 'handwoven-jute-cotton-area-runner',
    name: 'Braided Jute & Organic Cotton Runner',
    tagline: 'Textured hallway runner crafted on heritage handlooms',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 3200,
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Durable golden jute fibers intermeshed with soft unbleached cotton threads for everyday high-traffic spaces.',
    description: 'Handcrafted by artisan weavers in Rajasthan, this runner weaves sturdy natural jute with soft raw cotton to give your hallway, kitchen, or bedside cozy visual structure that withstands daily footsteps.',
    features: [
      'Natural biodegradable golden jute and recycled cotton yarn',
      'Reversible flatweave construction',
      'Dense tight weave that resists shedding',
      'Naturally dirt-resistant and hard-wearing'
    ],
    specs: {
      'Size': '60 cm × 180 cm (2 ft × 6 ft)',
      'Thickness': '8 mm',
      'Weight': '2.1 kg',
      'Care': 'Regular vacuuming; spot clean damp spills immediately'
    },
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 15,
    keywords: ['rug', 'runner', 'jute', 'carpet', 'hallway', 'cotton', 'handwoven']
  },
  {
    id: 'prod-006',
    slug: 'walnut-arch-curved-wall-mirror',
    name: 'Handcrafted Walnut Arch Vanity Mirror',
    tagline: 'Warm solid American walnut frame with distortion-free bevelled glass',
    category: 'Home & Living',
    categoryId: 'home-living',
    price: 4950,
    originalPrice: 5800,
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Gentle arched profile steam-bent from solid kiln-dried walnut wood, treated with organic citrus and beeswax oil.',
    description: 'Brighten intimate powder rooms, bedrooms, or dressing alcoves. This mirror softens rigid geometric corners with its graceful arch while reflecting ambient light throughout your interior.',
    features: [
      'Solid kiln-dried American walnut frame',
      'Premium 4mm copper-free silvered mirror',
      'Integrated heavy-duty French cleat mounting hardware',
      'Finished with food-safe non-toxic matte wax'
    ],
    specs: {
      'Dimensions': '45 cm × 70 cm',
      'Depth': '2.5 cm',
      'Weight': '3.4 kg',
      'Installation': 'Wall-mount (hardware included) or resting'
    },
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 16,
    keywords: ['mirror', 'walnut', 'wood', 'arch mirror', 'vanity', 'wall decor']
  },

  // ==================== WELLNESS & FRAGRANCE ====================
  {
    id: 'prod-007',
    slug: 'amber-sandalwood-botanical-soy-candle',
    name: 'Amber & Mysore Sandalwood Botanical Candle',
    tagline: 'Small-batch hand-poured soy wax in an amber glass jar',
    category: 'Wellness & Fragrance',
    categoryId: 'wellness-fragrance',
    price: 1250,
    originalPrice: 1490,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Warm golden amber, creamy aged Mysore sandalwood, and hints of smoky vetiver and wild patchouli.',
    description: 'Hand-poured in small batches of 30 using 100% plant-based soy wax and therapeutic-grade essential oils. Features an unbleached wooden wick that emits a gentle soothing crackle reminiscent of an open hearth.',
    features: [
      '100% natural GMO-free soy wax',
      'FSC-certified dual wooden wick with soothing crackle',
      'Approx. 55 hours of clean, soot-free burn time',
      'Reusable apothecary amber glass jar with screw brass lid'
    ],
    specs: {
      'Volume': '260 g / 9.2 oz',
      'Burn Time': '50 - 55 hours',
      'Fragrance Notes': 'Top: Bergamot; Mid: Golden Amber; Base: Mysore Sandalwood & Cedar'
    },
    variants: [
      {
        id: 'var-wick',
        name: 'Wick Type',
        options: ['Crackling Wood Wick', 'Organic Cotton Wick']
      }
    ],
    inStock: true,
    stockCount: 35,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 64,
    keywords: ['candle', 'scented candle', 'soy candle', 'sandalwood', 'amber', 'wellness', 'fragrance']
  },
  {
    id: 'prod-008',
    slug: 'ceramic-cold-mist-ultrasonic-diffuser',
    name: 'Ceramic Ultrasonic Stone Aroma Diffuser',
    tagline: 'Matte stoneware cover with whisper-quiet mist diffusion',
    category: 'Wellness & Fragrance',
    categoryId: 'wellness-fragrance',
    price: 3490,
    originalPrice: 3990,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Elevate your space with cool ultrasonic botanical vapor enclosed in a tactile sculptural ceramic silhouette.',
    description: 'Combines the functionality of a humidifier and aroma diffuser with the elegance of a gallery sculpture. Uses 2.4 MHz ultrasonic vibrations to disperse pure essential oils into micro-droplets without heat degradation.',
    features: [
      'Sculpted matte porcelain stone exterior shell',
      'Dual mist modes: Continuous (4 hrs) & Intermittent (8 hrs)',
      'Subtle warm ambient LED glow (can operate independently)',
      'Automatic dry-run safety shutoff'
    ],
    specs: {
      'Capacity': '120 ml water reservoir',
      'Power': 'Type-C USB cable included (DC 5V/2A)',
      'Coverage': 'Up to 350 sq. ft.',
      'Dimensions': '10 cm × 18 cm'
    },
    variants: [
      {
        id: 'var-shade',
        name: 'Ceramic Shade',
        options: ['Alabaster White', 'Smoky Quartz', 'Terracotta Blush']
      }
    ],
    inStock: true,
    stockCount: 18,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 31,
    keywords: ['diffuser', 'essential oils', 'ultrasonic diffuser', 'aromatherapy', 'ceramic diffuser', 'wellness']
  },
  {
    id: 'prod-009',
    slug: 'himalayan-pink-salt-lavender-bath-soak',
    name: 'Botanical Himalayan Salt & Lavender Bath Soak',
    tagline: 'Mineral-rich restorative soak with French lavender blossoms',
    category: 'Wellness & Fragrance',
    categoryId: 'wellness-fragrance',
    price: 990,
    images: [
      'https://images.unsplash.com/photo-1512290900672-1f41399cc1b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Coarse raw pink crystals infused with French highland lavender buds, Epsom salts, and cold-pressed jojoba.',
    description: 'Dissolve two generous scoops into a warm running bath or foot bowl to melt away physical tension, soothe tired muscles, and envelop your evening in restorative, calming aromatherapy.',
    features: [
      'Unrefined, hand-harvested pink rock crystals',
      'High magnesium Epsom base to relax muscle fatigue',
      'No synthetic fragrance, parabens, or artificial dyes',
      'Comes with handcrafted bamboo measuring spoon'
    ],
    specs: {
      'Net Weight': '450 g / 15.8 oz',
      'Packaging': 'Reusable glass apothecary jar with aluminium cap',
      'Skin Type': 'Suitable for all skin types'
    },
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 27,
    keywords: ['bath salt', 'lavender', 'himalayan salt', 'epsom', 'spa', 'bath soak', 'relaxation']
  },
  {
    id: 'prod-010',
    slug: 'brass-incense-burner-and-cedarwood-sticks',
    name: 'Cast Brass Incense Vault & Cedarwood Set',
    tagline: 'Minimalist burner dish with 30 artisanal herbal incense sticks',
    category: 'Wellness & Fragrance',
    categoryId: 'wellness-fragrance',
    price: 1450,
    images: [
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Solid circular brass burner accompanied by bamboo-core-free charcoal-free botanical incense sticks.',
    description: 'Immerse your morning meditation or evening unwinding in notes of Atlas cedar, sacred frankincense, and warm cardamom. The custom solid brass burner holds sticks firmly while catching falling ash gracefully.',
    features: [
      'Solid spun brass dish with multi-gauge center aperture',
      'Includes cylinder box of 30 hand-rolled herbal sticks',
      'Burn time: approx. 45 minutes per stick with pure white ash',
      '100% natural tree resins and dried floral powders'
    ],
    specs: {
      'Dish Diameter': '9 cm | Weight: 210 g',
      'Fragrance Profile': 'Dry Cedarwood, Olibanum Resin & Wild Cardamom',
      'Origin': 'Karnataka, India'
    },
    inStock: true,
    stockCount: 20,
    rating: 4.7,
    reviewCount: 22,
    keywords: ['incense', 'brass burner', 'meditation', 'cedarwood', 'fragrance', 'ritual']
  },
  {
    id: 'prod-011',
    slug: 'organic-cold-pressed-botanical-face-elixir',
    name: 'Golden Radiance Botanical Facial Oil',
    tagline: 'Nutrient-rich youth nectar of rosehip, marula & squalane',
    category: 'Wellness & Fragrance',
    categoryId: 'wellness-fragrance',
    price: 1850,
    originalPrice: 2200,
    images: [
      'https://images.unsplash.com/photo-1608248597359-5612803b8782?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'A silky, fast-absorbing antioxidant powerhouse that locks in deep moisture and delivers a luminous, glass-like glow.',
    description: 'Formulated with organic cold-pressed seed oils rich in essential fatty acids and natural Vitamin C. Non-comedogenic and lightweight, it calms redness while strengthening the skin’s lipid barrier day and night.',
    features: [
      'Cold-pressed Rosehip Seed & Virgin Marula oil',
      'Plant-derived Olive Squalane for rapid absorption',
      'Free from silicones, artificial fragrances, and mineral oils',
      'Bottled in UV-blocking biophotonic violet dropper glass'
    ],
    specs: {
      'Volume': '30 ml / 1.0 fl oz',
      'Expiry': '18 months from manufacturing date',
      'Usage': 'Apply 3-4 drops to cleansed, damp skin'
    },
    inStock: true,
    stockCount: 15,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 49,
    keywords: ['face oil', 'skincare', 'botanical oil', 'rosehip', 'glow', 'elixir', 'clean beauty']
  },

  // ==================== KITCHEN & DINING ====================
  {
    id: 'prod-012',
    slug: 'handcrafted-ceramic-pour-over-coffee-set',
    name: 'Artisan Ceramic Pour-Over & Server Set',
    tagline: 'Glazed stoneware dripper with matching 600ml carafe',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen-dining',
    price: 2750,
    originalPrice: 3200,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Designed for slow morning rituals. Features internal helical ridges for optimal water flow and coffee extraction.',
    description: 'Transform your coffee brewing into a sensory art form. Made from high-fire iron-rich stoneware, it maintains consistent brewing temperatures throughout extraction. Fits standard V60-02 paper filters.',
    features: [
      'High-fired stoneware with speckled oatmeal reactive glaze',
      'Optimized 60-degree cone angle with single large exit hole',
      'Generous 600ml heat-resistant server with dripless pour spout',
      'Microwave and dishwasher safe'
    ],
    specs: {
      'Capacity': '600 ml (2 to 3 cups)',
      'Dimensions': 'Carafe: 12 × 14 cm | Dripper: 11.5 × 9 cm',
      'Weight': '920 g (set)',
      'Glaze': 'Lead-free, food-grade satin glaze'
    },
    variants: [
      {
        id: 'var-glaze',
        name: 'Glaze',
        options: ['Speckled Oatmeal', 'Matte Basalt Black', 'Sage Green']
      }
    ],
    inStock: true,
    stockCount: 16,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 53,
    keywords: ['coffee', 'pour over', 'ceramic dripper', 'carafe', 'kitchen', 'brewing', 'stoneware']
  },
  {
    id: 'prod-013',
    slug: 'hand-carved-teak-wood-salad-servers',
    name: 'Reclaimed Teakwood Serving Pair',
    tagline: 'Hand-carved organic serving fork & spoon from single teak roots',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen-dining',
    price: 1390,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Carved by rural master woodworkers using salvaged teakwood with dense water-resistant grain.',
    description: 'Each piece showcases expressive golden-brown wood grain, silky hand-sanded contours, and an ergonomic curve designed for tossing crisp market greens, pastas, or grain salads.',
    features: [
      'Crafted from responsibly harvested mature Indian teakwood',
      'Finished exclusively with food-safe raw cold-pressed walnut oil',
      'Gentle on ceramic, enameled cast iron, and non-stick cookware',
      'Smooth tapered handles with hanging loop notches'
    ],
    specs: {
      'Length': '28 cm each',
      'Set': 'Includes 1 Serving Spoon & 1 Serving Fork',
      'Weight': '240 g (pair)',
      'Care': 'Hand wash only with mild soap; oil periodically'
    },
    inStock: true,
    stockCount: 26,
    rating: 4.8,
    reviewCount: 29,
    keywords: ['teakwood', 'salad servers', 'wooden utensils', 'kitchenware', 'carved wood', 'tableware']
  },
  {
    id: 'prod-014',
    slug: 'mouth-blown-fluted-highball-glasses',
    name: 'Mouth-Blown Fluted Highball Glassware (Set of 4)',
    tagline: 'Delicate vertical optic ribs crafted from lead-free crystal glass',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen-dining',
    price: 2190,
    originalPrice: 2600,
    images: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Elevate your daily hydration, iced tea, and artisanal cocktails with vintage-inspired fluted glassware.',
    description: 'Individually blown by artisan glassmakers. The delicate vertical fluting plays with ambient sunlight, casting gentle shadows across your dining table. Lightweight in the hand, yet sturdy enough for everyday use.',
    features: [
      'Ultra-clear 100% lead-free crystal glass',
      'Tactile optical fluted ribbing for non-slip grip',
      'Thin, laser-cut smooth rim for pleasant sipping',
      'Dishwasher safe on gentle cycle'
    ],
    specs: {
      'Capacity': '380 ml each',
      'Height': '14 cm | Rim Diameter: 7 cm',
      'Set Count': '4 glasses in gift-ready reinforced box',
      'Weight': '180 g per glass'
    },
    inStock: true,
    stockCount: 14,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 34,
    keywords: ['glassware', 'highball', 'fluted glasses', 'cocktail', 'dining', 'kitchen']
  },
  {
    id: 'prod-015',
    slug: 'stoneware-pasta-shallow-bowls-set',
    name: 'Hand-Glazed Stoneware Pasta Bowls (Set of 2)',
    tagline: 'Wide shallow rim with organic speckled earth glaze',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen-dining',
    price: 1990,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'The versatile bowl-plate hybrid made for creamy risottos, hearty curries, grain bowls, and slow pasta dinners.',
    description: 'Designed with a wide 22 cm shallow base and steep tapered sides that keep sauces contained while displaying food beautifully. Crafted from durable stoneware that holds heat right until the last bite.',
    features: [
      'High-fired stoneware resistant to chipping and cutlery marks',
      'Stackable space-saving profile',
      'Microwave, oven (up to 200°C), and dishwasher safe',
      'Non-toxic 100% food-grade mineral glaze'
    ],
    specs: {
      'Diameter': '22.5 cm | Depth: 4.5 cm',
      'Capacity': '850 ml',
      'Weight': '680 g each',
      'Color': 'Warm Sand & Iron Speckle'
    },
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 41,
    keywords: ['bowls', 'pasta bowl', 'stoneware', 'dinnerware', 'kitchen', 'plates']
  },
  {
    id: 'prod-016',
    slug: 'pure-linen-dining-napkins-set-of-4',
    name: 'Washed French Linen Table Napkins (Set of 4)',
    tagline: 'Casual elegant linen napkins with mitered corners',
    category: 'Kitchen & Dining',
    categoryId: 'kitchen-dining',
    price: 1290,
    originalPrice: 1550,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Supple pre-washed pure linen napkins that grow softer with every dinner and laundry cycle.',
    description: 'Say goodbye to disposable paper napkins. Our reusable pure flax linen napkins bring an understated rustic warmth to family meals, outdoor brunches, and festive dinner parties.',
    features: [
      '100% natural European flax linen',
      'Pre-washed for relaxed texture and shrink resistance',
      'Clean mitered hem corners',
      'Highly absorbent and quick-drying'
    ],
    specs: {
      'Dimensions': '45 cm × 45 cm',
      'Set Count': 'Set of 4 Napkins tied with cotton twine',
      'Care': 'Machine wash warm, tumble dry low or line dry'
    },
    variants: [
      {
        id: 'var-shade',
        name: 'Colorway',
        options: ['Natural Flax', 'Terracotta Rust', 'Slate Olive']
      }
    ],
    inStock: true,
    stockCount: 30,
    rating: 4.7,
    reviewCount: 18,
    keywords: ['napkins', 'table linen', 'dining', 'tableware', 'pure linen', 'entertaining']
  },

  // ==================== EVERYDAY ESSENTIALS ====================
  {
    id: 'prod-017',
    slug: 'full-grain-leather-minimalist-card-wallet',
    name: 'Full-Grain Vegetable Tanned Card Wallet',
    tagline: 'Slimline pocket sleeve saddle-stitched by hand',
    category: 'Everyday Essentials',
    categoryId: 'everyday-carry',
    price: 1650,
    originalPrice: 1950,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Constructed from full-grain vegetable-tanned leather that patinas to a lustrous caramel sheen over years.',
    description: 'Designed for the modern minimalist who values pocket comfort. Holds up to 6–8 credit cards and folded banknotes across 3 precision-cut bevelled slots, while maintaining an ultra-slim 4mm profile.',
    features: [
      'Full-grain certified vegetable-tanned leather',
      'Hand-waxed linen thread using traditional double-needle saddle stitch',
      'Bevelled and burnished edges sealed with natural beeswax',
      'RFID-safe central pocket for cards'
    ],
    specs: {
      'Dimensions': '10 cm × 7.2 cm × 0.4 cm',
      'Capacity': '6 to 8 cards + folded cash',
      'Weight': '42 g',
      'Warranty': '5-year structural warranty'
    },
    variants: [
      {
        id: 'var-leather',
        name: 'Leather Tone',
        options: ['Cognac Tan', 'Espresso Brown', 'Matte Onyx']
      }
    ],
    inStock: true,
    stockCount: 25,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 71,
    keywords: ['wallet', 'leather wallet', 'card holder', 'edc', 'leathercraft', 'minimalist wallet']
  },
  {
    id: 'prod-018',
    slug: 'heavyweight-organic-canvas-daily-tote',
    name: '16oz Organic Canvas Market Tote',
    tagline: 'Heavy-duty washed cotton canvas with reinforced brass rivets',
    category: 'Everyday Essentials',
    categoryId: 'everyday-carry',
    price: 1890,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Your dependable companion for farmer’s markets, coffee shop laptops, weekend escapes, and daily commutes.',
    description: 'Woven from sturdy 16-ounce organic cotton canvas with a water-resistant finish. Features deep external side pockets for a water bottle or umbrella, an internal padded 15-inch laptop sleeve, and solid brass key leash.',
    features: [
      '100% GOTS certified organic canvas',
      'Solid antique brass hardware and reinforced stress points',
      'Padded internal sleeve fits up to 15" laptops',
      'Comfortable 25cm drop double-stitched shoulder straps'
    ],
    specs: {
      'Dimensions': '38 cm (W) × 36 cm (H) × 14 cm (D)',
      'Capacity': '19 Liters',
      'Weight': '540 g',
      'Closure': 'Concealed magnetic snap top'
    },
    variants: [
      {
        id: 'var-color',
        name: 'Canvas Color',
        options: ['Raw Ecru', 'Washed Olive', 'Deep Midnight']
      }
    ],
    inStock: true,
    stockCount: 19,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 39,
    keywords: ['tote bag', 'canvas tote', 'bag', 'market bag', 'laptop bag', 'everyday carry']
  },
  {
    id: 'prod-019',
    slug: 'solid-brass-monogram-keychain-hook',
    name: 'Machined Solid Brass Key Hook & Shackle',
    tagline: 'Indestructible everyday brass carabiner with threaded screw shackle',
    category: 'Everyday Essentials',
    categoryId: 'everyday-carry',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Machined from solid billet brass for effortless pocket, belt loop, or tote bag retrieval.',
    description: 'No flimsy springs or stamped metals. The deep Japanese fishhook silhouette securely catches onto belt loops or internal bag webbing, keeping your keys accessible in an instant.',
    features: [
      'CNC-machined solid brass alloy',
      'Threaded brass screw pin shackle prevents accidental loss',
      'Will not rust, crack, or lose tension',
      'Laser-engraved subtle Aurelia & Co. insignia'
    ],
    specs: {
      'Length': '8.5 cm',
      'Weight': '55 g',
      'Finish': 'Satin brushed golden brass'
    },
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviewCount: 52,
    keywords: ['keychain', 'brass', 'key hook', 'shackle', 'edc', 'accessories']
  },
  {
    id: 'prod-020',
    slug: 'cedarwood-leather-desk-mat-and-organizer',
    name: 'Dual-Sided Vegan Suede & Leather Desk Pad',
    tagline: 'Generous 80x40cm surface for laptops, keyboards & mouse glide',
    category: 'Everyday Essentials',
    categoryId: 'everyday-carry',
    price: 1750,
    originalPrice: 2100,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Transform your work desk into an organized, calming sanctuary with smooth water-resistant writing comfort.',
    description: 'Reversible dual-sided design: one side is crafted from premium textured eco-leather, while the reverse features warm anti-slip microfiber suede. Waterproof, scratch-resistant, and easy to wipe clean.',
    features: [
      'Generous surface protects desks from spills, scuffs, and heat',
      'Provides smooth optical mouse tracking precision',
      'Rollable with included leather cinch strap for easy transport',
      'Stitched perimeter edge prevents fraying'
    ],
    specs: {
      'Dimensions': '80 cm × 40 cm × 0.2 cm',
      'Material': 'Waterproof PU leather + Microfiber Suede',
      'Weight': '410 g'
    },
    variants: [
      {
        id: 'var-color',
        name: 'Color Pair',
        options: ['Caramel Tan & Suede Brown', 'Forest Olive & Sage', 'Charcoal & Dove Grey']
      }
    ],
    inStock: true,
    stockCount: 17,
    rating: 4.8,
    reviewCount: 33,
    keywords: ['desk mat', 'mouse pad', 'desk organizer', 'office', 'workspace', 'leather desk pad']
  },

  // ==================== APPAREL & LOUNGEWEAR ====================
  {
    id: 'prod-021',
    slug: 'relaxed-fit-organic-linen-resort-shirt',
    name: 'Relaxed Washed Organic Linen Shirt',
    tagline: 'Camp collar button-up in breathable stonewashed French linen',
    category: 'Apparel & Loungewear',
    categoryId: 'apparel-loungewear',
    price: 2990,
    originalPrice: 3490,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Tailored with an easy Cuban collar, coconut shell buttons, and a breezy relaxed silhouette for tropical days.',
    description: 'The epitome of warm-weather sophistication. Crafted from 100% medium-weight European linen that lets air circulate freely, keeping you cool under the sun while drape falls effortlessly over trousers or shorts.',
    features: [
      '100% certified European flax linen',
      'Natural polished coconut shell buttons',
      'Camp collar / Cuban collar silhouette',
      'Stonewashed for relaxed living and effortless wrinkling'
    ],
    specs: {
      'Fit': 'Relaxed, airy fit (true to size)',
      'Fabric Weight': '160 GSM',
      'Care': 'Machine wash cold on delicate cycle; hang to dry'
    },
    variants: [
      {
        id: 'var-size',
        name: 'Size',
        options: ['S', 'M', 'L', 'XL']
      },
      {
        id: 'var-color',
        name: 'Color',
        options: ['Warm Sand', 'Olive Drab', 'Crisp White', 'Terracotta']
      }
    ],
    inStock: true,
    stockCount: 22,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 46,
    keywords: ['linen shirt', 'shirt', 'resort shirt', 'apparel', 'summer shirt', 'linen', 'menswear']
  },
  {
    id: 'prod-022',
    slug: 'pure-mulberry-silk-contoured-sleep-mask',
    name: 'Grade 6A Mulberry Silk Sleeping Mask',
    tagline: '100% 22-Momme raw silk with wide velvet elasticated strap',
    category: 'Apparel & Loungewear',
    categoryId: 'apparel-loungewear',
    price: 1350,
    originalPrice: 1650,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Gentle on delicate eye contours, prevents sleep creases, and blocks 100% of light for deep REM sleep.',
    description: 'Filled and lined exclusively with pure long-strand mulberry silk floss. Silk’s natural amino acids hydrate skin without absorbing eye creams or serums overnight.',
    features: [
      '100% Pure 22-Momme Mulberry Silk (Grade 6A)',
      'Cushioned nose bridge baffles 100% of intrusive light',
      'Adjustable silk-wrapped elastic band prevents hair snagging',
      'Includes breathable silk drawstring storage pouch'
    ],
    specs: {
      'Dimensions': '21 cm × 9.5 cm',
      'Weight': '32 g',
      'Care': 'Hand wash gently with silk-friendly detergent'
    },
    variants: [
      {
        id: 'var-color',
        name: 'Silk Shade',
        options: ['Champagne Gold', 'Smoky Quartz', 'Midnight Navy']
      }
    ],
    inStock: true,
    stockCount: 32,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 58,
    keywords: ['sleep mask', 'silk', 'mulberry silk', 'wellness', 'eyemask', 'sleep']
  },
  {
    id: 'prod-023',
    slug: 'waffle-weave-organic-cotton-kimono-robe',
    name: 'Waffle Weave Organic Cotton Bathrobe',
    tagline: 'Lightweight spa robe with wide belt and dual patch pockets',
    category: 'Apparel & Loungewear',
    categoryId: 'apparel-loungewear',
    price: 3290,
    originalPrice: 3890,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Loomed from 100% Aegean organic cotton into a deep honeycomb grid for fast absorption and breathable luxury.',
    description: 'Wrap yourself in resort luxury every morning. Unlike heavy terry robes that stay damp, our waffle weave breathes effortlessly, dries fast on the hook, and wraps gracefully over sleepwear.',
    features: [
      '100% GOTS certified organic long-staple cotton',
      'Traditional Japanese kimono collar cut',
      'Two deep reinforced patch pockets at hip',
      'Double belt loops for adjustable waist fit'
    ],
    specs: {
      'Fabric Weight': '280 GSM',
      'Length': 'Mid-calf (approx. 115 cm)',
      'Care': 'Machine wash cold; line dry or tumble dry low'
    },
    variants: [
      {
        id: 'var-size',
        name: 'Size',
        options: ['S/M', 'L/XL']
      },
      {
        id: 'var-color',
        name: 'Tone',
        options: ['Linen White', 'Slate Stone', 'Terracotta']
      }
    ],
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 23,
    keywords: ['bathrobe', 'robe', 'waffle robe', 'organic cotton', 'kimono', 'loungewear', 'spa robe']
  },
  {
    id: 'prod-024',
    slug: 'washed-linen-lounge-drawstring-trousers',
    name: 'Pure Linen Relaxed Lounge Trousers',
    tagline: 'Elasticated drawstring trousers tailored for effortless leisure',
    category: 'Apparel & Loungewear',
    categoryId: 'apparel-loungewear',
    price: 3150,
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Breathable stonewashed linen cut in a tapered leg with deep side pockets and cotton twill drawstring.',
    description: 'Whether lounging on quiet Sunday mornings, stepping out for artisanal coffee, or travelling on warm flights, these linen pants pair effortlessly with basic tees, linen shirts, or barefoot steps.',
    features: [
      '100% pure washed linen with natural temperature regulation',
      'Comfortable encased elastic waistband with interior drawstring',
      'Two slant side pockets plus one rear patch pocket',
      'Pre-shrunk fabric for reliable fit wash after wash'
    ],
    specs: {
      'Fit': 'Relaxed through the thigh with gentle taper to ankle',
      'Inseam': '74 cm',
      'Care': 'Machine wash gentle cold; reshape while damp'
    },
    variants: [
      {
        id: 'var-size',
        name: 'Size',
        options: ['S', 'M', 'L', 'XL']
      },
      {
        id: 'var-color',
        name: 'Color',
        options: ['Natural Flax', 'Deep Moss', 'Charcoal']
      }
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.8,
    reviewCount: 31,
    keywords: ['linen pants', 'trousers', 'loungewear', 'linen', 'apparel', 'pants']
  },
  {
    id: 'prod-025',
    slug: 'handspun-cotton-slub-throw-scarf',
    name: 'Khadi Cotton Handspun Summer Stole',
    tagline: 'Featherlight hand-loomed stole with natural fringe hems',
    category: 'Apparel & Loungewear',
    categoryId: 'apparel-loungewear',
    price: 1190,
    originalPrice: 1450,
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription: 'Spun by hand on traditional charkha wheels and woven on wooden handlooms with natural indigo and madder root dyes.',
    description: 'Impossibly soft against bare skin and lightweight enough to drape effortlessly year-round. An intentional layer that softens air-conditioned drafts while celebrating authentic Indian khadi heritage.',
    features: [
      '100% indigenous organic cotton handspun yarn',
      'Dyed with botanical and plant-extracted colors',
      'Featherlight open weave that packs down tiny in bags',
      'Raw fringed edges finished by hand'
    ],
    specs: {
      'Dimensions': '70 cm × 200 cm',
      'Weight': '110 g',
      'Origin': 'Handcrafted in Wardha, Maharashtra'
    },
    inStock: true,
    stockCount: 25,
    rating: 4.9,
    reviewCount: 37,
    keywords: ['scarf', 'khadi', 'stole', 'cotton scarf', 'handspun', 'apparel', 'shawl']
  }
];


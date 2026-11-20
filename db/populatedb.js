require("dotenv").config();

const pool = require("./pool");

const categories = [
  {
    name: "Guitars",
    description: "Electric and acoustic guitars for every style and skill level.",
  },
  {
    name: "Keyboards & Pianos",
    description: "Digital pianos, keyboards, and synthesizers.",
  },
  {
    name: "Drums & Percussion",
    description: "Acoustic drums, electronic kits, and percussion instruments.",
  },
  {
    name: "Bass Guitars",
    description: "Electric and acoustic bass guitars for every genre.",
  },
  {
    name: "Wind Instruments",
    description: "Woodwind and brass instruments for musicians and ensembles.",
  },
  {
    name: "Audio Equipment",
    description: "Studio monitors, microphones, mixers, and recording equipment.",
  },
  {
    name: "Accessories",
    description: "Strings, cables, picks, stands, and essential music accessories.",
  },
];

const items = [
  {
    name: "Player Stratocaster Electric Guitar",
    description: "A versatile electric guitar with a comfortable body and classic single-coil tones. Great for beginners and experienced players.",
    brand: "Fender",
    model: "Player Stratocaster",
    sku: "GTR-FEN-001",
    price: 749.99,
    stock_quantity: 8,
    image_url: "https://www.fender.com/cdn-cgi/image/format=png,width=800/https://www.fmicassets.com/Damroot/Zoom/10001/0144502500_gtr_frt_001_rr.png",
    specifications: "Body: Alder | Neck: Maple | Pickups: 3 Player Series single-coil | Scale: 25.5 inches",
    category_name: "Guitars",
  },
  {
    name: "Dreadnought Acoustic Guitar",
    description: "A full-bodied acoustic guitar with a rich, balanced sound suitable for strumming and fingerstyle playing.",
    brand: "Yamaha",
    model: "FG800",
    sku: "GTR-YAM-002",
    price: 229.99,
    stock_quantity: 12,
    image_url: "https://bothners.co.za/wp-content/uploads/2021/03/YAMAHAFG800FOLK_GUITAR_-_NATURAL1.jpg",
    specifications: "Body: Dreadnought | Top: Solid spruce | Back and sides: Nato | Neck: Nato",
    category_name: "Guitars",
  },
  {
    name: "Digital Piano",
    description: "A compact digital piano featuring realistic piano sounds and weighted keys for expressive playing.",
    brand: "Yamaha",
    model: "P-145",
    sku: "KEY-YAM-001",
    price: 499.99,
    stock_quantity: 6,
    image_url: null,
    specifications: "Keys: 88 weighted keys | Sound engine: AWM Stereo Sampling | Polyphony: 64 notes",
    category_name: "Keyboards & Pianos",
  },
  {
    name: "Electronic Keyboard",
    description: "A portable keyboard with built-in sounds and rhythms for practice, learning, and performance.",
    brand: "Casio",
    model: "CT-S300",
    sku: "KEY-CAS-002",
    price: 179.99,
    stock_quantity: 10,
    image_url: null,
    specifications: "Keys: 61 touch-responsive keys | Tones: 400 | Rhythms: 77",
    category_name: "Keyboards & Pianos",
  },
  {
    name: "Acoustic Drum Kit",
    description: "A complete acoustic drum set designed for practice, rehearsal, and live performance.",
    brand: "Pearl",
    model: "Roadshow",
    sku: "DRM-PEA-001",
    price: 699.99,
    stock_quantity: 4,
    image_url: null,
    specifications: "Configuration: 5-piece kit | Shells: Poplar | Includes: Hardware and cymbals",
    category_name: "Drums & Percussion",
  },
  {
    name: "Digital Drum Kit",
    description: "An electronic drum kit with responsive pads and built-in sounds for quiet practice.",
    brand: "Roland",
    model: "TD-02K",
    sku: "DRM-ROL-002",
    price: 449.99,
    stock_quantity: 5,
    image_url: null,
    specifications: "Pads: Mesh snare and rubber toms | Sounds: 16 kits | Connectivity: USB",
    category_name: "Drums & Percussion",
  },
  {
    name: "Electric Bass Guitar",
    description: "A versatile four-string bass with a comfortable neck and punchy sound.",
    brand: "Ibanez",
    model: "GSR200",
    sku: "BAS-IBA-001",
    price: 249.99,
    stock_quantity: 7,
    image_url: null,
    specifications: "Strings: 4 | Pickups: Dynamix P/J | Scale: 34 inches",
    category_name: "Bass Guitars",
  },
  {
    name: "Alto Saxophone",
    description: "A student-friendly alto saxophone with a warm tone and comfortable key layout.",
    brand: "Yamaha",
    model: "YAS-280",
    sku: "WND-YAM-001",
    price: 1099.99,
    stock_quantity: 3,
    image_url: null,
    specifications: "Type: Eb alto saxophone | Body: Yellow brass | Finish: Gold lacquer",
    category_name: "Wind Instruments",
  },
  {
    name: "Studio Monitor",
    description: "A compact powered studio monitor designed for accurate audio monitoring and music production.",
    brand: "KRK",
    model: "Classic 5",
    sku: "AUD-KRK-001",
    price: 179.99,
    stock_quantity: 9,
    image_url: null,
    specifications: "Woofer: 5 inches | Tweeter: 1 inch | Power: 50W bi-amped",
    category_name: "Audio Equipment",
  },
  {
    name: "Dynamic Vocal Microphone",
    description: "A rugged dynamic microphone suitable for vocals, rehearsals, and live performances.",
    brand: "Shure",
    model: "SM58",
    sku: "AUD-SHU-002",
    price: 99.99,
    stock_quantity: 15,
    image_url: null,
    specifications: "Type: Dynamic | Polar pattern: Cardioid | Frequency response: 50 Hz–15 kHz",
    category_name: "Audio Equipment",
  },
  {
    name: "Guitar Strings",
    description: "A durable set of nickel-plated steel strings for electric guitars.",
    brand: "D'Addario",
    model: "EXL110",
    sku: "ACC-DAD-001",
    price: 7.99,
    stock_quantity: 30,
    image_url: null,
    specifications: "Material: Nickel-plated steel | Gauge: Regular Light .010–.046 | Set: 6 strings",
    category_name: "Accessories",
  },
  {
    name: "Guitar Cable",
    description: "A reliable instrument cable for connecting guitars and basses to amplifiers and other equipment.",
    brand: "Ernie Ball",
    model: "P06038",
    sku: "ACC-ERN-002",
    price: 19.99,
    stock_quantity: 20,
    image_url: null,
    specifications: "Length: 10 feet | Connectors: Straight 1/4-inch to straight 1/4-inch",
    category_name: "Accessories",
  },
];

async function insertCategories() {
  for (const category of categories) {
    await pool.query(
      `INSERT INTO categories (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING`,
      [category.name, category.description]
    );
  }

  console.log("Categories inserted successfully!");
}

async function insertItems() {
  for (const item of items) {
    const categoryResult = await pool.query(
      "SELECT id FROM categories WHERE name = $1",
      [item.category_name]
    );

    const categoryId = categoryResult.rows[0].id;

    await pool.query(
      `INSERT INTO items (
        name,
        description,
        brand,
        model,
        sku,
        price,
        stock_quantity,
        image_url,
        specifications,
        category_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (sku) DO NOTHING`,
      [
        item.name,
        item.description,
        item.brand,
        item.model,
        item.sku,
        item.price,
        item.stock_quantity,
        item.image_url,
        item.specifications,
        categoryId,
      ]
    );
  }

  console.log("Inventory items inserted successfully!");
}

async function main() {
  try {
    await insertCategories();
    await insertItems();

    console.log("SoundBurrow database populated successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await pool.end();
  }
}

main();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categoriesData = [
  {
    id: "mobiles",
    name: "Mobiles",
    imageUrl: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&h=150"
  },
  {
    id: "laptops",
    name: "Laptops",
    imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=150"
  },
  {
    id: "earbuds",
    name: "Earbuds",
    imageUrl: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&h=150"
  },
  {
    id: "speakers",
    name: "Speakers",
    imageUrl: "https://images-cdn.ubuy.co.in/661a1ab34c4721068f07ef51-audioengine-a2-wireless-bluetooth-pc.jpg"
  },
  {
    id: "ai-robots",
    name: "AI Robots",
    imageUrl: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&h=150"
  },
  
  {
    id: "tablets",
    name: "Tablets",
    imageUrl: "https://images.pexels.com/photos/5082572/pexels-photo-5082572.jpeg?auto=compress&cs=tinysrgb&h=150"
  },
  {
    id: "wearables",
    name: "Wearables",
    imageUrl: "https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg?auto=compress&cs=tinysrgb&h=150"
  },
  {
    id: "gaming",
    name: "Gaming Consoles",
    imageUrl: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&h=150"
  }
];

const productsData = {
  mobiles: [
    {
      id: "pixel9",
      name: "Google Pixel 9 Pro",
      iconUrl: "https://images.pexels.com/photos/5082571/pexels-photo-5082571.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "The latest Google Pixel flagship.",
      buyLink: "#"
    },
    {
      id: "iphone16pro",
      name: "Apple iPhone 16 Pro",
      iconUrl: "https://images.pexels.com/photos/5082573/pexels-photo-5082573.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Experience ProMotion and A18 Bionic.",
      buyLink: "#"
    },
    {
      id: "galaxyS25ultra",
      name: "Samsung Galaxy S25 Ultra",
      iconUrl: "https://images.pexels.com/photos/5082574/pexels-photo-5082574.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Ultimate camera and S Pen integration.",
      buyLink: "#"
    },
    {
      id: "oneplusNextGen",
      name: "OnePlus NextGen",
      iconUrl: "https://images.pexels.com/photos/5082575/pexels-photo-5082575.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Flagship killer with super-fast charging.",
      buyLink: "#"
    },
    {
      id: "xiaomiMax",
      name: "Xiaomi Max Performance",
      iconUrl: "https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "High-end specs at a competitive price.",
      buyLink: "#"
    },
    {
      id: "nothingPhone3",
      name: "Nothing Phone (3)",
      iconUrl: "https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Unique design and clean Android experience.",
      buyLink: "#"
    }
  ],
  laptops: [
    {
      id: "macbookproM3",
      name: "MacBook Pro M3 Max",
      iconUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=100",
      description: "Unprecedented power for professionals.",
      buyLink: "#"
    },
    {
      id: "dellxps15plus",
      name: "Dell XPS 15 Plus",
      iconUrl: "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=100",
      description: "Stunning display and premium build.",
      buyLink: "#"
    },
    {
      id: "lenovoCarbonX2",
      name: "Lenovo ThinkPad Carbon X2",
      iconUrl: "https://images.pexels.com/photos/205414/pexels-photo-205414.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Ultra-light and durable business laptop.",
      buyLink: "#"
    },
    {
      id: "hpSpectreEvo",
      name: "HP Spectre x360 Evo",
      iconUrl: "https://images.pexels.com/photos/18103/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=100",
      description: "Convertible laptop with sleek design.",
      buyLink: "#"
    },
    {
      id: "asusROGStrix",
      name: "Asus ROG Strix G18",
      iconUrl: "https://images.pexels.com/photos/211521/pexels-photo-211521.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "High-performance gaming laptop.",
      buyLink: "#"
    },
    {
      id: "surfaceLaptopStudio2",
      name: "Microsoft Surface Laptop Studio 2",
      iconUrl: "https://images.pexels.com/photos/326515/pexels-photo-326515.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Versatile for creatives and coders.",
      buyLink: "#"
    }
  ],
  earbuds: [
    {
      id: "sonyWF1000XM6",
      name: "Sony WF-1000XM6",
      iconUrl: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Next-gen noise-canceling earbuds.",
      buyLink: "#"
    },
    {
      id: "airpodsPro3",
      name: "Apple AirPods Pro 3",
      iconUrl: "https://images.pexels.com/photos/373946/pexels-photo-373946.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Enhanced spatial audio and ANC.",
      buyLink: "#"
    },
    {
      id: "boseQCultra",
      name: "Bose QuietComfort Ultra Earbuds",
      iconUrl: "https://images.pexels.com/photos/373947/pexels-photo-373947.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Superior comfort and sound quality.",
      buyLink: "#"
    },
    {
      id: "sennheiserMomentum4",
      name: "Sennheiser Momentum True Wireless 4",
      iconUrl: "https://images.pexels.com/photos/373948/pexels-photo-373948.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Audiophile-grade sound in a compact form.",
      buyLink: "#"
    },
    {
      id: "jabraElite10",
      name: "Jabra Elite 10",
      iconUrl: "https://images.pexels.com/photos/373949/pexels-photo-373949.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Durable and great for calls.",
      buyLink: "#"
    },
    {
      id: "galaxyBuds3Pro",
      name: "Samsung Galaxy Buds3 Pro",
      iconUrl: "https://images.pexels.com/photos/373950/pexels-photo-373950.jpeg?auto=compress&cs=tinysrgb&h=100",
      description: "Seamless integration with Galaxy ecosystem.",
      buyLink: "#"
    }
  ]
  ,
  "ai-robots": [
    { id: "sonyAibo",      name: "Sony Aibo Robot Dog",      iconUrl: "https://images.pexels.com/photos/256382/pexels-photo-256382.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Interactive robotic companion.",   buyLink: "#" },
    { id: "ubtechAlpha2",  name: "UBTECH Alpha 2",           iconUrl: "https://images.pexels.com/photos/256383/pexels-photo-256383.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Humanoid robot with advanced AI.", buyLink: "#" },
    { id: "ecovacsDeebot", name: "Ecovacs Deebot T10",       iconUrl: "https://images.pexels.com/photos/256384/pexels-photo-256384.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Cleaning robot with mopping.",     buyLink: "#" },
    { id: "roombaj7",      name: "iRobot Roomba j7",         iconUrl: "https://images.pexels.com/photos/256385/pexels-photo-256385.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Smart vacuum with obstacle avoidance.", buyLink: "#" }
  ], tablets: [
    { id: "ipadProM4",           name: "Apple iPad Pro M4",           iconUrl: "https://images.pexels.com/photos/5082578/pexels-photo-5082578.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Powerful tablet for creatives.",    buyLink: "#" },
    { id: "galaxyTabS9Ultra",    name: "Samsung Galaxy Tab S9 Ultra", iconUrl: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Immersive display and S Pen.",      buyLink: "#" },
    { id: "surfacePro9",         name: "Surface Pro 9",               iconUrl: "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg?auto=compress&cs=tinysrgb&h=100", description: "2-in-1 for work and play.",          buyLink: "#" },
    { id: "lenovoTabP12Pro",     name: "Lenovo Tab P12 Pro",         iconUrl: "https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Great screen and speakers.",        buyLink: "#" }
  ],

  wearables: [
    { id: "appleWatchSeries9",   name: "Apple Watch Series 9",        iconUrl: "https://images.pexels.com/photos/277395/pexels-photo-277395.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Always-on Retina display.",       buyLink: "#" },
    { id: "galaxyWatch7",        name: "Samsung Galaxy Watch 7",      iconUrl: "https://images.pexels.com/photos/277396/pexels-photo-277396.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Health and fitness tracking.",    buyLink: "#" },
    { id: "fitbitSense3",        name: "Fitbit Sense 3",              iconUrl: "https://images.pexels.com/photos/277397/pexels-photo-277397.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Stress management tools.",       buyLink: "#" }
  ],

  gaming: [
    { id: "ps5",         name: "Sony PlayStation 5",      iconUrl: "https://images.pexels.com/photos/274423/pexels-photo-274423.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Next-gen console with ultra-fast SSD.", buyLink: "#" },
    { id: "xboxSeriesX", name: "Xbox Series X",          iconUrl: "https://images.pexels.com/photos/274424/pexels-photo-274424.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Powerhouse hardware and Game Pass.",    buyLink: "#" },
    { id: "switchOLED",  name: "Nintendo Switch OLED",   iconUrl: "https://images.pexels.com/photos/274425/pexels-photo-274425.jpeg?auto=compress&cs=tinysrgb&h=100", description: "Portable and docked play.",            buyLink: "#" }
  ]
};

const seedDatabase = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});
    await Product.deleteMany({});

    await Category.insertMany(categoriesData);

    let allProductsToSeed = [];
    for (const category of categoriesData) {
      const productsForThisCategory = productsData[category.id];
      if (productsForThisCategory && Array.isArray(productsForThisCategory)) {
        productsForThisCategory.forEach(product => {
          allProductsToSeed.push({
            ...product,
            categoryId: category.id
          });
        });
      }
    }

    if (allProductsToSeed.length > 0) {
      await Product.insertMany(allProductsToSeed);
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();

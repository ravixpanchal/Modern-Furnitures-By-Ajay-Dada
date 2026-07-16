/* =========================================================================
   SITE CONFIG — edit everything in this one file.
   This is the ONLY file you should need to touch for contact details.
   ========================================================================= */

const SITE_CONFIG = {
  // Basic identity
  siteName: "Modern Furnitures by Ajay Dada",
  tagline: {
    en: "Custom Furniture • Kitchen • Wardrobes • Interior Woodwork",
    hi: "कस्टम फर्नीचर • किचन • वार्डरोब • इंटीरियर वुडवर्क",
  },

  // Contact — REPLACE THESE
  phoneDisplay: "+91 9695805556",     // shown on the page
  phoneDial: "+919695805556",          // used for tel: links (no spaces)
  whatsappNumber: "919695805556",      // country code + number, no + no spaces
  whatsappMessage: "Hello Ajay Dada, I want furniture for my home.",

  // Location — REPLACE with your real Google Maps share link + embed link
  // To get the embed link: Google Maps -> Share -> Embed a map -> copy the src="" URL
  mapsEmbedSrc: "https://www.google.com/maps?q=25.98697308724328,79.44106470992814&output=embed",
  mapsShareLink: "https://maps.google.com/?q=25.98697308724328,79.44106470992814",
  addressLines: {
    en: ["Ajay Dada Furniture Workshop", "Your Street, Area", "City, State – PIN"],
    hi: ["अजय दादा फर्नीचर वर्कशॉप", "आपकी गली, क्षेत्र", "शहर, राज्य – पिन कोड"],
  },

  // Social
  facebookUrl: "https://www.facebook.com/ajaydada.kumar",
  instagramUrl: "https://www.instagram.com/ajaydadakumar",   // leave blank to hide the icon

  // Stats (shown as animated counters)
  stats: [
    { end: 100, suffix: "+", label: { en: "Projects Completed", hi: "पूर्ण किए गए प्रोजेक्ट" } },
    { end: 80,  suffix: "+", label: { en: "Furniture Designs",  hi: "फर्नीचर डिज़ाइन" } },
    { end: 100, suffix: "+", label: { en: "Happy Clients",      hi: "संतुष्ट ग्राहक" } },
    { end: 20,  suffix: "+", label: { en: "Years Experience",   hi: "वर्षों का अनुभव" } },
  ],

  // Testimonials — add/replace freely. photo is optional (path or leave "")
  testimonials: [
    {
      name: "Rakesh Mehta",
      city: "Vadodara",
      photo: "",
      rating: 5,
      text: {
        en: "Ajay Dada and team completed our kitchen perfectly. Excellent finishing and they stuck to the timeline.",
        hi: "अजय दादा और टीम ने हमारी किचन बहुत बढ़िया तरीके से पूरी की। फिनिशिंग शानदार थी और समय पर काम पूरा हुआ।",
      },
    },
    {
      name: "Priya Shah",
      city: "Anand",
      photo: "",
      rating: 5,
      text: {
        en: "Got our full wardrobe and bedroom set custom made. Great material quality and very reasonable pricing.",
        hi: "हमने पूरा वार्डरोब और बेडरूम सेट कस्टम बनवाया। मटीरियल की क्वालिटी बहुत अच्छी और कीमत भी वाजिब थी।",
      },
    },
    {
      name: "Sanjay Patel",
      city: "Baroda",
      photo: "",
      rating: 5,
      text: {
        en: "Very professional work on our living room furniture. Highly recommend for custom projects.",
        hi: "हमारे लिविंग रूम फर्नीचर पर बहुत पेशेवर काम हुआ। कस्टम प्रोजेक्ट के लिए पूरी सिफारिश।",
      },
    },
  ],

  // Videos — paste YouTube links (watch or short links both work) OR local file paths in /videos
  videos: [
    // { title: { en: "Workshop Tour", hi: "वर्कशॉप टूर" }, youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
    { title: { en: "Kitchen Walkthrough", hi: "किचन वॉकथ्रू" }, file: "videos/modern_kitchen_1.mp4" },
    { title: { en: "Kitchen Walkthrough", hi: "किचन वॉकथ्रू" }, file: "videos/modern_kitchen_2.mp4" }
  ],

  // Materials shown in the "Material Quality" section
  materials: [
    {
      name: "Plywood",
      level: { en: "Premium – Best Durability", hi: "प्रीमियम – सबसे टिकाऊ" },
      desc: {
        en: "Water-resistant, termite-proof layered wood. Best for kitchens and high-moisture areas.",
        hi: "जल-प्रतिरोधी, दीमक-रोधी लेयर्ड लकड़ी। किचन और नमी वाली जगहों के लिए सबसे बेहतर।",
      },
    },
    {
      name: "HDHMR",
      level: { en: "High Density – Screw Holding", hi: "हाई डेंसिटी – स्क्रू होल्डिंग बेहतर" },
      desc: {
        en: "High density board with superior screw-holding strength, great for modular units.",
        hi: "उच्च घनत्व बोर्ड जिसमें स्क्रू पकड़ने की क्षमता बेहतर होती है, मॉड्यूलर यूनिट्स के लिए बढ़िया।",
      },
    },
  {
  name: "WPC (Ply Board)",
  level: {
    en: "Waterproof – High Durability",
    hi: "वाटरप्रूफ – उच्च टिकाऊपन"
  },
  desc: {
    en: "Advanced composite board with excellent moisture resistance, termite protection, and durability for premium furniture and modular interiors.",
    hi: "उन्नत कंपोजिट बोर्ड जो बेहतरीन नमी प्रतिरोध, दीमक सुरक्षा और टिकाऊपन प्रदान करता है, प्रीमियम फर्नीचर और मॉड्यूलर इंटीरियर्स के लिए उपयुक्त।"
  }
},
    {
      name: "Laminates",
      level: { en: "Scratch & Heat Resistant", hi: "खरोंच व गर्मी प्रतिरोधी" },
      desc: {
        en: "Thin protective layer bonded on the surface, resists scratches, heat and daily wear.",
        hi: "सतह पर चिपकी पतली सुरक्षा परत, जो खरोंच, गर्मी और रोज़मर्रा के इस्तेमाल को झेलती है।",
      },
    },
    {
      name: "Acrylic",
      level: { en: "High Gloss – Modern Look", hi: "हाई ग्लॉस – मॉडर्न लुक" },
      desc: {
        en: "Mirror-like glossy finish that gives kitchens and wardrobes a premium, modern look.",
        hi: "शीशे जैसी चमकदार फिनिश जो किचन और वार्डरोब को प्रीमियम, मॉडर्न लुक देती है।",
      },
    },
    {
      name: "Veneer",
      level: { en: "Natural Wood Grain – Elegant", hi: "नेचुरल वुड ग्रेन – एलिगेंट" },
      desc: {
        en: "Thin real-wood layer that shows natural grain — for a warm, elegant, high-end finish.",
        hi: "असली लकड़ी की पतली परत जो प्राकृतिक बनावट दिखाती है — गर्म, सुरुचिपूर्ण, हाई-एंड फिनिश के लिए।",
      },
    },
  ],

  // FAQ
  faqs: [
    {
      q: { en: "How much does a kitchen cost?", hi: "किचन की कीमत कितनी होती है?" },
      a: {
        en: "Cost depends on kitchen size, material chosen (Plywood/HDHMR/MDF) and finish (Laminate/Acrylic/Veneer). Share your kitchen dimensions on WhatsApp and we'll send a free estimate.",
        hi: "कीमत किचन के साइज़, चुने गए मटीरियल (प्लाईवुड/एचडीएचएमआर/एमडीएफ) और फिनिश (लैमिनेट/एक्रिलिक/विनियर) पर निर्भर करती है। अपने किचन का माप WhatsApp पर भेजें, हम मुफ्त अनुमान भेजेंगे।",
      },
    },
    {
      q: { en: "How long does installation take?", hi: "इंस्टॉलेशन में कितना समय लगता है?" },
      a: {
        en: "A standard kitchen or wardrobe usually takes 7–15 working days after material is ready, depending on size and design complexity.",
        hi: "मटीरियल तैयार होने के बाद एक सामान्य किचन या वार्डरोब में आमतौर पर साइज़ और डिज़ाइन के अनुसार 7–15 कार्यदिवस लगते हैं।",
      },
    },
    {
      q: { en: "Which material is best?", hi: "कौन सा मटीरियल सबसे अच्छा है?" },
      a: {
        en: "Plywood is best for durability and moisture resistance (kitchens/bathrooms). MDF/HDHMR work well for bedrooms and wardrobes at a lower cost. We'll suggest the right option after seeing your space.",
        hi: "टिकाऊपन और नमी प्रतिरोध के लिए प्लाईवुड सबसे अच्छा है (किचन/बाथरूम)। बेडरूम और वार्डरोब के लिए कम कीमत में एमडीएफ/एचडीएचएमआर बढ़िया रहता है। आपकी जगह देखने के बाद हम सही विकल्प सुझाएंगे।",
      },
    },
    {
      q: { en: "Do you provide custom designs?", hi: "क्या आप कस्टम डिज़ाइन बनाते हैं?" },
      a: {
        en: "Yes, every project is custom designed as per your space, budget and style — from kitchens to full home interior woodwork.",
        hi: "हां, हर प्रोजेक्ट आपकी जगह, बजट और स्टाइल के अनुसार कस्टम डिज़ाइन किया जाता है — किचन से लेकर पूरे घर के इंटीरियर वुडवर्क तक।",
      },
    },
  ],
};

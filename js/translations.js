/* =========================================================================
   TRANSLATIONS — every static string on the page, keyed for data-i18n
   ========================================================================= */

const TRANSLATIONS = {
  en: {
    "nav.showcase": "Gallery",
    "nav.categories": "Categories",
    "nav.materials": "Materials",
    "nav.why": "Why Us",
    "nav.videos": "Videos",
    "nav.testimonials": "Reviews",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "hero.eyebrow": "Est. handcrafted woodwork",
    "hero.title1": "Modern Furnitures",
    "hero.title2": "by Ajay Dada",
    "hero.cta.call": "Call Now",
    "hero.cta.whatsapp": "WhatsApp",
    "hero.cta.location": "Location",
    "hero.scroll": "See the work",

    "showcase.eyebrow": "Quick View",
    "showcase.title": "Every piece, in motion",
    "showcase.hint": "Hover to pause • Click any photo to view full-screen",

    "categories.eyebrow": "Browse by room",
    "categories.title": "What we build",
    "categories.bedroom": "Bedroom",
    "categories.customs": "Custom Projects",
    "categories.kitchens": "Kitchen",
    "categories.livingrooms": "Living Room",
    "categories.wardrobe": "Wardrobe",
    "categories.doorwindow": "Door & Window",
    "categories.office": "Office",
    "categories.others": "Other's",
    "categories.temple": "Temple",
    "categories.viewall": "View all",

    "gallery.eyebrow": "The full record",
    "gallery.title": "Project Gallery",
    "gallery.all": "All",
    "gallery.loadmore": "Load more",
    "gallery.empty.title": "Photos go here",
    "gallery.empty.text": "Drop your images into the /furnitures and /furnitures_class folders, run the manifest script, and they'll appear here automatically.",

    "materials.eyebrow": "What goes into it",
    "materials.title": "Material Quality",

    "why.eyebrow": "The reasons clients come back",
    "why.title": "Why Choose Us",
    "why.experience": "20+ Years Experience",
    "why.experience.d": "Two decades of hands-on carpentry and interior woodwork.",
    "why.material": "Premium Material",
    "why.material.d": "Plywood, HDHMR, MDF, Laminate, Acrylic and Veneer — sourced right.",
    "why.pricing": "Affordable Pricing",
    "why.pricing.d": "Honest quotes with no hidden costs.",
    "why.delivery": "On-Time Delivery",
    "why.delivery.d": "Clear timelines, followed through.",

    "stats.eyebrow": "In numbers",

    "testimonials.eyebrow": "From the clients",
    "testimonials.title": "What people say",

    "videos.eyebrow": "See it built",
    "videos.title": "Video Gallery",
    "videos.empty": "Workshop, walkthrough and installation videos will appear here — add links in js/config.js.",

    "faq.eyebrow": "Common questions",
    "faq.title": "Frequently Asked",

    "contact.eyebrow": "Let's build something",
    "contact.title": "Get In Touch",
    "contact.phone": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.address": "Workshop Address",
    "contact.social": "Follow",
    "contact.directions": "Get Directions",

    "footer.rights": "All rights reserved.",
    "footer.tagline": "Handcrafted furniture, built to last.",

    "theme.dark": "Dark",
    "theme.light": "Light",

    "lightbox.close": "Close",
  },

  hi: {
    "nav.showcase": "गैलरी",
    "nav.categories": "श्रेणियाँ",
    "nav.materials": "मटीरियल",
    "nav.why": "क्यों चुनें",
    "nav.videos": "वीडियो",
    "nav.testimonials": "समीक्षाएँ",
    "nav.faq": "सवाल-जवाब",
    "nav.contact": "संपर्क करें",

    "hero.eyebrow": "हाथ से बनाया गया वुडवर्क",
    "hero.title1": "मॉडर्न फर्नीचर",
    "hero.title2": "अजय दादा द्वारा",
    "hero.cta.call": "कॉल करें",
    "hero.cta.whatsapp": "व्हाट्सएप",
    "hero.cta.location": "लोकेशन",
    "hero.scroll": "काम देखें",

    "showcase.eyebrow": "त्वरित झलक",
    "showcase.title": "हर काम, एक झलक में",
    "showcase.hint": "रोकने के लिए होवर करें • बड़ा देखने के लिए किसी भी फोटो पर क्लिक करें",

    "categories.eyebrow": "कमरे के अनुसार देखें",
    "categories.title": "हम क्या बनाते हैं",
    "categories.bedroom": "बेडरूम",
    "categories.customs": "कस्टम प्रोजेक्ट्स",
    "categories.kitchens": "किचन",
    "categories.livingrooms": "लिविंग रूम",
    "categories.wardrobe": "वार्डरोब",
    "categories.doorwindow": "दरवाजा और खिड़की",
    "categories.office": "ऑफिस",
    "categories.others": "अन्य कार्य",
    "categories.temple": "मंदिर",
    "categories.viewall": "सभी देखें",

    "gallery.eyebrow": "पूरा रिकॉर्ड",
    "gallery.title": "प्रोजेक्ट गैलरी",
    "gallery.all": "सभी",
    "gallery.loadmore": "और देखें",
    "gallery.empty.title": "फोटो यहाँ दिखेंगी",
    "gallery.empty.text": "अपनी फोटो /furnitures और /furnitures_class फोल्डर में डालें, मैनिफेस्ट स्क्रिप्ट चलाएं, फिर वे यहाँ खुद-ब-खुद दिखेंगी।",

    "materials.eyebrow": "इसमें क्या इस्तेमाल होता है",
    "materials.title": "मटीरियल क्वालिटी",

    "why.eyebrow": "ग्राहक बार-बार क्यों आते हैं",
    "why.title": "हमें क्यों चुनें",
    "why.experience": "20+ वर्षों का अनुभव",
    "why.experience.d": "दो दशकों का हाथों-हाथ बढ़ईगीरी और इंटीरियर वुडवर्क अनुभव।",
    "why.material": "प्रीमियम मटीरियल",
    "why.material.d": "प्लाईवुड, एचडीएचएमआर, एमडीएफ, लैमिनेट, एक्रिलिक और विनियर — सही स्रोत से।",
    "why.pricing": "किफायती कीमत",
    "why.pricing.d": "बिना किसी छुपे खर्च के ईमानदार कोटेशन।",
    "why.delivery": "समय पर डिलीवरी",
    "why.delivery.d": "स्पष्ट समय-सीमा, पूरी तरह निभाई गई।",

    "stats.eyebrow": "आंकड़ों में",

    "testimonials.eyebrow": "ग्राहकों की राय",
    "testimonials.title": "लोग क्या कहते हैं",

    "videos.eyebrow": "बनते हुए देखें",
    "videos.title": "वीडियो गैलरी",
    "videos.empty": "वर्कशॉप, वॉकथ्रू और इंस्टॉलेशन वीडियो यहाँ दिखेंगे — js/config.js में लिंक जोड़ें।",

    "faq.eyebrow": "आम सवाल",
    "faq.title": "अक्सर पूछे जाने वाले सवाल",

    "contact.eyebrow": "कुछ बनाते हैं",
    "contact.title": "संपर्क करें",
    "contact.phone": "फ़ोन",
    "contact.whatsapp": "व्हाट्सएप",
    "contact.address": "वर्कशॉप का पता",
    "contact.social": "फॉलो करें",
    "contact.directions": "दिशा-निर्देश पाएं",

    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.tagline": "हाथ से बना फर्नीचर, टिकाऊपन के साथ।",

    "theme.dark": "डार्क",
    "theme.light": "लाइट",

    "lightbox.close": "बंद करें",
  },
};

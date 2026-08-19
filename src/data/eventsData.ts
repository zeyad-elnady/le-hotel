export interface EventItem {
  id: string;
  slug: string;
  category: "wedding" | "birthday" | "corporate" | "private" | "seasonal";
  image: string;
  galleryImages?: string[];
  capacity: number;
  duration: { en: string; ar: string; fr: string };
  title: { en: string; ar: string; fr: string };
  tagline: { en: string; ar: string; fr: string };
  desc: { en: string; ar: string; fr: string };
  highlights: { en: string; ar: string; fr: string }[];
  includes: { en: string; ar: string; fr: string }[];
  badge?: { en: string; ar: string; fr: string };
}

export const eventCategories = [
  { id: "all", label: { en: "All Events", ar: "جميع الفعاليات", fr: "Tous" } },
  { id: "wedding", label: { en: "Weddings", ar: "حفلات الأعراس", fr: "Mariages" } },
  { id: "birthday", label: { en: "Birthdays", ar: "أعياد الميلاد", fr: "Anniversaires" } },
  { id: "corporate", label: { en: "Corporate", ar: "الفعاليات الخاصة", fr: "Entreprises" } },
  { id: "private", label: { en: "Private Parties", ar: "الحفلات الخاصة", fr: "Soirées Privées" } },
  { id: "seasonal", label: { en: "Seasonal", ar: "المناسبات الموسمية", fr: "Saisonnier" } },
];

export const eventsData: EventItem[] = [
  {
    id: "1",
    slug: "royal-wedding",
    category: "wedding",
    image: "/assets/images/photos/IMG_6675.jpg",
    galleryImages: [
      "/assets/images/photos/IMG_6678.jpg",
      "/assets/images/photos/IMG_6402.jpg",
      "/assets/images/photos/IMG_6425.jpg",
    ],
    capacity: 300,
    duration: { en: "Full Day", ar: "يوم كامل", fr: "Journée Entière" },
    badge: { en: "Most Popular", ar: "الأكثر طلباً", fr: "Le Plus Populaire" },
    title: { en: "Royal Wedding", ar: "حفل زفاف ملكي", fr: "Mariage Royal" },
    tagline: { en: "Your fairytale begins here", ar: "حيث تبدأ حكايتك الخيالية", fr: "Votre conte de fées commence ici" },
    desc: {
      en: "Create an unforgettable royal wedding experience in our breathtaking grand ballroom. From the ethereal floral arrangements to the bespoke dining menus, every detail is crafted exclusively for you. Our dedicated wedding team ensures your day is nothing short of absolute perfection.",
      ar: "اصنع تجربة زفاف ملكية لا تُنسى في صالة الاحتفالات الكبرى المبهرة. من الترتيبات الزهرية الأثيرية إلى قوائم الطعام المصممة خصيصاً، كل تفصيل مُصمَّم حصرياً لك.",
      fr: "Créez une expérience de mariage royal inoubliable dans notre magnifique grande salle de bal. Des arrangements floraux éthérés aux menus gastronomiques sur mesure, chaque détail est façonné exclusivement pour vous.",
    },
    highlights: [
      { en: "Grand Ballroom for up to 300 guests", ar: "صالة احتفالات كبرى تتسع لـ 300 ضيف", fr: "Grande Salle pour 300 invités" },
      { en: "Bespoke floral & décor design", ar: "تصميم زهور وديكور خاص", fr: "Décoration florale sur mesure" },
      { en: "Private bridal & groom suites", ar: "أجنحة العروس والعريس الخاصة", fr: "Suite nuptiale & suite du marié" },
      { en: "Live orchestra & entertainment", ar: "أوركسترا حية وترفيه", fr: "Orchestre live & divertissement" },
    ],
    includes: [
      { en: "Professional event coordinator", ar: "منسق فعاليات محترف", fr: "Coordinateur professionnel" },
      { en: "Luxury catering & open bar", ar: "ضيافة فاخرة وبار مفتوح", fr: "Traiteur de luxe & bar ouvert" },
      { en: "Photography & videography", ar: "تصوير فوتوغرافي وفيديو", fr: "Packages photo & vidéo" },
      { en: "Valet parking for all guests", ar: "خدمة صف سيارات لجميع الضيوف", fr: "Voiturier pour tous les invités" },
    ],
  },
  {
    id: "2",
    slug: "intimate-wedding",
    category: "wedding",
    image: "/assets/images/photos/IMG_6678.jpg",
    capacity: 80,
    duration: { en: "Half Day / Full Day", ar: "نصف يوم / يوم كامل", fr: "Demi-journée / Journée" },
    title: { en: "Intimate Garden Wedding", ar: "حفل زفاف حميمي في الحديقة", fr: "Mariage Intime au Jardin" },
    tagline: { en: "Love in every bloom", ar: "الحب في كل وردة", fr: "L'amour en chaque fleur" },
    desc: {
      en: "For those who prefer a more intimate celebration, our beautifully landscaped garden setting offers an enchanting backdrop for an elegant and personal wedding. Perfect for close family and friends, this is where timeless memories are made.",
      ar: "لمن يفضل احتفالاً أكثر حميمية، تقدم حديقتنا المنسقة بشكل جميل خلفية ساحرة لحفل زفاف أنيق وشخصي.",
      fr: "Pour ceux qui préfèrent une célébration plus intime, notre cadre jardin magnifiquement aménagé offre un décor enchanteur pour un mariage élégant.",
    },
    highlights: [
      { en: "Private garden up to 80 guests", ar: "حديقة خاصة تتسع لـ 80 ضيف", fr: "Jardin privé pour 80 invités" },
      { en: "Outdoor ceremony & indoor reception", ar: "مراسم خارجية واستقبال داخلي", fr: "Cérémonie extérieure & réception" },
      { en: "Personalised floral arrangements", ar: "ترتيبات زهور مخصصة", fr: "Arrangements floraux personnalisés" },
      { en: "Romantic lighting & atmosphere", ar: "إضاءة رومانسية وجو ساحر", fr: "Éclairage romantique & ambiance" },
    ],
    includes: [
      { en: "Dedicated wedding planner", ar: "مخطط أعراس مخصص", fr: "Planificateur de mariage dédié" },
      { en: "Garden setup & floral decor", ar: "إعداد الحديقة والديكور الزهري", fr: "Décoration jardin & fleurs" },
      { en: "Gourmet dining experience", ar: "تجربة طعام فاخرة", fr: "Expérience gastronomique" },
      { en: "Live acoustic music", ar: "موسيقى حية", fr: "Musique acoustique live" },
    ],
  },
  {
    id: "3",
    slug: "luxury-birthday",
    category: "birthday",
    image: "/assets/images/photos/IMG_6320.jpg",
    capacity: 150,
    duration: { en: "Evening (5h)", ar: "مساء (5 ساعات)", fr: "Soirée (5h)" },
    badge: { en: "Premium", ar: "مميز", fr: "Premium" },
    title: { en: "Luxury Birthday Gala", ar: "حفل عيد ميلاد فاخر", fr: "Gala d'Anniversaire Luxe" },
    tagline: { en: "Celebrate in grand style", ar: "احتفل بأسلوب راقٍ", fr: "Célébrez en grand style" },
    desc: {
      en: "Mark your milestone birthday with an evening of pure opulence. Our luxury birthday gala transforms our event space into your personal celebration venue — an extraordinary night filled with delectable cuisine, live entertainment, and unforgettable moments.",
      ar: "احتفل بعيد ميلادك المميز بأمسية من الترف الخالص. يحول حفل عيد الميلاد الفاخر مساحة الفعاليات إلى مكان احتفالك الشخصي.",
      fr: "Marquez votre anniversaire avec une soirée de pure opulence. Notre gala d'anniversaire luxueux transforme notre espace en votre lieu de célébration personnel.",
    },
    highlights: [
      { en: "Custom birthday décor & theme", ar: "ديكور وثيمة عيد ميلاد مخصصة", fr: "Décoration & thème sur mesure" },
      { en: "Bespoke multi-tier cake", ar: "كعكة متعددة الطوابق مخصصة", fr: "Gâteau à plusieurs étages" },
      { en: "DJ, live band or entertainment", ar: "دي جي، فرقة حية أو ترفيه", fr: "DJ, groupe live ou divertissement" },
      { en: "VIP guest lounge area", ar: "منطقة استراحة كبار الشخصيات", fr: "Espace lounge VIP" },
    ],
    includes: [
      { en: "Professional event stylist", ar: "مصفف فعاليات محترف", fr: "Styliste événementiel" },
      { en: "Gourmet dinner & dessert bar", ar: "عشاء فاخر وبار حلوى", fr: "Dîner gastronomique & bar desserts" },
      { en: "Custom invitations", ar: "دعوات مخصصة", fr: "Invitations personnalisées" },
      { en: "Event photography", ar: "تصوير الفعاليات", fr: "Photographie événementielle" },
    ],
  },
  {
    id: "4",
    slug: "kids-birthday",
    category: "birthday",
    image: "/assets/images/photos/IMG_6425.jpg",
    capacity: 60,
    duration: { en: "3-4 Hours", ar: "3-4 ساعات", fr: "3-4 heures" },
    title: { en: "Kids Fantasy Party", ar: "حفلة الخيال للأطفال", fr: "Fête Fantaisie Enfants" },
    tagline: { en: "Where magic comes alive", ar: "حيث يحيا السحر", fr: "Là où la magie prend vie" },
    desc: {
      en: "Give your child the birthday party they have always dreamed of! Our kids fantasy party package creates a truly magical world of imagination, filled with themed decorations, entertainment, activities and a wonderful cake designed especially for them.",
      ar: "امنح طفلك حفلة عيد الميلاد التي دائماً حلم بها! تخلق الباقة عالماً سحرياً حقيقياً من الخيال.",
      fr: "Offrez à votre enfant la fête d'anniversaire dont il a toujours rêvé ! Notre forfait crée un monde vraiment magique rempli de décorations thématiques.",
    },
    highlights: [
      { en: "Themed party setup & entertainment", ar: "إعداد حفلة مع ثيمة وترفيه", fr: "Animation thématique" },
      { en: "Kids menu & candy station", ar: "قائمة أطفال ومحطة الحلوى", fr: "Menu enfants & station bonbons" },
      { en: "Professional entertainer", ar: "مرفه محترف", fr: "Animateur professionnel" },
      { en: "Take-home party favors", ar: "هدايا للمنزل", fr: "Cadeaux souvenirs" },
    ],
    includes: [
      { en: "Custom kids birthday cake", ar: "كعكة أطفال مخصصة", fr: "Gâteau personnalisé" },
      { en: "Balloons & decoration package", ar: "بالونات وحزمة ديكور", fr: "Ballons & décoration" },
      { en: "Party games & activities", ar: "ألعاب وأنشطة", fr: "Jeux & activités" },
      { en: "Dedicated kids coordinator", ar: "منسق أطفال مخصص", fr: "Coordinateur enfants" },
    ],
  },
  {
    id: "5",
    slug: "corporate-gala",
    category: "corporate",
    image: "/assets/images/photos/IMG_7023.jpg",
    capacity: 200,
    duration: { en: "Half to Full Day", ar: "نصف يوم إلى يوم كامل", fr: "Demi à journée" },
    badge: { en: "Business", ar: "أعمال", fr: "Business" },
    title: { en: "Corporate Gala Dinner", ar: "حفل عشاء الشركات", fr: "Gala d'Entreprise" },
    tagline: { en: "Where business meets elegance", ar: "حيث تلتقي الأعمال بالأناقة", fr: "Business & élégance réunis" },
    desc: {
      en: "Host your annual corporate gala dinner in extraordinary style. Our professional team handles every detail — from setup and AV to gourmet catering and entertainment — allowing you to focus on your guests and your vision.",
      ar: "استضف حفل عشاء شركتك السنوي بأسلوب استثنائي. يتولى فريقنا المحترف كل تفصيل من تفاصيل فعاليتك.",
      fr: "Accueillez votre gala d'entreprise annuel dans un style extraordinaire. Notre équipe professionnelle s'occupe de chaque détail.",
    },
    highlights: [
      { en: "Stage, podium & AV setup", ar: "منصة ومنبر وإعداد صوتي وبصري", fr: "Scène, podium & équipement AV" },
      { en: "Corporate branding & signage", ar: "العلامة التجارية للشركة واللافتات", fr: "Branding & signalétique" },
      { en: "Multi-course gourmet dinner", ar: "عشاء فاخر متعدد الأطباق", fr: "Dîner gastronomique multi-plats" },
      { en: "Networking cocktail reception", ar: "حفل كوكتيل للتواصل", fr: "Cocktail de networking" },
    ],
    includes: [
      { en: "Event management team", ar: "فريق إدارة الفعاليات", fr: "Équipe de gestion" },
      { en: "Full AV & technical support", ar: "دعم صوتي وتقني كامل", fr: "Support AV & technique complet" },
      { en: "Premium catering service", ar: "خدمة ضيافة مميزة", fr: "Service traiteur premium" },
      { en: "Branded materials & menus", ar: "مواد وقوائم ذات علامة تجارية", fr: "Matériaux & menus de marque" },
    ],
  },
  {
    id: "6",
    slug: "private-cocktail",
    category: "private",
    image: "/assets/images/photos/IMG_6402.jpg",
    capacity: 50,
    duration: { en: "2-4 Hours", ar: "2-4 ساعات", fr: "2-4 heures" },
    title: { en: "Private Cocktail Party", ar: "حفلة كوكتيل خاصة", fr: "Cocktail Privé" },
    tagline: { en: "Effortlessly sophisticated", ar: "أناقة بلا حدود", fr: "Une sophistication sans effort" },
    desc: {
      en: "Host an intimate yet impressively chic cocktail party in one of our exclusive private event rooms. Perfect for milestone celebrations, private gatherings, or a sophisticated get-together with close friends and family.",
      ar: "استضف حفلة كوكتيل حميمة ولكن أنيقة في إحدى غرف الفعاليات الخاصة الحصرية. مثالي للاحتفالات المميزة أو التجمعات الخاصة.",
      fr: "Organisez un cocktail privé dans l'une de nos salles exclusives. Parfait pour des célébrations importantes ou des réunions sophistiquées.",
    },
    highlights: [
      { en: "Exclusive private event room", ar: "غرفة فعاليات خاصة حصرية", fr: "Salle privée exclusive" },
      { en: "Curated cocktail & wine selection", ar: "مجموعة كوكتيل ونبيذ منتقاة", fr: "Sélection cocktails & vins" },
      { en: "Canapés & gourmet appetizers", ar: "مقبلات فاخرة", fr: "Canapés & amuse-bouche" },
      { en: "Live jazz or background music", ar: "جاز حي أو موسيقى هادئة", fr: "Jazz live ou musique d'ambiance" },
    ],
    includes: [
      { en: "Mixologist & bar team", ar: "فريق بار متخصص", fr: "Mixologue & équipe bar" },
      { en: "Custom invitations & menus", ar: "دعوات وقوائم مخصصة", fr: "Invitations & menus personnalisés" },
      { en: "Elegant table & bar setup", ar: "إعداد طاولة وبار أنيق", fr: "Installation table & bar élégante" },
      { en: "Personal event host", ar: "مضيف فعاليات شخصي", fr: "Hôte d'événement personnel" },
    ],
  },
  {
    id: "7",
    slug: "new-year-gala",
    category: "seasonal",
    image: "/assets/images/photos/IMG_6402 (1).jpg",
    capacity: 250,
    duration: { en: "Full Evening", ar: "أمسية كاملة", fr: "Soirée Entière" },
    badge: { en: "Seasonal", ar: "موسمي", fr: "Saisonnier" },
    title: { en: "New Year's Eve Gala", ar: "حفل رأس السنة الميلادية", fr: "Gala du Nouvel An" },
    tagline: { en: "Ring in the new year in style", ar: "استقبل السنة الجديدة بأبهى حلة", fr: "Accueillez la nouvelle année avec style" },
    desc: {
      en: "Celebrate the arrival of the New Year in absolute grandeur at our legendary gala event. With live entertainment, a gourmet dinner, a midnight toast with premium champagne, and fireworks, this is the ultimate New Year's Eve experience.",
      ar: "احتفل بقدوم السنة الجديدة بعظمة مطلقة في حفلنا الأسطوري. مع الترفيه الحي وعشاء فاخر وتحية منتصف الليل بالشمبانيا الفاخرة والألعاب النارية.",
      fr: "Célébrez l'arrivée de la Nouvelle Année dans une grandeur absolue lors de notre légendaire soirée de gala.",
    },
    highlights: [
      { en: "Champagne reception on arrival", ar: "استقبال بالشمبانيا عند الوصول", fr: "Réception champagne à l'arrivée" },
      { en: "Multi-course gourmet dinner", ar: "عشاء فاخر متعدد الأطباق", fr: "Dîner gastronomique" },
      { en: "Live band & midnight countdown", ar: "فرقة حية وعد تنازلي لمنتصف الليل", fr: "Groupe live & compte à rebours" },
      { en: "Midnight fireworks display", ar: "عرض الألعاب النارية عند منتصف الليل", fr: "Feux d'artifice à minuit" },
    ],
    includes: [
      { en: "VIP table seating", ar: "مقاعد VIP على الطاولة", fr: "Places VIP à table" },
      { en: "Welcome gift & party favors", ar: "هدية ترحيب وهدايا الحفلة", fr: "Cadeau de bienvenue & faveurs" },
      { en: "Premium open bar all night", ar: "بار مفتوح فاخر طوال الليلة", fr: "Bar ouvert premium toute la nuit" },
      { en: "Late night dessert & cake", ar: "حلويات وكعكة في وقت متأخر من الليل", fr: "Desserts & gâteau de minuit" },
    ],
  },
  {
    id: "8",
    slug: "eid-celebration",
    category: "seasonal",
    image: "/assets/images/photos/IMG_6676.JPG",
    capacity: 180,
    duration: { en: "Evening", ar: "مساء", fr: "Soirée" },
    title: { en: "Eid Celebration Night", ar: "ليلة احتفال العيد", fr: "Nuit de Célébration Eid" },
    tagline: { en: "Celebrate with those who matter", ar: "احتفل مع من تحبهم", fr: "Célébrez avec ceux qui comptent" },
    desc: {
      en: "Gather your loved ones for a magnificent Eid celebration at le hotel. Our dedicated Eid package combines traditional warmth with contemporary luxury, offering an extraordinary occasion to celebrate this blessed time together with family.",
      ar: "اجمع أحبائك لاحتفال عيد رائع في لو هوتيل. تجمع باقة العيد المخصصة الدفء التقليدي والفخامة المعاصرة.",
      fr: "Rassemblez vos proches pour une magnifique célébration de l'Eid au le hotel. Notre forfait Eid dédié combine chaleur traditionnelle et luxe contemporain.",
    },
    highlights: [
      { en: "Traditional & modern décor blend", ar: "مزيج من الديكور التقليدي والحديث", fr: "Mélange décor traditionnel & moderne" },
      { en: "Traditional sweets & gourmet buffet", ar: "حلويات تقليدية وبوفيه فاخر", fr: "Douceurs traditionnelles & buffet" },
      { en: "Live oriental music & Oud", ar: "موسيقى شرقية حية وعود", fr: "Musique orientale & Oud live" },
      { en: "Family-friendly setup", ar: "إعداد مناسب للعائلات", fr: "Installation familiale" },
    ],
    includes: [
      { en: "Traditional Eid decorations", ar: "ديكورات العيد التقليدية", fr: "Décorations traditionnelles Eid" },
      { en: "Gourmet buffet & sweets station", ar: "بوفيه فاخر ومحطة حلويات", fr: "Buffet & station sucreries" },
      { en: "Entertainment for all ages", ar: "ترفيه لجميع الأعمار", fr: "Divertissement pour tous âges" },
      { en: "Premium Eid gift bags", ar: "حقائب هدايا فاخرة للعيد", fr: "Sacs cadeaux Eid premium" },
    ],
  },
];

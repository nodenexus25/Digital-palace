
export interface Festival {
 id: string;
 name: string;
 hindiName: string;
 date: string;
 significance: string;
 rituals: string; // comma-separated list
 description: string;
 fullStory: string; // markdown content
 image: string;
}

// Religious Festivals
export const religiousFestivals: Festival[] = [
 {
 id: 'dussehra',
 name: 'Dussehra - Victory of Good over Evil',
 hindiName: 'दशहरा - असत्य पर सत्य की विजय',
 date: 'आश्विन शुक्ल दशमी',
 significance: 'दुर्गा माता की महिषासुर पर विजय',
 rituals: 'शस्त्र पूजा, भैंस बलि, रावण दहन',
 description: 'राजपूतों का सबसे महत्वपूर्ण त्योहार',
 fullStory: `दशहरा राजपूतों के लिए धर्म और वीरता का उत्सव है। मुख्य अनुष्ठान: शस्त्र पूजा, भैंस बलि, रावण दहन, देवी भजन, रामलीला।`,
 image: '/images/festivals/dussehra.png'
 },
 {
 id: 'holi',
 name: 'Holi - Festival of Colors and Unity',
 hindiName: 'होली - रंगों का पर्व और एकता',
 date: 'फाल्गुन पूर्णिमा',
 significance: 'भक्ति, एकता और बुराई का नाश',
 rituals: 'होलिका दहन, रंग-गुलाल, गुझिया, लोकगीत',
 description: 'राजपूत समाज में एकता और भाईचारे का पर्व',
 fullStory: `होलिका दहन के बाद रंग और भक्ति। राजस्थानी गीत, नृत्य और पारंपरिक व्यंजन।`,
 image: '/images/festivals/holi.jpg'
 },
 {
 id: 'navratri',
 name: 'Navratri',
 hindiName: 'नवरात्रि',
 date: 'आश्विन/चैत्र',
 significance: 'देवी की उपासना और शक्ति साधना',
 rituals: 'व्रत, गरबा/डांडिया, दुर्गा पूजन, हवन',
 description: 'शक्ति और साधना का नौ दिवसीय उत्सव',
 fullStory: `नवरात्रि में देवी की आराधना, व्रत और सांस्कृतिक नृत्य।`,
 image: '/images/festivals/navratri.jpg'
 },
 {
 id: 'vijayadashami',
 name: 'Dussehra / Vijayadashami',
 hindiName: 'दशहरा / विजयादशमी',
 date: 'आश्विन शुक्ल दशमी',
 significance: 'असत्य पर सत्य की विजय',
 rituals: 'शस्त्र पूजा, रावण दहन, दुर्गा भजन',
 description: 'धर्म विजय का स्मरण',
 fullStory: `विजयादशमी पर शस्त्र पूजन और बुराई का नाश।`,
 image: '/images/festivals/vijayadashami.jpg'
 },
 {
 id: 'diwali-raj-tilak-diwas',
 name: 'Diwali (Raj Tilak Diwas)',
 hindiName: 'दीवाली (राज तिलक दिवस)',
 date: 'कार्तिक अमावस्या',
 significance: 'लक्ष्मी-गणेश पूजन, राजतिलक स्मरण',
 rituals: 'दीप-प्रज्ज्वलन, लक्ष्मी पूजन, शस्त्र पूजन',
 description: 'राजपरिवारों में दीपोत्सव और तिलक परंपरा',
 fullStory: `दीवाली में दीप, लक्ष्मी-गणेश पूजन और शस्त्र सम्मान।`,
 image: '/images/festivals/diwali-raj-tilak-diwas.jpg'
 },
 {
 id: 'janmashtami',
 name: 'Janmashtami',
 hindiName: 'जन्माष्टमी',
 date: 'भाद्रपद कृष्ण अष्टमी',
 significance: 'कृष्ण जन्म उत्सव',
 rituals: 'मध्यरात्रि पूजा, माखन-चोर लीला, झांकी',
 description: 'कृष्ण भक्ति का उत्सव',
 fullStory: `कृष्ण जन्म की झांकियाँ और भक्ति-गीत।`,
 image: '/images/festivals/janmashtami.jpg'
 },
 {
 id: 'shivratri',
 name: 'Mahashivratri',
 hindiName: 'महाशिवरात्रि',
 date: 'फाल्गुन कृष्ण चतुर्दशी',
 significance: 'शिव-शक्ति का मिलन',
 rituals: 'रुद्राभिषेक, व्रत, रात्रि जागरण',
 description: 'शिव आराधना का पर्व',
 fullStory: `रुद्राभिषेक और उपवास के साथ आध्यात्मिक साधना।`,
 image: '/images/festivals/shivratri.jpg'
 },
 {
 id: 'ram-navami',
 name: 'Ram Navami',
 hindiName: 'राम नवमी',
 date: 'चैत्र शुक्ल नवमी',
 significance: 'राम जन्म उत्सव',
 rituals: 'कथा, भजन, राम-लला पूजन',
 description: 'राम की आदर्श मर्यादाओं का स्मरण',
 fullStory: `राम जन्म और भक्ति का उत्सव।`,
 image: '/images/festivals/ram-navami.jpg'
 },
 {
 id: 'kartik-purnima',
 name: 'Kartik Purnima',
 hindiName: 'कार्तिक पूर्णिमा',
 date: 'कार्तिक पूर्णिमा',
 significance: 'धर्म-स्नान और दीपदान',
 rituals: 'दीपदान, तीर्थ-स्नान, पूजा',
 description: 'पवित्र स्नान और दीपदान परंपरा',
 fullStory: `तीर्थों में स्नान और दीपदान।`,
 image: '/images/festivals/kartik-purnima.jpg'
 },
 {
 id: 'basant-panchami',
 name: 'Basant Panchami',
 hindiName: 'बसंत पंचमी',
 date: 'मघ शुक्ल पंचमी',
 significance: 'सरस्वती पूजा',
 rituals: 'पीला वस्त्र, भजन, पूजा',
 description: 'विद्या और बसंत का स्वागत',
 fullStory: `सरस्वती पूजा और बसंती रंगों का उत्सव।`,
 image: '/images/festivals/basant-panchami.jpg'
 },
 {
 id: 'akshay-tritiya',
 name: 'Akshay Tritiya',
 hindiName: 'अक्षय तृतीया',
 date: 'वैशाख शुक्ल तृतीया',
 significance: 'शुभ आरंभ और दान',
 rituals: 'दान, पूजन, विवाह संस्कार',
 description: 'अक्षय फल देने वाला शुभ दिवस',
 fullStory: `दान और शुभ कार्यों का आरंभ।`,
 image: '/images/festivals/akshay-tritiya.jpg'
 },
 {
 id: 'raksha-bandhan',
 name: 'Raksha Bandhan',
 hindiName: 'रक्षा बंधन',
 date: 'श्रावण पूर्णिमा',
 significance: 'भाई-बहन के संबंध का उत्सव',
 rituals: 'राखी बांधना, आशीर्वाद, उपहार',
 description: 'सुरक्षा और स्नेह का वचन',
 fullStory: `राखी और सुरक्षा का वचन।`,
 image: '/images/festivals/raksha-bandhan.jpg'
 }
];

// Cultural Festivals
export const culturalFestivals: Festival[] = [
 {
 id: 'teej',
 name: 'Teej - Monsoon Festival',
 hindiName: 'तीज - सावन का त्योहार',
 date: 'श्रावण शुक्ल तृतीया',
 significance: 'वैवाहिक सुख और प्रेम',
 rituals: 'झूला, मेहंदी, सोलह श्रृंगार, गीत, लोकनृत्य',
 description: 'राजपूत महिलाओं का प्रिय त्योहार',
 fullStory: `झूला, मेहंदी और सोलह श्रृंगार के साथ सावन का उत्सव।`,
 image: '/images/festivals/teej.jpg'
 },
 {
 id: 'gangaur',
 name: 'Gangaur Festival',
 hindiName: 'गणगौर उत्सव',
 date: 'चैत्र',
 significance: 'गौरी-पार्वती का पूजन और सौभाग्य',
 rituals: 'गौरी पूजन, सिंदूर, जल-विहार, शोभायात्रा',
 description: 'रानी-सा के श्रृंगार का उत्सव',
 fullStory: `गौरी माँ के पूजन, जल-विहार और शोभायात्राएँ।`,
 image: '/images/festivals/gangaur.jpg'
 },
 {
 id: 'gangaur-mela',
 name: 'Gangaur Mela',
 hindiName: 'गणगौर मेला',
 date: 'चैत्र',
 significance: 'गौरी-पार्वती की कृपा और सौभाग्य',
 rituals: 'मेला, लोकनृत्य, शोभायात्रा, पूजा',
 description: 'गणगौर के विस्तृत मेले और सांस्कृतिक कार्यक्रम',
 fullStory: `लोकनृत्य, गीत और सांस्कृतिक मंचन।`,
 image: '/images/festivals/gangaur-mela.jpg'
 },
 {
 id: 'marwar-festival',
 name: 'Marwar Festival',
 hindiName: 'मारवाड़ उत्सव',
 date: 'अश्विन',
 significance: 'मारवाड़ संस्कृति का उत्सव',
 rituals: 'लोकनृत्य, वीर-गीत, ऊँट शो, सांस्कृतिक मंचन',
 description: 'जोधपुर क्षेत्र का सांस्कृतिक महोत्सव',
 fullStory: `वीर-गीत, नृत्य और ऊँट शो।`,
 image: '/images/festivals/marwar-festival.jpg'
 },
 {
 id: 'desert-festival-jaisalmer',
 name: 'Desert Festival (Jaisalmer)',
 hindiName: 'थार मरुस्थल उत्सव (जैसलमेर)',
 date: 'माघ/फाल्गुन',
 significance: 'थार की सांस्कृतिक धरोहर',
 rituals: 'ऊँट दौड़, लोकनृत्य, रेत कला, मंचन',
 description: 'थार मरुस्थल की संस्कृति का भव्य उत्सव',
 fullStory: `रेगिस्तानी खेल और लोककला।`,
 image: '/images/festivals/desert-festival-jaisalmer.jpg'
 },
 {
 id: 'mevar-festival-udaipur',
 name: 'Mewar Festival (Udaipur)',
 hindiName: 'मेवाड़ उत्सव (उदयपुर)',
 date: 'चैत्र',
 significance: 'मेवाड़ की सांस्कृतिक परंपरा',
 rituals: 'शोभायात्रा, लोकनृत्य, शस्त्र प्रदर्शन',
 description: 'उदयपुर में सांस्कृतिक धरोहर का उत्सव',
 fullStory: `शोभायात्रा और सांस्कृतिक कार्यक्रम।`,
 image: '/images/festivals/mevar-festival-udaipur.jpg'
 },
 {
 id: 'chittorgarh-jauhar-mela',
 name: 'Chittorgarh Jauhar Mela',
 hindiName: 'चित्तौड़गढ़ जौहर मेला',
 date: 'फाल्गुन',
 significance: 'राजपूत स्त्रियों के जौहर का स्मरण',
 rituals: 'स्मृति सभा, शोभायात्रा, वीर-गीत, पुष्पांजलि',
 description: 'जौहर की आध्यात्मिक और ऐतिहासिक स्मृति',
 fullStory: `रानी पद्मिनी और स्त्रियों के जौहर की स्मृति।`,
 image: '/images/festivals/chittorgarh-jauhar-mela.jpg'
 }
];

// Commemorations & Warrior Traditions
export const commemorationFestivals: Festival[] = [
 {
 id: 'rajputana-vijay-diwas',
 name: 'Rajputana Vijay Diwas',
 hindiName: 'राजपूताना विजय दिवस',
 date: 'विभिन्न युद्धों के अनुसार',
 significance: 'राजपूत विजय और शौर्य का स्मरण',
 rituals: 'शौर्य वंदना, शस्त्र प्रदर्शनी, वीर-गीत, पुष्पांजलि',
 description: 'विजयों के दिवस पर शौर्य का उत्सव',
 fullStory: `विजयों का सामूहिक स्मरण — शस्त्र पूजन और वीर-गीत।`,
 image: '/images/festivals/rajputana-vijay-diwas.jpg'
 },
 {
 id: 'rath-yatra-rajput-warriors',
 name: 'Rath Yatra of Rajput Warriors',
 hindiName: 'राजपूत योद्धाओं की रथ यात्रा',
 date: 'विशेष उत्सव दिवस',
 significance: 'योद्धा परंपरा और शस्त्र-सम्मान',
 rituals: 'रथ शोभायात्रा, शस्त्र-धारण, जय घोष, स्तुति',
 description: 'राजपूत योद्धाओं की रथ-शोभायात्रा परंपरा',
 fullStory: `शस्त्र-धारण के साथ रथों की शोभायात्रा और जय-घोष।`,
 image: '/images/festivals/rath-yatra-rajput-warriors.jpg'
 },
 {
 id: 'shastra-tilak-puja',
 name: 'Shastra Tilak / Shastra Puja',
 hindiName: 'शस्त्र तिलक / शस्त्र पूजा',
 date: 'दशहरा/विशेष अवसर',
 significance: 'शस्त्रों का आध्यात्मिक सम्मान',
 rituals: 'तिलक, पुष्प, धूप-दीप, मंत्रोच्चार, संकल्प',
 description: 'शस्त्रों को धर्म-साधन मानकर पूजा',
 fullStory: `तलवार, भाला, धनुष आदि का तिलक और मंत्रोच्चार।`,
 image: '/images/festivals/shastra-tilak-puja.jpg'
 },
 {
 id: 'kshatriya-ekadashi',
 name: 'Kshatriya Ekadashi',
 hindiName: 'क्षत्रिय एकादशी',
 date: 'विशेष एकादशी',
 significance: 'क्षत्रिय धर्म का स्मरण और व्रत',
 rituals: 'व्रत, कथा, शस्त्र-स्मरण, दान',
 description: 'क्षत्रिय धर्म के आदर्शों का पालन',
 fullStory: `व्रत और धर्म-स्मरण, शौर्य-संकल्प।`,
 image: '/images/festivals/kshatriya-ekadashi.gif'
 },
 {
 id: 'jauhar-smriti-diwas',
 name: 'Jauhar Smriti Diwas',
 hindiName: 'जौहर स्मृति दिवस',
 date: 'ऐतिहासिक तिथि',
 significance: 'राजपूत स्त्रियों के साहस का स्मरण',
 rituals: 'स्मृति-सभा, पुष्पांजलि, वीर-गीत, दीपदान',
 description: 'जौहर परंपरा की स्मृति और श्रद्धांजलि',
 fullStory: `जौहर की गाथाओं का स्मरण और श्रद्धांजलि।`,
 image: '/images/festivals/jauhar-smriti-diwas.jpg'
 },
 {
 id: 'haldi-ghati-vijay-parv',
 name: 'Haldi Ghati Vijay Parv',
 hindiName: 'हल्दीघाटी विजय पर्व',
 date: '18 जून (परंपरागत स्मरण)',
 significance: 'महाराणा प्रताप के शौर्य का स्मरण',
 rituals: 'शस्त्र-धारण, वीर-गीत, पुष्पांजलि',
 description: 'हल्दीघाटी युद्ध की वीरता का उत्सव',
 fullStory: `महाराणा प्रताप के शौर्य का स्मरण।`,
 image: '/images/festivals/haldi-ghati-vijay-parv.jpg'
 },
 {
 id: 'pratap-jayanti',
 name: 'Pratap Jayanti',
 hindiName: 'प्रताप जयंती',
 date: 'ज्येष्ठ शुक्ल तृतीया (परंपरा)',
 significance: 'महाराणा प्रताप का जन्मोत्सव',
 rituals: 'शस्त्र-पूजन, शोभायात्रा, वीर-गीत',
 description: 'मेवाड़ में प्रताप जयंती का भव्य आयोजन',
 fullStory: `प्रताप के जन्मोत्सव पर शस्त्र-पूजन और शौर्य-गीत।`,
 image: '/images/festivals/pratap-jayanti.jpg'
 },
 {
 id: 'hammir-jayanti',
 name: 'Hammir Jayanti',
 hindiName: 'हम्मीर जयंती',
 date: 'ऐतिहासिक तिथि',
 significance: 'राणा हम्मीर का स्मरण',
 rituals: 'स्मरण-सभा, वीर-गीत, पुष्पांजलि',
 description: 'हम्मीर के पराक्रम का स्मरण',
 fullStory: `राणा हम्मीर के पराक्रम और राज्य पुनर्स्थापन का स्मरण।`,
 image: '/images/festivals/hammir-jayanti.jpg'
 },
 {
 id: 'durgadas-jayanti',
 name: 'Durgadas Jayanti',
 hindiName: 'दुर्गादास जयंती',
 date: 'ऐतिहासिक तिथि',
 significance: 'दुर्गादास राठौड़ का स्मरण',
 rituals: 'वीर-गीत, कथा-वाचन, पुष्पांजलि',
 description: 'दुर्गादास के पराक्रम की कथा का स्मरण',
 fullStory: `दुर्गादास राठौड़ के राज्य-रक्षा और साहस की गाथा।`,
 image: '/images/festivals/durgadas-jayanti.jpg'
 },
 {
 id: 'rawal-nainsi-jayanti',
 name: 'Rawal Nainsi Jayanti',
 hindiName: 'रावण नैणसी जयंती',
 date: 'ऐतिहासिक तिथि',
 significance: 'इतिहासकार-प्रशासक रावण नैणसी का स्मरण',
 rituals: 'कथा-वाचन, ग्रंथ-पाठ, पुष्पांजलि',
 description: 'रावण नैणसी के योगदान का स्मरण',
 fullStory: `राजस्थानी इतिहास के महत्वपूर्ण ग्रंथकार का स्मरण।`,
 image: '/images/festivals/rawal-nainsi-jayanti.jpg'
 },
 {
 id: 'mewar-foundation-day',
 name: 'Mewar Foundation Day',
 hindiName: 'मेवाड़ स्थापना दिवस',
 date: 'ऐतिहासिक तिथि',
 significance: 'मेवाड़ राज्य की स्थापना का उत्सव',
 rituals: 'ध्वजारोहण, सांस्कृतिक कार्यक्रम, इतिहास-चर्चा',
 description: 'मेवाड़ राज्य की ऐतिहासिक स्थापना का पर्व',
 fullStory: `मेवाड़ राज्य की स्थापना और गौरवशाली इतिहास।`,
 image: '/images/festivals/mewar-foundation-day.jpg'
 },
 {
 id: 'marwar-foundation-day',
 name: 'Marwar Foundation Day',
 hindiName: 'मारवाड़ स्थापना दिवस',
 date: 'ऐतिहासिक तिथि',
 significance: 'मारवाड़ राज्य की स्थापना का उत्सव',
 rituals: 'उत्सव, लोकनृत्य, इतिहास-स्मरण',
 description: 'मारवाड़ राज्य की स्थापना का गौरवशाली दिन',
 fullStory: `मारवाड़ राज्य की स्थापना और राठौड़ वंश का इतिहास।`,
 image: '/images/festivals/marwar-foundation-day.jpg'
 },
 {
 id: 'bikaner-foundation-day',
 name: 'Bikaner Foundation Day',
 hindiName: 'बीकानेर स्थापना दिवस',
 date: 'आखा तीज (वैशाख शुक्ल तृतीया)',
 significance: 'राव बीका द्वारा बीकानेर की स्थापना',
 rituals: 'पतंगबाजी, लोकगीत, उत्सव',
 description: 'बीकानेर स्थापना का ऐतिहासिक पर्व',
 fullStory: `राव बीका द्वारा बीकानेर की स्थापना और उत्सव।`,
 image: '/images/festivals/bikaner-foundation-day.jpg'
 }
];

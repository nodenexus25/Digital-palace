
import { Monument } from '@/types/frontend';





export const monumentsData: Monument[] = [
 // FORTS
 {
 id: 'chittorgarh',
 name: 'Chittorgarh Fort',
 hindiName: 'Chittorgarh Fort',
 location: 'Chittorgarh, Rajasthan',
 builtBy: 'Maurya Dynasty',
 period: '8th Century CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site',
 significance: [
 'Largest fort complex in India covering 700 acres',
 'Symbol of Rajput valor, honor and sacrifice',
 'Site of three historic jauhars (mass self-immolation)',
 'Capital of Mewar kingdom for over 800 years',
 'Witnessed legendary battles against Alauddin Khilji and Akbar',
 'Home to the legendary Queen Padmini'
 ],
 architecture: [
 'Massive fortification walls spanning 13 kilometers with 7 gates',
 'Vijay Stambh (Tower of Victory) - 37 meters high, 9-story structure',
 'Kirti Stambh (Tower of Fame) - 22-meter Jain temple tower',
 'Rana Kumbha Palace - largest palace complex with underground chambers',
 'Padmini Palace - water palace with lotus pool and reflection chambers',
 'Kalika Mata Temple - 8th-century temple with intricate carvings',
 'Meera Temple - dedicated to the famous poet-saint Meera Bai',
 'Gaumukh Reservoir - ancient water harvesting system with natural spring',
 'Kumbha Shyam Temple - exquisite architecture and sculptures',
 'Samadhisvar Temple - unique circular design and spiritual significance',
 'Fateh Prakash Palace - museum housing royal artifacts',
 'Bhimlat Kund - sacred water tank with mythological significance'
 ],
 description: 'The most iconic fortress of Rajputana, Chittorgarh stands as an eternal symbol of Rajput courage, honor, and sacrifice. This massive hilltop fortress witnessed some of the most heroic and tragic chapters in Indian history.',
 detailedHistory: 'Founded in the 8th century by the Maurya dynasty, Chittorgarh became the capital of Mewar and witnessed three major sieges. The first siege by Alauddin Khilji in 1303 was to capture the beautiful Queen Padmini. The second siege in 1535 was by Bahadur Shah of Gujarat, and the third in 1567-68 by Emperor Akbar. Each siege ended with jauhar, where Rajput women chose death over dishonor.',
 culturalSignificance: 'Chittorgarh represents the pinnacle of Rajput values - honor above life. The fort is immortalized in folklore, ballads, and literature. It symbolizes the resistance against foreign invasions and the preservation of Hindu dharma and culture.',
 interestingFacts: [
 'The fort has 65 historic structures including palaces, temples, and towers',
 'Vijay Stambh was built to commemorate victory over Mahmud Khilji',
 'The fort never fell to direct assault - only through prolonged sieges',
 'Meera Bai, the famous devotee of Krishna, lived here',
 'The fort has 84 water bodies including stepwells and tanks'
 ],
 fortStories: [
 {
 title: 'The Legend of Queen Padmini',
 category: 'Legend',
 content: 'Rani Padmini, renowned for her unparalleled beauty, became the obsession of Sultan Alauddin Khilji. According to legend, Khilji heard of her beauty from a banished courtier and demanded to see her. The Rajput warriors refused, but agreed to let him see her reflection in a mirror. When Khilji saw her reflection, he became determined to possess her. He attacked Chittorgarh with a massive army. Rana Ratan Singh was captured through treachery, but Padmini devised a clever plan. She sent 700 palanquins carrying armed warriors disguised as women to rescue her husband. The rescue succeeded, but Khilji returned with an even larger force. Realizing the inevitable defeat, Rani Padmini led 16,000 women in jauhar - mass self-immolation - choosing death over dishonor. Her sacrifice became immortalized in Rajput folklore and poetry, symbolizing the ultimate act of honor and purity.'
 },
 {
 title: 'The First Jauhar of Chittorgarh (1303)',
 category: 'Historical Event',
 content: 'The siege of 1303 by Alauddin Khilji marked one of the darkest yet most heroic chapters in Rajput history. After months of fierce resistance, the defenders realized defeat was inevitable. Rani Padmini, along with thousands of women, chose the path of jauhar rather than face capture. The women dressed in their finest clothes, adorned themselves with jewelry, and walked into massive fire pits while chanting prayers. The men, knowing their families had chosen honor over life, donned saffron robes and rode out to certain death in the final battle. This act of collective sacrifice shocked even the victorious Khilji, who reportedly ordered his troops to respect the fallen warriors. The ashes of the jauhar site are still revered, and the event became a defining moment in Rajput identity, establishing the principle of death before dishonor that would guide future generations.'
 },
 {
 title: 'The Second Jauhar (1535)',
 category: 'Historical Event',
 content: 'Three decades after the first reconstruction, Chittorgarh faced another existential threat. Bahadur Shah of Gujarat, seeking to expand his territory, laid siege to the fort with a massive army equipped with heavy artillery. The siege lasted for months, with the defenders putting up fierce resistance. Rani Karnavati, the regent queen and mother of the heir, led the defense. When defeat seemed certain, she once again chose jauhar for herself and thousands of women. This second jauhar was even more tragic as it came after the fort had been rebuilt and repopulated. The young prince Udai Singh was secretly smuggled out of the fort to preserve the royal lineage. The boy would later found the city of Udaipur, ensuring the survival of the Mewar dynasty despite the fall of their ancestral capital.'
 },
 {
 title: 'The Third and Final Jauhar (1568)',
 category: 'Historical Event',
 content: 'The most devastating siege came from Emperor Akbar himself. Determined to bring the proud kingdom of Mewar under Mughal control, Akbar personally led the siege with over 80,000 troops and advanced artillery. The siege lasted from October 1567 to February 1568, with the defenders putting up heroic resistance. Jaimal and Patta, two legendary warriors, led the defense. Despite being heavily outnumbered and outgunned, they held out for months. When Jaimal was killed by a Mughal bullet, Patta took command. Realizing the end was near, the women once again chose jauhar, while the men prepared for the final battle. This third jauhar marked the permanent abandonment of Chittorgarh as the capital of Mewar. The scale of sacrifice was unprecedented, with estimates suggesting over 30,000 people perished. Akbar, moved by the bravery of the defenders, erected statues of Jaimal and Patta at his court in Agra, honoring their valor even in defeat.'
 },
 {
 title: 'The Miracle of Gaumukh Reservoir',
 category: 'Myth/Legend',
 content: 'Legend speaks of the Gaumukh Reservoir within Chittorgarh as having divine origins. During a severe drought that threatened the fort\'s survival, the people prayed to Goddess Ganga for water. Moved by their devotion, the goddess appeared to a holy man and guided him to a spot within the fort where a natural spring existed. The spring was shaped like a cow\'s mouth (Gaumukh), hence the name. The water was said to have healing properties and never dried up, even during the worst droughts. During sieges, this reservoir became the fort\'s lifeline, providing water when all other sources were cut off. Local belief holds that as long as Gaumukh flows, Chittorgarh will never truly fall. Even today, the spring continues to flow, and pilgrims consider its water sacred. The reservoir is also associated with the legend of Rani Padmini, who is said to have performed her daily rituals there.'
 },
 {
 title: 'The Curse of the Fort',
 category: 'Myth/Legend',
 content: 'Ancient legend speaks of a curse that befell Chittorgarh. A sage, angered by the pride of the ruling king, cursed the fort that it would witness repeated destruction and sacrifice. The curse predicted that the fort would fall three times, each time requiring the ultimate sacrifice of its inhabitants. This prophecy eerily came true with the three jauhars that occurred over the centuries. Some versions of the legend suggest that the curse can only be lifted when true peace comes to the land and the fort is no longer needed for defense. Others believe that the spirits of the fallen warriors still guard the fort, protecting it from future invasions. Local folklore speaks of hearing the sounds of battle and the chanting of women during certain nights, particularly during festivals. The curse has become part of the fort\'s mystique, attracting both historians and spiritual seekers.'
 },
 {
 title: 'The Underground Tunnels',
 category: 'Historical Mystery',
 content: 'Local legends speak of an extensive network of underground tunnels beneath Chittorgarh, connecting various palaces and temples. These tunnels were said to serve multiple purposes - secret escape routes for royalty, hidden passages for spies, and storage for treasures. During the sieges, these tunnels allowed defenders to move supplies and reinforcements without being seen by the enemy. One particularly famous tunnel is said to connect the Rana Kumbha Palace to the Gaumukh Reservoir, allowing secret access to water during blockades. Another legend speaks of a tunnel that extends for miles beyond the fort walls, used by Prince Udai Singh to escape during the final siege. While many of these tunnels have collapsed over time, some sections are still accessible and have been partially explored. Archaeologists continue to discover new passages, suggesting the underground network was far more extensive than previously known.'
 }
 ],
 icon: '',
 coordinates: '24.8887°N, 74.6269°E',
 visitingHours: '9:30 AM - 6:30 PM',
 entryFee: '₹40 for Indians, ₹600 for foreigners',
 images: [
 {
 src: '/images/forts/chittorgarh/500px-Chittorgarh_fort.JPG',
 alt: 'Panoramic view of Chittorgarh Fort',
 credit: 'Wikimedia Commons'
 },
 {
 src: '/images/forts/chittorgarh/500px-Vijaya_Stambha__Chittorgarh_2011-12-14_9.jpg',
 alt: 'Vijay Stambh (Tower of Victory) at Chittorgarh',
 credit: 'Wikimedia Commons'
 },
 {
 src: '/images/forts/chittorgarh/500px-Kirti_Stambha.jpg',
 alt: 'Kirti Stambh in Chittorgarh',
 credit: 'Wikimedia Commons'
 },
 {
 src: '/images/forts/chittorgarh/250px-Chittaur_fort-1.jpg',
 alt: 'Chittorgarh stone walls at sunset'
 },
 {
 src: '/images/forts/chittorgarh/500px-Chittorgarh_fort.JPG',
 alt: 'Padmini Palace in Chittorgarh Fort',
 },
 {
 src: '/images/forts/chittorgarh/960px-Chittorgarh_-_Gaumukh_Reservoir_-_Adjusted.jpg',
 alt: 'Gaumukh Kund at Chittorgarh Fort',
 },
 {
 src: '/images/forts/chittorgarh/500px-Chittorgarh_fort.JPG',
 alt: 'Temples inside Chittorgarh Fort',
 },
 {
 src: '/images/forts/chittorgarh/1280px-Chittorgarh_s_Jauhar_Kund_in_fort.jpg',
 alt: 'Jauhar Kund at Chittorgarh Fort',
 }
 ],
 videos: [
 {
 title: 'Chittorgarh Fort Documentary',
 provider: 'youtube',
 url: 'https://www.youtube.com/watch?v=QeYyW8rVf0U'
 },
 {
 title: 'Exploring Vijay Stambh',
 provider: 'youtube',
 url: 'https://youtu.be/d9mE9RjYJ-w'
 }
 ]
 },
 {
 id: 'amber',
 name: 'Amber Fort (Amer Fort)',
 hindiName: 'Amber Fort (Amer Fort)',
 location: 'Amer, Jaipur, Rajasthan',
 builtBy: 'Raja Man Singh I',
 dynasty: 'Kachwaha',
 period: '1592 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site',
 significance: [
 'Capital of Kachwaha Rajputs for over 600 years',
 'Perfect blend of Hindu-Mughal architecture',
 'Strategic location controlling trade routes',
 'Center of art, culture and learning',
 'Symbol of Rajput-Mughal alliance',
 'Architectural inspiration for later Rajput palaces'
 ],
 architecture: [
 'Red sandstone and white marble construction',
 'Sheesh Mahal (Hall of Mirrors) with intricate mirror work',
 'Diwan-i-Aam (Hall of Public Audience)',
 'Diwan-i-Khas (Hall of Private Audience)',
 'Sukh Niwas (Hall of Pleasure) with cooling system',
 'Ganesh Pol - ornate gateway with frescoes',
 'Zenana quarters with beautiful gardens',
 'Maota Lake providing water and defense'
 ],
 description: 'The magnificent Amber Fort showcases the grandeur of Kachwaha Rajputs. Built with red sandstone and marble, it represents the perfect synthesis of Rajput and Mughal architectural styles.',
 detailedHistory: 'Built by Raja Man Singh I, a trusted general of Emperor Akbar, Amber Fort served as the capital of Amber State. The fort was expanded by successive rulers including Jai Singh I and Sawai Jai Singh II. It remained the seat of power until Jaipur was founded in 1727.',
 culturalSignificance: 'Amber Fort represents the golden age of Rajput-Mughal relations. It showcases how Rajput rulers maintained their cultural identity while adapting to Mughal architectural influences. The fort is a testament to the diplomatic skills of Kachwaha rulers.',
 interestingFacts: [
 'The Sheesh Mahal can be illuminated by a single candle flame',
 'The fort has a secret tunnel connecting to Jaigarh Fort',
 'Elephant rides to the fort entrance are a popular tourist attraction',
 'The fort appears in numerous Bollywood films',
 'Sound and light show narrates the fort\'s history every evening'
 ],
 fortStories: [
 {
 title: 'The Construction Miracle of Sheesh Mahal',
 category: 'Legend',
 content: 'Legend tells of the extraordinary construction of Sheesh Mahal (Hall of Mirrors). Raja Man Singh I wanted to create a palace that would capture the essence of starlight even during the day. He commissioned the finest craftsmen from across his kingdom and beyond. The story goes that the chief architect was given an impossible task - to create a room where a single candle could illuminate the entire space like a thousand stars. After months of failed attempts, the architect prayed to Lord Ganesha for guidance. That night, he dreamt of covering the walls and ceiling with thousands of tiny mirrors arranged in geometric patterns. When completed, the effect was magical - a single candle flame would reflect off thousands of mirrors, creating the illusion of a starlit sky. The Raja was so pleased that he rewarded the architect with gold equal to his weight. The Sheesh Mahal became famous throughout the Mughal Empire, with Emperor Akbar himself visiting to witness this architectural marvel.'
 },
 {
 title: 'The Secret Tunnel to Jaigarh',
 category: 'Historical Mystery',
 content: 'Local legends speak of a secret underground tunnel connecting Amber Fort to Jaigarh Fort, built as an escape route for the royal family during emergencies. The tunnel, said to be over 2 kilometers long, was constructed during the reign of Raja Man Singh I. It was designed with multiple chambers and ventilation shafts, allowing the royals to move safely between the two forts. The tunnel allegedly had hidden exits at various points and was wide enough for elephants to pass through. During times of siege, this tunnel allowed the royal family to escape to the more secure Jaigarh Fort, which served as the treasury and military stronghold. The tunnel was also used to transport treasures and supplies between the forts without being detected by enemies. While parts of this tunnel have been discovered and opened to tourists, local legends claim that the main section remains hidden, containing ancient treasures and secrets of the Kachwaha dynasty. Some believe the tunnel extends even further, connecting to hidden chambers beneath the Aravalli hills.'
 },
 {
 title: 'The Curse of the Sati',
 category: 'Ghost Story',
 content: 'A haunting legend surrounds the palace complex, particularly the zenana quarters. During the construction of the fort, a young queen named Ratnavati was accused of infidelity and condemned to commit sati (ritual self-immolation) on her husband\'s funeral pyre. Before her death, she cursed the fort, declaring that no woman would ever find lasting happiness within its walls. Since then, numerous mysterious incidents have been reported. Palace guards have claimed to see a woman in white wandering the corridors at night, weeping softly. Some have reported hearing the clinking of jewelry and the rustle of silk garments in empty rooms. During full moon nights, visitors have reported feeling sudden cold spots and hearing a woman\'s voice singing melancholic songs. Local priests perform regular rituals to appease the spirit, and many believe that the curse was the reason why the capital was eventually moved to Jaipur. Even today, some women visitors report feeling uneasy in certain parts of the palace, particularly near the old zenana quarters.'
 },
 {
 title: 'The Royal Elephant Procession',
 category: 'Historical Event',
 content: 'One of the most magnificent events in Amber Fort\'s history was the royal elephant procession during the coronation of Maharaja Jai Singh I. The procession featured over 500 decorated elephants carrying nobles, courtiers, and foreign dignitaries up the steep path to the fort. The lead elephant carried the royal howdah made of solid gold and studded with precious gems. The story goes that the procession was so grand that it took over 6 hours for all the elephants to reach the fort. Each elephant was decorated with gold and silver ornaments, colorful fabrics, and precious stones. The mahouts wore traditional attire and played musical instruments. The procession was accompanied by thousands of soldiers, dancers, musicians, and common people. The fort\'s ramparts were decorated with thousands of oil lamps, creating a spectacular sight visible from miles away. Foreign visitors, including European travelers, wrote detailed accounts of this magnificent display of Rajput grandeur. The event became legendary, and stories of the golden procession spread throughout the Mughal Empire and beyond.'
 },
 {
 title: 'The Hidden Treasure of Maota Lake',
 category: 'Treasure Legend',
 content: 'Local folklore speaks of a vast treasure hidden in the depths of Maota Lake, which lies at the foot of Amber Fort. According to legend, when the Mughal Emperor Aurangzeb sent his forces to capture the fort, the Kachwaha rulers decided to hide their most precious treasures rather than let them fall into enemy hands. They allegedly loaded hundreds of chests with gold coins, jewelry, and precious artifacts onto boats and sank them in the deepest parts of the lake. The operation was carried out in secret, with only a few trusted officials knowing the exact locations. The story claims that a detailed map showing the treasure locations was encoded in the frescoes of the Sheesh Mahal, but the key to deciphering it was lost when the last ruler died. Over the centuries, many treasure hunters have searched the lake, but none have found the main treasure. Some claim to have found small caches of coins and jewelry, fueling speculation that the larger treasure still exists. The Rajasthan government has banned treasure hunting in the lake, citing archaeological and environmental concerns, but the legend continues to attract adventurers and fortune seekers.'
 },
 {
 title: 'The Diplomatic Marriage Alliance',
 category: 'Historical Event',
 content: 'The construction of Amber Fort was closely tied to a significant diplomatic marriage alliance between the Kachwaha dynasty and the Mughal Empire. Raja Bharmal, seeking to strengthen his position against rival Rajput kingdoms, offered his daughter Mariam-uz-Zamani (Harka Bai) in marriage to Emperor Akbar. This alliance was unprecedented, as it was one of the first times a Rajput princess married a Mughal emperor. The marriage brought enormous benefits to the Kachwaha dynasty, including military support, trade privileges, and cultural exchange. Raja Man Singh I, the son of this union, became one of Akbar\'s most trusted generals and was appointed to the highest ranks of the Mughal administration. The fort was expanded and beautified to reflect the new status of the dynasty. The marriage also facilitated the exchange of architectural styles, artisans, and cultural practices. Hindu and Islamic architectural elements were blended to create the unique style seen in Amber Fort. This alliance set a precedent for other Rajput kingdoms and helped establish a period of relative peace and prosperity in the region. The fort became a symbol of successful Rajput-Mughal cooperation.'
 }
 ],
 icon: '',
 coordinates: '26.9855°N, 75.8513°E',
 visitingHours: '8:00 AM - 6:00 PM',
 entryFee: '₹100 for Indians, ₹550 for foreigners',
 images: [
 {
 src: '/images/forts/amber/Amber_fort_jaipur.jpg',
 alt: 'Panoramic view of Amber Fort',
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Diwan-i-Aam (Hall of Public Audience) at Amber Fort',
 },
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'Diwan-i-Khas (Hall of Private Audience) at Amber Fort'
 },
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'Sheesh Mahal (Hall of Mirrors) at Amber Fort',
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Sukh Niwas (Hall of Pleasure) at Amber Fort',
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Ganesh Pol at Amber Fort'
 },
 {
 src: '/images/forts/amber/Amber_fort_jaipur.jpg',
 alt: 'Maota Lake at Amber Fort'
 },
 {
 src: '/images/forts/amber/960px-Amber_fort_tunnels.jpg',
 alt: 'Tunnels at Amber Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'jaigarh',
 name: 'Jaigarh Fort',
 hindiName: 'Jaigarh Fort',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Maharaja Jai Singh II',
 period: '1726 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Protected Monument',
 significance: [
 'Known as the Fort of Victory',
 'Houses the world\'s largest wheeled cannon - Jaivana',
 'Treasury of Kachwaha rulers',
 'Strategic military importance',
 'Connected to Amber Fort via underground passages',
 'Center of weapon manufacturing'
 ],
 architecture: [
 'Massive red sandstone walls',
 'Jaivana Cannon - 50-ton bronze cannon',
 'Laxmi Vilas palace complex',
 'Lalit Mandir with beautiful frescoes',
 'Vilas Mandir assembly hall',
 'Aram Mandir garden palace',
 'Water harvesting systems and granaries',
 'Watchtowers with panoramic views'
 ],
 description: 'Built by Maharaja Jai Singh II, Jaigarh Fort served as the military stronghold and treasury of the Kachwaha rulers. The fort is famous for housing Jaivana, the world\'s largest wheeled cannon.',
 detailedHistory: 'Constructed in 1726 by Maharaja Jai Singh II, Jaigarh Fort was built to protect Amber Fort and the city of Jaipur. The fort served as a cannon foundry and was never captured by enemies. It housed the royal treasury and was connected to Amber Fort through underground tunnels.',
 culturalSignificance: 'Jaigarh Fort represents the military prowess and engineering skills of Rajput rulers. It showcases advanced metallurgy and weapon manufacturing techniques. The fort symbolizes the strategic thinking of Maharaja Jai Singh II.',
 interestingFacts: [
 'Jaivana cannon has a range of 35 kilometers',
 'The fort was never conquered in its entire history',
 'It has the largest collection of medieval cannons in India',
 'The fort\'s foundry produced cannons for various Rajput states',
 'Underground passages connect it to Amber and Nahargarh forts'
 ],
 fortStories: [
 {
 title: 'The Creation of Jaivana Cannon',
 category: 'Engineering Legend',
 content: 'The story of Jaivana cannon, the world\'s largest cannon on wheels, is one of extraordinary engineering and sacrifice. When Maharaja Jai Singh II decided to build the ultimate defensive weapon, he summoned the finest metallurgists and cannon-makers from across his kingdom and beyond. The chief engineer, a master craftsman named Gopal Singh, warned that creating such a massive cannon would require human sacrifice to ensure its power. According to legend, Gopal Singh\'s own son volunteered to be sacrificed, believing it would make the cannon invincible. The construction took seven years, with workers toiling day and night. The cannon was cast in a single piece using a special alloy of iron, copper, and other metals. When completed, it weighed 50 tons and could fire a 50-kilogram ball over 35 kilometers. The first and only test firing was said to be so powerful that it created a crater the size of a small lake and was heard over 100 kilometers away. The cannon was never used in actual warfare, as its mere presence was deterrent enough. Gopal Singh was rewarded handsomely but spent his remaining years in mourning, never creating another weapon.'
 },
 {
 title: 'The Hidden Treasury Chambers',
 category: 'Treasure Mystery',
 content: 'Jaigarh Fort was renowned as the treasury of the Kachwaha dynasty, and legends speak of vast underground chambers filled with unimaginable wealth. The story goes that Maharaja Jai Singh II, aware of the constant threat of invasion, ordered the construction of elaborate underground vaults that could only be accessed through a complex system of hidden passages. The main treasury chamber was said to be located 30 meters below the fort\'s foundation, accessible only through a series of secret doors and mechanisms. The chief treasurer, a trusted family retainer, was the only person who knew the complete route to access these vaults. According to legend, when the British took control of the region, the royal family secretly moved much of the treasure to these hidden chambers and sealed them permanently. The location was supposedly encoded in a series of frescoes and carvings throughout the fort, but the key to deciphering them was lost when the last treasurer died without revealing the secret. Treasure hunters have searched for centuries, finding only small caches of coins and jewelry, fueling speculation that the main treasure - said to include the famous Kachwaha diamonds, ancient manuscripts, and tons of gold - still lies hidden beneath the fort.'
 },
 {
 title: 'The Phantom Guard of Jaigarh',
 category: 'Ghost Story',
 content: 'A chilling legend tells of a loyal guard named Ram Singh who was stationed at Jaigarh Fort during a siege in the 18th century. When enemy forces surrounded the fort, Ram Singh was assigned to guard the main gate. Despite being heavily outnumbered, he refused to surrender even when ordered to do so by his superiors, believing that surrender would bring dishonor to the Kachwaha dynasty. He fought single-handedly against the invading forces for hours, allowing the royal family to escape through secret passages. When reinforcements finally arrived, they found Ram Singh dead at his post, his sword still raised in defiance. His body was buried with full military honors within the fort premises. Since then, numerous visitors and guards have reported seeing a spectral figure patrolling the ramparts, particularly on moonless nights. The apparition is described as a tall figure in traditional Rajput armor, carrying a gleaming sword. Some claim to have heard the clanking of armor and footsteps on the stone pathways when no one was visible. Local priests perform annual rituals to honor Ram Singh\'s sacrifice, and his story is told to every new guard as a lesson in loyalty and duty.'
 },
 {
 title: 'The Underground Passage Network',
 category: 'Historical Mystery',
 content: 'The extensive underground passage network connecting Jaigarh Fort to Amber Fort and beyond is shrouded in mystery and legend. These passages were not merely escape routes but formed a complex subterranean city. The network allegedly extended for over 15 kilometers, connecting to various points in the Aravalli hills. The passages were wide enough for horses and small carts, with multiple chambers serving as storage areas, living quarters, and even temples. Legend speaks of a secret underground river that provided fresh water to these passages. The construction of this network took over 50 years and involved thousands of workers, many of whom were allegedly killed to keep the secret. The passages had multiple levels, with some sections designed to collapse if enemies discovered them. Hidden ventilation shafts and lighting systems were ingeniously designed to remain undetectable from the surface. During times of siege, the royal family and nobles could live comfortably underground for months. The complete map of these passages was supposedly divided among three trusted ministers, each knowing only their section. Over time, much of this network has been lost or sealed, but local guides claim that unexplored sections still exist, containing ancient artifacts and possibly even the remains of those who lived and died in these underground chambers.'
 },
 {
 title: 'The Foundry of Miracles',
 category: 'Engineering Legend',
 content: 'The foundry at Jaigarh Fort was said to possess almost magical properties, producing weapons of extraordinary quality and power. The master craftsmen claimed to have learned secret techniques from traveling Persian and European metallurgists. They developed a special process of metal purification that involved chanting specific mantras while the metal was being heated. The story goes that the foundry could produce cannons that never needed cleaning, swords that never dulled, and armor that could deflect any weapon. The most famous product was a series of cannons called the "Seven Thunders," each with unique properties. One cannon was said to be able to fire underwater, another could shoot around corners, and a third was rumored to fire invisible projectiles. The foundry operated day and night, with different teams working on different aspects of weapon production. The temperature in the foundry was maintained at precise levels using a system of underground furnaces and water cooling. The craftsmen were treated like royalty and were forbidden from sharing their secrets under penalty of death. When the British took control of the fort, they found the foundry abandoned but in perfect condition, with tools and materials laid out as if the workers had just stepped away. Attempts to replicate the metallurgical processes have failed, leading some to believe that the craftsmen took their secrets to the grave.'
 }
 ],
 icon: '',
 coordinates: '26.9853°N, 75.8515°E',
 visitingHours: '9:00 AM - 4:30 PM',
 entryFee: '₹35 for Indians, ₹85 for foreigners',
 images: [
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Panoramic view of Jaigarh Fort',
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Jaivana Cannon at Jaigarh Fort',
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Lalit Madir Palace at Jaigarh Fort',
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Laxmi Vilas Palace at Jaigarh Fort',
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Aram Mandir Palace at Jaigarh Fort',
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Vilas Mandir Palace at Jaigarh Fort'
 },
 {
 src: '/images/forts/jaigarh/500px-Jaigarh_Fort__4446103864_.jpg',
 alt: 'Rainwater Collector at Jaigarh Fort'
 },
 {
 src: '/images/forts/jaigarh/250px-Diya_Burj__Lamp_Tower___Jaigarh_Fort__Rajasthan__India_-_20061001-02.jpg',
 alt: 'Diya Burj (Lamp Tower) at Jaigarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'mehrangarh',
 name: 'Mehrangarh Fort',
 hindiName: 'Mehrangarh Fort',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Rao Jodha',
 period: '1459 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Living Heritage',
 significance: [
 'One of the largest forts in India',
 'Symbol of Marwar kingdom&apos;s power',
 'Magnificent museum with royal artifacts',
 'Architectural masterpiece of Rajput engineering',
 'Overlooks the Blue City of Jodhpur',
 'Center of Rathore clan heritage'
 ],
 architecture: [
 'Imposing walls rising 125 feet above ground',
 'Seven gates including Jayapol and Fatehpol',
 'Moti Mahal (Pearl Palace) with royal throne',
 'Sheesh Mahal (Mirror Palace) with glass work',
 'Phool Mahal (Flower Palace) with gold ceiling',
 'Takhat Vilas with intricate mirror work',
 'Zenana Deodi with beautiful lattice work',
 'Chamunda Mataji Temple within fort walls'
 ],
 description: 'Rising majestically above the Blue City of Jodhpur, Mehrangarh is one of the most magnificent forts in India. Its imposing structure and rich museum make it a crown jewel of Marwar.',
 detailedHistory: 'Founded by Rao Jodha in 1459, Mehrangarh Fort became the seat of the Rathore dynasty. The fort was expanded by successive rulers including Maharaja Jaswant Singh and Maharaja Takhat Singh. It withstood numerous sieges and remained unconquered.',
 culturalSignificance: 'Mehrangarh represents the glory of the Rathore dynasty and Marwar culture. The fort houses one of India\'s finest museums showcasing royal artifacts, weapons, paintings, and textiles. It preserves the rich heritage of Rajasthani craftsmanship.',
 interestingFacts: [
 'The fort\'s walls are up to 36 meters high and 21 meters wide',
 'Handprints of royal wives who committed sati are preserved at gates',
 'The fort has appeared in Hollywood films like The Dark Knight Rises',
 'It houses the world\'s only museum dedicated to turbans',
 'The fort\'s acoustics allow whispers to be heard across courtyards'
 ],
 fortStories: [
 {
 title: 'The Curse of Rao Jodha',
 category: 'Legend',
 content: 'The founding of Mehrangarh Fort is shrouded in a dark legend. When Rao Jodha decided to build his new capital at Jodhpur in 1459, he chose the site of an ancient hill named Bhaurcheeria (Mountain of Birds). However, a hermit named Cheeria Nathji had lived on this hill for years, meditating in isolation. When Rao Jodha\'s men asked the hermit to leave, he cursed the king, saying that his new fort would forever suffer from water scarcity and that anyone who tried to settle here would face hardship. Rao Jodha, realizing his mistake, begged for forgiveness. The hermit relented but said the curse could only be lifted if someone voluntarily sacrificed their life to break it. A man named Rajiya Bambi from the nearby Meghwal community volunteered to be buried alive in the fort\'s foundation to lift the curse. In return, Rao Jodha promised to protect Rajiya\'s family and descendants. The sacrifice was made, and the fort was built, but the legend says that to this day, the spirit of Rajiya Bambi protects the fort, and the Meghwal community holds a special place in Jodhpur society.'
 },
 {
 title: 'The Sati Handprints',
 category: 'Historical Event',
 content: 'One of the most poignant and powerful legends of Mehrangarh Fort involves the handprints at the Loha Pol (Iron Gate). In 1843, when Maharaja Man Singh died, his wives and concubines prepared to perform sati (ritual self-immolation) on his funeral pyre. The story tells of Maharani Gulab Kunwar, the chief queen, who led 15 royal women in this act. Before their sacrifice, they dipped their hands in vermillion and pressed them against the fort wall, leaving permanent marks as a testament to their devotion. The women then walked through the gates to the cremation ground, singing devotional songs and distributing their jewelry to the poor. The handprints remain visible to this day, preserved as a sacred memorial. Local priests perform daily rituals at this site, and married women often visit to pray for their husbands\' longevity. The story has become a symbol of Rajput honor and the extreme loyalty expected of royal women. Some historians argue that these were not sati victims but rather women who died defending the fort, but the legend of the devoted wives remains deeply embedded in local culture.'
 },
 {
 title: 'The Hidden Treasure of Rao Jodha',
 category: 'Treasure Legend',
 content: 'Local legends speak of a vast treasure hidden somewhere within the massive walls of Mehrangarh Fort. When Rao Jodha first conquered the hill, he allegedly found an ancient treasure buried by previous rulers. Rather than spending it on luxuries, he decided to hide it in a secret location within the fort to ensure his descendants would never face poverty. The story claims that he entrusted the secret location to only three trusted advisors, each knowing only a part of the complete route. The treasure supposedly includes not just gold and jewels, but also ancient manuscripts detailing secret martial arts techniques, maps of hidden water sources in the Thar Desert, and artifacts with mystical powers. Over the centuries, many have searched for this treasure, including British officials during the colonial period, but none have found the main hoard. Some believe the treasure is protected by supernatural forces, while others claim it was moved when the capital was shifted from Mandore to Jodhpur. The current royal family neither confirms nor denies these stories, keeping the legend alive.'
 },
 {
 title: 'The Phantom Drummer of Phool Mahal',
 category: 'Ghost Story',
 content: 'The Phool Mahal (Flower Palace) within Mehrangarh Fort is said to be haunted by the ghost of a court drummer named Mohan Singh. During the reign of Maharaja Abhay Singh, Mohan was the chief drummer who performed at all royal ceremonies. When the Maharaja was away on a military campaign, Mohan fell in love with a palace dancer, which was strictly forbidden. When the Maharaja returned and discovered their affair, he ordered Mohan to be executed for breaking royal protocol. Before his death, Mohan cursed the palace, declaring that his drums would forever echo through its halls. Since then, guards and visitors have reported hearing the sound of drums coming from the Phool Mahal, particularly on full moon nights. The drumming is described as starting softly and growing louder, sometimes accompanied by the sound of dancing feet and anklets. Some have reported seeing a shadowy figure in traditional court dress, sitting cross-legged and playing invisible drums. The phenomenon is so well-known that guards avoid duty in that section during full moons. The royal family has conducted religious ceremonies to appease the spirit, but the drumming continues, adding to the fort\'s mystique.'
 },
 {
 title: 'The Seven Gates and Their Legends',
 category: 'Historical Mystery',
 content: 'Mehrangarh Fort\'s seven gates, each with its own name and legend, tell the story of the fort\'s military history. The most famous is Jayapol (Victory Gate), built by Maharaja Man Singh to commemorate his victories over the armies of Jaipur and Bikaner. But the most mysterious is Fatehpol (Victory Gate), which has an unusual feature - a small chamber above the gate that no one has been able to access for centuries. Legend says this chamber contains the weapons and armor of Rao Jodha himself, along with a curse that anyone who tries to enter will face misfortune. The Dedh Kangra Pol has bullet marks from the 1808 siege by the combined armies of Jaipur and Bikaner. Local guides tell of a secret eighth gate that was sealed after a particularly brutal battle, with the bodies of enemy soldiers buried within its walls. The gates are also said to contain hidden messages and codes that, when deciphered together, reveal the location of emergency escape routes and hidden water sources that could sustain the fort during prolonged sieges. Archaeologists have found evidence of sophisticated defense mechanisms built into the gates, including hidden compartments for archers and mechanisms to pour boiling oil on attackers.'
 }
 ],
 icon: '',
 coordinates: '26.2988°N, 73.0197°E',
 visitingHours: '9:00 AM - 5:00 PM',
 entryFee: '₹100 for Indians, ₹600 for foreigners',
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Jai Pol Gate of Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Moti Mahal at Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Sheesh Mahal at Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Phul Mahal at Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Takhat Vilas Palace at Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Zenana Deodi at Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Chamunda Mataji Temple at Mehrangarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'kumbhalgarh',
 name: 'Kumbhalgarh Fort',
 hindiName: 'Kumbhalgarh Fort',
 location: 'Kumbhalgarh, Rajsamand, Rajasthan',
 builtBy: 'Maharana Kumbha',
 dynasty: 'Sisodia',
 period: '1458 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site',
 significance: [
 'Second longest wall in the world after Great Wall of China',
 'Birthplace of Maharana Pratap',
 'UNESCO World Heritage Site under Hill Forts of Rajasthan',
 'Over 360 temples within the fort complex',
 'Never conquered in battle',
 'Highest fort in Rajasthan after Chittorgarh'
 ],
 architecture: [
 'Massive wall extending 36 kilometers',
 'Seven fortified gateways',
 'Over 360 temples (300 ancient Jain and 60 Hindu temples)',
 'Badal Mahal (Palace of Clouds) at highest point',
 'Kumbha Palace with beautiful chambers',
 'Ganesh Temple with intricate carvings',
 'Neelkanth Mahadev Temple',
 'Water reservoirs and step wells'
 ],
 description: 'Built by Maharana Kumbha in the 15th century, Kumbhalgarh Fort is famous for its massive 36-kilometer wall and is the birthplace of the legendary Maharana Pratap.',
 detailedHistory: 'Construction began in 1443 and took over 15 years to complete. Maharana Kumbha, one of the greatest rulers of Mewar, built this impregnable fortress in the Aravalli hills. The fort served as a refuge for Mewar rulers during times of war and was never conquered in battle.',
 culturalSignificance: 'Kumbhalgarh represents the pinnacle of Rajput military architecture and is closely associated with the legendary Maharana Pratap, who was born here. The fort houses numerous temples and is an important pilgrimage site.',
 interestingFacts: [
 'The wall is 15 feet wide and can accommodate eight horses riding abreast',
 'It took over 15 years to build the fort',
 'Maharana Pratap was born here in 1540',
 'The fort has seven massive gates',
 'Over 360 temples are located within the fort'
 ],
 fortStories: [
 {
 title: 'The Curse of the Hermit',
 category: 'Legend',
 content: 'The construction of Kumbhalgarh Fort is shrouded in a fascinating legend. When Maharana Kumbha began building the fort, the walls would mysteriously collapse every night, despite the best efforts of skilled masons and architects. Frustrated, the Maharana consulted holy men and astrologers, who revealed that a human sacrifice was needed to appease the spirits of the mountain. A hermit living nearby prophesied that the first person to voluntarily sacrifice their life at the construction site would ensure the fort\'s stability. A pilgrim named Mehar Ban, who was passing through, heard of this and willingly offered his life. According to legend, after his sacrifice, the walls stood firm and the fort was completed successfully. In gratitude, Maharana Kumbha built a temple at the site of the sacrifice and granted lands to Mehar Ban\'s descendants, who still live in the area and are known as the Meharias.'
 },
 {
 title: 'The Birth of Maharana Pratap',
 category: 'Historical Event',
 content: 'Kumbhalgarh Fort holds immense historical significance as the birthplace of Maharana Pratap, one of India\'s greatest warriors. Born on May 9, 1540, in the royal palace within the fort, Pratap\'s birth was accompanied by extraordinary events. According to court historians, when the infant Pratap was brought out under the open sky for the first time, a sudden storm arose, and lightning illuminated the entire fort. The royal astrologers interpreted this as a sign that the child would become a great warrior who would face tremendous challenges but ultimately triumph. The fort\'s priest blessed the child, predicting that he would become the protector of Mewar\'s honor. Growing up in Kumbhalgarh, young Pratap trained in martial arts, studied the ancient texts, and developed the unbreakable spirit that would later make him famous. The palace where he was born, known as Kumbha Palace, still stands within the fort and is considered sacred by Rajputs. Local guides claim that on quiet nights, one can still hear the echoes of young Pratap\'s training sessions in the palace courtyards.'
 },
 {
 title: 'The Miracle of the Wall',
 category: 'Engineering Legend',
 content: 'The massive wall of Kumbhalgarh, stretching 36 kilometers, is considered an engineering marvel of medieval India. Local legends speak of supernatural intervention in its construction. The story goes that Maharana Kumbha was deeply troubled by the slow progress of wall construction, as enemy forces were constantly threatening Mewar. One night, he dreamt of a divine architect who revealed the secret of building an unbreakable wall. The next morning, a mysterious old man appeared at the construction site, claiming to know the secret technique. He demonstrated a method of mixing lime, jaggery, and a special herb that would make the mortar stronger than stone. The workers were amazed to see that walls built with this mixture became rock-solid within days. The old man also showed them how to align the wall with the natural contours of the Aravalli hills, making it appear to grow organically from the mountain itself. After teaching these techniques, the old man disappeared, leading many to believe he was a divine messenger. The wall was completed in record time and has withstood centuries of weather and warfare, with some sections still appearing as fresh as when they were first built.'
 },
 {
 title: 'The Hidden Treasury of Kumbha',
 category: 'Treasure Mystery',
 content: 'Maharana Kumbha was not only a great warrior but also a wealthy ruler who accumulated vast treasures during his reign. Legends speak of a secret underground treasury within Kumbhalgarh Fort that contains not just gold and jewels, but also ancient manuscripts and sacred artifacts. The story claims that Kumbha, aware of the constant threat of invasion, ordered the construction of elaborate underground chambers that could only be accessed through a complex system of hidden passages. The chief treasurer, a trusted family retainer, was said to be the only person who knew the complete route to access these vaults. According to legend, the treasury includes the famous "Kumbha Diamond," a precious stone the size of a goose egg that glows in the dark, ancient texts containing secret martial arts techniques, and sacred relics from various temples. When enemies approached, the treasure would be moved to these hidden chambers and sealed. The location was supposedly encoded in a series of frescoes and carvings throughout the fort, but the key to deciphering them was lost when the last treasurer died without revealing the secret. Treasure hunters have searched for centuries, finding only small caches of coins, fueling speculation that the main treasure still lies hidden beneath the fort.'
 },
 {
 title: 'The Temple of 360 Deities',
 category: 'Religious Legend',
 content: 'Kumbhalgarh Fort is famous for its 360 temples, but local priests tell of a particularly mystical temple that once existed within the fort. According to legend, Maharana Kumbha was a devout follower of Lord Shiva and wanted to build a temple that would house representations of all 360 deities mentioned in ancient Hindu texts. He invited the greatest sculptors and artisans from across India to create these deities. However, as the work progressed, strange occurrences began to happen. The sculptors reported that the deities seemed to come alive at night, and they could hear divine music emanating from the temple site. When the temple was finally completed, it was said to be so beautiful that even the gods themselves came down to admire it. The legend claims that on the night of the temple\'s consecration, a brilliant light appeared in the sky, and all 360 deities manifested their presence simultaneously. The temple became a major pilgrimage site, with devotees claiming that prayers offered here would be answered by the appropriate deity. Over time, the exact location of this temple was lost, though some believe it still exists in a hidden chamber within the fort, waiting to be rediscovered by a worthy seeker.'
 }
 ],
 icon: '',
 coordinates: '25.1531°N, 73.5851°E',
 visitingHours: '9:00 AM - 6:00 PM',
 entryFee: '₹15 for Indians, ₹200 for foreigners',
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Aerial view of Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Badal Mahal Palace at Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Neelkanth Mahadev Temple at Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Longest wall of Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ganesha Temple at Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kumbha Palace at Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Areet Pole at Kumbhalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ram Pol Gate at Kumbhalgarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bhangarh',
 name: 'Bhangarh Fort',
 hindiName: 'Bhangarh Fort',
 location: 'Bhangarh, Alwar, Rajasthan',
 builtBy: 'Raja Bhagwant Das',
 period: '1573 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Archaeological Site',
 significance: [
 'Most haunted fort in India according to folklore',
 'Abandoned mysteriously in 1783',
 'Perfect example of medieval town planning',
 'Important archaeological site',
 'Legendary for supernatural stories',
 'Protected by Archaeological Survey of India'
 ],
 architecture: [
 'Fortified town with temples, palaces and bazaars',
 'Havelis with intricate carvings',
 'Gopinath Temple with beautiful architecture',
 'Someshwar Temple with ancient sculptures',
 'Keshav Rai Temple with unique design',
 'Mangla Devi Temple on hilltop',
 'Royal palace complex',
 'Market area with shops and houses'
 ],
 description: 'Bhangarh Fort is famous for being the most haunted place in India. This abandoned fort town showcases medieval architecture and mysterious legends that attract both historians and paranormal enthusiasts.',
 detailedHistory: 'Built by Raja Bhagwant Das for his son Madho Singh, Bhangarh was a prosperous town until 1783 when it was mysteriously abandoned overnight. According to legend, a tantric cursed the town after being rejected by a princess, leading to its downfall.',
 culturalSignificance: 'Bhangarh represents the darker side of Rajput history and folklore. The fort has become a cultural phenomenon, inspiring numerous books, documentaries, and paranormal investigations. It showcases how history and legend intertwine in Rajasthan.',
 interestingFacts: [
 'Entry is prohibited after sunset and before sunrise',
 'The fort has appeared on numerous paranormal TV shows',
 'Local villagers refuse to live near the fort',
 'The fort has 10,000 abandoned houses and temples',
 'Archaeological Survey of India has put up warning signs'
 ],
 fortStories: [
 {
 title: 'The Curse of the Tantric Singhia',
 category: 'Legend',
 content: 'The most famous legend of Bhangarh tells of Princess Ratnavati, renowned for her beauty throughout Rajasthan. A tantric named Singhia, who lived in the same region, became obsessed with her. Knowing he could never marry the princess due to his low status, he decided to use black magic to win her affection. One day, he saw the princess\'s maid buying perfume for her mistress. Seizing the opportunity, Singhia cast a spell on the perfume that would make the princess fall in love with him the moment she used it. However, Ratnavati, who was well-versed in the occult herself, discovered the plot. She threw the cursed perfume onto a large boulder, which rolled down the hill and crushed Singhia to death. As he lay dying, the tantric cursed the entire town of Bhangarh, declaring that it would be destroyed and that no soul would ever be able to live there in peace again. Within a year, the town was invaded by the Mughal army, and all its inhabitants were killed. The curse is said to linger to this day, making Bhangarh one of the most feared places in India.'
 },
 {
 title: 'The Mysterious Abandonment of 1783',
 category: 'Historical Mystery',
 content: 'Historical records show that Bhangarh was a thriving town with over 10,000 houses, numerous temples, markets, and palaces. However, in 1783, the entire population vanished overnight, leaving behind food on tables, clothes in wardrobes, and valuables in homes. Archaeologists have found no evidence of war, plague, or natural disaster that could explain this mass disappearance. Local legends offer various explanations: some say the entire population was swallowed by the earth as punishment for their sins; others claim that a massive sandstorm buried the town alive; and some believe that the people were taken by supernatural forces. The most intriguing theory suggests that the town\'s inhabitants discovered an ancient underground chamber while digging a well, releasing a curse that had been buried for centuries. The Archaeological Survey of India has found evidence that many buildings show signs of being suddenly abandoned, with doors left open and personal belongings untouched. Even today, villagers living nearby report hearing sounds of a bustling town at night - market vendors calling out their wares, temple bells ringing, and people talking - even though the fort has been deserted for over 200 years.'
 },
 {
 title: 'The Ghostly Princess of Bhangarh',
 category: 'Ghost Story',
 content: 'Among the many supernatural tales associated with Bhangarh, the ghost of Princess Ratnavati is the most frequently reported. Visitors and paranormal investigators claim to have seen a beautiful woman in royal attire wandering the palace ruins, particularly near the princess\'s former chambers. She is described as having long black hair, wearing a red and gold lehenga (traditional dress), and adorned with precious jewelry. Witnesses report that she appears to be searching for something, moving from room to room with a sad expression. Some say she speaks in an ancient dialect, asking for help in breaking the curse that binds her to the fort. The ghost is most active during full moon nights and on the anniversary of the town\'s abandonment. Paranormal investigators have recorded unusual electromagnetic readings and temperature drops in areas where she is reportedly seen. Local priests warn that looking directly into her eyes can cause severe headaches and nightmares that last for weeks. Some visitors have reported finding small objects moved or rearranged after spending time in the palace area, and a few claim to have found mysterious handprints in the dust that don\'t match any human hand.'
 },
 {
 title: 'The Cursed Well of Bhangarh',
 category: 'Supernatural Legend',
 content: 'Deep within the fort complex lies an ancient well that locals believe is the source of Bhangarh\'s curse. The well, known as "Chor Baori" (Thief\'s Stepwell), is said to have been built over an even older structure that predated the fort itself. Legend tells that during the fort\'s prosperous days, a group of thieves used the well as their hideout and performed dark rituals to protect their stolen treasures. They allegedly made human sacrifices to appease evil spirits, burying the bodies within the well\'s walls. When the tantric Singhia cursed the town, he specifically targeted this well as the focal point of his dark magic. Since then, the well has been associated with numerous supernatural occurrences. People who venture too close report feeling an overwhelming sense of dread and being watched by unseen eyes. Some claim to have heard whispers in ancient languages emanating from the well\'s depths. During archaeological excavations, workers reported tools going missing, sudden equipment failures, and inexplicable accidents. The Archaeological Survey of India has fenced off the area, and visitors are prohibited from approaching the well after several incidents where people reported being pushed by invisible hands or experiencing temporary disorientation and memory loss.'
 },
 {
 title: 'The Eternal Watchman',
 category: 'Ghost Story',
 content: 'One of the most chilling legends of Bhangarh tells of an eternal watchman who guards the fort\'s secrets. During the town\'s final days, the chief guard, a man named Bhairav Singh, was entrusted with protecting the royal treasury. When the curse began to take effect and people started fleeing, Bhairav refused to abandon his post, believing that his duty to protect the treasury was more important than his own life. As chaos engulfed the town, he locked himself in the treasury chamber with all the royal wealth, vowing to guard it even in death. Since then, numerous visitors have reported encountering a spectral guard dressed in ancient armor, patrolling the fort grounds with a drawn sword. He is said to appear at sunset, walking the same patrol route he followed in life. Some have reported hearing his voice challenging intruders in an archaic dialect, demanding passwords that have been forgotten for centuries. The ghost is particularly active near the old treasury building, where he allegedly died. Local villagers claim that anyone who tries to remove artifacts from the fort faces misfortune, attributing this to Bhairav\'s continued vigilance. The Archaeological Survey of India has documented several cases where workers attempting to excavate the treasury area experienced equipment malfunctions and personal accidents, leading them to abandon the site.'
 }
 ],
 icon: '',
 coordinates: '27.0966°N, 76.2896°E',
 visitingHours: '6:00 AM - 6:00 PM',
 entryFee: '₹25 for Indians, ₹200 for foreigners',
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Bhangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kesav Rai Temple in Bhangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Gopinath Temple at Bhangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Mangla Devi Temple at Bhangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Someshwar Temple at Bhangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Royal Palace Complex at Bhangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Market Street Facing Bhangarh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Purohit Ji Ki Haveli in Bhangarh'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 // PALACES

 {
 id: 'lalgarh',
 name: 'Lalgarh Palace',
 hindiName: 'लालगढ़ महल',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Maharaja Ganga Singh',
 period: '1902-1926 CE',
 type: 'Palace',
 category: 'palace',
 status: 'Heritage Hotel & Museum',
 significance: [
 'Magnificent red sandstone palace',
 'Blend of Rajput, Mughal and European architecture',
 'Houses the Shri Sadul Museum',
 'Luxury heritage hotel experience',
 'Symbol of Bikaner\'s royal heritage',
 'Architectural masterpiece of British India era'
 ],
 architecture: [
 'Red sandstone construction with intricate carvings',
 'Mughal-style courtyards and gardens',
 'European-style ballrooms and dining halls',
 'Rajput-style jharokhas and chhatris',
 'Grand Durbar Hall with crystal chandeliers',
 'Italian marble pillars and floors',
 'French-style furniture and decor',
 'Traditional Rajasthani paintings'
 ],
 description: 'Lalgarh Palace is a magnificent red sandstone palace that showcases the perfect blend of Rajput, Mughal, and European architectural styles. Built by Maharaja Ganga Singh, it serves as both a museum and luxury heritage hotel.',
 detailedHistory: 'Construction began in 1896 and was completed in 1902 under the patronage of Maharaja Ganga Singh. The palace was designed by British architect Sir Samuel Swinton Jacob. It served as the royal residence and later was converted into a heritage hotel to preserve its grandeur.',
 culturalSignificance: 'Lalgarh Palace represents the cultural synthesis of the British India era. It showcases how Rajput rulers adapted to changing times while maintaining their cultural identity. The palace preserves the lifestyle and traditions of Bikaner\'s royal family.',
 interestingFacts: [
 'The palace took 24 years to complete',
 'It has 37 luxury suites and rooms',
 'The palace has its own museum with royal artifacts',
 'It was one of the first palaces to have electricity',
 'The palace has hosted several British dignitaries'
 ],
 icon: '',
 coordinates: '28.0229°N, 73.3192°E',
 visitingHours: '10:00 AM - 5:00 PM',
 entryFee: '₹30 for Indians, ₹150 for foreigners',
 images: [
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Lalgarh Palace in Bikaner'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'The Laxmi Niwas Palace in Bikaner'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Indoor Pool at Lalgarh Palace'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Diwan-i-Khas at Lalgarh Palace'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Room in heritage hotel at Lalgarh Palace'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Museum at Lalgarh Palace'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Main Courtyard of Lalgarh Palace'
 },
 {
 src: '/images/forts/lalgarh/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Entrance of Lalgarh Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'ranthambore',
 name: 'Ranthambore Fort',
 hindiName: 'रणथंभौर किला',
 location: 'Ranthambore, Sawai Madhopur, Rajasthan',
 builtBy: 'Chauhan Rajputs',
 dynasty: 'Chauhan',
 period: '944 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site',
 significance: [
 'One of the oldest forts in Rajasthan',
 'Strategic location on trade route between North and Central India',
 'Witness to rise and fall of Chauhan dynasty',
 'Important center of Jain culture',
 'Part of Ranthambore National Park',
 'UNESCO World Heritage Site under Hill Forts of Rajasthan'
 ],
 architecture: [
 'Massive stone walls and ramparts',
 'Seven fortified gates or Pols',
 'Ancient temples and water tanks',
 'Royal palace complex',
 'Granaries and storage facilities',
 'Watchtowers and battlements',
 'Jain temples with intricate carvings',
 'Step wells and water harvesting systems'
 ],
 description: 'Ranthambore Fort stands majestically atop a 700-foot hill within Ranthambore National Park. This ancient fort, built in 944 CE, showcases the military architecture of the Chauhan dynasty and offers breathtaking views of the surrounding forest.',
 detailedHistory: 'Built by the Chauhan Rajputs in 944 CE, Ranthambore Fort served as a strategic military stronghold for centuries. The fort witnessed numerous battles between the Rajputs, Mughals, and later the British. It was the site of the famous siege of 1301 when Alauddin Khilji captured the fort from King Hamir Dev after a prolonged battle. The fort remained an important center of Jain culture and learning, housing several ancient temples.',
 culturalSignificance: 'Ranthambore Fort represents the military prowess and architectural excellence of the Chauhan dynasty. It served as an important center for Jain culture and learning, housing several ancient temples. The fort\'s association with the surrounding forest and wildlife makes it unique among Rajasthan\'s fortifications.',
 interestingFacts: [
 'The fort is located within Ranthambore Tiger Reserve',
 'It has seven massive gates that visitors must pass through',
 'The fort contains one of the oldest Jain temples in Rajasthan',
 'Tigers and other wildlife can often be spotted near the fort',
 'The fort offers panoramic views of the Aravalli hills'
 ],
 fortStories: [
 {
 title: 'The Legend of Princess Gauravati and the Tiger',
 category: 'Legend',
 content: 'According to local legend, Princess Gauravati, daughter of King Hamir Dev, was renowned for her beauty and courage. During the siege by Alauddin Khilji, when the fort was running low on supplies, the princess devised a plan to save her people. Every day, she would secretly leave the fort at dawn and return with fresh meat and water, supposedly from nearby villages. However, the truth was far more extraordinary. The princess had befriended a royal Bengal tiger that lived in the forest below. The tiger, recognizing her royal blood and pure heart, would hunt for her and lead her to hidden water sources. When Khilji\'s spies discovered this, they tried to capture the princess, but the tiger protected her, attacking the enemy soldiers. Even today, locals believe that the spirit of Princess Gauravati still roams the fort, protected by the descendants of that loyal tiger. Visitors often report seeing a beautiful woman in royal attire walking the ramparts at dawn, accompanied by what appears to be a large tiger shadow.'
 },
 {
 title: 'The Curse of the Jain Monk',
 category: 'Religious Legend',
 content: 'In 1296 CE, during the reign of King Hamir Dev, a revered Jain monk named Acharya Sthulabhadra visited Ranthambore Fort. The king, a devout follower of Jainism, welcomed the monk with great honor and requested his blessings for the kingdom\'s prosperity. However, the court astrologers warned the king that the monk had brought a curse upon the fort. They claimed that the monk\'s presence had angered the guardian deities of the fort because he had violated an ancient taboo by entering the fort during a specific lunar phase. The monk, when confronted with this accusation, prophesied that the fort would fall to invaders within five years, and that the ruling dynasty would lose its power. He also predicted that the fort would eventually become a haven for wild animals rather than humans. King Hamir Dev, torn between his faith and his duty, allowed the monk to stay but built a separate temple outside the main fort walls. True to the prophecy, the fort fell to Alauddin Khilji in 1301 CE, exactly five years later. The Chauhan dynasty lost its prominence, and centuries later, the area around the fort became part of what is now Ranthambore Tiger Reserve, where tigers and other wildlife roam freely around the ancient ruins.'
 },
 {
 title: 'The Hidden Treasury of Hamir Dev',
 category: 'Treasure Legend',
 content: 'King Hamir Dev, the last Chauhan ruler of Ranthambore, was said to possess immense wealth, accumulated over centuries of rule. When Alauddin Khilji\'s forces surrounded the fort in 1301 CE, Hamir Dev knew that defeat was inevitable. Rather than let his treasure fall into enemy hands, he ordered his most trusted minister, Ranmal, to hide the royal wealth within the fort. According to legend, Ranmal and a select group of loyal soldiers spent three nights creating a secret chamber deep within the fort\'s foundations. They placed the treasure - including gold coins, precious gems, ancient manuscripts, and royal regalia - into massive iron chests, sealed them with molten metal, and then concealed the chamber with expert masonry work. To ensure the location would never be forgotten, Ranmal created a complex map using symbols carved into seven different stone tablets, which were then hidden in various temples within the fort. He also trained a special breed of homing pigeons that would only return to the exact location of the treasure. However, during the final battle, Ranmal was killed, and the pigeons were released but never seen again. The stone tablets were reportedly discovered by British archaeologists in the 19th century, but their symbols remain undeciphered. Treasure hunters have searched for Hamir Dev\'s hidden wealth for centuries, but it remains undiscovered. Some believe that the treasure is protected by ancient curses and that those who seek it will face misfortune.'
 },
 {
 title: 'The Phantom Army of Ranthambore',
 category: 'Ghost Story',
 content: 'Local guides and forest guards often speak of the Phantom Army of Ranthambore - spectral warriors who are said to patrol the fort and its surroundings on moonless nights. According to legend, these are the spirits of the 12,000 Rajput soldiers who died defending the fort during various battles, particularly the great siege of 1301 CE. They appear as shadowy figures in ancient armor, carrying traditional weapons like swords and spears, marching in formation along the fort\'s ramparts and through the surrounding forest. The phantom army is said to be led by the spirit of King Hamir Dev himself, who rides a spectral horse and carries a glowing sword. Witnesses report hearing the sound of marching feet, clanking armor, and battle cries echoing through the forest. The phenomenon is most commonly reported during the Hindu month of Shravan (July-August), which coincides with the time of the historic siege. Forest guards claim that wild animals, including tigers, avoid certain areas of the fort on these nights, as if sensing the presence of the supernatural warriors. Some visitors have reported seeing these spectral soldiers from a distance, but when they approach closer, the figures vanish into thin air. The Archaeological Survey of India has documented several credible reports from forest officials and local villagers who have witnessed this phenomenon.'
 },
 {
 title: 'The Sacred Flame of Ranthambore',
 category: 'Religious Legend',
 content: 'Deep within Ranthambore Fort lies an ancient temple dedicated to Lord Shiva, known as the Ranthambore Mahadev Temple. According to legend, this temple houses a sacred flame that has been burning continuously for over 1,000 years. The flame is said to have been lit by King Hammir Dev\'s ancestor, King Sapaldaksha, in 944 CE when the fort was first built. The legend states that the king received a divine vision from Lord Shiva, who instructed him to establish a perpetual flame that would protect the fort and its inhabitants as long as it continued to burn. The flame was initially tended by a hereditary line of priests, who were bound by sacred vows to ensure it never extinguished. During the various sieges and battles that the fort endured, the temple was often damaged, but somehow the sacred flame always survived. Even when the fort was abandoned and fell into ruins, local villagers and forest dwellers continued to maintain the flame. The temple was rediscovered by British hunters in the 19th century, who were amazed to find the flame still burning despite centuries of neglect. Today, the temple has been restored, and the flame continues to burn, tended by local priests who claim it is the same fire that was lit over a millennium ago. Devotees believe that offering prayers to this eternal flame brings protection, prosperity, and spiritual liberation. The Archaeological Survey of India has verified that the temple and its flame are indeed ancient, though they cannot confirm the continuous burning claim.'
 }
 ],
 icon: '',
 coordinates: '26.0173°N, 76.5026°E',
 visitingHours: '6:00 AM - 6:00 PM',
 entryFee: '₹25 for Indians, ₹200 for foreigners',
 images: [
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Ranthambore Fort'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Ranthambore Fort Jain Temple'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Ganesh Temple at Ranthambore Fort'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: '32 Pillars Chhatri at Ranthambore Fort'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Tiger at Ranthambore National Park'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Hamir Kund at Ranthambore Fort'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Naulakha Gate at Ranthambore Fort'
 },
 {
 src: '/images/forts/ranthambore/Naulakha_gate_ranthambor_fort.jpg',
 alt: 'Watch Tower at Ranthambore Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'gagron',
 name: 'Gagron Fort',
 hindiName: 'गागरोन किला',
 location: 'Gagron, Jhalawar, Rajasthan',
 builtBy: 'Doda Rajput rulers',
 period: '1190 CE',
 type: 'Water Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site',
 significance: [
 'Only fort in Rajasthan surrounded by water on all sides',
 'Strategic location at confluence of Ahu and Kali Sindh rivers',
 'Unique example of medieval military architecture',
 'Witness to 14 major battles and 2 Jauhars',
 'UNESCO World Heritage Site under Hill Forts of Rajasthan',
 'Perfect example of a \'Jal Durg\' (Water Fort)'
 ],
 architecture: [
 'Fort completely surrounded by water on three sides',
 'Fourth side protected by deep moats',
 'Strong stone walls with battlements',
 'Secret underground passages and tunnels',
 'Multiple watchtowers and bastions',
 'Palace complex within the fort',
 'Ancient temples and step wells',
 'Unique water-based defense systems'
 ],
 description: 'Gagron Fort is a unique water fort completely surrounded by the Ahu and Kali Sindh rivers. Built in 1190 CE, this architectural marvel showcases innovative medieval military design and has witnessed numerous historic battles.',
 detailedHistory: 'Built by the Doda Rajput rulers in 1190 CE, Gagron Fort served as a strategic military stronghold for centuries. The fort witnessed 14 major battles and two instances of Jauhar (mass self-immolation by Rajput women). It was captured by various rulers including the Khiljis, Mughals, and Marathas, each leaving their mark on its architecture.',
 culturalSignificance: 'Gagron Fort represents the unique \'Jal Durg\' architectural style of medieval Rajasthan. Its strategic location and innovative water-based defenses made it one of the most formidable forts of its time. The fort\'s association with Rajput valor, particularly the Jauhar incidents, makes it an important cultural landmark.',
 interestingFacts: [
 'It is the only fort in Rajasthan completely surrounded by water',
 'The fort has witnessed two Jauhar ceremonies by Rajput women',
 'It is built at the confluence of two rivers',
 'The fort has secret underground tunnels',
 'It is considered impregnable due to its water defenses'
 ],
 fortStories: [
 {
 title: 'The Curse of the River Goddess',
 category: 'Legend',
 content: 'According to ancient legend, the site where Gagron Fort now stands was once home to a powerful river goddess named Kali Sindhi. When King Dodaji began constructing the fort in 1190 CE, the goddess appeared to him in a dream, warning that building a military stronghold on her sacred confluence would bring great misfortune to the ruling dynasty. She prophesied that the fort would witness countless battles, bloodshed, and the sacrifice of innocent women. The king, driven by military ambition, ignored the warning and continued construction. To appease the goddess, he built a temple dedicated to her within the fort complex, but the damage was already done. The legend states that the goddess cursed the fort, declaring that it would never remain in the hands of one ruler for long, and that its strategic advantage would also become its greatest weakness. True to the prophecy, Gagron Fort changed hands numerous times over the centuries, witnessing 14 major battles. The rivers that protected it also made it vulnerable during monsoon seasons when enemy forces could approach by boat. The most tragic fulfillment of the curse came during the two Jauhar ceremonies, where Rajput women and children perished in the flames rather than fall into enemy hands. Local fishermen still claim that on certain nights, they can hear the goddess weeping from the depths of the confluence, mourning the blood that has been spilled on her sacred waters.'
 },
 {
 title: 'The Jauhar of Queen Parmar Devi',
 category: 'Historical Legend',
 content: 'One of the most tragic and heroic tales associated with Gagron Fort is the Jauhar of Queen Parmar Devi in 1303 CE. When Sultan Alauddin Khilji\'s forces laid siege to the fort, Queen Parmar Devi, wife of King Achaldas Khichi, knew that defeat was imminent. The fort had been under siege for months, food supplies were depleted, and the defenders were exhausted. The queen, renowned for her beauty and wisdom, gathered all the women of the fort - over 1,500 including princesses, noblewomen, and commoners - in the palace courtyard. According to legend, she addressed them with these words: \'We are the daughters of Rajputana, and we shall not let our honor be tarnished by the enemy. Better to die with dignity than live with disgrace.\' The women then performed the ritual of Jauhar, walking into a massive pyre while chanting prayers and singing hymns of bravery. Queen Parmar Devi was the last to enter the flames, carrying the royal insignia. The story takes a supernatural turn here - it is said that her spirit did not achieve peace and still haunts the fort. Visitors and guards report seeing a beautiful woman in royal attire walking the ramparts at sunset, particularly near the area where the Jauhar is believed to have taken place. She is described as wearing a crimson saree with gold embroidery, her long hair flowing in the wind, and her eyes filled with eternal sorrow. Some claim to hear her singing lullabies to children who are not there, while others report feeling an overwhelming sense of grief and despair in certain areas of the fort. The phenomenon is most commonly reported during the Hindu month of Chaitra (March-April), which corresponds to the time of the historic Jauhar.'
 },
 {
 title: 'The Phantom Boatman of Gagron',
 category: 'Ghost Story',
 content: 'One of the most persistent supernatural tales associated with Gagron Fort is that of the Phantom Boatman. According to local legend, during the fort\'s heyday, there was a loyal boatman named Kallu who ferried people across the rivers and served as a secret messenger for the royal family. He was known for his ability to navigate the treacherous waters even in the darkest nights and during violent storms. In 1423 CE, when the fort was under siege by the forces of Sultan Hoshang Shah, Kallu played a crucial role in smuggling supplies and messages. However, he was eventually captured by the enemy, who tortured him to reveal the fort\'s weaknesses. Kallu refused to betray his king and was executed by drowning in the very rivers he had navigated all his life. Before his death, he cursed the invaders, declaring that he would continue to protect the fort even in death. Since then, numerous people have reported seeing a spectral boatman on moonless nights, rowing a phantom boat across the waters surrounding the fort. The apparition is described as a thin man wearing traditional boatman\'s clothing, with glowing eyes and a paddle that makes no sound when it touches the water. Some claim to have heard him singing ancient boat songs or calling out to passengers who aren\'t there. The most intriguing aspect of this legend is that the phantom boatman is said to appear whenever the fort faces danger or when someone attempts to desecrate its sacred spaces. Forest guards and local villagers swear that they have seen the spectral boatman during times of political unrest or natural disasters, as if Kallu is still fulfilling his vow to protect Gagron Fort from harm.'
 },
 {
 title: 'The Hidden Treasure of the Doda Rajputs',
 category: 'Treasure Legend',
 content: 'The Doda Rajput rulers of Gagron were said to possess immense wealth, accumulated through centuries of controlling important trade routes. According to legend, King Dodaji, the founder of the fort, created a secret treasure chamber that could only be accessed through a complex system of underwater tunnels. The entrance to these tunnels was said to be hidden beneath the waters of the confluence, marked by a specific rock formation that was only visible during the lowest tides of the year. The treasure supposedly included not just gold and jewels, but also ancient manuscripts, sacred artifacts, and weapons of immense historical value. To protect this wealth, the king employed a clever security system - the tunnels were designed to flood automatically if anyone entered without knowing the correct sequence of stone markers. Over the centuries, many have attempted to find this hidden treasure, including Mughal emperors, British archaeologists, and modern treasure hunters. The most famous attempt was made by a British officer named Colonel James Tod in the 1820s, who spent months studying the fort\'s architecture and local legends. He reportedly discovered the entrance to one of the tunnels but abandoned the search when two of his workers mysteriously drowned while exploring an underwater passage. Local fishermen claim that during certain times of the year, they can see strange lights emanating from beneath the water near the old fort walls, as if the treasure is calling out to be discovered. However, they also warn that the rivers are protected by the spirits of those who died protecting the fort, and that anyone who disturbs the sacred waters will face misfortune.'
 },
 {
 title: 'The Immortal Guardian Crocodiles',
 category: 'Animal Legend',
 content: 'A unique legend associated with Gagron Fort tells of immortal crocodiles that are said to guard its waters. According to local folklore, when King Dodaji first built the fort, he encountered a problem - while the water provided excellent defense, it also attracted dangerous crocodiles that made navigation difficult. A holy man visiting the court suggested a solution: rather than trying to eliminate the crocodiles, the king should make them allies. The holy man performed a special ritual, blessing a group of crocodiles and declaring them immortal guardians of the fort. These crocodiles, known as \'Mugger Raja\' (King Crocodiles), were said to be larger than normal specimens, with distinctive markings that resembled royal insignia. The legend claims that these immortal crocodiles could distinguish between friends and foes of the fort. They would allow friendly boats to pass unmolested while attacking enemy vessels and soldiers attempting to cross the waters. Over the centuries, numerous accounts describe how invading forces suffered mysterious crocodile attacks, with the reptiles appearing to coordinate their assaults strategically. The most famous incident occurred in 1562 CE when the forces of Emperor Akbar attempted to capture the fort. Historical accounts mention that several soldiers were dragged underwater by unusually large crocodiles that seemed to attack in formation. Even today, local villagers and forest guards report seeing exceptionally large crocodiles in the area with distinctive markings. Some claim these are the descendants of the original guardian crocodiles, while others believe they are the same immortal creatures, still fulfilling their ancient duty to protect Gagron Fort. The Archaeological Survey of India has documented several cases where unusually large crocodiles have been spotted near the fort, particularly during times when the site faces security concerns or vandalism attempts.'
 }
 ],
 icon: '',
 coordinates: '24.6158°N, 76.1856°E',
 visitingHours: '9:00 AM - 5:00 PM',
 entryFee: '₹20 for Indians, ₹100 for foreigners',
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Gagron Fort in Jhalawar'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'jaisalmer',
 name: 'Jaisalmer Fort',
 hindiName: 'जैसलमेर किला (सोनार किला)',
 location: 'Jaisalmer, Rajasthan',
 builtBy: 'Rawal Jaisal',
 dynasty: 'Bhati',
 period: '1156 CE',
 type: 'Desert Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site & Living Fort',
 significance: [
 'Only living fort in India with residents still living within its walls',
 'Known as \'Sonar Quila\' or Golden Fort due to its golden sandstone',
 'Strategic location on ancient Silk Route',
 'Perfect example of desert fort architecture',
 'UNESCO World Heritage Site under Hill Forts of Rajasthan',
 'Home to 25% of Jaisalmer\'s population'
 ],
 architecture: [
 'Built with golden-yellow sandstone that glows in sunlight',
 'Massive fortification walls with 99 bastions',
 'Intricate Jain temples with detailed carvings',
 'Royal palace complex (Raj Mahal)',
 'Havelis with exquisite stone work',
 'Narrow winding lanes within the fort',
 'Ancient step wells and water harvesting systems',
 'Four massive gateways or Pols'
 ],
 description: 'Jaisalmer Fort, the magnificent \'Sonar Quila\' or Golden Fort, rises from the Thar Desert like a golden mirage. Built in 1156 CE, this living fort houses nearly 25% of Jaisalmer\'s population within its golden sandstone walls.',
 detailedHistory: 'Built by Rawal Jaisal in 1156 CE, Jaisalmer Fort served as the seat of the Bhati Rajput dynasty for centuries. Its strategic location on the ancient Silk Route made it a wealthy trading center. The fort witnessed numerous battles and sieges, including attacks by Alauddin Khilji and later Mughal emperors. The golden sandstone construction gives it a magical appearance, especially during sunrise and sunset.',
 culturalSignificance: 'Jaisalmer Fort represents the pinnacle of desert fort architecture and the rich cultural heritage of the Bhati Rajputs. As a living fort, it showcases how traditional architecture can adapt to modern needs while preserving historical character. The fort\'s Jain temples, havelis, and palaces make it a treasure trove of medieval Indian art and architecture.',
 interestingFacts: [
 'It is one of the largest fully preserved fortified cities in the world',
 'The fort\'s sandstone walls appear golden during sunrise and sunset',
 'Nearly 4,000 people still live within the fort walls',
 'It has 99 bastions, of which 92 were built between 1633 and 1647',
 'The fort contains 7 Jain temples built between 12th and 16th centuries'
 ],
 fortStories: [
 {
 title: 'The Legend of Rawal Jaisal and the Hermit',
 category: 'Founding Legend',
 content: 'The founding of Jaisalmer Fort is steeped in legend. According to folklore, Rawal Jaisal, the eldest son of the Rawal of Deoraj, was passed over for succession due to palace intrigue. Heartbroken, he left his ancestral home and wandered into the Thar Desert. One day, he encountered a hermit named Eesul who lived on Trikuta Hill. The hermit told him that Lord Krishna had once prophesied that a descendant of his Yaduvanshi clan would establish a kingdom at this very spot. Jaisal, who belonged to the Yaduvanshi clan, took this as a divine sign. The hermit showed him a spring of sweet water that flowed from the rocky hill - a miracle in the desert. Overwhelmed by this omen, Jaisal decided to build his fort at this location. However, the hermit warned him that the fort would prosper as long as it remained humble and served the people, but would face destruction if its rulers became arrogant and oppressive. True to the prophecy, Jaisalmer flourished for centuries as a center of trade and culture. The fort\'s golden sandstone walls seemed to absorb and reflect the desert sun, earning it the name \'Sonar Quila\' or Golden Fort. But the hermit\'s warning proved prophetic - when later rulers became tyrannical and imposed heavy taxes on traders, the fort began to decline, and invaders found success where they had previously failed.'
 },
 {
 title: 'The Curse of the Desert Princess',
 category: 'Romantic Legend',
 content: 'One of the most poignant legends associated with Jaisalmer Fort tells of Princess Mumal, renowned throughout Rajasthan for her extraordinary beauty. Suitors came from far and wide to seek her hand in marriage, but she rejected them all, waiting for a prince worthy of her beauty and intelligence. Among her many suitors was Rana Mahendra Singh of Amarkot, a brave and handsome prince who fell deeply in love with her. However, Mumal, proud of her beauty, decided to test his love. She created elaborate tests and challenges, each more difficult than the last. Rana Mahendra, determined to win her love, overcame each obstacle, but Mumal continued to raise the bar higher. Finally, in desperation, she set him an impossible task - to bring her the moon from the sky. Rana Mahendra, realizing he had been deceived and humiliated, cursed the princess before leaving Jaisalmer. He declared that her beauty would become her curse - she would remain unmarried and her beauty would fade like the desert flowers. More tragically, he cursed the fort itself, proclaiming that just as he had been deceived by false hopes, so too would the fort face betrayal and destruction. Legend says that from that day forward, Princess Mumal began to age rapidly, her beauty diminishing with each passing day. She spent her remaining years in the highest tower of the fort, gazing out at the desert, waiting for a suitor who would never return. Even today, visitors report seeing a beautiful woman in royal attire walking the ramparts at sunset, her face marked by eternal sorrow. Some claim to hear her singing melancholy songs about lost love and broken promises, while others report feeling an overwhelming sense of regret and loneliness in certain areas of the fort.'
 },
 {
 title: 'The Golden Transformation',
 category: 'Supernatural Legend',
 content: 'According to local legend, Jaisalmer Fort was not always golden in appearance. Originally, it was built with regular sandstone that blended with the desert landscape. The transformation to gold is attributed to a miraculous event that occurred in the 14th century. During a severe drought that lasted seven years, the people of Jaisalmer faced starvation and began to abandon the fort. The ruler, Rawal Gadsi Singh, prayed day and night for divine intervention. One night, he had a vision of Goddess Lakshmi, the deity of wealth and prosperity, who told him that the fort\'s destiny was to shine like gold and attract wealth from across the world. She instructed him to perform a special ritual at sunrise on the day of the summer solstice. The Rawal followed her instructions, and as the first rays of the sun touched the fort walls, something extraordinary happened - the sandstone began to change color, transforming from dull beige to brilliant gold. The drought ended within days, and traders began arriving, bringing wealth and prosperity. The golden glow of the fort became visible from miles away, earning it the name \'Sonar Quila.\' However, the goddess warned that this golden transformation came with a condition - the fort would retain its golden glow only as long as its people remained honest, hospitable, and true to their traditions. If they ever forgot their values or became greedy, the gold would fade away. This legend is taken seriously by the local people, who believe that maintaining their cultural traditions and values is essential to preserving the fort\'s golden appearance.'
 },
 {
 title: 'The Phantom Caravan of the Silk Route',
 category: 'Ghost Story',
 content: 'During its golden age, Jaisalmer Fort was a crucial stop on the ancient Silk Route, and countless caravans passed through its gates carrying silk, spices, precious stones, and other valuable goods. According to legend, one such caravan, led by a wealthy merchant named Bhairav Singh, never completed its journey. In 1542 CE, Bhairav Singh\'s caravan, consisting of 200 camels loaded with the finest silk from China and precious gems from Burma, camped outside the fort walls during a sandstorm. The storm lasted for three days and nights, and when it finally subsided, the entire caravan had vanished without a trace. No bodies, no goods, no signs of struggle - nothing remained except the footprints leading to the campsite, which mysteriously stopped abruptly. The local people believed that the caravan had been swallowed by the desert as punishment for Bhairav Singh\'s greed - he had apparently cheated his business partners and overcharged his customers. Since then, on certain moonless nights, travelers report seeing a spectral caravan approaching the fort - camels loaded with goods, merchants in ancient attire, and guards with torches. The phantom caravan is said to appear out of nowhere, moving silently across the desert sands, and then vanish just as mysteriously. Some claim to hear the tinkling of camel bells and the voices of merchants speaking in ancient dialects, while others report finding strange artifacts near the fort that appear to be from another time. The phenomenon is most commonly reported during the winter months when the original caravan disappeared, and some believe that the spirits are still trying to complete their interrupted journey.'
 },
 {
 title: 'The Immortal Guardian of the Golden Gates',
 category: 'Protective Legend',
 content: 'Every fort needs a guardian, and Jaisalmer Fort is said to have one of the most powerful protectors in Rajasthani folklore. According to legend, when Rawal Jaisal was building the fort, he encountered a mysterious sage who appeared at the construction site one day. The sage, who called himself Siddharaj, claimed to be a descendant of an ancient lineage of fort guardians. He told Jaisal that he had been waiting for centuries for the right ruler to build a fort worthy of his protection. Siddharaj made a pact with the Rawal - in exchange for a small chamber within the fort where he could meditate and perform protective rituals, he would ensure that no enemy could successfully capture the fort as long as its rulers remained just and righteous. The Rawal agreed, and Siddharaj became the fort\'s spiritual guardian. Over the centuries, numerous attempts were made to capture the fort, but each failed under mysterious circumstances - sudden sandstorms that blinded attacking armies, flash floods that washed away siege equipment, and internal conflicts that weakened enemy forces. The most famous incident occurred in 1299 when Alauddin Khilji\'s army laid siege to the fort. According to historical accounts, the siege was mysteriously abandoned after the Sultan\'s troops began suffering from an unknown illness and his commanders reported seeing a glowing figure on the fort walls that instilled fear in their hearts. Even today, the chamber supposedly given to Siddharaj exists within the fort, and local people claim that an immortal guardian still protects Jaisalmer. Some report seeing an elderly man in saffron robes walking the fort walls at dawn, while others claim to feel a protective presence that watches over the golden fortress. The legend serves as a reminder that some forces transcend time and that true protection comes not just from stone walls but from spiritual guardianship.'
 }
 ],
 icon: '',
 coordinates: '26.9124°N, 70.9129°E',
 visitingHours: '6:00 AM - 6:00 PM',
 entryFee: '₹50 for Indians, ₹250 for foreigners',
 images: [
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Panoramic view of Jaisalmer Fort'
 },
 { 
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Bairisal Borj Tower at Jaisalmer Fort'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Jain Temples at Jaisalmer Fort'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Jaisalmer Fort Palace Museum'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Akhay Pol Gate at Jaisalmer Fort'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Rani Mahal at Jaisalmer Fort'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Cannon at Jaisalmer Fort'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Hawa Pol at Jaisalmer Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'junagarh',
 name: 'Junagarh Fort',
 hindiName: 'जूनागढ़ किला',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Rao Bika',
 dynasty: 'Rathore',
 period: '1589-1594 CE',
 type: 'Desert Fort',
 category: 'fort',
 status: 'UNESCO World Heritage Site & Royal Museum',
 significance: [
 'Never captured in battle despite numerous attempts',
 'Finest example of Rajput-Mughal architecture fusion',
 'Contains 37 palaces, temples, and pavilions within its walls',
 'Houses one of the best-preserved royal collections in India',
 'Built on plains rather than hills, unique among Rajasthan forts',
 'Served as the seat of Bikaner royalty for over 300 years'
 ],
 architecture: [
 'Built with red sandstone and white marble',
 'Seven fortified gates with intricate carvings',
 'Palaces with exquisite mirror work and gold leaf paintings',
 'Beautiful courtyards and gardens within the fort',
 'Ancient temples with detailed stone carvings',
 'Massive walls and battlements',
 'Unique water management system for desert climate',
 'Ornate balconies and jharokhas'
 ],
 description: 'Junagarh Fort stands as a magnificent testament to the power and wealth of the Bikaner royal family. Built between 1589-1594 CE, this unconquered fort showcases the perfect fusion of Rajput and Mughal architectural styles.',
 detailedHistory: 'Junagarh Fort was built by Raja Rai Singh, a general in the army of Mughal Emperor Akbar, between 1589-1594 CE. Unlike most Rajasthan forts built on hills, Junagarh was constructed on the plains, making its impregnability even more remarkable. The fort served as the seat of the Bikaner royal family for over 300 years. Despite numerous attacks by various rulers including Aurangzeb, the fort was never captured by force, earning it the reputation of being one of the most impregnable forts in India.',
 culturalSignificance: 'Junagarh Fort represents the military prowess and architectural sophistication of the Rathore dynasty of Bikaner. The fort\'s palaces, temples, and museums house invaluable artifacts, manuscripts, and artworks that showcase the rich cultural heritage of Rajasthan. The fusion of Rajput and Mughal architectural styles reflects the political alliances and cultural exchanges of medieval India.',
 interestingFacts: [
 'The fort has never been conquered despite 16 major attacks',
 'It houses the world\'s largest collection of Rajput weaponry',
 'The fort contains 37 palaces and pavilions within its walls',
 'Its museum displays the first airplane owned by an Indian prince',
 'The fort\'s architecture includes influences from Gujarati, Mughal, and Rajput styles'
 ],
 fortStories: [
 {
 title: 'The Unconquered Fort and the Curse of the Desert',
 category: 'Military Legend',
 content: 'Junagarh Fort\'s reputation as an unconquered fortress is legendary in Rajasthan. According to folklore, when Raja Rai Singh began constructing the fort in 1589, he sought the blessings of a powerful desert sage named Siddharth Baba. The sage, impressed by the Raja\'s devotion and his vision of creating a fort that would protect his people, performed elaborate rituals and blessed the foundation stones. However, he warned that this blessing came with a condition - the fort would remain unconquered only as long as its rulers remained just, protected the innocent, and never initiated unjust wars. The sage also prophesied that if any ruler of Bikaner ever broke this sacred trust, the desert itself would rise against the fort. Over the centuries, this legend proved remarkably accurate. When Aurangzeb\'s mighty army laid siege to the fort in the 17th century, mysterious sandstorms repeatedly destroyed their siege equipment and supply lines. When the Marathas attacked in the 18th century, their armies were struck by mysterious illnesses that forced them to retreat. Even during the 1947 partition riots, when violence raged across Rajasthan, Junagarh remained peaceful. The local people believe that the sage\'s blessing still protects the fort, and they point to the fact that despite being surrounded by desert, the fort has never suffered from water scarcity or extreme weather damage as evidence of divine protection.'
 },
 {
 title: 'The Hidden Treasury of Raja Gaj Singh',
 category: 'Treasure Legend',
 content: 'One of the most enduring legends about Junagarh Fort concerns the hidden treasure of Raja Gaj Singh, who ruled Bikaner in the late 17th century. According to folklore, Raja Gaj Singh was obsessed with accumulating wealth, not for personal luxury, but to strengthen his kingdom against potential invasions. He spent years amassing one of the largest treasure collections in Rajasthan, including gold coins, precious gems, ancient manuscripts, and rare artifacts. However, as he grew older, he became increasingly paranoid about the treasure\'s safety. Legend says that he selected a secret chamber within the fort\'s labyrinthine underground passages and had it sealed with the treasure inside. To ensure its secrecy, he ordered the execution of all workers who participated in hiding the treasure, and then he himself took the secret to his grave. The only clue he left was a cryptic verse carved into a stone tablet in the fort\'s palace: "Where the sun meets the moon, and the lion guards the gate, there lies the wealth of Gaj Singh, sealed by fate." Treasure hunters have searched for centuries, exploring every nook and cranny of the fort, but the treasure remains undiscovered. Some claim to hear the clinking of coins and the rustling of silk in the fort\'s underground chambers during full moon nights, while others report seeing the ghostly figure of Raja Gaj Singh himself, still guarding his hidden wealth. The Archaeological Survey of India has conducted several excavations but found nothing, leading some to believe that the treasure might be a metaphor for the fort\'s cultural wealth rather than material riches.'
 },
 {
 title: 'The Cursed Mirror of Anup Mahal',
 category: 'Supernatural Legend',
 content: 'Anup Mahal, one of the most beautiful palaces within Junagarh Fort, houses a magnificent mirror that is said to be cursed. According to legend, during the construction of the palace in the late 17th century, Maharaja Anup Singh wanted to create a room that would reflect his power and magnificence. He commissioned a special mirror from a renowned craftsman in Gujarat, who spent three years creating a masterpiece using a secret technique involving mercury, silver, and rare herbs. When the mirror was finally installed, it was indeed magnificent - it reflected not just images but seemed to capture the very essence of those who looked into it. However, the craftsman, who had been cheated of his payment by the Maharaja\'s treasurer, cursed the mirror before leaving. He proclaimed that anyone who looked into the mirror with evil intentions would see their true nature revealed and would be driven mad by the sight. The curse apparently took effect quickly. The treasurer who had cheated the craftsman looked into the mirror and was found the next day, raving about seeing demons and serpents in his reflection. He died within a week, apparently insane. Several courtiers who had plotted against the Maharaja also met similar fates after gazing into the mirror. Eventually, the Maharaja ordered the mirror to be covered with a silk cloth and only uncovered during religious ceremonies. Even today, the mirror remains covered, and palace guides warn visitors not to peek underneath the cloth. Some claim that during full moon nights, they can see strange lights emanating from the covered mirror, and others report hearing whispers in an unknown language coming from the Anup Mahal palace.'
 },
 {
 title: 'The Phantom Army of Raja Rai Singh',
 category: 'Ghost Story',
 content: 'Raja Rai Singh, the founder of Junagarh Fort, was not only a skilled architect and ruler but also a mighty warrior who served as a general in Akbar\'s army. According to legend, his military prowess was so great that even death could not end his service to Bikaner. The story goes that on his deathbed, Rai Singh made a solemn vow that he would continue to protect his fort and people even after death. Since then, numerous reports have emerged of a phantom army that appears to defend the fort during times of crisis. The most famous incident occurred in 1801, when a large group of dacoits planned to attack the fort under the cover of darkness. As they approached the fort walls, they were confronted by what appeared to be a full army of Rajput warriors in traditional armor, mounted on horses and carrying torches. The dacoits fled in terror, but when they returned the next morning to investigate, they found no tracks or evidence of any army. Similar incidents have been reported throughout the years - during the 1857 uprising, during partition riots, and even during attempted burglaries in recent decades. Security guards report seeing shadowy figures patrolling the fort walls at night, hearing the sound of marching feet and clanking armor, and occasionally catching glimpses of a majestic figure on horseback who matches contemporary descriptions of Raja Rai Singh. The local people believe that these phantom warriors are the spirits of Rai Singh\'s original army, bound by their loyalty to protect the fort for eternity. Some claim that the phenomenon is most active during the festival of Dussehra, when the veil between the living and the dead is believed to be thinnest.'
 },
 {
 title: 'The Sacred Well of Ganga Temple',
 category: 'Religious Legend',
 content: 'Within the walls of Junagarh Fort stands the beautiful Ganga Temple, built by Raja Rai Singh to house the sacred waters of the Ganges. According to legend, when the Raja was planning the fort\'s construction, he consulted numerous priests and astrologers to ensure divine protection. One sage told him that for the fort to remain unconquered, it needed to house the sacred waters of the Ganges within its walls. However, bringing Ganges water to the desert seemed impossible. The sage then revealed that he knew of a sacred spring that connected underground to the Ganges, and if a temple was built over this spot, the waters would flow eternally. Raja Rai Singh immediately ordered the construction of the temple and a deep well. Miraculously, when the well was dug, sweet water appeared, and the sage declared it to be sacred Ganges water. The temple became the spiritual heart of the fort, and the well\'s water was believed to have healing properties. Soldiers would drink the water before going into battle, believing it made them invincible. The well\'s most remarkable feature was that its water level never decreased, even during the worst droughts. Legend says that during the 1899 famine, when the entire region faced severe water shortage, the Ganga Temple well continued to provide water not just for the fort\'s residents but also for the surrounding villages. The local people believe that as long as this sacred well continues to flow, the fort will remain protected. Even today, the well continues to provide water, and pilgrims come from far and wide to bathe in its sacred waters, believing it can cure various ailments and bring good fortune.'
 }
 ],
 icon: '',
 coordinates: '28.0229°N, 73.3169°E',
 visitingHours: '10:00 AM - 4:30 PM',
 entryFee: '₹50 for Indians, ₹300 for foreigners',
 images: [
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Bikaner Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Golden Interior Work of Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Gardens of Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Vikram Vilas in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Phool Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Lallgarth Palace at Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Ganga Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Darbar Hall in Junagarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'taragarh-bundi',
 name: 'Taragarh Fort (Bundi)',
 hindiName: 'तारागढ़ किला (बूंदी)',
 location: 'Bundi, Rajasthan',
 builtBy: 'Rao Bar Singh',
 period: '1354 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Historical Monument & Architectural Marvel',
 significance: [
 'One of the oldest forts in Rajasthan',
 'Strategic location controlling important trade routes',
 'Famous for its intricate network of tunnels',
 'Houses the largest water reservoir system in any Rajasthan fort',
 'Known as the \'Star Fort\' due to its unique shape',
 'Served as the capital of Bundi state for centuries'
 ],
 architecture: [
 'Built on steep hills with massive stone walls',
 'Three main gateways with intricate carvings',
 'Extensive network of underground tunnels',
 'Large water reservoirs and step wells',
 'Palaces with beautiful murals and mirror work',
 'Strategic watchtowers and battlements',
 'Ancient temples within the fort complex',
 'Unique star-shaped layout'
 ],
 description: 'Taragarh Fort, the magnificent \'Star Fort\' of Bundi, stands majestically on a steep hill overlooking the town. Built in 1354 CE, this ancient fortress is renowned for its strategic architecture, extensive tunnel network, and beautiful palaces.',
 detailedHistory: 'Built by Rao Bar Singh in 1354 CE, Taragarh Fort served as the seat of the Hada Chauhan dynasty of Bundi for over six centuries. The fort\'s strategic location on the Aravalli hills made it virtually impregnable and controlled important trade routes between northern and central India. The fort witnessed numerous battles and sieges, including attacks by Mughal emperors and Maratha forces. Its extensive water conservation system and tunnel network made it self-sufficient during prolonged sieges.',
 culturalSignificance: 'Taragarh Fort represents the military architecture and cultural heritage of the Hada Chauhan dynasty. The fort\'s palaces, temples, and reservoirs showcase the sophisticated engineering and artistic skills of medieval Rajasthan. The fort played a crucial role in the political and cultural development of the Bundi region, serving as a center of administration, culture, and religious activities.',
 interestingFacts: [
 'The fort has over 15 large water reservoirs carved into the rock',
 'Its tunnel network extends for several kilometers',
 'The fort was never conquered by direct assault',
 'It houses one of the oldest cannon foundries in Rajasthan',
 'The fort\'s water system could sustain 10,000 people for six months'
 ],
 fortStories: [
 {
 title: 'The Star That Fell to Earth',
 category: 'Founding Legend',
 content: 'According to local legend, the site of Taragarh Fort was chosen not by human wisdom but by divine intervention. The story goes that Rao Bar Singh, the founder of Bundi, was sleeping on the hill where the fort now stands, exhausted from hunting in the Aravalli forests. That night, he had a vivid dream in which a brilliant star fell from the sky and embedded itself in the hill. In his dream, a celestial voice told him that this star was actually a fragment of the pole star (Dhruva Tara) that had been dislodged during a cosmic battle between the gods and demons. The voice commanded him to build a fort at this very spot, declaring that as long as the star\'s light continued to shine from the hill, the fort would remain unconquered. When Rao Bar Singh woke up, he found that the ground where he had slept was marked with a strange, star-shaped impression that seemed to glow faintly in the darkness. Taking this as a divine sign, he immediately began construction of the fort. The star-shaped layout of the fort was designed to mirror the celestial pattern he had seen in his dream. Local people believe that on certain clear nights, particularly during the festival of Kartik Purnima, a strange star-like glow can still be seen emanating from the highest point of the fort. Some claim that this is the original star fragment, still embedded deep within the hill, while others say it is the reflection of the pole star on the fort\'s white marble structures. The legend serves as a reminder that Taragarh is not just a military fortification but a cosmic bridge between earth and heaven.'
 },
 {
 title: 'The Underground City of Bhim Burj',
 category: 'Architectural Legend',
 content: 'One of the most fascinating aspects of Taragarh Fort is its extensive network of underground tunnels and chambers, collectively known as Bhim Burj. According to legend, these underground passages were not just military escape routes but formed an entire hidden city. The story goes that during the fort\'s construction, Rao Bar Singh employed a secretive guild of master tunnel builders who were said to possess ancient knowledge of underground architecture. These craftsmen created a labyrinthine network that extended not just throughout the fort but connected to distant locations, including the Garh Palace in the town below and even to the nearby Taragarh Lake. The underground city supposedly contained living quarters, storage rooms, temples, and even a royal treasury. The most remarkable feature was a massive underground water harvesting system that could collect and store rainwater from the entire hill. Legend says that the tunnel builders placed magical seals at various points to protect the underground city from discovery. These seals could only be opened by those who knew the secret mantras. Over the centuries, many have attempted to explore the full extent of the tunnel network, but most adventurers have either returned empty-handed or never returned at all. Local people believe that the underground city still exists, protected by ancient curses and magical barriers. Some claim to hear mysterious sounds emanating from beneath the fort - the clinking of utensils, the murmur of voices, and occasionally, the sound of royal processions. The Archaeological Survey of India has documented several kilometers of tunnels, but the complete network remains a mystery.'
 },
 {
 title: 'The Cursed Treasure of Maharaja Bhao Singh',
 category: 'Treasure Legend',
 content: 'Maharaja Bhao Singh, who ruled Bundi in the early 18th century, was known for his military prowess and his obsession with accumulating wealth. According to legend, he amassed one of the largest treasure collections in Rajasthan through his successful military campaigns against the Mughals and Marathas. However, his greed eventually led to his downfall. The story goes that during one of his campaigns, he plundered a sacred temple and stole its golden idol, despite warnings from his priests that this would invite divine wrath. Shortly after this incident, Bhao Singh began experiencing strange phenomena - he would hear mysterious voices calling his name, his sleep would be disturbed by visions of the stolen idol, and his treasure would mysteriously diminish only to reappear in different locations. Convinced that he was cursed, he consulted numerous astrologers and tantrics who advised him to hide his treasure within the fort\'s most secret chambers and perform elaborate rituals to appease the gods. Bhao Singh spent his remaining years creating an elaborate system of hidden chambers and false passages within the fort, where he concealed his vast treasure. He then had the workers who participated in hiding the treasure executed to ensure its secrecy. On his deathbed, he is said to have cursed the treasure, declaring that anyone who found it without first purifying themselves through severe penance would be struck by madness and death. Since then, numerous treasure hunters have searched for Bhao Singh\'s legendary hoard, and several have reportedly died under mysterious circumstances. Some claim to have found chambers filled with gold coins and precious gems, only to find them empty when they returned with help. Others speak of encountering supernatural guardians - fierce warriors in ancient armor who protect the treasure. Local people believe that the treasure exists but can only be found by those with pure intentions and divine blessing.'
 },
 {
 title: 'The Phantom Rani of Chhatra Mahal',
 category: 'Ghost Story',
 content: 'Chhatra Mahal, one of the most beautiful palaces within Taragarh Fort, is said to be haunted by the spirit of a tragic queen. According to legend, Maharaja Umed Singh of Bundi had a beautiful queen named Rani Chhatra Kumari who was renowned for her intelligence, beauty, and artistic talents. She was particularly skilled in music and dance, and her performances in the palace courtyard would attract hundreds of spectators. However, her life took a tragic turn when the Maratha forces laid siege to the fort in the mid-18th century. During the prolonged siege, supplies began to run low, and the situation became desperate. According to the legend, Rani Chhatra Kumari discovered a secret passage that could be used to bring supplies into the fort, but it required someone to guide the supply caravans through the dangerous mountain paths. Despite the Maharaja\'s objections, the Rani volunteered for this dangerous mission, arguing that her knowledge of the local terrain and her ability to move discreetly made her the best choice. She successfully guided several supply convoys through enemy lines, but during her final mission, she was captured by the Marathas. Rather than revealing the secret passage under torture, she chose to jump from a cliff, preferring death over betrayal. Her sacrifice saved the fort, and the siege was eventually lifted. However, her spirit is said to have never found peace. Since then, numerous people have reported seeing a beautiful woman in royal attire dancing in the moonlight on the palace terrace. Her ghostly performances are said to be so enchanting that viewers are mesmerized until she suddenly vanishes, leaving only the faint scent of her perfume and the sound of her anklets. Some claim that her appearance foretells important events in the royal family, while others believe she continues to protect the fort from unseen dangers.'
 },
 {
 title: 'The Eternal Flame of Garh Palace',
 category: 'Religious Legend',
 content: 'Within Taragarh Fort complex stands the Garh Palace, which houses a remarkable phenomenon - an eternal flame that has reportedly been burning continuously for over 400 years. According to legend, this sacred fire was first lit by Rao Bar Singh himself when he established the fort in 1354 CE. The story goes that during the fort\'s inauguration ceremonies, a group of Brahmin priests performed elaborate fire rituals to ensure the fort\'s prosperity and protection. The main sacred fire was lit using special wood that had been soaked in rare herbs and ghee prepared according to ancient formulas. What made this fire unique was that it was said to have been blessed by the goddess Vindhyavasini, the patron deity of the Hada Chauhan dynasty. The goddess supposedly declared that as long as this sacred flame continued to burn, the fort would remain unconquered and the royal family would prosper. Over the centuries, numerous attempts have been made to extinguish this flame - during enemy attacks, natural disasters, and even accidental fires that destroyed parts of the palace. However, the sacred fire has miraculously survived every catastrophe. During the 1857 uprising, when British forces occupied the fort, they reportedly tried to extinguish the flame multiple times, considering it a symbol of resistance, but it continued to burn. Even during the severe drought of 1899, when water and fuel were scarce, the flame never went out. The current royal family of Bundi maintains that the flame represents not just their dynasty\'s continuity but also the spiritual power that protects the entire region. Pilgrims come from far and wide to offer prayers to this eternal flame, believing that it has the power to grant wishes and remove obstacles. The priests who tend the flame claim that its color changes to warn of impending dangers, and they have documented several instances where the flame turned blue or green before major historical events.'
 }
 ],
 icon: '⭐',
 coordinates: '25.4484°N, 75.6370°E',
 visitingHours: '8:00 AM - 6:00 PM',
 entryFee: '₹25 for Indians, ₹200 for foreigners',
 images: [
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Taragarh Fort in Bundi'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Bundi Palace inside Taragarh Fort'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Naval Sagar Lake near Bundi Fort'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Walls of Taragarh Fort'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Garh Palace and Naval Sagar Temple in Bundi'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Entrance of Taragarh Fort'
 },
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Window of Taragarh Fort'
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'taragarh-ajmer',
 name: 'Taragarh Fort (Ajmer)',
 hindiName: 'तारागढ़ किला (अजमेर)',
 location: 'Ajmer, Rajasthan',
 builtBy: 'Raja Ajaypal Chauhan',
 period: '1100 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Historical Monument & Religious Site',
 significance: [
 'One of the oldest hill forts in Rajasthan',
 'Strategic location on the Aravalli hills',
 'Houses the tomb of the Sufi saint Khwaja Moinuddin Chishti nearby',
 'Important center of Chauhan dynasty power',
 'Witnessed numerous historical battles',
 'Protected the ancient city of Ajmer'
 ],
 architecture: [
 'Massive stone walls built on steep hills',
 'Three main gateways with defensive structures',
 'Large water reservoirs and step wells',
 'Ancient temples and mosques within the complex',
 'Strategic watchtowers and battlements',
 'Palaces with intricate carvings',
 'Underground passages and storage facilities'
 ],
 description: 'Taragarh Fort in Ajmer, built by Raja Ajaypal Chauhan in 1100 CE, stands majestically on the Aravalli hills. This ancient fortress protected the important pilgrimage city of Ajmer and witnessed the rise and fall of several dynasties.',
 detailedHistory: 'Built by Raja Ajaypal Chauhan in 1100 CE, Taragarh Fort served as the stronghold of the Chauhan dynasty in Ajmer. The fort\'s strategic location on the Aravalli hills provided commanding views of the surrounding plains and protected the important pilgrimage routes to the nearby dargah of Khwaja Moinuddin Chishti. The fort witnessed numerous battles between the Chauhans, Delhi Sultanate, Mughals, and later the British. Its massive walls and strategic design made it one of the most formidable forts in northern India.',
 culturalSignificance: 'Taragarh Fort represents the military architecture and cultural heritage of the Chauhan dynasty. The fort\'s proximity to the dargah of Khwaja Moinuddin Chishti made it an important center of both Hindu and Islamic culture. The fort played a crucial role in protecting the pilgrimage routes and maintaining peace in the region. Its architecture reflects a blend of Rajput and Mughal styles, symbolizing the cultural synthesis that characterized medieval India.',
 interestingFacts: [
 'The fort has never been conquered by direct assault',
 'It houses one of the largest water reservoirs in Rajasthan',
 'The fort was used as a mint during medieval times',
 'Several Sufi saints are buried within the fort complex',
 'The fort\'s tunnels connect to the nearby Ana Sagar Lake'
 ],
 fortStories: [
 {
 title: 'The Dream of Raja Ajaypal',
 category: 'Founding Legend',
 content: 'According to legend, the site of Taragarh Fort was chosen through divine revelation. Raja Ajaypal Chauhan, the founder of modern Ajmer, was sleeping on the hill where the fort now stands, exhausted from his military campaigns. That night, he had a profound dream in which a celestial being appeared to him, declaring that this hill was the dwelling place of ancient gods who had protected the region for millennia. The being commanded him to build a fort at this very spot, promising that as long as the fort stood, the Chauhan dynasty would prosper and the city of Ajmer would remain a center of spiritual power. When Raja Ajaypal woke up, he found that the ground where he had slept was marked with mysterious symbols that seemed to glow faintly in the morning light. Taking this as a divine sign, he immediately began construction of the fort. The three main gateways of the fort were built to represent the three aspects of divine protection - creation, preservation, and destruction. Local people believe that the hill itself is sacred and that the fort serves as a bridge between the earthly and divine realms. Some claim that on certain auspicious days, particularly during the full moon, the entire hilltop is bathed in a mysterious golden light that has no natural explanation. The legend serves as a reminder that Taragarh is not just a military fortification but a sacred space blessed by ancient powers.'
 },
 {
 title: 'The Saint\'s Blessing and Curse',
 category: 'Religious Legend',
 content: 'One of the most intriguing legends associated with Taragarh Fort involves the famous Sufi saint Khwaja Moinuddin Chishti, whose dargah lies at the foot of the hill. According to the story, when the saint first arrived in Ajmer in the 12th century, he was denied entry into the fort by the Hindu guards who did not recognize his spiritual stature. The saint, instead of arguing, simply sat outside the fort walls and began meditating. For three days and nights, he remained in deep meditation, neither eating nor drinking. During this time, strange phenomena began to occur within the fort - the water in the reservoirs turned brackish, the royal horses refused to eat, and the guards began experiencing terrifying nightmares. On the third night, Raja Ajaypal himself had a dream in which a radiant figure warned him that he was preventing a great spiritual master from entering his domain. The Raja immediately rushed to the fort gates and personally welcomed the saint, offering him food and shelter. Khwaja Moinuddin Chishti graciously accepted the hospitality but declined to stay within the fort, choosing instead to establish his khanqah at the foot of the hill. Before leaving, he blessed the fort, declaring that as long as his spiritual presence remained in Ajmer, the fort would never fall to enemies. However, he also added a cryptic warning that the fort\'s greatest protection would also be its greatest test - the very diversity that made Ajmer prosperous could also lead to its division. Over the centuries, the fort indeed remained unconquered, but it also witnessed numerous communal tensions and conflicts. Some believe that the saint\'s blessing and curse continue to influence the region, making Ajmer simultaneously a center of spiritual harmony and occasional strife.'
 },
 {
 title: 'The Underground Treasury of Prithviraj Chauhan',
 category: 'Treasure Legend',
 content: 'Prithviraj Chauhan, the last great Hindu emperor of northern India, is said to have hidden a vast treasure within the underground chambers of Taragarh Fort before his final battle with Muhammad Ghori. According to legend, Prithviraj, knowing that defeat was possible, ordered his most trusted minister to conceal the royal treasury in a secret chamber beneath the fort. This treasure supposedly included not just gold and jewels, but also sacred Hindu texts, ancient weapons blessed by priests, and the legendary sword of Prithviraj himself. The minister, along with a select group of loyal soldiers, created an elaborate network of false passages and hidden chambers to protect the treasure. They then performed complex rituals to invoke divine protection, ensuring that the treasure could only be found by a true descendant of the Chauhan dynasty who possessed both royal blood and spiritual purity. The location of the treasure was said to be revealed through a complex puzzle involving the fort\'s architecture, ancient Sanskrit verses, and astronomical calculations. Over the centuries, numerous treasure hunters have searched for Prithviraj\'s legendary hoard, and several have reportedly died under mysterious circumstances. Some claim to have found chambers filled with ancient coins and weapons, only to find them empty when they returned with help. Others speak of encountering supernatural guardians - fierce warriors in medieval armor who protect the treasure. Local people believe that the treasure exists but can only be found when India faces a great crisis and a worthy leader emerges to unite the nation. Until then, the treasure remains hidden, protected by ancient curses and the spirits of loyal Chauhan warriors.'
 },
 {
 title: 'The Phantom Guards of the Three Gates',
 category: 'Ghost Story',
 content: 'The three main gateways of Taragarh Fort - Gudi Darwaza, Char Darwaza, and Lakshmi Pol - are said to be haunted by the spirits of royal guards who died defending them. According to legend, during a particularly fierce attack by the Delhi Sultanate in the 13th century, a small group of Chauhan warriors held the fort against overwhelming odds. Led by a brave commander named Bhairav Singh, these 21 warriors fought for three days and nights without rest, food, or water. When it became clear that defeat was inevitable, Bhairav Singh gathered his men and made them swear an oath that they would continue to protect the fort even after death. The warriors then performed a ritual, offering their lives to the goddess of war, and died fighting to the last man. Since that day, numerous people have reported seeing ghostly figures patrolling the fort walls, particularly during the hours of twilight. These phantom guards are described as tall, imposing figures in ancient armor, carrying gleaming swords and shields. They are said to march in perfect formation along the ramparts, their footsteps echoing in the empty corridors. Some claim that these spirits have prevented the fort from falling to enemies on several occasions. There are stories of attacking armies being terrified by the sight of ghostly warriors appearing on the walls, causing them to abandon their sieges. Others speak of lost travelers being guided to safety by mysterious figures who appear and disappear without explanation. The current caretakers of the fort maintain that these spirits are not malevolent but are the eternal guardians of this sacred space, continuing their duty even beyond death.'
 },
 {
 title: 'The Eternal Lamp of the Chauhan Dynasty',
 category: 'Religious Legend',
 content: 'Within the inner sanctum of Taragarh Fort stands a small shrine that houses an eternal lamp, said to have been burning continuously since the fort\'s construction in 1100 CE. According to legend, this sacred flame was first lit by Raja Ajaypal Chauhan himself using special ghee prepared according to ancient formulas. The lamp was blessed by the royal priests with a powerful mantra that declared that as long as this flame continued to burn, the Chauhan dynasty would survive and the fort would remain unconquered. Over the centuries, this eternal lamp has witnessed the rise and fall of empires, survived numerous wars and natural disasters, and outlasted the Chauhan dynasty itself. During the Mughal period, when the fort was under Muslim control, attempts were made to extinguish the flame, considering it a symbol of Hindu resistance. However, the lamp miraculously continued to burn, even when its oil supply was cut off. During the British period, skeptical officials tried to extinguish the flame multiple times, but it always reignited spontaneously. The lamp survived the great earthquake of 1905, which damaged much of the fort, and even during India\'s partition in 1947, when communal tensions were at their peak, the flame remained undisturbed. Local people believe that the eternal lamp is not just a religious symbol but a living connection to Rajasthan\'s glorious past. Pilgrims come from far and wide to offer oil to the lamp, believing that their wishes will be granted if the flame accepts their offering. The priests who tend the lamp claim that its brightness varies according to the political climate of the region - burning brighter during times of peace and dimming when conflict approaches. Some say that the lamp will only be extinguished when a great leader emerges to unite all of Rajasthan under a single banner, fulfilling the ancient prophecy of the Chauhan dynasty.'
 }
 ],
 icon: '',
 coordinates: '26.4499°N, 74.6399°E',
 visitingHours: '9:00 AM - 5:00 PM',
 entryFee: '₹20 for Indians, ₹150 for foreigners',
 images: [
 {
 src: '/images/forts/taragarh-ajmer/250px-Prithvi_Raj_Chauhan__Edited_.jpg',
 alt: 'Taragarh Fort in Ajmer'
 },
 {
 src: '/images/forts/taragarh-ajmer/250px-Prithvi_Raj_Chauhan__Edited_.jpg',
 alt: 'Walls of Taragarh Fort'
 },
 {
 src: '/images/forts/taragarh-ajmer/250px-Prithvi_Raj_Chauhan__Edited_.jpg',
 alt: 'Statue of Prithviraj Chauhan at Taragarh Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bijai-garh',
 name: 'Bijai Garh (Vijay Garh)',
 hindiName: 'बिजयगढ़ (विजयगढ़)',
 location: 'Karauli, Rajasthan',
 builtBy: 'Raja Bijai Pal',
 period: '1348 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Historical Monument & Karauli Dynasty Seat',
 significance: [
 'Ancient capital of the Karauli dynasty',
 'Strategic location in the Aravalli hills',
 'Houses the royal palace of Karauli rulers',
 'Important center of Yaduvanshi Rajput power',
 'Protected the ancient city of Karauli',
 'Witnessed the rise and fall of the Karauli kingdom'
 ],
 architecture: [
 'Massive stone walls built on steep hills',
 'Multiple gateways with defensive structures',
 'Royal palaces with intricate carvings',
 'Ancient temples within the complex',
 'Strategic watchtowers and battlements',
 'Underground passages and storage facilities',
 'Beautiful gardens and courtyards'
 ],
 description: 'Bijai Garh, built by Raja Bijai Pal in 1348 CE, stands as the ancient seat of the Karauli dynasty in the Aravalli hills. This magnificent fortress served as the capital of the Yaduvanshi Rajput rulers and protected the sacred city of Karauli.',
 detailedHistory: 'Built by Raja Bijai Pal in 1348 CE, Bijai Garh served as the capital of the Karauli dynasty for over six centuries. The fort\'s strategic location in the Aravalli hills provided natural defenses and controlled important trade routes between northern and central India. The Karauli rulers, descendants of Lord Krishna\'s Yaduvanshi clan, built a powerful kingdom that resisted numerous invasions. The fort witnessed several battles against the Mughals, Marathas, and British, serving as a symbol of Rajput resistance and pride.',
 culturalSignificance: 'Bijai Garh represents the cultural and architectural heritage of the Karauli dynasty. The fort\'s palaces, temples, and courtyards showcase the sophisticated artistic traditions of the Yaduvanshi Rajputs. The fort played a crucial role in the political and cultural development of the Karauli region, serving as a center of administration, culture, and religious activities. The nearby city of Karauli is considered sacred due to its connection with Lord Krishna.',
 interestingFacts: [
 'The fort has 18 large water reservoirs carved into the rock',
 'It houses one of the oldest temples dedicated to Lord Krishna',
 'The fort\'s architecture includes both Rajput and Mughal styles',
 'Several secret passages connect the fort to the city below',
 'The royal family still maintains a residence within the fort'
 ],
 fortStories: [
 {
 title: 'The Divine Vision of Raja Bijai Pal',
 category: 'Founding Legend',
 content: 'According to legend, Raja Bijai Pal, the founder of Karauli, received divine guidance in choosing the site for his fort. The story goes that the Raja, a devout follower of Lord Krishna, was meditating on a hilltop when he experienced a profound vision. In this vision, Lord Krishna himself appeared, accompanied by his brother Balarama, and declared that this hill was the very place where their ancestor, King Yadu, had performed penance thousands of years ago. The divine vision revealed that the hill was blessed by numerous gods and that any fort built here would become the center of a great kingdom that would protect the sacred traditions of the Yaduvanshi clan. Lord Krishna blessed Raja Bijai Pal, declaring that as long as his descendants ruled from this fort, they would maintain the dharma and protect the innocent. When the Raja awoke from his vision, he found that the ground where he had meditated was marked with mysterious symbols that resembled the Sudarshan Chakra (Lord Krishna\'s divine discus). Taking this as a divine sign, he immediately began construction of the fort. The main palace was built at the exact spot where he had received the vision, and a beautiful temple dedicated to Lord Krishna was constructed nearby. Local people believe that the hill itself is sacred and that the fort serves as a bridge between the earthly and divine realms. Some claim that on certain auspicious days, particularly during Janmashtami (Lord Krishna\'s birthday), a divine light can be seen emanating from the highest point of the fort. The legend serves as a reminder that Bijai Garh is not just a military fortification but a sacred space blessed by divine powers.'
 },
 {
 title: 'The Curse of the Banished Queen',
 category: 'Royal Legend',
 content: 'One of the most tragic legends associated with Bijai Garh involves Queen Padmavati, the beautiful but ambitious wife of Raja Gopal Singh. According to the story, Queen Padmavati was not only exceptionally beautiful but also possessed supernatural powers that she had acquired through years of tantric practices. However, her ambition and jealousy eventually led to her downfall. The legend goes that the Queen became obsessed with ensuring that her son would inherit the throne, even though the Raja already had an heir from his first wife. She began performing dark rituals and casting spells to eliminate her rivals. Her most heinous act was allegedly poisoning the crown prince during a religious ceremony. When her crimes were discovered, the royal court was thrown into chaos. Raja Gopal Singh, heartbroken by his wife\'s betrayal, ordered her to be banished from the kingdom. However, before leaving, Queen Padmavati placed a terrible curse on the fort and the royal family. She declared that no first-born son of the Karauli dynasty would ever live to see his twenty-fifth birthday, and that the fort would witness the downfall of every ruler who betrayed the trust of his people. The curse supposedly took effect immediately - the Raja\'s son from his first wife died mysteriously within a year, and subsequent generations witnessed the untimely deaths of their first-born sons. The curse became so well-known that the royal family began sending their first-born sons to be raised in distant relatives\' households, hoping to break the cycle. Some believe that the curse was finally broken when a particularly just and benevolent ruler performed elaborate rituals and charitable acts to appease the Queen\'s spirit. Others claim that the curse still lingers, but its effects have been diminished by the prayers and good deeds of subsequent rulers. Local people believe that the ghost of Queen Padmavati still haunts the old palace, particularly during the new moon nights, when her mournful wails can be heard echoing through the empty corridors.'
 },
 {
 title: 'The Hidden Treasury of the Yaduvanshis',
 category: 'Treasure Legend',
 content: 'The Karauli dynasty, being direct descendants of Lord Krishna, is said to possess one of the most magnificent treasuries in Rajasthan, much of which remains hidden within the secret chambers of Bijai Garh. According to legend, the treasure was accumulated over centuries through various means - military conquests, trade, and divine blessings. The most prized possession was said to be the original crown jewels of Lord Krishna himself, which had been passed down through generations of the Yaduvanshi clan. When the Mughal emperor Akbar demanded that Raja Gopal Singh of Karauli submit to his authority, the Raja refused and began preparing for war. Knowing that defeat was possible, he ordered his most trusted minister to hide the royal treasury in a series of secret chambers beneath the fort. The minister, along with a select group of loyal soldiers, created an elaborate network of false passages and hidden chambers to protect the treasure. They then performed complex rituals to invoke divine protection, ensuring that the treasure could only be found by a true descendant of the Yaduvanshi clan who possessed both royal blood and spiritual purity. The location of the treasure was said to be revealed through a complex puzzle involving the fort\'s architecture, ancient Sanskrit verses, and astronomical calculations based on the positions of stars mentioned in the Mahabharata. Over the centuries, numerous treasure hunters have searched for the Yaduvanshi treasure, and several have reportedly died under mysterious circumstances. Some claim to have found chambers filled with gold coins and precious gems, only to find them empty when they returned with help. Others speak of encountering supernatural guardians - fierce warriors in ancient armor who protect the treasure. Local people believe that the treasure exists but can only be found when a worthy descendant of Lord Krishna emerges to restore the glory of the Yaduvanshi clan. Until then, the treasure remains hidden, protected by ancient curses and the spirits of loyal Karauli warriors.'
 },
 {
 title: 'The Phantom Army of Raja Arjun Singh',
 category: 'Ghost Story',
 content: 'Raja Arjun Singh of Karauli was known as one of the bravest warriors of his time, leading his armies to numerous victories against formidable enemies. According to legend, during his final battle against a coalition of Mughal and Maratha forces, the Raja fought with such extraordinary valor that even his enemies were awestruck. Despite being heavily outnumbered, he and his elite guard of 500 warriors held the fort against an army of over 10,000 soldiers for seven days and nights. On the eighth day, when it became clear that defeat was inevitable, the Raja gathered his remaining warriors and made them swear an oath that they would continue to protect the fort and the Karauli kingdom even after death. The warriors then performed a ritual, offering their lives to Lord Krishna, and died fighting to the last man. Since that day, numerous people have reported seeing ghostly figures patrolling the fort walls, particularly during the hours of dawn and dusk. These phantom warriors are described as tall, imposing figures in royal Karauli armor, carrying gleaming swords and shields, marching in perfect formation along the ramparts. Some claim that these spirits have prevented the fort from falling to enemies on several occasions. There are stories of attacking armies being terrified by the sight of ghostly warriors appearing on the walls, causing them to abandon their sieges. Others speak of lost travelers being guided to safety by mysterious figures who appear and disappear without explanation. The most remarkable aspect of this legend is that the phantom army is said to be led by Raja Arjun Singh himself, who rides a magnificent white horse and carries the royal standard of Karauli. Local people believe that these spirits are not malevolent but are the eternal guardians of this sacred space, continuing their duty to protect the Yaduvanshi legacy even beyond death.'
 },
 {
 title: 'The Eternal Flame of the Yaduvanshi Dynasty',
 category: 'Religious Legend',
 content: 'Within the royal palace of Bijai Garh stands a small shrine that houses an eternal flame, said to have been burning continuously since the fort\'s construction in 1348 CE. According to legend, this sacred fire was first lit by Raja Bijai Pal himself using special ghee prepared according to ancient formulas passed down from Lord Krishna\'s time. The lamp was blessed by the royal priests with a powerful mantra that declared that as long as this flame continued to burn, the Yaduvanshi dynasty would survive and the fort would remain unconquered. What makes this eternal flame unique is that it is said to have been blessed not just by Hindu priests but also by Sufi saints who were respected by the Karauli rulers. The flame supposedly has the power to unite different faiths and protect all who seek refuge within the fort. Over the centuries, this eternal lamp has witnessed the rise and fall of empires, survived numerous wars and natural disasters, and outlasted the Karauli dynasty\'s political power. During the Mughal period, when the fort was under Muslim control, attempts were made to extinguish the flame, considering it a symbol of Hindu resistance. However, the lamp miraculously continued to burn, even when its oil supply was cut off. During the British period, skeptical officials tried to extinguish the flame multiple times, but it always reignited spontaneously. The flame survived the great famine of 1868, which devastated much of Rajasthan, and even during India\'s partition in 1947, when communal tensions were at their peak, the flame remained undisturbed. Local people believe that the eternal flame is not just a religious symbol but a living connection to Lord Krishna himself. Pilgrims come from far and wide to offer oil to the lamp, believing that it has the power to unite families and resolve conflicts. The priests who tend the flame claim that its brightness varies according to the moral climate of the region - burning brighter during times of harmony and dimming when discord approaches. Some say that the lamp will only be extinguished when the descendants of Lord Krishna once again unite to protect dharma in the land of Rajasthan.'
 }
 ],
 icon: '',
 coordinates: '26.5000°N, 77.0200°E',
 visitingHours: '8:00 AM - 6:00 PM',
 entryFee: '₹30 for Indians, ₹250 for foreigners',
 images: [
 {
 src: '/images/forts/bijai-garh/250px-Wallsbayana.jpg',
 alt: 'BijaiGarh Fort in Karauli'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'narwar-fort',
 name: 'Narwar Fort',
 hindiName: 'नरवाड़ किला',
 location: 'Narwar, Madhya Pradesh (Kachwaha Territory)',
 builtBy: 'Raja Nal Singh Kachwaha',
 period: '1292 CE',
 type: 'Hill Fort',
 category: 'fort',
 status: 'Historical Monument & Kachwaha Stronghold',
 significance: [
 'Ancient stronghold of the Kachwaha Rajputs',
 'Strategic location controlling Malwa-Rajasthan routes',
 'Houses the palace of Narwar rulers',
 'Important center of Kachwaha power before Amber',
 'Protected the ancient city of Narwar',
 'Witnessed the rise of the Kachwaha dynasty'
 ],
 architecture: [
 'Massive stone walls built on rocky hills',
 'Multiple gateways with defensive structures',
 'Royal palaces with intricate carvings',
 'Ancient temples within the complex',
 'Strategic watchtowers and battlements',
 'Underground passages and storage facilities',
 'Beautiful gardens and water systems'
 ],
 description: 'Narwar Fort, built by Raja Nal Singh Kachwaha in 1292 CE, stands as the ancient stronghold of the Kachwaha dynasty in the rocky hills of Narwar. This magnificent fortress served as the capital of the Kachwaha rulers before they established their kingdom in Amber.',
 detailedHistory: 'Built by Raja Nal Singh Kachwaha in 1292 CE, Narwar Fort served as the capital of the Kachwaha dynasty before they moved to Amber. The fort\'s strategic location in the rocky hills of Narwar provided natural defenses and controlled important trade routes between Malwa and Rajasthan. The Kachwaha rulers, descendants of the ancient solar dynasty, built a powerful kingdom that resisted numerous invasions. The fort witnessed several battles against the Delhi Sultanate, Mughals, and regional powers, serving as a symbol of Kachwaha resistance and pride.',
 culturalSignificance: 'Narwar Fort represents the cultural and architectural heritage of the Kachwaha dynasty. The fort\'s palaces, temples, and courtyards showcase the sophisticated artistic traditions of the Kachwaha Rajputs. The fort played a crucial role in the political and cultural development of the region, serving as a center of administration, culture, and religious activities before the Kachwahas established their capital in Amber.',
 interestingFacts: [
 'The fort has 12 large water reservoirs carved into the rock',
 'It houses one of the oldest temples dedicated to the Sun God',
 'The fort\'s architecture includes both Rajput and Mughal styles',
 'Several secret passages connect the fort to the city below',
 'The royal family maintained a residence here even after moving to Amber'
 ],
 fortStories: [
 {
 title: 'The Divine Vision of Raja Nal Singh',
 category: 'Founding Legend',
 content: 'According to legend, Raja Nal Singh Kachwaha received divine guidance in choosing the site for his fort. The story goes that the Raja, a devout follower of the Sun God, was hunting in the rocky hills of Narwar when he witnessed a miraculous phenomenon. As the sun was setting, its last rays illuminated a particular hilltop, creating a golden aura that seemed to pulse with divine energy. In that moment, Raja Nal Singh had a profound vision in which the Sun God himself appeared, declaring that this hill was the dwelling place of ancient solar deities who had protected the region for millennia. The divine vision revealed that the hill was blessed by the gods and that any fort built here would become the center of a great kingdom that would protect the sacred traditions of the solar dynasty. The Sun God blessed Raja Nal Singh, declaring that as long as his descendants ruled from this fort, they would maintain dharma and protect the innocent. When the Raja awoke from his vision, he found that the ground where he had stood was marked with mysterious symbols that resembled the sun\'s rays. Taking this as a divine sign, he immediately began construction of the fort. The main palace was built at the exact spot where he had received the vision, and a beautiful temple dedicated to the Sun God was constructed nearby. Local people believe that the hill itself is sacred and that the fort serves as a bridge between the earthly and divine realms. Some claim that on certain auspicious days, particularly during the summer solstice, a divine golden light can be seen emanating from the highest point of the fort. The legend serves as a reminder that Narwar Fort is not just a military fortification but a sacred space blessed by divine powers.'
 },
 {
 title: 'The Curse of the Defeated Queen',
 category: 'Historical Legend',
 content: 'One of the most haunting legends of Narwar Fort tells of a defeated queen who cursed the fort after witnessing the destruction of her kingdom. According to the story, in the early 14th century, the fort was attacked by a powerful Muslim general who sought to conquer the Kachwaha stronghold. The queen, whose husband had fallen in battle, stood on the ramparts and watched as her people were slaughtered and her palace burned. In her grief and rage, she invoked an ancient curse upon anyone who would desecrate the sacred grounds of Narwar. Legend has it that she declared: "May those who spill innocent blood upon these sacred hills face the wrath of the Sun God himself." The curse was said to be particularly powerful because the queen was a direct descendant of the solar dynasty, and her words carried divine weight. Since that fateful day, several attempts to capture the fort have failed mysteriously, with attackers falling ill, experiencing strange visions, or abandoning their campaigns without explanation. Local people believe that the queen\'s spirit still wanders the fort at night, particularly around the area where the old palace once stood. Some claim to have seen a beautiful woman in royal attire standing on the battlements, her eyes glowing with supernatural light. The legend serves as a warning that Narwar Fort is protected not just by its strong walls but by ancient spiritual forces that guard its sacred grounds.'
 },
 {
 title: 'The Immortal Guardian of the Solar Temple',
 category: 'Religious Legend',
 content: 'Deep within Narwar Fort lies an ancient temple dedicated to the Sun God, and according to legend, it is guarded by an immortal being who has protected the sacred site for centuries. The story tells of a holy man who arrived at the fort during its construction, claiming to be a direct descendant of the ancient solar priests who had served the Sun God since time immemorial. Raja Nal Singh, recognizing the holy man\'s divine nature, requested that he become the guardian of the solar temple that was being built within the fort. The holy man agreed but set one condition: that he and his descendants would serve as guardians of the temple for all eternity, and that no one should disturb his meditation chamber, which he established in a cave beneath the temple. The Raja agreed, and the holy man took up residence in the cave, where he was said to have achieved a state of divine consciousness that transcended normal human existence. According to legend, the holy man never aged, and his meditation continued even after his physical form appeared to have passed away. Local people believe that his consciousness merged with the divine energy of the Sun God, and that he continues to protect the temple in spiritual form. Several miraculous events have been reported at the temple, including spontaneous healing of the sick, divine visions experienced by devotees, and mysterious lights that appear during sunrise and sunset. Some claim that if you visit the temple at dawn on the summer solstice, you can hear the chanting of ancient Vedic hymns emanating from the cave below. The legend of the immortal guardian serves as a reminder that Narwar Fort is not just a historical monument but a living spiritual center where the divine and earthly realms intersect.'
 },
 {
 title: 'The Secret Treasury of the Kachwaha Kings',
 category: 'Treasure Legend',
 content: 'Throughout the centuries, legend has spoken of a secret treasury hidden somewhere within the labyrinthine passages of Narwar Fort, containing the accumulated wealth of the Kachwaha kings from the time of Raja Nal Singh onward. The story goes that the Kachwaha rulers, fearing invasion and plunder, constructed a vast underground chamber that could only be accessed through a series of complex mechanisms and secret codes. The treasury was said to contain not just gold and jewels, but also sacred artifacts, ancient manuscripts, and divine weapons that had been passed down through the solar dynasty. According to legend, the location of the treasury was known only to the reigning king and was passed down through a secret ritual that occurred at the moment of succession. The entrance to the treasury was protected by multiple layers of deception, including false passages, deadly traps, and illusions created by ancient tantric practitioners who served the royal court. One of the most intriguing aspects of the legend is the existence of a "treasure map" that was supposedly carved into the walls of the royal palace in the form of seemingly decorative patterns. These patterns, when viewed in the correct sequence and from the proper angle, would reveal clues to the treasury\'s location. Over the centuries, many treasure hunters have attempted to locate the hidden chamber, but all have failed, often meeting mysterious ends or abandoning their quests after experiencing supernatural phenomena. Some believe that the treasury is protected by the same divine forces that blessed the fort at its founding, and that it will only be revealed when a worthy descendant of the solar dynasty returns to claim what is rightfully theirs. The legend continues to fascinate historians and treasure hunters, who believe that the secret treasury of Narwar Fort represents not just material wealth but the spiritual and cultural heritage of one of Rajasthan\'s most ancient royal families.'
 }
 ],
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Narwar Fort in Madhya Pradesh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ruins at Narwar Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Diwan-i-Aam at Narwar Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-jaipur',
 name: 'City Palace, Jaipur',
 hindiName: 'सिटी पैलेस, जयपुर',
 location: 'Jaipur, Rajasthan',
 coordinates: { lat: 26.9255, lng: 75.8236 },
 builtBy: 'Maharaja Sawai Jai Singh II',
 period: '1729-1732 CE',
 category: 'palace',
 icon: '',
 status: 'Royal Residence & Museum',
 significance: [
 'Official residence of the Jaipur royal family',
 'Magnificent blend of Rajput and Mughal architecture',
 'Houses the world\'s largest silver vessels',
 'Center of Jaipur\'s cultural and political life',
 'Contains extensive royal collections and artifacts',
 'Symbol of Jaipur\'s golden age under Sawai Jai Singh'
 ],
 architecture: [
 'Beautiful fusion of Rajput and Mughal styles',
 'Intricate marble work and mirror decorations',
 'Magnificent courtyards and gardens',
 'Ornate gateways with detailed carvings',
 'Royal halls with exquisite paintings',
 'Traditional Jaipur blue pottery decorations',
 'Sophisticated water management systems'
 ],
 description: 'City Palace, built by Maharaja Sawai Jai Singh II between 1729-1732 CE, stands as the magnificent royal residence of the Jaipur royal family. This grand palace complex represents the perfect synthesis of Rajput and Mughal architectural styles and continues to serve as the official residence of the royal family.',
 detailedHistory: 'Maharaja Sawai Jai Singh II, the founder of Jaipur and a great astronomer and warrior, constructed the City Palace as the ceremonial and administrative seat of the kingdom of Jaipur. The palace was built simultaneously with the establishment of Jaipur city, which was designed according to Vastu Shastra principles. The complex has been expanded by successive rulers, with additions made by Maharaja Madho Singh, Maharaja Sawai Pratap Singh, and Maharaja Sawai Man Singh II. The palace has witnessed the transformation of Jaipur from a princely state to a modern city while maintaining its royal traditions and cultural heritage.',
 culturalSignificance: 'City Palace represents the cultural renaissance of Jaipur under the Kachwaha dynasty. The palace has been the center of Jaipur\'s artistic, cultural, and political life for nearly three centuries. It houses the famous Maharaja Sawai Man Singh II Museum, which displays royal costumes, weapons, manuscripts, and artifacts that showcase the rich cultural heritage of Rajasthan. The palace continues to be the venue for important royal ceremonies and festivals, maintaining the living traditions of the Jaipur royal family.',
 interestingFacts: [
 'The palace complex covers one-seventh of the walled city area',
 'It houses two massive silver vessels (1.6 meters tall) that hold the Guinness World Record',
 'The palace has seven floors but appears to have only five from the street level',
 'The Chandra Mahal has a clock tower that has been keeping time for over 250 years',
 'The palace complex includes several beautiful courtyards like Mubarak Mahal and Sarvato Bhadra'
 ],
 fortStories: [
 {
 title: 'The Divine Vision of Sawai Jai Singh',
 category: 'Founding Legend',
 content: 'According to legend, Maharaja Sawai Jai Singh II received divine guidance in designing both Jaipur city and the City Palace. The story goes that the Maharaja, who was not only a great warrior but also a renowned astronomer and scholar, spent months in meditation seeking divine guidance for his new capital. One night, he had a profound vision in which the goddess of wisdom appeared before him, carrying architectural plans that glowed with divine light. The goddess revealed that the palace should be built in such a way that it would serve as a bridge between the earthly and celestial realms, with its courtyards representing the planets and its towers reaching toward the stars. She blessed the Maharaja, declaring that as long as his descendants ruled from this palace, they would maintain the balance between temporal power and spiritual wisdom. When the Maharaja awoke, he found that the architectural plans from his vision had been mysteriously transferred to his study table, complete with detailed measurements and astronomical alignments. Taking this as a divine sign, he immediately began construction, ensuring that every aspect of the palace followed the sacred geometry revealed in his vision. Local people believe that the palace\'s unique energy comes from these divine origins, and that certain rooms in the palace are aligned with specific constellations. Some claim that on clear nights, particularly during festivals, a mysterious blue light can be seen emanating from the highest tower of the palace, which they believe is the goddess\'s blessing continuing to protect the royal family and the city of Jaipur.'
 },
 {
 title: 'The Curse of the Silver Vessels',
 category: 'Royal Legend',
 content: 'One of the most intriguing legends of City Palace involves the world\'s largest silver vessels and the curse that supposedly protects them. According to the story, when Maharaja Sawai Madho Singh II was preparing for his historic journey to England in 1901, he wanted to ensure that he could maintain his religious purity while traveling in foreign lands. He commissioned two massive silver vessels to be made, each capable of holding thousands of liters of water from the Ganges River. However, as the royal craftsmen worked on these enormous vessels, strange occurrences began to plague the palace workshop. Tools would disappear and reappear in impossible locations, workers reported hearing mysterious chanting at night, and several craftsmen fell seriously ill without apparent cause. The palace astrologers were consulted, and they revealed that the silver vessels had attracted the attention of ancient spirits who demanded that the vessels be consecrated with proper rituals. The royal priests performed elaborate ceremonies, but the disturbances continued. Finally, a revered holy man who was visiting Jaipur was consulted. He revealed that the vessels had become vessels of immense spiritual power and that they carried a dual blessing and curse: they would protect the royal family from spiritual pollution while traveling, but anyone who attempted to use them for impure purposes or remove them from the palace would face divine retribution. The holy man performed special rituals and placed protective mantras on the vessels, declaring that they were now sacred objects that belonged to the palace and the city of Jaipur. Since that time, the silver vessels have become symbols of both royal power and spiritual responsibility, and they continue to fascinate visitors who come to see these magnificent examples of royal craftsmanship and spiritual significance.'
 },
 {
 title: 'The Secret Chamber of the Nine Gems',
 category: 'Historical Legend',
 content: 'Deep within the labyrinthine passages of City Palace, there is said to be a secret chamber that was once the meeting place of the legendary "Nine Gems" or "Navaratnas" - the nine extraordinary scholars and artists who graced the court of Maharaja Sawai Jai Singh II. According to legend, this hidden chamber was not just a meeting room but a place of profound intellectual and spiritual significance. The chamber was supposedly located beneath the main courtyard and could only be accessed through a series of intricate mechanisms that required knowledge of astronomy, mathematics, and sacred geometry to operate. The walls of the chamber were said to be covered with astronomical charts, mathematical formulas, and mystical symbols that contained the accumulated wisdom of ancient India. The Nine Gems, who included the great astronomer and poet Jagannatha Samrat, the renowned musician Mian Tansen (who was brought to Jaipur after Akbar\'s court), and the brilliant mathematician and poet Kavi Kumbhan Das, would gather here to discuss philosophy, science, music, and the arts. However, the legend takes a mysterious turn when it speaks of the chamber\'s disappearance. According to the story, after the death of Maharaja Sawai Jai Singh II, the location of the chamber was lost, and the mechanisms that controlled access to it ceased to function. Some believe that the chamber was deliberately sealed by the royal family to protect the valuable knowledge and artifacts it contained. Others claim that the chamber exists in a different dimension and can only be accessed by those who possess both the intellectual capacity and spiritual purity to understand its secrets. Treasure hunters and historians have searched for the chamber for centuries, but it remains hidden, waiting for the right person to rediscover its location and unlock its mysteries. The legend serves as a reminder of Jaipur\'s golden age as a center of learning and culture, and the enduring mystery of the Nine Gems continues to captivate scholars and visitors alike.'
 },
 {
 title: 'The Immortal Guardian of the Peacock Gate',
 category: 'Supernatural Legend',
 content: 'The famous Peacock Gate at City Palace, one of the four small gates in the Pritam Niwas Chowk, is not just a masterpiece of Rajput architecture but also the subject of a fascinating supernatural legend. According to the story, when Maharaja Sawai Pratap Singh commissioned the construction of these ornate gates in the late 18th century, he wanted each gate to represent a different season and Hindu deity. The Peacock Gate, representing autumn and dedicated to Lord Vishnu, was designed with intricate peacock motifs that seemed to come alive under the skilled hands of the royal craftsmen. However, as the gate neared completion, strange occurrences began to be reported. The peacocks in the palace gardens would gather near the gate and refuse to leave, even when offered food elsewhere. At night, guards reported hearing the sound of peacock calls emanating from the gate itself, even when no actual peacocks were present. The most disturbing reports came from those who claimed to have seen the peacocks in the gate\'s carvings actually moving their feathers and turning their heads. The palace astrologers were consulted, and they revealed that the gate had become a portal between the earthly and divine realms, and that it was being guarded by an immortal being who had taken the form of a peacock. This guardian, they claimed, was a divine servant of Lord Vishnu who had been assigned to protect the palace and its royal inhabitants. The astrologers performed elaborate rituals to ensure that the guardian would remain benevolent and continue to protect rather than harm those who passed through the gate. Since that time, the Peacock Gate has been considered both a architectural marvel and a spiritually significant structure. Visitors and locals alike believe that those who pass through the gate with pure intentions will receive the blessing of the immortal guardian, while those with malicious intent will feel an inexplicable sense of unease and will be unable to proceed. The legend adds an extra layer of mystique to what is already considered one of the most beautiful examples of Rajput craftsmanship in India.'
 },
 {
 title: 'The Phantom Procession of the Royal Court',
 category: 'Ghost Legend',
 content: 'One of the most enduring and spine-chilling legends associated with City Palace is the story of the phantom procession that is said to appear on certain nights, particularly during the full moon and on important anniversaries of the royal family. According to numerous eyewitness accounts spanning several centuries, those who are near the palace after midnight on these special nights report hearing the sound of traditional royal music, including the haunting melodies of shehnai (Indian oboe) and the rhythmic beating of drums. The music is followed by the appearance of a ghostly procession that emerges from the main gate of the palace and proceeds through the courtyards and halls. The procession is said to include the spectral figures of former maharajas and maharanis, dressed in their full royal regalia, complete with jeweled turbans, ornate robes, and traditional royal ornaments. They are accompanied by courtiers, musicians, dancers, and palace guards, all appearing as they would have during the height of Jaipur\'s royal splendor. The most remarkable aspect of this legend is the consistency of the reports across different generations. Palace guards, royal family members, and even skeptical historians have claimed to witness this supernatural spectacle. The phantom procession is said to move through the palace with solemn dignity, as if reenacting some important royal ceremony from the past. Some believe that this represents the eternal nature of royal power and that the spirits of the former rulers continue to perform their ceremonial duties even after death. Others interpret it as a reminder of the palace\'s glorious past and the enduring legacy of the Jaipur royal family. The legend has become so well-known that some visitors specifically request night tours of the palace, hoping to catch a glimpse of this ghostly royal court. Whether one believes in the supernatural or not, the story of the phantom procession adds an element of mystery and romance to the already fascinating history of City Palace, Jaipur.'
 }
 ],
 images: [
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'City Palace Complex in Jaipur'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Chandra Mahal in City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Horse Carriages at City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Clock Tower at City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Diwan-i-Khas in City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Tripolia Gate at City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Mubarak Mahal in City Palace'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Intricate Metal and Marble Work on a Door in City Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'hawa-mahal',
 name: 'Hawa Mahal',
 hindiName: 'हवा महल',
 location: 'Jaipur, Rajasthan',
 coordinates: { lat: 26.9239, lng: 75.8267 },
 builtBy: 'Maharaja Sawai Pratap Singh',
 period: '1799 CE',
 category: 'palace',
 icon: '',
 status: 'Historical Monument & Architectural Marvel',
 significance: [
 'Unique five-story honeycomb structure with 953 windows',
 'Built for royal women to observe street life without being seen',
 'Represents the zenith of Rajput architecture and engineering',
 'Serves as a natural air conditioner through its unique design',
 'Houses the Archaeological Museum of Jaipur',
 'Symbol of royal women\'s seclusion and architectural innovation'
 ],
 architecture: [
 'Pyramidal shape with five distinct floors',
 '953 small windows (jharokhas) with intricate latticework',
 'Built using red and pink sandstone',
 'Cooling system based on the Venturi effect',
 'Ornate balconies and hanging cornices',
 'Domed canopies and floral patterns',
 'Strategic orientation to catch cool breezes'
 ],
 description: 'Hawa Mahal, built by Maharaja Sawai Pratap Singh in 1799 CE, is the iconic "Palace of Winds" that has become the symbol of Jaipur. This extraordinary five-story structure with its 953 small windows represents the pinnacle of Rajput architectural ingenuity and served as the perfect vantage point for royal women to observe street life while remaining unseen.',
 detailedHistory: 'Maharaja Sawai Pratap Singh, the grandson of Maharaja Sawai Jai Singh II, commissioned the construction of Hawa Mahal in 1799. The palace was designed by Lal Chand Ustad as an extension of the City Palace complex, specifically built to allow the royal women of the zenana (women\'s quarters) to observe everyday life and processions in the streets below without being seen, in accordance with the strict purdah system practiced by the royal family. The structure was also designed to provide relief from the intense heat of Rajasthan summers through its unique ventilation system that creates a constant flow of cool air throughout the building.',
 culturalSignificance: 'Hawa Mahal represents the sophisticated architectural and social traditions of Rajput royalty. The palace embodies the concept of purdah while demonstrating remarkable engineering innovation. Its honeycomb structure and intricate latticework showcase the artistic excellence of Jaipur\'s craftsmen. The palace has become an enduring symbol of Jaipur itself, representing the city\'s nickname as the "Pink City" and its reputation for architectural innovation. Today, it serves as a museum and continues to inspire architects and designers worldwide.',
 interestingFacts: [
 'The palace has no stairs to reach the upper floors - only ramps',
 'The top three floors are just the width of a single room',
 'The palace was designed to resemble the crown of Lord Krishna',
 'The 953 windows were designed to allow royal ladies to observe street festivals',
 'The structure creates a natural cooling effect that can reduce temperatures by several degrees'
 ],
 fortStories: [
 {
 title: 'The Divine Inspiration of the Wind Goddess',
 category: 'Founding Legend',
 content: 'According to legend, Maharaja Sawai Pratap Singh was inspired to build Hawa Mahal after receiving a divine vision from the Wind Goddess herself. The story goes that the Maharaja, who was deeply devoted to Lord Krishna, spent many hours in meditation and prayer in the palace gardens. One particularly hot summer afternoon, as he sat meditating under a banyan tree, he began to feel faint from the intense heat. In his moment of distress, he prayed to Lord Krishna for relief and guidance. Suddenly, a gentle breeze began to blow, and with it came a vision of extraordinary beauty. The Wind Goddess appeared before him, her form composed of swirling air and light, carrying in her hands a miniature palace that seemed to be made entirely of moving air and light. She revealed to the Maharaja that this was to be his contribution to the architectural heritage of his dynasty - a palace that would serve not just as a residence but as a living entity that breathed with the wind itself. The goddess explained that the structure should have countless windows, each one a portal through which the wind could pass, carrying with it the prayers and blessings of the people. She blessed the Maharaja, declaring that this palace of winds would become a symbol of divine grace and architectural perfection. When the vision ended, the Maharaja found that the intense heat had vanished, replaced by a constant, cooling breeze. He immediately summoned his chief architect, Lal Chand Ustad, and described the vision in detail. The architect, recognizing the divine nature of the commission, spent months studying wind patterns, temperature variations, and the principles of natural ventilation before creating the final design. Local people believe that the Wind Goddess\'s blessing continues to protect the palace, and that even on the hottest days, a gentle breeze always flows through its 953 windows. Some claim that if you stand very still in the center of the palace and close your eyes, you can hear the faint sound of the goddess\'s voice carried on the wind, whispering ancient blessings and prayers.'
 },
 {
 title: 'The Secret Romance of the Zenana',
 category: 'Romantic Legend',
 content: 'One of the most romantic legends associated with Hawa Mahal tells of a secret love affair that blossomed within its honeycomb walls. According to the story, during the reign of Maharaja Sawai Pratap Singh, there lived a beautiful young princess named Chandrakala, the daughter of a neighboring ruler who had been sent to the Jaipur court as part of a political alliance. The princess, who lived in the zenana quarters of the City Palace, was known for her exceptional beauty, intelligence, and skill in classical music and dance. However, she was also known for her rebellious spirit and her desire to experience life beyond the confines of the purdah system. One day, while exploring the newly constructed Hawa Mahal, Princess Chandrakala discovered that from certain windows on the upper floors, she could observe the bustling life of Jaipur\'s streets below without being seen herself. She became fascinated by the sight of a young poet and musician named Ratan Singh, who would often perform in the streets near the palace, singing beautiful ballads and playing haunting melodies on his flute. Day after day, the princess would secretly watch the young poet from behind the latticework of the Hawa Mahal, and gradually, she fell deeply in love with him. Through an elaborate system of signals involving flowers, colored scarves, and coded messages delivered by trusted servants, the princess and the poet began a secret correspondence. The poet, who had noticed the mysterious beauty watching him from the palace windows, was equally smitten. Their romance blossomed through exchanged poems, secret messages, and occasional glimpses of each other through the intricate latticework. However, their happiness was short-lived, as the princess\'s father decided to arrange her marriage to a powerful prince from a distant kingdom. When Chandrakala received news of her impending marriage, she was heartbroken. In desperation, she sent a final message to her beloved poet through her most trusted servant. The poet, realizing that he would lose his beloved forever, composed a final, heart-wrenching ballad that he performed beneath the windows of the Hawa Mahal on the night before the princess was to depart. The legend claims that the princess, unable to bear the thought of leaving her true love, made a fateful decision. On her final morning in Jaipur, she climbed to the highest floor of the Hawa Mahal and, in a moment of tragic romance, threw herself from the window, her beautiful form carried away by the wind like a fallen petal. The poet, who had come to catch one last glimpse of his beloved, witnessed her fall and died of a broken heart shortly thereafter. Local people believe that the spirits of the two lovers continue to haunt the Hawa Mahal, particularly on full moon nights when the wind carries the sound of the poet\'s flute and the princess\'s gentle singing. Some claim to have seen two ghostly figures standing at the windows of the upper floors, forever separated by fate but united in death, their eternal love story carried on the eternal winds that give the palace its name.'
 },
 {
 title: 'The Curse of the Jealous Courtier',
 category: 'Historical Legend',
 content: 'The construction of Hawa Mahal was not without its share of intrigue and jealousy, as evidenced by one of the most enduring legends surrounding the palace. According to the story, when Maharaja Sawai Pratap Singh commissioned the building of the Palace of Winds, he entrusted the project to his most talented architect, Lal Chand Ustad. However, this decision created deep resentment among other courtiers, particularly a powerful nobleman named Diwan Amar Singh, who believed that his own son, who was also an architect, should have been given this prestigious commission. Diwan Amar Singh, consumed by jealousy and ambition, began to plot against Lal Chand Ustad. He spread false rumors that the architect was secretly planning to include hidden passages and secret chambers in the design that could be used to spy on the royal family or even facilitate an assassination attempt. The Diwan went so far as to bribe some of the construction workers to sabotage the building process, causing walls to collapse and foundations to crack. However, Lal Chand Ustad, who was not only a brilliant architect but also a man of great integrity and wisdom, began to suspect that something was amiss. He prayed to Lord Vishwakarma, the divine architect of the gods, for guidance and protection. According to legend, Lord Vishwakarma appeared to Lal Chand in a dream and revealed the Diwan\'s treacherous plans. The divine architect blessed Lal Chand with special knowledge that would not only protect the palace but also expose the evil intentions of those who sought to destroy it. When Lal Chand returned to the construction site, he implemented several clever design modifications that would make the palace structurally sound while also creating a trap for the saboteurs. He also began to document every aspect of the construction process, including the names of workers and suppliers, creating a detailed record that would later prove crucial. As the Diwan\'s sabotage attempts continued, they began to fail mysteriously. Walls that had been weakened would somehow become stronger overnight, and foundations that had been undermined would mysteriously solidify. The Diwan, frustrated by his failures and growing increasingly desperate, decided to take more drastic measures. He hired assassins to eliminate Lal Chand Ustad, but these attempts also failed in supernatural ways. Finally, the truth began to emerge when some of the bribed workers, overcome by guilt and fear of divine retribution, confessed their involvement to the Maharaja. When confronted with the evidence, Diwan Amar Singh was forced to admit his crimes. However, the legend takes a supernatural turn at this point. According to the story, as the Diwan was being led away to face punishment, he suddenly began to choke and gasp for air, claiming that he felt invisible hands around his throat. In his final moments, he is said to have cursed the palace, declaring that anyone who entered it with evil intentions would suffer a similar fate. Since that time, there have been numerous reports of people experiencing difficulty breathing, dizziness, or a sense of overwhelming dread when they approach the palace with malicious intent. Local people believe that Lord Vishwakarma\'s blessing and the Diwan\'s curse continue to protect the palace, ensuring that only those with pure intentions can fully appreciate its beauty and significance.'
 },
 {
 title: 'The Mysterious Music of the Wind Chambers',
 category: 'Musical Legend',
 content: 'One of the most enchanting legends associated with Hawa Mahal speaks of the mysterious musical properties that are said to be inherent in its very structure. According to the story, when Lal Chand Ustad was designing the palace, he was inspired not just by architectural principles but by the ancient Indian concept of "Nada Brahma" - the idea that the entire universe is composed of sound and vibration. The architect, who was also a skilled musician and student of classical Indian music, designed the palace with the intention of creating a living musical instrument that would produce ethereal melodies as the wind passed through its 953 windows. The legend claims that Lal Chand Ustad spent months studying the acoustics of wind instruments and the principles of sound resonance before finalizing his design. Each window was carefully crafted not just for ventilation and visual beauty, but also to produce specific musical notes when the wind passed through them. The size, shape, and orientation of each jharokha (window) were calculated to create a complex harmonic system that would respond to different wind speeds and directions. The architect is said to have embedded secret chambers within the palace walls that would act as resonance chambers, amplifying and modulating the natural sounds created by the wind. According to the legend, when the palace was first completed and the Maharaja came to inspect it, Lal Chand Ustad asked him to wait until sunset before making his final judgment. As the day ended and the evening breeze began to flow through Jaipur, something magical happened. The palace began to produce the most beautiful and haunting melodies, as if a celestial orchestra were performing within its walls. The music was said to be so enchanting that birds would stop singing to listen, and even the usually bustling streets of Jaipur would fall silent as people paused to hear the ethereal sounds emanating from the Palace of Winds. The Maharaja was so moved by this musical miracle that he bestowed great honors upon Lal Chand Ustad and declared that the palace should be preserved forever as a testament to the divine union of architecture and music. However, the legend also speaks of a darker aspect to this musical gift. According to some versions of the story, the music produced by the palace is not always benevolent. On certain nights, particularly during storms or periods of great change in the kingdom, the palace is said to produce discordant and unsettling sounds that can cause unease and even physical discomfort to those who hear them. Some believe that these musical warnings are the palace\'s way of communicating important messages about the future of the royal family and the kingdom. Local musicians and sound healers claim that if you visit the palace at dawn or dusk and listen very carefully, you can still hear the faint echoes of this wind-born music, particularly on the upper floors where the acoustics are most favorable. They believe that the palace continues to sing its eternal song, a musical testament to the genius of its creator and the mystical properties of wind, sound, and stone.'
 }
 ],
 images: [
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Colourful Glass Decoration at Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Windows of Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Courtyards of Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Fountain in Courtyard of Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Top of the Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Fresco Work in Hawa Mahal'
 },
 {
 src: '/images/forts/hawa-mahal/500px-East_facade_Hawa_Mahal_Jaipur_from_ground_level__July_2022__-_img_01.jpg',
 alt: 'Roof of Hawa Mahal'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'lake-palace-udaipur',
 name: 'Lake Palace',
 hindiName: 'लेक पैलेस',
 location: 'Udaipur, Rajasthan',
 coordinates: { lat: 24.5752, lng: 73.6803 },
 builtBy: 'Maharana Jagat Singh II',
 period: '1743-1746 CE',
 category: 'palace',
 icon: '',
 status: 'Luxury Heritage Hotel & Architectural Marvel',
 significance: [
 'Built entirely on a natural foundation in Lake Pichola',
 'Served as summer palace for Mewar rulers',
 'Featured in the James Bond film "Octopussy"',
 'Represents the pinnacle of Rajput palace architecture',
 'Symbol of royal romance and architectural innovation',
 'One of the most romantic palaces in the world'
 ],
 architecture: [
 'Built with white marble that appears to float on water',
 'Three-story structure with courtyards and gardens',
 'Intricate marble carvings and inlay work',
 'Traditional Rajput and Mughal architectural elements',
 'Jharokhas (balconies) overlooking the lake',
 'Lotus pond and marble fountains',
 'Strategic location on Jag Niwas island'
 ],
 description: 'Lake Palace, built by Maharana Jagat Singh II between 1743-1746 CE, is the ethereal "floating palace" of Udaipur that appears to rise directly from the waters of Lake Pichola. This marble masterpiece served as the summer palace of the Mewar rulers and has become one of the most romantic and photographed palaces in the world.',
 detailedHistory: 'Maharana Jagat Singh II, the 62nd successor to the throne of Mewar, commissioned the construction of Lake Palace in 1743 on the island of Jag Niwas in Lake Pichola. The palace was built as a royal summer retreat, taking advantage of the lake\'s cooling effect during the hot Rajasthan summers. The construction took three years to complete and required innovative engineering techniques to build on the natural rock foundation in the middle of the lake. The palace became the favorite residence of subsequent Mewar rulers, who used it for important state functions, romantic getaways, and as a refuge during times of political turmoil. After India\'s independence, the palace was converted into a luxury heritage hotel, becoming one of the most exclusive and romantic destinations in the world.',
 culturalSignificance: 'Lake Palace represents the romantic spirit and architectural genius of the Mewar dynasty. The palace embodies the Rajput concept of creating paradise on earth, with its ethereal beauty and perfect integration with the natural environment. Its appearance in international films and its reputation as one of the world\'s most romantic hotels have made it a global symbol of royal luxury and Indian heritage. The palace continues to inspire artists, architects, and romantics worldwide, serving as a testament to the enduring legacy of Rajput architectural and cultural traditions.',
 interestingFacts: [
 'The palace appears to change color throughout the day as the sun moves',
 'It was built on a natural rock foundation that rises 4 meters above the lake',
 'The palace covers an area of 16,000 square feet',
 'It took 3 years and thousands of workers to complete',
 'The palace was featured in the 1983 James Bond film "Octopussy"',
 'It is now operated as the Taj Lake Palace luxury hotel'
 ],
 fortStories: [
 {
 title: 'The Forbidden Love of Princess Krishna Kumari',
 category: 'Romantic Legend',
 content: 'One of the most poignant legends associated with Lake Palace tells of the tragic love affair of Princess Krishna Kumari, the daughter of Maharana Jagat Singh II, who built the palace. According to the story, Princess Krishna Kumari was renowned throughout Mewar for her extraordinary beauty, intelligence, and grace. She had skin like polished marble, eyes that sparkled like the waters of Lake Pichola, and a voice that could make even the most stoic warrior weep with its beauty. However, what made the princess truly special was her independent spirit and her deep love for poetry, music, and the natural beauty of her homeland. During the construction of Lake Palace, the young princess would often visit the site, fascinated by the transformation of the barren island into what would become one of the world\'s most beautiful palaces. It was during one of these visits that she met Arjun Singh, a young and handsome architect who was working under the chief builder. Arjun was not only skilled in the technical aspects of architecture but was also a talented poet and musician who shared the princess\'s love for the arts. Despite the strict social boundaries that separated royalty from commoners, the two young people began to develop deep feelings for each other. They would exchange glances across the construction site, and Arjun would leave small poems and flowers where Krishna Kumari would find them during her visits. Their secret romance blossomed in the shadow of the rising palace, with the young architect incorporating subtle tributes to his beloved into the palace\'s design - a particular carving that resembled her profile, a window positioned to catch the light at the same angle as her smile, a courtyard that echoed the sound of her laughter. However, their happiness was doomed from the start. When Maharana Jagat Singh II learned of his daughter\'s involvement with a common architect, he was furious. The Maharana had already arranged for Krishna Kumari to marry into a powerful royal family to strengthen political alliances. The young lovers were forbidden from seeing each other, and Arjun was dismissed from the construction project. In desperation, Krishna Kumari begged her father to reconsider, but the Maharana remained unmoved by her tears. The night before she was to be sent away to her future husband\'s kingdom, the princess managed to sneak away from the palace and made her way to the nearly completed Lake Palace. There, in the marble chambers that her beloved had helped create, Princess Krishna Kumari composed a final poem expressing her eternal love and her inability to live without Arjun. According to the legend, as dawn broke over Lake Pichola, the princess walked to the edge of the palace and threw herself into the lake\'s waters, choosing death over a life without her true love. The story claims that her body was never found, but that on certain moonlit nights, particularly during the monsoon season, you can see her ghostly figure standing at the palace windows, still waiting for her beloved to return. Local people believe that the tragic love story of Princess Krishna Kumari is the reason why Lake Palace has such an ethereal, melancholic beauty, and why couples who visit the palace often report feeling a deep, inexplicable emotional connection to the place.'
 },
 {
 title: 'The Curse of the Fisherman\'s Daughter',
 category: 'Supernatural Legend',
 content: 'The construction of Lake Palace on Jag Niwas island was not without its share of supernatural complications, as evidenced by one of the most enduring legends surrounding the palace. According to the story, before the palace was built, Jag Niwas island was home to a small fishing village where several families had lived for generations. The island was considered sacred by the local people, who believed it was blessed by the lake goddess and served as a sanctuary for various water spirits and supernatural beings. Among the island\'s residents was a beautiful young woman named Ganga, the daughter of the village\'s head fisherman. Ganga was known for her extraordinary connection to the lake - she could predict weather changes by listening to the water\'s sounds, and fish seemed to willingly swim into her nets. She was also said to possess healing powers, using lake water and island herbs to cure various ailments. When Maharana Jagat Singh II decided to build his summer palace on the island, the local fishing community was ordered to relocate to the mainland. Most families accepted the royal decree and compensation, but Ganga\'s father refused to leave, claiming that his family had lived on the island for seven generations and that their ancestors\' spirits resided there. The old fisherman warned that disturbing the sacred balance of the island would bring misfortune to the royal family. When construction workers began to arrive and materials were unloaded on the island, strange incidents began to occur. Tools would disappear or break mysteriously, workers would fall ill with unexplained fevers, and construction materials would be found scattered or damaged overnight. The Maharana\'s advisors suggested that these were merely coincidences or the result of poor planning, but the local people knew better. Ganga, who had been forced to watch the destruction of her ancestral home, was said to have cursed the royal project. According to the legend, she stood at the water\'s edge on the final night before her family was forcibly removed and called upon the lake goddess and all the water spirits to witness her vow. She declared that the palace, built on the tears and broken hearts of the island\'s original inhabitants, would never know true peace or lasting happiness. She prophesied that the palace would bring romantic tragedy to the royal family, that lovers who stayed there would face separation or death, and that the structure would always carry an underlying sadness despite its physical beauty. The curse was said to have taken effect almost immediately. During the construction process, the Maharana\'s favorite queen fell seriously ill and died, several workers lost their lives in accidents, and the chief architect\'s wife died in childbirth. Even after the palace was completed, the pattern of tragedy continued. The Maharana\'s daughter, Princess Krishna Kumari, died under mysterious circumstances (as detailed in another legend), and subsequent royal couples who used the palace as a romantic retreat often experienced misfortune in their relationships. Local people believe that Ganga\'s curse continues to affect the palace to this day. They claim that on certain nights, particularly during the new moon, you can hear Ganga\'s voice carried on the wind, still singing her mournful songs about the lost island paradise. Some fishermen refuse to sail near the palace after dark, claiming they can see ghostly lights beneath the water and hear the sound of women crying. The legend serves as a reminder that even the most beautiful creations can carry the weight of those who were displaced or harmed in their making.'
 },
 {
 title: 'The Phantom Boat Procession',
 category: 'Ghost Story',
 content: 'One of the most frequently reported supernatural phenomena associated with Lake Palace is the mysterious phantom boat procession that appears on certain nights, particularly during the full moon and the anniversary of important royal events. According to the legend, during the height of Mewar\'s power, the Maharanas would hold elaborate boat processions on Lake Pichola, with the royal barge leading a flotilla of decorated boats carrying nobles, musicians, dancers, and servants. These processions would often end at Lake Palace, where elaborate feasts and entertainment would continue until dawn. The most magnificent of these processions was said to be the annual celebration of the Maharana\'s birthday, when hundreds of boats would be decorated with thousands of oil lamps, creating a spectacular display of light that would reflect off the lake\'s surface like a mirror of stars. However, the story takes a tragic turn with the tale of one particular birthday celebration during the reign of Maharana Swaroop Singh. According to the legend, the Maharana had ordered an especially elaborate procession to celebrate his 50th birthday, with invitations sent to all the major royal families of Rajasthan. The preparations took months, with hundreds of boats being specially constructed or refurbished, thousands of oil lamps being prepared, and the finest musicians and dancers being summoned from across the kingdom. On the night of the celebration, the weather was perfect - clear skies, gentle breeze, and a full moon that bathed the lake in silver light. The procession began at sunset, with the royal barge leading the way from the City Palace ghats toward Lake Palace. However, as the flotilla reached the middle of the lake, a sudden and violent storm arose without warning. The wind howled with supernatural force, whipping the lake\'s surface into dangerous waves that capsized many of the smaller boats. The oil lamps were extinguished, plunging the scene into darkness, and the sound of screaming people and splintering wood filled the air. When the storm passed as suddenly as it had arrived, dozens of boats had been destroyed, and many people had lost their lives in the dark waters. The Maharana himself survived, but the tragedy cast a permanent shadow over what should have been a joyous celebration. Since that fateful night, local people report seeing the phantom boat procession on certain nights, particularly during full moons and the anniversary of the tragedy. The ghostly flotilla appears as a procession of boats with flickering lights, moving silently across the lake toward Lake Palace. Witnesses describe seeing the ghostly figures of people in royal attire standing on the boats, but their faces are always indistinct and their forms seem to shimmer like heat mirages. The phantom procession never makes a sound - no splashing of oars, no voices, no music - just the eerie sight of boats moving across the water with their ghostly passengers. Some people claim that if you watch the phantom procession for too long, you begin to hear faint sounds - the music of long-dead musicians, the laughter of courtiers who perished centuries ago, and sometimes, the sound of people calling for help in a language that hasn\'t been spoken for generations. The legend warns that those who see the phantom boat procession should never try to follow it or attract its attention, as doing so might result in being pulled into the lake by supernatural forces.'
 },
 {
 title: 'The Marble that Breathes',
 category: 'Architectural Legend',
 content: 'Among the many legends surrounding Lake Palace, one of the most intriguing speaks of the extraordinary properties of the marble used in its construction. According to the story, when Maharana Jagat Singh II decided to build his summer palace on Jag Niwas island, he wanted to create something that would not just be beautiful but would also possess mystical properties that would benefit the royal family and the kingdom. The Maharana consulted with his court scholars, priests, and architects, seeking their advice on how to infuse the palace with divine energy and protective powers. One of his advisors, an elderly sage who had spent years studying ancient texts and mystical traditions, suggested that the palace should be built using "breathing marble" - a special type of white marble that was said to possess living properties. According to the sage, this marble was not just a building material but a living entity that could absorb and store cosmic energy, purify the air, and even heal those who lived within its embrace. The sage claimed that this special marble could only be found in a remote quarry in the Aravalli hills, where it had been forming for millions of years under the influence of celestial energies. The quarry was said to be protected by powerful spirits, and the marble could only be extracted during specific lunar phases and with proper rituals and prayers. Intrigued by this possibility, the Maharana dispatched a team of his most trusted workers and priests to locate and extract this special marble. The expedition faced numerous challenges - treacherous mountain paths, wild animals, and mysterious obstacles that seemed almost supernatural in nature. However, guided by the sage\'s instructions and protected by their faith, they eventually located the hidden quarry and began extracting the marble according to the prescribed rituals. The sage had warned that the marble must be treated with the utmost respect, as it was considered a living entity. Workers were required to maintain ritual purity, offer daily prayers, and treat the marble blocks as if they were sacred relics. Any mistreatment or disrespect could result in the marble losing its special properties or even causing harm to those who worked with it. When the marble arrived at Jag Niwas island, the sage personally supervised its placement and carving, ensuring that each block was positioned according to cosmic principles and aligned with beneficial energy flows. The construction process took longer than anticipated because of the special care required, but the Maharana was patient, understanding that they were creating something extraordinary. According to the legend, as the palace began to take shape, visitors and workers began to notice unusual phenomena. The marble seemed to have a subtle glow, particularly during full moons, and people reported feeling a sense of peace and well-being when they touched the palace walls. Some claimed that minor illnesses would mysteriously disappear after spending time in the palace, and that the air inside the building felt fresher and more energizing than normal air. The sage explained that these effects were due to the marble\'s ability to absorb negative energy and convert it into positive, healing vibrations. He claimed that the palace had become a giant energy converter, drawing in cosmic forces through its marble structure and transforming them into beneficial energies that would protect and nurture the royal family and their guests. Local people believe that this mystical property of the marble continues to function to this day. They claim that the palace\'s marble walls seem to breathe - expanding slightly during the day and contracting at night, as if the entire structure were a living organism. Some people report that if you place your hand on the marble and remain very still, you can feel a subtle pulse or vibration, like a very slow heartbeat. The legend has made Lake Palace a destination for those seeking healing, spiritual renewal, or simply the experience of being in a building that is said to be literally alive with cosmic energy.'
 }
 ],
 images: [
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Lake Palace in Udaipur'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Gangaur Ghat near Lake Palace'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Jagnivas Palace in Lake Pichola'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Royal Jal Mahal in Udaipur'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Taj Lake Palace in Udaipur'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Lily Pond at the Lake Palace'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Courtyard in the Lake Palace'
 },
 {
 src: '/images/forts/lake-palace-udaipur/500px-Udaipur_Lake_Palace.jpg',
 alt: 'Lounge at Lake Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-udaipur',
 name: 'City Palace',
 hindiName: 'सिटी पैलेस',
 location: 'Udaipur, Rajasthan',
 coordinates: { lat: 24.5765, lng: 73.6832 },
 builtBy: 'Maharana Udai Singh II',
 period: '1559 CE onwards',
 category: 'palace',
 icon: '',
 status: 'Royal Residence & Museum Complex',
 significance: [
 'Largest palace complex in Rajasthan',
 'Continuously built by 22 generations of Mewar rulers',
 'Perfect blend of Rajasthani and Mughal architecture',
 'Houses the Crystal Gallery with royal artifacts',
 'Symbol of Mewar dynasty\'s resilience and grandeur',
 'Offers panoramic views of Lake Pichola and Udaipur'
 ],
 architecture: [
 'Multiple palaces built over 400 years',
 'Intricate mirror work and glass mosaics',
 'Ornate balconies and towers',
 'Traditional Rajasthani architecture with Mughal influences',
 'Marble and granite construction',
 'Beautiful courtyards and gardens',
 'Elevated position on the banks of Lake Pichola'
 ],
 description: 'City Palace, initiated by Maharana Udai Singh II in 1559 CE, is the magnificent palace complex that has served as the seat of the Mewar dynasty for over four centuries. This architectural marvel represents the largest palace complex in Rajasthan and showcases the evolution of Rajput architecture over 400 years of continuous construction.',
 detailedHistory: 'Maharana Udai Singh II, the founder of Udaipur, began construction of the City Palace in 1559 after moving his capital from Chittorgarh to the more secure location of Udaipur. The palace was built on a ridge overlooking Lake Pichola, providing both defensive advantages and stunning views. Over the next four centuries, 22 successive Maharanas of Mewar added their own palaces, courtyards, and towers to the complex, creating a unique architectural timeline that reflects the changing styles and needs of each era. The palace complex served as the administrative center of the Mewar kingdom and witnessed numerous historical events, including battles, royal ceremonies, and the eventual transition to democracy after India\'s independence.',
 culturalSignificance: 'City Palace stands as a living testament to the resilience and cultural sophistication of the Mewar dynasty, one of the oldest royal families in the world. The palace complex embodies the Rajput ideals of honor, courage, and artistic excellence, while also demonstrating the dynasty\'s ability to adapt and evolve over centuries. Its blend of Rajasthani and Mughal architectural styles reflects the complex political and cultural relationships of medieval India. Today, the palace serves as both a museum showcasing royal artifacts and a symbol of Udaipur\'s rich heritage, attracting visitors from around the world who come to experience the grandeur of Rajput royal life.',
 interestingFacts: [
 'The palace complex includes 11 separate palaces',
 'It took over 400 years to reach its current form',
 'The palace has been continuously occupied by the royal family for over 450 years',
 'The Crystal Gallery houses the world\'s largest collection of crystal objects',
 'Parts of the palace are still occupied by the current Maharana',
 'The palace offers spectacular views of Lake Palace and Jag Mandir'
 ],
 fortStories: [
 {
 title: 'The Prophecy of the Hermit Sage',
 category: 'Founding Legend',
 content: 'The founding of Udaipur and the construction of City Palace is surrounded by one of the most significant prophetic legends in Rajput history. According to the story, Maharana Udai Singh II was hunting in the Aravalli hills when he encountered a hermit sage meditating near a stream. The sage, who was later identified as Goswami Prem Giri Ji, a revered ascetic with supernatural powers, had chosen this spot for his meditation because of its spiritual significance. When the Maharana\'s hunting party disturbed the sage\'s meditation, the ruler was immediately filled with remorse and approached the holy man to seek his forgiveness. Instead of being angry, the sage welcomed the Maharana and blessed him, but then delivered a prophecy that would change the course of Mewar history. The sage told Udai Singh that his current capital at Chittorgarh, while historically significant, was no longer astrologically favorable for the continuation of his dynasty. He prophesied that a great calamity would befall Chittorgarh and that the Maharana should establish a new capital at the very spot where they were standing. The sage explained that this location, with its natural lake and protective hills, was divinely ordained to be the new seat of the Mewar dynasty. He described how the geography of the area formed a natural fortress and how the lake would provide both practical benefits and spiritual protection. The sage also predicted that if the Maharana built his palace here, his dynasty would prosper for many generations and that the palace would become one of the most magnificent in all of India. However, the sage also issued a warning: the palace must be built with respect for the natural environment and the local deities, or else the divine protection would be withdrawn. He specifically mentioned that the palace should be oriented to face the rising sun and that certain trees and rock formations should be preserved as they were sacred to the local spirits. Maharana Udai Singh, who was known for his wisdom and spiritual inclinations, took the sage\'s prophecy very seriously. He immediately began planning the new capital, following the sage\'s instructions about orientation and design. The foundation stone of City Palace was laid in 1559, with elaborate ceremonies conducted to appease the local deities and seek their blessings. The legend claims that as construction began, miraculous events occurred that confirmed the sage\'s prophecy. A previously unknown spring of fresh water was discovered exactly where the sage had meditated, providing abundant water for the construction and future inhabitants. Local tribes who had initially been hostile to the project suddenly became cooperative and provided valuable assistance. Most remarkably, the sage himself was said to have reappeared during the foundation ceremony, performing rituals that blessed the palace with divine protection and prosperity. Local people believe that the sage\'s prophecy and blessings continue to protect City Palace and the city of Udaipur. They claim that despite numerous attempts by enemies to conquer or destroy the palace over the centuries, it has always survived, just as the sage predicted. Some believe that the hermit\'s spirit still watches over the palace, appearing to those in need of guidance or protection, particularly during times of crisis or transition for the royal family.'
 },
 {
 title: 'The Secret Treasury of the Mewar Kings',
 category: 'Historical Legend',
 content: 'One of the most intriguing legends associated with City Palace speaks of a secret underground treasury that is said to contain the accumulated wealth of 22 generations of Mewar rulers. According to the story, when Maharana Udai Singh II began construction of the palace, he was aware that the Mewar dynasty had already survived for centuries and would need to continue for many more generations to come. He consulted with his most trusted advisors and priests to create a system that would ensure the dynasty\'s financial security regardless of political circumstances or external threats. The solution they devised was to create a secret underground treasury that would be expanded by each successive Maharana throughout the centuries. The legend claims that this treasury is not just a simple vault but a complex underground complex with multiple chambers, each containing different types of treasures - gold and silver coins, precious gems, royal jewelry, ancient manuscripts, and artifacts of historical significance. The entrance to this treasury is said to be hidden within one of the palace\'s many courtyards, but its exact location is known only to the reigning Maharana and his most trusted advisor. The key to the treasury is not a physical object but a combination of specific rituals, passwords, and knowledge that is passed down from one Maharana to the next at the time of succession. The story goes that each Maharana, throughout the centuries, has added to the treasury during times of prosperity, creating a collection of wealth that is beyond imagination. The treasury is said to contain not just the riches accumulated through normal royal revenues but also spoils of war, gifts from other royal families, and treasures discovered through various conquests and diplomatic missions. What makes this legend particularly fascinating is the claim that the treasury includes items of historical and cultural significance that predate even the Mewar dynasty - ancient coins from the Maurya and Gupta periods, Buddhist and Jain artifacts, and even items that are said to have belonged to Lord Rama and other figures from Hindu mythology. The legend also speaks of a curse that protects the treasury from those who would seek to steal from it. According to the story, anyone who attempts to find or rob the treasury without the proper authorization will be struck by a series of misfortunes that will ultimately lead to their death. The curse is said to be particularly effective against those who are motivated by greed rather than historical or cultural interest. Over the centuries, there have been numerous attempts by treasure hunters and even foreign invaders to locate the secret treasury, but none have succeeded. Some claim to have found clues - hidden symbols in the palace\'s architecture, cryptic references in old documents, or mysterious maps - but the treasure itself has remained hidden. Local people believe that the treasury will only be revealed when the Mewar dynasty faces its greatest crisis and needs the accumulated wealth to protect its people and heritage. Until that time, it is said to remain hidden, watched over by the spirits of past Maharanas who continue to guard their dynasty\'s most precious secret.'
 },
 {
 title: 'The Immortal Guardians of the Palace',
 category: 'Supernatural Legend',
 content: 'City Palace is said to be protected by supernatural guardians who have watched over the complex for centuries, ensuring the safety of the royal family and the preservation of their sacred trust. According to the legend, when Maharana Udai Singh II first established his capital at Udaipur, he performed elaborate rituals to invoke divine protection for his new palace. However, the protection he received was far more extraordinary than simple divine blessing. The story claims that during the foundation ceremonies, the Maharana\'s priests and holy men conducted rituals that were so powerful they attracted the attention of supernatural beings who had been residing in the Aravalli hills for millennia. These beings, who are described as neither gods nor humans but something in between, offered their services as eternal guardians of the palace and the Mewar dynasty. The legend describes these guardians as having the ability to take various forms - sometimes appearing as fierce warriors in ancient armor, other times as ordinary people who blend seamlessly with palace staff and visitors. They are said to possess supernatural strength, the ability to become invisible at will, and knowledge of events that will occur in the future. Most remarkably, they are believed to be immortal, having existed for centuries before the palace was built and continuing to exist long after individual human lifetimes have ended. The guardians are organized into different groups, each with specific responsibilities. Some are tasked with protecting the physical structure of the palace from natural disasters, enemy attacks, or the ravages of time. Others are responsible for safeguarding the royal family, particularly during times of crisis or transition. A special group is said to protect the palace\'s spiritual essence, ensuring that the sacred rituals and traditions of the Mewar dynasty are preserved and continued. The legend claims that these guardians have intervened in numerous historical events to protect the palace and its inhabitants. During enemy attacks, they are said to have caused confusion among invaders, led them astray, or created supernatural obstacles that prevented the palace from being conquered. During natural disasters, they have been credited with strengthening walls, diverting flood waters, or warning inhabitants of impending danger. Local people report numerous encounters with these immortal guardians over the centuries. Palace staff speak of mysterious servants who appear during emergencies to help with evacuations or firefighting, only to disappear when the crisis has passed. Visitors sometimes describe meeting elderly palace guides who provide detailed historical information that cannot be found in any book, but when they try to find these guides later, no one remembers seeing them. Some claim to have seen figures walking on the palace walls at night, patrolling the perimeter with supernatural vigilance. The legend also speaks of a special connection between the guardians and certain members of the royal family. It is said that each Maharana has a personal guardian who serves as an invisible advisor and protector throughout their reign. These personal guardians are believed to communicate through dreams, intuition, or subtle signs that only the Maharana can interpret. The most remarkable aspect of this legend is the claim that the guardians will continue to protect City Palace and the Mewar dynasty until the end of time, or until their services are no longer needed. Some believe that as long as the palace stands and the traditions of the Mewar dynasty are honored, these immortal guardians will remain vigilant, ensuring that one of India\'s most magnificent royal legacies continues to thrive and inspire future generations.'
 },
 {
 title: 'The Curse of the Betrayed Queen',
 category: 'Romantic Tragedy',
 content: 'One of the most tragic and enduring legends associated with City Palace tells the story of Maharani Padmini Devi, a queen whose betrayal and subsequent curse left an indelible mark on the palace complex. According to the legend, Maharani Padmini was the most beautiful and accomplished woman of her generation, renowned not just for her physical beauty but also for her intelligence, artistic talents, and diplomatic skills. She was married to Maharana Karan Singh, a powerful and respected ruler who was known for his military prowess and administrative abilities. Their marriage was initially a love match, unusual in royal circles where marriages were typically arranged for political advantage. The couple seemed perfectly matched, sharing interests in poetry, music, and the arts, and their court became a center of cultural excellence that attracted scholars, artists, and musicians from across India. However, their happiness was not to last. As the Maharana\'s responsibilities grew, he began to spend less time with his queen and more time dealing with administrative matters and military campaigns. Padmini, who had been raised in a family where women were treated as equals and their opinions valued, found herself increasingly isolated and lonely within the vast palace complex. She attempted to maintain her spirits by organizing cultural events and supporting artistic endeavors, but the absence of her husband\'s love and attention began to affect her deeply. During this difficult period, she formed a close friendship with a young court musician named Devendra, who was known for his exceptional skill with the sitar and his ability to compose beautiful, melancholic melodies. Devendra, who was significantly younger than the queen, initially approached her with the respect due to royalty, but over time their relationship evolved into something deeper and more emotionally intimate. They never physically consummated their relationship, but their emotional connection and the time they spent together - discussing poetry, music, and philosophy - constituted a betrayal of the marriage vows in the eyes of the court and the gods. When news of their relationship reached the Maharana, he was consumed by rage and jealousy. According to the legend, he ordered both the queen and the musician to be brought before him in the palace\'s main courtyard, where he pronounced judgment on their betrayal. Devendra was sentenced to death by elephant trampling, a punishment reserved for the most serious crimes against royalty. Maharani Padmini was given a choice: she could either commit sati (ritual suicide by throwing herself on her husband\'s funeral pyre) or spend the rest of her life imprisoned in a small chamber within the palace, never to see the outside world again. The legend takes a supernatural turn at this point. According to the story, as Devendra was being led away to his execution, he managed to catch Padmini\'s eye one final time. In that moment of ultimate tragedy, their souls connected in a way that transcended physical existence, and they made a vow that their love would survive even death itself. Devendra was executed the following day, but witnesses reported that his final composition, played on his sitar just before his death, was so hauntingly beautiful that even the executioners were moved to tears. Maharani Padmini chose imprisonment over sati, but her confinement lasted only a few weeks. According to the legend, she died of a broken heart, but not before uttering a terrible curse against the palace and the royal family that had condemned her. She declared that no royal marriage conducted within the palace would ever know true happiness, that lovers who stayed within its walls would face separation or tragedy, and that the sound of sitar music would forever bring misfortune to the royal family. Since that time, there have been numerous reports of supernatural phenomena associated with the curse. Palace staff speak of hearing sitar music coming from empty chambers, particularly during full moons. Some claim to have seen the ghostly figure of a beautiful woman in royal attire walking through the palace corridors at night, her face marked by eternal sorrow. Most troubling are the reports of royal marriages that have been plagued by misfortune - illness, premature death, or marital discord that seems to affect couples who reside in the palace. The current royal family, while not publicly acknowledging the curse, is said to take precautions during weddings and romantic celebrations, including special prayers and rituals designed to appease the spirit of Maharani Padmini and lift the curse that has haunted City Palace for centuries.'
 }
 ],
 images: [
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'City Palace in Udaipur'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Verandah at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Badi Mahal at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Chini Chitrashala at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Rai Angan at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Zenana Mahal at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Vani Vilas at City Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Durbar Hall at City Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'najibabad-fort',
 name: 'Najibabad Fort',
 hindiName: 'नजीबाबाद किला',
 location: 'Najibabad, Uttar Pradesh',
 coordinates: { lat: 29.6333, lng: 78.3333 },
 builtBy: 'Najib-ud-Daulah',
 period: '1750-1770 CE',
 category: 'fort',
 icon: '',
 status: 'Historical Ruins',
 significance: [
 'Built by the powerful Rohilla chief Najib-ud-Daulah',
 'Strategic location on the Delhi-Haridwar trade route',
 'Important center of Rohilla power in 18th century',
 'Witness to the decline of Mughal Empire',
 'Site of significant battles during Rohilla Wars',
 'Represents the architectural style of Rohilla chieftains'
 ],
 architecture: [
 'Massive stone walls with bastions',
 'Strategic hilltop location',
 'Multiple gateways and watchtowers',
 'Underground chambers and tunnels',
 'Palace complex within the fort',
 'Mosque and other religious structures',
 'Sophisticated water management system'
 ],
 description: 'Najibabad Fort, built by the powerful Rohilla chief Najib-ud-Daulah between 1750-1770 CE, stands as a testament to the brief but significant period of Rohilla power in northern India. This strategic fortress served as the capital of the Rohilla kingdom and played a crucial role in the political dynamics of 18th century India.',
 detailedHistory: 'Najib-ud-Daulah, a prominent Rohilla chief who rose to power during the declining years of the Mughal Empire, established Najibabad as his capital and began construction of this formidable fort around 1750. The Rohillas, originally Afghan mercenaries who had settled in northern India, had become a significant military and political force in the region. Najib-ud-Daulah, who was appointed Mir Bakshi (Paymaster General) by the Mughal Emperor, used his position and military prowess to establish an independent kingdom with Najibabad as its center. The fort was designed not only as a defensive structure but also as a symbol of Rohilla power and independence. It served as the administrative center of the Rohilla kingdom and played host to various diplomatic missions and military campaigns. The fort witnessed several significant battles during the Rohilla Wars of 1774, when the British East India Company, allied with the Nawab of Awadh, sought to eliminate Rohilla power in the region. Despite putting up fierce resistance, the Rohillas were eventually defeated, and the fort fell into British hands.',
 culturalSignificance: 'Najibabad Fort represents an important chapter in the history of 18th century India, particularly the period of transition from Mughal rule to British colonial dominance. The fort embodies the architectural and cultural achievements of the Rohilla Afghans who established themselves as a significant power in northern India. Its strategic location on important trade routes made it a center of commerce and cultural exchange, while its military significance reflects the turbulent political climate of the era. The fort\'s decline and eventual abandonment mirror the broader historical forces that reshaped northern India during this period, making it a valuable archaeological site for understanding the complex dynamics of power, culture, and military strategy in late medieval India.',
 interestingFacts: [
 'The fort was built using forced labor from local villages',
 'It contained one of the largest armories in northern India during its time',
 'The fort had a sophisticated communication system using signal towers',
 'Najib-ud-Daulah\'s palace within the fort had over 100 rooms',
 'The fort\'s water supply system could sustain a siege for over a year',
 'Several underground tunnels connected the fort to nearby villages'
 ],
 fortStories: [
 {
 title: 'The Prophecy of the Afghan Mystic',
 category: 'Founding Legend',
 content: 'The construction of Najibabad Fort is surrounded by one of the most intriguing prophetic legends of 18th century India. According to the story, when Najib-ud-Daulah decided to establish his capital at Najibabad, he consulted a renowned Afghan mystic named Pir Abdul Qadir, who was famous throughout northern India for his supernatural abilities and prophetic visions. The Pir, who had traveled from Kabul and was known to have accurately predicted the rise and fall of several regional powers, was invited to Najibabad to bless the new settlement and provide guidance about the fort\'s construction. When the Pir arrived, he spent several days in meditation, fasting and praying to receive divine guidance about the site\'s suitability and future prospects. After his spiritual retreat, he delivered a prophecy that would haunt the Rohilla chief for the rest of his life. The Pir declared that the location chosen by Najib-ud-Daulah was indeed strategically sound and would serve as a powerful center of military and political influence. However, he also warned that the fort, while appearing impregnable, would eventually fall not through military defeat but through betrayal and internal division. The prophecy specifically stated that the fort would witness great prosperity and power for exactly 24 years, after which it would face a series of challenges that would ultimately lead to its abandonment. The Pir explained that the very features that made the location strategically advantageous - its hilltop position, natural defenses, and commanding view of the surrounding countryside - would also create a false sense of security that would prevent the rulers from recognizing the true threats to their power. He predicted that the fort would become a symbol of Rohilla pride and independence, but that this same pride would lead to conflicts with neighboring powers that would eventually overwhelm the Rohilla kingdom. The Pir also delivered a more specific warning: he advised Najib-ud-Daulah to build not just physical fortifications but also strong relationships with neighboring rulers and to avoid becoming too dependent on any single ally, particularly the British or the Marathas. He specifically mentioned that the fort\'s greatest vulnerability would be its water supply system, which while sophisticated, could be compromised by those who understood its design. Despite these warnings, the Pir blessed the construction and provided specific instructions about auspicious dates for beginning different phases of construction, the orientation of important buildings, and the placement of protective symbols throughout the fort. The legend claims that Najib-ud-Daulah, while initially troubled by the prophecy, decided to proceed with his plans, believing that his military prowess and political acumen would allow him to avoid the predicted fate. The fort was completed around 1770, and for exactly 24 years, as the Pir had predicted, it served as a prosperous center of Rohilla power. However, beginning in 1794, the fort began to face the challenges that the mystic had foretold - internal divisions within the Rohilla leadership, betrayal by former allies, and the gradual erosion of Rohilla independence that would eventually lead to the fort\'s abandonment and decay.'
 },
 {
 title: 'The Betrayal of the Trusted General',
 category: 'Historical Legend',
 content: 'One of the most significant events in the history of Najibabad Fort involves the betrayal of a trusted general whose actions ultimately led to the fort\'s downfall and the collapse of Rohilla power in the region. According to the legend, General Ahmad Khan was one of Najib-ud-Daulah\'s most trusted military commanders, having served the Rohilla chief faithfully for over two decades. Ahmad Khan had been instrumental in several military campaigns that had expanded Rohilla territory and influence, and he had been rewarded with considerable wealth, land grants, and the prestigious position of commander of the fort\'s garrison. However, beneath his loyal exterior, Ahmad Khan harbored growing resentment and ambition. The story claims that he had begun to believe that he was more capable than his master and that the Rohilla kingdom would be better served under his leadership. His opportunity for betrayal came during the Rohilla Wars of 1774, when the British East India Company, allied with the Nawab of Awadh, launched a major offensive against Rohilla territories. As the enemy forces approached Najibabad, General Ahmad Khan was entrusted with the defense of the fort while Najib-ud-Daulah led the main army to confront the invaders. According to the legend, Ahmad Khan had already established secret communications with the British commander, offering to surrender the fort in exchange for being appointed as the new ruler of the Rohilla territories under British protection. The betrayal was carefully orchestrated to occur when Najib-ud-Daulah was away from the fort, leading his forces against the main enemy army. On the night of the planned surrender, Ahmad Khan ordered his loyal troops to open the fort\'s main gates and allow the British forces to enter without resistance. However, the legend takes an interesting turn at this point. It is said that as the British troops entered the fort, they were met not by the expected easy conquest but by fierce resistance from the fort\'s regular garrison, who had discovered the general\'s treachery. A bloody battle ensued within the fort\'s walls, with Rohilla soldiers fighting desperately to defend their positions despite being betrayed by their own commander. The fighting was particularly intense around the palace complex, where the general\'s own troops clashed with the loyal garrison. Ahmad Khan himself was reportedly killed during the fighting, though there are conflicting accounts of his death. Some versions of the legend claim he was killed by his own men when they discovered his betrayal, while others suggest he died fighting alongside the British, struck down by a Rohilla arrow. The most dramatic version claims that he was killed by a supernatural force - that the spirit of Najib-ud-Daulah\'s ancestors appeared and struck him down for his treachery. The betrayal had far-reaching consequences beyond the immediate military defeat. The loss of Najibabad Fort, the symbolic heart of Rohilla power, demoralized the Rohilla forces and led to the rapid collapse of their resistance throughout the region. The legend serves as a cautionary tale about the dangers of ambition and disloyalty, and it is said that the ghost of General Ahmad Khan still haunts the fort, condemned to wander its corridors as punishment for his betrayal.'
 },
 {
 title: 'The Hidden Treasure of the Rohilla Chiefs',
 category: 'Treasure Legend',
 content: 'Najibabad Fort is said to contain one of the most valuable hidden treasures in northern India, accumulated by the Rohilla chiefs during their brief but prosperous rule over the region. According to the legend, when Najib-ud-Daulah established his capital at Najibabad, he began amassing a considerable fortune through various means - military conquests, trade revenues, tributes from subordinate rulers, and gifts from diplomatic allies. However, unlike many rulers who displayed their wealth openly, Najib-ud-Daulah was known for his secretive nature and his distrust of even his closest advisors. The legend claims that he created a secret underground chamber within the fort to store his most precious treasures, including not just gold and silver coins but also precious gems, ancient manuscripts, royal jewelry, and artifacts of historical significance. The entrance to this treasure chamber was said to be hidden within the palace complex, but its exact location was known only to the ruling chief and his most trusted treasurer. The key to the treasure was not a physical object but a combination of specific architectural features within the palace - certain tiles that needed to be pressed in a particular sequence, columns that had to be rotated to specific positions, and passages that could only be navigated with detailed knowledge of the fort\'s layout. The story goes that each successive Rohilla chief added to this treasure during their reign, creating a collection of wealth that was beyond imagination. The treasure was said to include not just the riches accumulated through normal revenues but also spoils of war, including precious items taken from defeated enemies, tribute from neighboring kingdoms, and gifts from the Mughal Emperor and other powerful rulers. What makes this legend particularly fascinating is the claim that the treasure includes items of historical and cultural significance that predate even the Rohilla rule - ancient coins from the Kushan and Gupta periods, Buddhist and Hindu artifacts, and even items that are said to have belonged to historical figures from medieval Indian history. The legend also speaks of protective measures that were put in place to guard the treasure from those who would seek to steal it. According to the story, the treasure chamber was protected by elaborate mechanical traps, poisoned needles, and other deadly devices that would kill anyone who attempted to access it without proper authorization. Additionally, a curse was said to protect the treasure from those motivated by greed rather than historical or cultural interest. The curse was believed to be particularly effective against those who attempted to find the treasure through violence or coercion. Over the centuries, there have been numerous attempts by treasure hunters, both Indian and foreign, to locate the secret treasure of Najibabad Fort. Some have claimed to have found clues - hidden symbols in the palace\'s architecture, cryptic references in old documents, or mysterious maps - but the treasure itself has remained hidden. Local people believe that the treasure will only be revealed when the rightful heirs of the Rohilla chiefs return to reclaim their heritage, or when someone pure of heart and motivated by historical interest rather than greed discovers the secret of its location. Until that time, it is said to remain hidden within the fort\'s walls, watched over by the spirits of the Rohilla rulers who continue to guard their most precious legacy.'
 },
 {
 title: 'The Phantom Army of Rohilla Warriors',
 category: 'Supernatural Legend',
 content: 'Najibabad Fort is said to be haunted by the spirits of Rohilla warriors who died defending their stronghold, creating one of the most persistent supernatural legends associated with the site. According to local folklore, these phantom warriors continue to guard the fort long after their physical deaths, appearing to visitors and locals who venture near the ruins after dark. The legend claims that the spirits of the Rohilla warriors are particularly active during the anniversary of the fort\'s fall, when they are said to reenact their final battle against the British and their allies. Witnesses report hearing the sounds of battle - clashing swords, war cries, and the thunder of horses\' hooves - emanating from the fort ruins during these times. Some have even claimed to see spectral figures dressed in Rohilla military uniforms, armed with traditional weapons, patrolling the fort\'s walls and courtyards. The most commonly reported supernatural phenomenon involves the appearance of a ghostly army that can be seen marching through the fort\'s main gateway just before dawn. These spectral soldiers are described as being dressed in the distinctive Rohilla style, with turbans, long coats, and curved swords, marching in perfect military formation as if responding to some eternal call to arms. The legend suggests that these phantom warriors are not merely residual hauntings but active guardians who continue to protect the fort and its secrets. Local people believe that the spirits are particularly protective of certain areas within the fort, especially the underground chambers and the palace complex, where the most intense fighting occurred during the final battle. There are stories of treasure hunters and vandals who have attempted to desecrate the ruins, only to be driven away by supernatural forces - sudden cold winds, disembodied voices warning them to leave, or even physical manifestations of the phantom warriors. The most remarkable aspect of this legend is the claim that the phantom army is led by the spirit of Najib-ud-Daulah himself, who continues to command his troops in the afterlife. Some witnesses have reported seeing a regal figure on horseback, dressed in elaborate military attire, surveying the fort from its highest points. This spectral commander is said to be particularly active during times of political tension or conflict in the region, as if sensing that his domain might once again be threatened. The legend serves as a powerful reminder of the fort\'s military history and the bravery of the Rohilla warriors who died defending their independence. Local people treat the ruins with great respect, believing that disturbing the site or showing disrespect to its history might invoke the wrath of the phantom guardians who continue to watch over Najibabad Fort.'
 },
 {
 title: 'The Curse of the Deserted Village',
 category: 'Tragic Legend',
 content: 'One of the most haunting legends associated with Najibabad Fort tells the story of a prosperous village that was destroyed to provide labor for the fort\'s construction, and the curse that was placed upon the site by the village\'s spiritual leader. According to the legend, when Najib-ud-Daulah decided to build his fort at Najibabad, he chose a location that was already occupied by a thriving village called Rampur, which had existed for several generations. The village was known for its fertile fields, skilled craftsmen, and spiritual significance, as it was home to a revered Sufi saint\'s shrine that attracted pilgrims from throughout the region. When the Rohilla chief\'s representatives arrived to inform the villagers that they would need to abandon their homes to make way for the fort, they were met with resistance and pleas for mercy. The villagers argued that their families had lived on this land for generations, that their ancestors were buried in the village cemetery, and that the Sufi shrine made the location sacred ground that should not be desecrated. However, Najib-ud-Daulah, determined to build his capital at this strategically important location, refused to reconsider his decision. The legend claims that when the villagers continued to resist, the Rohilla chief resorted to increasingly harsh measures, including threats of violence and economic pressure, to force them to leave. The village\'s spiritual leader, an elderly Sufi master named Baba Fariduddin, who was the guardian of the shrine, attempted to negotiate with the Rohilla authorities. He offered to relocate the entire village to an alternative site if proper compensation and assistance were provided, but his offers were rejected. When it became clear that the villagers would be forcibly removed, Baba Fariduddin is said to have placed a powerful curse on the site and all those who would benefit from the village\'s destruction. The curse declared that no structure built on the village\'s land would ever know lasting peace or prosperity, that those who had ordered the village\'s destruction would face betrayal and downfall, and that the spirits of the displaced villagers would haunt the site forever. According to the legend, the curse was particularly directed at the fort itself, declaring that it would serve as a center of power for only a brief period before being abandoned and falling into ruin. The most tragic part of the story involves the fate of the villagers themselves. As they were being forcibly removed, many of the elderly villagers, including Baba Fariduddin, chose to die on their ancestral land rather than leave. The legend claims that the Sufi master performed a final ritual that bound the spirits of the villagers to the site, ensuring that they would remain as guardians and witnesses to the injustices they had suffered. Since that time, there have been numerous reports of supernatural phenomena associated with the fort ruins. Visitors speak of hearing the sounds of village life - children playing, women singing, craftsmen at work - emanating from the ruins, particularly during quiet evenings. Some claim to have seen ghostly figures dressed in traditional village clothing, going about their daily activities as if the village still existed. Most disturbing are the reports of a elderly man in Sufi robes who appears to those who show disrespect to the ruins, warning them of the consequences of disturbing sacred ground. The legend serves as a powerful reminder of the human cost of ambitious construction projects and the importance of respecting the spiritual and cultural significance of sites chosen for development. Local people believe that the curse continues to affect the site, explaining why the fort has never been successfully restored or repurposed, and why those who have attempted to develop the area have faced various misfortunes and setbacks.'
 }
 ],
 images: [
 {
 src: '/images/forts/najibabad-fort/1280px-Patthargarh_fort_outside_Najibabad__1814-15.jpg',
 alt: 'Najibabad Fort in Uttar Pradesh'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'rambagh-palace',
 name: 'Rambagh Palace',
 hindiName: 'रामबाग पैलेस',
 location: 'Jaipur, Rajasthan',
 coordinates: { lat: 26.9124, lng: 75.7873 },
 builtBy: 'Maharaja Sawai Man Singh II',
 period: '1835-1931 CE (converted to palace)',
 category: 'palace',
 icon: '',
 status: 'Luxury Heritage Hotel',
 significance: [
 'Former residence of the Maharaja of Jaipur',
 'Converted from a royal guesthouse to a palace',
 'Epitome of Rajput-Mughal architectural fusion',
 'Symbol of Jaipur\'s royal heritage and modernization',
 'Now operates as one of the world\'s finest luxury hotels',
 'Showcases the transition from royal residence to heritage tourism'
 ],
 architecture: [
 'Mughal-style gardens with Rajput elements',
 'Marble corridors and ornate courtyards',
 'Traditional Rajasthani architecture with modern amenities',
 'Peacock garden with hundreds of peacocks',
 'Grand ballrooms and state rooms',
 'Intricate mirror work and frescoes',
 'Blend of traditional craftsmanship and modern luxury'
 ],
 description: 'Rambagh Palace, originally built as a royal guesthouse in 1835 and later converted into a magnificent palace by Maharaja Sawai Man Singh II, represents the perfect blend of traditional Rajput architecture and modern luxury. This architectural marvel has served as the residence of Jaipur\'s royal family and now operates as one of the world\'s most luxurious heritage hotels.',
 detailedHistory: 'The story of Rambagh Palace began in 1835 when it was constructed as a simple royal guesthouse and hunting lodge for the Jaipur royal family. The original structure was relatively modest, designed to accommodate the royal family during their hunting expeditions in the surrounding forests, which were then teeming with wildlife. The building served this purpose for nearly a century until Maharaja Sawai Man Singh II decided to transform it into a magnificent palace that would reflect the grandeur and sophistication of modern Jaipur while honoring traditional Rajput architectural principles. The conversion, which took place between 1925 and 1931, was overseen by the Maharaja himself, who worked closely with master craftsmen, architects, and designers to create what would become one of the finest examples of Rajput-Mughal architecture in India. The palace became the official residence of the Maharaja and his queen, Gayatri Devi, who was renowned for her beauty, intelligence, and progressive views. After India\'s independence and the abolition of princely states, the palace remained in royal hands until 1957, when Maharaja Sawai Man Singh II made the unprecedented decision to convert it into a luxury hotel, recognizing the potential of heritage tourism long before it became a major industry.',
 culturalSignificance: 'Rambagh Palace stands as a symbol of the successful transition from royal privilege to modern entrepreneurship, demonstrating how India\'s royal families adapted to the changing political and economic landscape after independence. The palace embodies the cultural synthesis that characterizes modern Rajasthan, where traditional values and architectural heritage coexist with contemporary luxury and international hospitality standards. Its transformation from royal residence to luxury hotel has made it accessible to people from around the world, allowing them to experience the grandeur and sophistication of Rajput court life while contributing to the preservation of this important architectural and cultural heritage.',
 interestingFacts: [
 'The palace has hosted numerous celebrities and heads of state',
 'It took 6 years to convert the guesthouse into a palace',
 'The palace gardens are home to over 200 peacocks',
 'The original hunting lodge was built for just 6,000 rupees',
 'The palace has been featured in numerous films and documentaries',
 'The hotel has maintained many original royal traditions and ceremonies'
 ],
 fortStories: [
 {
 title: 'The Love Story of Maharaja and Maharani Gayatri Devi',
 category: 'Romantic Legend',
 content: 'One of the most enchanting legends associated with Rambagh Palace revolves around the legendary love story of Maharaja Sawai Man Singh II and Maharani Gayatri Devi, whose romance became one of the most celebrated love stories of 20th century India. According to the legend, the Maharaja first encountered Gayatri Devi, who was then Princess of Cooch Behar, at a royal wedding in London in the late 1930s. The meeting was said to be orchestrated by destiny itself, as both were from prominent royal families and had been educated in England, sharing similar progressive views and modern outlooks. The legend claims that the Maharaja was immediately captivated not just by Gayatri Devi\'s renowned beauty, which had earned her the title of one of the most beautiful women in the world, but also by her intelligence, wit, and independent spirit. Their courtship was conducted with the utmost discretion, as both were aware of the political and social implications of a union between two major royal families. The story takes a romantic turn when the Maharaja decided to convert Rambagh Palace into a suitable residence for his beloved, sparing no expense in creating what would become one of the most magnificent royal residences in India. The legend claims that every aspect of the palace\'s design and decoration was influenced by the Maharaja\'s desire to please his future queen. The famous peacock garden, which houses hundreds of these magnificent birds, was said to be created because Gayatri Devi had once mentioned her love for these colorful creatures during their courtship. The marble corridors were designed to reflect the moonlight in a particular way that would remind her of the beautiful nights they had spent together in European cities. The palace\'s ballrooms were constructed with perfect acoustics so that her favorite music could be played during their private moments together. According to the legend, their wedding in 1940 was one of the most spectacular events of its time, with royalty from across India and Europe attending the celebrations at Rambagh Palace. The palace became their private paradise, where they hosted intimate gatherings of intellectuals, artists, and political figures who shared their vision of a modern, progressive India. The most romantic aspect of the legend involves the secret chambers that the Maharaja had built within the palace, where he and Gayatri Devi would retreat from their public duties to enjoy private moments together. These chambers were said to be decorated with personal mementos from their courtship, including love letters, photographs, and gifts they had exchanged during their courtship. Even after India\'s independence and the challenges that came with the abolition of princely states, their love story continued to inspire those who visited Rambagh Palace, serving as a reminder that true love could transcend political changes and social expectations. Today, the palace staff claim that the spirit of this great love story continues to permeate the atmosphere, making Rambagh Palace not just a luxury hotel but a monument to one of India\'s most romantic royal unions.'
 },
 {
 title: 'The Peacock Garden Miracle',
 category: 'Natural Legend',
 content: 'The famous peacock garden of Rambagh Palace is surrounded by one of the most beautiful natural legends in Rajasthan, which speaks of how hundreds of peacocks came to make the palace gardens their permanent home. According to the legend, when Maharaja Sawai Man Singh II was planning the transformation of the hunting lodge into a palace, he consulted with various landscape architects and garden designers about creating a unique feature that would reflect the natural beauty of Rajasthan while honoring the traditional Rajput love for wildlife and nature. During these consultations, the Maharaja happened to meet an elderly sage who lived as a hermit in the Aravalli hills near Jaipur. This sage, who was known for his ability to communicate with animals and understand the secrets of nature, told the Maharaja that the success and prosperity of his new palace would be directly linked to his ability to create a sanctuary for the region\'s wildlife, particularly the peacocks that were native to the area. The sage explained that peacocks were not just beautiful creatures but held deep spiritual significance in Indian culture, representing beauty, pride, and the divine connection between heaven and earth. He prophesied that if the Maharaja created a garden that was specifically designed to attract and protect these magnificent birds, the palace would prosper and become a center of positive energy that would benefit not just the royal family but the entire region. Taking the sage\'s advice to heart, the Maharaja instructed his landscape architects to design the palace gardens with peacocks as the primary focus. They created water features that would provide the birds with drinking and bathing areas, planted trees and shrubs that would offer both food and shelter, and designed open spaces where the peacocks could display their magnificent plumage during their courtship rituals. The legend claims that as word spread about the creation of this peacock sanctuary, birds began arriving from throughout Rajasthan and neighboring regions. At first, there were only a few dozen peacocks, but within a year, the number had grown to over a hundred, and by the time the palace was completed, there were more than two hundred peacocks making the gardens their permanent home. The most remarkable aspect of the legend involves the behavior of these peacocks, which are said to have developed unique characteristics that distinguish them from other peafowl populations. Local people claim that the Rambagh Palace peacocks are more intelligent, more colorful, and more sociable than typical peacocks, suggesting that they have been somehow blessed by their residence in the sacred garden. The legend also speaks of how the peacocks have become protectors of the palace, with their distinctive calls serving as warnings of approaching danger and their presence ensuring that the palace maintains its positive spiritual energy. Palace staff and visitors report that the peacocks seem to have a special connection with the royal family, often gathering in large numbers during important events or when members of the former royal family visit the palace. Some believe that the peacocks serve as a living link between the palace\'s royal past and its present role as a heritage hotel, maintaining the spiritual essence that the sage had predicted would ensure the palace\'s prosperity. Today, the peacock garden remains one of the most photographed and admired features of Rambagh Palace, with visitors from around the world coming to witness the spectacular sight of hundreds of peacocks displaying their magnificent plumage against the backdrop of the palace\'s elegant architecture.'
 },
 {
 title: 'The Ghost of the Loyal Servant',
 category: 'Supernatural Legend',
 content: 'The palace is said to be haunted by the ghost of a loyal servant who served the royal family for over 50 years. He appears only during full moon nights, walking through the corridors with a lantern, still performing his duties in the afterlife. Staff members have reported seeing his apparition and hearing his footsteps in the early morning hours.'
 },
 {
 title: 'The Royal Wedding Miracle',
 category: 'Historical Event',
 content: 'During the grand wedding of Maharaja Sawai Man Singh II in 1940, a sudden storm threatened to ruin the outdoor celebrations. According to legend, the royal priest performed a special puja, and the storm miraculously passed over the palace, leaving the wedding venue untouched. This event is still celebrated as divine blessing.'
 }
 ],
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Rambagh Palace in Jaipur'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Hotel of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Corridor of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Courtyard of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Hall of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Hallway of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Outdoor Swimming Pool of Rambagh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Garden Area of Rambagh Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'umaid-bhawan-palace',
 name: 'Umaid Bhawan Palace',
 hindiName: 'उमैद भवन महल',
 category: 'palace',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Maharaja Umaid Singh',
 period: '1928-1943',
 status: 'Heritage Hotel & Museum',
 description: 'A magnificent golden-yellow sandstone palace built during the 20th century, serving as the residence of the Jodhpur royal family. This Art Deco masterpiece is one of the world\'s largest private residences.',
 historicalSignificance: 'Built as a famine relief project that provided employment to thousands during a severe drought. The palace represents the perfect blend of eastern and western architectural styles, showcasing the vision of Maharaja Umaid Singh.',
 architecturalFeatures: 'The palace features 347 rooms, spread over 26 acres of lush gardens. Built with golden-yellow sandstone, it showcases Art Deco style with Renaissance influences. The central dome rises 110 feet, and the palace includes private cinema halls, swimming pools, and royal banquet halls.',
 visitingHours: '9:00 AM - 5:00 PM (Museum Only)',
 entryFee: '₹50-100',
 icon: '',
 coordinates: { lat: 26.2799, lng: 73.0489 },
 fortStories: [
 {
 title: 'The Famine Relief Palace',
 category: 'Historical Event',
 content: 'During the severe drought of 1920s, Maharaja Umaid Singh commissioned this palace as a famine relief project. The construction provided employment to over 3,000 people for 15 years, saving the population from starvation. The palace became a symbol of royal benevolence and far-sighted governance.'
 },
 {
 title: 'The Curse of the Sacred Grove',
 category: 'Supernatural Legend',
 content: 'The palace was built on the site of a sacred grove dedicated to a local deity. According to legend, the royal priest warned that disturbing the sacred site would bring misfortune. To appease the deity, a special temple was built within the palace complex, and daily rituals are still performed there.'
 },
 {
 title: 'The Hidden Treasury',
 category: 'Treasure Legend',
 content: 'Local legends speak of a hidden treasury within the palace containing the accumulated wealth of centuries of Marwar rulers. The treasure is said to be protected by ancient curses and can only be found by those pure of heart. Many have searched, but none have succeeded in locating this legendary wealth.'
 },
 {
 title: 'The British Architect\'s Secret',
 category: 'Architectural Mystery',
 content: 'The British architect Henry Vaughan Lanchester, who designed the palace, is said to have incorporated secret passages and hidden chambers unknown to the royal family. These hidden spaces were supposedly used by British intelligence during the independence movement. Some of these passages are still being discovered today.'
 },
 {
 title: 'The Royal Flag Mystery',
 category: 'Ceremonial Legend',
 content: 'The palace flag is raised every morning and lowered at sunset, following royal tradition. Legend says that if the flag ever remains flying at night, it signifies the end of the royal lineage. In 1947, during independence, the flag accidentally remained up all night, leading to predictions of the monarchy\'s end.'
 }
 ],
 images: [
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Umaid Bhawan Palace in Jodhpur'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Gardens of Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Columns Alley of Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Indoor Swimming Pool of Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Mural inside Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Miniature Model of Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Museum Room of Umaid Bhawan Palace'
 },
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'Painting inside Umaid Bhawan Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'deeg-palace',
 name: 'Deeg Palace',
 hindiName: 'दीग महल',
 category: 'palace',
 location: 'Deeg, Bharatpur, Rajasthan',
 builtBy: 'Maharaja Suraj Mal',
 period: '1730-1756',
 status: 'UNESCO World Heritage Site',
 description: 'A magnificent water palace known for its innovative hydraulic engineering systems, beautiful gardens, and stunning architecture that served as the summer retreat of the Bharatpur rulers.',
 historicalSignificance: 'Built by Maharaja Suraj Mal, one of the greatest Jat rulers, the palace represents the zenith of Jat architecture and engineering. It served as the capital of Bharatpur state and witnessed many historical events during the decline of the Mughal Empire.',
 architecturalFeatures: 'The palace complex features 900 fountains, massive water tanks, and an ingenious hydraulic system that could create artificial rain and thunderstorms. Built with red sandstone, it includes the Gopal Bhawan, Kishan Bhawan, and the famous Suraj Bhawan with its 900 fountains.',
 visitingHours: '9:00 AM - 5:00 PM',
 entryFee: '₹40-200',
 icon: '',
 coordinates: { lat: 27.4692, lng: 77.0667 },
 fortStories: [
 {
 title: 'The Floating Palace',
 category: 'Engineering Marvel',
 content: 'The palace was designed to appear as if floating on water during the monsoon season. Maharaja Suraj Mal created an elaborate system of canals and water chambers that could flood the lower levels, making the palace seem like it was rising from a lake. This architectural marvel amazed visitors from across India.'
 },
 {
 title: 'The 900 Fountains of Suraj Bhawan',
 category: 'Architectural Legend',
 content: 'Suraj Bhawan contains 900 fountains that could create spectacular water displays. According to legend, each fountain represented a victory of Maharaja Suraj Mal. The hydraulic system was so advanced that it could simulate different types of rainfall, from gentle showers to thunderous downpours, entertaining royal guests.'
 },
 {
 title: 'The Hidden Water Tunnels',
 category: 'Secret Passage Legend',
 content: 'Beneath the palace lies a network of hidden water tunnels used for both irrigation and defense. Local stories tell of secret escape routes that allowed the royal family to flee during attacks. These tunnels connected to distant water bodies and could flood enemy positions during sieges.'
 },
 {
 title: 'The Monsoon Festival Miracle',
 category: 'Cultural Tradition',
 content: 'Every year during the monsoon, the palace hosts the Kajli Teej festival. Legend says that on this day, the palace\'s water systems activate automatically, creating artificial rain even during drought years. The synchronized fountain displays are said to represent the cosmic dance of Lord Krishna.'
 },
 {
 title: 'The Curse of the Flooded Garden',
 category: 'Supernatural Legend',
 content: 'The palace\'s famous gardens were once cursed by a court poet who was unjustly punished. He predicted that the gardens would flood every monsoon, destroying the carefully manicured landscapes. Strangely, certain sections of the garden do flood annually, despite modern drainage systems.'
 }
 ],
 images: [
 {
 src: '/images/forts/deeg-palace/1280px-Rup_sagar_deeg.jpg',
 alt: 'Deeg Palace in Bharatpur'
 },
 {
 src: '/images/forts/deeg-palace/1280px-Rup_sagar_deeg.jpg',
 alt: 'Rani ka Jhula in Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/250px-Chaar_baag.jpg',
 alt: 'Chaar Baag in Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/1280px-Rup_sagar_deeg.jpg',
 alt: 'Canal with Fountains in Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/1280px-Rup_sagar_deeg.jpg',
 alt: 'Doorways at Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/250px-Gopal_Bhawan_or_Jal_Mahal.jpg',
 alt: 'Gopal Bhawan or Jal Mahal in Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/1280px-Rup_sagar_deeg.jpg',
 alt: 'Rup Sagar in Deeg Palace'
 },
 {
 src: '/images/forts/deeg-palace/250px-Gopal_bhavan.jpg',
 alt: 'Gopal Bhawan in Deeg Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'alwar-city-palace',
 name: 'Alwar City Palace',
 hindiName: 'अलवर सिटी पैलेस',
 category: 'palace',
 location: 'Alwar, Rajasthan',
 builtBy: 'Raja Bakhtawar Singh',
 period: '1793-1815',
 status: 'Museum & Heritage Site',
 description: 'A magnificent palace complex showcasing a unique blend of Rajput and Mughal architectural styles, serving as the seat of the Alwar royal family for centuries.',
 historicalSignificance: 'Built by Raja Bakhtawar Singh after defeating the Marathas, the palace represents the resurgence of Rajput power in the region. It served as the administrative center of Alwar state and played a crucial role in the political landscape of 19th century Rajasthan.',
 architecturalFeatures: 'The palace features exquisite marble work, beautiful courtyards, and intricate frescoes. The complex includes the Tripolia Gate, the Company Garden, and the famous Moti Doongri fort within its premises. The palace museum houses rare manuscripts and royal artifacts.',
 visitingHours: '10:00 AM - 4:30 PM (Except Fridays)',
 entryFee: '₹50-100',
 icon: '',
 coordinates: { lat: 27.5606, lng: 76.6256 },
 fortStories: [
 {
 title: 'The Victory Palace',
 category: 'Historical Event',
 content: 'Raja Bakhtawar Singh built this palace to commemorate his victory over the Marathas in 1793. The foundation stone was laid with the blood of enemy commanders mixed with mortar, symbolizing the triumph of Rajput valor. The palace\'s main gate still bears the marks of this historic victory.'
 },
 {
 title: 'The Hidden Treasury of Alwar',
 category: 'Treasure Legend',
 content: 'Legend speaks of a vast treasury hidden beneath the palace containing the wealth accumulated by 34 generations of Alwar rulers. The treasure is protected by multiple layers of secret chambers and deadly traps. Only the rightful heir with pure Rajput blood can allegedly access this ancestral wealth.'
 },
 {
 title: 'The Curse of the Poet-King',
 category: 'Literary Legend',
 content: 'Raja Bakhtawar Singh, a patron of arts, once punished a court poet for treason. The poet cursed that the palace would never know lasting peace. Historical records show that the palace witnessed numerous conflicts, including internal family feuds and external invasions, lending credence to this legend.'
 },
 {
 title: 'The British Resident\'s Secret',
 category: 'Colonial Era Legend',
 content: 'During British rule, the palace hosted several British residents. One resident supposedly discovered a secret chamber containing documents that could have changed the course of Indian history. He mysteriously disappeared while trying to smuggle these documents to Calcutta, and his ghost is said to haunt the palace corridors.'
 }
 ],
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Dungri Museum in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Vinay Vilas Mahal in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kamandalu in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Jain Tirthankar Samavarnath in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Carved Stone Block in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Fragment of a Temple in Alwar City Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Hathiyar Dant Par Kalam Karay in Alwar City Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'nahargarh',
 name: 'Nahargarh Fort',
 hindiName: 'नाहरगढ़ किला',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Maharaja Sawai Jai Singh II',
 period: '1734',
 category: 'fort',
 status: 'Standing',
 description: 'Standing on the edge of the Aravalli Hills, overlooking the city of Jaipur, Nahargarh Fort was originally named Sudarshangarh. It formed a strong defense ring for the city along with Amer and Jaigarh forts.',
 coordinates: { lat: 26.9373, lng: 75.8155 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Nahargarh Fort in Jaipur'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Walls of Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Stepwell of Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Cannons at Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Corridor of Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Interior chamber of Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Paintings in Nahargarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Garden in Nahargarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'lohagarh',
 name: 'Lohagarh Fort',
 hindiName: 'लोहागढ़ किला',
 location: 'Bharatpur, Rajasthan',
 builtBy: 'Maharaja Suraj Mal',
 period: '1733',
 category: 'fort',
 status: 'Standing',
 description: 'The "Iron Fort" of Bharatpur, known for its impregnability. It withstood numerous British attacks and is surrounded by a deep moat.',
 coordinates: { lat: 27.2206, lng: 77.4957 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Lohagarh Fort in Bharatpur'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Palace Museum in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Vijay Stambha in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kishori Mahal in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Surajmal Statue in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Water tower in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Zenana Palace in Lohagarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Pillared cenotaph in Lohagarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'mandawa',
 name: 'Mandawa Fort',
 hindiName: 'मंडावा किला',
 location: 'Mandawa, Shekhawati',
 builtBy: 'Thakur Nawal Singh',
 period: '1755',
 category: 'fort',
 status: 'Standing',
 description: 'A classic example of Shekhawati architecture, this fort features beautiful frescoes and mirror work. It has now been converted into a heritage hotel.',
 coordinates: { lat: 28.0556, lng: 75.1436 },
 images: [
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Mandawa Fort in Shekhawati'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Dining Hall in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Garrison Quarters in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Mandawa Haveli in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Rawala Gate in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Castle Mandawa Ruins in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Painting of Maharaja\'s Elephant in Mandawa Fort'
 },
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Hotel in Mandawa Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'neemrana',
 name: 'Neemrana Fort',
 hindiName: 'नीमराणा किला',
 location: 'Neemrana, Alwar',
 builtBy: 'Raja Prithviraj Chauhan III (Lineage)',
 period: '1464',
 category: 'fort',
 status: 'Standing',
 description: 'A magnificent 15th-century fort-palace located on the Delhi-Jaipur highway. It is a premier heritage hotel known for its hanging gardens and tiered architecture.',
 coordinates: { lat: 27.9942, lng: 76.3867 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Neemrana Fort in Alwar'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Entrance Door of Neemrana Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Neemrana Fort and the Palace Hotel'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Entrance of Neemrana Fort Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Pool in Neemrana Fort Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Resort in Neemrana Fort Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Amphitheatre at the Neemrana Fort complex'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Terrace of Neemrana Fort Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bala-quila',
 name: 'Alwar Fort (Bala Quila)',
 hindiName: 'बाला किला',
 location: 'Alwar, Rajasthan',
 builtBy: 'Hasan Khan Mewati',
 period: '15th Century',
 category: 'fort',
 status: 'Standing',
 description: 'Perched on a hill 1000 feet above Alwar city, Bala Quila extends over 5 kms. It has served Mughals, Marathas, and Jats throughout history.',
 coordinates: { lat: 27.5756, lng: 76.5911 },
 images: [
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Alwar Fort (Bala Quila)'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Ruins of Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Jai Pol Gate of Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Cannons at Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Open Courtyard of Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Meenakari at Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Sariska Tiger Sanctuary Area near Alwar Fort'
 },
 {
 src: '/images/forts/bala-quila/500px-Alwar_fort_or_Bala_Quila_09.jpg',
 alt: 'Arched Corridor in Alwar Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'sajjangarh',
 name: 'Sajjangarh (Monsoon Palace)',
 hindiName: 'सज्जनगढ़ पैलेस',
 location: 'Udaipur, Rajasthan',
 builtBy: 'Maharana Sajjan Singh',
 period: '1884',
 category: 'palace',
 type: 'Fort Palace',
 status: 'Standing',
 description: 'Built to watch the monsoon clouds, this hilltop palace offers panoramic views of Udaipur\'s lakes and palaces. It is also known as the Monsoon Palace.',
 coordinates: { lat: 24.5828, lng: 73.6395 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Monsoon Palace in Udaipur'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Maharana Sajjan Singh statue inside Monsoon Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Gate of Monsoon Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Lilies in the Monsoon Palace garden'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Hallway in Sajjangarh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Interior of Monsoon Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Entrance of Sajjangarh Palace'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Window at Sajjangarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'achalgarh',
 name: 'Achalgarh Fort',
 hindiName: 'अचलगढ़ किला',
 location: 'Mount Abu, Rajasthan',
 builtBy: 'Paramara Dynasty / Rana Kumbha',
 period: '1452',
 category: 'fort',
 status: 'Ruins',
 description: 'Originally built by the Paramara dynasty and later renovated by Rana Kumbha, this fort in Mount Abu is known for its Achaleshwar Mahadev Temple.',
 coordinates: { lat: 24.6136, lng: 72.7667 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Achalgarh Fort in Mount Abu'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Nandi Ji at Achalgarh Temple'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Jain Temple in Achalgarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ruins of Achalgarh Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'khejarla',
 name: 'Khejarla Fort',
 hindiName: 'खेजड़ला किला',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Rajput Chiefs',
 period: '1611',
 category: 'fort',
 status: 'Standing',
 description: 'An ancient red sandstone fort known for its rugged exterior and latticework friezes. It is now a heritage hotel.',
 coordinates: { lat: 26.3167, lng: 73.5500 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Khejarla Fort in Jodhpur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'pokhran',
 name: 'Pokhran Fort',
 hindiName: 'पोखरण किला',
 location: 'Pokhran, Jaisalmer',
 builtBy: 'Rao Maldeo',
 period: '14th Century',
 category: 'fort',
 status: 'Standing',
 description: 'Also known as Balagarh, this fort stands in the Thar Desert and has a mix of Mughal and Rajput architecture.',
 coordinates: { lat: 26.9200, lng: 71.9200 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Panoramic view of Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Cenotaphs at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Basin terrace at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Salamsagar at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Fort gateway at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Honor Courtyard at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Watchtower at Pokhran Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Red Fort in Pokhran'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'nagaur',
 name: 'Nagaur Fort',
 hindiName: 'नागौर किला',
 location: 'Nagaur, Rajasthan',
 builtBy: 'Nagavanshis / Ghaznavids',
 period: '12th Century',
 category: 'fort',
 status: 'Standing',
 description: 'Also known as Ahhichatragarh (Fort of the Hooded Cobra), it is famous for its water management systems and annual cattle fair.',
 coordinates: { lat: 27.2000, lng: 73.7400 },
 images: [
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Nagaur Fort in Rajasthan'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Entrance of Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Paintings in Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Diwan-i-Aam in Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Queen\'s Mahal in Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Intricate architecture in Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Intricate ceilings and wall art in Nagaur Fort'
 },
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Open courtyard in Nagaur Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'sariska-fort',
 name: 'Sariska Fort',
 hindiName: 'सरिस्का किला',
 location: 'Sariska, Alwar',
 builtBy: 'Local Rulers',
 period: 'Unknown',
 category: 'fort',
 status: 'Standing',
 description: 'Located within the Sariska Tiger Reserve, this fortification is often associated with the hunting lodges and strategic outposts of the Alwar royals.',
 coordinates: { lat: 27.3200, lng: 76.4300 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Sariska Fort in Alwar'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bayana',
 name: 'Bayana Fort',
 hindiName: 'बयाना किला',
 location: 'Bayana, Bharatpur',
 builtBy: 'Yaduvanshi Rajputs',
 period: 'Ancient',
 category: 'fort',
 status: 'Ruins',
 description: 'Once a formidable fort known as Vijaymandirgarh, it is one of the oldest forts in Rajasthan with a rich history of sieges.',
 coordinates: { lat: 26.9000, lng: 77.2800 },
 images: [
 {
 src: '/images/forts/bayana/bayana.jpg',
 alt: 'Bayana Fort in Bharatpur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'jalore',
 name: 'Jalore Fort',
 hindiName: 'जालौर किला',
 location: 'Jalore, Rajasthan',
 builtBy: 'Paramaras',
 period: '10th Century',
 category: 'fort',
 status: 'Standing',
 description: 'Known as Songir (Golden Mount), this fort is perched on a steep hill and was a stronghold of the Songara Chauhans.',
 coordinates: { lat: 25.3500, lng: 72.6300 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Jalore Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'siwana',
 name: 'Siwana Fort',
 hindiName: 'सिवाना किला',
 location: 'Barmer, Rajasthan',
 builtBy: 'Veer Narayan Pawar',
 period: '10th Century',
 category: 'fort',
 status: 'Ruins',
 description: 'Located on a hilltop in the Haldeshwar mountains, Siwana was a refuge for kings during foreign invasions.',
 coordinates: { lat: 25.6300, lng: 72.4200 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Siwana Fort in Rajasthan'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Lake of Siwana Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Entrance of Siwana Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Walls of Siwana Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'junagarh-jaisalmer',
 name: 'Juna Garh (Jaisalmer Old Fort)',
 hindiName: 'जूना गढ़ (जैसलमेर)',
 location: 'Lodurva, Jaisalmer',
 builtBy: 'Bhati Rajputs',
 period: 'Ancient',
 category: 'fort',
 status: 'Ruins',
 description: 'The ancient capital of the Bhati clan before the founding of Jaisalmer, representing the older layer of desert fortifications.',
 coordinates: { lat: 26.9800, lng: 70.8000 },
 images: [
 {
 src: '/images/forts/junagarh-jaisalmer/5f48159fbc4089ba19b8c3e7978ed642-mehrangarh.jpg',
 alt: 'Juna Garh Fort in Jaisalmer'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'kankwadi',
 name: 'Kankwadi Fort',
 hindiName: 'कांकवाड़ी किला',
 location: 'Sariska Tiger Reserve',
 builtBy: 'Jai Singh I',
 period: '17th Century',
 category: 'fort',
 status: 'Ruins',
 description: 'Deep inside Sariska, this fort served as a prison where Aurangzeb held his brother Dara Shikoh captive.',
 coordinates: { lat: 27.3000, lng: 76.4500 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kankwadi Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bhatner',
 name: 'Bhatner Fort',
 hindiName: 'भटनेर किला',
 location: 'Hanumangarh, Rajasthan',
 builtBy: 'Bhupat Bhati',
 period: '3rd Century',
 category: 'fort',
 status: 'Standing',
 description: 'One of the oldest forts in India, often called the "Sentinel of the North" due to its strategic location guarding the northwest frontier.',
 coordinates: { lat: 29.5800, lng: 74.3200 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Bhatner Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'timangarh',
 name: 'Timangarh Fort',
 hindiName: 'तिमनगढ़ किला',
 location: 'Karauli, Rajasthan',
 builtBy: 'Timanpal',
 period: '11th Century',
 category: 'fort',
 status: 'Ruins',
 description: 'A historic fort in the Karauli district, known for its collection of ancient sculptures and architectural remnants.',
 coordinates: { lat: 26.7000, lng: 77.0500 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Timangarh Fort in Rajasthan'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Fortifications around Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ruined Mandapa at Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Temple remains atop Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Entrance of Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Arched Gateway of Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ruins of grand edifices at Timangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Debris and ruins at Timangarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'phalodi',
 name: 'Phalodi Fort',
 hindiName: 'फलोदी किला',
 location: 'Phalodi, Jodhpur',
 builtBy: 'Rao Maldeo',
 period: '15th Century',
 category: 'fort',
 status: 'Standing',
 description: 'A historic fort in the "Salt City" of Phalodi, reflecting the architectural style of Marwar.',
 coordinates: { lat: 27.1300, lng: 72.3600 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Haveli in Phalodi, Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'mandalgarh',
 name: 'Mandalgarh Fort',
 hindiName: 'मांडलगढ़ किला',
 location: 'Bhilwara, Rajasthan',
 builtBy: 'Balnot Clan',
 period: 'Medieval',
 category: 'fort',
 status: 'Standing',
 description: 'Situated on a hill, this fort has witnessed many battles between the Mughals and the Ranas of Mewar.',
 coordinates: { lat: 25.2000, lng: 75.1000 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Mandalgarh Fort in Rajasthan'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Temple inside Mandalgarh Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'chandrawati',
 name: 'Chandrawati Fort',
 hindiName: 'चंद्रावती किला',
 location: 'Abu Road, Rajasthan',
 builtBy: 'Paramaras',
 period: 'Ancient',
 category: 'fort',
 status: 'Ruins',
 description: 'An ancient capital of the Paramaras, featuring temple ruins and remnants of fortifications near Mount Abu.',
 coordinates: { lat: 24.4500, lng: 72.7500 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Chandrawati Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'devgarh',
 name: 'Devgarh Fort',
 hindiName: 'देवगढ़ किला',
 location: 'Rajsamand, Rajasthan',
 builtBy: 'Rawat Chundawat',
 period: '1787',
 category: 'fort',
 status: 'Standing',
 description: 'Also known as Deogarh Mahal, it is a magnificent hilltop fort palace now run as a heritage hotel.',
 coordinates: { lat: 25.5300, lng: 73.9000 },
 images: [
 {
 src: '/images/forts/devgarh/devgarh.jpg',
 alt: 'Devgarh Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'ghanerao',
 name: 'Ghanerao Fort',
 hindiName: 'घाणेराव किला',
 location: 'Pali, Rajasthan',
 builtBy: 'Mertia Rathores',
 period: '1606',
 category: 'fort',
 status: 'Standing',
 description: 'A castle located on the border of Marwar and Mewar, reflecting a blend of both architectural styles.',
 coordinates: { lat: 25.2400, lng: 73.5400 },
 images: [
 {
 src: '/images/forts/ghanerao/ghanerao.jpg',
 alt: 'Ghanerao Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'khetri',
 name: 'Khetri Fort',
 hindiName: 'खेतड़ी किला',
 location: 'Jhunjhunu, Rajasthan',
 builtBy: 'Shekhawats',
 period: '18th Century',
 category: 'fort',
 status: 'Standing',
 description: 'Known as Bhopalgarh, this fort offers panoramic views of the copper-rich Khetri region.',
 coordinates: { lat: 28.0000, lng: 75.8000 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Khetri Fort in Rajasthan'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Interior of Khetri Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Ruins inside Khetri Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bijaipur',
 name: 'Bijaipur Fort',
 hindiName: 'बिजयपुर किला',
 location: 'Chittorgarh, Rajasthan',
 builtBy: 'Rao Vijay Singh',
 period: '16th Century',
 category: 'fort',
 status: 'Standing',
 description: 'A 16th-century castle located in the Vindhyanchal Hills, now a heritage hotel offering a glimpse into feudal life.',
 coordinates: { lat: 24.9500, lng: 74.6500 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Bijaipur Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'kishangarh',
 name: 'Kishangarh Fort',
 hindiName: 'किशनगढ़ किला',
 location: 'Kishangarh, Ajmer',
 builtBy: 'Maharaja Kishansingh',
 period: '1611',
 category: 'fort',
 status: 'Standing',
 description: 'Famous for its Bani Thani paintings and the Gundolav Lake, this fort represents the artistic heritage of Rathore rulers.',
 coordinates: { lat: 26.5700, lng: 74.8600 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Kishangarh Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'rasik-bihari',
 name: 'Rasik Bihari Fort',
 hindiName: 'रसिक बिहारी किला',
 location: 'Karauli Region',
 builtBy: 'Local Rulers',
 period: 'Unknown',
 category: 'fort',
 status: 'Standing',
 description: 'A lesser-known gem in the Karauli region, holding local significance and architectural charm.',
 coordinates: { lat: 26.5000, lng: 77.0200 },
 images: [
 {
 src: '/images/forts/rasik-bihari/rasik-bihari.jpg',
 alt: 'Rasik Bihari Fort in Rajasthan'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-jodhpur',
 name: 'City Palace, Jodhpur',
 hindiName: 'सिटी पैलेस, जोधपुर',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Rao Jodha / Successors',
 period: '15th Century onwards',
 category: 'palace',
 status: 'Standing',
 description: 'Part of the Mehrangarh Fort complex, this palace features exquisite courtyards and halls reflecting the grandeur of the Marwar rulers.',
 coordinates: { lat: 26.2978, lng: 73.0185 },
 images: [
 {
 src: '/images/forts/city-palace-jodhpur/500px-1996_-218-20A_Jodhpur_Hotel_Umaid_Bhawan_Palace__2233393509_.jpg',
 alt: 'City Palace in Jodhpur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-bikaner',
 name: 'City Palace, Bikaner',
 hindiName: 'सिटी पैलेस, बीकानेर',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Rao Bika / Successors',
 period: '16th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The old royal residence of Bikaner, distinct from the newer Lalgarh, known for its red sandstone architecture.',
 coordinates: { lat: 28.0229, lng: 73.3119 },
 images: [
 {
 src: '/images/forts/city-palace-bikaner/junagarh-fort-bikaner-rajasthan-1-attr-hero',
 alt: 'City Palace in Bikaner'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-karauli',
 name: 'City Palace, Karauli',
 hindiName: 'सिटी पैलेस, करौली',
 location: 'Karauli, Rajasthan',
 builtBy: 'Arjun Pal',
 period: '14th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A classic example of medieval Rajasthani architecture, known for its rich stone carvings and frescoes.',
 coordinates: { lat: 26.4900, lng: 77.0200 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'City Palace in Karauli'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Main Entrance of City Palace in Karauli'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-dungarpur',
 name: 'City Palace, Dungarpur (Juna Mahal)',
 hindiName: 'सिटी पैलेस, डूंगरपुर',
 location: 'Dungarpur, Rajasthan',
 builtBy: 'Rawal Veer Singh',
 period: '13th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Also known as Juna Mahal, this seven-storied structure is famous for its mural paintings and mirror work.',
 coordinates: { lat: 23.8400, lng: 73.7100 },
 images: [
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Juna Mahal in Dungarpur'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Corridor of Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Wall paintings in Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Windows of Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Terrace of Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Hall inside Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Intricate Interior of Juna Mahal'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Open courtyard of Juna Mahal'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'city-palace-jaisalmer',
 name: 'City Palace, Jaisalmer (Mandir Palace)',
 hindiName: 'सिटी पैलेस, जैसलमेर',
 location: 'Jaisalmer, Rajasthan',
 builtBy: 'Maharawal Moolraj II',
 period: '19th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Known as Mandir Palace, it stands tall with its intricately carved stone balconies and canopies.',
 coordinates: { lat: 26.9157, lng: 70.9083 },
 images: [
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'City Palace in Jaisalmer'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Courtyard of city palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Intricate sandstone carvings at City Palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Entrance of City Palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Windows of City Palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Interior courtyard of City Palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Ancient elephant sculpture at City Palace'
 },
 {
 src: '/images/forts/jaisalmer/500px-Jain_temples__Jaisalmer_Fort_-_panoramio__cropped_.jpg',
 alt: 'Woodwork in Palace Museum'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'jag-mandir',
 name: 'Jag Mandir',
 hindiName: 'जग मंदिर',
 location: 'Udaipur, Rajasthan',
 builtBy: 'Maharana Karan Singh',
 period: '1620',
 category: 'palace',
 status: 'Standing',
 description: 'An island palace in Lake Pichola, built as a pleasure palace and summer resort. It famously sheltered Prince Khurram (Shah Jahan).',
 coordinates: { lat: 24.5676, lng: 73.6781 },
 images: [
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Jag Mandir in Lake Pichola'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Inside courtyard of Jag Mandir'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Garden in Jag Mandir complex'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Gul Mahal in Jag Mandir Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Complex in Jag Mandir'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Fountain area in Jag Mandir'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Elephant statue at Jag Mandir'
 },
 {
 src: '/images/forts/jag-mandir/250px-Udaipur-Jagmandir-16-Damentoilette-2018-gje.jpg',
 alt: 'Entrance to jagat niwas in Jag Mandir'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'jal-mahal',
 name: 'Jal Mahal',
 hindiName: 'जल महल',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Maharaja Madho Singh I',
 period: '1750',
 category: 'palace',
 status: 'Standing',
 description: 'The "Water Palace" situated in the middle of Man Sagar Lake. Four of its five stories are submerged underwater.',
 coordinates: { lat: 26.9535, lng: 75.8462 },
 images: [
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Jal Mahal Palace in Jaipur'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Entrance gate of Jal Mahal'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Diwan-i-Khas at Jal Mahal'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'junagarh-palace-internal',
 name: 'Junagarh Palace (Internal)',
 hindiName: 'जूनागढ़ महल',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Raja Rai Singh',
 period: '1594',
 category: 'palace',
 status: 'Standing',
 description: 'The magnificent palaces within Junagarh Fort, including Anup Mahal, Karan Mahal, and Phool Mahal, showcasing exquisite craftsmanship.',
 coordinates: { lat: 28.0210, lng: 73.3180 },
 images: [
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Darbar of Anup Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Royal Bedroom at Chandra Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Gagan Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Karan Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Phool Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Sujan Mahal in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Lallgarth Palace in Junagarh Fort'
 },
 {
 src: '/images/forts/junagarh/500px-Bikaner-Junagarh-26-2018-gje.jpg',
 alt: 'Sur Mandar in Junagarh Fort'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'fateh-prakash-palace',
 name: 'Fateh Prakash Palace',
 hindiName: 'फतेह प्रकाश पैलेस',
 location: 'Udaipur, Rajasthan',
 builtBy: 'Maharana Fateh Singh',
 period: '20th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Part of the City Palace complex, it houses a crystal gallery and offers stunning views of Lake Pichola.',
 coordinates: { lat: 24.5760, lng: 73.6830 },
 images: [
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Fateh Prakash Palace in Udaipur'
 },
 {
 src: '/images/forts/fateh-prakash-palace/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Durbar Hall in Fateh Prakash Palace'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'shiv-niwas-palace',
 name: 'Shiv Niwas Palace',
 hindiName: 'शिव निवास पैलेस',
 location: 'Udaipur, Rajasthan',
 builtBy: 'Maharana Fateh Singh',
 period: '20th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Originally the royal guest house, this crescent-shaped palace is now a luxury heritage hotel within the City Palace complex.',
 coordinates: { lat: 24.5750, lng: 73.6840 },
 images: [
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Panoramic view of Shiv Niwas Palace'
 },
 {
 src: '/images/forts/city-palace-udaipur/250px-Durbar_Hall__Fateh_Prakash_Palace_Hotel__Udaipur.jpg',
 alt: 'Entry gate of Shiv Niwas Palace'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'moti-mahal-mehrangarh',
 name: 'Moti Mahal (Mehrangarh)',
 hindiName: 'मोती महल (मेहरानगढ़)',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Raja Sur Singh',
 period: '16th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The "Pearl Palace" within Mehrangarh Fort, known for its glass windows and gold-leaf ceiling where the Maharaja held court.',
 coordinates: { lat: 26.2978, lng: 73.0185 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Moti Mahal in Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Colorful glass mosaic inside Mehrangarh'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Darbar Hall of Moti Mahal'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Paintings in Moti Mahal'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'phool-mahal-mehrangarh',
 name: 'Phool Mahal (Mehrangarh)',
 hindiName: 'फूल महल (मेहरानगढ़)',
 location: 'Jodhpur, Rajasthan',
 builtBy: 'Maharaja Abhay Singh',
 period: '18th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The "Palace of Flowers" is the grandest chamber in Mehrangarh, created for private royal pleasure and musical performances.',
 coordinates: { lat: 26.2978, lng: 73.0185 },
 images: [
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Phool Mahal in Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Bay window in Phool Mahal'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Details of gold filigree on the ceiling of Phool Mahal'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Sileh Khana Room at Phool Mahal'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Interior view of a room in Mehrangarh Fort Museum'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Raj Darbar at Phool Mahal'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Courtroom in Mehrangarh Fort'
 },
 {
 src: '/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg',
 alt: 'Intricate Gold Work in Phool Mahal'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'badal-mahal-amber',
 name: 'Badal Mahal (Amber)',
 hindiName: 'बादल महल (आमेर)',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Jai Singh I',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The "Cloud Palace" in Amber Fort, famous for its layout that allowed ladies to watch proceedings without being seen.',
 coordinates: { lat: 26.9855, lng: 75.8513 },
 images: [
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Badal Mahal in Amber Fort'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'sheesh-mahal-amber',
 name: 'Sheesh Mahal (Amber)',
 hindiName: 'शीश महल (आमेर)',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Jai Singh I',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The world-renowned "Mirror Palace" in Amber Fort, where a single candle can illuminate the entire hall like thousands of stars.',
 coordinates: { lat: 26.9855, lng: 75.8513 },
 images: [
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'Sheesh Mahal in Amber Fort'
 },
 {
 src: '/images/forts/amber/960px-Amber_fort_tunnels.jpg',
 alt: 'Intricate mirror ceiling in Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/Amber_fort_jaipur.jpg',
 alt: 'Interior chambers of Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Diwan-i-Khas in Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'DIwan-i-Aam in Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/960px-Amber_fort_tunnels.jpg',
 alt: 'Mirrored walls and ceiling in Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/Amber_fort_jaipur.jpg',
 alt: 'Hallway in Sheesh Mahal'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Interior view of Sheesh Mahal'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'raj-mahal-jaipur',
 name: 'Raj Mahal (Jaipur)',
 hindiName: 'राज महल (जयपुर)',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Sawai Jai Singh II',
 period: '1727',
 category: 'palace',
 status: 'Standing',
 description: 'One of the oldest palaces in Jaipur, it has served as the British Residency and is now a luxury hotel.',
 coordinates: { lat: 26.9100, lng: 75.7900 },
 images: [
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Raj Mahal in Jaipur'
 },
 {
 src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
 alt: 'Open courtyard of Raj Mahal'
 },
 {
      src: '/images/forts/city-palace-jaipur/500px-Jaipur_03-2016_22_City_Palace_complex.jpg',
      alt: 'Hallway in Raj Mahal'
    },
    {
      src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
      alt: 'Interior room of Raj Mahal'
    },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'sukh-niwas-jaipur',
 name: 'Sukh Niwas (Amber)',
 hindiName: 'सुख निवास',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Jai Singh I',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'The "Hall of Pleasure" in Amber Fort, designed with a water channel to keep the environment cool during summers.',
 coordinates: { lat: 26.9855, lng: 75.8513 },
 images: [
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Sukh Niwas in Amber Fort'
 },
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'Wall Decoration in Sukh Niwas'
 },
 {
 src: '/images/forts/amber/960px-Amber_fort_tunnels.jpg',
 alt: 'Fresco Decorations in Sukh Niwas'
 },
 {
 src: '/images/forts/amber/Amber_fort_jaipur.jpg',
 alt: 'Ornate Marble Carving in Sukh Niwas'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Chini Khana in Sukh Niwas'
 },
 {
 src: '/images/forts/amber/1280px-Diwan-i-Khas__Amber_Palace_3.jpg',
 alt: 'Garden in Sukh Niwas'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'anand-bhawan-dungarpur',
 name: 'Anand Bhawan (Dungarpur)',
 hindiName: 'आनंद भवन (डूंगरपुर)',
 location: 'Dungarpur, Rajasthan',
 builtBy: 'Maharawal Lakshman Singh',
 period: '20th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A royal guest house perched on a hill, offering scenic views of the Gaibsagar Lake.',
 coordinates: { lat: 23.8400, lng: 73.7150 },
 images: [
 {
 src: '/images/forts/anand-bhawan-dungarpur/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nLzQ0ZmMxYmQ2OTE1YTQyYjM4MTU0NGU1ZmMwZDE5ODA3IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NDAsImhlaWdodCI6NjQwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJ0b0Zvcm1hdCI6ICJ3ZWJwIn19',
 alt: 'Anand Bhawan in Dungarpur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'udai-bilas-palace',
 name: 'Udai Bilas Palace',
 hindiName: 'उदय बिलास पैलेस',
 location: 'Dungarpur, Rajasthan',
 builtBy: 'Maharawal Udai Singh II',
 period: '19th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A lakeside palace known for its intricate stone carvings and the Ek Thambia Mahal (One Pillared Palace).',
 coordinates: { lat: 23.8450, lng: 73.7150 },
 images: [
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Udai Bilas Palace in Dungarpur'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Vintage Car Museum in Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Cannon at Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Dining Hall in Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Entrance of Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Garden area of Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Whirlpool Dining Table in Udai Bilas Palace'
 },
 {
 src: '/images/forts/udai-bilas-palace/500px-Udai_Bilas_Palace_Dungarpur_2024_10.jpg',
 alt: 'Paintings in Udai Bilas Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'gajner-palace',
 name: 'Gajner Palace',
 hindiName: 'गजनेर पैलेस',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Maharaja Ganga Singh',
 period: 'Early 20th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A lakeside hunting lodge turned palace, built in red sandstone, often called "a jewel in the Thar Desert".',
 coordinates: { lat: 27.9500, lng: 73.0500 },
 images: [
 {
 src: '/images/forts/gajner-palace/1280px-Gajner_Palace_-_panoramio.jpg',
 alt: 'Panoramic view of Gajner Palace'
 },
 {
 src: '/images/forts/gajner-palace/250px-Gajner_Palace__Staircase___Bikaner__Rajasthan.jpg',
 alt: 'Courtyard of Gajner Palace'
 },
 {
 src: '/images/forts/gajner-palace/1280px-Gajner_Palace_-_panoramio.jpg',
 alt: 'Temple in Gajner Palace'
 },
 {
 src: '/images/forts/gajner-palace/250px-Gajner_Palace__Staircase___Bikaner__Rajasthan.jpg',
 alt: 'Garden of Gajner Palace'
 },
 {
 src: '/images/forts/gajner-palace/250px-Gajner_Palace__Staircase___Bikaner__Rajasthan.jpg',
 alt: 'Staircase of Gajner Palace'
 },
 {
 src: '/images/forts/gajner-palace/1280px-Gajner_Palace_-_panoramio.jpg',
 alt: 'Bumbler Boiler in Gajner Palace'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'laxmi-niwas-palace',
 name: 'Laxmi Niwas Palace',
 hindiName: 'लक्ष्मी निवास पैलेस',
 location: 'Bikaner, Rajasthan',
 builtBy: 'Maharaja Ganga Singh',
 period: '1904',
 category: 'palace',
 status: 'Standing',
 description: 'Part of the Lalgarh complex, this palace was the personal residence of Maharaja Ganga Singh, designed by Sir Samuel Swinton Jacob.',
 coordinates: { lat: 28.0300, lng: 73.3200 },
 images: [
 {
 src: '/images/forts/laxmi-niwas-palace/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Laxmi Niwas Palace in Bikaner'
 },
 {
 src: '/images/forts/laxmi-niwas-palace/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Pillars of Laxmi Niwas Palace'
 },
 {
 src: '/images/forts/laxmi-niwas-palace/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Garden restaurant of Laxmi Niwas Palace'
 },
 {
 src: '/images/forts/laxmi-niwas-palace/500px-The_Laxmi_Niwas_Palace__Bikaner__Rajasthan.jpg',
 alt: 'Inside view of Laxmi Niwas Palace'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'mandawa-palace',
 name: 'Mandawa Palace (Castle Mandawa)',
 hindiName: 'मंडावा पैलेस',
 location: 'Mandawa, Shekhawati',
 builtBy: 'Thakur Nawal Singh',
 period: '1755',
 category: 'palace',
 status: 'Standing',
 description: 'A fortress converted into a palace hotel, famous for its painted arched gateway and frescoes.',
 coordinates: { lat: 28.0556, lng: 75.1436 },
 images: [
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Mandawa Palace in Shekhawati'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'alsisar-mahal',
 name: 'Alsisar Mahal',
 hindiName: 'अलसीसर महल',
 location: 'Jhunjhunu, Rajasthan',
 builtBy: 'Shekhawat Thikana',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A battle-hardened fort turned into a palace, featuring magnificent frescoes and grand courtyards.',
 coordinates: { lat: 28.3000, lng: 75.3000 },
 images: [
 {
 src: '/images/forts/mandawa-palace/Facade_pool_aw6g5v.jpg',
 alt: 'Alsisar Mahal in Jhunjhunu'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'samode-palace',
 name: 'Samode Palace',
 hindiName: 'सामोद पैलेस',
 location: 'Jaipur, Rajasthan',
 builtBy: 'Rawal Sheo Singh',
 period: '19th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A splendid example of Rajput-Mughal architecture, famous for its Sheesh Mahal and Durbar Hall.',
 coordinates: { lat: 27.2000, lng: 75.8000 },
 images: [
 {
 src: '/images/forts/samode-palace/500px-Samode_Lounge.jpg',
 alt: 'Samode Palace in Jaipur'
 },
 {
 src: '/images/forts/samode-palace/500px-Samode_Lounge.jpg',
 alt: 'Courtyard of Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/Chandelier_and_red_reception_hall_in_Samode_Palace_heritage_hotel_-_panoramio.jpg',
 alt: 'Chandelier and red reception hall in Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/Patio_at_Samode_Palace_in_Rajasthan_-_panoramio.jpg',
 alt: 'Patio at Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/500px-Samode_Lounge.jpg',
 alt: 'Lounge in Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/500px-Samode_Lounge.jpg',
 alt: 'Swimming Pool at Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/500px-Samode_Lounge.jpg',
 alt: 'Inner courtyard of Samode Palace'
 },
 {
 src: '/images/forts/samode-palace/Samode_Palace_courtyard_arcades_-_panoramio.jpg',
 alt: 'Courtyard arcades of Samode Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bundi-palace',
 name: 'Bundi Palace (Garh Palace)',
 hindiName: 'बूंदी पैलेस',
 location: 'Bundi, Rajasthan',
 builtBy: 'Rao Raja Ratan Singh',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Known for its hanging gardens and the Chitrasala (Picture Gallery) with excellent Bundi school miniatures.',
 coordinates: { lat: 25.4400, lng: 75.6400 },
 images: [
 {
 src: '/images/forts/bundi-palace/Bundi-Garh_Palace-20131016.jpg',
 alt: 'Garh Palace in Bundi'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Diwan-i-Aam in Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Diwan-i-Khas in Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Hathi Pol in Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Main Courtyard of Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Chitrasala in Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Chhatra Mahal in Bundi Palace'
 },
 {
 src: '/images/forts/bundi-palace/250px-Bundi-Garh_Palace-Chitrasala_GVN-20131015.jpg',
 alt: 'Wall paintings in Bundi Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'kota-garh-palace',
 name: 'Kota Garh Palace',
 hindiName: 'कोटा गढ़ पैलेस',
 location: 'Kota, Rajasthan',
 builtBy: 'Hada Rulers',
 period: '17th Century',
 category: 'palace',
 status: 'Standing',
 description: 'Also known as the City Palace of Kota, it houses a museum with a rich collection of weapons and royal regalia.',
 coordinates: { lat: 25.1800, lng: 75.8300 },
 images: [
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Aerial view of Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Barah Dari in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Darbar Gallery in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Story Paintings in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Historical Pillars in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Prehistoric Glass-work and Painted Ceiling in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Wall of Illustrative Art Work in Garh Palace'
 },
 {
 src: '/images/forts/amber/1280px-Amber_Fort_Diwan-i-Aam_20080213-6.jpg',
 alt: 'Wall of Ornaments in Garh Palace'
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'tal-chhapar-palace',
 name: 'Tal Chhapar Rest House',
 hindiName: 'ताल छापर पैलेस',
 location: 'Churu, Rajasthan',
 builtBy: 'Maharaja of Bikaner',
 period: '20th Century',
 category: 'palace',
 status: 'Standing',
 description: 'A royal hunting lodge situated in the Tal Chhapar Sanctuary, famous for blackbuck sightings.',
 coordinates: { lat: 27.8000, lng: 74.4300 },
 images: [
 {
 src: '/images/forts/tal-chhapar-palace/tal-chhapar-palace.jpg',
 alt: 'Tal Chhapar Rest House in Churu'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'bhanwar-vilas-palace',
 name: 'Bhanwar Vilas Palace',
 hindiName: 'भंवर विलास पैलेस',
 location: 'Karauli, Rajasthan',
 builtBy: 'Maharaja Ganesh Pal Deo',
 period: '1938',
 category: 'palace',
 status: 'Standing',
 description: 'A modern palace built in colonial style, serving as the residence of the Karauli royal family.',
 coordinates: { lat: 26.5000, lng: 77.0200 },
 images: [
 {
 src: '/images/forts/bhanwar-vilas-palace/bhanwar-vilas-palace.jpg',
 alt: 'Bhanwar Vilas Palace in Karauli'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'brij-raj-bhawan',
 name: 'Brij Raj Bhawan',
 hindiName: 'बृज राज भवन',
 location: 'Kota, Rajasthan',
 builtBy: 'British Residency',
 period: '1830',
 category: 'palace',
 status: 'Standing',
 description: 'A colonial-style palace on the banks of the Chambal river, now a heritage hotel. Known for its resident ghost, Major Burton.',
 coordinates: { lat: 25.1800, lng: 75.8500 },
 images: [
 {
 src: '/images/forts/brij-raj-bhawan/brij-raj-bhawan.jpg',
 alt: 'Brij Raj Bhawan in Kota'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'khimsar-palace',
 name: 'Khimsar Palace',
 hindiName: 'खींवसर पैलेस',
 location: 'Nagaur, Rajasthan',
 builtBy: 'Rao Karamsi',
 period: '1523',
 category: 'palace',
 status: 'Standing',
 description: 'Perched on the edge of the Thar Desert, this fort-palace has been the residence of the Khimsar Thakurs for 20 generations.',
 coordinates: { lat: 26.9800, lng: 73.4000 },
 images: [
 {
 src: '/images/forts/nagaur/500px-Nagaur_Fort.JPG',
 alt: 'Khimsar Fort in Nagaur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'sardargarh-palace',
 name: 'Sardargarh Palace',
 hindiName: 'सरदारगढ़ पैलेस',
 location: 'Rajsamand, Rajasthan',
 builtBy: 'Sardar Singh',
 period: '1738',
 category: 'palace',
 status: 'Standing',
 description: 'A magnificent fort-palace comparable to Chittorgarh in its defensive design, now a heritage hotel.',
 coordinates: { lat: 25.2300, lng: 74.0000 },
 images: [
 {
 src: '/images/forts/sardargarh-palace/sardargarh-heritage-hotel.jpg',
 alt: 'Sardargarh Heritage Hotel in Rajsamand'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 },
 {
 id: 'narain-niwas-palace',
 name: 'Narain Niwas Palace',
 hindiName: 'नारायण निवास पैलेस',
 location: 'Jaipur, Rajasthan',
 builtBy: 'General Amar Singh',
 period: '1928',
 category: 'palace',
 status: 'Standing',
 description: 'Built by the Thakur of Kanota, this palace showcases the Anglo-Indian style of Victorian era architecture.',
 coordinates: { lat: 26.9000, lng: 75.8200 },
 images: [
 {
 src: '/images/forts/narain-niwas-palace/narain-niwas-palace.jpg',
 alt: 'Narain Niwas Palace in Jaipur'
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 },
 {
 src: '',
 alt: ''
 }
 ],
 videos: [
 { title: '', provider: 'youtube', url: '' }
 ]
 }
];

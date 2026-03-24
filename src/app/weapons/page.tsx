'use client';

import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import OptimizedImage from '../components/OptimizedImage';
import { useLanguage } from '../components/LanguageProvider';
const weaponCategories = [
 { id: 'bladed', name: 'I. BLADED WEAPONS', icon: '' },
 { id: 'daggers', name: 'II. DAGGERS', icon: '' },
 { id: 'polearms', name: 'III. POLEARMS', icon: '' },
 { id: 'axes', name: 'IV. AXES', icon: '' },
 { id: 'impact', name: 'V. IMPACT', icon: '' },
 { id: 'missile', name: 'VI. MISSILE', icon: '' },
 { id: 'firearms', name: 'VII. FIREARMS', icon: '' },
 { id: 'artillery', name: 'VIII. ARTILLERY', icon: '' },
 { id: 'siege', name: 'IX. SIEGE', icon: '' },
 { id: 'defense', name: 'X. DEFENSE', icon: '' },
 { id: 'cavalry', name: 'XI. CAVALRY', icon: '' },
 { id: 'animals', name: 'XII. ANIMALS', icon: '' },
 { id: 'ritual', name: 'XIII. RITUAL', icon: '' },
];

const rajputanaWeapons = [
 // I. BLADED WEAPONS
 {
 id: 'talwar',
 name: 'Talwar',
 subtitle: 'The Curved Killing Blade',
 category: 'bladed',
 description: 'The quintessential Rajput sword. Its curved blade is engineered for the draw-cut, capable of decapitating an enemy in a single fluid motion from horseback.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sword_%28Talwar%29_with_Scabbard_MET_32.75.298ab_002Jun2015.jpg/500px-Sword_%28Talwar%29_with_Scabbard_MET_32.75.298ab_002Jun2015.jpg'],
 type: 'Slash & Draw',
 lethality: 'High',
 role: 'Primary Sidearm',
 era: '16th-19th Century'
 },
 {
 id: 'khanda',
 name: 'Khanda',
 subtitle: 'The Double-Edged Cleaver',
 category: 'bladed',
 description: 'A straight, heavy, double-edged sword with a reinforced spine. Designed to hack through mail and bone. A weapon of brute force and religious significance.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rajput_Khanda.jpg/500px-Rajput_Khanda.jpg'],
 type: 'Cleave & Crush',
 lethality: 'Extreme',
 role: 'Heavy Infantry',
 era: 'Ancient-18th Century'
 },
 {
 id: 'firangi',
 name: 'Firangi',
 subtitle: 'The Foreign Blade',
 category: 'bladed',
 description: 'Imported European blades (Portuguese/German) mounted on Hindu basket hilts. Used for their superior reach and thrusting capability in cavalry charges.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mumtaz_Mahal_Museum%2C_Red_Fort_-_Firangi.jpg/330px-Mumtaz_Mahal_Museum%2C_Red_Fort_-_Firangi.jpg'],
 type: 'Thrust & Reach',
 lethality: 'High',
 role: 'Cavalry',
 era: '17th-19th Century'
 },
 {
 id: 'pata',
 name: 'Pata',
 subtitle: 'The Gauntlet Sword',
 category: 'bladed',
 description: 'A sword integrated into a steel gauntlet. The warrior becomes the weapon. Impossible to disarm, used for slashing through infantry lines.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pata-1-Archit-Patel.jpg/330px-Pata-1-Archit-Patel.jpg'],
 type: 'Slash & Thrust',
 lethality: 'High',
 role: 'Shock Troops',
 era: '16th-18th Century'
 },
 {
 id: 'saif',
 name: 'Saif',
 subtitle: 'The Straight Edge',
 category: 'bladed',
 description: 'A broad, straight-bladed sword of Arab origin adapted by Rajputs. Focuses on durability and piercing power against chainmail.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sword_of_Umar_ibn_al-Khittab-mohammad_adil_rais.JPG/500px-Sword_of_Umar_ibn_al-Khittab-mohammad_adil_rais.JPG'],
 type: 'Cut & Thrust',
 lethality: 'High',
 role: 'Infantry',
 era: 'Medieval'
 },
 {
 id: 'tulwar',
 name: 'Tulwar',
 subtitle: 'Variant Curved Saber',
 category: 'bladed',
 description: 'A heavier variation of the Talwar with a deeper curve, optimizing the mechanics of the draw cut for dismounted combat.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Z_pulwar_hilt.jpg/330px-Z_pulwar_hilt.jpg'],
 type: 'Deep Slash',
 lethality: 'Fatal',
 role: 'Duelist',
 era: '17th Century'
 },
 {
 id: 'tegha',
 name: 'Tegha',
 subtitle: 'The Executioner\'s Blade',
 category: 'bladed',
 description: 'A massive, broad curved sword. Too heavy for prolonged combat, used for executions or by the strongest warriors to sever limbs in one blow.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Indian-Execution-Sword.jpg/330px-Indian-Execution-Sword.jpg'],
 type: 'Sever',
 lethality: 'Extreme',
 role: 'Execution / Shock',
 era: '17th-19th Century'
 },
 {
 id: 'asi',
 name: 'Asi',
 subtitle: 'The Lotus Blade',
 category: 'bladed',
 description: 'An ancient form of sword mentioned in epics, precursor to the Khanda. Represents the primordial sword created to destroy evil.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/2_antique_sai.jpg/500px-2_antique_sai.jpg'],
 type: 'Divine Strike',
 lethality: 'Legendary',
 role: 'Ceremonial / War',
 era: 'Ancient'
 },
 {
 id: 'karavela',
 name: 'Karavela',
 subtitle: 'The Sickle Blade',
 category: 'bladed',
 description: 'A sword with a distinct sickle-like curve, designed to hook shields and limbs.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/f/fc/Karabela_of_Sigismund_III_Vasa.JPG'],
 type: 'Hook & Slash',
 lethality: 'High',
 role: 'Specialized',
 era: 'Medieval'
 },

 // II. DAGGERS & SHORT BLADES
 {
 id: 'katar',
 name: 'Katar',
 subtitle: 'The Punching Dagger',
 category: 'daggers',
 description: 'The most famous Rajput dagger. An H-shaped handle allows the warrior to put their full body weight behind a thrust that can pierce armor.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ornamental_katar.jpg/330px-Ornamental_katar.jpg'],
 type: 'Armor Piercing',
 lethality: 'Fatal',
 role: 'Close Quarters',
 era: '14th-19th Century'
 },
 {
 id: 'bichuwa',
 name: 'Bichuwa',
 subtitle: 'The Scorpion',
 category: 'daggers',
 description: 'A double-curved dagger resembling a scorpion\'s sting. Often looped over fingers, used for concealed, upward gutting strikes.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Indian_bichwa_dagger.jpg/330px-Indian_bichwa_dagger.jpg'],
 type: 'Gut & Slash',
 lethality: 'Medium',
 role: 'Assassin / Backup',
 era: 'Medieval'
 },
 {
 id: 'chhuri',
 name: 'Chhuri',
 subtitle: 'The War Knife',
 category: 'daggers',
 description: 'A single-edged knife with a slightly curved blade. A utility tool that doubles as a deadly close-range weapon.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Knife_%28Kukri%29_with_Sheath%2C_Two_Small_Knives_and_Pouch_MET_36.25.829a-e_004june2014.jpg/330px-Knife_%28Kukri%29_with_Sheath%2C_Two_Small_Knives_and_Pouch_MET_36.25.829a-e_004june2014.jpg'],
 type: 'Slash',
 lethality: 'Medium',
 role: 'Utility / Defense',
 era: 'All Eras'
 },
 {
 id: 'jamdhar',
 name: 'Jamdhar',
 subtitle: 'The Death Tooth',
 category: 'daggers',
 description: 'A broad-bladed variant of the Katar. "Jamdhar" implies the tooth of Yama, the God of Death. Inflicts massive, gaping wounds.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/%D0%9A%D0%B0%D1%82%D0%B0%D1%80_%282%29.jpg/500px-%D0%9A%D0%B0%D1%82%D0%B0%D1%80_%282%29.jpg'],
 type: 'Massive Trauma',
 lethality: 'High',
 role: 'Close Combat',
 era: '16th Century'
 },
 {
 id: 'pesh-kabz',
 name: 'Pesh-kabz',
 subtitle: 'The Mail Piercer',
 category: 'daggers',
 description: 'A dagger with a T-spine designed specifically to split chainmail links. The tip is reinforced for maximum penetration.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Dagger_Asia_Louvre_7642.jpg/500px-Dagger_Asia_Louvre_7642.jpg'],
 type: 'Pierce Armor',
 lethality: 'High',
 role: 'Anti-Armor',
 era: '17th-19th Century'
 },
 {
 id: 'khanjar',
 name: 'Khanjar',
 subtitle: 'The Curved Fang',
 category: 'daggers',
 description: 'A dagger with a recurved blade, often with a pistol-grip hilt. Optimized for slashing capability.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Indian_jambiya_dagger%2C_Louvre_R895.jpg/330px-Indian_jambiya_dagger%2C_Louvre_R895.jpg'],
 type: 'Slash',
 lethality: 'High',
 role: 'Sidearm',
 era: 'Mughal-Rajput'
 },
 {
 id: 'jambiya',
 name: 'Jambiya',
 subtitle: 'The Arab Influence',
 category: 'daggers',
 description: 'A curved dagger with a medial ridge. Adopted from Arab traders and mercenaries, integrated into Rajput armories.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/-Dagger%28Jambiya%29Scabbard-1876%E2%80%931909.jpg/330px--Dagger%28Jambiya%29Scabbard-1876%E2%80%931909.jpg'],
 type: 'Slash',
 lethality: 'Medium',
 role: 'Status / Combat',
 era: 'Medieval'
 },

 // III. POLEARMS & SPEARS
 {
 id: 'bhala',
 name: 'Bhala',
 subtitle: 'The Infantry Spear',
 category: 'polearms',
 description: 'The standard spear of the Rajput foot soldier. A bamboo or wood shaft with a razor-sharp steel head.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Boar_Spear_MET_14.25.305_006jan2015.jpg/330px-Boar_Spear_MET_14.25.305_006jan2015.jpg'],
 type: 'Thrust',
 lethality: 'High',
 role: 'Formation Fighting',
 era: 'Ancient-Medieval'
 },
 {
 id: 'barchha',
 name: 'Barchha',
 subtitle: 'The Heavy Lance',
 category: 'polearms',
 description: 'A heavy, all-metal lance used by cavalry. Could penetrate shields and armor through the sheer momentum of a charge.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Spear_man_in_raghoba_camp.jpg/500px-Spear_man_in_raghoba_camp.jpg'],
 type: 'Heavy Thrust',
 lethality: 'Extreme',
 role: 'Shock Cavalry',
 era: 'Medieval'
 },
 {
 id: 'ballam',
 name: 'Ballam',
 subtitle: 'The Short Spear',
 category: 'polearms',
 description: 'A shorter spear used for close-quarters skirmishing or thrown as a heavy javelin.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Bronze_Ge_Dagger-axe%2C_Sanxingdui_1.jpg/330px-Bronze_Ge_Dagger-axe%2C_Sanxingdui_1.jpg'],
 type: 'Thrust & Throw',
 lethality: 'Medium',
 role: 'Skirmisher',
 era: 'All Eras'
 },
 {
 id: 'sang',
 name: 'Sang',
 subtitle: 'The Iron Pike',
 category: 'polearms',
 description: 'A long lance made entirely of iron. Used by heavy cavalry to break enemy formations. Often possessed a quadrangular tip.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Warring_States_Bronze_Pi.jpg/500px-Warring_States_Bronze_Pi.jpg'],
 type: 'Pierce',
 lethality: 'Extreme',
 role: 'Heavy Cavalry',
 era: 'Medieval'
 },
 {
 id: 'kont',
 name: 'Kont',
 subtitle: 'The Spiked Staff',
 category: 'polearms',
 description: 'A spear with a long, faceted blade, often used to penetrate deep into targets.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cep_bojowy_0211.jpg/250px-Cep_bojowy_0211.jpg'],
 type: 'Deep Pierce',
 lethality: 'High',
 role: 'Infantry',
 era: 'Medieval'
 },
 {
 id: 'trishul',
 name: 'Trishul',
 subtitle: 'The Trident',
 category: 'polearms',
 description: 'A three-pronged spear. While symbolic of Shiva, war variants were used to trap enemy weapons and disarm opponents.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Trishula-shore-Gosaikunda.jpg/250px-Trishula-shore-Gosaikunda.jpg'],
 type: 'Disarm & Stab',
 lethality: 'High',
 role: 'Ritual / Combat',
 era: 'Ancient'
 },
 {
 id: 'halberd-rajput',
 name: 'Rajput Halberd',
 subtitle: 'The Axe-Spear',
 category: 'polearms',
 description: 'Indian variants of the halberd, combining a spear tip with an axe blade or hook. Versatile against both cavalry and infantry.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Halberd_MET_14.25.35_003dec2014.jpg/500px-Halberd_MET_14.25.35_003dec2014.jpg'],
 type: 'Chop & Thrust',
 lethality: 'High',
 role: 'Guard / Infantry',
 era: '17th Century'
 },

 // IV. AXES & CLEAVING WEAPONS
 {
 id: 'parashu',
 name: 'Parashu',
 subtitle: 'The Battle Axe',
 category: 'axes',
 description: 'The classical Indian battle axe. Single or double-bladed, used to deliver crushing blows that ignore armor.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Horseman%27s_axe_-_1475.jpg/330px-Horseman%27s_axe_-_1475.jpg'],
 type: 'Chop',
 lethality: 'High',
 role: 'Infantry',
 era: 'Ancient'
 },
 {
 id: 'tabar',
 name: 'Tabar',
 subtitle: 'The Saddle Axe',
 category: 'axes',
 description: 'A light battle axe often carried by cavalry in a saddle holster. Perfect for breaking helmets in a melee.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Indian_%28Sind%29_tabar_2.jpg/330px-Indian_%28Sind%29_tabar_2.jpg'],
 type: 'Armor Break',
 lethality: 'High',
 role: 'Cavalry Sidearm',
 era: 'Medieval'
 },
 {
 id: 'pharsa',
 name: 'Pharsa',
 subtitle: 'The Heavy Cleaver',
 category: 'axes',
 description: 'A long-handled axe used by foot soldiers. Its reach allowed it to be brought down with tremendous force on shielded enemies.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/a/a6/Dane_Axe.JPG'],
 type: 'Cleave',
 lethality: 'Extreme',
 role: 'Infantry',
 era: 'Medieval'
 },
 {
 id: 'gajdal',
 name: 'Gajdal',
 subtitle: 'The Elephant Axe',
 category: 'axes',
 description: 'A massive axe designed to attack war elephants or be used by elephant riders.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Indian_-_Elephant_Goad_-_Walters_5161.jpg/330px-Indian_-_Elephant_Goad_-_Walters_5161.jpg'],
 type: 'Anti-Beast',
 lethality: 'Extreme',
 role: 'Anti-Elephant',
 era: 'Medieval'
 },
 {
 id: 'double-axe',
 name: 'Double-Bladed Axe',
 subtitle: 'The Whirling Death',
 category: 'axes',
 description: 'Rare double-headed axes used by elite shock troops for clearing space in a melee.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Minoan_Labrys1.jpg/330px-Minoan_Labrys1.jpg'],
 type: 'Cleave',
 lethality: 'High',
 role: 'Shock',
 era: 'Medieval'
 },

 // V. CRUSHING & IMPACT WEAPONS
 {
 id: 'gada',
 name: 'Gada',
 subtitle: 'The Mace',
 category: 'impact',
 description: 'A heavy spherical or flanged mace. A weapon of pure strength, used to shatter bones through armor.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Mace_MET_sfsb36.149.3_002.jpg/500px-Mace_MET_sfsb36.149.3_002.jpg'],
 type: 'Blunt Force',
 lethality: 'High',
 role: 'Heavy Infantry',
 era: 'Ancient-Medieval'
 },
 {
 id: 'gurz',
 name: 'Gurz',
 subtitle: 'The Flanged Mace',
 category: 'impact',
 description: 'A mace with metal flanges (wings) designed to concentrate force and dent plate armor.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Drevnosti_RG_v3_ill082_-_Pernath_and_Shestopiors.jpg/330px-Drevnosti_RG_v3_ill082_-_Pernath_and_Shestopiors.jpg'],
 type: 'Armor Denting',
 lethality: 'High',
 role: 'Anti-Armor',
 era: 'Medieval'
 },
 {
 id: 'mudgar',
 name: 'Mudgar',
 subtitle: 'The War Club',
 category: 'impact',
 description: 'A heavy wooden club, sometimes reinforced with iron. Used for strength training and brute combat.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Indian_clubs.jpg/330px-Indian_clubs.jpg'],
 type: 'Crush',
 lethality: 'Medium',
 role: 'Training / Combat',
 era: 'Ancient'
 },
 {
 id: 'spiked-mace',
 name: 'Spiked Mace',
 subtitle: 'The Morning Star',
 category: 'impact',
 description: 'A mace head covered in spikes, adding puncture damage to blunt force impact.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/020613_Interior_of_Manor_in_Pilaszk%C3%B3w_-_14.jpg/500px-020613_Interior_of_Manor_in_Pilaszk%C3%B3w_-_14.jpg'],
 type: 'Puncture & Crush',
 lethality: 'High',
 role: 'Melee',
 era: 'Medieval'
 },
 {
 id: 'war-hammer',
 name: 'War Hammer',
 subtitle: 'The Armor Breaker',
 category: 'impact',
 description: 'A hammer with a pick on the reverse side. Designed to punch holes in helmets and breastplates.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/War_hammer2.jpg/160px-War_hammer2.jpg'],
 type: 'Pierce & Crush',
 lethality: 'High',
 role: 'Anti-Armor',
 era: '17th Century'
 },

 // VI. MISSILE WEAPONS (PRE-FIREARM)
 {
 id: 'dhanush',
 name: 'Dhanush',
 subtitle: 'The Bamboo Bow',
 category: 'missile',
 description: 'The traditional self bow made of bamboo. Simple, reliable, and effective in massed volleys.',
 images: [''],
 type: 'Projectile',
 lethality: 'Medium',
 role: 'Infantry Archer',
 era: 'Ancient'
 },
 {
 id: 'composite-bow',
 name: 'Rajput Composite Bow',
 subtitle: 'The Recurve',
 category: 'missile',
 description: 'A complex bow of horn, wood, and sinew. High draw weight and compact size made it perfect for horse archers.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Koban_Bows.jpg/500px-Koban_Bows.jpg'],
 type: 'Projectile',
 lethality: 'High',
 role: 'Cavalry Archer',
 era: 'Medieval'
 },
 {
 id: 'crossbow',
 name: 'Crossbow',
 subtitle: 'The Mechanical Bolt',
 category: 'missile',
 description: 'Though less common, crossbows were used for siege defense and by specialized units for armor piercing.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Gastraphetes_Rekonstruktion_Saalburg.jpg/330px-Gastraphetes_Rekonstruktion_Saalburg.jpg'],
 type: 'Bolt Fire',
 lethality: 'High',
 role: 'Sniper / Siege',
 era: 'Medieval'
 },
 {
 id: 'chakram',
 name: 'Chakram',
 subtitle: 'The Flying Disc',
 category: 'missile',
 description: 'A sharp steel quoit thrown with a spinning motion. Capable of severing necks and limbs at range.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Akali_Turban_with_quoits.JPG/500px-Akali_Turban_with_quoits.JPG'],
 type: 'Slash Projectile',
 lethality: 'High',
 role: 'Skirmisher',
 era: 'Medieval'
 },
 {
 id: 'sling',
 name: 'Sling',
 subtitle: 'The Stone Thrower',
 category: 'missile',
 description: 'A simple weapon used to hurl stones or lead bullets with surprising force. Used by light infantry.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Weapon_Sling_2.jpg/330px-Weapon_Sling_2.jpg'],
 type: 'Blunt Projectile',
 lethality: 'Medium',
 role: 'Skirmisher',
 era: 'Ancient'
 },
 {
 id: 'javelin',
 name: 'Javelin',
 subtitle: 'The Thrown Spear',
 category: 'missile',
 description: 'Light spears balanced for throwing. Used to break up enemy charges before contact.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pilum_lg.jpg/500px-Pilum_lg.jpg'],
 type: 'Pierce Projectile',
 lethality: 'High',
 role: 'Skirmisher',
 era: 'Ancient'
 },

 // VII. FIREARMS & GUNPOWDER WEAPONS
 {
 id: 'matchlock',
 name: 'Matchlock (Bandook)',
 subtitle: 'The Fire Stick',
 category: 'firearms',
 description: 'Early muzzle-loading muskets. Long barrels provided accuracy, used by snipers from fort walls.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Korean_Matchlock_Musket.jpg/500px-Korean_Matchlock_Musket.jpg'],
 type: 'Ballistic',
 lethality: 'High',
 role: 'Infantry',
 era: '16th-19th Century'
 },
 {
 id: 'jezail',
 name: 'Jezail',
 subtitle: 'The Long Rifle',
 category: 'firearms',
 description: 'A long-barreled musket with a curved stock. Famous for its range and accuracy in rough terrain.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Jezailbipod.jpg/500px-Jezailbipod.jpg'],
 type: 'Sniper',
 lethality: 'High',
 role: 'Marksman',
 era: '18th-19th Century'
 },
 {
 id: 'toradar',
 name: 'Toradar',
 subtitle: 'The Matchlock Variant',
 category: 'firearms',
 description: 'An Indian matchlock musket. Characterized by a straight stock and often held against the cheek.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Matchlock_Gun_MET_DP166283.jpg/960px-Matchlock_Gun_MET_DP166283.jpg'],
 type: 'Ballistic',
 lethality: 'High',
 role: 'Infantry',
 era: '16th-18th Century'
 },
 {
 id: 'flintlock',
 name: 'Flintlock Musket',
 subtitle: 'The Spark Lock',
 category: 'firearms',
 description: 'Adopted later, replacing the matchlock. Provided faster reloading and reliability in wet weather.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Drevnosti_RG_v3_ill111_-_Rifle_of_Alexei_Mikhailovich.jpg/500px-Drevnosti_RG_v3_ill111_-_Rifle_of_Alexei_Mikhailovich.jpg'],
 type: 'Ballistic',
 lethality: 'High',
 role: 'Line Infantry',
 era: '18th-19th Century'
 },
 {
 id: 'hand-cannon',
 name: 'Hand Cannon',
 subtitle: 'The Thunder Tube',
 category: 'firearms',
 description: 'Primitive portable firearms. Essentially a small tube on a stick, firing stones or metal scrap.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ming_tiller_gun_1505.jpg/250px-Ming_tiller_gun_1505.jpg'],
 type: 'Blast',
 lethality: 'Unpredictable',
 role: 'Shock',
 era: '15th-16th Century'
 },
 {
 id: 'swivel-gun',
 name: 'Swivel Gun',
 subtitle: 'The Wall Gun',
 category: 'firearms',
 description: 'Large caliber guns mounted on walls or camels (Zamburak). Bridged the gap between musket and cannon.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bali_Museum_breech_loading_swivel_gun.jpg/500px-Bali_Museum_breech_loading_swivel_gun.jpg'],
 type: 'Heavy Ballistic',
 lethality: 'Extreme',
 role: 'Support',
 era: '17th-19th Century'
 },

 // VIII. ARTILLERY & HEAVY FIREPOWER
 {
 id: 'rajput-cannon',
 name: 'Rajput Cannon',
 subtitle: 'The Fort Breaker',
 category: 'artillery',
 description: 'Massive bronze or iron cannons cast in local foundries. Essential for fort defense and siege warfare.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Fort_Jaigarh_2017-12-29zi.jpg/500px-Fort_Jaigarh_2017-12-29zi.jpg'],
 type: 'Siege',
 lethality: 'Catastrophic',
 role: 'Fort Defense',
 era: '16th-19th Century'
 },
 {
 id: 'zamburak',
 name: 'Zamburak',
 subtitle: 'The Camel Cannon',
 category: 'artillery',
 description: 'A light swivel cannon mounted on a saddle on a camel. Allowed for mobile artillery tactics in the desert.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Camel_gun_-_pg_18_-The_last_voyage_-_Annie_Brassey.jpg/330px-Camel_gun_-_pg_18_-The_last_voyage_-_Annie_Brassey.jpg'],
 type: 'Mobile Artillery',
 lethality: 'High',
 role: 'Field Artillery',
 era: '18th Century'
 },
 {
 id: 'elephant-gun',
 name: 'Elephant Gun',
 subtitle: 'The Howdah Cannon',
 category: 'artillery',
 description: 'Small cannons or jingals mounted on elephant howdahs, providing high-angle fire over infantry lines.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/585gehringer.JPG/500px-585gehringer.JPG'],
 type: 'Mobile Support',
 lethality: 'High',
 role: 'Support',
 era: '17th-19th Century'
 },
 {
 id: 'rocket',
 name: 'War Rocket',
 subtitle: 'The Fire Arrow',
 category: 'artillery',
 description: 'Bamboo or metal tubes filled with gunpowder and attached to a long stabilizing stick. Early area-denial weapon.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Antique_Japanese_bohiya_or_bo_hiya_fire_arrow_and_hiya_taihou_%28fire_arrow_cannon%29.jpg/330px-Antique_Japanese_bohiya_or_bo_hiya_fire_arrow_and_hiya_taihou_%28fire_arrow_cannon%29.jpg'],
 type: 'Explosive',
 lethality: 'Area Effect',
 role: 'Chaos',
 era: '18th Century'
 },

 // IX. SIEGE & FORTIFICATION WEAPONS
 {
 id: 'battering-ram',
 name: 'Battering Ram',
 subtitle: 'The Gate Breaker',
 category: 'siege',
 description: 'A massive log, often tipped with iron, swung to breach heavy fort gates.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Medieval_battering_ram.JPG/330px-Medieval_battering_ram.JPG'],
 type: 'Breach',
 lethality: 'Structural',
 role: 'Siege',
 era: 'Ancient-Medieval'
 },
 {
 id: 'siege-tower',
 name: 'Siege Tower',
 subtitle: 'The Moving Fort',
 category: 'siege',
 description: 'Wooden towers rolled up to enemy walls to allow troops to storm the ramparts.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Grose-Francis-Pavisors-and-Moveable-Tower-Assaulting-Castle-1812.jpg/500px-Grose-Francis-Pavisors-and-Moveable-Tower-Assaulting-Castle-1812.jpg'],
 type: 'Assault',
 lethality: 'Tactical',
 role: 'Siege',
 era: 'Medieval'
 },
 {
 id: 'catapult',
 name: 'Catapult',
 subtitle: 'The Stone Thrower',
 category: 'siege',
 description: 'Tension-powered siege engines used to hurl stones at walls or over them.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Catapult_1_Mercato_San_Severino.jpg/500px-Catapult_1_Mercato_San_Severino.jpg'],
 type: 'Bombardment',
 lethality: 'High',
 role: 'Siege',
 era: 'Ancient-Medieval'
 },
 {
 id: 'fire-pot',
 name: 'Fire Pot',
 subtitle: 'The Incendiary',
 category: 'siege',
 description: 'Clay pots filled with combustibles, thrown to start fires or burn enemy siege engines.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/f/fb/Carcass_shell.jpg'],
 type: 'Fire',
 lethality: 'High',
 role: 'Defense',
 era: 'All Eras'
 },
 {
 id: 'boiling-oil',
 name: 'Boiling Oil',
 subtitle: 'The Wall Defense',
 category: 'siege',
 description: 'Cauldrons of boiling oil or molten lead poured through murder holes onto attackers.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bodiam_murder_holes.jpg/500px-Bodiam_murder_holes.jpg'],
 type: 'Thermal',
 lethality: 'Horrific',
 role: 'Defense',
 era: 'Medieval'
 },

 // X. DEFENSIVE EQUIPMENT (SURVIVAL)
 {
 id: 'dhal',
 name: 'Dhal',
 subtitle: 'The Shield',
 category: 'defense',
 description: 'Convex circular shield of hide or steel. Four bosses serve as anchor points for the handle and catch blades.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Dhal_%28shield%29%2C_North_India%2C_Mughal_period%2C_17th_century%2C_steel%2C_gold%2C_silk%2C_leather_-_Royal_Ontario_Museum_-_DSC04543.JPG/500px-Dhal_%28shield%29%2C_North_India%2C_Mughal_period%2C_17th_century%2C_steel%2C_gold%2C_silk%2C_leather_-_Royal_Ontario_Museum_-_DSC04543.JPG'],
 type: 'Block',
 lethality: 'N/A',
 role: 'Protection',
 era: 'All Eras'
 },
 {
 id: 'sipar',
 name: 'Sipar',
 subtitle: 'The Steel Shield',
 category: 'defense',
 description: 'A steel shield, often intricately decorated. Heavier than hide shields but offered superior protection against muskets.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Indian_dhal_shield.jpg/500px-Indian_dhal_shield.jpg'],
 type: 'Block',
 lethality: 'N/A',
 role: 'Protection',
 era: '17th Century'
 },
 {
 id: 'katar-shield',
 name: 'Katar Shield',
 subtitle: 'The Weaponized Shield',
 category: 'defense',
 description: 'A small buckler with two projecting blades, often used in conjunction with a dagger.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/O%27Donovan%27s_Shield.png/330px-O%27Donovan%27s_Shield.png'],
 type: 'Parry & Stab',
 lethality: 'Medium',
 role: 'Dueling',
 era: 'Medieval'
 },
 {
 id: 'chainmail',
 name: 'Zirh (Chainmail)',
 subtitle: 'The Steel Mesh',
 category: 'defense',
 description: 'Interlinked steel rings worn as a shirt. Flexible protection against cuts, though vulnerable to piercing.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mail_shirt%2C_apparently_European_-_Glenbow_Museum_-_DSC00708.JPG/500px-Mail_shirt%2C_apparently_European_-_Glenbow_Museum_-_DSC00708.JPG'],
 type: 'Armor',
 lethality: 'N/A',
 role: 'Protection',
 era: 'Medieval'
 },
 {
 id: 'plate-armor',
 name: 'Plate Armor (Chilta)',
 subtitle: 'The Iron Skin',
 category: 'defense',
 description: 'Rigid steel plates, often combined with mail (plated mail), offering maximum protection for heavy cavalry.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Italian_-_Sallet_-_Walters_51580.jpg/330px-Italian_-_Sallet_-_Walters_51580.jpg'],
 type: 'Armor',
 lethality: 'N/A',
 role: 'Protection',
 era: '16th-18th Century'
 },
 {
 id: 'helmet',
 name: 'Kulah-khud',
 subtitle: 'The Steel Bowl',
 category: 'defense',
 description: 'Bowl-shaped helmet with a nose guard and chainmail aventail to protect the neck.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Helmet_MET_DP152944.jpg/500px-Helmet_MET_DP152944.jpg'],
 type: 'Head Protection',
 lethality: 'N/A',
 role: 'Protection',
 era: 'Medieval'
 },

 // XI. CAVALRY & WAR GEAR
 {
 id: 'lance-cavalry',
 name: 'Cavalry Lance',
 subtitle: 'The Charge Weapon',
 category: 'cavalry',
 description: 'Long bamboo or steel lance used for the initial shock charge.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Warring_States_Bronze_Pi.jpg/500px-Warring_States_Bronze_Pi.jpg'],
 type: 'Shock',
 lethality: 'Extreme',
 role: 'Cavalry',
 era: 'Medieval'
 },
 {
 id: 'stirrups',
 name: 'War Stirrups',
 subtitle: 'The Foundation',
 category: 'cavalry',
 description: 'Heavy iron stirrups allowed a rider to stand and deliver powerful blows without losing balance.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Toweroflondonstirrup10thcentury.jpg/330px-Toweroflondonstirrup10thcentury.jpg'],
 type: 'Gear',
 lethality: 'N/A',
 role: 'Stability',
 era: 'Medieval'
 },
 {
 id: 'saddle-blade',
 name: 'Saddle Blade',
 subtitle: 'The Horse\'s Fang',
 category: 'cavalry',
 description: 'Blades attached to the saddle to cut enemy infantry who get too close.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/French_Navy_sabre_img_3012b.jpg/330px-French_Navy_sabre_img_3012b.jpg'],
 type: 'Defense',
 lethality: 'High',
 role: 'Area Denial',
 era: 'Medieval'
 },
 {
 id: 'horse-armor',
 name: 'Bakhter (Horse Armor)',
 subtitle: 'The Mount\'s Shield',
 category: 'cavalry',
 description: 'Lamellar or mail armor for war horses, protecting them from arrows and sword cuts.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Italian_-_Chamfron_-_Walters_511368.jpg/500px-Italian_-_Chamfron_-_Walters_511368.jpg'],
 type: 'Protection',
 lethality: 'N/A',
 role: 'Cavalry',
 era: 'Medieval'
 },
 {
 id: 'war-banner',
 name: 'War Banner',
 subtitle: 'The Rally Point',
 category: 'cavalry',
 description: 'Symbols of the clan or deity. Protecting the banner was a matter of honor; losing it signaled defeat.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Indian_Army.svg/250px-Flag_of_Indian_Army.svg.png'],
 type: 'Morale',
 lethality: 'Psychological',
 role: 'Command',
 era: 'All Eras'
 },

 // XII. WAR ANIMALS & MOUNTED WARFARE
 {
 id: 'war-horse',
 name: 'Marwari War Horse',
 subtitle: 'The Desert Steed',
 category: 'animals',
 description: 'Indigenous breed known for inward-turning ear tips and incredible endurance. Bred for battle.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Marwari_Filly_at_the_Kentucky_Horse_park_%287998150435%29.jpg/330px-Marwari_Filly_at_the_Kentucky_Horse_park_%287998150435%29.jpg'],
 type: 'Mount',
 lethality: 'High',
 role: 'Mobility',
 era: 'All Eras'
 },
 {
 id: 'war-elephant',
 name: 'War Elephant',
 subtitle: 'The Living Tank',
 category: 'animals',
 description: 'Armored elephants used to trample infantry and smash gates. The ultimate shock weapon.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Death_of_Eleazer.jpg/500px-Death_of_Eleazer.jpg'],
 type: 'Siege Breaker',
 lethality: 'Extreme',
 role: 'Shock',
 era: 'Ancient-Medieval'
 },
 {
 id: 'tusk-blade',
 name: 'Tusk Blades',
 subtitle: 'The Ivory Swords',
 category: 'animals',
 description: 'Swords attached to elephant tusks. Turned a head swipe into a multi-kill scythe.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Elephant_sword_at_Met.jpg/500px-Elephant_sword_at_Met.jpg'],
 type: 'Slash',
 lethality: 'Horrific',
 role: 'Anti-Infantry',
 era: 'Medieval'
 },
 {
 id: 'elephant-tower',
 name: 'Howdah',
 subtitle: 'The Mobile Fort',
 category: 'animals',
 description: 'A fortified seat on an elephant, carrying archers or commanders above the melee.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/The_Viceroy%27s_Howdah_at_Viceregal_Lodge%2C_Simla.jpg/500px-The_Viceroy%27s_Howdah_at_Viceregal_Lodge%2C_Simla.jpg'],
 type: 'Platform',
 lethality: 'N/A',
 role: 'Command',
 era: 'Medieval'
 },

 // XIII. RITUAL, SYMBOLIC & CEREMONIAL WEAPONS
 {
 id: 'shakti',
 name: 'Shakti',
 subtitle: 'The Divine Spear',
 category: 'ritual',
 description: 'A ritual spear associated with Goddess Durga. Worshipped during weapon consecration ceremonies.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Vel_spear_murugan_karthikeyan_kurunji_aandavar_temple_kodaikaanal.jpg/250px-Vel_spear_murugan_karthikeyan_kurunji_aandavar_temple_kodaikaanal.jpg'],
 type: 'Divine',
 lethality: 'Symbolic',
 role: 'Worship',
 era: 'Ancient'
 },
 {
 id: 'sacred-sword',
 name: 'Sacred Sword',
 subtitle: 'The Ancestral Blade',
 category: 'ritual',
 description: 'Swords passed down for generations, believed to hold the spirit of ancestors. Rarely used in battle.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Espadon-Morges.jpg/330px-Espadon-Morges.jpg'],
 type: 'Relic',
 lethality: 'N/A',
 role: 'Heritage',
 era: 'All Eras'
 },
 {
 id: 'victory-standard',
 name: 'Vijay Stambh',
 subtitle: 'The Victory Pillar',
 category: 'ritual',
 description: 'While not a handheld weapon, these monuments were the ultimate declaration of martial dominance.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tower_of_victory.jpg/500px-Tower_of_victory.jpg'],
 type: 'Monument',
 lethality: 'N/A',
 role: 'Symbol',
 era: 'Medieval'
 },
 {
 id: 'temple-weapon',
 name: 'Temple Weapon',
 subtitle: 'The Blessed Arm',
 category: 'ritual',
 description: 'Weapons kept in temples, blessed by priests, and brought out only for defense of the faith.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Blessed_Sword_of_Francesco_Foscari.PNG/250px-Blessed_Sword_of_Francesco_Foscari.PNG'],
 type: 'Sacred',
 lethality: 'High',
 role: 'Religious War',
 era: 'All Eras'
 },
 {
 id: 'coronation-blade',
 name: 'Raj Tilak Sword',
 subtitle: 'The Kingmaker',
 category: 'ritual',
 description: 'The sword used during the coronation ceremony. To touch it is to accept the burden of ruling.',
 images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Szczerbiec_reverse_retouched.jpg/330px-Szczerbiec_reverse_retouched.jpg'],
 type: 'Ceremonial',
 lethality: 'N/A',
 role: 'Authority',
 era: 'All Eras'
 }
];

export default function WeaponsPage() {
 const [activeSection, setActiveSection] = useState('bladed');
 const [selectedWeapon, setSelectedWeapon] = useState<(typeof rajputanaWeapons[number]) | null>(null);
 const { t, speak, stopSpeaking, isSpeaking } = useLanguage();
 const [isListening, setIsListening] = useState(false);

 // Reset isListening when speaking stops
 useEffect(() => {
 if (!isSpeaking && isListening) {
 setIsListening(false);
 }
 }, [isSpeaking, isListening]);

 const handleListen = (text: string) => {
 if (isSpeaking) {
 stopSpeaking();
 setIsListening(false);
 } else {
 speak(text);
 setIsListening(true);
 }
 };

 // Scroll spy to update active section in sidebar
 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 setActiveSection(entry.target.id);
 }
 });
 },
 { rootMargin: '-20% 0px -60% 0px' }
 );

 weaponCategories.forEach((cat) => {
 const element = document.getElementById(cat.id);
 if (element) observer.observe(element);
 });

 return () => observer.disconnect();
 }, []);

 const scrollToSection = (id: string) => {
 const element = document.getElementById(id);
 if (element) {
 element.scrollIntoView({ behavior: 'smooth' });
 setActiveSection(id);
 }
 };

 return (
 <div className="min-h-screen bg-[#12100e] text-[#d4c5b0] font-sans selection:bg-[#8b0000] selection:text-white">
 
 {/* Hero Section */}
 <Hero
 title={t('weapons.title')}
 subtitle={t('weapons.subtitle')}
 description={t('weapons.description')}
 backgroundImage="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=2069&auto=format&fit=crop"
 />

 <div className="flex relative max-w-[1920px] mx-auto">
 {/* Sidebar - Vertical Arsenal Index (Desktop) */}
 <aside className="hidden lg:block w-80 h-screen sticky top-0 border-r border-[#3a302c] bg-[#161412] p-8 overflow-y-auto z-40 scrollbar-thin scrollbar-thumb-[#3a302c] scrollbar-track-transparent">
 <div className="mb-12 pt-8">
 <h2 className="text-[#8b0000] font-bold tracking-[0.3em] text-xs mb-2 uppercase">
 {t('weapons.sidebarTitle')}
 </h2>
 <h1 className="text-4xl font-serif text-[#d4c5b0] uppercase leading-none">
 {t('weapons.sidebarSubtitle')}
 </h1>
 <div className="h-px w-full bg-[#3a302c] mt-6"></div>
 </div>
 
 <nav className="space-y-4">
 {weaponCategories.map((cat) => (
 <button
  key={cat.id}
  onClick={() => scrollToSection(cat.id)}
  className={`w-full text-left group transition-all duration-300 ${activeSection === cat.id ? 'pl-4 border-l-2 border-[#8b0000]' : 'pl-0 border-l-2 border-transparent hover:pl-2'}`}
 >
  <span className={`text-[10px] block uppercase tracking-widest mb-1 transition-colors ${activeSection === cat.id ? 'text-[#8b0000]' : 'text-[#5a504a] group-hover:text-[#8b0000]'}`}>
  {cat.name.split('.')[0]}
  </span>
  <span className={`text-sm font-serif uppercase tracking-wider transition-colors ${activeSection === cat.id ? 'text-[#d4c5b0]' : 'text-[#786c61] group-hover:text-[#d4c5b0]'}`}>
  {cat.name.split('. ')[1]}
  </span>
 </button>
 ))}
 </nav>
 </aside>

 {/* Main Content Area */}
 <main className="flex-1 bg-[#12100e] relative">
 {/* Background Texture */}
 <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>

 {/* Mobile Quick Nav */}
 <div className="lg:hidden sticky top-20 z-40 bg-[#12100e]/95 backdrop-blur-md border-b border-[#3a302c] p-4 flex items-center justify-between">
 <span className="text-[#8b0000] text-xs font-bold tracking-widest uppercase">
 {t('weapons.currentSector')}
 </span>
 <span className="text-[#d4c5b0] font-serif uppercase">
 {weaponCategories.find(c => c.id === activeSection)?.name.split('. ')[1] || 'ARMORY'}
 </span>
 </div>

 {/* Weapon Sections */}
 {weaponCategories.map((category) => (
 <section 
 id={category.id} 
 key={category.id} 
 className="min-h-screen py-24 px-4 md:px-12 lg:px-16 border-b border-[#2c241b] relative z-10"
 >
 {/* Section Header */}
 <div className="mb-20 max-w-4xl">
  <span className="text-[#8b0000] font-bold tracking-[0.3em] text-sm block mb-4">SECTION {category.name.split('.')[0]}</span>
  <h2 className="text-5xl md:text-7xl font-serif text-[#d4c5b0] uppercase leading-none mb-8 drop-shadow-lg">
  {category.name.split('. ')[1]}
  </h2>
  <div className="flex items-center gap-4">
  <div className="h-px w-24 bg-[#8b0000]"></div>
  <div className="h-2 w-2 bg-[#8b0000] rotate-45"></div>
  <div className="h-px flex-1 bg-gradient-to-r from-[#3a302c] to-transparent"></div>
  </div>
 </div>

 {/* Weapons Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
  {rajputanaWeapons.filter(w => w.category === category.id).map((weapon) => (
  <div 
  key={weapon.id}
  onClick={() => setSelectedWeapon(weapon)}
  className="group relative bg-gradient-to-b from-[#25201d] to-[#181512] border border-[#443832] hover:border-[#8b0000] transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl shadow-black"
  >
  <div className="relative h-72 md:h-80 w-full overflow-hidden border-b border-[#3a302c] group-hover:border-[#8b0000]/50 transition-colors bg-[#050403] flex items-center justify-center">
  <div className="absolute inset-0 bg-[#12100e]/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
  {weapon.images && weapon.images[0] && weapon.images[0].trim().length > 0 && (
  <OptimizedImage
  src={weapon.images[0]}
  alt={weapon.name}
  className="object-contain object-center grayscale group-hover:grayscale-0"
  strategy="CONTENT"
  responsive
  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
  width={800}
  height={600}
  />
  )}
  <div className="absolute top-4 right-4 z-20">
  <span className="text-[#d4c5b0] text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1 border border-[#3a302c]">
  {weapon.type}
  </span>
  </div>
  </div>

  {/* Card Content */}
  <div className="p-8 relative">
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8b0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  <h3 className="text-2xl font-serif font-bold text-[#d4c5b0] group-hover:text-[#8b0000] transition-colors duration-300 mb-2">
  {weapon.name}
  </h3>
  <p className="text-[#8b0000] text-xs font-bold uppercase tracking-widest mb-4 opacity-80">
  {weapon.subtitle}
  </p>
  
  <p className="text-[#887e76] text-sm leading-relaxed line-clamp-3 mb-6 group-hover:text-[#a89b8c] transition-colors">
  {weapon.description}
  </p>

  <div className="flex justify-between items-end border-t border-[#3a302c] pt-4 mt-auto">
  <div>
  <span className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">Lethality</span>
  <span className="text-[#d4c5b0] text-xs font-mono uppercase">{weapon.lethality}</span>
  </div>
  <div className="text-right">
  <span className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">Era</span>
  <span className="text-[#d4c5b0] text-xs font-mono uppercase">{weapon.era}</span>
  </div>
  </div>
  </div>
  </div>
  ))}
 </div>
 </section>
 ))}
 </main>
 </div>

 {/* Modal - Updated Colors */}
 {selectedWeapon && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
 <div className="absolute inset-0 bg-[#0a0505]/95 backdrop-blur-md" onClick={() => setSelectedWeapon(null)}></div>
 
 <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#161412] border border-[#3a302c] shadow-2xl overflow-y-auto flex flex-col md:flex-row">
 <button 
 onClick={() => setSelectedWeapon(null)}
 className="absolute top-4 right-4 z-50 text-[#786c61] hover:text-[#8b0000] transition-colors"
 >
 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
 </button>

 <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full border-b md:border-b-0 md:border-r border-[#3a302c]">
 {selectedWeapon.images[0] && selectedWeapon.images[0].trim().length > 0 && (
 <OptimizedImage
  src={selectedWeapon.images[0]}
  alt={selectedWeapon.name}
  className="object-cover"
  strategy="HERO"
  responsive
  sizes="(min-width: 768px) 50vw, 100vw"
  width={1200}
  height={800}
 />
 )}
 <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent"></div>
 <div className="absolute bottom-0 left-0 right-0 p-8">
  <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#d4c5b0] mb-2">{selectedWeapon.name}</h2>
  <p className="text-[#8b0000] text-lg uppercase tracking-widest font-bold">{selectedWeapon.subtitle}</p>
 </div>
 </div>

 <div className="w-full md:w-1/2 p-8 md:p-12 text-[#d4c5b0]">
 <div className="flex flex-wrap gap-4 mb-8">
 <div className="bg-[#12100e] px-4 py-2 border border-[#3a302c]">
  <span className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">Lethality</span>
  <span className="text-[#8b0000] font-bold uppercase">{selectedWeapon.lethality}</span>
 </div>
 <div className="bg-[#12100e] px-4 py-2 border border-[#3a302c]">
  <span className="block text-[10px] text-[#5a504a] uppercase tracking-wider mb-1">Role</span>
  <span className="text-[#d4c5b0] font-bold uppercase">{selectedWeapon.role}</span>
 </div>
 </div>

 <div className="prose prose-invert max-w-none">
 <p className="text-lg leading-relaxed mb-8 font-light text-[#a89b8c]">{selectedWeapon.description}</p>
 
 <button
  onClick={(e) => {
  e.stopPropagation();
  handleListen(`${selectedWeapon.name}. ${selectedWeapon.subtitle}. ${selectedWeapon.description}`);
  }}
  className={`mb-8 px-6 py-3 border border-[#8b0000] text-sm font-bold uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 ${
  isListening
  ? 'bg-[#8b0000] text-white'
  : 'text-[#8b0000] hover:bg-[#8b0000] hover:text-white'
  }`}
 >
  {isListening ? (
  <>
  <span>Stop Narration</span>
  <span className="animate-pulse">●</span>
  </>
  ) : (
  <>
  <span>Listen to History</span>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
  </>
  )}
 </button>

 <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#3a302c] to-transparent"></div>
 
 <h3 className="text-xl font-serif text-[#d4c5b0] mb-4 flex items-center gap-3">
  <span className="w-1 h-6 bg-[#8b0000]"></span>
  Battlefield Significance
 </h3>
 <p className="text-[#786c61] mb-6 italic">
  {`"A weapon is not merely steel; it is the extension of the warrior's will. The ${selectedWeapon.name} was forged to dominate the battlefield of ${selectedWeapon.era}."`}
 </p>

 <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#3a302c]">
  <div>
  <h4 className="text-[#8b0000] text-[10px] font-bold uppercase tracking-widest mb-2">Era</h4>
  <p className="font-mono text-sm text-[#d4c5b0]">{selectedWeapon.era}</p>
  </div>
  <div>
  <h4 className="text-[#8b0000] text-[10px] font-bold uppercase tracking-widest mb-2">Origin</h4>
  <p className="font-mono text-sm text-[#d4c5b0]">Rajputana</p>
  </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}

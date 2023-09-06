// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('peppers', [
        {
      name: 'Bell Pepper',
      description: 'Relatively large in size, the bell-shaped pepper in its immature state is green with a slightly bitter flavor. As it matures, it turns bright red and becomes sweeter. You can also find yellow, orange, white, pink, and even purple varieties. With their high water content, bell peppers will add moisture to any dish. They are also great for adding color.',
      heat: '0',
      origin: 'Central and South America',
      colors: 'Green, red, yellow, orange'

     },
        {
      name: 'Poblano',
      description: 'Somewhat large and heart-shaped, the poblano is common in Mexican dishes such as chiles rellenos. Are poblano peppers spicy? Yes, but only mildly spicy. At maturity, the poblano turns dark red-brown and can be dried, at which point it is referred to as an ancho or mulato. Anchos have a rich, raisin-like sweetness. The high yield of flesh to skin makes anchos great for sauces.',
      heat: '1000-2000',
      origin: 'Puebla, Mexico',
      colors: 'Green, red'

     },
        {
      name: 'Jalapeño',
      description: 'This Mexican pepper is typically plucked from the vine while still green. If allowed to ripen more, they will turn red and take on a slightly fruity flavored. Jalapeños are a tasty ingredient commonly used to in salsa and sauces. When dried, a jalapeño is called a chipotle. Smoke-dried chipotles come in two varieties: meco (mellow) and moritas (spicier). Smoky, woodsy, and spicy, chipotles are the perfect ingredient for salsas, sauces, escabeche, and adobo.',
      heat: '3500-8000',
      origin: 'Mexico',
      colors: 'Green, red, yellow'

     },
        {
      name: 'Serrano',
      description: 'Just a couple of inches long, with a tapered end, this small pepper packs quite a bit of heat. Beware: The smaller the pepper, the hotter it is. When ripe, serranos are red or yellowish orange—they can be cooked in both their ripe and unripe states. Serranos are common in Mexican and Thai cooking.',
      heat: '6000-23000',
      origin: 'Puebla / Hidalgo, Mexico',
      colors: 'Green, red, brown, orange, yellow'

     },
        {
      name: 'Habanero',
      description: `Small and bulbous, this chile, in the same family as the Scotch bonnet, is one of the hottest on the Scoville scale. If you can get past the heat, habañeros also have a fruity flavor. They are popular on Mexico's Yucatan Peninsula and in the Caribbean, where they are used to make hot sauces.`,
      heat: '150000-350000',
      origin: 'Amazon, South America',
      colors: 'Green, red, yellow, orange'

     },
        {
      name: 'Cayenne',
      description: 'Slender and tapered, this chile is probably most familiar in its dried, ground form—the powder known as cayenne pepper. Ground cayenne pepper is a main ingredient in the chili powder that flavors Tex-Mex dishes such as chili con carne. It is one of the spiciest types of peppers!',
      heat: '30000-50000',
      origin: 'Cayenne, French Guiana',
      colors: 'Green, red, yellow, orange, purple.'

     },
        {
     name: "Tabasco",
     description: "Best known for the sauce that bears its name, this pepper grows throughout the world. At maturity, the pepper measures one to two inches and is bright red. To create the famous tabasco sauce, the pepper is smashed and combined with salt and vinegar, which tempers the pepper's heat (the Scoville rating of tabasco sauce is 2,500 to 5,000 — a mere fraction of its rating as a pepper).",
     heat: "Scoville Units - 30,000-60,000",
     origin: "Origin - Tabasco, Mexico",
     colors: "Colors - Green, orange, red"
   },
        {
     name: "Chilaca (Pasilla)",
     description: "Black and wrinkly, chilacas boast a prune-like flavor with a hint of licorice. 'Chilaca' is an Aztec term meaning old or gray-haired, which is fitting given the pepper's wrinkly appearance. When dried, the chilaca is called a pasilla or chile negro, and is toasted or soaked and blended into sauces, often combined with fruit.",
     heat: "Scoville Units - 1500-2500",
     origin: "Origin - Mexico",
     colors: "Colors - Dark-reddish brown"
   },
        {
     name: "Banana Pepper",
     description: "This mild yet tangy pepper adds a kick to pizza or sandwiches. This pepper usually takes on a bright yellow hue as it ripens, but occasionally grows to be red, orange, or green instead.",
     heat: "Scoville Units - 0-500",
     origin: "Origin - Hungary",
     colors: "Colors - Pale yellow"
   },
        {
     name: "Shishito",
     description: "Harvested while still green, these thin-walled peppers can be pan-seared and eaten on their own. They can also be added to pizza or to flavor dishes. The riper the shishito, the spicier the pepper.",
     heat: "Scoville Units - 50-200",
     origin: "Origin - Japan",
     colors: "Colors - Green, red"
   },
        {
     name: "Scotch Bonnet",
     description: "This spicy pepper is called a scotch bonnet thanks to its resemblance to the caps men wear in Scotland (tam o' shanter hats, to be precise). It's the hottest pepper in the Caribbean and used to flavor all sorts of island dishes, including jerk chicken. Though the pepper is most often spicy, you will occasionally find a sweet variety, called cachucha.",
     heat: "Scoville Units - 80,000-400,000",
     origin: "Origin - Jamaica",
     colors: "Colors - Green, yellow, orange, red"
   },
        {
     name: "Ghost Pepper",
     description: "AKA Bhut naga jolokia, bhut jolokia, naga jolokia, ghost chili, U-morok, ghost jolokia, and red naga, ghost chile peppers are small, grooved pods, averaging 5 to 7 centimeters in length, and have a conical, curved to straight shape that tapers to a distinct point on the non-stem end. The pods will widely vary in shape, size, and spice, depending on the soil and climate the pepper is grown in. The skin is waxy and semi-rough, covered in deep furrows and wrinkles, giving it a crinkled, bumpy appearance, and ripens from green to bright red when mature. Underneath the thin skin, the flesh is crisp and pale red, encasing a central cavity filled with very spicy membranes and round, flat, cream-colored seeds. Red ghost chile peppers are initially sweet, fruity, and smoky, followed by a scorching heat that builds in intensity and lingers on the palate.",
     heat: "Scoville Units - 1,000,000+",
     origin: "Origin - Northeast India",
     colors: "Colors - Dark green, yellow, orange, red, brown, peach"
   },
        {
     name: "Chile de arbol",
     description: "Chiles de Arbol means 'tree chili' in Spanish. Other names for this pepper include bird's beak chilies or rat's tail chilies. The Chile de Arbol is a small, thin Mexican pepper that has a smoky grassy characteristic with an acidic heat, that is about 6 times hotter than a jalapeño pepper.",
     heat: "Scoville Units - 30,000-65,000",
     origin: "Origin - Jalisco / Oaxaca, Mexico",
     colors: "Colors - Red, dark red"
   },
        {
     name: "Pequin",
     description: "Pequin are very small peppers that are said to have a smoky, nutty, and citrusy flavor. They are a hotter variety of pepper even though they are small. The Piquin is said to be about 13 times hotter than the jalapeno and ranges between 100,000 and 140,000 on the Scoville Scale. Like most other chili peppers they start out green and then turn red as they ripen.",
     heat: "Scoville Units - 100,000-140,000",
     origin: "Origin - Tabasco, Mexico",
     colors: "Colors - Green, red, yellow"
   },
        {
     name: "Carolina Reaper",
     description: "The Carolina Reaper is a cultivar of the Capsicum chinense plant. Developed by American breeder Ed Currie, the pepper is red and gnarled, with a bumpy texture and small pointed tail. In 2013, Guinness World Records declared it the hottest chili pepper in the world.",
     heat: "Scoville Units - 2,200,000",
     origin: "Origin - Rock Hill, South Carolina",
     colors: "Colors - Red, green, yellow"
   },
        {
     name: "Guajillo",
     description: "Guajillo chiles have leathery skin and a dark reddish-brown color. This dried pepper is about 1 inch wide and 3-6 inches long with an elongated shape that tapers to a point. The best quality Guajillo chiles will have shiny, smooth skin that is still pliable. Pliability indicates freshness. Older Guajillo chiles will look dusty and will crack when bent. Guajillo chiles are the second-most used chile in Mexican cuisine. They are one of the famous holy trinity of chiles used in Mexican moles, along with Ancho and Pasilla chiles. This chile is used more for its flavor than its heat. However, if you like your chiles on the slightly sweeter side, you will find the chile Guajillo an excellent pepper to experiment with in your kitchen.",
     heat: "Scoville Units - 2,500-5,000",
     origin: "Origin - Mexico",
     colors: "Colors - Dark red, brown"
       
   },
        {
     name: "Trinidad Scorpion",
     description: "The Trinidad Scorpion pepper is a chili pepper hailing from the Caribbean. It is native to Trinidad and Tobago. These red, wrinkled peppers sport tails that resemble the scorpion, hence the name, and are known for their intense heat.",
     heat: "Scoville Units - 100,000-140,000",
     origin: "Origin - Trinidad and Tobago, Caribbean",
     colors: "Colors - Green, red, yellow, brown"
   },
        {
     name: "Sugar Rush Peach Pepper",
     description: "Sugar Rush Peach peppers have a very descriptive name. They are sweet, the plants grow quickly, and they have a peachy color when mature. This makes the pepper very desirable for home gardeners. The Sugar Rush Peach pepper comes from the Capsicum baccatum species of peppers. This species is confirmed to have origins in either Peru or Bolivia. Commonly referred to as Aji peppers, they are now cultivated across South America and in Costa Rica. In the US, Aji peppers are grown in small numbers due to the overwhelming demand for other pepper varieties. However, it is very easy to grow them in your own home garden. Sugar Rush Peach peppers are now much more common for United States gardeners due to the plant's favorable characteristics.",
     heat: "Scoville Units - 50,000-100,000",
     origin: "Origin - Peru / Bolivia",
     colors: "Colors - Yellow, pale yellow, peach, light orange"
   },
        {
     name: "Bird's Eye Chili (Prik Kee Noo)",
     description: "Bird's eye chili peppers, sometimes called Thai chiles, are frequently used to add spice in Southeast Asian cuisine. The small chiles grow on small bushes in hot weather climates. Raw, dried, or cooked, the small but potent peppers pack real heat and are used to add spice to dishes or to make fiery sauces.",
     heat: "Scoville Units - 90,000",
     origin: "Origin - Vietnam, Cambodia, Thailand, Philippines",
     colors: "Colors - Red, green, yellow, orange"
   },
        {
     name: "Thai Jinda Chili (Prik Jinda)",
     description: "Prik jinda is a slender and elongated chili considered medium-hot in Thailand. Sold in fresh markets throughout the country, the green and red varieties are commonly mixed together and used in medium-spiced dishes. This chili comes in both red and green and is very spicy. Prik jinda gives dishes heat and flavor that the Thai refer to as 'green flavor,' best described as a fresh, grassy aroma.",
     heat: "Scoville Units - 75,000",
     origin: "Origin - Thailand",
     colors: "Colors - Red, green"
   },
        {
     name: "Thai Red Chili (Prik Kee Noo)",
     description: "A very spicy chili with slim pods, commonly used in Asian cooking, the chili cultivar 'Prik Kee Noo' is the typical chili pepper for Thai cuisine. Its fruits are extremely hot, reaching about 50,000 Scoville, though they only reach a length of 1-4 cm. In Thailand, they are either eaten raw or cooked.",
     heat: "Scoville Units - 110,000",
     origin: "Origin - Thailand",
     colors: "Colors - Red, green"
   }
 
    
    
    ], {});
    
  // },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

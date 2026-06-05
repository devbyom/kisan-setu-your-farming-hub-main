export interface CropPrice {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  change: number;
  state: string;
  district: string;
  lastUpdated: string;
  history: number[];
}

export const states = [
  "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Maharashtra", 
  "Punjab", "Haryana", "Bihar", "Gujarat", "Karnataka", "Tamil Nadu"
];

export const districts: Record<string, string[]> = {
  "Uttar Pradesh": ["Varanasi", "Lucknow", "Agra", "Kanpur", "Allahabad"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Maharashtra": ["Pune", "Nagpur", "Nashik", "Aurangabad", "Kolhapur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Haryana": ["Karnal", "Hisar", "Rohtak", "Panipat", "Ambala"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "Gujarat": ["Ahmedabad", "Rajkot", "Surat", "Vadodara", "Junagadh"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Belgaum", "Davangere"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
};

export const cropPrices: CropPrice[] = [
  { id: "1", name: "Wheat", nameHi: "गेहूं", emoji: "🌾", currentPrice: 2140, minPrice: 2015, maxPrice: 2275, change: 3.2, state: "Uttar Pradesh", district: "Varanasi", lastUpdated: "2 घंटे पहले", history: [1980,2010,2030,2015,2050,2080,2060,2100,2090,2110,2130,2120,2140,2135,2150,2130,2160,2140,2170,2155,2180,2160,2190,2175,2140,2120,2150,2130,2140,2140] },
  { id: "2", name: "Rice", nameHi: "चावल", emoji: "🍚", currentPrice: 3850, minPrice: 3600, maxPrice: 4100, change: -1.5, state: "Punjab", district: "Ludhiana", lastUpdated: "1 घंटा पहले", history: [3900,3880,3860,3850,3870,3890,3880,3860,3840,3830,3850,3870,3860,3840,3830,3850,3870,3880,3860,3840,3850,3870,3860,3850,3840,3850,3860,3850,3840,3850] },
  { id: "3", name: "Tomato", nameHi: "टमाटर", emoji: "🍅", currentPrice: 4200, minPrice: 2800, maxPrice: 5500, change: 12.5, state: "Maharashtra", district: "Nashik", lastUpdated: "30 मिनट पहले", history: [3200,3400,3500,3600,3550,3700,3800,3750,3900,4000,3950,4100,4050,4200,4150,4300,4250,4400,4350,4500,4450,4400,4350,4300,4250,4200,4250,4200,4150,4200] },
  { id: "4", name: "Onion", nameHi: "प्याज", emoji: "🧅", currentPrice: 1850, minPrice: 1200, maxPrice: 2400, change: -5.3, state: "Maharashtra", district: "Nashik", lastUpdated: "1 घंटा पहले", history: [2100,2050,2000,1980,1950,1920,1900,1880,1860,1840,1850,1870,1860,1840,1830,1850,1870,1860,1840,1850,1870,1860,1850,1840,1850,1860,1850,1840,1850,1850] },
  { id: "5", name: "Potato", nameHi: "आलू", emoji: "🥔", currentPrice: 1420, minPrice: 1100, maxPrice: 1800, change: 2.1, state: "Uttar Pradesh", district: "Agra", lastUpdated: "3 घंटे पहले", history: [1350,1360,1370,1380,1390,1400,1380,1390,1400,1410,1400,1410,1420,1410,1420,1430,1420,1410,1420,1430,1420,1410,1420,1430,1420,1410,1420,1430,1420,1420] },
  { id: "6", name: "Soybean", nameHi: "सोयाबीन", emoji: "🫘", currentPrice: 4650, minPrice: 4200, maxPrice: 5100, change: 4.8, state: "Madhya Pradesh", district: "Indore", lastUpdated: "2 घंटे पहले", history: [4300,4350,4400,4380,4420,4450,4430,4470,4500,4480,4520,4550,4530,4560,4580,4570,4600,4580,4620,4600,4630,4620,4640,4630,4650,4640,4650,4660,4650,4650] },
  { id: "7", name: "Cotton", nameHi: "कपास", emoji: "☁️", currentPrice: 6200, minPrice: 5800, maxPrice: 6800, change: 1.9, state: "Gujarat", district: "Rajkot", lastUpdated: "4 घंटे पहले", history: [6000,6020,6050,6030,6060,6080,6070,6100,6090,6120,6110,6140,6130,6150,6140,6160,6150,6170,6160,6180,6170,6190,6180,6200,6190,6200,6210,6200,6190,6200] },
  { id: "8", name: "Mustard", nameHi: "सरसों", emoji: "🌼", currentPrice: 5100, minPrice: 4700, maxPrice: 5500, change: -2.8, state: "Rajasthan", district: "Jaipur", lastUpdated: "2 घंटे पहले", history: [5300,5280,5260,5250,5230,5210,5200,5180,5170,5150,5140,5130,5120,5110,5100,5120,5110,5100,5090,5100,5110,5100,5090,5100,5110,5100,5090,5100,5100,5100] },
  { id: "9", name: "Sugarcane", nameHi: "गन्ना", emoji: "🎋", currentPrice: 3150, minPrice: 2900, maxPrice: 3400, change: 0.5, state: "Uttar Pradesh", district: "Lucknow", lastUpdated: "5 घंटे पहले", history: [3100,3110,3120,3110,3120,3130,3120,3130,3140,3130,3140,3150,3140,3150,3140,3150,3140,3150,3160,3150,3140,3150,3160,3150,3140,3150,3160,3150,3140,3150] },
  { id: "10", name: "Chana", nameHi: "चना", emoji: "🟤", currentPrice: 5450, minPrice: 5000, maxPrice: 5900, change: 6.2, state: "Madhya Pradesh", district: "Bhopal", lastUpdated: "1 घंटा पहले", history: [5100,5120,5150,5180,5200,5220,5250,5230,5260,5280,5300,5320,5350,5330,5360,5380,5400,5380,5410,5390,5420,5400,5430,5420,5440,5430,5450,5440,5450,5450] },
];

export const mandiTicker = [
  "🌾 गेहूं ₹2,140/क्विं (वाराणसी) ↑3.2%",
  "🍚 चावल ₹3,850/क्विं (लुधियाना) ↓1.5%",
  "🍅 टमाटर ₹4,200/क्विं (नासिक) ↑12.5%",
  "🧅 प्याज ₹1,850/क्विं (नासिक) ↓5.3%",
  "🥔 आलू ₹1,420/क्विं (आगरा) ↑2.1%",
  "🫘 सोयाबीन ₹4,650/क्विं (इंदौर) ↑4.8%",
  "☁️ कपास ₹6,200/क्विं (राजकोट) ↑1.9%",
  "🌼 सरसों ₹5,100/क्विं (जयपुर) ↓2.8%",
];

export const formatIndianPrice = (num: number): string => {
  const str = num.toString();
  if (str.length <= 3) return str;
  let lastThree = str.substring(str.length - 3);
  let otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};

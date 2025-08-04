// Varyadle word list - easily editable collection of 5-letter words
// Words should relate to Varya or be generally positive/bright themed
export const WORD_LIST = [
  "VARYA",
  "DANCE",
  "DREAM",
  "JEANS",
  "DENIM",
  "LILAC",
  "POOKIE",
  "POOKS",
  "PEONY",
  "MOANA",
  "CAPTAIN AMERICA",
  "STEVE ROGERS",
  "BEST VB SERVER",
  "AMAZING",
  "SPIDERMAN",
  "TOM HOLLAND",
  "BILLIE EILISH",
  "SPORTSCAR",
  "TATE MCRAE",
  "GORGEOUS",
  "BEAUTIFUL",
  "HOT AF",
  "BIG BUTT",
  "TIRAMISU",
];

// Simple deterministic pseudo-random number generator (Mulberry32)
// Source: https://stackoverflow.com/questions/521295/javascript-need-a-random-number-between-two-numbers
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t = (t ^ t >>> 7) + (t ^ t >>> 15);
    return ((t ^ t >>> 16) >>> 0) / 4294967296;
  };
}

// Get the word for a specific date
export const getWordOfTheDay = (date: Date = new Date()): string => {
  // Use UTC year, month, and day to create a consistent seed globally
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-11
  const day = date.getUTCDate(); // 1-31
  
  // Create a seed based on the date that will be consistent
  const seed = year * 10000 + month * 100 + day;
  
  // Use the deterministic PRNG to get a consistent random number
  const random = mulberry32(seed);
  const index = Math.floor(random() * WORD_LIST.length);
  
  // return "BEST VB SERVER"
  return WORD_LIST[index]
}
  // Utility to get word for a specific date string (YYYY-MM-DD)
export const getWordForDate = (dateString: string): string => {
  // Ensure date string is parsed as UTC to maintain consistency
  const date = new Date(dateString + 'T00:00:00Z'); 
  return getWordOfTheDay(date);
};

// Get the current word (for today)
export const getCurrentWord = (): string => {
  // Get current date in UTC to ensure global consistency for "today"
  const now = new Date();
  const todayUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  return getWordOfTheDay(todayUtc);
};
// Russian-style number formatting: spaces as thousand separators, comma for decimal
export const formatRUB = (value: number, withSymbol: boolean = true): string => {
  const parts = value.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const decimalPart = parts[1];
  
  const formatted = `${integerPart},${decimalPart}`;
  return withSymbol ? `${formatted} ₽` : formatted;
};

// Simple percent formatter
export const formatPercent = (value: number): string => {
  const sign = value > 0 ? '+' : value < 0 ? '− ' : ''; // using mathematical minus
  return `${sign} ${Math.abs(value).toString().replace('.', ',')} %`.trim();
};

export const COLORS = [
  '#34D399', // Emerald 400 (Stocks - Greenish)
  '#F97316', // Orange 500 (Blocked - Orange)
  '#38BDF8', // Sky 400 (Bonds - Blue)
  '#C084FC', // Purple 400 (Funds)
  '#F87171', // Red 400 (Structured)
  '#2DD4BF', // Teal 400 (Futures)
  '#EF4444', // Red 500 (Index example)
  '#EAB308', // Yellow 500
  '#818CF8', // Indigo 400
  '#FB7185', // Rose 400
  '#A78BFA', // Violet 400
];

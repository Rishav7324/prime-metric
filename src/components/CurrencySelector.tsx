'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const CurrencySelector = ({ value, onChange, label = "Currency", className = "" }: CurrencySelectorProps) => {
  const selectedCurrency = currencies.find(c => c.code === value);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="currency">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="currency" className="w-full">
          <SelectValue>
            {selectedCurrency && `${selectedCurrency.symbol} ${selectedCurrency.code} - ${selectedCurrency.name}`}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.symbol} {currency.code} - {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const getCurrencySymbol = (code: string): string => {
  return currencies.find(c => c.code === code)?.symbol || "$";
};

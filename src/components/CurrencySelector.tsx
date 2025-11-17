'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const currencies = [
  { value: "USD", label: "USD - US Dollar", symbol: "$" },
  { value: "EUR", label: "EUR - Euro", symbol: "€" },
  { value: "JPY", label: "JPY - Japanese Yen", symbol: "¥" },
  { value: "GBP", label: "GBP - British Pound", symbol: "£" },
  { value: "AUD", label: "AUD - Australian Dollar", symbol: "A$" },
  { value: "CAD", label: "CAD - Canadian Dollar", symbol: "C$" },
  { value: "CHF", label: "CHF - Swiss Franc", symbol: "CHF" },
  { value: "CNY", label: "CNY - Chinese Yuan", symbol: "¥" },
  { value: "INR", label: "INR - Indian Rupee", symbol: "₹" },
];

export const getCurrencySymbol = (currencyCode: string) => {
  const currency = currencies.find(c => c.value === currencyCode);
  return currency ? currency.symbol : "$";
};

type CurrencySelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 text-base">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            {currency.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

import DiceRollerClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Dice Roller",
    description: "Roll virtual dice with customizable sides",
    keywords: "dice roller, roll dice, d&d dice, rpg dice, random number generator",
    canonicalUrl: "/other-calculators/dice-roller",
});

export default function DiceRollerPage() {
    return <DiceRollerClient />;
}

'use client';
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Dices } from "lucide-react";

const DiceRollerClient = () => {
  const [numDice, setNumDice] = useState("1");
  const [sides, setSides] = useState("6");
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const roll = () => {
    const dice = parseInt(numDice);
    const numSides = parseInt(sides);
    
    if (isNaN(dice) || dice <= 0 || dice > 100) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid number of dice (1-100).",
      });
      return;
    }

    const rolls: number[] = [];
    for (let i = 0; i < dice; i++) {
      rolls.push(Math.floor(Math.random() * numSides) + 1);
    }
    
    setResults(rolls);
    setTotal(rolls.reduce((a, b) => a + b, 0));
    toast({
        title: "Dice Rolled!",
        description: `You rolled ${dice}d${numSides} for a total of ${rolls.reduce((a, b) => a + b, 0)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Dice Roller"
      description="Roll virtual dice with customizable sides"
      keywords="dice roller, roll dice, d&d dice, rpg dice, random number generator"
      canonicalUrl="/other-calculators/dice-roller"
      explanation="This tool simulates rolling dice with any number of sides. Perfect for games, decision making, or random number generation."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Number of Dice</Label>
              <Input
                type="number"
                value={numDice}
                onChange={(e) => setNumDice(e.target.value)}
                placeholder="1"
                min="1"
                max="100"
              />
            </div>
            <div>
              <Label>Sides per Die</Label>
              <Select value={sides} onValueChange={setSides}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">D4 (4 sides)</SelectItem>
                  <SelectItem value="6">D6 (6 sides)</SelectItem>
                  <SelectItem value="8">D8 (8 sides)</SelectItem>
                  <SelectItem value="10">D10 (10 sides)</SelectItem>
                  <SelectItem value="12">D12 (12 sides)</SelectItem>
                  <SelectItem value="20">D20 (20 sides)</SelectItem>
                  <SelectItem value="100">D100 (100 sides)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={roll} className="w-full gradient-button h-12">
            <Dices className="w-5 h-5 mr-2" />
            Roll Dice
          </Button>
          {results.length > 0 && (
            <div className="mt-6 space-y-4">
               <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-5xl font-bold text-primary">{total}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Individual Rolls:</p>
                <div className="flex flex-wrap gap-3">
                  {results.map((result, idx) => (
                    <span key={idx} className="text-2xl font-bold px-3 py-1 bg-background rounded-md border">
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The virtual dice roller simulates rolling physical dice with complete randomness and customization. Whether you need standard six-sided dice for board games, twenty-sided dice for tabletop RPGs, or any custom configuration, this tool provides instant, fair rolls. Perfect for games, decision-making, random selection, or any situation requiring chance-based outcomes. The tool uses secure random number generation to ensure truly unpredictable results every time you roll."
        useCases={[
          { title: "Tabletop Gaming", description: "Roll dice for Dungeons & Dragons, Pathfinder, or other RPGs. Supports D4, D6, D8, D10, D12, D20, and D100 dice commonly used in tabletop games." },
          { title: "Board Games", description: "Replace lost dice, play digital board games, or roll multiple dice simultaneously for games requiring complex dice combinations." },
          { title: "Decision Making", description: "Make random selections, break ties, choose between options, or add an element of chance to everyday decisions fairly and transparently." },
          { title: "Educational Tools", description: "Teach probability concepts, demonstrate random distribution, conduct statistics experiments, or practice mental math with dice combinations." }
        ]}
        tips={[
          { title: "Understanding Dice Notation", description: "D4 means 4-sided die, D6 means 6-sided die, D20 means 20-sided die, etc. The number after D indicates how many sides the die has." },
          { title: "Multiple Dice Probability", description: "Rolling multiple dice creates a probability curve. 2D6 (two six-sided dice) most commonly results in 7, while 2 and 12 are rarest. Single dice have equal probability for all numbers." },
          { title: "Fair Random Generation", description: "This tool uses cryptographically secure random number generation, ensuring truly unpredictable and fair results suitable for all gaming purposes." },
          { title: "Recording Results", description: "Take note of important rolls for games or experiments. The tool shows individual dice results and the total sum for easy record-keeping." }
        ]}
        faqs={[
          { question: "How does the virtual dice roller ensure fairness?", answer: "This dice roller uses JavaScript's Math.random() function which provides pseudo-random numbers suitable for gaming. Each roll is independent with equal probability for all possible outcomes, just like physical dice." },
          { question: "What do the different dice types mean?", answer: "Different games use different dice: D6 (standard cube dice) for most board games, D20 for RPG attacks, D10 for percentages, D4 for small damage rolls. The number indicates sides on the die." },
          { question: "Can I roll multiple different types of dice at once?", answer: "This tool rolls multiple dice of the same type in one roll. For mixed dice types (like rolling both D6 and D20), you'll need to make separate rolls or use advanced RPG dice rollers." },
          { question: "Why doesn't my roll match the dice notation in my game?", answer: "Game dice notation often includes modifiers (like 2D6+3). This tool shows base dice rolls. Add any modifiers from your game rules to the total shown for your final result." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default DiceRollerClient;

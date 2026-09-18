import type { BlogPost } from "./blog";

export const batch3Posts: BlogPost[] = [
  {
    slug: "weight-loss-guide",
    title: "Weight Loss Math: Calories In vs Out for Real Results",
    excerpt:
      "A 500-calorie daily deficit loses ~0.5 kg a week. See the step-by-step TDEE math, a full 1,900-calorie sample day, and calculate your target now.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/health-calculators/calorie-calculator",
      "/health-calculators/tdee-calculator",
      "/health-calculators/bmi-calculator",
    ],
    sections: [
      {
        heading: "Why energy balance decides everything",
        paragraphs: [
          "Every diet that works — keto, low-fat, fasting, or smaller portions of ghar-ka-khana — works one way: you eat fewer calories than you burn. One kilogram of body fat stores roughly 7,700 kcal, so a daily deficit of 500 kcal removes about 3,500 kcal a week, or close to half a kilo. The diet is the delivery vehicle; the deficit is the engine.",
          "A 70 kg person at 1.75 m has a BMI of 22.9 (70 divided by 1.75 squared) — squarely healthy — yet may still want to lose 5 kg of desk-job fat. The math below turns that vague wish into an exact plan with a predictable weekly pace.",
        ],
        bullets: [
          "1 kg of fat stores about 7,700 kcal",
          "A 500 kcal daily deficit predicts ~0.5 kg lost per week",
          "Small deficits held for months beat crash diets abandoned in weeks",
        ],
      },
      {
        heading: "Find your maintenance calories first",
        paragraphs: [
          "Your Total Daily Energy Expenditure (TDEE) is basal metabolism plus all movement. The Mifflin-St Jeor equation estimates the basal part: for men, 10 × weight in kg + 6.25 × height in cm − 5 × age + 5; for women it ends − 161. A 30-year-old man at 80 kg and 180 cm burns 800 + 1,125 − 150 + 5 = 1,780 kcal at complete rest.",
          "Multiply by activity: 1.2 sedentary, 1.375 light, 1.55 moderate (3–5 workouts a week), 1.725 hard daily training. Our man at moderate activity maintains 1,780 × 1.55 = roughly 2,760 kcal. A 30-year-old woman at 65 kg and 165 cm has a basal rate near 1,370 kcal, so light activity puts her maintenance at about 1,370 × 1.375 = 1,884 kcal.",
        ],
        bullets: [
          "80 kg man, moderate activity: maintenance near 2,760 kcal",
          "65 kg woman, light activity: maintenance near 1,880 kcal",
          "Be honest — desk jobs count as sedentary even with gym visits",
        ],
      },
      {
        heading: "Pick a deficit that gives 0.5 kg a week",
        paragraphs: [
          "Subtract 400–500 kcal from maintenance: our 80 kg man targets ~2,260 kcal, predicting 12 × 0.45 = about 5.4 kg over 12 weeks. The 65 kg woman targets ~1,380–1,480 kcal for 4–5 kg over the same quarter. Fast enough to stay motivated, slow enough to keep muscle and sleep intact.",
          "Never eat below your basal rate for long — roughly 1,500 kcal for most men, 1,200 for most women — since 1,000 kcal cuts mostly drain water, glycogen, and muscle. If you have thyroid issues, diabetes, or a history of disordered eating, talk the plan through with your doctor first.",
        ],
        bullets: [
          "400–500 kcal deficit is the sweet spot for most adults",
          "Expect 0.25–0.5 kg a week; two-week plateaus are normal",
          "Flat for 3+ weeks? Cut 150–200 kcal or add 2,000 daily steps",
        ],
      },
      {
        heading: "What a 1,900-calorie day actually looks like",
        paragraphs: [
          "Breakfast: vegetable poha with peanuts plus milk, ~450 kcal and 18 g protein. Lunch: two rotis, dal, sabzi, curd, and salad — ~650 kcal, 25 g protein. Evening: buttermilk and roasted chana, ~150 kcal. Dinner: chicken or paneer with vegetables and one roti, ~500 kcal, 35 g protein. Total: ~1,750–1,900 kcal with 90–100 g protein, nothing exotic.",
          "Two levers do the heavy lifting: protein near 1.6 g per kg (110–130 g for a 70–80 kg adult) to protect muscle and blunt hunger, and 7,000–9,000 daily steps worth ~250–350 kcal. Pre-log restaurant meals — one butter naan with dal makhani can quietly cross 900 kcal.",
        ],
        bullets: [
          "Anchor meals with 25–40 g protein for fullness",
          "Steps cover nearly half the deficit without a workout",
          "Liquid calories — juices, shakes, sugary chai — sink budgets silently",
        ],
      },
      {
        heading: "Track the trend, not the daily noise",
        paragraphs: [
          "Weight swings a kilo overnight from salty food, hard workouts, or hormonal cycles — none of it fat. Weigh first thing in the morning 3–4 times a week and judge the 7-day average against the prior week. Falling 0.3–0.5 kg weekly means the plan works; flat for three weeks means targets are stale.",
          "Log food honestly for one month with a kitchen scale: most people discover their tablespoon of peanut butter is really three (95 vs ~300 kcal). Recalculate maintenance every 4–5 kg lost, since lighter bodies burn less — our 2,760 kcal man may maintain near 2,600 kcal at 75 kg.",
        ],
        bullets: [
          "Compare weekly averages, never yesterday vs today",
          "One honest logging month teaches portion sizes permanently",
          "Recalculate targets every 4–5 kg lost",
        ],
      },
      {
        heading: "5 mistakes that stall fat loss",
        paragraphs: [
          "Weekend amnesia leads: a clean 500 kcal deficit Monday–Friday (2,500 banked) erased by a 3,000 kcal surplus Saturday. Next comes under-counting oil, nuts, and nibbles — two handfuls of mixture plus a second ladle of tadka add 300+ unlogged kcal. Third, drinking the deficit through lassis, mocktails, and frappes.",
          "Fourth, cardio-only dieting with little protein, which burns muscle alongside fat and lowers maintenance. Fifth, switching plans every ten days so nothing survives to show its three-week trend. Run one sensible plan six honest weeks before judging it.",
        ],
        bullets: [
          "Weekends count — one binge erases five deficit days",
          "Measure oil and dry fruits; both double too easily",
          "Lift twice weekly with high protein to lose fat, not muscle",
        ],
      },
      {
        heading: "Weight-loss questions everyone asks",
        paragraphs: [
          "Must you quit rice or carbs? No — measured rice fits any deficit, and matched-calorie trials lose similar fat at any carb level. Keep foods you love in smaller amounts; the plan you enjoy for a year beats the perfect one you quit in February. Spot reduction is a myth — crunches do not melt belly fat — but waistlines shrink reliably as total fat falls.",
          "Take a weekly cheat meal, not a 4,000 kcal cheat day that cancels the week. Stop dieting near a waist under half your height with stable strength and energy (roughly BMI 20–25 for most adults), then hold by eating at TDEE with the same steps and protein.",
        ],
        bullets: [
          "No food group must go — totals decide fat loss",
          "One cheat meal helps; a cheat day erases the week",
          "Maintain at TDEE, keep protein and steps, weigh monthly",
        ],
      },
    ],
  },
  {
    slug: "protein-guide",
    title: "Protein Guide: How Much You Need Daily to Build Muscle",
    excerpt:
      "A 70 kg active adult needs 112–154 g of protein daily. Learn the 1.6–2.2 g/kg rule, the best veg and non-veg sources, and find your target now.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/health-calculators/protein-calculator",
      "/health-calculators/macro-calculator",
      "/health-calculators/calorie-calculator",
    ],
    sections: [
      {
        heading: "What protein actually does in your body",
        paragraphs: [
          "Protein supplies the amino acids that build muscle, skin, enzymes, hormones, and immune cells. Training creates tiny damage in muscle fibres, and the 24–48 hours afterwards are when dietary protein becomes new tissue — without enough of it, workouts maintain fitness but build little.",
          "It is also the most satiating macro and costs 20–30% of its own calories to digest (versus 5–10% for carbs). Dieters at 1.6 g per kg keep notably more muscle than those at 0.8 g on identical calories — same deficit, better body at the end.",
        ],
        bullets: [
          "Builds and repairs muscle, enzymes, hormones, immunity",
          "Most filling macro, with the highest digestion cost",
          "High protein while dieting preserves muscle as fat drops",
        ],
      },
      {
        heading: "The 1.6 to 2.2 grams rule, decoded",
        paragraphs: [
          "Active adults chasing muscle converge on 1.6–2.2 g per kg daily: a 70 kg lifter needs 112–154 g, an 80 kg lifter 128–176 g, a 90 kg lifter 144–198 g. Beginners and dieters should aim at the top half, since new training and deficits both raise demand.",
          "Sedentary adults need ~1.0–1.2 g per kg — a 60 kg office worker does well on 60–72 g, above the 0.8 g bare-minimum RDA. Endurance runners sit near 1.2–1.6 g. If significantly overweight, calculate from target weight: a 100 kg person aiming for 80 kg eats for 80 kg, roughly 130–175 g.",
        ],
        bullets: [
          "Muscle-building: 1.6–2.2 g per kg daily",
          "Endurance athletes: ~1.2–1.6 g per kg",
          "Sedentary adults: 1.0–1.2 g per kg beats the minimum",
          "Very overweight? Use target weight, not current weight",
        ],
      },
      {
        heading: "Spread it across 3 to 4 meals",
        paragraphs: [
          "Muscles respond to each feeding: ~0.3–0.5 g per kg (25–40 g for most adults) maximally triggers muscle-building for hours. A 75 kg lifter needing 150 g does far better on four 35–40 g meals than on 10 g at breakfast, 20 g at lunch, and 120 g at dinner.",
          "Fix breakfast first — toast or plain poha delivers barely 6–8 g — then anchor lunch and dinner with a palm-and-a-half of protein plus one high-protein snack. Milk or curd before bed measurably improves overnight repair, a cheap habit with solid evidence.",
        ],
        bullets: [
          "Target 25–40 g protein per meal, 3–4 times daily",
          "Breakfast is the lowest-protein meal in most homes — fix it first",
          "Slow protein before bed aids overnight recovery",
        ],
      },
      {
        heading: "The best sources, with real numbers",
        paragraphs: [
          "Chicken breast gives ~31 g per 100 g cooked, fish 20–25 g, eggs 6 g each (a 4-egg bhurji is 24 g), milk 3.4 g per 100 ml, curd 3–5 g per 100 g. A 30 g scoop of whey delivers 24–27 g for the price of a café coffee — filtered milk protein with the best safety record of any supplement.",
          "Vegetarians can cross 130 g with planning: soya chunks near 50 g per 100 g dry (a 40 g serving is ~20 g), paneer ~18 g per 100 g, cooked dal-rajma 8–9 g per 100 g, peanuts 26 g per 100 g. Oats, milk, peanuts, dal-rice with soya, chana chaat, paneer dinner, and bedtime milk stack past 130 g without powder.",
        ],
        bullets: [
          "Whey (24–27 g/scoop) and eggs (6 g each) are cheapest complete proteins",
          "Soya, paneer, dal-rajma, and curd carry a vegetarian day",
          "Pair cereals with pulses (dal-rice, khichdi) for complete amino acids",
        ],
      },
      {
        heading: "Protein for fat loss vs muscle gain",
        paragraphs: [
          "Cutting raises the bar: in a 400–500 kcal deficit, hold 2.0–2.4 g per kg of target weight. Our 80 kg man dieting toward 75 kg keeps ~150–180 g daily inside ~2,200 kcal — carbs and fats absorb the cut, protein does not. Two weekly strength sessions ensure the loss is overwhelmingly fat.",
          "Gaining flips the emphasis: 250–350 kcal above maintenance with 1.6–2.0 g per kg. A 65 kg beginner eats ~105–130 g inside ~2,600–2,700 kcal and gains ~0.25 kg a week, roughly half muscle. Dirty 4,000 kcal bulks add fat three times faster than muscle.",
        ],
        bullets: [
          "Fat loss: 2.0–2.4 g per kg of target weight, lift twice weekly",
          "Muscle gain: 1.6–2.0 g per kg plus a modest 250–350 kcal surplus",
          "Faster than 0.3 kg/week on a bulk is mostly fat",
        ],
      },
      {
        heading: "5 protein mistakes to stop making",
        paragraphs: [
          "Counting only dinner starves muscles the other 20 hours — distribute first, increase second. Fearing whey as artificial while eating biscuits with fifteen ingredients gets it backwards. And cheese and cashews are protein-containing fats, not protein foods: 100 g of cashews brings 550 kcal with just 18 g protein.",
          "Dal alone cannot carry the day either — at 8–9 g per 100 g cooked you would need over a kilo for 100 g protein — so combine it with soya, paneer, curd, or whey. Add 1–2 glasses of water and keep vegetables high, and high-protein constipation never arrives. Diagnosed kidney disease is the exception: set targets with your nephrologist.",
        ],
        bullets: [
          "Spread protein evenly instead of back-loading dinner",
          "Whey is filtered milk protein — safe and cheap",
          "Cheese and nuts are fats first; count them as such",
        ],
      },
      {
        heading: "Protein questions everyone asks",
        paragraphs: [
          "Does extra protein harm healthy kidneys? Intakes up to 2.2 g per kg show no harm in year-plus studies of people with normal function — the warning applies to pre-existing kidney disease, which needs a doctor's plan. Is excess protein stored as fat? Only through surplus calories overall; protein is the hardest macro to overeat.",
          "Do vegetarians need powder? Not necessarily, but one 25 g scoop often bridges a 90 g food day to a 130 g target more cheaply than 150 g of extra paneer. Beginners at 1.6–2.2 g per kg gain roughly 0.5–1 kg of muscle a month in year one — photograph and measure today, since mirrors lie daily but tell the truth quarterly.",
        ],
        bullets: [
          "Healthy kidneys handle 1.6–2.2 g/kg; kidney patients consult doctors",
          "One scoop often beats 150 g of extra paneer on cost and calories",
          "Expect visible change in 8–12 weeks, not days",
        ],
      },
    ],
  },
  {
    slug: "running-pace-guide",
    title: "Running Pace Guide: Charts, Splits and Race Predictor",
    excerpt:
      "A 5:00/km pace means a 25:00 5K and 52:08 10K. Use our charts plus the Riegel formula to predict your race times and plan your splits today.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/health-calculators/pace-calculator",
      "/health-calculators/calorie-calculator",
      "/health-calculators/heart-rate-calculator",
    ],
    sections: [
      {
        heading: "Pace, speed, and splits in plain English",
        paragraphs: [
          "Pace is time per distance — minutes per kilometre — while speed is distance per hour. Convert instantly: km/h equals 60 ÷ pace, so 5:00/km is exactly 12 km/h and 6:00/km is 10 km/h. A treadmill at 11 km/h means 60 ÷ 11 = 5:27 per km.",
          "Race times fall straight out: 5 km at 5:00/km is 25:00, 10 km is 50:00, a half marathon (21.0975 km) 1:45:29, a marathon (42.195 km) 3:30:59 — if anyone could hold it that long, which the predictor section corrects for. Splits apply pace per kilometre: even 5:00s, or 5:10s early and 4:50s late for a negative split.",
        ],
        bullets: [
          "Speed = 60 ÷ pace; 5:00/km is 12 km/h, 6:00/km is 10 km/h",
          "Even splits suit beginners; slight negative splits suit racers",
          "Program a pace band on your watch before race day",
        ],
      },
      {
        heading: "Pace chart: what each pace gives you",
        paragraphs: [
          "At 4:30/km: 5K in 22:30, 10K in 45:00, half in ~1:34:56. At 5:00/km: 25:00, 50:00, ~1:45:29. At 5:30/km: 27:30, 55:00, ~1:56:02. At 6:00/km — a proud beginner milestone — 30:00, 60:00, ~2:06:35. At 6:30/km: 32:30, 65:00, ~2:17:08.",
          "Mile runners divide by 1.609: 5:00/km is 8:03 per mile. Treadmill runners should set 1% incline to mimic outdoor effort. Base targets on a recent hard 5K time trial — the matching row gives honest 10K and half-marathon goals, not fantasy ones.",
        ],
        bullets: [
          "5:00/km → 25:00 / 50:00 / ~1:45 half; 6:00/km → 30:00 / 60:00 / ~2:07 half",
          "Per-mile pace ÷ 1.609 gives per-km pace",
          "Target from a recent time trial, never from wishful thinking",
        ],
      },
      {
        heading: "Predict your race time from any result",
        paragraphs: [
          "Longer races run slower per kilometre — the Riegel formula captures it: predicted time = known time × (new distance ÷ old distance)^1.06. A 25:00 5K predicts 10K as 25 × 2^1.06 = 25 × 2.085 = ~52:08, honestly slower than doubling.",
          "The same 5K predicts a half of 25 × (21.0975 ÷ 5)^1.06 = 25 × 4.60 = 1:55 flat, and a marathon of 25 × 9.59 ≈ just under 4:00. A 30:00 5K converts to ~62:30 and ~2:18. Treat predictions as centre lines with a ±3–5% band for hills, heat, and race-day adrenaline.",
        ],
        bullets: [
          "Riegel: new time = old time × (new km ÷ old km)^1.06",
          "25:00 5K → ~52:08 / ~1:55 half / ~4:00 marathon",
          "30:00 5K → ~62:30 10K and ~2:18 half",
        ],
      },
      {
        heading: "Train at five paces, not one",
        paragraphs: [
          "A 25:00 5K runner (5:00/km race pace) needs five gears. Easy runs at 5:50–6:20/km — conversational — build the base and should be 70–80% of weekly kilometres. Tempo at 5:10–5:20/km for 20–30 minutes raises the lactate threshold. Intervals like 6 × 800 m at 4:40–4:50/km lift top speed.",
          "The long run is the fifth gear: 90+ minutes starting near 6:10/km, finishing the last 20 minutes near 5:30/km. One long run plus one tempo or interval session, surrounded by easy kilometres, is the whole philosophy behind most sub-2-hour halves. Raise weekly distance 10% at most, with a lighter fourth week.",
        ],
        bullets: [
          "80% easy, 20% hard — the ratio behind most half-marathon breakthroughs",
          "Easy 5:50–6:20, tempo 5:10–5:20, intervals ~4:40–4:50 (for 25:00 5K)",
          "Never add distance and speed in the same week",
        ],
      },
      {
        heading: "Fuel, calories, and heart rate at pace",
        paragraphs: [
          "Running costs ~1 kcal per kg per km regardless of pace: a 70 kg runner spends ~70 kcal per kilometre, so 10K is ~700 kcal and a half ~1,475 kcal. Three weekly 5Ks burn ~1,050 kcal total — less than one large restaurant meal — so pair running with a measured diet for fat loss.",
          "Heart-rate zones keep effort honest when pace lies in heat or hills. Estimate max as 220 − age (a 35-year-old: ~185 bpm): easy at 60–70%, tempo 80–87%, intervals above 90%. Heat alone adds 10–15 bpm, so slow down without guilt. Chest pain, fainting, or known heart disease means medical clearance before racing or intervals.",
        ],
        bullets: [
          "Budget ~1 kcal per kg per km: 70 kg × 10K ≈ 700 kcal",
          "Easy 60–70% of max HR; tempo 80–87%; intervals 90%+",
          "Heat adds 10–15 bpm — hold the zone, not the pace",
        ],
      },
      {
        heading: "5 pacing mistakes runners repeat",
        paragraphs: [
          "The adrenaline start: kilometre one at 4:30 against a 5:00 plan, then a long fade finishing slower than even pacing would have. Let strangers sprint away; collect them by kilometre four. Second, racing every training run — constant 90% effort plateaus fitness and invites injury within two months.",
          "Third, skipping the 10-minute jog-and-leg-swing warm-up, then straining a calf on the first interval. Fourth, copying elite mileage: a 25:00 engine needs 25–35 km a week, not 100. Fifth, debuting shoes or gels on race day. Nothing new on race day except courage.",
        ],
        bullets: [
          "Start 5–10 seconds slower than target for kilometre one",
          "Keep easy days genuinely easy — daily racing injures",
          "Test shoes, gels, and breakfast on long runs only",
        ],
      },
      {
        heading: "Running pace questions, answered",
        paragraphs: [
          "What is a good 5K? Under 35:00 is a fine first goal, 30:00 solid, 25:00 genuinely quick, sub-22:30 turns heads locally. Pace or heart rate? Pace on flat cool days, heart rate in heat, hills, and comebacks — when they disagree, trust effort over the watch.",
          "To break 30:00, run 20–25 km a week with one interval session (5 × 1 km at 5:40/km, 2-minute jogs) plus a 45–60 minute long run, for eight weeks, then time-trial. Predictors hold within ~3% between adjacent distances and ~5% across leaps — if the mileage matches the distance.",
        ],
        bullets: [
          "Beginner ladder: 35:00 → 30:00 → 25:00 → sub-22:30",
          "Break 30:00 with weekly intervals plus a long run, eight weeks",
          "Predictions assume matching training — mileage first",
        ],
      },
    ],
  },
  {
    slug: "sleep-better-guide",
    title: "Sleep Cycles Guide: Wake Up Refreshed Every Morning",
    excerpt:
      "Five 90-minute cycles plus 15 minutes to drift off equals 7.5 hours. Find your ideal bedtime for any alarm and wake up refreshed tomorrow morning.",
    date: "2026-09-17",
    readMins: 8,
    toolPaths: [
      "/health-calculators/sleep-calculator",
      "/health-calculators/water-intake-calculator",
    ],
    sections: [
      {
        heading: "Your night runs in 90-minute cycles",
        paragraphs: [
          "Sleep repeats in ~90-minute cycles of light sleep, deep sleep, then dream-filled REM. Waking mid-cycle — especially from deep sleep — causes heavy grogginess (sleep inertia) that coffee barely dents; waking at a boundary feels lighter on even slightly less sleep. Six hours (four cycles) can beat six hours forty for exactly this reason.",
          "Most adults thrive on five cycles — 7.5 hours asleep — plus ~15 minutes to drift off, so ~7:45 in bed. Teenagers and overtrained athletes may need six cycles; four works a night or two, never as a lifestyle. Just land bedtime a whole number of cycles before the alarm.",
        ],
        bullets: [
          "One cycle ≈ 90 minutes: light, deep, then REM sleep",
          "Wake between cycles, never from deep sleep",
          "Five cycles (7.5 hours asleep) suits most adults",
        ],
      },
      {
        heading: "Count backwards from your alarm",
        paragraphs: [
          "Fix wake time, then subtract. For a 6:00 alarm with five cycles: 6:00 − 7:30 − 0:15 = 10:15 pm lights-out; the four-cycle fallback is 11:45 pm. For 7:00 risers: 11:15 pm for five cycles, 12:45 am for four — far kinder than 1:30 am scrolling that delivers three broken cycles.",
          "Hold identical wake times within an hour on weekends — that anchors the body clock more than any supplement. Shift bedtime earlier 15 minutes every 2–3 nights until mornings feel human; sudden two-hour jumps just create midnight staring sessions.",
        ],
        bullets: [
          "6:00 alarm: bed by 10:15 pm (five cycles) or 11:45 pm (four)",
          "7:00 alarm: bed by 11:15 pm (five cycles) or 12:45 am (four)",
          "Fix wake time first; let bedtime flex around it",
        ],
      },
      {
        heading: "How much sleep adults really need",
        paragraphs: [
          "Guidelines say 7–9 hours for ages 18–64 and 7–8 beyond 65. Under six hours regularly means worse memory, weaker immunity, and ~300 extra kcal eaten the next day — tired brains crave quick energy. Teenagers need 8–10 hours since growth hormone pulses during deep sleep.",
          "Duration alone misleads: eight restless hours with loud snoring and gasping restore less than seven quiet ones. Habitual snoring with breathing pauses, morning headaches, or dozing in meetings deserves a doctor's look, not a new pillow. True six-hour short sleepers are ~1–3% of people — assume you are not one.",
        ],
        bullets: [
          "Adults 7–9 hours; over-65s 7–8; teens 8–10",
          "Under 6 hours harms memory, immunity, appetite control",
          "Snoring with gasping deserves medical attention",
        ],
      },
      {
        heading: "Reset your body clock in a week",
        paragraphs: [
          "Light is the master switch: 10–15 minutes of outdoor light within an hour of waking sets a melatonin timer for ~14 hours later. A 7:00 riser taking morning sun feels sleepy near 9:30–10:30 pm naturally. Dim the house after 9 pm and keep the bedroom cool (24–26°C with airflow), dark, and quiet.",
          "Caffeine's 5–6 hour half-life means 4 pm coffee is quarter-strength at midnight — set your cutoff 8 hours before bed. Park the phone outside the bedroom (a ₹500 alarm clock replaces it) and run a 20-minute wind-down: shower, book, stretching. Screens harm mostly via arguments, reels, and cliffhangers at midnight.",
        ],
        bullets: [
          "Morning sunlight 10–15 min sets tonight's sleepiness",
          "Caffeine cutoff 8 hours before bed",
          "Cool, dark, quiet room plus a real wind-down beats gadgets",
        ],
      },
      {
        heading: "Naps, water, and late-night meals",
        paragraphs: [
          "Nap 20 minutes before 3 pm for sharper afternoons, or 90 minutes for a full cycle — never 45 minutes at 6 pm, which buys a 1 am bedtime. Shift workers and new parents should nap deliberately: a planned short nap beats an accidental two-hour collapse that wrecks the night.",
          "Finish heavy dinners 2–3 hours before bed; full stomachs worsen acidity and fragment sleep. A banana or warm milk is fine; 11 pm biryani plus cola is an experiment with predictable results. Front-load ~2.5–3.5 litres of water through the day, then taper the last hour so your bladder is not the 3 am alarm.",
        ],
        bullets: [
          "20 min before 3 pm, or a full 90 — never dusk-length naps",
          "Dinner 2–3 hours before bed; late snacks small and bland",
          "Hydrate all day, taper fluids in the final hour",
        ],
      },
      {
        heading: "5 sleep mistakes that keep you groggy",
        paragraphs: [
          "The weekend lie-in is a self-inflicted four-hour jet lag: 10 am Saturdays after 6 am weekdays makes Monday feel like flying back from Bangkok. Stay within an hour and nap instead. The nightcap myth runs second — alcohol sedates but shatters REM, so eight hours after whisky sleeps like six without it.",
          "Third, the five-snooze loop: fragmented 9-minute scraps that spike grogginess — set one real alarm instead. Fourth, using bed as office and cinema, training the brain that bed means alertness. Fifth, worshipping tracker scores while ignoring how 11 am feels; devices estimate sleep, they do not define it.",
        ],
        bullets: [
          "Weekend wake-ups within an hour of weekdays",
          "Alcohol sedates; it does not restore",
          "One alarm beats five snoozes; bed is for sleep",
        ],
      },
      {
        heading: "Sleep questions everyone asks",
        paragraphs: [
          "Can weekends repay debt? Partly — one lie-in covers a few short nights, but a month of five-hour nights is never erased by one long Sunday, and the shift wrecks next week's rhythm. Occasional pills under a doctor's guidance suit rough patches; nightly self-medication builds dependence while masking causes like apnoea or anxiety.",
          "Waking at 3 am? Skip the phone and clock-watching; breathe slowly 15–20 minutes, or read something dull in dim light until drowsy. Insomnia three-plus nights a week for over a month — or any gasping snores with daytime sleepiness — deserves proper medical evaluation, not another gadget.",
        ],
        bullets: [
          "Weekend catch-up helps a little, never repays chronic debt",
          "Pills mask causes — brief use, only with medical advice",
          "3 am wake-ups: dim light and boredom, never phones",
        ],
      },
    ],
  },
  {
    slug: "intermittent-fasting-guide",
    title: "Intermittent Fasting Windows Explained for Beginners",
    excerpt:
      "From 12:12 to 16:8, fasting works by shrinking eating hours. See three sample days with full calorie math, and pick your ideal window tonight.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/health-calculators/calorie-calculator",
      "/health-calculators/tdee-calculator",
      "/health-calculators/bmi-calculator",
    ],
    sections: [
      {
        heading: "Fasting windows, from 12:12 to 5:2",
        paragraphs: [
          "Fasting is meal timing, not a food list: 12:12 (including sleep) is where most people already live; 14:10 tightens slightly; 16:8 compresses eating into eight hours, say noon to 8 pm; 18:6 and 20:4 go further. The 5:2 method differs: five normal days plus two at ~500–600 kcal.",
          "Nothing repeals physics — shorter windows work by quietly removing 300–500 kcal of snacks, second breakfasts, and grazing. Trials show fasting matches equal-calorie diets for fat loss; it simply helps some people reach the deficit with fewer decisions. Delete your most mindless calories, not entire food groups.",
        ],
        bullets: [
          "12:12 gentle, 14:10 moderate, 16:8 standard, 18:6 advanced",
          "5:2 means two light days (~500–600 kcal), not zero-food days",
          "Timing is the tool; the deficit is the cause",
        ],
      },
      {
        heading: "Why shorter windows cut calories",
        paragraphs: [
          "Take an office day: poha (350) + biscuits (150) + thali (750) + samosa-chai (350) + dinner (700) + ice cream (250) = 2,550 kcal against ~2,300 maintenance. A noon–8 pm window deletes breakfast, biscuits, and ice cream — the same lunch, snack, and dinner total ~1,800 kcal, a 500 kcal deficit with zero food-scale drama.",
          "Fasting also removes decisions: no breakfast to plan, no 11 am snack negotiation. Hunger arrives in waves tied to old mealtimes and fades within 30–60 minutes — days 3–5 are the usual turning point. Black coffee, plain tea, and water blunt mornings for most people.",
        ],
        bullets: [
          "Windows delete meals and snacks, not metabolism myths",
          "16:8 often removes 300–500 kcal with no weighing",
          "Hunger waves fade within the hour; days 3–5 turn the corner",
        ],
      },
      {
        heading: "Three sample fasting days that work",
        paragraphs: [
          "Office 16:8 (noon–8 pm): black coffee at 10 am, lunch at noon (dal, rice, sabzi, curd ~750), peanuts and buttermilk at 4 pm (~250), dinner at 7:30 (chicken or paneer, vegetables, two rotis ~700). Total ~1,700 kcal with ~100 g protein — a ~600 kcal deficit for a 2,300-maintenance adult, roughly 0.5 kg a week.",
          "Early-bird 14:10 (9 am–7 pm) suits gym mornings: breakfast ~500, lunch ~700, snack ~200, dinner ~600 — total ~2,000 kcal. The 5:2 week runs five normal days with light Tuesdays and Fridays (~600 kcal of soup and curd-rice), averaging ~3,000 kcal weekly deficit. Whichever you pick, hold 1.6–2.0 g/kg protein so the loss is fat.",
        ],
        bullets: [
          "16:8 noon–8 pm fits late risers and office workers",
          "14:10 suits morning lifters and early family dinners",
          "5:2 suits people who hate daily rules but tolerate two strict days",
        ],
      },
      {
        heading: "What to eat when the window opens",
        paragraphs: [
          "Break fasts with protein, fibre, and some fat — not pastry and juice, which spike and crash hunger by 2 pm. Use the plate formula: half vegetables, a quarter protein (dal plus curd, eggs, chicken, soya, paneer), a quarter whole grains, one spoon of oil rather than three.",
          "Fasted training suits easy and moderate sessions; schedule brutal leg days within 2–3 hours before the first meal. If lifts slide three straight weeks or hair shedding spikes, widen the window or raise calories — fasting should never cost strength or health markers.",
        ],
        bullets: [
          "Break fasts with protein and fibre, not sugar",
          "Keep 1.6–2.0 g/kg protein inside the window",
          "Hard workouts sit best just before the first meal",
        ],
      },
      {
        heading: "Who should not fast without guidance",
        paragraphs: [
          "Solo fasting is unwise with diabetes on medication (hypoglycaemia risk is real), pregnancy or breastfeeding, teenage growth years, any eating-disorder history, or underweight status (BMI under 18.5 — 70 kg at 1.75 m is a healthy 22.9, well clear). Chaotic-shift workers and peak-block endurance athletes usually fare better fuelled regularly too.",
          "Many in these groups fast fine under supervision — the plan just needs a clinician's eyes on medication timing, glucose, and nutrients. Dizziness, shakes, unusual irritability, or cycle changes are stop-and-reassess signals to discuss with your doctor, not push through. Sensible fasting feels mildly hard for a week, then mostly normal.",
        ],
        bullets: [
          "Diabetes medication, pregnancy, teens, and ED history need supervision",
          "BMI under 18.5 and peak training argue against hard windows",
          "Dizziness, shakes, or cycle changes mean stop and reassess",
        ],
      },
      {
        heading: "5 fasting mistakes that backfire",
        paragraphs: [
          "Feasting, not fasting, is the champion error: 16 disciplined hours rewarded with a 1,500 kcal dinner plus dessert erases the window's deficit. Second, the milky-coffee loophole — three 100 kcal coffees plus a small juice becomes a slow 400 kcal breakfast. Track one honest week; most feasters find 8-hour intake matching their old 14-hour intake.",
          "Third, leaping to 20:4 on day one instead of graduating 12:12 → 14:10 → 16:8 across three weeks. Fourth, protein collapse — two small meals totalling 50 g for a 75 kg adult surrenders muscle with the fat. Fifth, stacking fasting onto 1,000 kcal crash targets with daily intense workouts, then blaming the fast for simple under-fueling.",
        ],
        bullets: [
          "Post-fast feasts erase the deficit — verify with a tracked week",
          "Milky coffees and juices break the fast; black coffee and water do not",
          "Graduate windows over weeks; never stack extremes on crash calories",
        ],
      },
      {
        heading: "Fasting questions everyone asks",
        paragraphs: [
          "Does fasting burn muscle? Not with high protein plus twice-weekly lifting — retention matches regular diets, and losses appear only when protein collapses. Does milk tea break a fast? Strictly yes (~30–50 kcal), though it barely matters for fat loss if daily calories hold.",
          "Can you fast forever? Many hold 16:8 for years, but lifelong rigidity is unnecessary — fast during fat-loss phases, relax to 12:12 in maintenance. Stalled (flat weekly average, three weeks)? Trim 150–200 kcal inside the window first; longer fasts rarely fix portion creep. A nutritious 8-hour day beats a 14-hour grazing day every time.",
        ],
        bullets: [
          "Muscle is safe with protein plus lifting",
          "Milk tea technically breaks a fast; black coffee does not",
          "Fast in phases; maintain at relaxed 12:12",
        ],
      },
    ],
  },
];

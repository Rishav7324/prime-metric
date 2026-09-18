import type { BlogPost } from "./blog";

export const batch4Posts: BlogPost[] = [
  {
    slug: "body-fat-explained",
    title: "Body Fat Percentage Explained: BMI vs Body Fat Guide",
    excerpt:
      "Body fat percentage vs BMI explained with real numbers, healthy ranges, and simple math. Calculate your fat mass and start a smarter cut today.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/health-calculators/body-fat-calculator",
      "/health-calculators/bmi-calculator",
      "/health-calculators/bmr-calculator",
    ],
    sections: [
      {
        heading: "Body fat percentage vs BMI: the core difference",
        paragraphs: [
          "BMI tells you how heavy you are for your height; body fat percentage tells you what that weight is made of. Take two men who are both 175 cm and 85 kg. Each has a BMI of 27.8 (85 divided by 1.75 squared), in the overweight band. But one is a lifter at 16 percent body fat and the other is sedentary at 31 percent, with totally different health profiles.",
          "The arithmetic shows why. The lifter carries 13.6 kg of fat (85 times 0.16) and 71.4 kg of lean mass, while the sedentary man carries 26.4 kg of fat and only 58.6 kg of lean. Same weight, nearly double the fat. BMI is a useful smoke alarm, but body fat percentage confirms whether there is a fire.",
        ],
        bullets: [
          "BMI cannot see composition; identical 27.8 can mean 13.6 or 26.4 kg of fat",
          "Use BMI for screening, body fat percentage for decisions",
        ],
      },
      {
        heading: "How body fat is actually measured",
        paragraphs: [
          "The gold standard is a DEXA scan, which separates fat, muscle, and bone with an error of roughly 1 to 2 percentage points, but it needs a clinic visit. Cheaper options include smart scales that send a small current through your feet, skinfold callipers that pinch subcutaneous fat, and a tape measure combined with a validated formula.",
          "The tape method is surprisingly decent when done consistently. The US Navy equation for men uses waist, neck, and height; a man with a 38-inch waist, 15.5-inch neck, and 69-inch height scores about 17.6 percent, squarely in the fitness range. Whatever tool you pick, measure monthly under identical conditions and follow the trend, not single readings.",
        ],
        bullets: [
          "DEXA is most accurate; scales swing 2 to 3 points with hydration",
          "Tape plus Navy formula is free and good for trends",
        ],
      },
      {
        heading: "Healthy body fat ranges by age and sex",
        paragraphs: [
          "Women carry more essential fat than men, so every range sits higher. For men the standard bands are roughly 2 to 5 percent essential, 6 to 13 athletic, 14 to 17 fit, 18 to 24 average, and 25 plus obese. For women they run about 10 to 13 essential, 14 to 20 athletic, 21 to 24 fit, 25 to 31 average, and 32 plus obese.",
          "Age nudges healthy targets up a few points. A 55-year-old man at 22 percent with good strength, blood pressure, and waist size is in a different position from a 25-year-old at the same percentage with none of those habits. Read your number against age, waistline, and blood work.",
        ],
        bullets: [
          "Men: fit is roughly 14 to 17 percent; obese starts near 25",
          "Women: fit is roughly 21 to 24 percent; obese starts near 32",
          "Allow a few extra points after 50 if habits are solid",
        ],
      },
      {
        heading: "Worked example: from 28 percent to 20 percent at 80 kg",
        paragraphs: [
          "An 80 kg person at 28 percent body fat carries 22.4 kg of fat (80 times 0.28) and 57.6 kg of lean mass. To reach 20 percent while keeping all that muscle, target weight equals lean mass divided by one minus the target rate: 57.6 divided by 0.80 is exactly 72.0 kg. That means losing 8 kg of pure fat, with zero muscle sacrificed.",
          "At half a kilo per week, 8 kg takes about 16 weeks. Calories come from Mifflin-St Jeor: a 30-year-old man at 80 kg and 178 cm burns roughly 1,768 kcal at rest. At moderately active (times 1.55) daily needs land near 2,740 kcal, so eating around 2,240 creates the 500 kcal deficit behind that pace.",
        ],
        bullets: [
          "80 kg at 28 percent: 22.4 kg fat plus 57.6 kg lean",
          "Target 20 percent with muscle kept: 57.6 / 0.80 = 72.0 kg",
          "Journey is 8 kg, about 16 weeks; eat near 2,240 kcal daily",
        ],
      },
      {
        heading: "How to lose fat without losing muscle",
        paragraphs: [
          "Muscle survives a cut only if you give it reasons to stay. Eat 1.6 to 2.2 grams of protein per kilogram of target weight daily, so a 72 kg target means roughly 115 to 160 grams. Lift two or three times weekly with progressive overload, because only training tells a dieting body to keep muscle.",
          "Keep the deficit at 300 to 500 kcal a day, walk 7,000 to 10,000 steps daily, and sleep seven to nine hours, since restricted sleep shifts loss toward muscle. When the scale stalls for three weeks, trim 150 kcal or add 2,000 steps rather than crash dieting, which reliably costs muscle and rebounds afterward.",
        ],
        bullets: [
          "Protein 1.6 to 2.2 g per kg of target weight every day",
          "Strength train 2 to 3 times weekly plus daily walking",
          "Adjust in small steps; never crash below basal needs",
        ],
      },
      {
        heading: "Mistakes that stall fat loss for months",
        paragraphs: [
          "The costliest mistake is trusting a single smart-scale reading. A dehydrated evening weigh-in can read 3 points leaner than a hydrated morning one, so people celebrate phantom progress or panic over phantom gain and overhaul a plan that was working. Weigh monthly and trust the average, not one outlier.",
          "The rest are impatience in disguise: cutting to 1,200 kcal and losing muscle instead of fat, doing only cardio while skipping weights, and comparing week two with someone else's month twelve. A 65 kg, 165 cm, 30-year-old woman burns only about 1,370 kcal at rest, so a 1,000 kcal crash leaves almost nothing for activity. Slow, muscled loss beats fast, flabby loss every time.",
        ],
        bullets: [
          "Never judge by one reading; hydration swings results by points",
          "Deficits above 500 kcal mostly eat muscle, not fat",
          "Lift during every cut and recalculate needs every 5 kg lost",
        ],
      },
      {
        heading: "Body fat questions, answered",
        paragraphs: [
          "Can you be overweight by BMI but lean by body fat? Yes, and lifters do it routinely: a BMI of 27 with 15 percent body fat and a waist under half your height is muscle, not a warning. The reverse is also real, sometimes called normal-weight obesity, where a BMI of 22 hides 30 percent body fat and poor metabolic markers in a sedentary person.",
          "How fast should body fat fall? Roughly 0.5 to 1 percentage point per month is brisk but realistic with a 400 to 500 kcal deficit and training. Measure monthly, since fat loss runs slower than water-weight noise, and keep waist-to-height ratio under 0.5 as your companion metric.",
        ],
        bullets: [
          "BMI 27 with low waist and low fat is muscle, not excess",
          "Expect 0.5 to 1 point lost per month; measure monthly",
          "Keep waist-to-height ratio under 0.5 alongside fat goals",
        ],
      },
    ],
  },
  {
    slug: "gpa-guide",
    title: "GPA Explained: Scales, Conversion Charts and Raise Tips",
    excerpt:
      "GPA scales, credit-weight math, and conversion charts with worked examples. Calculate your real GPA and map the exact grades that lift it higher.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/other-calculators/gpa-calculator",
      "/other-calculators/grade-calculator",
      "/math-calculators/percentage-calculator",
    ],
    sections: [
      {
        heading: "The 4.0 scale, letter by letter",
        paragraphs: [
          "Most American universities grade on a 4.0 scale: A is 4.0, A-minus 3.7, B-plus 3.3, B 3.0, B-minus 2.7, C-plus 2.3, C 2.0, C-minus 1.7, D 1.0, and F 0. Some schools add A-plus and weight honors courses to 5.0, which is why applications distinguish weighted from unweighted GPA. Always confirm your own school's exact mapping first.",
          "The scale is uneven in ways that matter: one failed 3-credit course wipes out two A grades in equal courses. Protecting your weakest subject usually lifts GPA faster than polishing your strongest one further, because rescuing an F earns up to 4 points per credit while upgrading a B-plus to A earns only 0.7.",
        ],
        bullets: [
          "Plus and minus steps are 0.3 points; F to C spans the full 2.0",
          "Weighted GPA can exceed 4.0; unweighted caps at 4.0",
          "Rescue weak subjects before polishing strong ones",
        ],
      },
      {
        heading: "How semester GPA is calculated",
        paragraphs: [
          "GPA is credit-weighted: multiply each grade's points by its credits, add the quality points, and divide by total credits. A semester with a 3-credit A (12.0 points), a 4-credit B-plus (13.2), and a 3-credit A-minus (11.1) totals 36.3 quality points over 10 credits, giving a GPA of 3.63.",
          "Notice how the 4-credit B-plus drags harder than the 3-credit A lifts, since its extra credit amplifies the 0.7 gap below an A. Effort should follow credits, not anxiety: ten extra study hours earn more GPA in a 4-credit B-plus course than in a 1-credit course already sitting at A.",
        ],
        bullets: [
          "Sum of points times credits, divided by total credits",
          "Example: 36.3 quality points over 10 credits equals 3.63",
          "Prioritize heavy courses in every study schedule",
        ],
      },
      {
        heading: "Converting percentages and 10-point CGPA",
        paragraphs: [
          "Indian students converting to the US scale usually need two hops: CGPA to percentage, then percentage to a 4.0 estimate. Under the common CBSE convention, percentage equals CGPA times 9.5, so a CGPA of 8.2 becomes 77.9 percent (8.2 times 9.5). That first hop is exact by convention; the second is only an estimate.",
          "A rough linear rule used by several free converters is GPA equals percentage divided by 20, minus 1, mapping 85 percent to 3.25 and our 77.9 percent to about 2.9. Treat that as a planning number only. Real admissions offices use evaluation services with their own bands, so verify against your target university's published table before reporting anything official.",
        ],
        bullets: [
          "CBSE rule: percentage = CGPA times 9.5 (8.2 becomes 77.9)",
          "Rough estimate: GPA = (percentage / 20) minus 1",
          "Official applications need the university's own conversion",
        ],
      },
      {
        heading: "Cumulative GPA: how much one semester moves it",
        paragraphs: [
          "Cumulative GPA carries memory, so early semesters anchor later ones. A student with 60 credits at 3.10 holds 186.0 quality points (60 times 3.10). Add a stellar 15-credit semester at 4.0, worth 60.0 points, and the new total is 246.0 over 75 credits, which equals 3.28. Fifteen credits of perfection moved the needle only 0.18.",
          "The symmetry comforts seniors, since one bad semester is equally diluted. But freshmen should hear the warning: grades earned early divide into every future average, so a weak first year at 2.5 over 30 credits forces years of 3.7-plus performance just to climb back to 3.4. Front-load effort while the denominator is small.",
        ],
        bullets: [
          "60 credits at 3.10 plus 15 at 4.0 equals 3.28 overall",
          "Large credit bases dilute single semesters both ways",
          "Protect freshman year; early grades anchor hardest",
        ],
      },
      {
        heading: "How to raise your GPA: the credit math",
        paragraphs: [
          "Work backward from the target. Holding 60 credits at 3.30 means 198.0 quality points, and wanting 3.50 across 90 credits by graduation needs 315.0 total points (3.50 times 90). That leaves 117.0 points to earn in the remaining 30 credits, or 117 divided by 30: 3.90 per semester, essentially straight As with one A-minus allowed.",
          "Three levers help: retake policies that replace low grades, since swapping a 3-credit F for an A restores the full 12 points; loading remaining credits with subjects where you reliably score high; and preparing early for the heaviest courses. Recompute the required average every semester, because each term rewrites the target.",
        ],
        bullets: [
          "Required average = (target x total credits - earned points) / remaining",
          "Example: 3.90 across 30 credits to reach 3.50 overall",
          "Retaking failed courses gives the best points-per-effort return",
        ],
      },
      {
        heading: "GPA mistakes that cost students dearly",
        paragraphs: [
          "The classic blunder is averaging letters without credit weights: treating an A in a 1-credit lab as cancelling a C in a 4-credit core course, when the core counts four times more. Next comes ignoring plus and minus grades, which leak 0.3 points per course, enough to drag 3.70 to 3.55 across five courses.",
          "Strategic mistakes hurt more. Taking heavy electives pass-fail when an A was likely wastes cheap quality points, while overloading 21 credits to graduate early often converts two probable As into three B-minuses. Audit your transcript yearly, confirm retake rules in writing, and never assume two schools compute weighted GPA the same way.",
        ],
        bullets: [
          "Always weight by credits; never average letters directly",
          "Count plus and minus grades; verify conversion tables officially",
          "Balance loads; overloads that cut grades destroy GPA",
        ],
      },
      {
        heading: "GPA questions students always ask",
        paragraphs: [
          "Is 3.5 good? In most US programs it clears graduate-school and scholarship screens, sitting above the national undergraduate average near 3.1 to 3.3. Does GPA round up? Officially no: 3.49 reports as 3.49, though resumes commonly show one decimal, where it becomes 3.5. Can one F ruin everything? It wounds but rarely kills, dropping our 60-credit 3.10 student to about 2.96, recoverable in two strong semesters.",
          "How do employers read GPA? Most treat 3.5-plus as a green flag for fresh graduates and stop asking after two years of experience. Include GPA on a resume if it is 3.3 or higher and you graduated recently; omit it once experience speaks louder. Whatever your number, pair it with projects and internships, because a 3.4 with proof of work beats a bare 3.8.",
        ],
        bullets: [
          "3.5 clears most screens; the average sits near 3.1 to 3.3",
          "Transcripts never round; one F costs about 0.14 on 60 credits",
          "List GPA above 3.3 early career; drop it once experienced",
        ],
      },
    ],
  },
  {
    slug: "mortgage-basics",
    title: "Mortgage Basics: Down Payment, Rates and Closing Costs",
    excerpt:
      "Down payments, PMI, points, and closing costs explained with a $400,000 example. Estimate your true monthly payment before you shop with confidence.",
    date: "2026-09-17",
    readMins: 10,
    toolPaths: [
      "/financial-calculators/mortgage-calculator",
      "/financial-calculators/house-affordability-calculator",
      "/financial-calculators/rent-vs-buy-calculator",
    ],
    sections: [
      {
        heading: "What a mortgage payment actually contains",
        paragraphs: [
          "A mortgage payment is four bills in one: principal, interest, property taxes, and homeowners insurance, shortened to PITI. On a typical $400,000 purchase, taxes and insurance often add $400 to $600 a month on top of principal and interest. Quotes showing only principal and interest understate your real payment by 20 to 30 percent.",
          "Two extras can join the bundle: private mortgage insurance when the down payment is below 20 percent, and HOA dues in condos and planned communities. Before loving any listing, ask the lender for the full PITI plus HOA figure, because that total, not the sticker price, decides whether you can afford the home.",
        ],
        bullets: [
          "PITI means principal, interest, taxes, and insurance in one bill",
          "Confirm PMI and HOA dues before offering on any home",
          "Judge affordability on the full bundle, never principal alone",
        ],
      },
      {
        heading: "Down payments and PMI: the 20 percent line",
        paragraphs: [
          "Twenty percent down on $400,000 is $80,000, leaving a $320,000 loan with no private mortgage insurance. Put 10 percent down ($40,000) and the loan grows to $360,000 plus PMI, which at a typical 0.7 percent annual rate costs $210 a month (360,000 times 0.007 divided by 12). Until you reach 20 percent equity, that surcharge totals $12,000 to $17,000 of pure cost.",
          "Smaller down payments still make sense when rent is high or cash reserves matter more than the surcharge. But five percent down ($20,000) starts you with just $20,000 of equity against $380,000 of debt and no cushion if prices dip. Whatever percentage you choose, keep three to six months of full PITI payments in reserve after closing.",
        ],
        bullets: [
          "20 percent on $400,000: $80,000 down, $320,000 loan, zero PMI",
          "10 percent down: $360,000 loan plus about $210 monthly PMI",
          "Never empty emergency savings just to hit 20 percent",
        ],
      },
      {
        heading: "Rates and points, worked on $320,000",
        paragraphs: [
          "At 6.5 percent fixed over 30 years, a $320,000 loan costs $2,022.62 a month in principal and interest. Over 360 payments the lifetime total is about $728,142, meaning roughly $408,142 of interest on top of the $320,000 borrowed. More than half of every early payment is interest, which is why the balance barely moves in the first years.",
          "Lenders sell discounts called points: one point costs 1 percent of the loan ($3,200 here) and typically cuts the rate about 0.25 points. Dropping to 6.25 percent lowers the payment to about $1,970.30, saving $52.32 monthly, so the point breaks even after roughly 61 months (3,200 divided by 52.32). Buy points only if you will stay past breakeven.",
        ],
        bullets: [
          "$320,000 at 6.5 percent for 30 years: $2,022.62 monthly",
          "Lifetime interest near $408,142 on $728,142 total paid",
          "One $3,200 point saves $52.32 monthly; breakeven near 61 months",
        ],
      },
      {
        heading: "Closing costs: the 2 to 5 percent nobody budgets",
        paragraphs: [
          "Closing costs run 2 to 5 percent of the price, which is $8,000 to $20,000 on a $400,000 home, due in cash on closing day alongside the down payment. The bundle includes origination fees, appraisal and inspection, title insurance and search, prepaid taxes and insurance into escrow, and recording fees. Buyers who budget only the down payment get an awful surprise two weeks before moving.",
          "Three moves tame the bill: compare Loan Estimates from three lenders line by line, since origination fees vary by thousands; ask the seller for closing-cost credits in a slow market; and challenge junk fees like courier or document-preparation markups, which lenders often waive. Every $1,000 negotiated off closing preserves $1,000 of down payment.",
        ],
        bullets: [
          "Budget $8,000 to $20,000 closing cash on a $400,000 purchase",
          "Compare three Loan Estimates; fees differ by thousands",
          "Negotiate seller credits and challenge junk fees directly",
        ],
      },
      {
        heading: "How much house can you afford",
        paragraphs: [
          "Lenders use the 28-36 rule: at most 28 percent of gross monthly income on housing and 36 percent on all debts combined. A household earning $120,000 takes home $10,000 a month before tax, so housing caps at $2,800 and total debts at $3,600. With $600 in car and student-loan payments, the combined cap leaves exactly $3,000 for housing plus those loans.",
          "Our $320,000 loan at 6.5 percent takes $2,023 of principal and interest, and adding $400 in taxes plus $150 in insurance reaches $2,573, comfortably under the $2,800 ceiling. That supports roughly a $380,000 to $420,000 purchase with 10 to 20 percent down at current rates. Stretch past 30 percent only with large reserves, because one tax reassessment can break a tight budget.",
        ],
        bullets: [
          "$120,000 income allows about $2,800 housing, $3,600 total debt",
          "$400,000 home at 20 percent down totals about $2,573 monthly",
          "Supports roughly $380,000 to $420,000 at 6.5 percent rates",
        ],
      },
      {
        heading: "First-time buyer mistakes to avoid",
        paragraphs: [
          "The most expensive error is confusing prequalification with preapproval. Prequalification is a self-reported estimate that sellers ignore, while preapproval means verified income, credit, and bank statements plus a hard credit pull. House-hunting without preapproval wastes weekends and loses bidding wars to buyers whose financing is already proven.",
          "The next three mistakes compound it: draining every dollar into the down payment and moving in with zero buffer, opening new credit cards or car loans mid-process that can void the approval, and waiving inspection to win a bid, turning a $500 inspection into a $25,000 foundation surprise. Get preapproved, freeze new borrowing, and inspect everything.",
        ],
        bullets: [
          "Get preapproved with verified documents, not just prequalified",
          "Keep 3 to 6 months of PITI in reserve after closing",
          "Open no new credit mid-process; never waive inspection",
        ],
      },
      {
        heading: "Mortgage questions, answered",
        paragraphs: [
          "Should you choose 15 or 30 years? The 15-year loan charges far less lifetime interest but demands roughly 40 to 50 percent higher monthly payments, so only deep income cushions should take it. Most buyers do better with a 30-year loan plus voluntary extra payments, keeping the low required payment as insurance against bad months.",
          "What is escrow? A holding account where part of each payment accumulates for annual tax and insurance bills, paid by the servicer on your behalf. Can PMI be removed? Yes: request cancellation at 20 percent equity (a new appraisal helps after renovations); it drops automatically at 22 percent on conforming loans. Moving within three to four years? Renting usually wins once closing costs and agent fees count.",
        ],
        bullets: [
          "30-year plus extra payments beats 15-year for most budgets",
          "PMI cancels at 20 percent on request, 22 percent automatic",
          "Staying under 4 years usually favors renting over buying",
        ],
      },
    ],
  },
  {
    slug: "statistics-basics",
    title: "Statistics Basics: Mean, Median and Confidence Explained",
    excerpt:
      "Mean, median, standard deviation, and confidence intervals explained with one worked dataset. Master the basics and analyze real data with confidence.",
    date: "2026-09-17",
    readMins: 9,
    toolPaths: [
      "/math-calculators/statistics-calculator",
      "/math-calculators/average-calculator",
      "/math-calculators/standard-deviation-calculator",
    ],
    sections: [
      {
        heading: "Mean, median, and mode on one dataset",
        paragraphs: [
          "Meet our running example: seven quiz scores of 12, 15, 18, 21, 24, 30, and 45. The mean is the total divided by the count: 165 divided by 7 equals 23.57. The median is the middle sorted value, 21, the fourth of seven. There is no mode since no score repeats, which is completely normal in small datasets.",
          "Notice the mean sits above the median because the lone 45 drags the average up while the median ignores it. That gap is the story of skew: outliers pull the mean but leave the median with the crowd. Report both, and whenever they disagree badly, trust the median for what is typical.",
        ],
        bullets: [
          "Mean 23.57, median 21, no mode in this dataset",
          "Outliers pull the mean but leave the median nearly fixed",
          "Skewed data: use the median; symmetric data: mean is fine",
        ],
      },
      {
        heading: "Spread: range, variance, and standard deviation",
        paragraphs: [
          "Center means little without spread. The range is fastest: 45 minus 12 equals 33, but it depends entirely on two extremes. Variance fixes that by averaging every point's distance from the mean: square each deviation, add them to get 745.71, and divide by 7 for a population variance of 106.53. The standard deviation is its square root, about 10.32.",
          "That 10.32 says a typical score lands roughly 10 points from the mean, which matches the data well. If the seven scores were a sample from a larger class, divide by 6 instead: sample variance 124.29 and sample deviation about 11.15. Hold everyone and use the population version; hold a subset and use the sample version.",
        ],
        bullets: [
          "Range 33 is quick but fragile; one outlier owns it",
          "Population variance 106.53, deviation about 10.32",
          "Sample version divides by 6: deviation about 11.15",
        ],
      },
      {
        heading: "Percentiles and z-scores made concrete",
        paragraphs: [
          "A z-score counts standard deviations from the mean: subtract the mean, divide by the deviation. The score of 30 becomes (30 minus 23.57) divided by 10.32, which is 6.43 divided by 10.32, or about 0.62. The standout 45 becomes 21.43 divided by 10.32, about 2.08 standard deviations above average.",
          "Percentiles translate that into rank: a z of 0.62 sits near the 73rd percentile, beating roughly three-quarters of the group, while 2.08 lands near the 98th. This is how exam boards, growth charts, and fitness benchmarks compare people across different tests. Whenever units differ, convert to z-scores first and the comparison becomes fair.",
        ],
        bullets: [
          "Score 30: z near 0.62, about the 73rd percentile",
          "Score 45: z near 2.08, about the 98th percentile",
          "Z-scores let you compare results in different units",
        ],
      },
      {
        heading: "The normal curve and the 68-95-99.7 rule",
        paragraphs: [
          "Many real measurements pile into the bell-shaped normal curve, symmetric around the mean. The empirical rule quantifies it: about 68 percent of values fall within one standard deviation of the mean, 95 percent within two, and 99.7 percent within three. For our class (mean 23.57, deviation 10.32), roughly two-thirds of scores should land between 13.25 and 33.89.",
          "The rule doubles as a lie detector: a supposedly normal process with 40 percent of values beyond two deviations is either non-normal or misreported. Check shape with a histogram first. Our seven scores lean right because of the 45, so the rule holds only roughly here; with hundreds of points the bell usually sharpens.",
        ],
        bullets: [
          "68 percent within one deviation, 95 within two, 99.7 within three",
          "Our class: roughly two-thirds between 13.25 and 33.89",
          "Fails on skewed or tiny samples; check the histogram first",
        ],
      },
      {
        heading: "Confidence intervals: what they really say",
        paragraphs: [
          "A sample mean is an estimate, and the confidence interval measures its wobble. The standard error equals the deviation divided by the square root of sample size, so 100 people with deviation 12 give 1.2 (12 divided by 10). The 95 percent interval is the mean plus or minus 1.96 standard errors: with a mean of 50, the margin is 2.35, giving 47.65 to 52.35.",
          "That means the procedure captures the true average in about 95 of 100 repeats, not that any value has a 95 percent chance of something. Quadrupling the sample to 400 halves the width, since the root of 400 is 20 and the error shrinks accordingly. Precision is bought with sample size, and halving uncertainty always costs four times the data.",
        ],
        bullets: [
          "Standard error 1.2 gives a 95 percent interval of 47.65 to 52.35",
          "Quadrupling data halves width; doubling barely dents it",
          "95 percent describes the method's hit rate over repeats",
        ],
      },
      {
        heading: "Statistics mistakes even analysts make",
        paragraphs: [
          "The deadliest habit is quoting the mean of skewed data, like average income in a town with one billionaire, where the median earner disappears. Next is confusing correlation with causation: ice-cream sales and drownings correlate through summer heat, yet banning ice cream saves nobody. Third is the tiny sample, where five lucky responses masquerade as public opinion.",
          "Visualization sins finish the list: truncated axes turn a 5 percent gap into a canyon, cherry-picked dates manufacture trends, and hidden sample sizes cover everything up. Demand the quartet every time: sample size, spread, shape, and the exact question asked. Statistics without those four is storytelling with numbers.",
        ],
        bullets: [
          "Skewed data needs medians; means follow billionaires",
          "Correlation needs a mechanism before becoming causation",
          "Insist on sample size, spread, shape, and exact wording",
        ],
      },
      {
        heading: "Statistics questions, answered",
        paragraphs: [
          "Population or sample deviation? Divide by n when the data is everyone you care about, by n minus 1 when generalizing beyond it. Our seven as a whole use 10.32; as a school sample they use 11.15. The gap fades past a few dozen points. What p-value counts? The traditional line is 0.05, a flag for interest, never proof of importance.",
          "How many poll responses? About 1,000 buys a 3-point margin at 95 percent confidence. Mean or median for house prices? Always the median, since a few mansions drag every average upward. Report intervals alongside means, because a lonely average without its uncertainty misleads more often than it informs.",
        ],
        bullets: [
          "Population divides by n; samples divide by n minus 1",
          "p below 0.05 flags interest but never proves importance",
          "House prices, incomes, and wait times all want medians",
        ],
      },
    ],
  },
  {
    slug: "unit-conversion-guide",
    title: "Unit Conversion Handbook: Length to Cooking Tables",
    excerpt:
      "Length, weight, temperature, speed, and cooking conversions with ready tables and formulas. Convert any measurement accurately in seconds from now on.",
    date: "2026-09-17",
    readMins: 8,
    toolPaths: [
      "/other-calculators/conversion-calculator",
      "/other-calculators/height-calculator",
      "/other-calculators/speed-calculator",
    ],
    sections: [
      {
        heading: "The one method behind every conversion",
        paragraphs: [
          "Every conversion multiplies by one in disguise: a fraction whose top and bottom name the same quantity, like 2.54 cm over 1 inch. Multiplying changes the units without changing the amount, and chaining fractions converts anything to anything. Miles to kilometres to metres is just two such multiplications, with each old unit cancelling like a number.",
          "Set it up so unwanted units cancel diagonally and the wanted unit survives. Converting 5 miles: multiply by 1.609344 km per mile and miles cancel, leaving 8.05 km (5 times 1.609344). Mistakes come from flipped fractions, so estimate first: a mile exceeds a kilometre, so the kilometre number must be bigger.",
        ],
        bullets: [
          "Multiply by fractions equal to one, like 2.54 cm per inch",
          "Arrange units to cancel; survivors are the answer's units",
          "Estimate direction first: bigger unit means smaller number",
        ],
      },
      {
        heading: "Length: inches, feet, miles, and metric",
        paragraphs: [
          "The anchors are 1 inch equals 2.54 cm exactly, 1 foot equals 30.48 cm, and 1 mile equals 1.609344 km. A person at 5 feet 9 inches stands 69 inches, and 69 times 2.54 gives 175.26 cm, usually rounded to 175. A marathon's 26.2 miles times 1.609344 lands at 42.16 km, matching the official 42.195 km race.",
          "For mental math, memorize three approximations: an inch is about 2.5 cm, a foot about 30 cm, and a mile about 1.6 km. Five miles is roughly 8 km, ten feet roughly 3 metres, and a 6-foot person roughly 183 cm (72 times 2.54 is 182.88). Approximate for conversation, then compute exactly for construction, medicine, and fittings.",
        ],
        bullets: [
          "5 ft 9 in equals 69 in equals 175.26 cm",
          "26.2 miles equals 42.16 km, the marathon distance",
          "Quick estimates: inch 2.5 cm, foot 30 cm, mile 1.6 km",
        ],
      },
      {
        heading: "Weight and volume: pounds, ounces, cups, litres",
        paragraphs: [
          "Weight hinges on 1 pound equals 0.45359237 kg and 1 ounce equals 28.35 g. A 150 lb person weighs 68.04 kg (150 times 0.45359237), and a 500 g flour bag is about 17.6 ounces (500 divided by 28.35). Kitchen scales that toggle grams beat scoops: a cup of flour varies 20 percent by packing, while 120 g is always 120 g.",
          "Volume adds the US cup at 236.59 ml, tablespoon at 14.79 ml, teaspoon at 4.93 ml, and US gallon at 3.785 L. Two cups make about 473 ml, four tablespoons make a quarter cup, and three teaspoons make one tablespoon. The trap: a US cup (236.59 ml) differs from the metric cup (250 ml) in many Commonwealth recipes, so check which cup yours means.",
        ],
        bullets: [
          "150 lb equals 68.04 kg; 1 oz equals 28.35 g",
          "1 US cup 236.59 ml; 1 tbsp 14.79 ml; 1 tsp 4.93 ml",
          "Bake by grams; US cup and metric cup differ",
        ],
      },
      {
        heading: "Temperature: the two formulas that matter",
        paragraphs: [
          "Celsius to Fahrenheit is F equals C times 9 over 5 plus 32; the reverse is C equals (F minus 32) times 5 over 9. Room temperature of 20 C becomes 68 F (20 times 1.8 plus 32), and (68 minus 32) times 5 over 9 returns exactly 20 C. Body temperature of 98.6 F converts to 37.0 C (66.6 times 5 over 9), the anchor every thermometer checks.",
          "Ovens reward memorization: 350 F is about 177 C ((350 minus 32) times 5 over 9 equals 176.67), 400 F about 204 C, and 180 C is 356 F, close enough to 350 F for most recipes. Remember interval sizes differ: one Celsius degree spans 1.8 Fahrenheit degrees, so a 10 C weather swing is a dramatic 18 F change.",
        ],
        bullets: [
          "F = C x 9/5 + 32; C = (F - 32) x 5/9",
          "20 C = 68 F; body 98.6 F = 37.0 C",
          "Oven anchors: 350 F near 177 C; 180 C near 356 F",
        ],
      },
      {
        heading: "Speed: km/h, mph, and metres per second",
        paragraphs: [
          "Road speed pivots on 1 mile equals 1.609344 km. A cruise of 100 km/h equals 62.14 mph (100 times 0.621371), while a 60 mph highway limit equals 96.56 km/h (60 times 1.609344). Science prefers metres per second: divide km/h by 3.6, so 100 km/h is 27.78 m/s.",
          "Runners live in pace, the inverse of speed: a 5-minute kilometre is 12 km/h (60 divided by 5), and a 30-minute 5K averages exactly 10 km/h. Drivers crossing borders should memorize three pairs: 50 km/h is about 31 mph, 100 km/h about 62 mph, and 120 km/h about 75 mph.",
        ],
        bullets: [
          "100 km/h equals 62.14 mph equals 27.78 m/s",
          "60 mph equals 96.56 km/h; 50 km/h is about 31 mph",
          "To m/s divide km/h by 3.6; switch dash units at borders",
        ],
      },
      {
        heading: "Conversion mistakes everyone makes",
        paragraphs: [
          "Mixing US and imperial units tops the list: a US gallon at 3.785 L is 20 percent smaller than an imperial gallon at 4.546 L, so cross-country fuel comparisons silently break. Confusing fluid ounces (volume, 29.57 ml) with weight ounces (mass, 28.35 g) curdles recipes and misleads shoppers.",
          "Subtler errors are power mistakes: a square foot is 929 square cm, not 30.48, because area scales with the square of length, and a cubic metre holds 1,000 litres, not 100. Convert the unit first, then apply the power. And round only at the end: rounding 2.54 to 2.5 mid-chain across five steps compounds into a visibly wrong answer.",
        ],
        bullets: [
          "US gallon 3.785 L vs imperial 4.546 L; confirm country",
          "Fluid ounces are volume; weight ounces are mass",
          "Round once at the end, never inside a chain",
        ],
      },
      {
        heading: "Quick conversion tables and FAQs",
        paragraphs: [
          "Pin these pairs: 5 ft is 152.4 cm, 5 ft 6 in is 167.64 cm, 6 ft is 182.88 cm; 130 lb is 58.97 kg, 150 lb is 68.04 kg, 180 lb is 81.65 kg; 30 C is 86 F, 25 C is 77 F, 0 C is 32 F; 5 km is 3.11 miles, 10 km is 6.21 miles, 100 miles is 160.93 km. Each follows from the anchors: 66 inches times 2.54 is 167.64, and 180 times 0.45359237 is 81.65.",
          "Which habit helps most? Typing the full unit string, like 5 ft 9 in to cm, because bare numbers invite the wrong factor. Grams and millilitres suit baking precision, cups suit weeknight speed. Match precision to the input: a 150 lb body weight deserves 68 kg, not 68.0388555 kg.",
        ],
        bullets: [
          "Height: 5 ft 152.4 cm; 5 ft 6 in 167.64 cm; 6 ft 182.88 cm",
          "Weight: 130 lb 58.97 kg; 150 lb 68.04 kg; 180 lb 81.65 kg",
          "Match precision to inputs; drop phantom decimals",
        ],
      },
    ],
  },
];

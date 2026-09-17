export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  toolPaths: string[];
  sections: BlogSection[];
};

export const BLOG_DATE = "2026-09-17";

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-");
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sip-investing-guide",
    title: "SIP Investing: The Complete Beginner's Guide",
    excerpt:
      "How Systematic Investment Plans work, what ₹5,000/month at 12% becomes in 10 years, and the mistakes that quietly eat your returns.",
    date: BLOG_DATE,
    readMins: 6,
    toolPaths: [
      "/financial-calculators/sip-calculator",
      "/financial-calculators/cagr-calculator",
      "/financial-calculators/compound-interest-calculator",
    ],
    sections: [
      {
        heading: "What a SIP actually is",
        paragraphs: [
          "A Systematic Investment Plan (SIP) is simply an automated instruction to invest a fixed amount — say ₹5,000 — into a mutual fund every month. Each instalment buys you units of the fund at that day's NAV (net asset value), so you automatically buy more units when markets fall and fewer when they rise. This is called rupee-cost averaging, and it is the whole point of a SIP.",
          "A SIP is not itself an investment product; it is a method of investing in mutual funds, usually equity funds for long-term goals. The alternative — investing a lump sum — can work well, but it requires timing and a large upfront amount. A SIP replaces both with discipline: small amounts, invested regularly, regardless of market noise.",
        ],
      },
      {
        heading: "The math: what ₹5,000 a month becomes",
        paragraphs: [
          "The future value of a SIP follows the formula FV = P × [((1 + r)^n − 1) / r] × (1 + r), where P is the monthly amount, r the monthly return, and n the number of months. Take ₹5,000/month for 10 years (120 months) at an assumed 12% annual return (r = 1% per month). The invested amount is ₹6,00,000, and the corpus grows to roughly ₹11.6 lakh — nearly double your contribution, with compounding doing the heavy lifting.",
          "Stretch the same SIP to 15 years and the corpus crosses ₹24 lakh on ₹9 lakh invested. Extend to 20 years and it approaches ₹50 lakh on ₹12 lakh invested. The extra 10 years add far more wealth than the first 10, because compounding accelerates late — time in the market beats timing the market.",
        ],
        bullets: [
          "5 years, ₹5,000/month at 12%: ~₹4.1 lakh on ₹3 lakh invested",
          "10 years: ~₹11.6 lakh on ₹6 lakh invested",
          "15 years: ~₹24.9 lakh on ₹9 lakh invested",
          "20 years: ~₹49.9 lakh on ₹12 lakh invested",
        ],
      },
      {
        heading: "Step-up SIPs beat flat SIPs",
        paragraphs: [
          "Your salary grows most years, so your SIP should too. A 10% annual step-up on a ₹5,000 SIP means ₹5,500/month in year two, ₹6,050 in year three, and so on. Over 15 years at 12% returns, a flat ₹5,000 SIP builds about ₹24.9 lakh — while the 10% step-up version builds roughly ₹42 lakh, because the extra contributions also compound.",
          "Most fund houses and apps let you set an automatic annual step-up when you start the SIP. If yours does not, set a calendar reminder to raise the amount every year at appraisal time. This single habit often matters more than picking the 'best' fund.",
        ],
      },
      {
        heading: "4 mistakes that eat your returns",
        paragraphs: [
          "The most expensive mistake is stopping SIPs when markets crash. A 20% fall means your fixed ₹5,000 buys 25% more units — pausing at the bottom locks in the worst of both worlds. Data from every major Indian market correction shows investors who continued SIPs through the dip recovered faster and earned higher effective returns (XIRR) than those who paused.",
          "The other three are just as common: chasing last year's top-performing fund instead of judging 5–7 year consistency, ignoring the expense ratio (a 1% higher fee can cost lakhs over 15 years), and redeeming equity SIPs for short-term goals under 5 years away, where market volatility can still hurt.",
        ],
        bullets: [
          "Never pause SIPs in a crash — downturns buy cheaper units",
          "Judge funds on 5–7 year rolling returns, not 1-year winners",
          "Prefer lower expense ratios; 1% extra fee compounds against you",
          "Match equity SIPs to goals 5+ years away; use RDs or FDs for nearer goals",
        ],
      },
      {
        heading: "How to start your first SIP",
        paragraphs: [
          "Start with a goal, not a fund: '₹15 lakh for a house down payment in 10 years' tells you the monthly amount (about ₹8,600/month at 12%) while 'I want high returns' tells you nothing. Then pick one broad-based flexi-cap or index fund, complete your KYC online (10 minutes with PAN + Aadhaar), and set up auto-debit for a date just after your salary arrives.",
          "Begin with an amount you can sustain through a bad year — even ₹2,000/month is fine — and add the annual step-up from day one. Review once a year, not once a week: check whether the fund still beats its benchmark over 3–5 years, and otherwise leave it alone. Boring is profitable.",
        ],
      },
    ],
  },
  {
    slug: "bmi-explained",
    title: "BMI Explained: What Your Number Really Means",
    excerpt:
      "How BMI is calculated, what a BMI of 22.9 means for a 70 kg adult, and why athletes and older adults should read it differently.",
    date: BLOG_DATE,
    readMins: 5,
    toolPaths: [
      "/health-calculators/bmi-calculator",
      "/health-calculators/calorie-calculator",
      "/health-calculators/body-fat-calculator",
    ],
    sections: [
      {
        heading: "The BMI formula in 30 seconds",
        paragraphs: [
          "Body Mass Index is your weight in kilograms divided by your height in metres squared: BMI = kg / m². Take a 70 kg person who is 175 cm (1.75 m) tall: 1.75² = 3.0625, and 70 ÷ 3.0625 = 22.9. That single number places them in the healthy range, and the whole calculation takes seconds.",
          "BMI was designed in the 1830s as a population-level screening tool, not a personal diagnosis. It is useful because it needs only height and weight, correlates reasonably with body fat at population scale, and predicts health risk bands well. But because it cannot see what your weight is made of, it must be interpreted — not worshipped.",
        ],
      },
      {
        heading: "What the ranges mean",
        paragraphs: [
          "The World Health Organization bands are: below 18.5 underweight, 18.5–24.9 healthy, 25–29.9 overweight, and 30+ obese. For Asian populations including Indians, several health bodies suggest lower action thresholds — around 23 for overweight and 27.5 for obese — because metabolic risk tends to rise at lower BMIs, with abdominal fat playing a bigger role.",
          "Each band is a risk signal, not a verdict. A BMI of 26 with an active lifestyle, normal blood pressure and a healthy waistline is a very different situation from a BMI of 26 with high triglycerides and no exercise. Use the band to decide whether to investigate further, and confirm with waist measurement, body fat percentage, and basic blood work.",
        ],
        bullets: [
          "Below 18.5 — underweight: check nutrition and underlying causes",
          "18.5–24.9 — healthy range for most adults",
          "25–29.9 — overweight: review diet, activity, and waist size",
          "30 and above — obese: consult a doctor for a full plan",
        ],
      },
      {
        heading: "Where BMI gets it wrong",
        paragraphs: [
          "Muscle is denser than fat, so a strength athlete at 85 kg and 175 cm has a BMI of 27.8 — technically 'overweight' — while carrying very little body fat. Conversely, a sedentary person with a 'healthy' BMI of 22 can still carry excess visceral fat around the organs, sometimes called normal-weight obesity, with real metabolic risk.",
          "Age, sex, and build all shift interpretation: older adults naturally lose muscle, pregnancy changes everything, and very tall or short people sit at the formula's less accurate edges. The fix is simple — pair BMI with one more measurement. Waist circumference (above ~90 cm for Indian men and ~80 cm for Indian women signals risk) or a body-fat estimate resolves most of the ambiguity.",
        ],
      },
      {
        heading: "From your number to an action plan",
        paragraphs: [
          "If your BMI is 27 and your goal is 23, translate that into kilograms: at 170 cm, a BMI of 23 means 66.5 kg (23 × 1.7²). If you weigh 78 kg now, that is an 11.5 kg journey — and at a sustainable 0.5 kg per week, roughly six months. Concrete targets beat vague resolutions every time.",
          "A daily deficit of about 400–500 kcal, mostly from food with walking or any activity you enjoy, produces that half-kilo-a-week pace. Estimate your maintenance calories, subtract the deficit, and track weight as a 7-day average rather than daily noise — water and glycogen can swing the scale by a kilo overnight.",
        ],
        bullets: [
          "Convert target BMI to target weight: target BMI × height(m)²",
          "Aim for 0.25–0.5 kg loss per week, not crash diets",
          "Track the 7-day average weight to ignore daily fluctuations",
          "Recalculate every 5 kg lost, since lighter bodies burn fewer calories",
        ],
      },
      {
        heading: "BMI for kids, athletes, and seniors",
        paragraphs: [
          "Children should never use adult BMI bands — paediatricians use age-and-sex percentiles instead, because healthy BMI changes constantly during growth. Athletes should lean on body-fat percentage and performance metrics, using BMI only as a rough trend line. Seniors should be cautious about aggressive weight loss, since preserving muscle and bone density matters more than chasing a BMI of 22.",
          "For most adults between these groups, though, BMI remains the fastest free screening tool available. Calculate it, sanity-check it with a waist measurement, and act on the pair — that two-minute habit catches problems years before symptoms do.",
        ],
      },
    ],
  },
  {
    slug: "home-loan-emi-guide",
    title: "Home Loan EMI: How to Pay Less Interest",
    excerpt:
      "The EMI formula with a ₹50 lakh example, why a 1% rate difference costs lakhs, and how one extra EMI a year cuts years off your loan.",
    date: BLOG_DATE,
    readMins: 6,
    toolPaths: [
      "/financial-calculators/emi-calculator",
      "/financial-calculators/mortgage-calculator",
      "/financial-calculators/amortization-calculator",
    ],
    sections: [
      {
        heading: "How your EMI is calculated",
        paragraphs: [
          "Your Equated Monthly Instalment comes from the formula EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r the monthly interest rate, and n the number of months. For a ₹50 lakh loan at 8.5% annual interest over 20 years (r = 0.007083, n = 240), the EMI works out to about ₹43,391 per month.",
          "Here is the sobering part: over 240 months you pay roughly ₹1.04 crore in total — ₹50 lakh of principal plus about ₹54 lakh of interest. More than half of what you pay the bank is interest. Every strategy below attacks that ₹54 lakh figure, and even small changes compound into lakhs saved.",
        ],
      },
      {
        heading: "Why 1% interest changes everything",
        paragraphs: [
          "On that same ₹50 lakh, 20-year loan, an 8.5% rate means ~₹54 lakh in lifetime interest, while 9.5% pushes it to ~₹62 lakh — a full ₹8 lakh extra for one percentage point. This is why negotiating the rate, improving your credit score before applying, and comparing at least three lenders matters more than haggling over processing fees.",
          "Existing borrowers should watch this too. If you took your loan at 9.5% and market rates have fallen to 8.5%, a balance transfer (refinancing) can save those same lakhs — just subtract the transfer fees and remaining tenure from the calculation before deciding. With 15+ years left, it almost always pays off.",
        ],
        bullets: [
          "₹50L at 8.5% for 20y: EMI ~₹43,391, interest ~₹54 lakh",
          "₹50L at 9.5% for 20y: EMI ~₹46,607, interest ~₹62 lakh",
          "Difference of 1%: ~₹3,200/month and ~₹8 lakh lifetime",
          "Compare at least 3 lenders; check balance transfer if rates fell",
        ],
      },
      {
        heading: "Tenure: the double-edged lever",
        paragraphs: [
          "Stretching tenure lowers the EMI but raises total interest sharply. That ₹50 lakh loan at 8.5% costs ~₹36 lakh in interest over 15 years (EMI ~₹49,202) versus ~₹54 lakh over 20 years (EMI ~₹43,391). The 20-year option 'saves' ₹5,800 a month but costs ₹18 lakh extra overall.",
          "The practical rule: choose the shortest tenure whose EMI stays within 30–35% of your monthly take-home pay, and keep a 6-month EMI emergency buffer. If a 15-year EMI of ₹49,000 strains a ₹1.3 lakh salary (38%), take the 20-year loan but prepay the difference — you keep flexibility while killing interest.",
        ],
      },
      {
        heading: "Prepayments: your secret weapon",
        paragraphs: [
          "Because early EMIs are mostly interest, extra payments in the first half of the loan destroy future interest. Paying just one extra EMI (₹43,391) per year on the ₹50 lakh, 20-year loan cuts the tenure by roughly 3.5 years and saves around ₹11 lakh in interest. A single annual bonus, redirected, buys back years of freedom.",
          "Timing matters more than size: ₹1 lakh prepaid in year 2 saves far more than ₹1 lakh in year 15, because early principal reduction shrinks every subsequent interest calculation. Check that your floating-rate loan has zero prepayment penalty (most do in India), then prepay early and often — even ₹5,000 a month extra makes a visible dent.",
        ],
      },
      {
        heading: "A 5-point checklist before you sign",
        paragraphs: [
          "First, confirm the all-in cost: interest rate type (fixed vs floating), processing fee, legal and valuation charges, and any insurance bundled into the loan. Second, verify the amortisation schedule — know exactly how much of your first-year EMIs goes to principal (often under 20%). Third, keep the EMI under one-third of take-home pay so a rate hike does not break you.",
          "Fourth, build the 6-month emergency fund before the first EMI, not after. Fifth, diarise an annual loan review: compare your rate with the market every 12 months and refinance or renegotiate when the gap exceeds 0.5%. Borrowers who review yearly routinely pay lakhs less than set-and-forget borrowers.",
        ],
        bullets: [
          "EMI under 30–35% of monthly take-home pay",
          "6-month EMI emergency buffer before disbursement",
          "Zero-prepayment-penalty floating rate where possible",
          "Annual rate review; refinance if gap exceeds 0.5%",
          "Factor in registration, stamp duty, and insurance in the budget",
        ],
      },
    ],
  },
  {
    slug: "ppf-vs-fd",
    title: "PPF vs FD: Where Should You Invest?",
    excerpt:
      "Post-tax returns compared with real numbers, when a 7.1% PPF beats a 7.5% FD, and how to use both in one portfolio.",
    date: BLOG_DATE,
    readMins: 5,
    toolPaths: [
      "/financial-calculators/ppf-calculator",
      "/financial-calculators/fd-calculator",
      "/financial-calculators/rd-calculator",
    ],
    sections: [
      {
        heading: "The two products, side by side",
        paragraphs: [
          "The Public Provident Fund (PPF) is a 15-year government-backed scheme currently paying around 7.1% annually, compounded yearly, with interest and maturity proceeds fully tax-free. You can invest up to ₹1.5 lakh per year, deposits qualify for Section 80C deduction, and the account can be extended in 5-year blocks indefinitely.",
          "A bank Fixed Deposit (FD) is far more flexible: tenures from 7 days to 10 years, rates roughly 6.5–7.5% depending on the bank and tenure, premature withdrawal with a small penalty, and loan-against-FD facilities. The catch is tax — FD interest is fully taxable at your slab rate every year, which changes the comparison dramatically.",
        ],
      },
      {
        heading: "Post-tax math: when 7.1% beats 7.5%",
        paragraphs: [
          "Invest ₹1.5 lakh for one year. A 7.5% FD earns ₹11,250 before tax — but in the 30% slab you keep only about ₹7,875, an effective return near 5.25%. The same ₹1.5 lakh in PPF at 7.1% keeps the full ₹10,650, tax-free. The 'lower' rate wins by nearly ₹2,800 because of tax treatment alone.",
          "Over 15 years the gap explodes through compounding: ₹1.5 lakh invested yearly grows to roughly ₹40.7 lakh in PPF at 7.1%, while the same deposits in a taxable 7.5% FD (effective ~5.25% post-tax in the top slab) reach only about ₹33 lakh. In the 10% slab the FD does relatively better, but PPF still leads for long horizons.",
        ],
        bullets: [
          "PPF interest: tax-free (EEE status) — you keep the full 7.1%",
          "FD interest: taxed yearly at your slab — 7.5% becomes ~5.25% in the 30% slab",
          "15 years of ₹1.5L/year: ~₹40.7L in PPF vs ~₹33L in taxable FD (30% slab)",
          "Lower slabs narrow the gap but rarely reverse it over long periods",
        ],
      },
      {
        heading: "Liquidity and safety compared",
        paragraphs: [
          "FDs win on liquidity: premature withdrawal anytime (typically a 0.5–1% rate penalty), plus overdraft or loan facilities against the deposit. PPF locks money for 15 years, with only partial withdrawals allowed from year 7 and a loan facility from years 3–6. Money you might need in two years does not belong in PPF.",
          "On safety, both are strong but different: PPF carries an explicit sovereign guarantee, while bank FDs are insured by DICGC up to ₹5 lakh per depositor per bank (principal + interest). Splitting large FDs across banks keeps every rupee within the insurance cover — a sensible habit for deposits above ₹5 lakh.",
        ],
      },
      {
        heading: "Who should pick which",
        paragraphs: [
          "Choose PPF for long-term, tax-free compounding: retirement savings, a child's education 10–15 years out, or the debt portion of your portfolio if you are in the 20–30% tax slab. The 80C deduction is a bonus, not the reason — the real prize is 15 years of untaxed compounding.",
          "Choose FDs for money with a date attached: an emergency fund (in a sweep-in FD, not savings account), a house down payment due in two years, or short-term parking of bonuses. Senior citizens should also note the extra 0.25–0.50% FD rates many banks offer, which can tilt short-horizon decisions toward FDs.",
        ],
      },
      {
        heading: "Using both in one portfolio",
        paragraphs: [
          "This is not an either-or decision. A clean structure: PPF for the 15-year retirement core (up to ₹1.5 lakh/year), FDs or RDs for goals under 3 years and the emergency fund, and equity SIPs for long-term growth above inflation. Each product covers the job the others cannot do.",
          "Revisit the split yearly. If FD rates spike above 8% or you drop to a lower tax slab, FDs deserve a bigger short-term role; if rates fall, lock PPF contributions early in April each year so the full year's balance earns interest from day one — deposits before April 5 earn interest for the entire month.",
        ],
      },
    ],
  },
  {
    slug: "percentage-mastery",
    title: "Percentages Made Easy: Formulas + Examples",
    excerpt:
      "The three percentage formulas that solve 95% of problems, with shopping, tip, tax, and exam-score examples worked out.",
    date: BLOG_DATE,
    readMins: 5,
    toolPaths: [
      "/math-calculators/percentage-calculator",
      "/financial-calculators/discount-calculator",
      "/other-calculators/tip-calculator",
    ],
    sections: [
      {
        heading: "The only 3 formulas you need",
        paragraphs: [
          "Nearly every percentage question is one of three types. Finding the part: Part = (Percent ÷ 100) × Whole — e.g. 20% of 250 = 0.20 × 250 = 50. Finding the percentage: Percent = (Part ÷ Whole) × 100 — e.g. 45 marks out of 60 = (45 ÷ 60) × 100 = 75%. Finding the whole: Whole = Part ÷ (Percent ÷ 100) — e.g. 30 is 15% of what? 30 ÷ 0.15 = 200.",
          "The trick is identifying which value is missing before touching the calculator. Ask: 'do I know the whole?' If yes and you need the part, multiply. If you have part and whole, divide. If you have the part and the rate, divide by the rate. Three patterns cover discounts, tips, taxes, scores, and salary hikes alike.",
        ],
      },
      {
        heading: "Shopping: discounts and stacked offers",
        paragraphs: [
          "A ₹1,999 shirt at 30% off: discount = 0.30 × 1,999 = ₹599.70, so you pay ₹1,399.30. Easy. But stacked offers trip people up: 'extra 10% off the already-discounted price' does not mean 40% off. After the 30% cut the price is ₹1,399.30, and 10% off that is ₹139.93 more — final price ₹1,259.37, an effective discount of 37%, not 40%.",
          "Percentages multiply, they never add, when applied in sequence. Two successive 20% discounts equal a 36% total cut (0.8 × 0.8 = 0.64 of the original), and a 20% hike followed by a 20% cut leaves you 4% below where you started. Sellers count on shoppers adding instead of multiplying — now you know better.",
        ],
        bullets: [
          "Single discount: price × (1 − discount rate)",
          "Stacked discounts multiply: 30% then 10% = 37% effective, not 40%",
          "20% up then 20% down = 4% net loss (1.2 × 0.8 = 0.96)",
          "Always compute on the running price, not the original tag",
        ],
      },
      {
        heading: "Food bills: tips, tax, and splitting",
        paragraphs: [
          "A ₹1,200 bill with 10% tip and 5% GST: tax = 0.05 × 1,200 = ₹60, tip = 0.10 × 1,200 = ₹120 (tip on the pre-tax amount is the standard), total ₹1,380. Splitting among 4? ₹345 each. The common error is tipping on the tax-inclusive total — harmless once, but it adds up over a year of dining out.",
          "For quick mental tips, use the 10% anchor: 10% of ₹1,200 is ₹120 (move the decimal one place), so 15% is ₹120 + ₹60 (half again) = ₹180, and 20% is simply double the 10% figure. This anchor method handles any bill in seconds without a calculator.",
        ],
      },
      {
        heading: "Percent change vs percentage points",
        paragraphs: [
          "If your investments grow from ₹50,000 to ₹65,000, the percent change is ((65,000 − 50,000) ÷ 50,000) × 100 = 30%. The direction matters: going from ₹65,000 back to ₹50,000 is a 23% fall, not 30% — because the base changed. Always divide by the starting value, never the ending one.",
          "And do not confuse percent change with percentage points. If a home-loan rate rises from 8% to 9%, that is a 1 percentage-point increase but a 12.5% relative increase (1 ÷ 8). Politicians, advertisers, and headlines routinely blur this line; checking which one is meant takes five seconds and often reverses the conclusion.",
        ],
      },
      {
        heading: "Mental-math shortcuts that work",
        paragraphs: [
          "Three shortcuts handle most everyday cases. Flip it: 18% of 50 is the same as 50% of 18, which is 9 — swapping makes one side friendly. Build from 10% and 1%: 10% of 640 is 64 and 1% is 6.4, so 12% is 64 + 6.4 + 6.4 = 76.8. And for 'X is what % of Y', simplify the fraction first: 30 of 120 is 1/4, which is 25%.",
          "Practice these on bills and price tags for a week and they become automatic. The calculator remains the tool for exact figures — EMIs, tax filings, investment returns — but estimation is the skill that tells you whether the calculator's answer is sane before you act on it.",
        ],
        bullets: [
          "Flip: a% of b = b% of a — pick the easier direction",
          "Build from 10% and 1% anchors for any rate",
          "Simplify part/whole to a fraction before converting",
          "Estimate first, calculate exact second — catch input errors",
        ],
      },
    ],
  },
  {
    slug: "income-tax-basics",
    title: "Income Tax Basics: Slabs, Deductions & Planning",
    excerpt:
      "Old vs new regime in plain English, which deductions actually matter, and a month-by-month plan to avoid the March rush.",
    date: BLOG_DATE,
    readMins: 6,
    toolPaths: [
      "/financial-calculators/income-tax-calculator",
      "/financial-calculators/salary-calculator",
    ],
    sections: [
      {
        heading: "How income tax actually works",
        paragraphs: [
          "India's income tax is slab-based: different slices of your income are taxed at different rates, and only the slice above each threshold faces the higher rate. Earning ₹13 lakh does not mean all ₹13 lakh is taxed at the top rate — the first slices are taxed at lower or zero rates, and only the portion above each cutoff moves up. This marginal system is the single most misunderstood fact in personal finance.",
          "Your gross salary is also not your taxable income. Subtract the standard deduction (₹75,000 under the new regime), exempt allowances like HRA in the old regime, and chapter VI-A deductions such as 80C — what remains is the figure slabs apply to. Every tax plan is really about shrinking that taxable figure legally.",
        ],
      },
      {
        heading: "Old regime vs new regime",
        paragraphs: [
          "The new regime taxes income at lower slab rates but removes most exemptions — no HRA, no 80C, no 80D. It suits people with few deductions: young renters without a home loan, or anyone who prefers simplicity. It is the default regime, and salaried income up to about ₹12.75 lakh effectively pays no tax after the standard deduction and rebate.",
          "The old regime keeps higher slab rates but preserves the full deduction toolkit: HRA, 80C (₹1.5 lakh), 80D health insurance, NPS 80CCD(1B), and home-loan interest under section 24(b). It usually wins when your total deductions exceed roughly ₹4–5 lakh — common for homeowners with HRA, 80C, and 80D combined. The only correct answer is to compute both every year, because salary changes and rule tweaks flip the winner regularly.",
        ],
        bullets: [
          "New regime: lower rates, almost no deductions, simpler",
          "Old regime: higher rates, full deductions — wins with ~₹4–5L+ of claims",
          "Compare both regimes every financial year before filing",
          "Salaried employees can switch regimes year to year (with conditions)",
        ],
      },
      {
        heading: "Deductions that actually move the needle",
        paragraphs: [
          "Section 80C (₹1.5 lakh limit) is the workhorse: EPF contributions, PPF, ELSS funds, children's tuition fees, and home-loan principal all count — most salaried people fill half of it without trying. Section 80D covers health-insurance premiums (up to ₹25,000 for self/family, ₹50,000 for senior-citizen parents), and section 80CCD(1B) adds an extra ₹50,000 for NPS on top of 80C.",
          "Beyond those, HRA exemption helps renters in the old regime (minimum of actual HRA, 50%/40% of basic, or rent minus 10% of salary), section 24(b) allows up to ₹2 lakh of home-loan interest against let-out or self-occupied property, and the standard deduction applies automatically. These five — 80C, 80D, NPS, HRA, home-loan interest — cover 90% of realistic tax savings for employees.",
        ],
      },
      {
        heading: "A real example: ₹12 lakh salary",
        paragraphs: [
          "Take a salaried employee earning ₹12 lakh with ₹1.5 lakh in 80C (EPF + PPF), a ₹25,000 health-insurance premium, and ₹50,000 in NPS. Old-regime taxable income: roughly ₹12,00,000 − ₹50,000 (standard deduction) − ₹1,50,000 − ₹25,000 − ₹50,000 = about ₹9.25 lakh, taxed at old-regime slabs.",
          "Under the new regime the same person claims only the ₹75,000 standard deduction, leaving about ₹11.25 lakh taxable — but at lower slab rates with rebate mechanics. Running both side by side takes two minutes with an income-tax calculator and reveals the cheaper option instantly. Never assume last year's winner still wins.",
        ],
      },
      {
        heading: "Plan across the year, not in March",
        paragraphs: [
          "The March scramble — random ELSS purchases and insurance bought for receipts rather than needs — is how people end up with unsuitable products. Instead, declare planned 80C/80D investments to your employer in April so TDS spreads correctly, automate monthly PPF or ELSS contributions, and file proofs as they arrive.",
          "Do a 15-minute review each quarter: July (confirm TDS matches Form 26AS/AIS), October (adjust for raises), January (final regime choice and top-ups), March only for verification. And avoid the big three mistakes: never rechecking your regime, buying insurance purely for 80C, and ignoring AIS mismatches until a notice arrives.",
        ],
        bullets: [
          "April: declare planned deductions to employer for correct TDS",
          "July & October: reconcile TDS with Form 26AS/AIS",
          "January: final old-vs-new comparison and top-ups",
          "Separate insurance from investing; file before the July deadline",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPrevNextPost(slug: string): {
  prev: BlogPost | undefined;
  next: BlogPost | undefined;
} {
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? blogPosts[idx - 1] : undefined,
    next: idx < blogPosts.length - 1 ? blogPosts[idx + 1] : undefined,
  };
}

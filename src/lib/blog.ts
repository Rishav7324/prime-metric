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
    readMins: 9,
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
      {
        heading: "SIP vs lump sum: when each wins",
        paragraphs: [
          "If you already hold ₹6 lakh in cash, should you invest it all at once or drip it in as a SIP? Pure math favours the lump sum in a rising market: ₹6 lakh invested at once at 12% for 10 years becomes 6,00,000 × 1.12^10 = about ₹18.6 lakh, while a ₹5,000/month SIP invests the same ₹6 lakh gradually and reaches roughly ₹11.6 lakh — because the SIP's later instalments spend fewer years compounding.",
          "But timing risk flips the answer. Invest that ₹6 lakh the month before a 20% crash and it shrinks to ₹4.8 lakh overnight; growing back at 12% for 10 years it reaches only about ₹14.9 lakh — and most investors panic-sell at the bottom. A SIP sidesteps this regret entirely: early instalments buy the dip, and there is never a single day that decides your fate. Rule of thumb: genuine windfall plus a 7+ year horizon and strong nerves — consider a lump sum or a 6–12 month STP; regular salary income — SIP without debate.",
        ],
        bullets: [
          "₹6L lump sum at 12% for 10y ≈ ₹18.6L vs ₹5,000/month SIP ≈ ₹11.6L on the same ₹6L invested",
          "Lump sum wins in steadily rising markets; SIP wins on psychology and volatile entry points",
          "Middle path: park a windfall in a liquid fund and STP it into equity over 6–12 months",
          "Never fund a lump sum with emergency money or short-term savings",
        ],
      },
      {
        heading: "What fees and taxes shave off your SIP",
        paragraphs: [
          "A 1% higher expense ratio quietly costs around ₹67,000 on a 10-year ₹5,000/month SIP: at 12% gross the corpus is about ₹11.62 lakh, while at 11% net it is about ₹10.95 lakh — same contributions, same market, different fee. That is why direct plans, which typically charge 0.8–1.2% less than regular plans of the same fund, deserve your attention before any fund comparison.",
          "Taxes take a second bite. Equity fund gains above ₹1.25 lakh a year face 12.5% long-term capital gains tax (after one year of holding), so a ₹4 lakh long-term gain means roughly ₹34,375 in tax on the ₹2.75 lakh above the exemption. ELSS funds add a twist: they save 80C tax today but lock every SIP instalment for 3 years. Factor both in, and judge SIPs on post-fee, post-tax XIRR — not headline NAV returns.",
        ],
        bullets: [
          "Compare direct-plan expense ratios; 1% extra fee ≈ ₹67,000 lost on a 10y ₹5,000 SIP",
          "Equity LTCG: 12.5% on gains above ₹1.25L per year after 1-year holding",
          "ELSS saves 80C tax but each instalment is locked for 3 years",
          "Track XIRR (your personal annualised return), not the fund's advertised returns",
        ],
      },
      {
        heading: "SIP questions everyone asks",
        paragraphs: [
          "Can I pause a SIP? Yes — most funds allow a pause of 1–6 months without penalty, and pausing beats cancelling because your existing units keep compounding. Skipping three ₹5,000 instalments in year 3 of a 15-year SIP costs surprisingly little (those ₹15,000 would have grown to roughly ₹55,000), while stopping the whole SIP destroys the compounding tail that matters most.",
          "When can I withdraw? Anytime for open-ended funds — SIPs have no lock-in except ELSS — but withdrawing equity within 5 years of a long-term goal invites sequence risk. The SIP date itself barely matters: AMFI data shows 5th vs 25th debit dates differ by fractions of a percent over a decade. Automate for the day after salary, add the step-up, and spend your energy on asset allocation instead.",
        ],
        bullets: [
          "Pause up to a few months if needed; avoid full cancellation in downturns",
          "Only ELSS SIPs lock in (3 years per instalment); other equity funds stay liquid",
          "SIP date has negligible long-term effect — pick the day after salary credit",
          "One flexi-cap or index fund is enough to start; diversify across goals, not funds",
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
    readMins: 9,
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
      {
        heading: "BMI vs body-fat percentage vs waist-to-height ratio",
        paragraphs: [
          "Consider two men who are both 175 cm and 85 kg — identical BMI of 27.8 (85 ÷ 3.0625). One is a lifter with a 82 cm waist and 16% body fat; the other is sedentary with a 102 cm waist and 31% body fat. Same BMI, opposite health pictures. This is exactly why a second metric matters: body-fat percentage tells you what the weight is, while waist measurements tell you where it sits.",
          "The cheapest upgrade is the waist-to-height ratio: divide waist by height in the same units and keep it under 0.5. Our lifter scores 82 ÷ 175 = 0.47 (healthy), while the sedentary man scores 102 ÷ 175 = 0.58 (high risk) — instant separation that BMI alone could never give. Use BMI as the smoke alarm, waist-to-height as the confirmation, and a body-fat estimate (callipers, smart scale, or DEXA for precision) when the two disagree.",
        ],
        bullets: [
          "BMI 27.8 can mean 16% or 31% body fat — composition decides the meaning",
          "Waist-to-height ratio under 0.5 is the simplest confirmation check",
          "Body-fat guide: athletic men 10–16%, women 18–24%; obese roughly 25%+ men, 32%+ women",
          "If BMI and waist agree, act; if they conflict, measure body fat before deciding",
        ],
      },
      {
        heading: "Three worked weight targets",
        paragraphs: [
          "Target weight is just target BMI × height². A 160 cm adult at 80 kg has a BMI of 31.2 (80 ÷ 2.56) — for a BMI of 22 the target is 22 × 2.56 = 56.3 kg, a journey of about 23.7 kg. At a steady 0.5 kg per week that is roughly 11–12 months, which is why crash diets promising it in 3 months should be ignored.",
          "A 170 cm adult at 90 kg has a BMI of 31.1 (90 ÷ 2.89); reaching BMI 23 means 23 × 2.89 = 66.5 kg, or 23.5 kg to lose. A smaller case: 165 cm at 68 kg is BMI 25.0 (68 ÷ 2.7225) — just into overweight — and reaching BMI 23 needs only 62.6 kg, a 5.4 kg trim achievable in about 3 months at 0.4 kg per week. Same formula, wildly different plans: always convert the BMI goal into kilograms and weeks before starting.",
        ],
        bullets: [
          "160 cm, 80 kg (BMI 31.2) → 56.3 kg at BMI 22: ~24 kg, plan for a year",
          "170 cm, 90 kg (BMI 31.1) → 66.5 kg at BMI 23: ~23.5 kg, plan in 5 kg blocks",
          "165 cm, 68 kg (BMI 25.0) → 62.6 kg at BMI 23: ~5.4 kg, about 3 months",
          "Lose 0.25–0.5 kg/week; faster rates mostly sacrifice muscle and rebound",
        ],
      },
      {
        heading: "Mistakes people make tracking BMI",
        paragraphs: [
          "The classic error is weighing daily and reacting to noise: a salty dinner plus glycogen can add a kilo overnight with zero fat gain, and morning-vs-evening readings differ by 0.5–1.5 kg. Weigh first thing in the morning, 2–3 times a week, and judge the 2-week trend — then recalculate BMI monthly, not daily.",
          "The second error is chasing BMI down with extreme deficits. Cutting 1,000+ kcal a day cannibalises muscle, drops maintenance calories, and stalls you at a 'healthy' BMI with a soft, weak physique — thin outside, still high body fat. Keep protein near 1.2–1.6 g per kg of target weight, add two weekly strength sessions, and accept 0.5 kg a week. A BMI of 23 built on muscle outperforms a BMI of 21 built on loss of it.",
        ],
        bullets: [
          "Weigh consistently (morning, similar clothes) and trust trends, not single readings",
          "Recalculate BMI monthly and calorie needs every 5 kg lost",
          "Keep protein high and lift weights while losing — protect muscle, lose fat",
          "Plateaued for 3+ weeks? Cut 150–200 kcal or add 2,000 daily steps, not a crash diet",
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
    readMins: 9,
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
      {
        heading: "Fixed vs floating: which costs less",
        paragraphs: [
          "On a ₹50 lakh, 20-year loan, a floating rate of 8.5% sets the EMI near ₹43,391 with lifetime interest around ₹54.1 lakh, while a fixed rate just 0.5 points higher at 9.0% pushes the EMI to about ₹44,986 and interest to roughly ₹58.0 lakh — nearly ₹3.9 lakh extra for the certainty of a fixed payment. Floating rates have historically won in India over full 15–20 year tenures, but they can spike mid-loan and strain budgets.",
          "Choose floating if your EMI sits comfortably under 30% of take-home pay and you keep the 6-month buffer — you can absorb hikes and benefit from cuts. Choose fixed (or a 2–3 year fixed-then-floating hybrid, if offered) if the EMI already stretches past 35% of income, or if rate certainty is what lets you sleep. Either way, confirm the reset clause: how often the floating rate revises, which benchmark it tracks, and the spread the bank adds over it.",
        ],
        bullets: [
          "₹50L/20y at 8.5% floating: EMI ~₹43,391, interest ~₹54.1L",
          "Same loan at 9.0% fixed: EMI ~₹44,986, interest ~₹58.0L (~₹3.9L more)",
          "Floating usually cheaper long-term but EMIs can rise mid-tenure",
          "Check benchmark, spread, and reset frequency before signing a floating loan",
        ],
      },
      {
        heading: "Balance transfer: a worked example",
        paragraphs: [
          "Suppose three years into a ₹50 lakh loan you still owe about ₹40 lakh with 15 years left, paying 9.3% — EMI roughly ₹41,288 and remaining payouts totalling about ₹74.3 lakh. A competing bank offers 8.5%: the EMI drops to about ₹39,390 and the remaining total to roughly ₹70.9 lakh. The saving is around ₹1,900 a month and about ₹3.4 lakh overall — well above typical transfer costs of ₹10,000–25,000 in processing plus legal charges.",
          "The transfer pays off fastest when the balance is large and the remaining tenure is long; with under 5 years left, the same 0.8-point gap may save less than the fees and paperwork cost. Get the foreclosure letter, confirm no prepayment penalty on your floating loan, negotiate the spread (not just the headline rate), and restart prepayments immediately after the switch instead of absorbing the lower EMI into spending.",
        ],
        bullets: [
          "₹40L, 15y left: 9.3% → 8.5% saves ~₹1,900/month and ~₹3.4L overall",
          "Transfer costs ~₹10,000–25,000; worthwhile when tenure left exceeds ~7–8 years",
          "Confirm zero prepayment penalty and compare all-in rates, not headlines",
          "Keep paying the old EMI after transfer — the surplus becomes automatic prepayment",
        ],
      },
      {
        heading: "Home-loan tax and prepayment FAQs",
        paragraphs: [
          "In the old tax regime, principal repayment up to ₹1.5 lakh a year counts under 80C (shared with EPF and PPF), while interest up to ₹2 lakh a year on a self-occupied house is deductible under section 24(b) — together worth up to about ₹1.1 lakh in tax for someone in the 30% slab. The new regime offers no such deductions, so compare regimes before assuming the benefits apply to you.",
          "On prepayments, floating-rate loans in India generally carry zero foreclosure charges for individual borrowers, while fixed-rate loans may charge 1–2%. Prepaying ₹5,000 extra a month from year one on the ₹50 lakh, 20-year loan at 8.5% wipes out roughly 3 years and saves several lakhs in interest — and unlike market investments, that return is risk-free and tax-free. Ask your lender whether part-payments reduce tenure or EMI, and always choose tenure reduction for maximum interest saved.",
        ],
        bullets: [
          "Old regime: principal under 80C (₹1.5L) + interest under 24(b) (₹2L self-occupied)",
          "New regime: no home-loan deductions — run both regimes yearly",
          "Floating-rate prepayment is usually free; fixed-rate may charge 1–2%",
          "Direct part-payments at tenure reduction, made early and often",
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
    readMins: 8,
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
      {
        heading: "The April 5 trick that boosts PPF returns",
        paragraphs: [
          "PPF interest for each month is calculated on the lowest balance between the 5th and month-end — so money deposited after April 5 misses April's interest entirely. Deposit the full ₹1.5 lakh before April 5 and it earns 7.1% for all 12 months: 1,50,000 × 7.1% = ₹10,650 for the year. Drip the same ₹1.5 lakh as ₹12,500 on the 10th of each month and the first-year interest totals only about ₹5,900 — a gap of roughly ₹4,750 in year one alone, compounding every year after.",
          "The practical move: park your planned PPF amount in a sweep-in FD or liquid fund, then push it into PPF in the first week of April. Monthly contributors who cannot invest a lump sum should still deposit before the 5th of each month rather than on salary day — a one-time standing instruction dated the 3rd captures the full month's interest twelve times a year at zero extra cost.",
        ],
        bullets: [
          "₹1.5L before April 5 earns ~₹10,650 that year; monthly deposits earn only ~₹5,900",
          "PPF interest uses the lowest balance between the 5th and month-end",
          "Automate deposits for the 3rd of the month, not salary day",
          "Lump sum in early April beats monthly instalments for identical yearly totals",
        ],
      },
      {
        heading: "FD laddering vs extending PPF",
        paragraphs: [
          "When a 5-year goal needs both safety and liquidity, FD laddering beats one big deposit. Split ₹5 lakh into five ₹1 lakh FDs of 1, 2, 3, 4, and 5 years at 7%: they mature at roughly ₹1.07L, ₹1.14L, ₹1.23L, ₹1.31L, and ₹1.40L — giving you cash every year while the longest piece still earns the full rate. If rates rise, only the maturing rung reinvests at the new rate; if rates fall, four rungs already locked the old one.",
          "PPF's answer to changing rates is the 5-year extension: after maturity at year 15 (about ₹40.7 lakh on ₹1.5L/year at 7.1%), you can extend indefinitely with or without fresh contributions, and the whole balance keeps earning tax-free. Use ladders for money you will spend in stages, and PPF extensions for money you will not touch for another decade — retirees often run both, living off maturing FD rungs while the PPF core compounds untouched.",
        ],
        bullets: [
          "FD ladder: split across 1–5y tenures for yearly liquidity plus full long-rate earnings",
          "₹1L rungs at 7% mature ~₹1.07L/₹1.14L/₹1.23L/₹1.31L/₹1.40L across years 1–5",
          "PPF extends in 5-year blocks with or without fresh deposits, fully tax-free",
          "Retiree pattern: spend FD rungs, leave PPF compounding for later decades",
        ],
      },
      {
        heading: "PPF and FD mistakes to avoid",
        paragraphs: [
          "The costliest FD mistake is ignoring TDS: banks deduct 10% tax when yearly interest per bank crosses ₹40,000 (₹50,000 for senior citizens), but that is not your final tax — a 30%-slab investor still owes the ₹20,000 difference at filing time. File Form 15G/15H only if your total income is genuinely below the taxable limit; a false declaration draws interest and scrutiny.",
          "On PPF, three errors recur: depositing after April 5 and forfeiting a month's interest, breaching the ₹1.5 lakh yearly cap across multiple accounts (the excess earns nothing and invites compliance trouble), and opening a second PPF in your own name — only one PPF account per person is allowed, though you may open one for a minor child. Nominees, online access, and the years 3–6 loan facility (up to 25% of the balance two years prior) should all be set up in year one, not year ten.",
        ],
        bullets: [
          "FD TDS (10%) is advance tax, not final tax — pay the slab difference yourself",
          "File 15G/15H only when total income is truly below the exemption limit",
          "One PPF per person; cap ₹1.5L/year across all your deposits including a minor's",
          "Deposit before April 5, add a nominee, and split large FDs across banks for DICGC cover",
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
    readMins: 8,
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
      {
        heading: "Salary hikes, CAGR, and real growth",
        paragraphs: [
          "A 10% hike on a ₹60,000 monthly salary adds 0.10 × 60,000 = ₹6,000, taking you to ₹66,000 — but two consecutive 10% hikes do not total 20%. Year two compounds on the new base: 66,000 × 1.10 = ₹72,600, a total gain of 21% (1.10² = 1.21). Employers quoting '10% every year for two years' are describing 21% growth, and your rent negotiations should treat it that way.",
          "Investments need the reverse lens: CAGR. If ₹50,000 grows to ₹65,000 over 3 years, the annualised return is (65,000 ÷ 50,000)^(1/3) − 1 = 1.30^0.333 − 1 ≈ 9.1% per year — not the 10% you get from dividing 30% by 3. Simple averages overstate multi-year growth because they ignore compounding; CAGR is the only honest yearly figure, which is why mutual funds must report it.",
        ],
        bullets: [
          "₹60,000 + 10% = ₹66,000; two 10% hikes = ₹72,600 (21%, not 20%)",
          "₹50,000 → ₹65,000 in 3y is 30% total but only ~9.1% CAGR",
          "Never average yearly percentages — compound or use CAGR instead",
          "Apply to appraisals, rent escalation, and SIP return claims alike",
        ],
      },
      {
        heading: "Four worked everyday problems",
        paragraphs: [
          "GST: a ₹18,000 laptop with 18% GST adds 0.18 × 18,000 = ₹3,240, for a total of ₹21,240. Reverse it — a ₹21,240 price inclusive of 18% means the base is 21,240 ÷ 1.18 = ₹18,000 exactly. Dividing by (1 + rate) unpicks any tax-inclusive price, from restaurant bills to freelance quotes.",
          "Scores and tips round out the set: 132 marks out of 150 is (132 ÷ 150) × 100 = 88%, while a 15% tip on an ₹860 bill is 0.15 × 860 = ₹129 — round to ₹130 and move on. Notice each uses a different one of the three core formulas (whole from inclusive total, percent from part and whole, part from percent and whole), which is precisely why identifying the missing value first solves 95% of problems.",
        ],
        bullets: [
          "Add GST: base × (1 + rate); strip GST: inclusive ÷ (1 + rate)",
          "Exam score: (marks ÷ total) × 100 — 132/150 = 88%",
          "Tip: rate × pre-tax bill — 15% of ₹860 = ₹129",
          "Name the missing value (part, percent, or whole) before calculating",
        ],
      },
      {
        heading: "Percentage traps even smart people fall for",
        paragraphs: [
          "Trap one is averaging percentages with different bases: 50% off one store plus 30% off another is not 40% off overall unless both bills are identical — percentages only average cleanly over equal bases. Trap two is the base switch: a stock that falls 50% needs a 100% gain to recover (₹100 → ₹50 needs +₹50, which is 100% of ₹50), a fact loss-recovery emails hope you never compute.",
          "Trap three is confusing '200% more' with '200% of': a tip rising from ₹100 to ₹300 is 300% of the original but 200% more than it — the word 'more' subtracts the base. When stakes are high — loan offers, medical risks, salary comparisons — always convert back to absolute rupees first, then decide. Percentages persuade; absolute numbers clarify.",
        ],
        bullets: [
          "Never average percentages across unequal bases — weight by the base",
          "A 50% loss needs a 100% gain to break even; losses hurt more than gains help",
          "'200% more' = 3× total; '200% of' = 2× total — read the wording",
          "Convert to rupees before deciding anything expensive",
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
    readMins: 9,
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
      {
        heading: "New-regime slabs with a worked calculation",
        paragraphs: [
          "Under the new regime slabs (0–₹4 lakh nil, ₹4–8 lakh at 5%, ₹8–12 lakh at 10%, ₹12–16 lakh at 15%, and higher bands beyond), a taxable income of ₹11.25 lakh attracts roughly ₹20,000 on the second slab (4,00,000 × 5%) plus about ₹32,500 on the third (3,25,000 × 10%) — about ₹52,500 before cess and rebate. In practice the rebate wipes this out for incomes up to about ₹12 lakh (₹12.75 lakh for salaried employees after the ₹75,000 standard deduction), which is why most mid-salaried employees owe nothing in the new regime.",
          "Contrast the old regime on ₹9.25 lakh taxable: roughly ₹12,500 on the ₹2.5–5 lakh band (2,50,000 × 5%) plus about ₹42,500 on the ₹5–9.25 lakh band (4,25,000 × 10%) — about ₹55,000 plus 4% cess, or roughly ₹57,200. Neither figure includes surcharges or marginal relief, so treat this as a comparison framework rather than your exact liability — then run your own numbers through an income-tax calculator with current-year slab and rebate rules before choosing.",
        ],
        bullets: [
          "₹11.25L taxable (new regime): ~₹52,500 slab tax before cess and rebate",
          "Rebate zeroes new-regime liability up to ~₹12L (₹12.75L salaried with standard deduction)",
          "₹9.25L taxable (old regime): ~₹55,000 + 4% cess ≈ ₹57,200",
          "Always recompute with the current year's official slabs before filing",
        ],
      },
      {
        heading: "HRA exemption: three worked cases",
        paragraphs: [
          "HRA exemption (old regime only) is the minimum of three figures: actual HRA received, 50% of basic salary for metro cities (40% elsewhere), and rent paid minus 10% of basic. Take basic pay of ₹7.2 lakh a year with ₹3 lakh HRA received. Paying ₹20,000/month rent (₹2.4 lakh/year) in Mumbai gives min(3,00,000, 3,60,000, 2,40,000 − 72,000) = ₹1,68,000 exempt — the rent-minus-10% leg binds.",
          "Raise that Mumbai rent to ₹30,000/month (₹3.6 lakh/year) and the exemption jumps to min(3,00,000, 3,60,000, 2,88,000) = ₹2,88,000. But the same ₹30,000 rent in a non-metro city gives min(3,00,000, 2,88,000, 2,88,000) = ₹2,88,000 — here the 40%-of-basic ceiling binds instead. Lesson: in metros, higher rent directly raises exemption until HRA caps it; outside metros, the 40% ceiling caps you early, so oversized rent buys no extra tax benefit. Keep rent receipts and the landlord's PAN for annual rent above ₹1 lakh.",
        ],
        bullets: [
          "Formula: min(actual HRA, 50%/40% of basic, rent − 10% of basic)",
          "Metro, ₹20k rent on ₹7.2L basic: ₹1,68,000 exempt (rent leg binds)",
          "Metro, ₹30k rent: ₹2,88,000 exempt; non-metro, same rent: ₹2,88,000 (40% ceiling binds)",
          "Landlord PAN mandatory for yearly rent above ₹1 lakh; keep receipts monthly",
        ],
      },
      {
        heading: "Tax mistakes that trigger notices",
        paragraphs: [
          "The most common notice-generator is ignoring the Annual Information Statement: your bank reports ₹60,000 of FD interest while you declare ₹40,000, and the computer flags the ₹20,000 gap automatically. Interest on savings accounts (taxable beyond the ₹10,000 section 80TTA deduction, ₹50,000 under 80TTB for seniors), second-employer Form 16s, and freelance receipts all feed the same mismatch engine.",
          "The other repeat mistakes: forgetting to pay advance tax when non-TDS income (rent, capital gains, freelance) pushes extra liability above ₹10,000 a year, which draws 234B/234C interest; and mixing up the filing deadline with the regime deadline — salaried staff can usually switch regimes yearly when filing on time, but a belated return locks you out of choices and carry-forward losses. File early, reconcile AIS/TIS with Form 26AS first, and pay advance tax in the June–September–December–March instalments instead of one March panic.",
        ],
        bullets: [
          "Reconcile AIS/TIS with Form 26AS before filing — declare every rupee of interest",
          "Advance tax applies above ₹10,000 extra liability; missed instalments draw interest",
          "Belated returns restrict regime choice and loss carry-forward — file on time",
          "Never buy ULIPs or endowment plans in March purely for 80C receipts",
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

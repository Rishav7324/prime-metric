# Prime Metric - Free Online Calculators & Tools

Welcome to Prime Metric, a comprehensive online platform featuring over 100 calculators, converters, and tools designed for a wide range of daily needs. From complex financial modeling to simple health metrics and developer utilities, Prime Metric provides users with accurate, fast, and easy-to-use resources, all completely free.

This project is built with a modern tech stack, focusing on performance, user experience, and scalability.

## ✨ Key Features

- **100+ Calculators & Tools:** A vast collection spanning multiple categories:
    - **Financial:** Mortgage, Loan, Investment, Retirement, and more.
    - **Health & Fitness:** BMI, BMR, Calorie, Body Fat, and others.
    - **Mathematics:** Scientific, Percentage, Fraction, Area, Volume, etc.
    - **Daily Utilities:** Age, Date, Time Zone, Grade, and Tip calculators.
- **Developer & Image Tools:** A suite of utilities for developers and designers, including a JSON Formatter, Base64 Encoder, QR Code Generator, Image Resizer, and Color Picker.
- **AI-Powered Summarizer:** An integrated AI tool to summarize web content.
- **Fully Responsive Design:** A seamless experience across desktops, tablets, and mobile devices.
- **Comprehensive Search:** A powerful search bar that allows users to quickly find any calculator.
- **User Trust & Compliance:** Includes all necessary legal pages (Privacy Policy, Terms of Service, Disclaimer) and a cookie consent banner to comply with regulations like GDPR.
- **AdSense Integration:** Strategically placed ad banners for website monetization.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore for data, Firebase Authentication)
- **Hosting:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/speed-insights)

## 📁 Folder Structure

The project follows a standard Next.js App Router structure with some key organizational choices:

```
.
├── src
│   ├── app
│   │   ├── (calculators)         # Route groups for different calculator categories
│   │   │   ├── financial-calculators
│   │   │   ├── health-calculators
│   │   │   ├── math-calculators
│   │   │   ├── other-calculators
│   │   │   └── tool                # Tools like image and dev utilities
│   │   ├── about/                # About Us page
│   │   ├── contact/              # Contact page
│   │   ├── layout.tsx            # Root layout for the entire application
│   │   └── page.tsx              # Homepage
│   ├── components
│   │   ├── ui/                   # Reusable ShadCN UI components
│   │   ├── AdBanner.tsx          # AdSense ad component
│   │   ├── CalculatorLayout.tsx  # Standard layout for calculator pages
│   │   ├── site-header.tsx       # Main navigation header
│   │   └── site-footer.tsx       # Main site footer
│   ├── firebase
│   │   ├── client-provider.tsx   # Client-side Firebase context provider
│   │   ├── config.ts             # Firebase project configuration
│   │   └── index.ts              # Firebase services initialization
│   ├── hooks
│   │   └── use-toast.ts          # Custom toast notification hook
│   ├── lib
│   │   ├── data.ts               # Centralized data for calculators and categories
│   │   └── utils.ts              # Utility functions (e.g., `cn` for classnames)
│   └── types
│       └── calculator.ts         # TypeScript type definitions
├── public/                       # Static assets (images, fonts, etc.)
├── package.json                  # Project dependencies and scripts
└── tailwind.config.ts            # Tailwind CSS configuration
```

## 🛠️ Getting Started

Follow these instructions to set up the project for local development.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - This project is configured to work with Firebase. You will need to have a Firebase project set up.
    - The configuration details are located in `src/firebase/config.ts`. Ensure this matches your Firebase project's web app configuration.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running at [http://localhost:9002](http://localhost:9002).

## 📜 Available Scripts

- **`npm run dev`**: Starts the Next.js development server with Turbopack.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lints the project files using Next.js's built-in ESLint configuration.
- **`npm run typecheck`**: Runs the TypeScript compiler to check for type errors.
- **`npm run genkit:dev`**: Starts the Genkit development server for AI flow testing.

## 🚀 Deployment

This project is configured for deployment on **Firebase App Hosting**. The `apphosting.yaml` file at the root of the project contains the basic configuration.

To deploy, you can use the Firebase CLI:

1.  Install the Firebase CLI: `npm install -g firebase-tools`
2.  Login to Firebase: `firebase login`
3.  Deploy the app: `firebase deploy --only apphosting`

The project can also be easily deployed to other platforms like Vercel or Netlify with minimal configuration changes.

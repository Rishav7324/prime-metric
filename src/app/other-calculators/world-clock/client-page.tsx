'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const majorCities = [
    { name: "New York", timeZone: "America/New_York" },
    { name: "Los Angeles", timeZone: "America/Los_Angeles" },
    { name: "Chicago", timeZone: "America/Chicago" },
    { name: "London", timeZone: "Europe/London" },
    { name: "Paris", timeZone: "Europe/Paris" },
    { name: "Berlin", timeZone: "Europe/Berlin" },
    { name: "Moscow", timeZone: "Europe/Moscow" },
    { name: "Tokyo", timeZone: "Asia/Tokyo" },
    { name: "Beijing", timeZone: "Asia/Shanghai" },
    { name: "Hong Kong", timeZone: "Asia/Hong_Kong" },
    { name: "Singapore", timeZone: "Asia/Singapore" },
    { name: "Sydney", timeZone: "Australia/Sydney" },
    { name: "Dubai", timeZone: "Asia/Dubai" },
    { name: "Mumbai", timeZone: "Asia/Kolkata" },
    { name: "São Paulo", timeZone: "America/Sao_Paulo" },
    { name: "Buenos Aires", timeZone: "America/Argentina/Buenos_Aires" },
    { name: "Cairo", timeZone: "Africa/Cairo" },
    { name: "Johannesburg", timeZone: "Africa/Johannesburg" },
    { name: "Lagos", timeZone: "Africa/Lagos" },
    { name: "Nairobi", timeZone: "Africa/Nairobi" },
    { name: "Toronto", timeZone: "America/Toronto" },
    { name: "Vancouver", timeZone: "America/Vancouver" },
    { name: "Mexico City", timeZone: "America/Mexico_City" },
    { name: "Seoul", timeZone: "Asia/Seoul" },
    { name: "Jakarta", timeZone: "Asia/Jakarta" },
    { name: "Bangkok", timeZone: "Asia/Bangkok" },
    { name: "Istanbul", timeZone: "Europe/Istanbul" },
    { name: "Rome", timeZone: "Europe/Rome" },
    { name: "Madrid", timeZone: "Europe/Madrid" },
    { name: "Amsterdam", timeZone: "Europe/Amsterdam" },
    { name: "Stockholm", timeZone: "Europe/Stockholm" },
    { name: "Zurich", timeZone: "Europe/Zurich" },
    { name: "Auckland", timeZone: "Pacific/Auckland" },
    { name: "Honolulu", timeZone: "Pacific/Honolulu" },
    { name: "Denver", timeZone: "America/Denver" },
    { name: "Phoenix", timeZone: "America/Phoenix" },
    { name: "Ankara", timeZone: "Europe/Istanbul" },
    { name: "Riyadh", timeZone: "Asia/Riyadh" },
    { name: "Baghdad", timeZone: "Asia/Baghdad" },
    { name: "Tehran", timeZone: "Asia/Tehran" },
    { name: "Karachi", timeZone: "Asia/Karachi" },
    { name: "Dhaka", timeZone: "Asia/Dhaka" },
    { name: "Ho Chi Minh City", timeZone: "Asia/Ho_Chi_Minh" },
    { name: "Manila", timeZone: "Asia/Manila" },
    { name: "Taipei", timeZone: "Asia/Taipei" },
    { name: "Perth", timeZone: "Australia/Perth" },
    { name: "Brisbane", timeZone: "Australia/Brisbane" },
    { name: "Helsinki", timeZone: "Europe/Helsinki" },
    { "name": "Oslo", "timeZone": "Europe/Oslo" },
    { "name": "Copenhagen", "timeZone": "Europe/Copenhagen" },
    { "name": "Warsaw", "timeZone": "Europe/Warsaw" },
    { "name": "Prague", "timeZone": "Europe/Prague" },
    { "name": "Vienna", "timeZone": "Europe/Vienna" },
    { "name": "Budapest", "timeZone": "Europe/Budapest" },
    { "name": "Athens", "timeZone": "Europe/Athens" }
];


interface CityTime {
  name: string;
  time: string;
  date: string;
  offset: string;
}

const WorldClockClient = () => {
  const [times, setTimes] = useState<CityTime[]>([]);
  const [localTime, setLocalTime] = useState<string>("--:--:--");

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString());
      
      const cityTimes = majorCities.map(city => {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: city.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const timeFormatter = new Intl.DateTimeFormat('en-US', options);
        const time = timeFormatter.format(now);
        
        const dateOptions: Intl.DateTimeFormatOptions = {
            timeZone: city.timeZone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };
        const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
        const date = dateFormatter.format(now);

        const offsetOptions: Intl.DateTimeFormatOptions = {
            timeZone: city.timeZone,
            timeZoneName: 'shortOffset',
        };
        const offsetFormatter = new Intl.DateTimeFormat('en-US', offsetOptions);
        const parts = offsetFormatter.formatToParts(now);
        const offset = parts.find(part => part.type === 'timeZoneName')?.value || 'GMT';


        return { name: city.name, time, date, offset };
      });
      setTimes(cityTimes);
    };

    updateClocks(); // Initial call
    const intervalId = setInterval(updateClocks, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <CalculatorLayout
      title="World Clock"
      description="View the current time in major cities across the globe."
      canonicalUrl="/other-calculators/world-clock"
    >
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 mb-8 text-center max-w-sm mx-auto">
            <p className="text-muted-foreground">Your Local Time</p>
            <p className="text-4xl font-bold">{localTime}</p>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {times.map((city, index) => (
            <Card key={index} className="p-4 flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">{city.name}</p>
                    <p className="text-sm text-muted-foreground">{city.date}</p>
                    <p className="text-xs text-muted-foreground">{city.offset}</p>
                </div>
                <p className="font-mono text-3xl font-bold text-primary">{city.time}</p>
            </Card>
          ))}
        </div>
      </div>
      
      <CalculatorContentSection
        aboutContent="The World Clock displays the current local time in major cities around the world. It is an essential tool for anyone who works with international teams, travels frequently, or needs to stay connected with people across different time zones. The clock automatically adjusts for Daylight Saving Time (DST) in relevant regions."
        useCases={[
            { title: "International Business", description: "Schedule meetings and calls with colleagues, clients, or partners in different countries at a convenient time for everyone." },
            { title: "Travel Planning", description: "Check the time at your destination to plan your arrival, book accommodations, or avoid jet lag." },
            { title: "Global Event Coordination", description: "Coordinate online events, webinars, or gaming sessions with participants from multiple time zones." },
            { title: "Staying in Touch", description: "Find the right time to call friends and family who live abroad without waking them up in the middle of the night." }
        ]}
        tips={[
            { title: "Understanding UTC", description: "Time zones are often expressed as an offset from Coordinated Universal Time (UTC). This can be a helpful reference when dealing with many zones." },
            { title: "Daylight Saving Time (DST)", description: "Be aware that DST can cause time zone offsets to change during certain times of the year. This clock accounts for current DST rules." },
            { title: "Use City Names for Clarity", description: "Using major city names (e.g., 'America/New_York') is more reliable than abbreviations like 'EST', which can be ambiguous." }
        ]}
        faqs={[
            { question: "How does the world clock work?", answer: "It uses your device's current time as a reference and applies the appropriate time zone offset for each city. It uses the browser's built-in Internationalization API to ensure accuracy, including DST adjustments." },
            { question: "Why is the date different for some cities?", answer: "Due to the difference in time zones, it might already be 'tomorrow' in a city like Tokyo or Sydney when it is still 'today' in New York or London." },
            { question: "Can I add more cities?", answer: "This version displays a curated list of major global cities. Future versions may allow for customization." },
            { question: "How accurate is the clock?", answer: "The clock is as accurate as your device's time. It continuously updates every second to stay in sync." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default WorldClockClient;

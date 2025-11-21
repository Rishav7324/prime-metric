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
    { name: "Oslo", timeZone: "Europe/Oslo" },
    { name: "Copenhagen", timeZone: "Europe/Copenhagen" },
    { name: "Warsaw", timeZone: "Europe/Warsaw" },
    { name: "Prague", timeZone: "Europe/Prague" },
    { name: "Vienna", timeZone: "Europe/Vienna" },
    { name: "Budapest", timeZone: "Europe/Budapest" },
    { name: "Athens", timeZone: "Europe/Athens" }
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
        aboutContent="The World Clock is a dynamic tool that displays the current local time in major cities around the globe. In an increasingly connected world, this utility is essential for anyone who works with international teams, travels frequently, or needs to stay in touch with people across different time zones. The clock automatically fetches the correct time for each location, taking into account complex factors like time zone offsets and Daylight Saving Time (DST). By providing a real-time, at-a-glance view of global times, it eliminates the confusion and mental calculation required to coordinate across the planet, fostering better communication and planning."
        useCases={[
            { title: "International Business", description: "Schedule meetings, calls, and deadlines with colleagues, clients, or partners in different countries at a convenient time for everyone. Avoid waking someone up in the middle of their night or missing a critical deadline due to time zone confusion. A marketing team in New York can use it to schedule a product launch call with their development team in Mumbai and their PR agency in London." },
            { title: "Travel Planning", description: "Check the local time of your destination to plan your arrival, book accommodations, and manage jet lag. If you're flying from Chicago to Tokyo, you can use the clock to see the 14-hour time difference and adjust your sleep schedule accordingly to mitigate jet lag upon arrival." },
            { title: "Global Event Coordination", description: "Coordinate online events, webinars, livestreams, or gaming sessions with participants from multiple time zones. Ensure that promotional materials list the correct local times for all target audiences. A university can schedule an online open day for prospective international students, ensuring it's accessible for applicants from Sydney to Vancouver." },
            { title: "Staying in Touch with Friends & Family", description: "Find the perfect time to call friends and family who live abroad. A quick glance can tell you if it's a reasonable hour to reach out, helping you maintain personal connections across long distances without causing an inconvenience." }
        ]}
        examples={[
          {
            title: "Scheduling a Global Team Meeting",
            description: "A project manager in San Francisco needs to schedule a video conference with team members in London and Singapore.",
            steps: [
              "The manager first checks their own local time (e.g., 9:00 AM PST).",
              "They then look at the World Clock to see the corresponding times: London is 5:00 PM GMT, and Singapore is 1:00 AM SGT the next day.",
              "Realizing 1:00 AM is too late for the Singapore team, the manager adjusts their proposed time to later in their own day.",
              "Checking the clock for 2:00 PM PST reveals that it's 10:00 PM in London and 6:00 AM in Singapore. While not perfect, this is a more manageable time for everyone, so they schedule the meeting."
            ]
          },
          {
            title: "Watching a Live Sports Event",
            description: "A fan in Paris wants to watch a live football match that starts at 8:00 PM in New York.",
            steps: [
              "The fan looks at the World Clock to compare Paris and New York times.",
              "They see that Paris is 6 hours ahead of New York.",
              "Therefore, the match will start at 2:00 AM in Paris time (8:00 PM + 6 hours).",
              "The fan can now decide whether they want to stay up late or record the match."
            ]
          }
        ]}
        tips={[
            { title: "Understanding UTC", description: "Time zones are often officially expressed as an offset from Coordinated Universal Time (UTC). For example, New York might be 'UTC-4'. Using UTC as a common reference can be helpful when dealing with many different time zones, as it is a global standard that does not change for DST." },
            { title: "Daylight Saving Time (DST) is Handled", description: "One of the biggest complexities in time zones is DST, where clocks are shifted forward by an hour in the summer. This tool automatically accounts for current DST rules in all displayed locations, so you don't have to worry about whether a region is currently observing it." },
            { title: "Use City Names for Clarity", description: "Always rely on major city names (e.g., 'America/New_York', 'Europe/London') for time zones. Abbreviations like EST, CST, or IST can be ambiguous as multiple regions around the world may use the same acronym for different time zones. The city-based IANA time zone database is the global standard." },
            { title: "Check the Date", description: "When coordinating across wide time differences, such as between the Americas and Asia/Australia, always check the date. It's common for it to be 'tomorrow' in Tokyo when it's still 'today' in Los Angeles. The clock displays the local date for each city to prevent this confusion." }
        ]}
        faqs={[
            { question: "How does the world clock work and stay accurate?", answer: "It uses your device's current time as a baseline and then leverages the browser's built-in Internationalization API (Intl). This API has a comprehensive database of global time zones and their rules, including historical and future Daylight Saving Time changes. The clock updates every second to stay in sync." },
            { question: "Why is the date different for some cities?", answer: "The world is divided into 24 main time zones. When it is afternoon in one part of the world, it is the middle of the night in another. Due to the International Date Line, which runs through the Pacific Ocean, cities in Asia and Australia can be a full day ahead of cities in the Americas." },
            { question: "Can I add my own city to the clock?", answer: "This version of the tool displays a curated list of major global cities to cover the most common time zones. Future versions may allow for customization and adding or removing cities from the dashboard to create a personalized world clock." },
            { question: "What does the GMT/UTC offset mean?", answer: "The 'shortOffset' (e.g., GMT-4, GMT+9) shows how many hours that city's local time is behind or ahead of Coordinated Universal Time (UTC), which is the world's time standard. A negative offset (GMT-4) means the local time is 4 hours behind UTC." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default WorldClockClient;

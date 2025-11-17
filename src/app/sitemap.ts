import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://primemetric.online';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/all-calculators',
    '/financial-calculators',
    '/health-calculators',
    '/math-calculators',
    '/other-calculators',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date().toISOString(),
    priority: path === '' ? 1 : 0.8,
  }));

  const calculatorPages = allCalculators
    .filter(calc => calc.implemented)
    .map((calc) => ({
      url: `${siteUrl}${calc.path}`,
      lastModified: new Date().toISOString(),
      priority: 0.9,
    }));

  return [...staticPages, ...calculatorPages];
}

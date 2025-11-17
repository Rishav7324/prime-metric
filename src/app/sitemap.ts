import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primemetric.online';

  const calculatorUrls = allCalculators.map((calculator) => ({
    url: `${baseUrl}${calculator.path}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    '/',
    '/about',
    '/contact',
    '/all-calculators',
    '/financial-calculators',
    '/health-calculators',
    '/math-calculators',
    '/other-calculators',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/tool/base64',
    '/tool/case-converter',
    '/tool/color-picker',
    '/tool/compress-image',
    '/tool/convert-image',
    '/tool/crop-image',
    '/tool/hash-generator',
    '/tool/invoice-generator',
    '/tool/json-formatter',
    '/tool/lorem-ipsum',
    '/tool/qr-code',
    '/tool/resize-image',
    '/tool/url-encoder',
    '/tool/word-counter',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...calculatorUrls];
}

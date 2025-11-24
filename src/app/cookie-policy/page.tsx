
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cookie Policy | Prime Metric",
    description: "Learn how Prime Metric uses cookies to improve your experience. Understand what cookies are, how we use them, and how you can manage them.",
    keywords: "cookie policy, cookies, primemetric cookies, website cookies, privacy, tracking technologies",
    alternates: {
      canonical: "https://primemetric.online/cookie-policy",
    }
};

const CookiePolicyPage = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
      <p className="text-muted-foreground mb-6 text-center">Last updated: November 24, 2025</p>
      
      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies allow a website to recognize a user's device and store some information about the user’s preferences or past actions.
          </p>
          <p className="mt-2">
            This page explains what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">2. How We Use Cookies</h2>
          <p className="mb-3">We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-foreground">Functionality Cookies:</strong> Some cookies are essential for you to be able to experience the full functionality of our site. For example, when you use a calculator, we may use local storage (similar to a cookie) to remember your inputs so you don't have to re-enter them if you navigate away and come back. Your consent for our cookie policy is also stored to prevent the banner from reappearing on every visit.
            </li>
            <li>
              <strong className="text-foreground">Analytics Cookies:</strong> We use these cookies to understand how visitors interact with our website. They help us identify which calculators are most popular, how users navigate the site, and where we can make improvements. The information collected is aggregated and anonymous. We use services like Vercel Analytics and Google Analytics for this purpose.
            </li>
            <li>
              <strong className="text-foreground">Advertising Cookies:</strong> Our website is free to use because it is supported by advertising. We use third-party advertising services, such as Google AdSense, which use cookies to serve ads that are more relevant to you. These cookies track your browsing habits across websites to build a profile of your interests and show you personalized ads.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Third-Party Cookies</h2>
          <p className="mb-3">
            In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-foreground">Google Analytics:</strong> This is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.
            </li>
            <li>
              <strong className="text-foreground">Google AdSense:</strong> We use the Google AdSense service to serve advertising. It uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you. For more information on Google AdSense, see the official Google AdSense privacy FAQ.
            </li>
            <li>
              <strong className="text-foreground">Vercel Analytics:</strong> As part of our hosting solution, Vercel provides analytics that help us monitor website performance and usage. This data is anonymized and focuses on performance metrics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Your Choices and Managing Cookies</h2>
          <p className="mb-3">
            You have several options to control or limit how we and our partners use cookies:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong className="text-foreground">Cookie Consent Banner:</strong> When you first visit our site, you can accept our use of cookies via the consent banner. This choice is remembered for subsequent visits.
            </li>
            <li>
              <strong className="text-foreground">Browser Settings:</strong> You can adjust the settings on your browser to refuse some or all cookies. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies. You can find instructions for managing cookies in popular browsers here:
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary">Microsoft Edge</a></li>
              </ul>
            </li>
            <li>
              <strong className="text-foreground">Advertising Opt-Outs:</strong> You can opt out of personalized advertising from many third-party ad networks by visiting platforms like the <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary">Digital Advertising Alliance</a> or the <a href="https://youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary">Network Advertising Initiative</a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">5. More Information</h2>
          <p>
            Hopefully, that has clarified things for you. As was previously mentioned, if there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. For more detailed information on how we handle your data, please review our <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link>.
          </p>
          <p className="mt-2">
            If you are still looking for more information, you can contact us through our preferred contact methods: Email at <a href="mailto:help@primemetric.online" className="text-primary">help@primemetric.online</a> or via our <Link href="/contact" className="text-primary">Contact Page</Link>.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;

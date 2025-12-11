import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | HeroZodiac',
};

export default function CookiePolicyPage() {
  return (
    <article>
      <h1>Cookie Policy</h1>
      <p className="text-sm text-slate-400">Last Updated: December 11, 2025</p>

      <p>
        This Cookie Policy explains how HeroZodiac ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at herozodiac.com. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h3>1. What are cookies?</h3>
      <p>
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
      </p>

      <h3>2. Why do we use cookies?</h3>
      <p>
        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
      </p>

      <h3>3. Specific Cookies We Use</h3>
      <ul>
        <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our Website (e.g., secure login).</li>
        <li><strong>Analytics Cookies:</strong> These collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</li>
        <li><strong>Advertising Cookies (Google AdSense):</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</li>
      </ul>

      <h3>4. How can you control cookies?</h3>
      <p>
        You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
      </p>
      <p>
        To manage your preferences for Google AdSense specifically, please visit the <Link href="https://adssettings.google.com" target="_blank" className="text-gold-400 hover:underline">Google Ad Settings</Link> page.
      </p>

      <h3>5. Contact Us</h3>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:support@herozodiac.com" className="text-gold-400 hover:underline">support@herozodiac.com</a>.
      </p>
    </article>
  );
}
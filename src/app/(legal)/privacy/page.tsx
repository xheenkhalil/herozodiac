import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | HeroZodiac',
};

export default function PrivacyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p className="text-sm text-slate-400">Last Updated: December 11, 2025</p>

      <p>
        Welcome to HeroZodiac. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we look after your personal data when you visit our website and tells you about your privacy rights.
      </p>

      <h3>1. Data We Collect</h3>
      <p>
        To provide accurate astrological charts, we may collect the following data points:
      </p>
      <ul>
        <li><strong>Birth Data:</strong> Date of birth, time of birth, and city of birth. We use this strictly for calculating astrological positions.</li>
        <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and location (for chart calculation).</li>
        <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
      </ul>

      <h3>2. How We Use Your Data</h3>
      <p>
        We use your data strictly to:
      </p>
      <ul>
        <li>Generate your Natal Chart, Daily Transits, and Compatibility Reports.</li>
        <li>Improve our website functionality and user experience.</li>
        <li>Display relevant advertisements (via third-party partners).</li>
      </ul>
      <p>
        <strong>Important:</strong> We do NOT sell your birth data to third parties. Your chart calculations happen largely on your device or via secure stateless requests.
      </p>

      <h3>3. Cookies & Advertising</h3>
      <p>
        We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience.
      </p>
      <ul>
        <li><strong>Google AdSense:</strong> We use Google AdSense to serve ads. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our website or other websites on the internet.</li>
        <li><strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow">Google Ads Settings</a>.</li>
      </ul>

      <h3>4. Third-Party Links</h3>
      <p>
        This website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
      </p>

      <h3>5. Contact Us</h3>
      <p>
        If you have any questions about this privacy policy, please contact us at: <br />
        <strong>Email:</strong> support@herozodiac.com
      </p>
    </article>
  );
}
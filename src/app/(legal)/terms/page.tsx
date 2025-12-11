import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | HeroZodiac',
};

export default function TermsPage() {
  return (
    <article>
      <h1>Terms of Service</h1>
      <p className="text-sm text-slate-400">Last Updated: December 11, 2025</p>

      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing and using HeroZodiac, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h3>2. Entertainment Disclaimer</h3>
      <p>
        <strong>HeroZodiac provides astrological content for entertainment purposes only.</strong> The information provided on this site—including birth charts, transits, and compatibility reports—should not be used as a substitute for professional advice.
      </p>
      <p>
        We are not responsible for any actions you take based on the information provided on this website. You are solely responsible for your life choices and decisions.
      </p>

      <h3>3. Intellectual Property</h3>
      <p>
        The content, layout, design, data, databases, and graphics on this website are protected by intellectual property laws. You may not reproduce, download, transmit, or distribute any part of this site without our prior written permission.
      </p>

      <h3>4. User Conduct</h3>
      <p>
        You agree to use the site only for lawful purposes. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, or profane material.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        In no event shall HeroZodiac be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on HeroZodiac.
      </p>
    </article>
  );
}
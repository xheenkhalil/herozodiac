import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faComments } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Contact Us | HeroZodiac',
};

export default function ContactPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Contact Us</h1>
      <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
        Have questions about your chart? Found a bug? Or just want to explore partnerships? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left not-prose">
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="w-12 h-12 bg-[#7B1123]/10 rounded-lg flex items-center justify-center text-[#7B1123] mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2 font-serif">General Inquiries</h3>
          <p className="text-sm text-stone-600 mb-4">For general questions, chart feedback, and user support.</p>
          <a href="mailto:support@herozodiac.com" className="text-[#7B1123] font-bold hover:underline">
            support@herozodiac.com
          </a>
        </div>

        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-700 mb-4">
            <FontAwesomeIcon icon={faComments} className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2 font-serif">Partnerships</h3>
          <p className="text-sm text-stone-600 mb-4">For editorial syndication, APIs, and brand collaborations.</p>
          <a href="mailto:partners@herozodiac.com" className="text-[#7B1123] font-bold hover:underline">
            partners@herozodiac.com
          </a>
        </div>
      </div>
    </div>
  );
}
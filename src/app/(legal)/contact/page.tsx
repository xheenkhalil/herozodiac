import { Metadata } from 'next';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | HeroZodiac',
};

export default function ContactPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-serif font-bold text-white mb-6">Contact Us</h1>
      <p className="text-slate-400 mb-12">
        Have questions about your chart? Found a bug? Or just want to say hi? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        <div className="bg-slate-950 p-6 rounded-xl border border-white/5">
          <div className="w-12 h-12 bg-maroon-900/30 rounded-lg flex items-center justify-center text-maroon-400 mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">General Inquiries</h3>
          <p className="text-sm text-slate-400 mb-4">For general questions and support.</p>
          <a href="mailto:support@herozodiac.com" className="text-gold-400 font-bold hover:underline">support@herozodiac.com</a>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-white/5">
          <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400 mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Partnerships</h3>
          <p className="text-sm text-slate-400 mb-4">For advertising and business deals.</p>
          <a href="mailto:partners@herozodiac.com" className="text-gold-400 font-bold hover:underline">partners@herozodiac.com</a>
        </div>

      </div>
    </div>
  );
}
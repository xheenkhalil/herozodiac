// src/data/fallback-articles.ts
import { Article } from '@/lib/quanta';

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Astrology' | 'Personality' | 'Numerology' | 'Tarot' | 'Palmistry' | 'Relationships';
  excerpt: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  content: string[];
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'understanding-your-moon-sign',
    slug: 'understanding-your-moon-sign',
    title: 'Understanding Your Moon Sign',
    category: 'Astrology',
    excerpt: 'Your Moon sign reveals your inner self, instinctual emotional reactions, subconscious needs, and private sanctuary.',
    publishedAt: 'May 12, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=800&q=80',
    content: [
      "While your Sun sign describes your conscious ego, life path, and the outward direction of your will, your Moon sign represents the subterranean ocean of your being: your instinctive reactions, childhood memories, emotional safety, and subconscious desires.",
      "The Moon traverses the entire zodiac roughly every 28 days, lingering in each sign for merely 2.5 days. Because of this rapid motion, discovering your true Moon sign requires an exact time and location of birth.",
      "When life presents sudden shock or profound vulnerability, we rarely react from our Sun sign. We react from our Moon. A fiery Aries Moon reacts with immediate passion and assertion, while a Cancer Moon withdraws into protective sanctuary to feel the depth of the tide.",
      "Integrating your Moon sign is the cornerstone of psychological wholeness. When you understand what your emotional vessel needs to feel safe, you stop judging your private feelings and begin treating yourself with compassionate care."
    ]
  },
  {
    id: 'mbti-types-in-relationships',
    slug: 'mbti-types-in-relationships',
    title: 'MBTI Types in Relationships',
    category: 'Personality',
    excerpt: 'How each cognitive function and MBTI personality type communicates love, resolves tension, and builds enduring romantic synergy.',
    publishedAt: 'May 10, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    content: [
      "Personality theory is not merely a tool for vocational orientation; it provides a profound diagnostic lens for relational communication. Misunderstandings between partners frequently arise not from a lack of love, but from fundamental differences in cognitive processing.",
      "Extraverted Feeling (Fe) partners naturally prioritize collective harmony and outward emotional validation, whereas Introverted Feeling (Fi) individuals operate from a deeply private internal ethical compass that resists performing emotions on demand.",
      "Similarly, the divide between Sensing (S) and Intuition (N) shapes daily dialogue. Sensing partners feel loved through tangible consistency, physical acts of service, and practical plans. Intuitive partners crave deep conceptual dialogues, future visions, and metaphorical bonding.",
      "Recognizing your partner's cognitive style allows you to decode their expressions of love and bridge communicative divides with empathy rather than exasperation."
    ]
  },
  {
    id: 'life-path-number-7-explained',
    slug: 'life-path-number-7-explained',
    title: 'Life Path Number 7 Explained',
    category: 'Numerology',
    excerpt: 'The seeker, the thinker, the wise soul—explore the spiritual and analytical destiny of Life Path Number 7.',
    publishedAt: 'May 8, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=800&q=80',
    content: [
      "In classical Pythagorean numerology, the number 7 is the mystic bridge where heaven and earth intersect. Composed of the spiritual triad (3) resting upon the material quaternary (4), individuals carrying Life Path 7 are the intellectual and spiritual detectives of the cosmos.",
      "If you walk Life Path 7, you cannot accept surface platitudes. You possess an innate skepticism that drives you into libraries, research laboratories, meditative retreats, and sacred texts to uncover the fundamental mechanics of truth.",
      "The primary life challenge for Number 7 is overcoming social isolation and intellectual arrogance. Because your mind operates at high analytical depth, everyday small talk can feel hollow. Yet, when you learn to open your heart alongside your intellect, you become a master teacher and lantern for humanity.",
      "Embrace sacred solitude without withdrawing from community. Your purpose is not to escape the world, but to bring divine clarity into it."
    ]
  },
  {
    id: 'the-star-card-meaning-guidance',
    slug: 'the-star-card-meaning-guidance',
    title: 'The Star Card: Meaning & Guidance',
    category: 'Tarot',
    excerpt: 'Hope, healing, and celestial inspiration—uncover the deep esoteric message of Major Arcana XVII.',
    publishedAt: 'May 6, 2025',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    content: [
      "In the archetypal journey of the Major Arcana, The Star directly follows the cataclysm of The Tower. When false facades crumble in the lightning storm of revelation, we are stripped bare under the midnight sky. It is here that The Star appears.",
      "Depicting a naked maiden kneeling by a pool under eight glowing celestial spheres, The Star pours the waters of consciousness onto both the fertile earth and the reflective pool. She holds nothing back, symbolizing total vulnerability without shame.",
      "When The Star graces your reading, it announces a period of spiritual convalescence and renewed faith. The storm has passed. You are being replenished by cosmic grace. Your only task is to open your heart to hope and trust that the universe is orchestrating your highest good.",
      "Let go of bitterness and fear. You are stepping into the light of divine inspiration."
    ]
  }
];

export function getEditorialArticleBySlug(slug: string): EditorialArticle | undefined {
  return EDITORIAL_ARTICLES.find(a => a.slug.toLowerCase() === slug.toLowerCase());
}

export function convertEditorialToQuantaArticle(article: EditorialArticle): Article {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    published_at: article.publishedAt,
    featured_image: {
      file_url: article.imageUrl,
      alt_text_default: article.title
    },
    categories: [{ name: article.category, slug: article.category.toLowerCase() }],
    content: {
      type: 'doc',
      content: article.content.map(p => ({
        type: 'paragraph',
        content: [{ type: 'text', text: p }]
      }))
    }
  };
}

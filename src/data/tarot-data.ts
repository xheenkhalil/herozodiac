// src/data/tarot-data.ts

export interface TarotCard {
  id: string;
  name: string;
  number: number;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  keywordsUpright: string[];
  keywordsReversed: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  spiritualMeaning: string;
}

export const TAROT_DECK: TarotCard[] = [
  // 22 MAJOR ARCANA
  {
    id: 'the-fool',
    name: 'The Fool',
    number: 0,
    arcana: 'Major',
    keywordsUpright: ['New Beginnings', 'Innocence', 'Spontaneity', 'Free Spirit', 'Leap of Faith'],
    keywordsReversed: ['Recklessness', 'Risk-taking', 'Hesitation', 'Foolishness'],
    uprightMeaning: 'The Fool represents the dawn of a grand adventure. You stand at the edge of the cliff, ready to step boldly into the unknown with an open, trusting heart.',
    reversedMeaning: 'Reversed, The Fool cautions against impulsive folly without grounding, or conversely, paralyzing fear that prevents you from taking a necessary leap.',
    loveMeaning: 'Spontaneous romance, meeting someone unexpected, or rekindling playful innocence in partnership.',
    careerMeaning: 'Exciting career shifts, launching a fresh venture, or approaching professional goals with beginner’s mind.',
    spiritualMeaning: 'Pure childlike trust in the universe; listening to soul whispers rather than worldly doubt.'
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    number: 1,
    arcana: 'Major',
    keywordsUpright: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired Action', 'Skill'],
    keywordsReversed: ['Manipulation', 'Poor Planning', 'Untapped Talents', 'Trickery'],
    uprightMeaning: 'The Magician holds the four elemental tools on his altar: wand, cup, sword, and pentacle. You have every inner resource required to manifest your intention into form.',
    reversedMeaning: 'When reversed, beware of scattered focus, deceptive charm, or self-doubt blocking your innate creative power.',
    loveMeaning: 'High attraction, magnetic chemistry, and actively co-creating a fulfilling romantic bond.',
    careerMeaning: 'Command of your skills, turning abstract ideas into tangible revenue, and confident execution.',
    spiritualMeaning: 'Aligning your personal will with cosmic intent; channeling the divine through focused action.'
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    number: 2,
    arcana: 'Major',
    keywordsUpright: ['Intuition', 'Sacred Knowledge', 'Divine Feminine', 'The Subconscious', 'Mystery'],
    keywordsReversed: ['Secrets', 'Disconnected from Intuition', 'Withdrawal', 'Superficiality'],
    uprightMeaning: 'Sitting between the pillars of light and shadow, The High Priestess guards the veil of esoteric truth. Look inward; silence reveals answers logic cannot fathom.',
    reversedMeaning: 'Reversed suggests ignoring your gut instincts, gossip, or feeling disconnected from your intuitive compass.',
    loveMeaning: 'Deep spiritual affinity, unexpressed feelings, or trusting emotional telepathy in a connection.',
    careerMeaning: 'Confidential projects, relying on strategic instinct, and observing workplace dynamics quietly.',
    spiritualMeaning: 'Dreamwork, mysticism, meditation, and communing with the quiet wisdom of your higher self.'
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    number: 3,
    arcana: 'Major',
    keywordsUpright: ['Abundance', 'Fertility', 'Sensuality', 'Nurturing', 'Creativity'],
    keywordsReversed: ['Creative Block', 'Over-dependence', 'Neglect', 'Smothering'],
    uprightMeaning: 'The Empress embodies lush fertility, sensory luxury, and the generative power of Mother Earth. Your projects, relationships, and health are ripe for flourishing.',
    reversedMeaning: 'Reversed points to neglecting personal wellness, creative exhaustion, or smothering relationships with anxious control.',
    loveMeaning: 'Sensual pleasure, maternal warmth, domestic harmony, and blooming romantic devotion.',
    careerMeaning: 'Generative creative projects, harmonious team dynamics, and abundant financial yield.',
    spiritualMeaning: 'Connecting with nature, honoring the physical vessel, and celebrating the holiness of earthly beauty.'
  },
  {
    id: 'the-emperor',
    name: 'The Emperor',
    number: 4,
    arcana: 'Major',
    keywordsUpright: ['Authority', 'Structure', 'Father Figure', 'Stability', 'Strategic Leadership'],
    keywordsReversed: ['Tyranny', 'Rigidity', 'Loss of Control', 'Inflexibility'],
    uprightMeaning: 'The Emperor represents stability, structured wisdom, and protective authority. He establishes clear boundaries and builds lasting empires upon principled foundations.',
    reversedMeaning: 'Reversed indicates authoritarian micromanagement, chaotic rebellion against order, or self-discipline slipping away.',
    loveMeaning: 'Stability, dependable protection, traditional commitments, and clear relationship agreements.',
    careerMeaning: 'Executive leadership, establishing orderly systems, asserting professional authority with poise.',
    spiritualMeaning: 'Mastering the ego; grounding spiritual aspirations into disciplined daily practice.'
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    number: 5,
    arcana: 'Major',
    keywordsUpright: ['Spiritual Wisdom', 'Tradition', 'Mentorship', 'Ethics', 'Shared Values'],
    keywordsReversed: ['Personal Beliefs', 'Dogma', 'Rebellion', 'Unconventional Wisdom'],
    uprightMeaning: 'The Hierophant bridges the sacred and temporal realms through venerable wisdom, trusted mentors, and timeless spiritual lineages.',
    reversedMeaning: 'Breaking free from dogmatic conditioning, forging your own spiritual code, or questioning rigid institutions.',
    loveMeaning: 'Traditional courtship, marital union, and shared ethical/spiritual values with your partner.',
    careerMeaning: 'Institutional success, mentorship, accredited education, and ethical professional conduct.',
    spiritualMeaning: 'Seeking a seasoned teacher or initiating into timeless esoteric traditions.'
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    number: 6,
    arcana: 'Major',
    keywordsUpright: ['Love', 'Harmony', 'Relationships', 'Values Alignment', 'Conscious Choices'],
    keywordsReversed: ['Disharmony', 'Imbalance', 'Misaligned Values', 'Indecision'],
    uprightMeaning: 'The Lovers represents sacred union—not merely romantic devotion, but the profound alignment of your personal values and the integration of opposites.',
    reversedMeaning: 'Conflicting values between partners, inner discord, or choosing short-term temptation over soul integrity.',
    loveMeaning: 'Soulmate chemistry, mutual vulnerability, deep emotional harmony, and romantic choice.',
    careerMeaning: 'Equitable business partnerships, contracts aligned with core values, and collaborative synergy.',
    spiritualMeaning: 'The alchemical wedding of inner masculine and feminine energies within the self.'
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    number: 7,
    arcana: 'Major',
    keywordsUpright: ['Direction', 'Willpower', 'Victory', 'Overcoming Obstacles', 'Determination'],
    keywordsReversed: ['Lack of Direction', 'Aggression', 'Obstacles', 'Loss of Control'],
    uprightMeaning: 'Steering two opposing sphinxes through pure mental discipline and focused willpower, The Chariot guarantees triumph over hardship when you maintain unbroken focus.',
    reversedMeaning: 'Reversed warns of reckless ambition, running over others, or feeling powerless against external turbulence.',
    loveMeaning: 'Overcoming relationship hurdles together, clear romantic intentions, or pursuing a partnership with resolve.',
    careerMeaning: 'Rapid professional momentum, conquering competition, and reaching ambitious milestones.',
    spiritualMeaning: 'Mastering emotional cross-currents; directing your spiritual will with noble discipline.'
  },
  {
    id: 'strength',
    name: 'Strength',
    number: 8,
    arcana: 'Major',
    keywordsUpright: ['Courage', 'Patience', 'Compassion', 'Gentle Power', 'Inner Mastery'],
    keywordsReversed: ['Self-Doubt', 'Raw Emotion', 'Weakness', 'Impatience'],
    uprightMeaning: 'Strength depicts a maiden gently closing the jaws of a lion. True power is not brute force; it is unshakeable patience, compassion, and mastery over primal fears.',
    reversedMeaning: 'Feelings of inadequacy, animal instincts dominating reason, or giving into defeatist thoughts.',
    loveMeaning: 'Unconditional patience, soothing partner insecurities with tenderness, and calm romantic fortitude.',
    careerMeaning: 'Grace under corporate pressure, diplomacy over confrontation, and quiet confidence commanding respect.',
    spiritualMeaning: 'Sublimating primal passions into spiritual gold through unconditional love.'
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    number: 9,
    arcana: 'Major',
    keywordsUpright: ['Soul Searching', 'Introspection', 'Solitude', 'Inner Guidance', 'Wisdom'],
    keywordsReversed: ['Isolation', 'Loneliness', 'Withdrawal', 'Rejection of Counsel'],
    uprightMeaning: 'Holding aloft the lantern of truth on a snowy peak, The Hermit invites you into sacred retreat to discover answers that solitude alone can provide.',
    reversedMeaning: 'Excessive isolation, becoming bitter in reclusiveness, or refusing helpful external wisdom.',
    loveMeaning: 'Taking space to understand your romantic desires, emotional independence, or quiet companionship.',
    careerMeaning: 'Independent research, consulting, or stepping away from office chatter to master your trade.',
    spiritualMeaning: 'The inward pilgrimage; following the inner lantern of divine conscience.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    number: 10,
    arcana: 'Major',
    keywordsUpright: ['Good Luck', 'Karma', 'Life Cycles', 'Destiny', 'Turning Point'],
    keywordsReversed: ['Bad Luck', 'Resisting Cycles', 'Breaking Cycles', 'Setbacks'],
    uprightMeaning: 'The cosmic wheel turns perpetually. A favorable shift of destiny is arriving. Recognize that all external states fluctuate; anchor your peace in what is eternal.',
    reversedMeaning: 'A temporary downturn in fortune, repeating negative karmic loops, or clinging to the past.',
    loveMeaning: 'Fateful encounters, timely synchronicities, and positive shifts in romantic relationship dynamics.',
    careerMeaning: 'Unexpected promotion, windfalls, industry pivots, and being in the right place at the right moment.',
    spiritualMeaning: 'Surrendering to the grand cycles of the universe; knowing that change is the rhythm of growth.'
  },
  {
    id: 'justice',
    name: 'Justice',
    number: 11,
    arcana: 'Major',
    keywordsUpright: ['Fairness', 'Truth', 'Cause and Effect', 'Law', 'Accountability'],
    keywordsReversed: ['Dishonesty', 'Unfairness', 'Lack of Accountability', 'Prejudice'],
    uprightMeaning: 'Justice holds the upright sword of clarity and the balanced scales. Truth will prevail. All causes yield their natural effects. Act with complete ethical transparency.',
    reversedMeaning: 'Biased judgments, avoidance of personal responsibility, or feeling victimized by unfair systems.',
    loveMeaning: 'Fairness and equal emotional investment; honest discussions resolving long-standing tensions.',
    careerMeaning: 'Legal clarity, contracts resolved equitably, and standing behind the integrity of your work.',
    spiritualMeaning: 'Karmic equilibrium; honoring cosmic truth above personal rationalizations.'
  },
  {
    id: 'the-hanged-man',
    name: 'The Hanged Man',
    number: 12,
    arcana: 'Major',
    keywordsUpright: ['Pause', 'Surrender', 'Letting Go', 'New Perspectives', 'Sacrifice'],
    keywordsReversed: ['Delays', 'Resistance', 'Stalling', 'Useless Sacrifice'],
    uprightMeaning: 'Suspended peacefully upside down with a halo of illumination, The Hanged Man counsels surrender. Cease forcing outcomes; seeing life from an inverted perspective brings enlightenment.',
    reversedMeaning: 'Martyrdom, stubborn resistance to necessary change, or feeling stuck in limbo through your own indecision.',
    loveMeaning: 'Releasing unrealistic expectations, pausing to understand partner’s viewpoint, and patience.',
    careerMeaning: 'Temporary strategic pause, reassessing career trajectory, and finding novel angles on problems.',
    spiritualMeaning: 'Ego surrender; allowing personal will to yield to divine timing.'
  },
  {
    id: 'death',
    name: 'Death',
    number: 13,
    arcana: 'Major',
    keywordsUpright: ['Endings', 'Change', 'Transformation', 'Transition', 'Rebirth'],
    keywordsReversed: ['Resistance to Change', 'Stagnation', 'Fear of Letting Go', 'Decay'],
    uprightMeaning: 'Death is the great liberator. It signifies the definitive closure of an outmoded chapter so that vibrant new life can take root. Release what is dead with gratitude.',
    reversedMeaning: 'Clinging to decaying relationships or obsolete career paths out of dread of the unknown.',
    loveMeaning: 'Transformative shifts in partnership, letting go of past relationship baggage, or a fresh romantic start.',
    careerMeaning: 'Concluding a career chapter, structural company shifts, and stepping boldly into new industries.',
    spiritualMeaning: 'The mystical death of the false self; resurrection into authentic spiritual consciousness.'
  },
  {
    id: 'temperance',
    name: 'Temperance',
    number: 14,
    arcana: 'Major',
    keywordsUpright: ['Balance', 'Moderation', 'Patience', 'Alchemy', 'Harmony'],
    keywordsReversed: ['Imbalance', 'Excess', 'Lack of Patience', 'Discord'],
    uprightMeaning: 'The angel of Temperance pours water between two vessels, blending opposites into perfect synthesis. Cultivate middle path moderation, calm patience, and inner alchemy.',
    reversedMeaning: 'Extreme behaviors, overindulgence, clashes of worldview, and emotional impatience.',
    loveMeaning: 'Peaceful emotional compromise, harmonious rhythm, and mutual respect blending lives seamlessly.',
    careerMeaning: 'Steady collaborative progress, mediating conflicts with calm grace, and balanced work life.',
    spiritualMeaning: 'Alchemical inner union; balancing mind, body, and spirit into golden equilibrium.'
  },
  {
    id: 'the-devil',
    name: 'The Devil',
    number: 15,
    arcana: 'Major',
    keywordsUpright: ['Shadow Self', 'Attachment', 'Addiction', 'Restriction', 'Illusion'],
    keywordsReversed: ['Releasing Limiting Beliefs', 'Freedom', 'Reclaiming Power', 'Awareness'],
    uprightMeaning: 'The Devil reveals the chains of our own making—unconscious addictions, toxic codependency, material obsessions, and self-limiting illusions. Awareness is the first step to freedom.',
    reversedMeaning: 'Breaking free from toxic cycles, awakening from codependency, and reclaiming your sovereignty.',
    loveMeaning: 'Intense sexual passion, or alternatively, codependency and unhealthy attachments needing release.',
    careerMeaning: 'Feeling trapped in a lucrative but soul-crushing job; examining hidden financial obsessions.',
    spiritualMeaning: 'Confronting and integrating the shadow; realizing your chains were loose all along.'
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    number: 16,
    arcana: 'Major',
    keywordsUpright: ['Sudden Change', 'Upheaval', 'Chaos', 'Awakening', 'Revelation'],
    keywordsReversed: ['Personal Transformation', 'Fear of Suffering', 'Averting Disaster', 'Delayed Inevitable'],
    uprightMeaning: 'A lightning bolt shatters the crowned fortress built on false assumptions. While jarring, The Tower destroys only what was false, liberating your spirit into raw truth.',
    reversedMeaning: 'Narrowly escaping an external shock, or undergoing a quiet, internal spiritual earthquake.',
    loveMeaning: 'Sudden romantic revelations that clear out illusions and force honest transformation.',
    careerMeaning: 'Unexpected workplace shake-ups, sudden restructuring, or radical career redirection.',
    spiritualMeaning: 'Spiritual awakening through shock; the destruction of the ego’s fragile ramparts.'
  },
  {
    id: 'the-star',
    name: 'The Star',
    number: 17,
    arcana: 'Major',
    keywordsUpright: ['Hope', 'Faith', 'Purpose', 'Renewal', 'Spiritual Healing'],
    keywordsReversed: ['Lack of Faith', 'Despair', 'Discouragement', 'Insecurity'],
    uprightMeaning: 'Following the tempest of The Tower, The Star pours healing waters of hope under a celestial sky. Your spirit is being renewed. Have faith; the universe supports your destiny.',
    reversedMeaning: 'Temporary loss of hope, feeling spiritually dry, or letting cynicism obscure the light.',
    loveMeaning: 'Deep spiritual healing after heartbreak, tender mutual inspiration, and renewed faith in love.',
    careerMeaning: 'Inspirational work, public recognition, creative renewal, and fulfilling your true vocational calling.',
    spiritualMeaning: 'Direct communion with divine grace; serving as a beacon of hope for others.'
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    number: 18,
    arcana: 'Major',
    keywordsUpright: ['Illusion', 'Fear', 'Anxiety', 'Subconscious', 'Intuition'],
    keywordsReversed: ['Release of Fear', 'Unveiling Secrets', 'Clarity', 'Overcoming Anxiety'],
    uprightMeaning: 'The Moon shines over a mist-shrouded path flanked by howling wolves. Things are not as they appear on the surface. Rely on subtle intuition to navigate the labyrinth of the unconscious.',
    reversedMeaning: 'The clearing of confusion, hidden truths stepping into sunlight, and vanquishing paranoid fears.',
    loveMeaning: 'Emotional uncertainty, unspoken worries, or intense psychological connection requiring honesty.',
    careerMeaning: 'Unclear directives, misleading workplace politics, or trusting your creative subconscious.',
    spiritualMeaning: 'Navigating the dark night of the soul; decoding dreams and subconscious archetypes.'
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    number: 19,
    arcana: 'Major',
    keywordsUpright: ['Positivity', 'Success', 'Vitality', 'Joy', 'Warmth'],
    keywordsReversed: ['Inner Child', 'Temporary Cloud', 'Overly Optimistic', 'Subdued Joy'],
    uprightMeaning: 'A child rides a white horse under radiant solar rays. The Sun is the most joyous card in the deck, promising vitality, success, radiant clarity, and infectious happiness.',
    reversedMeaning: 'Joy is present but obscured by clouds of fatigue or self-doubt; reconnect with your playful inner child.',
    loveMeaning: 'Radiant romantic bliss, celebratory milestones, mutual delight, and warm shared adventures.',
    careerMeaning: 'Public triumph, thriving business projects, creative vitality, and widespread recognition.',
    spiritualMeaning: 'Total alignment with spiritual light; celebrating the ecstasy of existing.'
  },
  {
    id: 'judgement',
    name: 'Judgement',
    number: 20,
    arcana: 'Major',
    keywordsUpright: ['Rebirth', 'Inner Calling', 'Absolution', 'Awakening', 'Reckoning'],
    keywordsReversed: ['Self-Doubt', 'Harsh Self-Criticism', 'Ignoring Calling', 'Regret'],
    uprightMeaning: 'The archangel blows the trumpet of resurrection. It is time to rise from the grave of your past, forgive yourself and others, and answer your true soul calling.',
    reversedMeaning: 'Paralyzing self-judgment, holding onto old regrets, or refusing to heed your higher vocation.',
    loveMeaning: 'Making definitive long-term relationship decisions; forgiving past wounds to begin anew.',
    careerMeaning: 'Stepping into your true life vocation; evaluating accomplishments with honest self-worth.',
    spiritualMeaning: 'Spiritual rebirth; answering the divine summons to live your highest purpose.'
  },
  {
    id: 'the-world',
    name: 'The World',
    number: 21,
    arcana: 'Major',
    keywordsUpright: ['Completion', 'Integration', 'Accomplishment', 'Wholeness', 'Travel'],
    keywordsReversed: ['Incompletion', 'Shortcuts', 'Lack of Closure', 'Delays'],
    uprightMeaning: 'The dancer is encircled by the laurel wreath of victory. A major life cycle has reached triumphant completion. You are whole, integrated, and ready for the next spiral of life.',
    reversedMeaning: 'Missing a final detail to achieve closure, or seeking external validation rather than inner peace.',
    loveMeaning: 'Deep marital wholeness, celebrating relationship milestones, and global travels together.',
    careerMeaning: 'Successful project culmination, international recognition, and fulfilling high career goals.',
    spiritualMeaning: 'Cosmic consciousness; realization that the universe and the self are one.'
  },

  // REPRESENTATIVE MINOR ARCANA HIGHLIGHTS (Wands, Cups, Swords, Pentacles)
  {
    id: 'ace-of-wands',
    name: 'Ace of Wands',
    number: 1,
    arcana: 'Minor',
    suit: 'Wands',
    keywordsUpright: ['Inspiration', 'Creative Spark', 'New Passion', 'Enthusiasm'],
    keywordsReversed: ['Delays', 'Lack of Passion', 'Creative Block', 'Hesitation'],
    uprightMeaning: 'A hand emerges from the clouds offering a sprouting wooden staff. A brilliant surge of creative inspiration, sexual vitality, and bold new energy is ignited.',
    reversedMeaning: 'Struggling to find inspiration, false starts, or holding back creative momentum.',
    loveMeaning: 'Intense romantic sparks, undeniable sexual chemistry, and enthusiastic new connections.',
    careerMeaning: 'A groundbreaking venture idea, energetic project kickoff, and bold career ambition.',
    spiritualMeaning: 'The primordial spark of divine creative fire waking within the soul.'
  },
  {
    id: 'ace-of-cups',
    name: 'Ace of Cups',
    number: 1,
    arcana: 'Minor',
    suit: 'Cups',
    keywordsUpright: ['Love', 'Emotional Overflow', 'Compassion', 'New Romance'],
    keywordsReversed: ['Emotional Drain', 'Blocked Feelings', 'Self-Love Deficit', 'Repression'],
    uprightMeaning: 'The golden chalice overflows with five streams of living water. Your heart is opening to boundless love, compassionate healing, and joyful spiritual fulfillment.',
    reversedMeaning: 'Bottling up emotional pain, pouring from an empty cup, or vulnerability fear.',
    loveMeaning: 'Falling in love, emotional reconnection, unconditional tenderness, and spiritual intimacy.',
    careerMeaning: 'Work that touches the heart, creative fulfillment, and empathetic team relationships.',
    spiritualMeaning: 'Drinking from the holy grail of divine love; deep spiritual replenishment.'
  },
  {
    id: 'ace-of-swords',
    name: 'Ace of Swords',
    number: 1,
    arcana: 'Minor',
    suit: 'Swords',
    keywordsUpright: ['Mental Clarity', 'Breakthrough', 'Raw Truth', 'Sharp Intellect'],
    keywordsReversed: ['Confusion', 'Harsh Words', 'Misinformation', 'Clouded Thinking'],
    uprightMeaning: 'A celestial hand brandishes the double-edged blade of truth crowned with victory. Mental fog disperses; crystalline truth cuts through all illusions and deception.',
    reversedMeaning: 'Mental exhaustion, cutting words causing injury, or deception clouding decisions.',
    loveMeaning: 'Honest communication clearing the air; seeing romantic realities without romantic illusions.',
    careerMeaning: 'A breakthrough intellectual concept, decisive contract signing, and clear strategic focus.',
    spiritualMeaning: 'The sword of spiritual discernment slicing through mental attachments.'
  },
  {
    id: 'ace-of-pentacles',
    name: 'Ace of Pentacles',
    number: 1,
    arcana: 'Minor',
    suit: 'Pentacles',
    keywordsUpright: ['Financial Opportunity', 'Abundance', 'New Venture', 'Manifestation'],
    keywordsReversed: ['Lost Opportunity', 'Financial Anxiety', 'Poor Planning', 'Greed'],
    uprightMeaning: 'A golden coin is offered over a lush flowering garden. A tangible opportunity for financial abundance, career security, and physical wellness is placed in your hands.',
    reversedMeaning: 'Missed financial chances, poor budget planning, or unstable practical footing.',
    loveMeaning: 'Stable, dependable love built on shared goals, comfortable domestic security, and real support.',
    careerMeaning: 'Lucrative job offer, profitable business launch, and practical investment yields.',
    spiritualMeaning: 'Honoring the body as a temple; grounding spiritual dreams into physical earth.'
  },
  {
    id: 'three-of-cups',
    name: 'Three of Cups',
    number: 3,
    arcana: 'Minor',
    suit: 'Cups',
    keywordsUpright: ['Celebration', 'Friendship', 'Sisterhood', 'Community', 'Joy'],
    keywordsReversed: ['Gossip', 'Exclusion', 'Overindulgence', 'Cancelled Plans'],
    uprightMeaning: 'Three maidens raise their chalices in a harvest dance. Celebrate with trusted friends and community; joyful camaraderie elevates the human spirit.',
    reversedMeaning: 'Social drama, feeling like an outsider, or partying to avoid personal responsibilities.',
    loveMeaning: 'Joyful celebrations, wedding parties, and introducing a partner to your circle warmly.',
    careerMeaning: 'Collaborative team triumphs, supportive colleagues, and milestone celebrations.',
    spiritualMeaning: 'Communal worship and celebrating the shared sacredness of human friendship.'
  },
  {
    id: 'ten-of-pentacles',
    name: 'Ten of Pentacles',
    number: 10,
    arcana: 'Minor',
    suit: 'Pentacles',
    keywordsUpright: ['Generational Wealth', 'Legacy', 'Family Security', 'Culmination'],
    keywordsReversed: ['Financial Loss', 'Family Disputes', 'Short-Term Thinking'],
    uprightMeaning: 'An elder sits in an arched courtyard surrounded by family, dogs, and heraldic emblems. You have built enduring security, multigenerational harmony, and lasting legacy.',
    reversedMeaning: 'Squabbles over inheritances, neglecting long-term family stability, or material loss.',
    loveMeaning: 'Long-term marriage, ancestral blessings, and building an enduring family home.',
    careerMeaning: 'Pinnacle business stability, building an enduring company, and generational prosperity.',
    spiritualMeaning: 'Honoring your ancestors and leaving a righteous spiritual legacy for descendants.'
  }
];

export interface TarotSpread {
  id: string;
  name: string;
  cardCount: number;
  description: string;
  positions: string[];
}

export const TAROT_SPREADS: TarotSpread[] = [
  {
    id: 'single-card',
    name: 'Card of the Day',
    cardCount: 1,
    description: 'Draw a single card to receive your daily cosmic message and spiritual focal point.',
    positions: ['Cosmic Guidance & Daily Focus']
  },
  {
    id: 'past-present-future',
    name: 'Past • Present • Future',
    cardCount: 3,
    description: 'A classic spread tracing the root cause, present energy, and emerging path.',
    positions: ['The Past (Foundation & Roots)', 'The Present (Current Energy & Challenges)', 'The Future (Emerging Trajectory)']
  },
  {
    id: 'situation-challenge-advice',
    name: 'Situation • Challenge • Advice',
    cardCount: 3,
    description: 'Clear, actionable guidance for navigating an active life dilemma or crossroads.',
    positions: ['The Situation (What is Happening)', 'The Challenge (The Hidden Hurdle)', 'The Advice (Wisdom of Action)']
  },
  {
    id: 'you-them-relationship',
    name: 'You • Them • Connection',
    cardCount: 3,
    description: 'Examine interpersonal dynamics between you, another person, and your shared bond.',
    positions: ['Your Energy & Feelings', 'Their Energy & Intentions', 'The Shared Connection & Potential']
  }
];

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  positionName: string;
}

export function drawCards(spread: TarotSpread): DrawnCard[] {
  const deckCopy = [...TAROT_DECK];
  
  // Fisher-Yates shuffle
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
  }

  const drawn: DrawnCard[] = [];
  for (let i = 0; i < spread.cardCount; i++) {
    const isReversed = Math.random() < 0.25; // 25% chance of reversed card
    drawn.push({
      card: deckCopy[i],
      isReversed,
      positionName: spread.positions[i] || `Position ${i + 1}`
    });
  }

  return drawn;
}

/**
 * Mock Scam Detection Engine
 * analyzes text for common scam patterns, urgency, and suspicious links.
 * Works with English, Hindi, and Hinglish.
 */

const SCAM_PATTERNS = [
  {
    category: 'Urgency & Pressure',
    keywords: ['act now', 'urgent', 'limited time', 'immediate action', 'account suspended', 'final notice', '24 hours', 'jaldi', 'turant', 'urgent hai', 'block ho jayega', 'block kar diya', 'bhai jaldi'],
    severity: 'high'
  },
  {
    category: 'Suspicious Financials',
    keywords: ['lottery', 'winner', 'claim your prize', 'inheritance', 'crypto investment', '10x profit', 'cash prize', 'giveaway', 'paise bhej', 'cashback', 'lucky draw', 'free recharge', 'paisa bhej', 'screesnhot', 'payment kar', 'rupaye', 'transfer kar'],
    severity: 'high'
  },
  {
    category: 'Phishing Keywords',
    keywords: ['login to verify', 'security alert', 'confirm your details', 'update payment', 'tax refund', 'parcel delivery', 'otp share', 'otp bata', 'bank details', 'customer care', 'kyc', 'link pe click', 'pan card'],
    severity: 'medium'
  }
];

export const analyzeContent = (text) => {
  if (!text || text.length < 5) return null; // Decreased min length for short scam messages like "otp bata"
  
  const findings = [];
  const lowercaseText = text.toLowerCase();
  let totalScore = 0;

  SCAM_PATTERNS.forEach(pattern => {
    const matches = pattern.keywords.filter(keyword => lowercaseText.includes(keyword));
    if (matches.length > 0) {
      findings.push({
        category: pattern.category,
        matches: matches,
        severity: pattern.severity
      });
      // Increased points per match so even a single match like "paise bhej" heavily impacts the score
      totalScore += (pattern.severity === 'high' ? 45 : 25) * matches.length;
    }
  });

  // Link detection (refined regex)
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const links = text.match(linkRegex);
  if (links) {
    findings.push({
      category: 'External Links Detected',
      matches: links,
      severity: 'medium'
    });
    totalScore += 20;
  }

  // Artificial intelligence "feel" check (mock deterministic)
  const score = Math.min(Math.max(totalScore, 0), 100);
  const isAI = lowercaseText.length > 100 && score < 20 && (lowercaseText.length % 2 === 0);

  return {
    score,
    level: score > 60 ? 'High Risk' : score > 20 ? 'Caution' : 'Safe',
    findings,
    isAI
  };
};

export const verifyImageMock = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileName = file?.name?.toLowerCase() || '';
      
      // Determine if it's a chat message or a payment screenshot (mock logic)
      const isChat = fileName.includes('chat') || fileName.includes('msg') || fileName.includes('whatsapp') || Math.random() > 0.5;
      
      // Deterministic fake trigger
      const isFake = fileName.includes('fake') || fileName.includes('scam') || Math.random() > 0.4;

      if (isFake) {
        if (isChat) {
          // Chat / Message Fraud Detected
          resolve({
            score: 88,
            level: 'Fraudulent Message Detected',
            findings: [
              { category: 'OCR Extracted Urgency', matches: ['"paise bhej"', '"account blocked"'], severity: 'high' },
              { category: 'Malicious Payload', matches: ['Embedded Phishing Link detected in text bubble'], severity: 'high' },
              { category: 'Suspicious Context', matches: ['Unknown sender pattern matching known scam database'], severity: 'medium' }
            ]
          });
        } else {
          // Payment Forgery Detected
          resolve({
            score: 92,
            level: 'Forged / Manipulated',
            findings: [
              { category: 'Font Discrepancy', matches: ['System font override located in "Amount" block'], severity: 'high' },
              { category: 'Compression Artifacts', matches: ['Inconsistent JPEG noise around timestamp metadata'], severity: 'high' },
              { category: 'Color Bleed', matches: ['Alignment drift detected on transaction ID'], severity: 'medium' }
            ]
          });
        }
      } else {
        resolve({
          score: 8,
          level: 'Authentic',
          findings: []
        });
      }
    }, 3000);
  });
};

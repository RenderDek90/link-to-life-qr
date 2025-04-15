
export type ContactInfo = {
  name: string;
  phone?: string;
  email?: string;
  organization?: string;
  url?: string;
};

export const generateVCard = (contact: ContactInfo): string => {
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name}`,
    contact.phone ? `TEL:${contact.phone}` : '',
    contact.email ? `EMAIL:${contact.email}` : '',
    contact.organization ? `ORG:${contact.organization}` : '',
    contact.url ? `URL:${contact.url}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\n');
  
  return vCard;
};

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export const errorLevelDescriptions = {
  L: 'Low (7% recovery)',
  M: 'Medium (15% recovery)',
  Q: 'Quartile (25% recovery)',
  H: 'High (30% recovery)'
};

export const qrFrameStyles = [
  { id: 'none', label: 'No Frame' },
  { id: 'dots', label: 'Dots' },
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' }
];

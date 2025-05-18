import React from 'react';
import {Facebook, Instagram, Twitter, Linkedin} from 'lucide-react';

import {ReactNode} from 'react';

export interface NewsletterData {
  description: string;
  formAction: string;
  placeholder: string;
}

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface CompanyDetails {
  companyName: string;
  description: string;
  contact: string;
  addressLines: string[];
  email: string;
  phone: string;
  cin: string;
}

export interface SocialLink {
  icon: React.ElementType; // component reference, not instance
  url: string;
  label: string;
}

export interface FooterData {
  newsletter: NewsletterData;
  categories: FooterLink[];
  generalLinks: FooterLink[];
  companyDetails: CompanyDetails;
  socialLinks: SocialLink[];
}

export const footerData: FooterData = {
  newsletter: {
    description:
      'Subscribe for special offers, announcements, and become a part of our movement',
    formAction: '/subscribe',
    placeholder: 'Email address',
  },
  categories: [
    {label: 'All Categories', url: '/categories'},
    {label: 'Breakfast & Snacks', url: '/categories/snacks'},
    {label: 'Kitchen Essentials', url: '/categories/kitchen'},
    {label: 'Flours', url: '/categories/flours'},
    {label: 'Healthy Snacks', url: '/categories/healthy-snacks'},
  ],
  generalLinks: [
    {label: 'Sitemap', url: '/sitemap'},
    {label: 'Terms Of Service', url: '/terms'},
    {label: 'Refund & Cancellation Policy', url: '/refund-policy'},
    {label: 'Privacy Policy', url: '/privacy-policy'},
    {label: 'Shipping & Delivery Policy', url: '/shipping-policy'},
    {
      label: 'Mobile App',
      url: 'https://play.google.com/store/apps',
      external: true,
    },
    {label: 'Contact Us', url: '/contact'},
  ],
  companyDetails: {
    companyName: 'COMPANY PRIVATE LIMITED',
    description: '(Organic Farms India)',
    contact: '+91 2234567890',
    addressLines: [
      '999 FLOOR, TOWER, SOMEWHERE',
      'CITY NAME, State, Maharashtra, 400001',
    ],
    email: 'info@organicfarms.com',
    phone: '0222345678',
    cin: 'ABC123XYZ',
  },
  socialLinks: [
    {icon: Facebook, url: 'https://facebook.com', label: 'Facebook'},
    {icon: Instagram, url: 'https://instagram.com', label: 'Instagram'},
    {icon: Twitter, url: 'https://twitter.com', label: 'Twitter'},
    {icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn'},
  ],
};

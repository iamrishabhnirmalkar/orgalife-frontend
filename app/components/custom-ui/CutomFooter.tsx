import React, {useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

import {cn} from '~/lib/utils'; // Adjust import path as needed

type FooterSectionData = {
  title: string;
  content: React.ReactNode;
};

type FooterProps = {
  newsletter: {
    description: string;
    formAction: string;
    placeholder: string;
  };
  categories: {label: string; url: string}[];
  generalLinks: {label: string; url: string; external?: boolean}[];
  companyDetails: {
    companyName: string;
    description?: string;
    contact: string;
    addressLines: string[];
    email: string;
    phone: string;
    cin: string;
  };
  socialLinks: {icon: React.ElementType; url: string; label: string}[];
};

const FooterSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  // You can replace this with a proper mobile detection hook if needed
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const toggleAccordion = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full md:w-1/4 mb-6 md:mb-0">
      <div
        className={cn(
          'flex justify-between items-center mb-4 cursor-pointer',
          isMobile ? 'border-b border-gray-200 pb-2' : '',
        )}
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`${title.replace(/\s/g, '-')}-content`}
      >
        <h3 className="text-lg font-bold">{title}</h3>
        {isMobile &&
          (isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
      </div>
      <div
        id={`${title.replace(/\s/g, '-')}-content`}
        className={cn('space-y-2', isMobile && !isOpen ? 'hidden' : 'block')}
      >
        {children}
      </div>
    </div>
  );
};

const CustomFooter: React.FC<FooterProps> = ({
  newsletter,
  categories,
  generalLinks,
  companyDetails,
  socialLinks,
}) => {
  return (
    <footer className="bg-[#f0f0f0] pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
          {/* Newsletter Section */}
          <FooterSection title="The Organic Way of Life">
            <p className="text-sm mb-4">{newsletter.description}</p>
            <form
              method="post"
              action={newsletter.formAction}
              className="flex mt-4"
            >
              <input
                type="email"
                name="email"
                required
                placeholder={newsletter.placeholder}
                className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-r-md text-sm"
              >
                Subscribe
              </button>
            </form>
          </FooterSection>

          {/* Categories Section */}
          <FooterSection title="Categories">
            <ul className="space-y-2">
              {categories.map(({label, url}) => (
                <li key={label}>
                  <a href={url} className="text-sm hover:text-green-700">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* General Links Section */}
          <FooterSection title="General">
            <ul className="space-y-2">
              {generalLinks.map(({label, url, external}) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm hover:text-green-700"
                    >
                      {label}
                    </a>
                  ) : (
                    <a href={url} className="text-sm hover:text-green-700">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Company Details Section */}
          <FooterSection title="Company Details">
            <div className="space-y-2 text-sm">
              <p className="font-medium">{companyDetails.companyName}</p>
              {companyDetails.description && (
                <p>{companyDetails.description}</p>
              )}
              <p>Contact: {companyDetails.contact}</p>
              {companyDetails.addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <p>
                Email:{' '}
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="hover:text-green-700"
                >
                  {companyDetails.email}
                </a>
              </p>
              <p>Tel: {companyDetails.phone}</p>
              <p>CIN: {companyDetails.cin}</p>
            </div>
          </FooterSection>
        </div>

        {/* Brand + Social Icons */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-green-800">ORGANIC FARMS</h2>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map(({icon: Icon, url, label}) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-gray-500 hover:text-green-700"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Organic Farms. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;

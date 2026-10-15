import React from 'react';
import Link from 'next/link';
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

/* ==========================================================================
   SITE DETAILS - edit these in one place and the whole site updates.
   Footer, burger menu, header phone icon and the Contact page all read from
   here.
========================================================================== */
export const COMPANY_NAME = 'Titan Global Auto Group';

// What a tap/click on ANY phone number on the site dials
export const PHONE_DIAL = '+447553509308';

// The real mobile number, shown as-is (Contact page "Mobile" card)
export const PHONE_MOBILE_DISPLAY = '07553 509308';

// Landline-style numbers that are SHOWN on the site. Tapping either of them
// still dials PHONE_DIAL above. Paste the full numbers between the quotes,
// e.g. '020 1234 5678'.
//   - PHONE_020    -> shown in the footer and the burger menu. While empty it
//                     falls back to the mobile number.
//   - PHONE_01344  -> shown on the Contact page. While empty that card is hidden.
const PHONE_020 = '';
const PHONE_01344 = '';

export const PHONE_DISPLAY = PHONE_020 || PHONE_MOBILE_DISPLAY; // footer
export const PHONE_MENU_DISPLAY = PHONE_DISPLAY; // burger menu
export const PHONE_LANDLINE_DISPLAY = PHONE_01344; // contact page

// Wordmark: big word, thin rule, small line underneath
const LOGO_MAIN = 'Titan';
const LOGO_SUB = 'Global Auto Group';

// Shown in the footer under the logo. Hidden while empty.
// e.g. 'Titan Global Auto Group, 1 Example Road, Townname, County, AB1 2CD'
const COMPANY_ADDRESS = '';

// Swap these for your real social pages (they currently open each site's homepage)
export const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com', Icon: FaYoutube },
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: FaFacebookF },
  { label: 'X', href: 'https://x.com', Icon: XIcon },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: FaLinkedinIn },
];

// Policy links shown under the copyright line
const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Complaints Procedure', href: '/complaints-procedure' },
  { label: 'Modern Slavery Statement', href: '/modern-slavery' },
];

// Small print. If you offer finance, add your own FCA / credit-broker wording
// here - it has to reflect your actual regulatory status.
const LEGAL_PARAGRAPHS = [
  'Vehicle specifications, prices and availability are subject to change without notice. Images are for illustration purposes only.',
];

// X (Twitter) logo, inline so it doesn't depend on the installed react-icons version
function XIcon() {
  return (
    <svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="footer-logo" aria-label={COMPANY_NAME}>
          <span className="footer-logo-main">{LOGO_MAIN}</span>
          <span className="footer-logo-rule" />
          <span className="footer-logo-sub">{LOGO_SUB}</span>
        </Link>

        {COMPANY_ADDRESS && <p className="footer-address">{COMPANY_ADDRESS}</p>}

        <div className="footer-socials">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>

        <a href={`tel:${PHONE_DIAL}`} className="footer-phone">
          {PHONE_DISPLAY}
        </a>

        <div className="footer-legal">
          <p>
            &copy; {year} {COMPANY_NAME}. All rights reserved.
          </p>
          {LEGAL_PARAGRAPHS.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <div className="footer-legal-links">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

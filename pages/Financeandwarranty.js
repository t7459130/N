import React from 'react';
import Layout from '../components/Layout';

/* =========================================================
   Auto-generated finance & warranty plan data.
   Figures are representative examples only, based on a
   sample £120,000 vehicle with a 10% deposit — actual rates
   depend on the vehicle, term, deposit and applicant status.
========================================================= */
const financePlans = [
  {
    id: 'hp',
    name: 'Hire Purchase',
    tagline: 'Fixed monthly payments and guaranteed ownership at the end of the agreement.',
    monthly: '1,850',
    period: '48 months',
    features: [
      '10% deposit, 48 fixed monthly payments',
      'Representative APR from 8.9%',
      'You own the car outright once settled',
      'No mileage restrictions',
      'Early settlement available at any time',
    ],
  },
  {
    id: 'pcp',
    name: 'PCP',
    tagline: 'Lower monthly payments with the flexibility to return, renew or buy at the end.',
    monthly: '1,240',
    period: '36 months',
    featured: true,
    features: [
      '10% deposit, 36 fixed monthly payments',
      'Representative APR from 9.4%',
      'Optional final payment to own the car',
      'Guaranteed minimum future value',
      'Upgrade to a new model at term end',
    ],
  },
  {
    id: 'lease-purchase',
    name: 'Lease Purchase',
    tagline: 'A balloon-based structure tailored for high-value and performance vehicles.',
    monthly: '1,590',
    period: '36 months',
    features: [
      '10–20% deposit, flexible term length',
      'Representative APR from 8.5%',
      'Balloon payment set against residual value',
      'Popular for business and personal contract hire',
      'Dedicated specialist finance underwriting',
    ],
  },
];

const warrantyPlans = [
  {
    id: 'standard',
    name: 'Standard Warranty',
    duration: '3 Months',
    description: 'Included as standard with every vehicle we sell, covering the essentials from day one.',
    features: [
      'Engine, gearbox and drivetrain cover',
      'Electrical systems cover',
      'UK-wide approved repairer network',
      'Parts and labour included',
    ],
  },
  {
    id: 'extended',
    name: 'Extended Warranty',
    duration: '12 Months',
    featured: true,
    description: 'Our most popular upgrade, giving comprehensive mechanical and electrical cover for a full year.',
    features: [
      'Everything in Standard, plus:',
      'Air conditioning and infotainment cover',
      'Turbocharger and forced-induction cover',
      'Unlimited claims value',
      'Nationwide courtesy car while repaired',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Warranty',
    duration: '24 Months',
    description: 'The most comprehensive plan we offer, designed for total peace of mind on our highest-value cars.',
    features: [
      'Everything in Extended, plus:',
      '24-month, unlimited-mileage cover',
      'European roadside assistance included',
      'Wear-and-tear component cover',
      'Fully transferable if you sell the car',
    ],
  },
];

const faqs = [
  {
    q: 'How much deposit will I need?',
    a: 'Most of our finance plans are arranged with a deposit of around 10%, though this can be adjusted to suit your budget and monthly payment preference. Part-exchange vehicles can also be used towards your deposit.',
  },
  {
    q: 'Can I part-exchange my current car?',
    a: 'Yes. We welcome part-exchanges against any of our finance plans, and our team will provide a valuation as part of your application so the figure can be applied directly to your deposit.',
  },
  {
    q: 'Is finance guaranteed once I apply?',
    a: 'All finance is subject to status, affordability checks and lender approval. Our team works with a panel of specialist prestige and performance car lenders to find the most suitable option for your circumstances.',
  },
  {
    q: 'What isn’t covered by the warranty?',
    a: 'Routine servicing, consumable items and pre-existing faults identified at the point of sale are excluded from all plans. A full terms document listing inclusions and exclusions is provided before purchase.',
  },
];

export default function FinanceAndWarranty() {
  return (
    <Layout>
      <div className="finance-page">
        <div className="finance-header">
          <h1>Finance &amp; Warranty</h1>
          <p>Tailored finance plans and comprehensive warranty cover for every vehicle we sell</p>
        </div>

        <div className="finance-container">
          <p className="finance-intro">
            We work with a panel of specialist prestige and performance car lenders to structure a
            plan around the way you want to own your next car. Every finance option below is paired
            with a warranty plan for complete peace of mind, and our team can talk you through the
            right combination for your circumstances.
          </p>

          <div className="finance-block">
            <div className="finance-block-heading">
              <h2>Finance Plans</h2>
              <p>
                Illustrative examples based on a £120,000 vehicle with a 10% deposit. Your own
                quote will be calculated around the specific car, deposit and term you choose.
              </p>
            </div>

            <div className="finance-grid">
              {financePlans.map((plan) => (
                <div key={plan.id} className={`finance-card${plan.featured ? ' featured' : ''}`}>
                  {plan.featured && <span className="featured-badge">Most Popular</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                  <div className="plan-example">
                    <span className="amount">£{plan.monthly}</span>
                    <span className="period">per month / {plan.period}</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a href="/contact" className="plan-cta">Get a Quote</a>
                </div>
              ))}
            </div>

            <div className="finance-representative-example">
              <strong>Representative example:</strong> Cash price £120,000, deposit £12,000, 36
              monthly payments of £1,240, followed by an optional final payment. Representative
              APR 9.4% (fixed). Finance is subject to status and available to UK residents aged
              18 or over. Terms and conditions apply. We act as a credit broker, not a lender, and
              may receive a commission from your chosen finance provider.
            </div>
          </div>

          <div className="finance-block">
            <div className="finance-block-heading">
              <h2>Warranty Plans</h2>
              <p>
                Every car we sell includes our Standard Warranty as part of the purchase price.
                Extended and Platinum cover can be added at the point of sale.
              </p>
            </div>

            <div className="warranty-grid">
              {warrantyPlans.map((plan) => (
                <div key={plan.id} className="warranty-card">
                  <span className="warranty-duration">{plan.duration}</span>
                  <h3>{plan.name}</h3>
                  <p className="warranty-desc">{plan.description}</p>
                  <ul className="plan-features">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="finance-block">
            <div className="finance-block-heading">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="finance-faq">
              {faqs.map((item) => (
                <div key={item.q} className="finance-faq-item">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
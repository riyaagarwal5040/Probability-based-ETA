/**
 * GuideScreen.jsx — Help and FAQ.
 * No inline styles - all styling via className
 */

import React, { useState } from 'react';
import '../styles/GuideScreen.css';

const STEPS = [
  { icon: '🗺', title: 'Enter route', desc: 'Type your origin and destination', color: '#57cdf4' },
  { icon: '⚡', title: 'Analyze', desc: 'We compute reliability scores using live traffic data', color: '#ffd84d' },
  { icon: '📊', title: 'Choose confidence', desc: 'Pick P50, P73, P90, or P95 based on your risk tolerance', color: '#22b573' },
  { icon: '🚗', title: 'Navigate', desc: 'Start your trip with confidence', color: '#ff5a5a' },
];

const FAQ = [
  { q: 'What is a reliability score?', a: 'A 0–100 metric that reflects how predictable a route is. Higher = more consistent travel times.' },
  { q: 'What does P73 mean?', a: "P73 means there's a 73% chance you'll arrive within that time. P90 = 90% chance, etc." },
  { q: 'How is this different from Google Maps?', a: 'Google gives one ETA. We give you a probability range so you can plan for uncertainty.' },
  { q: 'Is the data real-time?', a: 'Yes! We use live traffic feeds and crowdsourced incident reports.' },
];

export default function GuideScreen() {
  const [openFaq, setOpenFaq] = useState(null);

  function toggleFaq(i) {
    setOpenFaq(openFaq === i ? null : i);
  }

  return (
    <div className="screen-container">

      {/* Header */}
      <div className="guide-header">
        <div className="guide-icon">?</div>
        <div>
          <div className="guide-title">How PathSure Works</div>
          <div className="guide-subtitle">Understanding route reliability</div>
        </div>
      </div>

      {/* GPS vs PathSure comparison */}
      <div className="comparison-card">
        <div className="comparison-column">
          <div className="comparison-heading comparison-heading-gps">Traditional GPS</div>
          {['Single ETA only', 'No uncertainty model', 'Ignores traffic variance'].map((t) => (
            <div key={t} className="comparison-item comparison-item-bad">❌ {t}</div>
          ))}
        </div>
        <div className="comparison-divider" />
        <div className="comparison-column">
          <div className="comparison-heading comparison-heading-pathsure">PathSure</div>
          {['Probability range', 'Reliability scoring', 'Real-time crowdsourcing'].map((t) => (
            <div key={t} className="comparison-item comparison-item-good">✓ {t}</div>
          ))}
        </div>
      </div>

      {/* How it works — label */}
      <div className="section-title">
        How It Works
      </div>

      {/* Steps */}
      {STEPS.map((step, i) => (
        <div
          key={i}
          className="step-card"
          style={{ borderLeft: `3px solid ${step.color}` }}
        >
          <div 
            className="step-icon-wrapper" 
            style={{ 
              background: `${step.color}15`, 
              border: `1px solid ${step.color}30` 
            }}
          >
            {step.icon}
          </div>
          <div>
            <div className="step-title" style={{ color: step.color }}>{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        </div>
      ))}

      {/* FAQ label */}
      <div className="section-title">
        FAQ
      </div>

      {/* FAQ accordion — conditional rendering per item */}
      {FAQ.map((item, i) => (
        <div key={i} className="faq-card">
          <button
            onClick={() => toggleFaq(i)}
            className="faq-button"
          >
            <span className="faq-question">{item.q}</span>
            <span className="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
          </button>

          {/* Answer: only rendered when this FAQ is open */}
          {openFaq === i && (
            <div className="faq-answer">
              {item.a}
            </div>
          )}
        </div>
      ))}

      <div className="spacer-bottom" />

    </div>
  );
}

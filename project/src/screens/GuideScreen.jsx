/**
 * GuideScreen.jsx — Help and FAQ.
 * No inline styles - all styling via className
 */

import React, { useState } from 'react';

const STEPS = [
  { icon: '🗺', color: '#57cdf4', title: 'Enter Your Route', desc: 'Type your origin and destination.' },
  { icon: '⚡', color: '#22b573', title: 'Read the Probability', desc: '73% means 73 out of 100 trips.' },
  { icon: '🎯', color: '#ffd84d', title: 'Reliability Score', desc: 'Higher = more predictable.' },
  { icon: '⟳', color: '#ff5a5a', title: 'Smart Rerouting', desc: 'Chooses stable routes.' },
];

const FAQ = [
  { q: 'Where does data come from?', a: 'From OpenStreetMap via OSRM.' },
  { q: 'What is reliability?', a: 'Measure of consistency.' },
  { q: 'Why multiple routes?', a: 'Different reliability levels.' },
];

export default function GuideScreen() {
  const [openFaq, setOpenFaq] = useState(null);

  function toggleFaq(index) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>

      <div style={{ display: 'flex', gap: 12 }}>
        <div>?</div>
        <div>
          <div>How PathSure Works</div>
          <div>Understanding route reliability</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          {['Single ETA only', 'No uncertainty'].map(t => <div key={t}>❌ {t}</div>)}
        </div>
        <div style={{ width: 1 }} />
        <div style={{ flex: 1 }}>
          {['Reliability score', 'Crowdsourcing'].map(t => <div key={t}>✓ {t}</div>)}
        </div>
      </div>

      {STEPS.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12 }}>
          <div>{step.icon}</div>
          <div>
            <div>{step.title}</div>
            <div>{step.desc}</div>
          </div>
        </div>
      ))}

      {FAQ.map((item, i) => (
        <div key={i}>
          <button onClick={() => toggleFaq(i)}>{item.q}</button>
          {openFaq === i && <div>{item.a}</div>}
        </div>
      ))}

      <div style={{ height: 110 }} />

    </div>
  );
}
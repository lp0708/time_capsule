import React from 'react';

const Footer = () => (
  <footer style={{
    textAlign: 'center',
    padding: '2.5rem 1rem',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-body)',
    borderTop: '1px solid var(--border)',
    background: 'var(--parchment)',
    marginTop: '4rem',
  }}>
    <span style={{ fontSize: '1.1rem' }}>🕰️</span>
    &nbsp; Time Capsule &mdash; Preserve your most precious memories &nbsp;
    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>© {new Date().getFullYear()}</span>
  </footer>
);

export default Footer;
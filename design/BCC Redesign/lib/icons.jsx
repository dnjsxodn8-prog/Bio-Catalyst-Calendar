// Inline SVG icon set — line, 1.6 stroke, 18px viewBox 24
const Icon = ({ d, size = 18, stroke = 1.6, fill = 'none', children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d}/> : children}
  </svg>
);

const Icons = {
  Dashboard: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></Icon>,
  Building: (p) => <Icon {...p}><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10"/><path d="M8 7h2M8 11h2M8 15h2"/><path d="M12 7h0M12 11h0M12 15h0"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>,
  Mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>,
  Filter: (p) => <Icon {...p}><path d="M3 5h18M6 12h12M10 19h4"/></Icon>,
  Sort: (p) => <Icon {...p}><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Chevron: (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  ChevronDown: (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  External: (p) => <Icon {...p}><path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></Icon>,
  Beaker: (p) => <Icon {...p}><path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.4h14.2A1 1 0 0 0 20 20l-6-11V3"/><path d="M7.5 14h9"/></Icon>,
  Pulse: (p) => <Icon {...p}><path d="M3 12h4l2-7 4 14 2-7h6"/></Icon>,
  Pin: (p) => <Icon {...p}><path d="M12 17v5M9 3h6l1 6 3 2v3H5v-3l3-2 1-6Z"/></Icon>,
  Star: (p) => <Icon {...p}><path d="m12 3 2.7 6 6.3.6-4.8 4.4 1.5 6.3L12 17l-5.7 3.3 1.5-6.3L3 9.6 9.3 9 12 3Z"/></Icon>,
  Sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></Icon>,
  Moon: (p) => <Icon {...p}><path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></Icon>,
  Logo: (p) => <Icon {...p}><path d="M4 20 9 4l3 10 3-7 5 13"/><circle cx="12" cy="14" r="1.6" fill="currentColor"/></Icon>,
  Close: (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>,
  Map: (p) => <Icon {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></Icon>,
  Check: (p) => <Icon {...p}><path d="M5 12l5 5L20 7"/></Icon>,
  Flag: (p) => <Icon {...p}><path d="M4 22V4M4 4h12l-2 4 2 4H4"/></Icon>,
  Dollar: (p) => <Icon {...p}><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Icon>,
  Layers: (p) => <Icon {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5M3 18l9 5 9-5"/></Icon>,
  Trend: (p) => <Icon {...p}><path d="m3 17 6-6 4 4 8-8M14 7h7v7"/></Icon>,
};

window.Icons = Icons;

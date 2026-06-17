import React, { useState } from 'react';
import { useGoogleSheet, FALLBACK_DATA } from '../hooks/useGoogleSheet';
import { 
  X, 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  RefreshCw, 
  ExternalLink, 
  Table, 
  BookOpen, 
  Code
} from 'lucide-react';

interface DataDiagnosticPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataDiagnosticPanel: React.FC<DataDiagnosticPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('HERO');
  
  // Create hooks to monitor sheet states
  const heroSheet = useGoogleSheet('HERO');
  const storySheet = useGoogleSheet('STORY');
  const servicesSheet = useGoogleSheet('SERVICES');
  const clientsSheet = useGoogleSheet('CLIENTS');
  const skillsSheet = useGoogleSheet('SKILLS');
  const testimonialsSheet = useGoogleSheet('TESTIMONIALS');
  const portfolioSheet = useGoogleSheet('PORTFOLIO');
  const blogsSheet = useGoogleSheet('BLOGS');
  const resumeSheet = useGoogleSheet('RESUME');
  const contactSheet = useGoogleSheet('CONTACT');

  const sheetsMeta: Record<string, { hook: any, desc: string, expectedKeys: string[] }> = {
    HERO: { 
      hook: heroSheet, 
      desc: "Hero branding tagline, portrait pictures, and action metrics.",
      expectedKeys: Object.keys(FALLBACK_DATA.HERO[0] || {})
    },
    STORY: { 
      hook: storySheet, 
      desc: "Bespoke biography paragraphs, focal agency quote block, mission statement, and key values.",
      expectedKeys: Object.keys(FALLBACK_DATA.STORY[0] || {})
    },
    SERVICES: { 
      hook: servicesSheet, 
      desc: "Pinterest card listings with operational scopes, results indicators, and specialized icon maps.",
      expectedKeys: Object.keys(FALLBACK_DATA.SERVICES[0] || {})
    },
    CLIENTS: { 
      hook: clientsSheet, 
      desc: "Client brand logos, industries served, duration limits, and custom log summary numbers.",
      expectedKeys: Object.keys(FALLBACK_DATA.CLIENTS[0] || {})
    },
    SKILLS: { 
      hook: skillsSheet, 
      desc: "Interactive floating skill spheres with sizes indicating expertise percentage tiers.",
      expectedKeys: Object.keys(FALLBACK_DATA.SKILLS[0] || {})
    },
    TESTIMONIALS: { 
      hook: testimonialsSheet, 
      desc: "Slide-carousel feedback with Polaroid borders, corporate titles, and handwritten tilt levels.",
      expectedKeys: Object.keys(FALLBACK_DATA.TESTIMONIALS[0] || {})
    },
    PORTFOLIO: { 
      hook: portfolioSheet, 
      desc: "Behance design files including challenge targets, execution plans, and metrics logs.",
      expectedKeys: Object.keys(FALLBACK_DATA.PORTFOLIO[0] || {})
    },
    BLOGS: { 
      hook: blogsSheet, 
      desc: "Editorial magazine articles with summary extracts, cover files, and reading durations.",
      expectedKeys: Object.keys(FALLBACK_DATA.BLOGS[0] || {})
    },
    RESUME: { 
      hook: resumeSheet, 
      desc: "Experience timelines, secretarial certifications, and credentials groupings.",
      expectedKeys: Object.keys(FALLBACK_DATA.RESUME[0] || {})
    },
    CONTACT: { 
      hook: contactSheet, 
      desc: "Social direct addresses, WhatsApp codes, and default briefing message paragraphs.",
      expectedKeys: Object.keys(FALLBACK_DATA.CONTACT[0] || {})
    }
  };

  if (!isOpen) return null;

  const currentSheet = sheetsMeta[activeTab];
  const { data, loading, error, isFallback, refresh } = currentSheet.hook;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-full bg-cream-light dark:bg-obsidian border-l border-gold/20 flex flex-col shadow-2xl relative">
        
        {/* Header Drawer Control */}
        <div className="p-6 border-b border-gold/10 flex items-center justify-between bg-cream-warm dark:bg-carbon">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-cream-warm">
            <Database size={18} className="text-gold" />
            <div>
              <h3 className="font-serif text-lg font-medium">Spreadsheet Data Inspector</h3>
              <p className="font-mono text-[9px] tracking-wider text-gray-400 uppercase mt-0.5">Real-time Gviz Query Diagnostics</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full border border-gold/10 hover:bg-gold/10 text-gray-500 hover:text-gold transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Section List Quick Scroll row */}
        <div className="p-4 border-b border-gold/10 bg-cream-light dark:bg-obsidian flex gap-2 overflow-x-auto select-none no-scrollbar">
          {Object.keys(sheetsMeta).map((key) => {
            const { isFallback: fallbackState, loading: loadState } = sheetsMeta[key].hook;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 rounded-sm font-sans text-[9px] tracking-widest font-bold uppercase transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === key
                    ? 'bg-gold text-white shadow-sm'
                    : 'bg-cream-warm dark:bg-carbon text-gray-500 dark:text-gray-400 border border-gold/5 hover:border-gold/30'
                }`}
              >
                <span>{key}</span>
                {loadState ? (
                  <div className="h-2 w-2 border-sm border-current border-t-transparent rounded-full animate-spin" />
                ) : fallbackState ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-gold inline-block" title="Offline fallback active" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" title="Live connection active" />
                )}
              </button>
            );
          })}
        </div>

        {/* Info panel of the selected Tab */}
        <div className="p-6 flex-grow overflow-y-auto space-y-6">
          <div className="p-4 rounded-sm bg-cream-warm dark:bg-carbon border border-gold/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-gold">TAB: {activeTab}</span>
              <button
                onClick={refresh}
                className="flex items-center gap-1 text-[#9C7956] hover:text-gold font-mono text-[9px] font-bold uppercase transition-transform cursor-pointer"
              >
                <RefreshCw size={10} />
                <span>Refresh Live</span>
              </button>
            </div>
            <p className="font-serif text-sm text-gray-700 dark:text-gray-300 italic">{currentSheet.desc}</p>
            
            {/* Status indicator block */}
            <div className="flex items-center gap-3 pt-2 text-xs">
              {loading ? (
                <div className="text-gray-400 flex items-center gap-1.5"><RefreshCw size={12} className="animate-spin" /> Querrying Google Sheet...</div>
              ) : error ? (
                <div className="text-rose-gold font-mono flex items-center gap-1.5 bg-rose-gold/10 px-3 py-1 rounded-sm border border-[#B5838D]/25">
                  <AlertTriangle size={12} />
                  <span>Fallback Active: {error}</span>
                </div>
              ) : isFallback ? (
                <div className="text-rose-gold font-mono flex items-center gap-1.5 bg-rose-gold/10 px-3 py-1 rounded-sm border border-[#B5838D]/25">
                  <AlertTriangle size={12} />
                  <span>Fallback Rendered (Local Cache)</span>
                </div>
              ) : (
                <div className="text-teal-600 dark:text-teal-400 font-mono flex items-center gap-1.5 bg-teal-500/10 px-3 py-1 rounded-sm border border-teal-500/20">
                  <CheckCircle size={12} />
                  <span>Connection Green (Live Google Sheets)</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Mappings Dictionary */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-cream-warm">
              <Code size={14} className="text-gold" />
              <h4 className="font-serif text-base">Required Column Keys Mapped</h4>
            </div>
            
            <p className="font-sans text-[11px] text-gray-400 leading-relaxed font-light">
              We translate spreadsheet column names into readable camelCase JSON parameters automatically! Below are the expected naming styles and files:
            </p>

            <div className="border border-gold/10 rounded-sm overflow-hidden bg-cream-warm/40 dark:bg-carbon/20">
              <table className="w-full text-left font-mono text-[10px]">
                <thead>
                  <tr className="bg-cream-warm dark:bg-carbon border-b border-gold/10 text-[#9C7956] dark:text-[#E6C29E] font-bold uppercase">
                    <th className="p-3">Expected key</th>
                    <th className="p-3">Parsed from Column Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {currentSheet.expectedKeys.map((key) => {
                    // Try to guess a readable equivalent
                    const readableLabel = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase());

                    return (
                      <tr key={key} className="hover:bg-gold/5">
                        <td className="p-3 text-gold font-bold">{key}</td>
                        <td className="p-3 text-gray-400 dark:text-gray-500 italic">"{readableLabel}" / "{key.toUpperCase()}"</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Parsed JSON Live Feed payload */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-cream-warm">
              <Table size={14} className="text-gold" />
              <h4 className="font-serif text-base">Parsed JSON Rows Response</h4>
            </div>

            <div className="p-4 rounded-sm bg-zinc-950 text-emerald-400 font-mono text-[10px] h-48 overflow-y-auto border border-white/5 shadow-inner">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>

        </div>

        {/* Sheet Source External Link */}
        <div className="p-6 border-t border-gold/10 bg-cream-warm dark:bg-carbon text-center">
          <a
            href="https://docs.google.com/spreadsheets/d/1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-rose-gold font-semibold tracking-wider font-sans uppercase group"
          >
            <span>Open Source Google Sheet</span>
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};

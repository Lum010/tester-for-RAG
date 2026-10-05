import React from 'react';

interface FooterProps {
  onOpenDisclaimer: () => void;
  onOpenGlossary: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDisclaimer,
  onOpenGlossary,
  onOpenContact,
}) => {
  return (
    <footer
      className="w-full bg-[#f8fafc] border-t border-gray-200 mt-16 pt-12 pb-8 text-xs text-gray-600"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Logo */}
        <div className="mb-6">
          <img
            alt="EMC Energy Market Company"
            className="h-10 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XXR5qzy-tb0V_VB84KOW68yom-RAlWp6EUO48b9tG1xaF2OVjTAhoJO20BOqgzI3LU66m9JgtE9Bc5n6Klp6BWxQPbdlTGuN0BkeYc04GUtAEuYGMfkQVGPyyp6MGf8ZOrtAReJw0ze4aq0qVSezmTR-S4OzAKJZ0LoSr-Z-SaoY2JCRh25rzt7sXtz8ebMLfUAMHBRBfXL6u_dysQUdf5aZ322iMS2Ce6vMAg-ivBTLIjC4lAJrcI7NQ"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer Policy Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-normal text-gray-600 mb-6">
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Disclaimer
          </button>
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Personal Data Notice
          </button>
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Browser Statement
          </button>
          <button
            onClick={onOpenDisclaimer}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Whistleblowing Policy
          </button>
          <a href="#overview" className="hover:underline hover:text-[#0055b8]">
            Sitemap
          </a>
          <button
            onClick={onOpenGlossary}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Glossary
          </button>
          <button
            onClick={onOpenContact}
            className="hover:underline hover:text-[#0055b8] cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Bottom Credits and Social Links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">An SGX Group Company</p>
            <p className="mt-0.5">© 2026 Energy Market Company | Co Reg No. 200101336E</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500">Visit us on</span>
            <a
              className="text-gray-700 hover:text-[#0055b8] transition-colors"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              className="text-gray-700 hover:text-[#e30613] transition-colors"
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

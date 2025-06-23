import { footerData } from '@/data/constants.js';
import { Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-10 text-gray-800">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {/* Logo + Description */}
        <div>
          <img src={logo} alt="Chlothzy Logo" className="mb-4 h-24" />
          <p className="text-sm">{footerData.description}</p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            {footerData.companyLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:underline">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">GET IN TOUCH</h3>
          <p className="text-sm">
            <span className="font-medium">Phone:</span>{' '}
            {footerData.contact.phone}
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span>{' '}
            <a
              href={`mailto:${footerData.contact.email}`}
              className="hover:underline"
            >
              {footerData.contact.email}
            </a>
          </p>
          <p className="mt-2 text-sm whitespace-pre-line">
            <span className="font-medium">Address:</span>
            {'\n'}
            {footerData.contact.address}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between border-t border-gray-200 pt-4 text-sm md:flex-row">
        <p>{footerData.copyright}</p>
        <div className="mt-2 flex items-center gap-2 md:mt-0">
          <span>{footerData.instagramText}</span>
          <a
            href="https://www.instagram.com/chlothzy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5 text-pink-500 hover:text-pink-600" />
          </a>
        </div>
      </div>
    </footer>
  );
}

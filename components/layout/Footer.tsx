import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "How We Help",
      links: [
        "Overview",
        "Expert Calls",
        "AI-Moderated Calls",
        "Surveys",
        "Expert Content Library",
        "Expert Content Feed",
        "Board Placements",
        "Deal Advisors",
        "myApexIntel",
        "Our Expert Network",
      ],
    },
    {
      title: "Industries",
      links: [
        "Financial Services",
        "Private Equity",
        "Consulting Firms",
        "Law",
        "Corporations",
      ],
    },
    {
      title: "Resources",
      links: ["Overview", "Articles", "Case Studies", "Reports", "Videos"],
    },
    {
      title: "For Experts",
      links: ["Overview", "Apply"],
    },
    {
      title: "About Us",
      links: ["Overview", "Contact & Locations", "News", "Careers"],
    },
  ];

  return (
    <footer className="bg-apex-black text-white pt-24 pb-12 border-t border-apex-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2">
              <span className="font-heading text-3xl font-bold tracking-tight text-white">
                Apex<span className="text-apex-blue">Intel</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-heading">
              The world's leading platform<br />for trusted human expertise
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              X
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Facebook
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-lg mb-6">{column.title}</h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 pt-8 border-t border-apex-border">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Corporate Policies and Statutory Disclosures</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">EEO Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Diversity Statement</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Modern Slavery Act</Link>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()}, ApexIntel® and the ApexIntel logos are trademarks of Apex Intelligence Group, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Bot, Twitter, Github, Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-12 font-normal">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8 mb-20">
                {/* Brand Column */}
                <div className="col-span-2">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                            <Bot className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-medium text-white">Clara</span>
                    </Link>
                    <div className="flex gap-4 mt-6">
                        <SocialIcon icon={Twitter} />
                        <SocialIcon icon={Github} />
                    </div>
                </div>

                {/* Links */}
                <FooterGroup 
                    title="Product" 
                    links={[
                        { label: "Products", href: "/products" },
                        { label: "Features", href: "/features" },
                        { label: "Solutions", href: "/solutions" },
                        { label: "Pricing", href: "/pricing" }
                    ]} 
                />
                <FooterGroup 
                    title="Resources" 
                    links={[
                        { label: "Documentation", href: "/docs" },
                        { label: "Guides", href: "/docs" },
                        { label: "Help Center", href: "/docs" },
                        { label: "API Docs", href: "/docs" }
                    ]} 
                />
                <FooterGroup 
                    title="Company" 
                    links={[
                        { label: "About", href: "/about" },
                        { label: "Blog", href: "/blog" },
                        { label: "Careers", href: "/careers" },
                        { label: "Customers", href: "/customers" }
                    ]} 
                />
                <FooterGroup 
                    title="Legal" 
                    links={[
                        { label: "Privacy Policy", href: "/privacy" },
                        { label: "Terms of Service", href: "/terms" },
                        { label: "Cookie Policy", href: "/privacy" }
                    ]} 
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-zinc-600 text-sm font-normal">
                    © {new Date().getFullYear()} Bothive Inc.
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm text-zinc-500 font-normal">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div className="col-span-1">
            <h3 className="font-medium text-white text-sm mb-4">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors font-normal">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
        </a>
    );
}

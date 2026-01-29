'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    company: [
      { label: 'Về Chúng Tôi', href: '/about' },
      { label: 'Câu Chuyện Thương Hiệu', href: '/about' },
      { label: 'Đội Ngũ', href: '/about' },
      { label: 'Nghề Nghiệp', href: '/about' }
    ],
    products: [
      { label: 'Tất Cả Sản Phẩm', href: '/product-collection' },
      { label: 'Kem Đánh Răng', href: '/product-collection' },
      { label: 'Bàn Chải', href: '/product-collection' },
      { label: 'Nước Súc Miệng', href: '/product-collection' }
    ],
    support: [
      { label: 'Liên Hệ', href: '/about' },
      { label: 'FAQ', href: '/about' },
      { label: 'Chính Sách Đổi Trả', href: '/about' },
      { label: 'Vận Chuyển', href: '/about' }
    ],
    legal: [
      { label: 'Điều Khoản Sử Dụng', href: '/about' },
      { label: 'Chính Sách Bảo Mật', href: '/about' },
      { label: 'Chính Sách Cookie', href: '/about' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'ShareIcon', href: 'https://www.facebook.com/chinhakhoa.pinesmile' },
    { name: 'Zalo', icon: 'ChatBubbleLeftIcon', href: 'https://zalo.me/0706682881' }
  ];

  if (!isHydrated) {
    return (
      <footer className={`bg-forest-green text-white pt-16 pb-8 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center pb-8 border-b border-white/20">
            <p className="text-sm text-mint-white">
              © 2026 PineSmile. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`bg-forest-green text-white pt-16 pb-8 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/homepage" className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10">
                <img
                  src="/assets/images/logo.png"
                  alt="PineSmile Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-2xl">PineSmile</span>
            </Link>
            <p className="text-mint-white mb-6 max-w-md">
              Chăm sóc răng miệng cách mạng từ lá dứa - Yêu răng của bạn, yêu hành tinh của chúng ta.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-tropical-yellow transition-all duration-300 flex items-center justify-center"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Công Ty</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-mint-white hover:text-tropical-yellow transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Sản Phẩm</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-mint-white hover:text-tropical-yellow transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-mint-white hover:text-tropical-yellow transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-mint-white">
              © {currentYear} PineSmile. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-mint-white font-semibold mb-3">Liên Hệ Với Chúng Tôi</p>
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://www.facebook.com/chinhakhoa.pinesmile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-tropical-orange transition-all duration-300 flex items-center justify-center"
                    aria-label="Facebook"
                  >
                    <Icon name="ShareIcon" size={20} />
                  </a>
                  <a
                    href="https://zalo.me/0706682881"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-tropical-orange transition-all duration-300 flex items-center justify-center"
                    aria-label="Zalo"
                  >
                    <Icon name="ChatBubbleLeftIcon" size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-mint-white hover:text-tropical-yellow transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
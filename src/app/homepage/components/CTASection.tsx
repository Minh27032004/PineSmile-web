'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  // DÁN URL MỚI NHẤT VỪA COPY Ở BƯỚC 2 VÀO ĐÂY
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwNc4ASXRNp49gG2bx2FpHkP8lNXHvAS_m4yrZ7b1VvFpf26ctXTBBSt9mAsWndV--_qg/exec';
  
  // Gửi số điện thoại qua tham số URL
  const finalURL = `${scriptURL}?Phone=${encodeURIComponent(phone)}`;

  try {
    await fetch(finalURL, {
      method: 'GET',
      mode: 'no-cors', // Ép gửi đi không cần kiểm tra bảo mật domain
    });

    alert('Cảm ơn bạn! PineSmile đã nhận được thông tin.');
    setPhone('');
  } catch (error) {
    console.error('Lỗi:', error);
    alert('Có lỗi xảy ra, vui lòng thử lại.');
  } finally {
    setIsLoading(false);
  }
};
  if (!isHydrated) {
    return (
      <section className={`py-16 bg-gradient-to-br from-tropical-green to-forest-green ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Sẵn Sàng Cho Nụ Cười Rạng Rỡ?
            </h2>
            <p className="text-xl mb-8 text-mint-white">
              Tham gia cùng hơn 50.000 khách hàng đã chọn PineSmile cho sức khỏe răng miệng và hành tinh xanh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/chinhakhoa.pinesmile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-tropical-orange text-white font-heading font-semibold text-lg rounded-full hover:shadow-organic-hover transition-all duration-300"
              >
                Mua Ngay - Miễn Phí Vận Chuyển
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-tropical-green to-forest-green ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Sẵn Sàng Cho Nụ Cười Rạng Rỡ?
          </h2>
          <p className="text-xl mb-8 text-mint-white">
            Tham gia cùng hơn 50.000 khách hàng đã chọn PineSmile cho sức khỏe răng miệng và hành tinh xanh
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://www.facebook.com/chinhakhoa.pinesmile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-tropical-orange text-white font-heading font-semibold text-lg rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
            >
              <span>Mua Ngay - Miễn Phí Vận Chuyển</span>
              <Icon name="ShoppingCartIcon" size={20} variant="solid" />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-tropical-green font-heading font-semibold text-lg rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
            >
              <span>Tìm Hiểu Thêm</span>
              <Icon name="ArrowRightIcon" size={20} variant="solid" />
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading font-semibold text-2xl mb-4">
              Nhận Ưu Đãi Đặc Biệt 20%
            </h3>
            <p className="text-mint-white mb-6">
              Đăng ký nhận bản tin để nhận mã giảm giá và tips chăm sóc răng miệng bền vững
            </p>
            <form id="pinesmile-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Nhập số điện thoại của bạn"
                required
                className="flex-1 px-6 py-4 rounded-full text-foreground focus:outline-none focus:ring-2 focus:ring-tropical-yellow"
              />
              <button
                id="submit-btn"
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-tropical-yellow text-foreground font-heading font-semibold rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang gửi...' : 'Gửi đăng ký'}
              </button>
            </form>
            <p className="text-sm text-mint-white mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam, chỉ những thông tin hữu ích.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <Icon name="TruckIcon" size={32} className="mx-auto mb-2 text-tropical-yellow" variant="solid" />
              <p className="text-sm text-mint-white">Miễn Phí Vận Chuyển</p>
            </div>
            <div className="text-center">
              <Icon name="ShieldCheckIcon" size={32} className="mx-auto mb-2 text-tropical-yellow" variant="solid" />
              <p className="text-sm text-mint-white">Đảm Bảo Chất Lượng</p>
            </div>
            <div className="text-center">
              <Icon name="ArrowPathIcon" size={32} className="mx-auto mb-2 text-tropical-yellow" variant="solid" />
              <p className="text-sm text-mint-white">Đổi Trả 30 Ngày</p>
            </div>
            <div className="text-center">
              <Icon name="ChatBubbleLeftRightIcon" size={32} className="mx-auto mb-2 text-tropical-yellow" variant="solid" />
              <p className="text-sm text-mint-white">Hỗ Trợ 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
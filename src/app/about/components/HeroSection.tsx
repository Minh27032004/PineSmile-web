import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-mint-white via-background to-card py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-tropical-green/10 rounded-full">
              <span className="text-tropical-green font-heading font-semibold text-sm">
                Câu Chuyện Của Chúng Tôi
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-primary leading-tight">
              Từ Lá Dứa Đến <span className="text-tropical-orange">Nụ Cười Rạng Rỡ</span>
            </h1>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              PineSmile ra đời từ một khám phá đột phá: chuyển hóa lá dứa - phế phẩm nông nghiệp - thành giải pháp chăm sóc răng miệng cao cấp, thân thiện với môi trường. Chúng tôi tin rằng sự bền vững không đồng nghĩa với việc phải hy sinh chất lượng.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <span className="text-success font-heading font-bold text-xl">5+</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Năm Nghiên Cứu</p>
                  <p className="text-sm text-text-secondary">Phát triển công nghệ</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-tropical-yellow/20 rounded-full flex items-center justify-center">
                  <span className="text-tropical-orange font-heading font-bold text-xl">15+</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Chứng Nhận</p>
                  <p className="text-sm text-text-secondary">Quốc tế & Việt Nam</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-organic-hover">
              <AppImage
                src="/assets/images/anhquangcao.png"
                alt="PineSmile - Sản phẩm chăm sóc nha khoa tự nhiên từ lá dứa"
                className="w-full h-[500px] object-cover" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-organic p-6 max-w-xs">
              <p className="font-heading font-semibold text-tropical-green mb-2">
                100% Tự Nhiên
              </p>
              <p className="text-sm text-text-secondary">
                Chiết xuất từ lá dứa hữu cơ, không hóa chất độc hại
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;
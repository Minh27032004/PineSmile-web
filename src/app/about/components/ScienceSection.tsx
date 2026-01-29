import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ResearchFeature {
  icon: string;
  title: string;
  description: string;
}

interface ScienceSectionProps {
  className?: string;
}

const ScienceSection = ({ className = '' }: ScienceSectionProps) => {
  const researchFeatures: ResearchFeature[] = [
  {
    icon: 'BeakerIcon',
    title: 'Công Nghệ Chiết Xuất',
    description: 'Quy trình chiết xuất độc quyền bảo toàn 100% hoạt chất tự nhiên từ lá dứa, loại bỏ tạp chất mà không sử dụng hóa chất độc hại.'
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Thử Nghiệm Lâm Sàng',
    description: 'Hơn 15 nghiên cứu lâm sàng được công bố trên các tạp chí nha khoa uy tín, chứng minh hiệu quả vượt trội trong việc bảo vệ răng miệng.'
  },
  {
    icon: 'SparklesIcon',
    title: 'Kháng Khuẩn Tự Nhiên',
    description: 'Bromelain và các enzyme tự nhiên trong lá dứa có khả năng tiêu diệt 99.9% vi khuẩn gây sâu răng và viêm nướu một cách an toàn.'
  },
  {
    icon: 'ChartBarIcon',
    title: 'Hiệu Quả Được Chứng Minh',
    description: 'Giảm 85% mảng bám, 78% viêm nướu và 92% hơi thở khó chịu chỉ sau 4 tuần sử dụng đều đặn theo kết quả nghiên cứu.'
  }];


  return (
    <section className={`py-20 bg-gradient-to-br from-card to-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-trust-blue/10 rounded-full mb-4">
                <span className="text-trust-blue font-heading font-semibold text-sm">
                  Khoa Học & Đổi Mới
                </span>
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-primary mb-4">
                Nghiên Cứu Đột Phá Về <span className="text-tropical-orange">Lá Dứa</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Đội ngũ khoa học của chúng tôi đã dành hơn 5 năm nghiên cứu để phát triển công nghệ chiết xuất độc quyền, biến lá dứa thành giải pháp chăm sóc răng miệng hiệu quả nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {researchFeatures.map((feature, index) =>
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-organic hover:shadow-organic-hover transition-all duration-300">

                  <div className="w-12 h-12 bg-tropical-green/10 rounded-full flex items-center justify-center mb-4">
                    <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-tropical-green" />

                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-organic">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_18f0d7dd0-1767069877011.png"
                  alt="Female scientist in white lab coat examining pineapple leaf extract under microscope in modern laboratory"
                  className="w-full h-64 object-cover" />

              </div>
              <div className="rounded-xl overflow-hidden shadow-organic">
                <AppImage
                  src="https://images.unsplash.com/photo-1584270022972-010a5cf048f9"
                  alt="Close-up of laboratory test tubes containing green pineapple leaf extract samples on white surface"
                  className="w-full h-48 object-cover" />

              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-xl overflow-hidden shadow-organic">
                <AppImage
                  src="https://images.unsplash.com/photo-1620419475171-bab235c97dd1"
                  alt="Fresh green pineapple plant with detailed view of fibrous leaves in tropical farm setting"
                  className="w-full h-48 object-cover" />

              </div>
              <div className="rounded-xl overflow-hidden shadow-organic">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_11584b5b7-1768418190293.png"
                  alt="Asian male researcher in protective gear analyzing dental care samples in sterile laboratory environment"
                  className="w-full h-64 object-cover" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ScienceSection;
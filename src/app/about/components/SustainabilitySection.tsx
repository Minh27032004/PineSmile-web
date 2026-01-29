import Icon from '@/components/ui/AppIcon';

interface ImpactMetric {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface SustainabilitySectionProps {
  className?: string;
}

const SustainabilitySection = ({ className = '' }: SustainabilitySectionProps) => {
  const impactMetrics: ImpactMetric[] = [
    {
      value: '80%',
      label: 'Giảm Rác Thải Nhựa',
      description: 'So với sản phẩm chăm sóc răng miệng truyền thống',
      icon: 'TrashIcon'
    },
    {
      value: '100%',
      label: 'Phân Hủy Sinh Học',
      description: 'Bao bì và sản phẩm hoàn toàn thân thiện môi trường',
      icon: 'ArrowPathIcon'
    },
    {
      value: '5000+',
      label: 'Tấn CO₂ Giảm',
      description: 'Lượng khí thải carbon tiết kiệm được mỗi năm',
      icon: 'CloudIcon'
    },
    {
      value: '0',
      label: 'Thử Nghiệm Động Vật',
      description: 'Cam kết không thử nghiệm trên động vật',
      icon: 'HeartIcon'
    }
  ];

  const sustainabilityPrinciples = [
    {
      title: 'Nguồn Gốc Bền Vững',
      description: 'Hợp tác với nông dân địa phương, thu mua lá dứa - phế phẩm nông nghiệp - tạo thu nhập bổ sung cho cộng đồng nông thôn.',
      icon: 'HomeModernIcon'
    },
    {
      title: 'Sản Xuất Xanh',
      description: 'Nhà máy sử dụng 100% năng lượng tái tạo, quy trình sản xuất khép kín không thải chất độc hại ra môi trường.',
      icon: 'BoltIcon'
    },
    {
      title: 'Bao Bì Tuần Hoàn',
      description: 'Bao bì làm từ vật liệu tái chế và có thể tái chế lại, thiết kế tối giản giảm thiểu lãng phí.',
      icon: 'CubeIcon'
    },
    {
      title: 'Trách Nhiệm Xã Hội',
      description: 'Đóng góp 5% doanh thu cho các chương trình giáo dục sức khỏe răng miệng tại vùng sâu vùng xa.',
      icon: 'UserGroupIcon'
    }
  ];

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-success/10 rounded-full mb-4">
            <span className="text-success font-heading font-semibold text-sm">
              Sứ Mệnh Bền Vững
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-primary mb-4">
            Cam Kết Với <span className="text-tropical-green">Hành Tinh Xanh</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Chúng tôi tin rằng chăm sóc răng miệng không chỉ là bảo vệ nụ cười của bạn, mà còn là bảo vệ tương lai của hành tinh. Mỗi sản phẩm PineSmile là một bước tiến hướng tới tương lai bền vững hơn.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-organic hover:shadow-organic-hover transition-all duration-300"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={metric.icon as any}
                  size={32}
                  className="text-success"
                />
              </div>
              <div className="font-heading font-bold text-4xl text-tropical-green mb-2">
                {metric.value}
              </div>
              <div className="font-heading font-semibold text-lg text-foreground mb-2">
                {metric.label}
              </div>
              <p className="text-sm text-text-secondary">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sustainability Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sustainabilityPrinciples.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-organic hover:shadow-organic-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-tropical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={principle.icon as any}
                    size={24}
                    className="text-tropical-green"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-tropical-green to-success rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4">
            Cùng Chúng Tôi Tạo Nên Sự Khác Biệt
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Mỗi lần bạn chọn PineSmile, bạn đang góp phần giảm thiểu rác thải nhựa và bảo vệ môi trường cho thế hệ tương lai.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-tropical-green font-heading font-semibold rounded-full hover:shadow-organic-hover transition-all duration-300">
              Tìm Hiểu Thêm
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-heading font-semibold rounded-full hover:bg-white hover:text-tropical-green transition-all duration-300">
              Tải Báo Cáo Bền Vững
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
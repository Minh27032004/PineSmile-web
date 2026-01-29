interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineSectionProps {
  className?: string;
}

const TimelineSection = ({ className = '' }: TimelineSectionProps) => {
  const timelineData: TimelineItem[] = [
    {
      year: '2019',
      title: 'Khám Phá Đột Phá',
      description: 'Nhóm nghiên cứu của chúng tôi phát hiện tiềm năng kháng khuẩn tự nhiên trong lá dứa, mở ra hướng đi mới cho ngành chăm sóc răng miệng bền vững.',
      icon: '🔬'
    },
    {
      year: '2020',
      title: 'Nghiên Cứu Lâm Sàng',
      description: 'Tiến hành thử nghiệm lâm sàng đầu tiên với 500 người tham gia, kết quả cho thấy hiệu quả vượt trội trong việc giảm mảng bám và viêm nướu.',
      icon: '🧪'
    },
    {
      year: '2021',
      title: 'Chứng Nhận Quốc Tế',
      description: 'Nhận chứng nhận hữu cơ từ USDA và EU, cùng với giải thưởng Đổi Mới Bền Vững từ Hiệp Hội Nha Khoa Thế Giới.',
      icon: '🏆'
    },
    {
      year: '2022',
      title: 'Ra Mắt Sản Phẩm',
      description: 'Chính thức giới thiệu dòng sản phẩm PineSmile đầu tiên tại thị trường Việt Nam, nhận được phản hồi tích cực từ cả người tiêu dùng và chuyên gia nha khoa.',
      icon: '🚀'
    },
    {
      year: '2023',
      title: 'Mở Rộng Quy Mô',
      description: 'Hợp tác với hơn 200 phòng khám nha khoa trên toàn quốc, xây dựng cộng đồng 50,000+ người dùng tin tưởng.',
      icon: '🌱'
    },
    {
      year: '2024',
      title: 'Tương Lai Xanh',
      description: 'Cam kết giảm 80% lượng rác thải nhựa trong ngành chăm sóc răng miệng, đồng thời mở rộng ra thị trường quốc tế.',
      icon: '🌍'
    }
  ];

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-primary mb-4">
            Hành Trình Đổi Mới
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Từ phòng thí nghiệm đến hàng triệu nụ cười, khám phá cột mốc quan trọng trong sứ mệnh tạo ra giải pháp chăm sóc răng miệng bền vững của chúng tôi.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-tropical-green via-tropical-yellow to-tropical-orange"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-5/12">
                  <div className="bg-card rounded-xl p-6 shadow-organic hover:shadow-organic-hover transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <span className="font-heading font-bold text-2xl text-tropical-orange">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-6 h-6 bg-tropical-green rounded-full border-4 border-background shadow-md z-10"></div>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
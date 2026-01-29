'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  alt: string;
  bio: string;
  credentials: string[];
}

interface TeamSectionProps {
  className?: string;
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nhật Minh',
    role: 'IT / Web Developer',
    specialty: 'Phát Triển Web & Công Nghệ Thông Tin',
    image: "/assets/images/anhnhatminh.jpg",
    alt: 'Nhật Minh - IT Developer của PineSmile',
    bio: 'Chàng IT tài năng của nhóm, phát triển và bảo trì toàn bộ hệ thống website và ứng dụng công nghệ của PineSmile. Luôn sẵn sàng giải quyết các thách thức kỹ thuật.',
    credentials: ['Web Developer', 'Full Stack Specialist', 'Công Nghệ Thông Tin']
  },
  {
    id: 2,
    name: 'Minh Thu',
    role: 'Designer / Nhà Thiết Kế',
    specialty: 'Thiết Kế Đồ Họa & Poster',
    image: "/assets/images/anhminhthu.jpg",
    alt: 'Minh Thu - Designer của PineSmile',
    bio: 'Cô nàng thiết kế tài ba của nhóm, chuyên tạo ra các ảnh poster và tài liệu quảng cáo đẹp mắt. Các thiết kế của em luôn Thu Hút sự chú ý và tạo ấn tượng mạnh.',
    credentials: ['Designer', 'Poster Specialist', 'Graphic Design']
  },
  {
    id: 3,
    name: 'Hoài Phương',
    role: 'Marketing & Fanpage Manager',
    specialty: 'Tiếp Thị & Quản Lý Cộng Đồng',
    image: "/assets/images/anhhoaiphuong.jpg",
    alt: 'Hoài Phương - Marketing Manager của PineSmile',
    bio: 'Anh chàng đa tài, xử lý mọi công việc marketing, trực fanpage và tương tác cộng đồng. Là người kết nối giữa PineSmile và khách hàng.',
    credentials: ['Marketing Specialist', 'Fanpage Manager', 'Community Manager']
  },
  {
    id: 4,
    name: 'Minh Nhi',
    role: 'Nghiên Cứu & Phát Triển',
    specialty: 'Nghiên Cứu Công Thức & Nâng Cấp',
    image: "/assets/images/anhminhnhi.jpg",
    alt: 'Minh Nhi - R&D Specialist của PineSmile',
    bio: 'Cô nguồn năng lượng của nhóm, luôn đam mê nghiên cứu và cải tiến công thức PineSmile. Là động lực thúc đẩy sự phát triển liên tục của sản phẩm.',
    credentials: ['R&D Specialist', 'Formula Developer', 'Innovation Enthusiast']
  },
  {
    id: 5,
    name: 'Như Ngọc',
    role: 'Thành Viên Đội Ngũ',
    specialty: 'Tinh Thần & Tiếp Lực Cho Nhóm',
    image: "/assets/images/anhnhungoc.jpg",
    alt: 'Như Ngọc - Team Spirit của PineSmile',
    bio: 'Cô nàng làm biếng nhưng là cây hài của nhóm, luôn mang lại tiếng cười và niềm vui. Tinh thần hạnh phúc của em là nguồn động lực cho cả nhóm tiếp tục phát triển.',
    credentials: ['Team Spirit', 'Morale Booster', 'Fun Member']
  },
  {
    id: 6,
    name: 'Quốc Lâm',
    role: 'Leader / Trưởng Nhóm',
    specialty: 'Lãnh Đạo & Quản Lý Dự Án',
    image: "/assets/images/anhquoclam.jpg",
    alt: 'Quốc Lâm - Leader của PineSmile',
    bio: 'Leader tâm lý, dẫn dắt nhóm hướng tới thành công. Không chỉ lên kế hoạch mà còn là người làm việc cùng mọi người, sửa sai đâu làm đó. Mẫu gương của sự tận tâm và trách nhiệm.',
    credentials: ['Team Leader', 'Project Manager', 'Dedicated Member']
  }];


  return (
    <section className={`py-20 bg-card ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-trust-blue/10 rounded-full mb-4">
            <span className="text-trust-blue font-heading font-semibold text-sm">
              Đội Ngũ Chuyên Gia
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-primary mb-4">
            Những Bộ Óc <span className="text-tropical-orange">Đằng Sau PineSmile</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Đội ngũ chuyên gia đa ngành của chúng tôi kết hợp kiến thức sâu rộng về nha khoa, hóa sinh, công nghệ sinh học và bền vững để tạo ra những sản phẩm chăm sóc răng miệng đột phá.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member) =>
          <div
            key={member.id}
            className="bg-white rounded-xl overflow-hidden shadow-organic hover:shadow-organic-hover transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMember(member)}>

              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={member.image}
                alt={member.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading font-bold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text-secondary mb-4">
                  {member.specialty}
                </p>
                <button className="flex items-center gap-2 text-tropical-orange font-heading font-semibold text-sm hover:gap-3 transition-all duration-300">
                  Xem Chi Tiết
                  <Icon name="ArrowRightIcon" size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedMember &&
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}>

            <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>

              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={selectedMember.image}
                alt={selectedMember.alt}
                className="w-full h-full object-cover" />

                <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                aria-label="Close modal">

                  <Icon name="XMarkIcon" size={24} className="text-foreground" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-heading font-bold text-2xl text-primary mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-tropical-orange font-heading font-semibold mb-1">
                  {selectedMember.role}
                </p>
                <p className="text-text-secondary mb-6">
                  {selectedMember.specialty}
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  {selectedMember.bio}
                </p>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Trình Độ & Kinh Nghiệm
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.credentials.map((credential, index) =>
                  <li key={index} className="flex items-start gap-2">
                        <Icon
                      name="CheckCircleIcon"
                      size={20}
                      className="text-success flex-shrink-0 mt-0.5" />

                        <span className="text-text-secondary">{credential}</span>
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>);

};

export default TeamSection;
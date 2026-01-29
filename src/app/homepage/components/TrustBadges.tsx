import Icon from '@/components/ui/AppIcon';

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface TrustBadgesProps {
  className?: string;
}

const TrustBadges = ({ className = '' }: TrustBadgesProps) => {
  const badges: Badge[] = [
    {
      id: 1,
      title: 'Chứng Nhận Nha Khoa Việt Nam',
      description: 'Được Hiệp Hội Nha Khoa Việt Nam công nhận và khuyên dùng',
      icon: 'ShieldCheckIcon',
      color: 'text-trust-blue'
    },
    {
      id: 2,
      title: 'Chứng Nhận Hữu Cơ',
      description: '100% nguyên liệu tự nhiên, không hóa chất độc hại',
      icon: 'SparklesIcon',
      color: 'text-tropical-green'
    },
    {
      id: 3,
      title: 'Giải Thưởng Bền Vững',
      description: 'Giải Nhất Sản Phẩm Xanh Việt Nam 2025',
      icon: 'TrophyIcon',
      color: 'text-tropical-yellow'
    },
    {
      id: 4,
      title: 'Đảm Bảo Hoàn Tiền',
      description: 'Hoàn tiền 100% nếu không hài lòng trong 30 ngày',
      icon: 'CurrencyDollarIcon',
      color: 'text-tropical-orange'
    }
  ];

  return (
    <section className={`py-12 bg-mint-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-organic hover:shadow-organic-hover transition-all duration-300"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-mint-white flex items-center justify-center ${badge.color}`}>
                <Icon name={badge.icon as any} size={24} variant="solid" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-foreground mb-1">
                  {badge.title}
                </h3>
                <p className="text-text-secondary text-sm">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

interface ImpactStatsProps {
  className?: string;
}

const ImpactStats = ({ className = '' }: ImpactStatsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const stats: Stat[] = [
    {
      id: 1,
      value: 50000,
      suffix: '+',
      label: 'Tấn Lá Dứa Tái Chế',
      icon: 'SparklesIcon',
      color: 'text-tropical-green'
    },
    {
      id: 2,
      value: 98,
      suffix: '%',
      label: 'Khách Hàng Hài Lòng',
      icon: 'FaceSmileIcon',
      color: 'text-tropical-yellow'
    },
    {
      id: 3,
      value: 15000,
      suffix: '+',
      label: 'Nha Sĩ Tin Dùng',
      icon: 'UserGroupIcon',
      color: 'text-trust-blue'
    },
    {
      id: 4,
      value: 85,
      suffix: '%',
      label: 'Giảm Khí Thải CO₂',
      icon: 'GlobeAltIcon',
      color: 'text-tropical-green'
    }
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isHydrated, isVisible]);

  useEffect(() => {
    if (!isVisible || !isHydrated) return;

    stats.forEach((stat) => {
      let startValue = 0;
      const duration = 2000;
      const increment = stat.value / (duration / 16);

      const counter = setInterval(() => {
        startValue += increment;
        if (startValue >= stat.value) {
          setCounts((prev) => ({ ...prev, [stat.id]: stat.value }));
          clearInterval(counter);
        } else {
          setCounts((prev) => ({ ...prev, [stat.id]: Math.floor(startValue) }));
        }
      }, 16);
    });
  }, [isVisible, isHydrated]);

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-gradient-to-br from-mint-white to-white ${className}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-8 bg-white rounded-2xl shadow-organic"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint-white mb-4 ${stat.color}`}>
                  <Icon name={stat.icon as any} size={32} variant="solid" />
                </div>
                <div className="font-heading font-bold text-4xl text-foreground mb-2">
                  {stat.value.toLocaleString('vi-VN')}{stat.suffix}
                </div>
                <p className="text-text-secondary font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`py-16 bg-gradient-to-br from-mint-white to-white ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Tác Động Môi Trường Của Chúng Tôi
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Những con số ấn tượng chứng minh cam kết của PineSmile với sức khỏe răng miệng và bảo vệ hành tinh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center p-8 bg-white rounded-2xl shadow-organic hover:shadow-organic-hover transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-mint-white mb-4 ${stat.color}`}>
                <Icon name={stat.icon as any} size={32} variant="solid" />
              </div>
              <div className="font-heading font-bold text-4xl text-foreground mb-2">
                {(counts[stat.id] || 0).toLocaleString('vi-VN')}{stat.suffix}
              </div>
              <p className="text-text-secondary font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
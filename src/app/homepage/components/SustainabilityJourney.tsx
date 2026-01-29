'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
}

interface SustainabilityJourneyProps {
  className?: string;
}

const SustainabilityJourney = ({ className = '' }: SustainabilityJourneyProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: 'Thu Hoạch Lá Dứa',
    description: 'Chúng tôi thu gom lá dứa từ các nông trại địa phương sau khi thu hoạch trái, biến phế phẩm nông nghiệp thành nguyên liệu quý giá.',
    image: "https://images.unsplash.com/photo-1533268722164-c7323ba5690c",
    alt: 'Vietnamese farmer harvesting fresh green pineapple leaves in tropical plantation under bright sunlight',
    icon: 'HomeModernIcon'
  },
  {
    id: 2,
    title: 'Chiết Xuất Sợi Tự Nhiên',
    description: 'Quy trình chiết xuất sợi lá dứa sử dụng công nghệ xanh, không hóa chất độc hại, bảo toàn dưỡng chất tự nhiên.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_169963ac3-1769591543142.png",
    alt: 'Modern laboratory equipment extracting natural fibers from pineapple leaves using eco-friendly green technology',
    icon: 'BeakerIcon'
  },
  {
    id: 3,
    title: 'Nghiên Cứu & Phát Triển',
    description: 'Đội ngũ nha sĩ và nhà khoa học của chúng tôi phát triển công thức độc quyền, đảm bảo hiệu quả lâm sàng cao nhất.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1d251f9-1766521666533.png",
    alt: 'Vietnamese dental scientists in white lab coats conducting research on pineapple leaf dental products in modern laboratory',
    icon: 'AcademicCapIcon'
  },
  {
    id: 4,
    title: 'Sản Xuất Bền Vững',
    description: 'Nhà máy của chúng tôi sử dụng năng lượng tái tạo 100%, đóng gói sinh học, cam kết zero waste trong sản xuất.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1081f087b-1769262433405.png",
    alt: 'Eco-friendly manufacturing facility with solar panels producing sustainable dental care products from pineapple leaves',
    icon: 'BuildingOffice2Icon'
  },
  {
    id: 5,
    title: 'Đến Tay Khách Hàng',
    description: 'Sản phẩm được giao đến tận tay bạn với bao bì phân hủy sinh học, hoàn thành hành trình từ lá dứa đến nụ cười rạng rỡ.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d959be3-1769591542209.png",
    alt: 'Happy Vietnamese woman receiving eco-friendly PineSmile dental care package in biodegradable packaging at home',
    icon: 'TruckIcon'
  }];


  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-gradient-to-br from-mint-white to-white ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Hành Trình Từ Lá Dứa Đến Nụ Cười
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Khám phá quy trình sản xuất bền vững của chúng tôi - Từ nông trại đến sản phẩm chăm sóc răng miệng cao cấp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-organic">
              <AppImage
                src={journeySteps[0].image}
                alt={journeySteps[0].alt}
                fill
                className="object-cover" />

            </div>

            <div className="space-y-6">
              {journeySteps.map((step, index) =>
              <div
                key={step.id}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-organic">

                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-tropical-green flex items-center justify-center">
                    <Icon name={step.icon as any} size={24} className="text-white" variant="solid" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`py-16 bg-gradient-to-br from-mint-white to-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Hành Trình Từ Lá Dứa Đến Nụ Cười
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Khám phá quy trình sản xuất bền vững của chúng tôi - Từ nông trại đến sản phẩm chăm sóc răng miệng cao cấp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-organic">
            <AppImage
              src={journeySteps[activeStep].image}
              alt={journeySteps[activeStep].alt}
              fill
              className="object-cover transition-all duration-500" />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="font-heading font-bold text-2xl text-white mb-2">
                {journeySteps[activeStep].title}
              </h3>
              <p className="text-white/90">{journeySteps[activeStep].description}</p>
            </div>
          </div>

          {/* Journey Steps */}
          <div className="space-y-6">
            {journeySteps.map((step, index) =>
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`w-full text-left flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
              activeStep === index ?
              'bg-tropical-green text-white shadow-organic-hover scale-105' :
              'bg-white text-foreground shadow-organic hover:shadow-organic-hover'}`
              }>

                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              activeStep === index ? 'bg-white/20' : 'bg-tropical-green'}`
              }>
                  <Icon
                  name={step.icon as any}
                  size={24}
                  className={activeStep === index ? 'text-white' : 'text-white'}
                  variant="solid" />

                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-xl">
                      {step.title}
                    </h3>
                    <span className={`text-sm font-medium ${
                  activeStep === index ? 'text-white/80' : 'text-text-secondary'}`
                  }>
                      Bước {index + 1}
                    </span>
                  </div>
                  <p className={`text-sm ${
                activeStep === index ? 'text-white/90' : 'text-text-secondary'}`
                }>
                    {step.description}
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {journeySteps.map((_, index) =>
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-full h-2 mx-1 rounded-full transition-all duration-300 ${
              index <= activeStep ? 'bg-tropical-green' : 'bg-gray-200'}`
              }
              aria-label={`Go to step ${index + 1}`} />

            )}
          </div>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Bắt Đầu</span>
            <span>Hoàn Thành</span>
          </div>
        </div>
      </div>
    </section>);

};

export default SustainabilityJourney;
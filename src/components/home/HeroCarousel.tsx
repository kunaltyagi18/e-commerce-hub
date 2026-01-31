import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PromoSlide {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  bgGradient: string;
  ctaText: string;
}

const promoSlides: PromoSlide[] = [
  {
    id: '1',
    productId: '1',
    title: 'Wireless Bluetooth Headphones',
    subtitle: 'Premium Sound Experience',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    originalPrice: 249.99,
    discountedPrice: 199.99,
    discountPercent: 20,
    bgGradient: 'from-violet-600 via-purple-600 to-indigo-700',
    ctaText: 'Shop Now',
  },
  {
    id: '2',
    productId: '2',
    title: 'Smart Watch Pro',
    subtitle: 'Your Health Companion',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    originalPrice: 399.99,
    discountedPrice: 349.99,
    discountPercent: 13,
    bgGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    ctaText: 'Get Yours',
  },
  {
    id: '3',
    productId: '6',
    title: 'UI/UX Design Course',
    subtitle: 'Master Design in 2024',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=600',
    originalPrice: 199.99,
    discountedPrice: 89.99,
    discountPercent: 55,
    bgGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    ctaText: 'Enroll Now',
  },
  {
    id: '4',
    productId: '9',
    title: 'Portable Bluetooth Speaker',
    subtitle: '360° Surround Sound',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
    originalPrice: 159.99,
    discountedPrice: 129.99,
    discountPercent: 19,
    bgGradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
    ctaText: 'Buy Now',
  },
  {
    id: '5',
    productId: '5',
    title: 'Premium Yoga Mat',
    subtitle: 'Elevate Your Practice',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    originalPrice: 69.99,
    discountedPrice: 49.99,
    discountPercent: 29,
    bgGradient: 'from-sky-600 via-blue-600 to-indigo-600',
    ctaText: 'Shop Now',
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const autoplayPlugin = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [autoplayPlugin]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {promoSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div
                className={cn(
                  'relative min-h-[400px] md:min-h-[500px] lg:min-h-[550px] bg-gradient-to-r',
                  slide.bgGradient
                )}
              >
                <div className="container mx-auto px-4 h-full">
                  <div className="grid lg:grid-cols-2 gap-8 items-center h-full py-12 md:py-16">
                    {/* Content */}
                    <div className="text-white space-y-6 z-10">
                      {/* Discount Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full animate-pulse">
                        <Percent className="h-4 w-4" />
                        <span className="font-bold text-sm">
                          {slide.discountPercent}% OFF
                        </span>
                      </div>
                      
                      {/* Title */}
                      <div>
                        <p className="text-white/80 text-sm md:text-base font-medium mb-2">
                          {slide.subtitle}
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                          {slide.title}
                        </h2>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-4">
                        <span className="text-4xl md:text-5xl font-bold">
                          ${slide.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-xl md:text-2xl text-white/60 line-through">
                          ${slide.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* CTA Button */}
                      <Button
                        size="lg"
                        className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <Link to={`/products/${slide.productId}`}>
                          {slide.ctaText}
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Product Image */}
                    <div className="relative flex justify-center lg:justify-end">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75" />
                        
                        {/* Image */}
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Floating Discount Badge */}
                        <div className="absolute -top-4 -right-4 z-20 bg-red-500 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-full shadow-lg animate-bounce">
                          -{slide.discountPercent}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-1/4 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
      </button>
      
      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'transition-all duration-300 rounded-full',
              selectedIndex === index
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

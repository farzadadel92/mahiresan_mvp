// src/components/layout/Footer.tsx
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about-us" },
    { name: "ایجاد غرفه", href: "/vendors/register" },
    { name: "بلاگ", href: "/essays" },
    { name: "قوانین و مقررات", href: "/rules" },
  ];

  const categories = [
    { name: "ماهی", href: "/products?category=fish" },
    { name: "میگو", href: "/products?category=shrimp" },
    { name: "خاویار", href: "/products?category=caviar" },
    { name: "محصولات مکمل", href: "/products?category=supplements" },
  ];

  const socialLinks = [
    { name: "اینستاگرام", icon: Mail, href: "#" },
    { name: "تلگرام", icon: Mail, href: "#" },
    { name: "فیسبوک", icon: Mail, href: "#" },
    { name: "یوتیوب", icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16 sm:mt-20 md:mt-24">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
          
          {/* About Section - Full width on mobile, 2 cols on tablet, 4 cols on desktop */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-blue-400">سفره‌شما</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              تازه‌ترین ماهی‌های جنوب و شمال، با کیفیت بازار سنتی، بدون واسطه،
              بسته‌بندی شده و آماده ارسال به سراسر ایران
            </p>
            
            {/* Social Links - Visible on mobile/tablet */}
            <div className="flex gap-3 mt-6 sm:hidden">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-blue-400">دسترسی سریع</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors duration-200 hover:pr-2 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-blue-400">دسته‌بندی محصولات</h4>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href} 
                    className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors duration-200 hover:pr-2 block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section - Desktop only social links here */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-blue-400">ارتباط با ما</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                <span>تلفن پشتیبانی: ۰۷۶-۱۲۳۴۵۶۷</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                <span>ایمیل: support@mahiresan.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                <span>نشانی: بندرعباس، بازار ماهی فروشان، پلاک ۱۲</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                <span>ساعت کاری: شنبه تا پنجشنبه ۹ الی ۱۷</span>
              </li>
            </ul>

            {/* Social Links - Desktop only */}
            <div className="hidden sm:flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors hover:scale-110 duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletters Section - Optional */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-right">
              برای دریافت اخبار و تخفیف‌های ویژه عضو شوید
            </p>
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-full xs:w-64"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                عضویت
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {currentYear} سفره‌شما. تمامی حقوق محفوظ می‌باشد.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            طراحی و توسعه توسط تیم ماهی‌رسان
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
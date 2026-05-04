import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">سفره‌شما</h3>
            <p className="text-gray-400 text-sm">
              تازه‌ترین ماهی‌های جنوب و شمال، با کیفیت بازار سنتی، بدون واسطه،
              بسته‌بندی شده و آماده ارسال به سراسر ایران
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white">صفحه اصلی ماهی</Link></li>
              <li><Link href="/about-us" className="hover:text-white">درباره ما</Link></li>
              <li><Link href="/vendors/register" className="hover:text-white">ایجاد غرفه</Link></li>
              <li><Link href="/essays" className="hover:text-white">بلاگ</Link></li>
              <li><Link href="/rules" className="hover:text-white">قوانین و مقررات</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">دسته‌بندی محصولات</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=fish" className="hover:text-white">ماهی</Link></li>
              <li><Link href="/products?category=shrimp" className="hover:text-white">میگو</Link></li>
              <li><Link href="/products?category=caviar" className="hover:text-white">خاویار</Link></li>
              <li><Link href="/products?category=supplements" className="hover:text-white">محصولات مکمل</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">ارتباط با ما</h4>
            <ul className="space-y-2 text-gray-400">
              <li>تلفن پشتیبانی: ۰۷۶۱۲۳۴۵۶۷</li>
              <li>نشانی: بندرعباس - بازار ماهی فروشان</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© ۲۰۲۴ سفره‌شما. تمامی حقوق محفوظ می‌باشد.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
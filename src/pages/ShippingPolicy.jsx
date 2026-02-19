import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ShippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-page">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="policy-content"
        >
          {/* Header */}
          <div className="policy-header">
            <h1>سياسة الشحن والتوصيل</h1>
            <p className="header-subtitle">
              نحرص على توصيل طلباتك بأمان وفي أسرع وقت ممكن
            </p>
          </div>

          {/* Intro */}
          <div className="policy-intro">
            <p>
              في <strong>TRIVE</strong>، نسعى دائماً لتقديم تجربة تسوق مميزة
              تبدأ من لحظة اختيارك للمنتج وحتى وصوله إلى باب منزلك. نعمل مع أفضل
              شركات الشحن في مصر لضمان توصيل سريع وآمن لجميع المحافظات.
            </p>
          </div>

          {/* Sections */}
          <div className="policy-sections">
            {/* Section 1 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="section-content">
                <h2>مدة تجهيز الطلب</h2>
                <p>
                  يتم تجهيز طلبك خلال <strong>1-2 يوم عمل</strong> من تاريخ
                  تأكيد الطلب والدفع. سنقوم بفحص المنتجات وتغليفها بعناية فائقة
                  لضمان وصولها إليك بحالة ممتازة.
                </p>
                <div className="info-note">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>
                    سيتم إرسال إشعار لك عبر البريد الإلكتروني أو الرسائل القصيرة
                    عند شحن الطلب
                  </span>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="section-content">
                <h2>مدة التوصيل</h2>
                <div className="delivery-times">
                  <div className="delivery-item">
                    <div className="delivery-location">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <strong>القاهرة والجيزة</strong>
                    </div>
                    <span className="delivery-duration">2-3 أيام عمل</span>
                  </div>
                  <div className="delivery-item">
                    <div className="delivery-location">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <strong>باقي المحافظات</strong>
                    </div>
                    <span className="delivery-duration">3-5 أيام عمل</span>
                  </div>
                </div>
                <p className="note-text">
                  * المدة تبدأ من تاريخ شحن الطلب وليس تاريخ الطلب
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>رسوم الشحن</h2>
                <div className="shipping-costs">
                  <div className="cost-item">
                    <span className="cost-label">القاهرة والجيزة</span>
                    <span className="cost-value">50 جنيه</span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">باقي المحافظات</span>
                    <span className="cost-value">70 جنيه</span>
                  </div>
                </div>
                <div className="free-shipping-banner">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <strong>شحن مجاني</strong>
                    <p>للطلبات التي تزيد عن 1000 جنيه لجميع المحافظات</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>مناطق التوصيل</h2>
                <p>
                  نوفر خدمة التوصيل إلى <strong>جميع محافظات مصر</strong> دون
                  استثناء. نعمل على توسيع نطاق تغطيتنا باستمرار لنصل إلى كل
                  عملائنا أينما كانوا.
                </p>
                <div className="coverage-list">
                  <div className="coverage-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>القاهرة الكبرى</span>
                  </div>
                  <div className="coverage-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>الإسكندرية والساحل الشمالي</span>
                  </div>
                  <div className="coverage-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>محافظات الدلتا</span>
                  </div>
                  <div className="coverage-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>محافظات الصعيد</span>
                  </div>
                  <div className="coverage-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>البحر الأحمر وسيناء</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="section-content">
                <h2>سياسة التأخير</h2>
                <p>
                  نبذل قصارى جهدنا لضمان التسليم في المواعيد المحددة، لكن قد
                  تحدث تأخيرات بسبب:
                </p>
                <ul className="delay-reasons">
                  <li>ازدحام الطلبات خلال المواسم والعروض الخاصة</li>
                  <li>الظروف الجوية السيئة أو الأعياد والإجازات الرسمية</li>
                  <li>مشاكل لوجستية خارجة عن إرادتنا مع شركات الشحن</li>
                  <li>إدخال بيانات غير دقيقة للعنوان أو رقم الهاتف</li>
                </ul>
                <p>
                  في حالة حدوث أي تأخير، سنقوم بإبلاغك فوراً وتحديث حالة الطلب.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="policy-section">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div className="section-content">
                <h2>العنوان غير الصحيح أو تعذر الاستلام</h2>
                <p>
                  يرجى التأكد من صحة عنوانك ورقم هاتفك عند إتمام الطلب. في حالة:
                </p>
                <div className="warning-boxes">
                  <div className="warning-box">
                    <strong>عنوان خاطئ أو غير مكتمل</strong>
                    <p>
                      قد يتم إعادة الشحن برسوم إضافية أو إلغاء الطلب وإرجاع
                      المنتج للمتجر
                    </p>
                  </div>
                  <div className="warning-box">
                    <strong>عدم الرد على مندوب التوصيل</strong>
                    <p>
                      سيتم التواصل معك 3 مرات خلال يومين. في حالة عدم الرد، سيتم
                      إعادة الطلب للمتجر
                    </p>
                  </div>
                  <div className="warning-box">
                    <strong>رفض استلام الطلب</strong>
                    <p>
                      في حالة رفض الاستلام بدون سبب مقبول، قد يتم فرض رسوم إعادة
                      الشحن
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="policy-section highlight">
              <div className="section-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>التواصل معنا</h2>
                <p>
                  فريق خدمة العملاء متاح دائماً لمساعدتك في أي استفسار يخص طلبك
                  أو الشحن:
                </p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <strong>البريد الإلكتروني</strong>
                      <a href="mailto:support@trive.com">support@trive.com</a>
                    </div>
                  </div>
                  <div className="contact-method">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <strong>الهاتف / واتساب</strong>
                      <a href="tel:+201004012242">+20 10 04012242</a>
                    </div>
                  </div>
                  <div className="contact-method">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div>
                      <strong>ساعات العمل</strong>
                      <span>السبت - الخميس: 9 صباحاً - 6 مساءً</span>
                    </div>
                  </div>
                </div>
                <Link to="/contact" className="btn-primary">
                  تواصل معنا الآن
                </Link>
              </div>
            </section>
          </div>

          {/* Footer Note */}
          <div className="policy-footer">
            <p>
              نشكرك على ثقتك في <strong>TRIVE</strong>. نحن ملتزمون بتقديم أفضل
              تجربة تسوق ممكنة.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

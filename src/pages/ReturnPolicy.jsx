import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./ReturnPolicy.css";

const ReturnPolicy = () => {
  return (
    <div className="return-policy-page">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="policy-content"
        >
          {/* Header */}
          <div className="policy-header">
            <h1>سياسة الاسترجاع والاستبدال</h1>
            <p className="header-subtitle">
              رضاك هو أولويتنا، لذلك نوفر لك سياسة مرنة وواضحة للاسترجاع
              والاستبدال
            </p>
          </div>

          {/* Intro */}
          <div className="policy-intro">
            <p>
              في <strong>TRIVE</strong>، نؤمن بأهمية راحتك وثقتك عند التسوق
              معنا. إذا لم تكن راضياً بشكل كامل عن مشترياتك، يمكنك إرجاعها أو
              استبدالها وفقاً للشروط الموضحة أدناه. نحرص على أن تكون العملية
              بسيطة وسريعة.
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
                <h2>مدة الاسترجاع والاستبدال</h2>
                <p>
                  يمكنك طلب إرجاع أو استبدال المنتج خلال{" "}
                  <strong>14 يوماً</strong> من تاريخ استلامك للطلب. نرجو التأكد
                  من أن المنتج يستوفي جميع شروط الإرجاع المذكورة أدناه.
                </p>
                <div className="info-box success">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <strong>مهم:</strong> يبدأ حساب المدة من تاريخ استلامك
                    للمنتج وليس من تاريخ الطلب
                  </div>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="section-content">
                <h2>شروط الاسترجاع</h2>
                <p>
                  لضمان قبول طلب الإرجاع أو الاستبدال، يجب أن يستوفي المنتج
                  الشروط التالية:
                </p>
                <div className="conditions-list">
                  <div className="condition-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <strong>بحالته الأصلية</strong>
                      <p>
                        المنتج لم يتعرض لأي تلف أو تغيير، ويحتفظ بجميع ملصقاته
                        وبطاقاته
                      </p>
                    </div>
                  </div>
                  <div className="condition-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <strong>غير مستخدم</strong>
                      <p>
                        المنتج لم يتم ارتداؤه أو استخدامه، ولا توجد عليه أي آثار
                        استعمال
                      </p>
                    </div>
                  </div>
                  <div className="condition-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <strong>العبوة الأصلية</strong>
                      <p>
                        المنتج في علبته أو كيسه الأصلي مع جميع الملحقات إن وجدت
                      </p>
                    </div>
                  </div>
                  <div className="condition-item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <strong>إثبات الشراء</strong>
                      <p>توفير رقم الطلب أو فاتورة الشراء عند التواصل معنا</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="policy-section">
              <div className="section-icon warning-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="section-content">
                <h2>المنتجات غير القابلة للاسترجاع</h2>
                <p>
                  لأسباب تتعلق بالصحة والسلامة، لا يمكن إرجاع أو استبدال الفئات
                  التالية:
                </p>
                <div className="non-returnable-list">
                  <div className="non-returnable-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>الملابس الداخلية والجوارب</span>
                  </div>
                  <div className="non-returnable-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>ملابس السباحة</span>
                  </div>
                  <div className="non-returnable-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>المنتجات المخفّضة أو العروض الخاصة (Sale Items)</span>
                  </div>
                  <div className="non-returnable-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>الإكسسوارات التي تم فتح عبوتها أو استخدامها</span>
                  </div>
                  <div className="non-returnable-item">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>
                      القطع المصنوعة خصيصاً بناءً على طلبك (Customized)
                    </span>
                  </div>
                </div>
                <div className="info-box warning">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div>
                    <strong>ملحوظة:</strong> لن يتم قبول إرجاع المنتجات التي
                    تظهر عليها آثار استعمال أو غسيل أو عطور
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
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>رسوم الشحن</h2>
                <p>
                  تختلف رسوم الشحن حسب سبب الإرجاع، ونحرص دائماً على تطبيق
                  السياسة بعدل وشفافية:
                </p>
                <div className="shipping-fees-grid">
                  <div className="fee-card success-card">
                    <div className="fee-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3>عيب صناعي أو خطأ منا</h3>
                    <p className="fee-amount free">مجاني 100%</p>
                    <p className="fee-description">
                      نتحمل بالكامل تكاليف شحن الإرجاع والاستبدال في حالة وجود
                      عيب في المنتج أو إرسال منتج خاطئ
                    </p>
                  </div>
                  <div className="fee-card warning-card">
                    <div className="fee-icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3>تغيير رأي أو عدم ملاءمة</h3>
                    <p className="fee-amount paid">يتحمله العميل</p>
                    <p className="fee-description">
                      في حالة طلب الإرجاع بسبب تغيير رأيك أو عدم مناسبة المنتج
                      لك، يتحمل العميل تكاليف شحن الإرجاع
                    </p>
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
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>آلية استرداد المبلغ</h2>
                <p>
                  بعد استلام المنتج والتحقق من حالته، سيتم استرداد المبلغ بنفس
                  طريقة الدفع التي استخدمتها:
                </p>
                <div className="refund-timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot">1</div>
                    <div className="timeline-content">
                      <h4>استلام المنتج</h4>
                      <p>
                        يتم فحص المنتج والتحقق من استيفائه لشروط الإرجاع خلال
                        1-2 يوم عمل
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot">2</div>
                    <div className="timeline-content">
                      <h4>معالجة الاسترداد</h4>
                      <p>يتم إصدار أمر الاسترداد خلال 1-3 أيام عمل</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot">3</div>
                    <div className="timeline-content">
                      <h4>وصول المبلغ</h4>
                      <p>يصلك المبلغ خلال 5-7 أيام عمل حسب طريقة الدفع</p>
                    </div>
                  </div>
                </div>
                <div className="payment-methods">
                  <h4>طرق استرداد المبلغ:</h4>
                  <div className="methods-list">
                    <div className="method-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="1"
                          y="4"
                          width="22"
                          height="16"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      <span>
                        <strong>البطاقات البنكية:</strong> 5-7 أيام عمل
                      </span>
                    </div>
                    <div className="method-item">
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
                      <span>
                        <strong>فودافون كاش / محافظ إلكترونية:</strong> 3-5 أيام
                        عمل
                      </span>
                    </div>
                    <div className="method-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <span>
                        <strong>الدفع عند الاستلام:</strong> يتم الاسترداد نقداً
                        عند استلام المرتجع أو تحويل بنكي حسب الاتفاق
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="section-content">
                <h2>طريقة تقديم طلب الاسترجاع</h2>
                <p>للتقدم بطلب إرجاع أو استبدال، يرجى اتباع الخطوات التالية:</p>
                <div className="steps-list">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>تواصل معنا</h4>
                      <p>
                        اتصل بنا عبر <strong>واتساب</strong> على{" "}
                        <a href="tel:+201234567890">+20 123 456 7890</a> أو عبر
                        البريد الإلكتروني:{" "}
                        <a href="mailto:returns@trive.com">returns@trive.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>قدم المعلومات</h4>
                      <p>
                        أرسل لنا <strong>رقم الطلب</strong> وسبب الإرجاع
                        والمنتجات التي ترغب في إرجاعها
                      </p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>أرسل صور المنتج</h4>
                      <p>
                        في حالة وجود عيب أو مشكلة، يرجى إرسال صور واضحة للمنتج
                        توضح المشكلة
                      </p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>موافقة الطلب</h4>
                      <p>
                        سنراجع طلبك ونعلمك بالقرار خلال 24 ساعة ونرتب مع شركة
                        الشحن لاستلام المنتج
                      </p>
                    </div>
                  </div>
                </div>
                <div className="contact-cta">
                  <Link to="/contact" className="btn-primary">
                    تواصل معنا الآن
                  </Link>
                  <a
                    href="https://wa.me/201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Note */}
          <div className="policy-footer">
            <p>
              <strong>TRIVE</strong> تلتزم بتوفير تجربة تسوق استثنائية. إذا كان
              لديك أي استفسار عن سياسة الإرجاع، فريقنا مستعد لمساعدتك في أي وقت.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnPolicy;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Scale, HeartPulse, Activity, ShieldCheck, Moon, Brain, 
  Compass, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Info, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function HealthTools() {
  const { toolId } = useParams<{ toolId?: string }>();
  const { t, formatNumber, lang } = useLanguage();

  const tools = [
    { id: 'bmi', title: t('assessment.bmi'), desc: 'محاسبه شاخص توده بدنی بر اساس قد و وزن با تحلیل توده استاندارد', icon: Scale, color: 'text-shams-teal' },
    { id: 'calorie', title: t('assessment.calorie'), desc: 'محاسبه میزان سوخت‌وساز پایه (BMR) و کل کالری مصرفی روزانه (TDEE)', icon: HeartPulse, color: 'text-shams-burgundy' },
    { id: 'diabetes', title: t('assessment.diabetes'), desc: 'ارزیابی غربالگری استاندارد ریسک ۱۰ ساله ابتلا به دیابت نوع ۲ (FINDRISC)', icon: Activity, color: 'text-shams-gold' },
    { id: 'metabolic', title: t('assessment.metabolic'), desc: 'بررسی ۵ فاکتور کلیدی سندروم متابولیک و ریسک سلامت قلبی', icon: ShieldCheck, color: 'text-shams-mauve' },
    { id: 'sleep', title: t('assessment.sleep'), desc: 'سنجش شاخص کیفیت خواب و تفکیک اختلالات تاخیر در خواب', icon: Moon, color: 'text-shams-sage' },
    { id: 'mental-health', title: t('assessment.mental'), desc: 'ارزیابی غربالگری اضطراب، استرس و نشاط روان (DASS-21)', icon: Brain, color: 'text-shams-mauve' },
    { id: 'mobility', title: t('assessment.mobility'), desc: 'تست‌های خودارزیابی دامنه حرکتی، تعادل ایستا و تحرک عملکردی', icon: Compass, color: 'text-shams-teal' },
  ];

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Diagnostic Calculators Visual */}
      <PageHero
        heroId="tools"
        layoutVariant="asymmetric"
        themeAccent="teal"
      />

      <section className="container mx-auto px-4 max-w-5xl -mt-6 relative z-20">
        {!toolId ? (
          /* Tools Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={`/assessment/tools/${tool.id}`}
                  className="bg-white rounded-3xl p-6 border border-shams-navy/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-shams-sand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-shams-navy mb-2 group-hover:text-shams-teal transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-shams-navy/60 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-shams-sand flex items-center justify-between text-xs font-bold text-shams-teal">
                    <span>{lang === 'en' ? 'Open Calculator' : 'ورود به محاسبه‌گر'}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Active Interactive Calculator */
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-shams-navy/10 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-shams-sand">
              <Link to="/assessment/tools" className="text-xs font-bold text-shams-navy/70 hover:text-shams-teal flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back to all tools' : 'بازگشت به همه ابزارها'}</span>
              </Link>
              <div className="text-xs font-mono font-bold text-shams-navy/40">SHAMS CLINICAL ENGINE</div>
            </div>

            {toolId === 'bmi' && <BmiCalculator />}
            {toolId === 'calorie' && <CalorieCalculator />}
            {toolId === 'diabetes' && <DiabetesRiskCalculator />}
            {toolId === 'metabolic' && <MetabolicCalculator />}
            {toolId === 'sleep' && <SleepAssessmentTool />}
            {toolId === 'mental-health' && <MentalHealthTool />}
            {toolId === 'mobility' && <MobilityTool />}
          </div>
        )}
      </section>
    </div>
  );
}

// 1. BMI Calculator Component
function BmiCalculator() {
  const { formatNumber, lang } = useLanguage();
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const heightInMeters = height / 100;
  const bmi = heightInMeters > 0 ? +(weight / (heightInMeters * heightInMeters)).toFixed(1) : 0;

  let category = 'وزن نرمال';
  let categoryColor = 'text-shams-teal bg-shams-teal/10';
  let advice = 'وزن شما در محدوده سلامت بیولوژیک قرار دارد. حفظ رژیم غذایی متعادل و ۱۵۰ دقیقه فعالیت ورزشی در هفته توصیه می‌شود.';

  if (bmi < 18.5) {
    category = 'کمبود وزن';
    categoryColor = 'text-shams-gold bg-shams-gold/10';
    advice = 'توصیه به دریافت کالری مغذی، افزایش مصرف پروتئین باکیفیت و تمرینات قدرتی جهت افزایش توده بدون چربی عضلانی.';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'اضافه‌وزن';
    categoryColor = 'text-shams-gold bg-shams-gold/15';
    advice = 'پیشنهاد می‌شود مصرف قندهای ساده را محدود کرده و پیاده‌روی روزانه حداقل ۸۰۰۰ گام را در برنامه قرار دهید.';
  } else if (bmi >= 30) {
    category = 'چاقی بالینی';
    categoryColor = 'text-shams-burgundy bg-shams-burgundy/10';
    advice = 'مداخله جامع اصلاح سبک زندگی، ارزیابی مقاومت به انسولین و پایش فشار خون در اکوسیستم شمس توصیه می‌شود.';
  }

  const minNormalWeight = Math.round(18.5 * heightInMeters * heightInMeters);
  const maxNormalWeight = Math.round(24.9 * heightInMeters * heightInMeters);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-2">محاسبه‌گر شاخص توده بدنی (BMI)</h2>
        <p className="text-xs text-shams-navy/60">شاخص معتبر بین‌المللی ارزیابی وزن متناسب با قد جهت غربالگری خطرات متابولیک.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-shams-navy mb-2">جنسیت</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-3 rounded-2xl font-bold text-xs transition-all border ${
                  gender === 'male' ? 'bg-shams-navy text-white border-shams-navy' : 'bg-shams-sand/60 text-shams-navy border-transparent'
                }`}
              >
                مرد
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-3 rounded-2xl font-bold text-xs transition-all border ${
                  gender === 'female' ? 'bg-shams-navy text-white border-shams-navy' : 'bg-shams-sand/60 text-shams-navy border-transparent'
                }`}
              >
                زن
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-shams-navy mb-2">
              <span>قد:</span>
              <span className="text-shams-teal font-semibold">
                <span className="font-numeric font-bold text-sm">{formatNumber(height)}</span> سانتی‌متر
              </span>
            </div>
            <input
              type="range"
              min={130}
              max={220}
              value={height}
              onChange={(e) => setHeight(+e.target.value)}
              className="w-full accent-shams-teal cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-shams-navy mb-2">
              <span>وزن:</span>
              <span className="text-shams-teal font-semibold">
                <span className="font-numeric font-bold text-sm">{formatNumber(weight)}</span> کیلوگرم
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={160}
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
              className="w-full accent-shams-teal cursor-pointer"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="bg-shams-sand/50 rounded-3xl p-6 border border-shams-navy/5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-shams-navy/50 mb-1">نتیجه شاخص توده بدنی شما:</div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="metric-large text-5xl font-bold text-shams-navy">{formatNumber(bmi)}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>{category}</span>
            </div>
            <p className="text-xs text-shams-navy/80 leading-relaxed mb-4">{advice}</p>
          </div>

          <div className="pt-4 border-t border-shams-navy/10 text-xs space-y-2">
            <div className="flex justify-between text-shams-navy/70">
              <span>محدوده وزن ایده‌آل شما:</span>
              <span className="font-semibold text-shams-navy">
                <span className="font-numeric font-bold">{formatNumber(minNormalWeight)}</span> تا <span className="font-numeric font-bold">{formatNumber(maxNormalWeight)}</span> کیلوگرم
              </span>
            </div>
            <Link
              to="/plan"
              className="mt-4 w-full py-3 rounded-2xl bg-shams-navy text-white text-center font-semibold text-xs hover:bg-shams-teal transition-colors flex items-center justify-center gap-2"
            >
              <span>دریافت برنامه اختصاصی تنظیم وزن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Calorie Calculator
function CalorieCalculator() {
  const { formatNumber } = useLanguage();
  const [age, setAge] = useState<number>(32);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Light activity

  // Mifflin-St Jeor formula for males
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  const tdee = Math.round(bmr * activityLevel);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">محاسبه‌گر کالری و متابولیسم (BMR / TDEE)</h2>
        <p className="text-xs text-shams-navy/60">محاسبه علمی سوخت‌وساز پایه با فرمول میفلین سنت ژور و نیاز انرژی روزانه.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-shams-navy mb-1">سن (سال)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(+e.target.value)}
                className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-bold text-shams-navy"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-shams-navy mb-1">قد (سانتی‌متر)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(+e.target.value)}
                className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-bold text-shams-navy"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-shams-navy mb-1">وزن (کیلوگرم)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(+e.target.value)}
                className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-bold text-shams-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-shams-navy mb-2">سطح فعالیت روزانه</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(+e.target.value)}
              className="w-full p-3 rounded-2xl border border-shams-navy/15 text-xs font-bold text-shams-navy bg-white"
            >
              <option value={1.2}>بی‌تحرک (کار اداری نشسته بدون ورزش)</option>
              <option value={1.375}>فعالیت سبک (ورزش ۱ تا ۳ روز در هفته)</option>
              <option value={1.55}>فعالیت متوسط (ورزش ۳ تا ۵ روز در هفته)</option>
              <option value={1.725}>بسیار فعال (تمرینات شدید ۶ روز در هفته)</option>
            </select>
          </div>
        </div>

        <div className="bg-shams-sand/50 rounded-3xl p-6 border border-shams-navy/5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-shams-navy/5">
              <div className="text-[11px] font-semibold text-shams-navy/60">متابولیسم پایه در حالت استراحت مطلق (BMR):</div>
              <div className="text-3xl font-bold text-shams-navy mt-1">
                <span className="metric-large font-bold">{formatNumber(bmr)}</span> <span className="text-xs font-normal text-shams-navy/60">کیلوکالری در روز</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-shams-teal/20">
              <div className="text-[11px] font-semibold text-shams-teal">کل کالری مصرفی روزانه جهت حفظ وزن (TDEE):</div>
              <div className="text-3xl font-bold text-shams-teal mt-1">
                <span className="metric-large font-bold">{formatNumber(tdee)}</span> <span className="text-xs font-normal text-shams-navy/60">کیلوکالری در روز</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-xs text-shams-navy/70">
            جهت کاهش وزن ملایم و سالم، دریافت روزانه حدود <span className="font-numeric font-bold text-shams-navy">{formatNumber(tdee - 400)}</span> کیلوکالری توصیه می‌شود.
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Diabetes Risk Calculator
function DiabetesRiskCalculator() {
  const { formatNumber } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, number>>({
    age: 1,
    bmi: 1,
    waist: 2,
    activity: 0,
    vegetables: 0,
    medication: 0,
    glucose: 0,
    family: 2,
  });

  const totalScore: number = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);

  let riskText = 'خطر پایین (کمتر از ۱٪ در ۱۰ سال آینده)';
  let riskColor = 'text-shams-teal bg-shams-teal/10';

  if (totalScore >= 7 && totalScore <= 11) {
    riskText = 'خطر اندک (حدود ۴٪ در ۱۰ سال آینده)';
    riskColor = 'text-shams-gold bg-shams-gold/10';
  } else if (totalScore >= 12 && totalScore <= 14) {
    riskText = 'خطر متوسط (حدود ۱۷٪)';
    riskColor = 'text-shams-gold bg-shams-gold/20';
  } else if (totalScore >= 15 && totalScore <= 20) {
    riskText = 'خطر بالا (حدود ۳۳٪ - ۱ از هر ۳ نفر)';
    riskColor = 'text-shams-burgundy bg-shams-burgundy/10';
  } else if (totalScore > 20) {
    riskText = 'خطر بسیار بالا (۵۰٪)';
    riskColor = 'text-shams-burgundy bg-shams-burgundy/20';
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">پرسشنامه استاندارد ارزیابی ریسک دیابت نوع ۲ (FINDRISC)</h2>
        <p className="text-xs text-shams-navy/60">معتبرترین ابزار بالینی غربالگری غیرتهاجمی در اروپا و خاورمیانه.</p>
      </div>

      <div className="space-y-4">
        <QuestionRow
          title="۱. سن شما چقدر است؟"
          options={[
            { label: 'کمتر از ۴۵ سال', value: 0 },
            { label: '۴۵ تا ۵۴ سال', value: 2 },
            { label: '۵۵ تا ۶۴ سال', value: 3 },
            { label: 'بیش از ۶۴ سال', value: 4 },
          ]}
          current={answers.age}
          onChange={(val) => setAnswers({ ...answers, age: val })}
        />

        <QuestionRow
          title="۲. آیا روزانه حداقل ۳۰ دقیقه فعالیت بدنی دارید؟"
          options={[
            { label: 'بله، حداقل ۵ روز در هفته', value: 0 },
            { label: 'خیر، کمتر از این مقدار', value: 2 },
          ]}
          current={answers.activity}
          onChange={(val) => setAnswers({ ...answers, activity: val })}
        />

        <QuestionRow
          title="۳. چند نوبت در روز سبزیجات یا میوه مصرف می‌کنید؟"
          options={[
            { label: 'هر روز در تمام وعده‌ها', value: 0 },
            { label: 'نه هر روز / به ندرت', value: 1 },
          ]}
          current={answers.vegetables}
          onChange={(val) => setAnswers({ ...answers, vegetables: val })}
        />

        <QuestionRow
          title="۴. آیا در بین بستگان درجه یک شما سابقه دیابت وجود دارد؟"
          options={[
            { label: 'خیر', value: 0 },
            { label: 'پدربزرگ/مادربزرگ یا خاله/دایی/عمو/عمه', value: 3 },
            { label: 'پدر، مادر، خواهر، برادر یا فرزند', value: 5 },
          ]}
          current={answers.family}
          onChange={(val) => setAnswers({ ...answers, family: val })}
        />
      </div>

      <div className="bg-shams-sand/60 p-6 rounded-3xl border border-shams-navy/5 flex items-center justify-between mt-6">
        <div>
          <div className="text-xs font-semibold text-shams-navy/60">مجموع امتیاز FINDRISC:</div>
          <div className="text-3xl font-bold text-shams-navy flex items-baseline gap-1.5">
            <span className="metric-large font-bold">{formatNumber(totalScore)}</span> 
            <span className="text-xs font-normal text-shams-navy/70">از <span className="font-numeric font-semibold">26</span></span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-2xl text-xs font-semibold ${riskColor}`}>
          {riskText}
        </div>
      </div>
    </div>
  );
}

// 4. Metabolic Syndrome 5-Factor Checklist
function MetabolicCalculator() {
  const { formatNumber } = useLanguage();
  const [factors, setFactors] = useState({
    waist: false, // > 102cm male / 88cm female
    triglycerides: false, // >= 150 mg/dL
    hdl: false, // < 40 male / 50 female
    bp: false, // >= 130/85
    glucose: false, // >= 100 mg/dL
  });

  const count = Object.values(factors).filter(Boolean).length;
  const isMetabolicSyndrome = count >= 3;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">ارزیابی سندروم متابولیک بر اساس معیارهای هارمونیزه AHA/NHLBI</h2>
        <p className="text-xs text-shams-navy/60">وجود حداقل ۳ معیار از ۵ معیار زیر بیانگر سندروم متابولیک است.</p>
      </div>

      <div className="space-y-3">
        {[
          { key: 'waist', title: 'دور کمر بالا', desc: 'بیش از ۱۰۲ سانتی‌متر در آقایان یا بیش از ۸۸ سانتی‌متر در خانم‌ها' },
          { key: 'triglycerides', title: 'تری‌گلیسرید خون بالا', desc: 'مساوی یا بیش از ۱۵۰ میلی‌گرم در دسی‌لیتر (یا مصرف داروی کاهنده تری‌گلیسرید)' },
          { key: 'hdl', title: 'کلسترول مفید (HDL) پایین', desc: 'کمتر از ۴۰ میلی‌گرم در دسی‌لیتر در آقایان یا کمتر از ۵۰ در خانم‌ها' },
          { key: 'bp', title: 'فشار خون مرزی یا بالا', desc: 'فشار سیستولیک بالای ۱۳۰ یا دیاستولیک بالای ۸۵ (یا مصرف داروی فشار خون)' },
          { key: 'glucose', title: 'قند خون ناشتا بالا', desc: 'مساوی یا بیش از ۱۰۰ میلی‌گرم در دسی‌لیتر (یا سابقه پیش‌دیابت)' },
        ].map((item) => (
          <label
            key={item.key}
            className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
              factors[item.key as keyof typeof factors]
                ? 'bg-shams-teal/10 border-shams-teal text-shams-navy'
                : 'bg-white border-shams-sand hover:bg-shams-sand/40 text-shams-navy/80'
            }`}
          >
            <input
              type="checkbox"
              checked={factors[item.key as keyof typeof factors]}
              onChange={(e) =>
                setFactors({ ...factors, [item.key]: e.target.checked })
              }
              className="mt-1 w-4 h-4 rounded text-shams-teal accent-shams-teal"
            />
            <div>
              <div className="text-xs font-semibold text-shams-navy">{item.title}</div>
              <div className="text-[11px] text-shams-navy/60">{item.desc}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-shams-sand/60 p-6 rounded-3xl border border-shams-navy/5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-shams-navy/60">معیارهای مثبت:</div>
          <div className="text-2xl font-bold text-shams-navy flex items-baseline gap-1.5">
            <span className="metric-large font-bold">{formatNumber(count)}</span> 
            <span className="text-xs font-normal text-shams-navy/70">از <span className="font-numeric font-semibold">5</span> معیار</span>
          </div>
        </div>
        <div>
          {isMetabolicSyndrome ? (
            <span className="px-4 py-2 rounded-2xl text-xs font-semibold bg-shams-burgundy/10 text-shams-burgundy flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              مستعد سندروم متابولیک - نیاز به مداخله سبک زندگی
            </span>
          ) : (
            <span className="px-4 py-2 rounded-2xl text-xs font-semibold bg-shams-teal/10 text-shams-teal flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              در محدوده امن متابولیک
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. Sleep Tool
function SleepAssessmentTool() {
  const { formatNumber } = useLanguage();
  const [latency, setLatency] = useState(20);
  const [hours, setHours] = useState(7);
  const [awakenings, setAwakenings] = useState(1);

  const sleepScore = Math.max(20, Math.min(100, Math.round(100 - (latency > 30 ? 20 : 0) - (hours < 7 ? 25 : 0) - (awakenings > 2 ? 20 : 0))));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">ارزیابی کیفیت و کارایی خواب (Sleep Quality Index)</h2>
        <p className="text-xs text-shams-navy/60">تحلیل تاخیر در خواب، تداوم و ساعات مفید استراحت شبانه.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-shams-sand/40 p-4 rounded-2xl border border-shams-navy/5">
          <label className="text-xs font-semibold text-shams-navy block mb-2">زمان تا به خواب رفتن (دقیقه)</label>
          <input
            type="number"
            value={latency}
            onChange={(e) => setLatency(+e.target.value)}
            className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-semibold font-numeric text-shams-navy"
          />
        </div>
        <div className="bg-shams-sand/40 p-4 rounded-2xl border border-shams-navy/5">
          <label className="text-xs font-semibold text-shams-navy block mb-2">ساعات خواب مفید در شب</label>
          <input
            type="number"
            value={hours}
            step="0.5"
            onChange={(e) => setHours(+e.target.value)}
            className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-semibold font-numeric text-shams-navy"
          />
        </div>
        <div className="bg-shams-sand/40 p-4 rounded-2xl border border-shams-navy/5">
          <label className="text-xs font-semibold text-shams-navy block mb-2">تعداد دفعات بیدار شدن در شب</label>
          <input
            type="number"
            value={awakenings}
            onChange={(e) => setAwakenings(+e.target.value)}
            className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-sm font-semibold font-numeric text-shams-navy"
          />
        </div>
      </div>

      <div className="bg-shams-sand/60 p-6 rounded-3xl border border-shams-navy/5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-shams-navy/60">شاخص سلامت خواب:</div>
          <div className="text-3xl font-bold text-shams-navy flex items-baseline gap-1.5">
            <span className="metric-large font-bold">{formatNumber(sleepScore)}</span> 
            <span className="text-xs font-normal text-shams-navy/70">از <span className="font-numeric font-semibold">100</span></span>
          </div>
        </div>
        <Link
          to="/shop?filter=packs"
          className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-shams-sage text-white hover:bg-shams-navy transition-colors"
        >
          مشاهده پک خواب شمس
        </Link>
      </div>
    </div>
  );
}

// 6. Mental Health Tool (DASS Screener)
function MentalHealthTool() {
  const { formatNumber } = useLanguage();
  const [stress, setStress] = useState(2);
  const [anxiety, setAnxiety] = useState(1);
  const [mood, setMood] = useState(3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">خودارزیابی سریع تعادل روان و بار استرس (DASS-21)</h2>
        <p className="text-xs text-shams-navy/60">پایش شاخص‌های هیجانی، آرامش ذهن و تاب‌آوری روانی.</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-shams-navy mb-1">
            <span>احساس فشار زمانی و تنش در هفته اخیر:</span>
            <span className="text-shams-mauve">{formatNumber(stress)} از ۴</span>
          </div>
          <input type="range" min={0} max={4} value={stress} onChange={(e) => setStress(+e.target.value)} className="w-full accent-shams-mauve" />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-shams-navy mb-1">
            <span>احساس دلشوره یا نگرانی بدون علت واضح:</span>
            <span className="text-shams-mauve">{formatNumber(anxiety)} از ۴</span>
          </div>
          <input type="range" min={0} max={4} value={anxiety} onChange={(e) => setAnxiety(+e.target.value)} className="w-full accent-shams-mauve" />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-shams-navy mb-1">
            <span>انگیزه و لذت بردن از کارهای روزمره:</span>
            <span className="text-shams-mauve">{formatNumber(mood)} از ۴</span>
          </div>
          <input type="range" min={0} max={4} value={mood} onChange={(e) => setMood(+e.target.value)} className="w-full accent-shams-mauve" />
        </div>
      </div>

      <div className="bg-shams-sand/60 p-6 rounded-3xl border border-shams-navy/5 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-shams-navy/60">وضعیت تعادل هیجانی:</div>
          <div className="text-lg font-bold text-shams-navy">سطح استرس ملایم - بهزیستی روانی مطلوب</div>
        </div>
        <Link to="/knowledge/lifestyle#mental-health" className="text-xs font-bold text-shams-mauve hover:underline">
          مطالعه راهکارهای تنفس عمیق
        </Link>
      </div>
    </div>
  );
}

// 7. Mobility Tool
function MobilityTool() {
  const [answers, setAnswers] = useState({ squat: true, shoulder: true, balance: true });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-shams-navy mb-1">تست‌های غربالگری تحرک عملکردی (Functional Mobility)</h2>
        <p className="text-xs text-shams-navy/60">سه آزمون خانگی ساده برای ارزیابی انعطاف زنجیره حرکتی و ثبات مفاصل.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: 'squat', title: 'اسکوات عمیق بدون بلند شدن پاشنه', desc: 'آیا می‌توانید تا زاویه ۹۰ درجه زانو بنشینید بدون اینکه پاشنه‌ها از زمین جدا شوند؟' },
          { key: 'shoulder', title: 'تست تحرک کمربند شانه‌ای', desc: 'آیا دستان شما پشت کمر در فاصله کمتر از یک وجب به هم نزدیک می‌شوند؟' },
          { key: 'balance', title: 'تست تعادل تک‌پا (چشم بسته)', desc: 'آیا می‌توانید ۲۰ ثانیه با چشم بسته روی یک پا بایستید؟' },
        ].map((item) => (
          <div key={item.key} className="p-4 rounded-2xl border border-shams-sand bg-white space-y-3">
            <h4 className="text-xs font-bold text-shams-navy">{item.title}</h4>
            <p className="text-[11px] text-shams-navy/60 leading-relaxed">{item.desc}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setAnswers({ ...answers, [item.key]: true })}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  answers[item.key as keyof typeof answers] ? 'bg-shams-teal text-white border-shams-teal' : 'border-shams-sand'
                }`}
              >
                انجام شد
              </button>
              <button
                onClick={() => setAnswers({ ...answers, [item.key]: false })}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  !answers[item.key as keyof typeof answers] ? 'bg-shams-burgundy text-white border-shams-burgundy' : 'border-shams-sand'
                }`}
              >
                محدودیت دارد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionRow({
  title,
  options,
  current,
  onChange,
}: {
  title: string;
  options: { label: string; value: number }[];
  current: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="p-4 rounded-2xl border border-shams-sand bg-white space-y-2">
      <div className="text-xs font-bold text-shams-navy">{title}</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all truncate cursor-pointer ${
              current === opt.value
                ? 'bg-shams-navy text-white border-shams-navy'
                : 'bg-shams-sand/40 text-shams-navy/80 border-transparent hover:bg-shams-sand'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

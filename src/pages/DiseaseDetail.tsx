import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, ArrowLeft, ArrowRight, ShieldCheck, Activity, 
  Dumbbell, Apple, HelpCircle, FileText, Video, Download, 
  ExternalLink, CheckCircle2, AlertCircle, Share2, Printer, 
  Bookmark, ChevronDown, BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleDiseases, diseaseCategories } from '../data/diseases';
import { PageHero } from '../components/PageHero';
import { diseaseCategoryHeroes } from '../data/heroImages';
import { NotFound } from './NotFound';

export function DiseaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang, t, formatNumber } = useLanguage();

  const disease = sampleDiseases.find(d => d.id === id);

  if (!disease) {
    return <NotFound />;
  }
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSaved, setIsSaved] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const categoryHero = diseaseCategoryHeroes[disease.category];

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Top Breadcrumb & Actions */}
      <div className="bg-white border-b border-shams-navy/10 py-3.5 px-4 sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-shams-navy/60">
            <Link to="/" className="hover:text-shams-teal">{t('nav.home')}</Link>
            <span>/</span>
            <Link to="/knowledge" className="hover:text-shams-teal">{t('nav.knowledge')}</Link>
            <span>/</span>
            <Link to="/knowledge/diseases" className="hover:text-shams-teal">{t('knowledge.diseases')}</Link>
            <span>/</span>
            <span className="text-shams-navy">{disease.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSaved ? 'bg-shams-teal text-white border-shams-teal' : 'bg-white border-shams-navy/15 text-shams-navy hover:bg-shams-sand'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSaved ? 'ذخیره شده' : 'نشان کردن'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-shams-navy/15 bg-white text-shams-navy hover:bg-shams-sand text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">چاپ راهنما</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner with Organ-Specific Visual & Clinical Metadata */}
      <PageHero
        customTitle={disease.name}
        customSubtitle={disease.shortDesc}
        customTag={disease.categoryEn}
        customImage={categoryHero?.imageUrl}
        customImageAlt={disease.nameEn}
        visualConceptLabel={categoryHero?.visualConcept || 'Clinical Pathology'}
        layoutVariant="split"
        themeAccent="teal"
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-xs font-mono text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/15" dir="ltr">
            ICD-10 VALIDATED: {disease.nameEn}
          </span>
          <span className="text-xs font-bold text-shams-gold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Peer-Reviewed Clinical Protocol</span>
          </span>
        </div>
      </PageHero>

      {/* Main Medical Sections Outline */}
      <section className="container mx-auto px-4 max-w-5xl -mt-6 relative z-10 space-y-8">
        
        {/* Navigation Quick Links */}
        <div className="bg-white rounded-2xl p-3 border border-shams-navy/10 shadow-md flex items-center gap-2 overflow-x-auto text-xs font-bold text-shams-navy/80">
          <a href="#definition" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۱. تعریف</a>
          <a href="#causes" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۲. علل و ریسک‌ها</a>
          <a href="#symptoms" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۳. علائم بالینی</a>
          <a href="#prevention" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۴. پیشگیری</a>
          <a href="#diagnosis-treatment" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۵. تشخیص و درمان</a>
          <a href="#lifestyle-prescription" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۶. نسخه ورزش و تغذیه</a>
          <a href="#faqs" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۷. پرسش‌های متداول</a>
          <a href="#multimedia" className="px-3 py-1.5 rounded-xl hover:bg-shams-sand whitespace-nowrap">۸. ویدیو و فایل‌ها</a>
        </div>

        {/* 1. Definition */}
        <div id="definition" className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-shams-teal/10 text-shams-teal flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-shams-navy">۱. تعریف و پاتوفیزیولوژی بیماری</h2>
              <span className="text-[11px] text-shams-navy/50">Definition & Clinical Overview</span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-shams-navy/80 leading-relaxed font-normal">
            {disease.definition}
          </p>
        </div>

        {/* 2 & 3. Causes and Risk Factors */}
        <div id="causes" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-shams-burgundy" />
              <h3 className="text-base font-bold text-shams-navy">۲. علل و فاکتورهای زمینه‌ساز (Causes)</h3>
            </div>
            <ul className="space-y-2.5">
              {disease.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-shams-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-shams-burgundy mt-1.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-shams-gold" />
              <h3 className="text-base font-bold text-shams-navy">۳. عوامل خطر (Risk Factors)</h3>
            </div>
            <ul className="space-y-2.5">
              {disease.riskFactors.map((rf, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-shams-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-shams-gold mt-1.5 shrink-0" />
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 & 5. Symptoms and Prevention */}
        <div id="symptoms" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Stethoscope className="w-5 h-5 text-shams-teal" />
              <h3 className="text-base font-bold text-shams-navy">۴. علائم و نشانه‌های هشداردهنده (Symptoms)</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {disease.symptoms.map((s, i) => (
                <div key={i} className="p-3 rounded-2xl bg-shams-sand/50 border border-shams-navy/5 text-xs font-bold text-shams-navy flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-shams-teal shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="prevention" className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-shams-sage" />
              <h3 className="text-base font-bold text-shams-navy">۵. راهکارهای پیشگیری اولیه و ثانویه (Prevention)</h3>
            </div>
            <ul className="space-y-2.5">
              {disease.prevention.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-shams-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-shams-sage mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 6 & 7. Diagnosis & Treatment */}
        <div id="diagnosis-treatment" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-shams-navy" />
              <h3 className="text-base font-bold text-shams-navy">۶. روش‌های تشخیص پزشکی (Diagnosis)</h3>
            </div>
            <ul className="space-y-2.5">
              {disease.diagnosis.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-shams-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-shams-navy mt-1.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-5 h-5 text-shams-mauve" />
              <h3 className="text-base font-bold text-shams-navy">۷. پروتکل‌های درمانی استاندارد (Treatment)</h3>
            </div>
            <ul className="space-y-2.5">
              {disease.treatment.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-shams-navy/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-shams-mauve mt-1.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 8 & 9. Exercise & Nutrition Lifestyle Prescription */}
        <div id="lifestyle-prescription" className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-lg space-y-6">
          <div className="border-b border-shams-sand pb-4">
            <h2 className="text-xl font-bold text-shams-navy">نسخه علمی سبک زندگی در شمس (Lifestyle Medicine)</h2>
            <p className="text-xs text-shams-navy/60">توصیه‌های تلفیقی طب ورزشی و تغذیه بالینی متناسب با این بیماری</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-shams-sand/40 rounded-2xl p-6 border border-shams-navy/5 space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-sm text-shams-navy">
                <Dumbbell className="w-5 h-5 text-shams-teal" />
                <span>۸. پروتکل‌های تمرینی و فعالیت ورزشی (Exercise)</span>
              </div>
              <ul className="space-y-2.5">
                {disease.exerciseRecommendations.map((er, i) => (
                  <li key={i} className="text-xs text-shams-navy/80 flex items-start gap-2">
                    <span className="text-shams-teal font-bold">•</span>
                    <span>{er}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-shams-sand/40 rounded-2xl p-6 border border-shams-navy/5 space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-sm text-shams-navy">
                <Apple className="w-5 h-5 text-shams-gold" />
                <span>۹. دستورالعمل‌های تغذیه بالینی (Nutrition)</span>
              </div>
              <ul className="space-y-2.5">
                {disease.nutritionRecommendations.map((nr, i) => (
                  <li key={i} className="text-xs text-shams-navy/80 flex items-start gap-2">
                    <span className="text-shams-gold font-bold">•</span>
                    <span>{nr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 10. Frequently Asked Questions */}
        <div id="faqs" className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-shams-teal" />
            <h2 className="text-xl font-bold text-shams-navy">۱۰. پرسش‌های متداول بیماران (FAQ)</h2>
          </div>

          <div className="space-y-3">
            {disease.faqs.map((faq, idx) => (
              <div key={idx} className="border border-shams-sand rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-right p-4 font-bold text-xs text-shams-navy flex items-center justify-between hover:bg-shams-sand/40 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-shams-teal' : 'text-shams-navy/40'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-shams-navy/70 leading-relaxed bg-shams-sand/20 border-t border-shams-sand/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 11, 12, 13, 14. Related Articles, Videos, Educational Files & References */}
        <div id="multimedia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Related Articles */}
          <div className="bg-white rounded-3xl p-6 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <FileText className="w-4 h-4 text-shams-teal" />
              <span>۱۱. مقالات مرتبط</span>
            </div>
            <div className="space-y-2">
              {disease.relatedArticles.map((art, i) => (
                <div key={i} className="p-3 rounded-xl bg-shams-sand/40 hover:bg-shams-sand transition-all text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span className="truncate">{art.title}</span>
                  <span className="text-[10px] text-shams-navy/40 whitespace-nowrap">{art.readTime}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Videos */}
          <div className="bg-white rounded-3xl p-6 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <Video className="w-4 h-4 text-shams-burgundy" />
              <span>۱۲. ویدیوهای آموزشی</span>
            </div>
            <div className="space-y-2">
              {disease.relatedVideos.map((vid, i) => (
                <div key={i} className="p-3 rounded-xl bg-shams-sand/40 hover:bg-shams-sand transition-all text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span className="truncate">{vid.title}</span>
                  <span className="text-[10px] text-shams-burgundy font-mono whitespace-nowrap">{vid.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Files */}
          <div className="bg-white rounded-3xl p-6 border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <Download className="w-4 h-4 text-shams-sage" />
              <span>۱۳. فایل‌های آموزشی</span>
            </div>
            <div className="space-y-2">
              {disease.educationalFiles.map((f, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`در حال دریافت فایل: ${f.title}`); }}
                  className="p-3 rounded-xl bg-shams-sand/40 hover:bg-shams-sage/10 transition-all text-xs font-bold text-shams-navy flex items-center justify-between"
                >
                  <span className="truncate">{f.title}</span>
                  <span className="text-[10px] text-shams-sage font-mono uppercase">{f.size}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 14. Scientific References */}
        <div className="bg-white rounded-3xl p-6 border border-shams-navy/10 shadow-sm space-y-3">
          <div className="text-xs font-bold text-shams-navy/60 uppercase tracking-wider">
            ۱۴. مراجع و منابع علمی بین‌المللی (References)
          </div>
          <div className="space-y-2">
            {disease.scientificReferences.map((ref, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-shams-navy/70 font-mono" dir="ltr">
                <ExternalLink className="w-3.5 h-3.5 text-shams-teal shrink-0 mt-0.5" />
                <span>[{idx + 1}] {ref.authors} ({ref.year}). <em>{ref.title}</em>. {ref.journal}.</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Personalized Plan */}
        <div className="bg-shams-navy rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold mb-2">نیاز به برنامه اختصاصی مدیریت {disease.name} دارید؟</h3>
            <p className="text-xs text-white/70">در سامانه پایش شمس برنامه ۴ مرحله‌ای شامل ورزش تخصصی، تغذیه و مکمل‌ها را دریافت کنید.</p>
          </div>
          <Link
            to="/plan"
            className="px-8 py-3.5 rounded-2xl bg-shams-teal hover:bg-white hover:text-shams-navy text-white text-xs font-bold transition-all shadow-lg whitespace-nowrap"
          >
            مشاهده برنامه مداخله شمس
          </Link>
        </div>

      </section>
    </div>
  );
}

function HeartPulse(props: any) {
  return <Activity {...props} />;
}

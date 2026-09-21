import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Users, Sparkles, Heart, Activity, ShieldCheck, 
  Baby, ArrowLeft, ArrowRight, Clock, Award,
  Utensils, Moon, Brain, ShieldAlert, Download, FileText, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ageGroupTopics, AgeGroupTopic } from '../data/knowledgeData';
import { PageHero } from '../components/PageHero';

export function AgeGroups() {
  const { lang, t, formatNumber, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const stageParam = searchParams.get('stage') || searchParams.get('topic');

  const [selectedGroup, setSelectedGroup] = useState<AgeGroupTopic>(() => {
    if (stageParam) {
      const found = ageGroupTopics.find(g => g.id === stageParam);
      if (found) return found;
    }
    return ageGroupTopics[0];
  });

  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (stageParam) {
      const found = ageGroupTopics.find(g => g.id === stageParam);
      if (found && found.id !== selectedGroup.id) {
        setSelectedGroup(found);
      }
    }
  }, [stageParam]);

  const handleSelectGroup = (grp: AgeGroupTopic) => {
    setSelectedGroup(grp);
    setSearchParams({ stage: grp.id });
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleDownload = (title: string) => {
    setDownloadFeedback(title);
    setTimeout(() => setDownloadFeedback(null), 3000);
  };

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Lifespan Development Visual */}
      <PageHero
        heroId="age-groups"
        layoutVariant="asymmetric"
        themeAccent="teal"
      />

      {/* Main Content */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 7 Age Groups Navigation */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-3xl p-4 border border-shams-navy/10 shadow-sm space-y-1.5 sticky top-24">
              <div className="text-xs font-bold text-shams-navy/60 px-3 py-2 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'en' ? '7 Lifespan Stages' : lang === 'ar' ? 'دورات الحياة السبع' : 'دوره‌های هفت‌گانه رشد و سلامت'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-shams-gold/20 text-shams-navy font-bold">
                  {formatNumber(7)}
                </span>
              </div>
              {ageGroupTopics.map((grp, idx) => (
                <button
                  key={grp.id}
                  onClick={() => handleSelectGroup(grp)}
                  className={`w-full text-start p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedGroup.id === grp.id
                      ? 'bg-shams-navy text-white shadow-md'
                      : 'text-shams-navy/80 hover:bg-shams-sand/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono ${
                      selectedGroup.id === grp.id ? 'bg-shams-gold text-shams-navy' : 'bg-shams-navy/5 text-shams-navy/60'
                    }`}>
                      {formatNumber(idx + 1)}
                    </span>
                    <span className="truncate">{lang === 'en' ? grp.titleEn : lang === 'ar' ? grp.titleAr : grp.title}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                    selectedGroup.id === grp.id ? 'bg-white/20 text-white' : 'bg-shams-sand text-shams-navy/70'
                  }`}>
                    {grp.ageSpan}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Age Group View */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-shams-navy/10 shadow-lg space-y-8">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-shams-gold/20 text-shams-navy border border-shams-gold/40">
                    مرحله {formatNumber(ageGroupTopics.findIndex(g => g.id === selectedGroup.id) + 1)} از {formatNumber(7)}: {selectedGroup.ageSpan}
                  </span>
                  <span className="text-xs font-mono text-shams-navy/40" dir="ltr">{selectedGroup.id}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-shams-navy mt-2 mb-1">
                  {lang === 'en' ? selectedGroup.titleEn : lang === 'ar' ? selectedGroup.titleAr : selectedGroup.title}
                </h2>
                <div className="text-xs text-shams-navy/50 font-mono" dir="ltr">{selectedGroup.titleEn}</div>
                <p className="text-sm text-shams-navy/80 leading-relaxed mt-4">
                  {selectedGroup.description}
                </p>
              </div>

              {/* Developmental Milestones */}
              {selectedGroup.milestones && selectedGroup.milestones.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-shams-navy flex items-center gap-2">
                    <Award className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Key Developmental Milestones:' : lang === 'ar' ? 'المعالم التطورية والنمائية الأساسية:' : 'نشانه‌ها و مراحل کلیدی تکامل و رشد:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGroup.milestones.map((ms, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-shams-sand/50 border border-shams-navy/5 text-xs font-bold text-shams-navy flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-shams-gold mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition Guidelines */}
              {selectedGroup.nutritionGuidelines && selectedGroup.nutritionGuidelines.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-shams-sand">
                  <h3 className="text-sm font-bold text-shams-navy flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Age-Specific Nutrition Protocols:' : lang === 'ar' ? 'التوجيهات الغذائية الخاصة بالعمر:' : 'رهنمودهای تغذیه‌ای و نیازهای زیستی این دوره:'}
                  </h3>
                  <div className="space-y-2">
                    {selectedGroup.nutritionGuidelines.map((item, i) => (
                      <div key={i} className="p-3 rounded-xl border border-shams-sand bg-white text-xs text-shams-navy/90 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Physical Activity & Movement */}
              {selectedGroup.physicalActivity && selectedGroup.physicalActivity.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-shams-sand">
                  <h3 className="text-sm font-bold text-shams-navy flex items-center gap-2">
                    <Activity className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Physical Activity & Movement Guidelines:' : lang === 'ar' ? 'إرشادات النشاط البدني والحركة:' : 'فعالیت بدنی، تمرینات و بازی‌های حرکتی متناسب:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGroup.physicalActivity.map((act, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-xs text-shams-navy leading-relaxed">
                        • {act}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sleep Needs & Mental Health */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-shams-sand">
                <div className="p-5 rounded-2xl bg-shams-navy/5 border border-shams-navy/10 space-y-2">
                  <div className="text-xs font-bold text-shams-navy flex items-center gap-2">
                    <Moon className="w-4 h-4 text-shams-gold" />
                    <span>{lang === 'en' ? 'Sleep Needs' : lang === 'ar' ? 'احتياجات النوم' : 'نیاز به خواب و استراحت'}</span>
                  </div>
                  <p className="text-xs text-shams-navy/80 leading-relaxed">
                    {selectedGroup.sleepNeeds}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-shams-navy/5 border border-shams-navy/10 space-y-2">
                  <div className="text-xs font-bold text-shams-navy flex items-center gap-2">
                    <Brain className="w-4 h-4 text-shams-gold" />
                    <span>{lang === 'en' ? 'Mental Health Considerations' : lang === 'ar' ? 'الصحة النفسية' : 'ملاحظات سلامت روان'}</span>
                  </div>
                  <ul className="text-xs text-shams-navy/80 space-y-1.5 leading-relaxed">
                    {selectedGroup.mentalHealth.map((mh, i) => (
                      <li key={i}>• {mh}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Screenings & Checkups */}
              <div className="space-y-3 pt-4 border-t border-shams-sand">
                <h3 className="text-sm font-bold text-shams-navy flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-shams-gold" />
                  {lang === 'en' ? 'Clinical Screenings & Preventive Check-ups:' : lang === 'ar' ? 'الفحوصات الدورية والوقائية:' : 'غربالگری‌ها و چک‌آپ‌های بالینی الزامی:'}
                </h3>
                <div className="space-y-2">
                  {selectedGroup.screenings.map((scr, i) => (
                    <div key={i} className="p-3 rounded-xl border border-shams-sand bg-white text-xs text-shams-navy/90 flex items-center justify-between">
                      <span className="leading-relaxed">• {scr}</span>
                      <span className="text-[10px] text-shams-navy font-bold px-2.5 py-1 rounded-lg bg-shams-gold/20 shrink-0 ms-2">
                        {lang === 'en' ? 'Clinical Guideline' : 'پروتکل بالینی شمس'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Health Risks & Prevention */}
              {selectedGroup.healthRisks && selectedGroup.healthRisks.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-shams-sand">
                  <h3 className="text-sm font-bold text-shams-navy flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    {lang === 'en' ? 'Major Health Risks & Preventive Focus:' : lang === 'ar' ? 'المخاطر الصحية الشائعة واستراتيجيات الوقاية:' : 'ریسک‌های شایع سلامت و راهکارهای پیشگیری:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGroup.healthRisks.map((risk, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100 text-xs text-shams-navy leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lifestyle Blueprint Advice */}
              <div className="bg-shams-sand/40 p-6 rounded-2xl border border-shams-navy/5 space-y-2">
                <div className="text-xs font-bold text-shams-navy">{lang === 'en' ? 'Lifestyle Guidance & Age Philosophy:' : 'راهنمای سبک زندگی و عادات متناسب با سن:'}</div>
                <p className="text-xs text-shams-navy/80 leading-relaxed font-normal">
                  {selectedGroup.lifestyleAdvice}
                </p>
              </div>

              {/* Educational Files & Resources */}
              {selectedGroup.educationalFiles && selectedGroup.educationalFiles.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-shams-sand">
                  <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                    <Download className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Educational Resources & PDF Guides:' : 'کتابچه‌ها و راهنماهای کاربردی این دوره:'}
                  </h3>
                  <div className="space-y-2.5">
                    {selectedGroup.educationalFiles.map((file, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl border border-shams-navy/10 bg-white flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 font-bold font-mono text-[10px] flex items-center justify-center border border-red-200">
                            {file.type}
                          </div>
                          <div>
                            <div className="font-bold text-shams-navy">{file.title}</div>
                            <div className="text-[11px] text-shams-navy/50">{file.size} • راهنمای مصوب رده سنی</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file.title)}
                          className="px-3.5 py-1.5 rounded-xl bg-shams-navy text-white hover:bg-shams-gold hover:text-shams-navy transition-all font-bold text-[11px] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{downloadFeedback === file.title ? (lang === 'en' ? 'Downloaded!' : 'دانلود شد') : (lang === 'en' ? 'Download' : 'دریافت PDF')}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Banner */}
              <div className="pt-4 border-t border-shams-sand flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-shams-navy/70 text-center sm:text-start">
                  آیا مایل به دریافت چک‌لیست شخصی‌سازی‌شده ارزیابی سلامت متناسب با سن خود هستید؟
                </span>
                <Link
                  to="/assessment"
                  className="px-6 py-2.5 rounded-2xl bg-shams-gold text-shams-navy font-bold text-xs hover:bg-shams-navy hover:text-white transition-all shadow-sm shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>شروع ارزیابی جامع سلامت</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

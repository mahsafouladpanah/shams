import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  BookOpen, Sparkles, Activity, Dna, Apple, Dumbbell, 
  Moon, Brain, ShieldAlert, Heart, Clock, ArrowLeft, ArrowRight,
  FileText, Video, Download, CheckCircle2, ChevronRight, Play, ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { lifestyleTopics, LifestyleTopic } from '../data/knowledgeData';
import { PageHero } from '../components/PageHero';

export function Lifestyle() {
  const { lang, t, formatNumber, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get('topic');

  const [selectedTopic, setSelectedTopic] = useState<LifestyleTopic>(() => {
    if (topicParam) {
      const found = lifestyleTopics.find(t => t.id === topicParam);
      if (found) return found;
    }
    return lifestyleTopics[0];
  });

  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (topicParam) {
      const found = lifestyleTopics.find(t => t.id === topicParam);
      if (found && found.id !== selectedTopic.id) {
        setSelectedTopic(found);
      }
    }
  }, [topicParam]);

  const handleSelectTopic = (topic: LifestyleTopic) => {
    setSelectedTopic(topic);
    setSearchParams({ topic: topic.id });
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleDownload = (title: string) => {
    setDownloadFeedback(title);
    setTimeout(() => setDownloadFeedback(null), 3000);
  };

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Restorative Movement Visual */}
      <PageHero
        heroId="lifestyle"
        layoutVariant="asymmetric"
        themeAccent="teal"
      />

      {/* Main Content with Topic Selector */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation: 9 Lifestyle Pillars */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-3xl p-4 border border-shams-navy/10 shadow-sm space-y-1.5 sticky top-24">
              <div className="text-xs font-bold text-shams-navy/60 px-3 py-2 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'en' ? '9 Pillars of Lifestyle' : lang === 'ar' ? 'أركان نمط الحياة التسعة' : '۹ ستون سبک زندگی شمس'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-shams-gold/20 text-shams-navy font-bold">
                  {formatNumber(9)}
                </span>
              </div>
              {lifestyleTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`w-full text-start p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedTopic.id === topic.id
                      ? 'bg-shams-navy text-white shadow-md'
                      : 'text-shams-navy/80 hover:bg-shams-sand/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono ${
                      selectedTopic.id === topic.id ? 'bg-shams-gold text-shams-navy' : 'bg-shams-navy/5 text-shams-navy/60'
                    }`}>
                      {formatNumber(index + 1)}
                    </span>
                    <span className="truncate">{lang === 'en' ? topic.titleEn : lang === 'ar' ? topic.titleAr : topic.title}</span>
                  </div>
                  {isRTL ? (
                    <ArrowLeft className={`w-3.5 h-3.5 shrink-0 ${selectedTopic.id === topic.id ? 'text-shams-gold' : 'opacity-30'}`} />
                  ) : (
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${selectedTopic.id === topic.id ? 'text-shams-gold' : 'opacity-30'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Detailed Topic View */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-shams-navy/10 shadow-lg space-y-8">
              
              {/* Header Badge & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-shams-gold/20 text-shams-navy border border-shams-gold/40">
                    {lang === 'en' ? `Pillar ${formatNumber(lifestyleTopics.findIndex(t => t.id === selectedTopic.id) + 1)} of ${formatNumber(9)}` : `ستون شماره ${formatNumber(lifestyleTopics.findIndex(t => t.id === selectedTopic.id) + 1)} از ${formatNumber(9)}`}
                  </span>
                  <span className="text-xs font-mono text-shams-navy/40" dir="ltr">{selectedTopic.id}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-shams-navy mt-2 mb-1">
                  {lang === 'en' ? selectedTopic.titleEn : lang === 'ar' ? selectedTopic.titleAr : selectedTopic.title}
                </h2>
                <div className="text-xs text-shams-navy/50 font-mono" dir="ltr">{selectedTopic.titleEn}</div>
                <p className="text-sm text-shams-navy/80 leading-relaxed mt-4">
                  {selectedTopic.description}
                </p>
              </div>

              {/* Pillars Breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-shams-gold" />
                  {lang === 'en' ? 'Core Scientific Principles:' : lang === 'ar' ? 'المبادئ العلمية الأساسية:' : 'مفاهیم کلیدی و اصول علمی این ستون:'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTopic.pillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-shams-sand/50 border border-shams-navy/5 text-xs text-shams-navy/90 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-shams-navy text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {formatNumber(idx + 1)}
                      </div>
                      <span className="leading-relaxed">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Habits */}
              <div className="space-y-4 pt-4 border-t border-shams-sand">
                <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                  <Activity className="w-4 h-4 text-shams-gold" />
                  {lang === 'en' ? 'Practical Daily Habits in SHAMS Ecosystem:' : lang === 'ar' ? 'العادات اليومية العملية في منظومة شمس:' : 'عادت‌های روزانه قابل اجرا در زیست‌بوم شمس:'}
                </h3>
                <div className="space-y-2.5">
                  {selectedTopic.practicalHabits.map((habit, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl border border-shams-sand bg-white hover:border-shams-gold/40 transition-colors flex items-center justify-between text-xs font-bold text-shams-navy">
                      <span className="leading-relaxed">• {habit}</span>
                      <span className="text-[10px] text-shams-navy px-2 py-0.5 rounded-lg bg-shams-gold/20 shrink-0 ms-2">
                        {lang === 'en' ? 'Actionable' : lang === 'ar' ? 'إجراء تطبيقي' : 'مداخله فعال'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scientific Evidence Box */}
              <div className="bg-shams-navy/5 p-6 rounded-2xl border border-shams-navy/10 space-y-2">
                <div className="text-xs font-bold text-shams-navy flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-shams-gold" />
                  {lang === 'en' ? 'Scientific Evidence & Clinical Trials:' : lang === 'ar' ? 'الأدلة العلمية والتجارب السريرية:' : 'پشتوانه علمی و متاآنالیزها (Scientific Evidence):'}
                </div>
                <p className="text-xs text-shams-navy/70 leading-relaxed font-normal">
                  {selectedTopic.scientificEvidence}
                </p>
              </div>

              {/* Articles Subsection */}
              {selectedTopic.articles && selectedTopic.articles.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-shams-sand">
                  <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                    <FileText className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'In-Depth Articles & Clinical Guides:' : lang === 'ar' ? 'المقالات المتعمقة والأدلة السريرية:' : 'مقالات تحلیلی و راهنماهای بالینی این بخش:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTopic.articles.map((art, idx) => (
                      <div key={idx} className="p-5 rounded-2xl border border-shams-navy/10 bg-white hover:border-shams-gold transition-all shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-shams-navy/50 mb-2">
                            <span className="font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-shams-gold" />
                              {art.readTime}
                            </span>
                            <span className="text-shams-gold font-mono">SHAMS Clinical</span>
                          </div>
                          <h4 className="text-sm font-bold text-shams-navy leading-snug mb-2">
                            {art.title}
                          </h4>
                          <p className="text-xs text-shams-navy/70 leading-relaxed line-clamp-2">
                            {art.excerpt}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-shams-sand/80 flex items-center justify-between text-xs font-bold text-shams-gold">
                          <span>{lang === 'en' ? 'Read full article' : lang === 'ar' ? 'قراءة المقال' : 'مطالعه متن کامل مقاله'}</span>
                          {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Subsection */}
              {selectedTopic.videos && selectedTopic.videos.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-shams-sand">
                  <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                    <Video className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Video Lectures & Workshops:' : lang === 'ar' ? 'المحاضرات المرئية وورش العمل:' : 'ویدیوها و کارگاه‌های آموزشی:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTopic.videos.map((vid, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-shams-navy/10 bg-shams-navy/5 flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-shams-navy text-white flex items-center justify-center shrink-0 shadow-sm relative group cursor-pointer">
                          <Play className="w-5 h-5 text-shams-gold fill-shams-gold" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-shams-navy truncate leading-snug">
                            {vid.title}
                          </h4>
                          <div className="text-[11px] text-shams-navy/60 mt-1 flex items-center gap-2">
                            <span>{vid.duration}</span>
                            <span>•</span>
                            <span className="truncate">{vid.presenter}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Educational Files & Downloads */}
              {selectedTopic.educationalFiles && selectedTopic.educationalFiles.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-shams-sand">
                  <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
                    <Download className="w-4 h-4 text-shams-gold" />
                    {lang === 'en' ? 'Educational Resources & PDF Guides:' : lang === 'ar' ? 'المصادر التعليمية وكتيبات PDF:' : 'منابع آموزشی و فایل‌های قابل دانلود:'}
                  </h3>
                  <div className="space-y-2.5">
                    {selectedTopic.educationalFiles.map((file, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl border border-shams-navy/10 bg-white flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 font-bold font-mono text-[10px] flex items-center justify-center border border-red-200">
                            {file.type}
                          </div>
                          <div>
                            <div className="font-bold text-shams-navy">{file.title}</div>
                            <div className="text-[11px] text-shams-navy/50">{file.size} • راهنمای مصوب شمس</div>
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

              {/* Action Tool / Interactive Calculator Banner */}
              {selectedTopic.actionTool && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-shams-navy to-shams-navy/90 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-shams-gold/30 shadow-xl">
                  <div className="space-y-1 text-center md:text-start">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-shams-gold mb-1">
                      <Sparkles className="w-4 h-4" />
                      {lang === 'en' ? 'Interactive Health Tool' : lang === 'ar' ? 'أداة صحية تفاعلية' : 'ابزار هوشمند تعاملی شمس'}
                    </div>
                    <h4 className="text-lg font-bold">{selectedTopic.actionTool.name}</h4>
                    <p className="text-xs text-white/70 max-w-md leading-relaxed">{selectedTopic.actionTool.description}</p>
                  </div>
                  <Link
                    to="/plan"
                    className="px-6 py-3 rounded-2xl bg-shams-gold text-shams-navy font-bold text-xs hover:bg-white transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{selectedTopic.actionTool.cta}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NeonHealthAnalytics } from '../components/NeonHealthAnalytics';

export function AssessmentResult() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-24 font-sans text-shams-navy dir-rtl" dir="rtl">
      {/* Sticky Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-shams-navy/10 py-4 px-6 sticky top-0 z-30 shadow-2xs">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <Link 
            to="/assessment" 
            className="flex items-center gap-2 text-shams-navy/70 hover:text-shams-teal font-bold transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به ارزیابی‌ها</span>
          </Link>

          <div className="text-center">
            <h1 className="text-base font-bold text-shams-navy">گزارش و پرونده سلامت شمس</h1>
            <p className="text-[11px] text-shams-navy/50">تحلیل هوشمند بیومارکرها و پایش طولی</p>
          </div>

          <div className="w-24 text-left">
            <span className="text-[10px] font-mono bg-shams-teal/10 text-shams-teal font-bold px-2.5 py-1 rounded-full border border-shams-teal/20">
              VERIFIED
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 md:px-6 pt-8">
        <NeonHealthAnalytics />
      </main>
    </div>
  );
}


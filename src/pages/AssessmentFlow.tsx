import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function AssessmentFlow() {
  const navigate = useNavigate();
  const { formatNumber } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const steps = [
    {
      question: "در هفته معمولاً چند روز حداقل ۳۰ دقیقه فعالیت بدنی متوسط تا شدید دارید؟",
      illustration: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
      options: [
        "هیچ یا ندرتاً",
        "۱ تا ۲ روز در هفته",
        "۳ تا ۴ روز در هفته",
        "۵ روز یا بیشتر"
      ]
    },
    {
      question: "به طور میانگین در شبانه‌روز چند ساعت خواب مفید دارید؟",
      illustration: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
      options: [
        "کمتر از ۵ ساعت",
        "بین ۵ تا ۶ ساعت",
        "بین ۶ تا ۸ ساعت",
        "بیشتر از ۸ ساعت"
      ]
    },
    {
      question: "چقدر در طول روز احساس استرس یا اضطراب مداوم دارید؟",
      illustration: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      options: [
        "تقریباً همیشه",
        "بیشتر اوقات",
        "گاهی اوقات",
        "به ندرت"
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1);
      setSelectedAnswer(null);
    } else {
      navigate('/assessment/result/overview');
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-shams-sand flex flex-col">
      {/* Top Progress Bar */}
      <div className="w-full h-2 bg-shams-green-light fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-shams-green-primary transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-40 border-b border-shams-green-border/40">
        <button 
          onClick={() => currentStep > 0 ? setCurrentStep(c => c - 1) : navigate('/assessment')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-shams-navy hover:bg-shams-green-light hover:text-shams-green-deep transition-all shadow-sm border border-shams-navy/5"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="font-bold text-shams-navy tracking-tight text-xl">شمس</div>
        <div className="text-xs font-semibold text-shams-green-deep bg-shams-green-light border border-shams-green-border px-3 py-1 rounded-full">
          سوال <span className="font-numeric font-bold">{formatNumber(currentStep + 1)}</span> از <span className="font-numeric font-bold">{formatNumber(steps.length)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Question Side */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold text-shams-navy leading-tight mb-10">
              {step.question}
            </h2>
            
            <div className="flex flex-col gap-4">
              {step.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`p-5 rounded-2xl border-2 text-right transition-all duration-300 text-lg font-medium flex items-center justify-between ${
                    selectedAnswer === idx 
                      ? 'border-shams-green-primary bg-shams-green-light text-shams-green-deep shadow-md' 
                      : 'border-white bg-white text-shams-navy hover:border-shams-green-border hover:bg-shams-green-subtle shadow-sm'
                  }`}
                >
                  {option}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedAnswer === idx ? 'border-shams-green-primary bg-white' : 'border-shams-navy/20'
                  }`}>
                    {selectedAnswer === idx && <div className="w-3 h-3 bg-shams-green-primary rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                disabled={selectedAnswer === null}
                onClick={handleNext}
                className="bg-shams-green-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-shams-green-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-shams-green-primary/20"
              >
                {currentStep === steps.length - 1 ? 'مشاهده نتیجه ارزیابی' : 'سوال بعدی'}
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="hidden md:block h-full min-h-[500px] relative rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-shams-navy/20 z-10" />
            <img 
              src={step.illustration} 
              alt="Illustration" 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

        </div>
      </main>
    </div>
  );
}

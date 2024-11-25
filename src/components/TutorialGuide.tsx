import React, { useState, useEffect } from 'react';
import { HelpCircle, X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

interface TutorialGuideProps {
  steps: TutorialStep[];
  onComplete?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialGuide({ steps, onComplete, isOpen, onClose }: TutorialGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target);
      if (element) {
        const rect = element.getBoundingClientRect();
        const pos = calculatePosition(rect, steps[currentStep].position);
        setPosition(pos);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep, isOpen, steps]);

  const calculatePosition = (rect: DOMRect, preferredPosition: string = 'bottom') => {
    const margin = 12;
    const tooltipHeight = 150;
    const tooltipWidth = 300;

    switch (preferredPosition) {
      case 'top':
        return {
          top: rect.top - tooltipHeight - margin,
          left: rect.left + (rect.width - tooltipWidth) / 2
        };
      case 'right':
        return {
          top: rect.top + (rect.height - tooltipHeight) / 2,
          left: rect.right + margin
        };
      case 'left':
        return {
          top: rect.top + (rect.height - tooltipHeight) / 2,
          left: rect.left - tooltipWidth - margin
        };
      default: // bottom
        return {
          top: rect.bottom + margin,
          left: rect.left + (rect.width - tooltipWidth) / 2
        };
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div
        className="fixed z-50 bg-white rounded-lg shadow-lg p-4 w-[300px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-indigo-600" size={20} />
            <h3 className="font-semibold">{steps[currentStep].title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {steps[currentStep].content}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
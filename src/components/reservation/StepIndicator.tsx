export const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-10 gap-3">
    {[1, 2, 3].map((s) => (
      <div 
        key={s} 
        className={`h-1.5 w-20 rounded-full transition-all duration-500 ${
          currentStep >= s ? "bg-sabana" : "bg-slate-200"
        }`} 
      />
    ))}
  </div>
);
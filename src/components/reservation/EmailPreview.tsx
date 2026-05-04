// components/reservation/EmailPreview.tsx
import { generateReservationEmail } from "@/services/emailTemplates";

export const EmailPreview = ({ data }: { data: any }) => {
  const htmlContent = generateReservationEmail(data);

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-inner">
      <div className="bg-slate-100 p-2 text-xs text-slate-400 border-b flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        Vista previa del correo enviado
      </div>
      <iframe 
        srcDoc={htmlContent} 
        title="Email Preview"
        className="w-full h-[500px] border-none"
      />
    </div>
  );
};
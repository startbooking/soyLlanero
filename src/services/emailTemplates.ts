// services/emailTemplates.ts
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

export const generateReservationEmail = (data: any) => {
  const { hotel, room, formData, values, checkInDate, checkOutDate, guests } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .wrapper { background-color: #f8fafc; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
          .header { background-color: #0f172a; color: #ffffff; padding: 30px; text-align: center; }
          .content { padding: 40px; color: #334155; }
          .details-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
          .details-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          .label { font-weight: bold; color: #64748b; width: 40%; }
          .total-box { background-color: #f1f5f9; padding: 20px; border-radius: 8px; text-align: right; margin-top: 20px; }
          .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
          .btn { background-color: #000000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1 style="margin:0; font-size: 24px;">Confirmación de Reserva</h1>
              <p style="margin:5px 0 0; opacity: 0.8;">ID de Transacción: #${Math.floor(Math.random() * 1000000)}</p>
            </div>
            <div class="content">
              <h2 style="color: #0f172a;">¡Hola, ${formData.firstName}!</h2>
              <p>Tu estancia en <strong>${hotel.name}</strong> ha sido confirmada. Estamos emocionados de recibirte.</p>
              
              <table class="details-table">
                <tr>
                  <td class="label">Habitación</td>
                  <td>${room.name}</td>
                </tr>
                <tr>
                  <td class="label">Check-in</td>
                  <td>${format(new Date(checkInDate), "eeee, d 'de' MMMM")}</td>
                </tr>
                <tr>
                  <td class="label">Check-out</td>
                  <td>${format(new Date(checkOutDate), "eeee, d 'de' MMMM")}</td>
                </tr>
                <tr>
                  <td class="label">Huéspedes</td>
                  <td>${guests.adults} Adultos, ${guests.children} Niños</td>
                </tr>
              </table>

              <div class="total-box">
                <span style="display:block; font-size: 12px; color: #64748b; text-transform: uppercase;">Total Pagado</span>
                <span style="font-size: 24px; font-weight: 900; color: #0f172a;">${formatCurrency(values.total)}</span>
              </div>

              <div style="text-align: center;">
                <a href="https://waze.com/ul?q=${encodeURIComponent(hotel.address)}" class="btn">¿Cómo llegar?</a>
              </div>
            </div>
            <div class="footer">
              <p>${hotel.name} - ${hotel.address}</p>
              <p>Si tienes dudas, escríbenos a: ${hotel.email}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// services/emailTemplates.ts
export const generateFailedTransactionEmail = (data: any) => {
  const { hotel, room, formData, errorCode } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .wrapper { background-color: #fef2f2; padding: 40px 20px; font-family: 'Segoe UI', sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #fee2e2; }
          .header { background-color: #dc2626; color: #ffffff; padding: 30px; text-align: center; }
          .content { padding: 40px; color: #475569; }
          .alert-box { background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 15px; margin: 20px 0; color: #9f1239; font-size: 14px; }
          .room-info { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .btn { background-color: #0f172a; color: #ffffff !important; padding: 14px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-top: 20px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1 style="margin:0; font-size: 22px;">Reserva No Confirmada</h1>
            </div>
            <div class="content">
              <h2 style="color: #1e293b;">Hola, ${formData.firstName}</h2>
              <p>Te informamos que el proceso de pago para tu reserva en <strong>${hotel.name}</strong> no pudo ser completado por tu entidad bancaria.</p>
              
              <div class="alert-box">
                <strong>Estado:</strong> Transacción Rechazada / Fallida<br>
                ${errorCode ? `<strong>Referencia de error:</strong> ${errorCode}` : ''}
              </div>

              <p>Debido a esto, <strong>tu reserva no ha sido procesada</strong> y la habitación sigue disponible para otros usuarios. Te recomendamos:</p>
              
              <ul style="font-size: 14px; line-height: 1.6;">
                <li>Verificar el cupo o saldo de tu tarjeta.</li>
                <li>Contactar a tu banco para autorizar compras en línea.</li>
                <li>Intentar con un medio de pago diferente.</li>
              </ul>

              <div class="room-info">
                <span style="font-size: 12px; color: #64748b; text-transform: uppercase;">Habitación intentada:</span>
                <p style="margin: 5px 0 0; font-weight: bold; color: #0f172a;">${room.name}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${window.location.origin}/hotels" class="btn">Intentar reservar de nuevo</a>
              </div>
            </div>
            <div class="footer">
              <p>Si el cargo aparece en tu extracto, el banco realizará la devolución automática en un plazo de 24-48 horas.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
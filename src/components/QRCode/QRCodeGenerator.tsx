import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode } from 'lucide-react';
import Button from '../UI/Button';

interface QRCodeGeneratorProps {
  orderId: string;
  orderData: any;
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ orderId, orderData, className = '' }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateQRCode();
  }, [orderId, orderData]);

  const generateQRCode = async () => {
    try {
      setIsLoading(true);
      
      // Créer les données pour le QR code
      const qrData = {
        orderId: orderId,
        customerName: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
        customerPhone: orderData.customerInfo.phone,
        total: orderData.total,
        items: orderData.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        deliveryType: orderData.customerInfo.address ? 'delivery' : 'pickup',
        address: orderData.customerInfo.address || null,
        paymentMethod: orderData.paymentMethod,
        status: orderData.status,
        createdAt: orderData.createdAt?.toDate ? orderData.createdAt.toDate().toISOString() : new Date().toISOString()
      };

      // Générer le QR code
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669', // Couleur emerald-600
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Erreur lors de la génération du QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `qr-commande-${orderId}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl p-6 text-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Génération du QR code...</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 text-center ${className}`}>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <QrCode className="h-6 w-6 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900">QR Code de la commande</h3>
      </div>
      
      {qrCodeUrl && (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg inline-block">
            <img 
              src={qrCodeUrl} 
              alt={`QR Code commande ${orderId}`}
              className="mx-auto"
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Scannez ce QR code pour valider la commande
          </p>
          
          <Button
            onClick={downloadQRCode}
            variant="outline"
            size="sm"
            icon={Download}
            className="hover:scale-105 transition-transform duration-200"
          >
            Télécharger le QR code
          </Button>
        </>
      )}
    </div>
  );
};

export default QRCodeGenerator;
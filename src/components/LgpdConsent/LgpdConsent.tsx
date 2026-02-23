import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getConsent, setConsent } from '@/utils/cookieConsent';

export function LgpdConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsent();
    if (status === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setVisible(false);
  };

  const handleRefuse = () => {
    setConsent('refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="lgpd-title"
      aria-describedby="lgpd-description"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 bg-card/95 backdrop-blur border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2 id="lgpd-title" className="text-sm font-semibold text-foreground mb-1">
            Cookies e privacidade
          </h2>
          <p id="lgpd-description" className="text-sm text-muted-foreground">
            Utilizamos cookies para melhorar sua experiência. Você pode aceitar ou recusar.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRefuse}
            aria-label="Recusar cookies"
          >
            Recusar
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleAccept}
            aria-label="Aceitar cookies"
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}

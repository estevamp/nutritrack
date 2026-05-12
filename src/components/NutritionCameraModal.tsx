import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Check, RotateCcw, Loader2 } from 'lucide-react';

export interface ExtractedNutrition {
  name: string | null;
  servingSize: number;
  servingUnit: 'g' | 'ml' | 'unit';
  servingLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  saturatedFat: number;
  fiber: number;
  sodium: number;
}

interface NutritionCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtracted: ( data: ExtractedNutrition) => void;
}

type ModalState = 'idle' | 'capturing' | 'captured' | 'analyzing' | 'done' | 'error';

const MAX_IMAGE_SIZE = 1024;

const NutritionCameraModal: React.FC<NutritionCameraModalProps> = ({
  isOpen,
  onClose,
  onExtracted,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [state, setState] = useState<ModalState>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Start camera when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = async () => {
    try {
      setState('idle');
      setErrorMessage(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('[NutritionCameraModal] Failed to start camera:', error);
      setErrorMessage('Não foi possível acessar a câmera. Verifique as permissões.');
      setState('error');
    }
  };

  const resizeImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_IMAGE_SIZE) / width);
            width = MAX_IMAGE_SIZE;
          } else {
            width = Math.round((width * MAX_IMAGE_SIZE) / height);
            height = MAX_IMAGE_SIZE;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(base64);
        }
      };
      img.src = base64;
    });
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setState('capturing');

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.95);
      setCapturedImage(imageData);
      setState('captured');

      // Stop camera after capture to save battery
      stopCamera();
    }
  }, [stopCamera]);

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setState('analyzing');
    setErrorMessage(null);

    try {
      // Resize image before sending
      const resizedImage = await resizeImage(capturedImage);

      const response = await fetch('/api/nutrition-ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: resizedImage,
          mimeType: 'image/jpeg',
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || 'Erro ao analisar imagem');
      }

      onExtracted(result);
      setState('done');

      // Close modal after short delay
      setTimeout(() => {
        handleClose();
      }, 300);
    } catch (error) {
      console.error('[NutritionCameraModal] Analysis failed:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Não consegui ler a tabela. Tente uma foto mais nítida ou preencha manualmente.'
      );
      setState('error');
    }
  };

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setErrorMessage(null);
    setState('idle');
    startCamera();
  }, []);

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setErrorMessage(null);
    setState('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001,
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={20} color="#16a34a" />
            Fotografar Tabela Nutricional
          </h3>
          <button onClick={handleClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          {(state === 'idle' || state === 'capturing') && (
            <div>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                position: 'relative',
              }}>
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: '10%',
                  border: '2px solid rgba(255,255,255,0.85)',
                  borderRadius: '12px',
                  boxShadow: '0 0 0 999px rgba(0,0,0,0.3)',
                }} />
                <p style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: '0.85rem',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}>
                  Enquadre a tabela nutricional na área destacada
                </p>
              </div>

              <button
                type="button"
                onClick={capturePhoto}
                disabled={state === 'capturing'}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#16a34a',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: state === 'capturing' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Camera size={18} />
                {state === 'capturing' ? 'Capturando...' : 'Capturar Foto'}
              </button>
            </div>
          )}

          {state === 'captured' && capturedImage && (
            <div>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                backgroundColor: '#f3f4f6',
              }}>
                <img
                  src={capturedImage}
                  alt="Foto capturada"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={retakePhoto}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={18} />
                  Retirar Foto
                </button>
                <button
                  type="button"
                  onClick={analyzeImage}
                  style={{
                    flex: 2,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#16a34a',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={18} />
                  Analisar
                </button>
              </div>
            </div>
          )}

          {state === 'analyzing' && (
            <div style={{
              padding: '40px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <Loader2 size={40} className="animate-spin" color="#16a34a" />
              <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>
                Lendo tabela nutricional...
              </p>
            </div>
          )}

          {state === 'error' && (
            <div>
              {capturedImage && (
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                  backgroundColor: '#f3f4f6',
                  marginBottom: '16px',
                }}>
                  <img
                    src={capturedImage}
                    alt="Foto capturada"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}

              <div style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                marginBottom: '16px',
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  {errorMessage || 'Não consegui ler a tabela. Tente uma foto mais nítida ou preencha manualmente.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={retakePhoto}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={18} />
                  Tentar Novamente
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#6b7280',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {state === 'done' && (
            <div style={{
              padding: '40px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <Check size={40} color="#16a34a" />
              <p style={{ textAlign: 'center', color: '#16a34a', margin: 0, fontWeight: 600 }}>
                Dados extraídos com sucesso!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default NutritionCameraModal;

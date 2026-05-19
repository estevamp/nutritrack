import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, Check, Loader2, Minus, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import type { FoodItem, NutrientInfo } from '../types';
import { analyzeMealPhoto, type MealPhotoItem } from '../services/mealPhotoAnalysis';

export interface MealPhotoSelection {
  food: FoodItem;
  servings: number;
}

interface MealPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (items: MealPhotoSelection[]) => void | Promise<void>;
}

type ModalState = 'idle' | 'capturing' | 'captured' | 'analyzing' | 'review' | 'error';

const MAX_IMAGE_SIZE = 1024;
const SERVING_STEP = 0.25;
const MIN_SERVINGS = 0.25;

const emptyNutrients = (): NutrientInfo => ({
  calories: 0,
  protein: 0,
  carbs: 0,
  sugar: 0,
  fat: 0,
  saturatedFat: 0,
  fiber: 0,
  sodium: 0,
});

const MealPhotoModal: React.FC<MealPhotoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [state, setState] = useState<ModalState>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [items, setItems] = useState<MealPhotoItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
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
      console.error('[MealPhotoModal] Failed to start camera:', error);
      setErrorMessage('Não foi possível acessar a câmera. Verifique as permissões.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    void startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

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
      stopCamera();
    }
  }, [stopCamera]);

  const analyzeImage = async () => {
    if (!capturedImage) return;

    setState('analyzing');
    setErrorMessage(null);

    try {
      const resizedImage = await resizeImage(capturedImage);
      const detectedItems = await analyzeMealPhoto(resizedImage, 'image/jpeg');

      if (detectedItems.length === 0) {
        setErrorMessage('Não encontrei alimentos na foto. Tente uma imagem mais clara do prato.');
        setState('error');
        return;
      }

      setItems(detectedItems);
      setState('review');
    } catch (error) {
      console.error('[MealPhotoModal] Analysis failed:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Não consegui analisar a refeição. Tente outra foto.'
      );
      setState('error');
    }
  };

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setErrorMessage(null);
    setItems([]);
    setState('idle');
    void startCamera();
  }, [startCamera]);

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setErrorMessage(null);
    setItems([]);
    setIsSaving(false);
    setState('idle');
    onClose();
  };

  const updateItemServings = (index: number, servings: number) => {
    setItems(current => current.map((item, itemIndex) => (
      itemIndex === index
        ? { ...item, servings: Math.max(MIN_SERVINGS, Number(servings.toFixed(2))) }
        : item
    )));
  };

  const removeItem = (index: number) => {
    setItems(current => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleConfirm = async () => {
    const selectedItems = items
      .filter(item => item.name.trim())
      .map<MealPhotoSelection>(item => ({
        food: {
          id: `meal-photo-${crypto.randomUUID()}`,
          name: item.name.trim(),
          category: item.category,
          servingSize: item.servingSize,
          servingUnit: item.servingUnit,
          servingLabel: item.servingLabel || item.estimatedAmount,
          nutrients: {
            ...emptyNutrients(),
            ...item.nutrients,
          },
          isCustom: false,
        },
        servings: item.servings || 1,
      }));

    if (selectedItems.length === 0) {
      setErrorMessage('Mantenha pelo menos um alimento identificado para adicionar.');
      setState('error');
      return;
    }

    try {
      setIsSaving(true);
      await onConfirm(selectedItems);
      handleClose();
    } catch (error) {
      console.error('[MealPhotoModal] Save failed:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível adicionar a refeição.'
      );
      setState('review');
    } finally {
      setIsSaving(false);
    }
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
      alignItems: 'flex-end',
      zIndex: 1001,
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '480px',
        maxHeight: '92vh',
        margin: '0 auto',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        overflowY: 'auto',
        animation: 'slideUp 0.3s ease-out',
      }}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={20} color="#16a34a" />
            Fotografar refeição
          </h3>
          <button onClick={handleClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X />
          </button>
        </div>

        <div style={{ padding: '16px' }}>
          {(state === 'idle' || state === 'capturing') && (
            <div>
              <div style={{
                backgroundColor: '#111827',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
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
                  inset: '8%',
                  border: '2px solid rgba(255,255,255,0.85)',
                  borderRadius: '16px',
                  boxShadow: '0 0 0 999px rgba(0,0,0,0.22)',
                }} />
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
                  fontWeight: 700,
                  cursor: state === 'capturing' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Camera size={18} />
                {state === 'capturing' ? 'Capturando...' : 'Capturar foto'}
              </button>
            </div>
          )}

          {state === 'captured' && capturedImage && (
            <div>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                backgroundColor: '#f3f4f6',
              }}>
                <img
                  src={capturedImage}
                  alt="Foto da refeição"
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
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={18} />
                  Refazer
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
                    fontWeight: 700,
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
              padding: '44px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}>
              <Loader2 size={40} className="animate-spin" color="#16a34a" />
              <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>
                Identificando alimentos e estimando quantidades...
              </p>
            </div>
          )}

          {state === 'review' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {errorMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#fef2f2',
                  color: '#991b1b',
                  fontSize: '0.9rem',
                }}>
                  {errorMessage}
                </div>
              )}

              {items.map((item, index) => {
                const multiplier = item.servings || 1;
                return (
                  <div key={`${item.name}-${index}`} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, overflowWrap: 'anywhere' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          {item.estimatedAmount || item.servingLabel}
                          {typeof item.confidence === 'number' && ` • ${Math.round(item.confidence * 100)}%`}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        aria-label={`Remover ${item.name}`}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          border: 'none',
                          background: '#fef2f2',
                          color: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      fontSize: '0.85rem',
                    }}>
                      <div style={{ padding: '10px', borderRadius: '10px', background: '#f9fafb' }}>
                        <strong>{Math.round(item.nutrients.calories * multiplier)}</strong> kcal
                      </div>
                      <div style={{ padding: '10px', borderRadius: '10px', background: '#f9fafb' }}>
                        <strong>{(item.nutrients.protein * multiplier).toFixed(1)}g</strong> prot
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Quantidade</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => updateItemServings(index, multiplier - SERVING_STEP)}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            border: '1px solid #e5e7eb',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          min={MIN_SERVINGS}
                          step={SERVING_STEP}
                          value={multiplier}
                          onChange={(event) => updateItemServings(index, Number.parseFloat(event.target.value) || MIN_SERVINGS)}
                          style={{
                            width: '72px',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            textAlign: 'center',
                            fontWeight: 700,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => updateItemServings(index, multiplier + SERVING_STEP)}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            border: '1px solid #e5e7eb',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={retakePhoto}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={18} />
                  Refazer
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isSaving || items.length === 0}
                  style={{
                    flex: 2,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isSaving || items.length === 0 ? '#9ca3af' : '#16a34a',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: isSaving || items.length === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  Adicionar
                </button>
              </div>
            </div>
          )}

          {state === 'error' && (
            <div>
              {capturedImage && (
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  backgroundColor: '#f3f4f6',
                  marginBottom: '16px',
                }}>
                  <img
                    src={capturedImage}
                    alt="Foto da refeição"
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
                  {errorMessage || 'Não consegui analisar a refeição. Tente outra foto.'}
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
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCcw size={18} />
                  Tentar novamente
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
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default MealPhotoModal;

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser';
import { Barcode, Camera, Check, Loader2, RotateCcw, Save, Search, X } from 'lucide-react';
import type { FoodItem, NutrientInfo } from '../types';
import { extractBarcode, lookupFoodByBarcode, type FoodLookupDraft } from '../services/foodLookup';

type FoodCategory = FoodItem['category'];

interface FoodCodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: FoodLookupDraft) => Promise<FoodItem | void> | FoodItem | void;
  onSaved?: (food: FoodItem) => void;
  submitLabel?: string;
}

const categoryOptions: Array<{ value: FoodCategory; label: string }> = [
  { value: 'grain', label: 'Grãos' },
  { value: 'protein', label: 'Proteína' },
  { value: 'dairy', label: 'Laticínio' },
  { value: 'vegetable', label: 'Vegetal' },
  { value: 'fruit', label: 'Fruta' },
  { value: 'fat', label: 'Gordura' },
  { value: 'beverage', label: 'Bebida' },
  { value: 'snack', label: 'Lanche' },
  { value: 'other', label: 'Outro' },
];

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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  fontSize: '0.95rem',
};

const iconButtonStyle: React.CSSProperties = {
  border: 'none',
  background: '#f3f4f6',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

function draftFromFood(food: FoodLookupDraft): FoodLookupDraft {
  return {
    name: food.name || '',
    brand: food.brand || '',
    category: food.category || 'other',
    servingSize: food.servingSize || 100,
    servingUnit: food.servingUnit || 'g',
    servingLabel: food.servingLabel || '100g',
    nutrients: {
      ...emptyNutrients(),
      ...food.nutrients,
    },
  };
}

const FoodCodeScannerModal: React.FC<FoodCodeScannerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSaved,
  submitLabel = 'Salvar alimento',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const lastCodeRef = useRef<string | null>(null);
  const isLookingUpRef = useRef(false);
  const hasDraftRef = useRef(false);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<FoodLookupDraft | null>(null);

  const hasDraft = Boolean(draft);

  useEffect(() => {
    isLookingUpRef.current = isLookingUp;
  }, [isLookingUp]);

  useEffect(() => {
    hasDraftRef.current = Boolean(draft);
  }, [draft]);

  const stopCamera = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setIsCameraActive(false);
  }, []);

  const resetLookup = useCallback(() => {
    setDraft(null);
    setManualCode('');
    setError('');
    lastCodeRef.current = null;
  }, []);

  const handleClose = () => {
    stopCamera();
    resetLookup();
    onClose();
  };

  const handleLookup = useCallback(async (rawValue: string) => {
    const code = extractBarcode(rawValue);
    if (!code) {
      setError('Não consegui identificar um código de alimento nesse QR/código.');
      return;
    }

    if (lastCodeRef.current === code && (isLookingUpRef.current || hasDraftRef.current)) return;

    lastCodeRef.current = code;
    setManualCode(code);
    setError('');
    setIsLookingUp(true);

    try {
      const found = await lookupFoodByBarcode(code);
      stopCamera();
      setDraft(draftFromFood(found));
    } catch (lookupError) {
      lastCodeRef.current = null;
      setError(lookupError instanceof Error ? lookupError.message : 'Não foi possível buscar este alimento.');
    } finally {
      setIsLookingUp(false);
    }
  }, [stopCamera]);

  useEffect(() => {
    if (!isOpen || hasDraft) return;

    let cancelled = false;
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      if (!videoRef.current) return;

      try {
        setError('');
        setIsCameraActive(true);
        const controls = await codeReader.decodeFromConstraints(
          {
            video: {
              facingMode: { ideal: 'environment' },
            },
          },
          videoRef.current,
          (result) => {
            if (result) void handleLookup(result.getText());
          }
        );

        if (cancelled) {
          controls.stop();
          return;
        }

        controlsRef.current = controls;
      } catch (scannerError) {
        setIsCameraActive(false);
        setError(
          scannerError instanceof Error
            ? 'Não foi possível acessar a câmera. Verifique a permissão ou digite o código manualmente.'
            : 'Não foi possível iniciar o scanner.'
        );
      }
    };

    void startScanner();

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
      BrowserMultiFormatReader.releaseAllStreams();
    };
  }, [isOpen, hasDraft, handleLookup]);

  const nutrientFields = useMemo<Array<{ key: keyof NutrientInfo; label: string; step: string }>>(
    () => [
      { key: 'calories', label: 'Calorias (kcal)', step: '1' },
      { key: 'protein', label: 'Proteína (g)', step: '0.1' },
      { key: 'carbs', label: 'Carbos (g)', step: '0.1' },
      { key: 'fat', label: 'Gordura (g)', step: '0.1' },
      { key: 'sugar', label: 'Açúcar (g)', step: '0.1' },
      { key: 'fiber', label: 'Fibra (g)', step: '0.1' },
      { key: 'sodium', label: 'Sódio (mg)', step: '1' },
      { key: 'saturatedFat', label: 'Gord. Sat. (g)', step: '0.1' },
    ],
    []
  );

  if (!isOpen) return null;

  const updateDraft = <K extends keyof FoodLookupDraft>(key: K, value: FoodLookupDraft[K]) => {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  };

  const updateNutrient = (key: keyof NutrientInfo, value: string) => {
    setDraft((current) => {
      if (!current) return current;
      const parsed = Number.parseFloat(value) || 0;
      return {
        ...current,
        nutrients: {
          ...current.nutrients,
          [key]: parsed,
        },
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft || !draft.name.trim()) return;

    setIsSaving(true);
    setError('');

    try {
      const saved = await onSave({
        ...draft,
        name: draft.name.trim(),
        brand: draft.brand?.trim() || undefined,
      });

      if (saved) onSaved?.(saved);
      handleClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Não foi possível salvar o alimento.');
    } finally {
      setIsSaving(false);
    }
  };

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
      zIndex: 1000,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Barcode size={22} color="#16a34a" />
            <h3 style={{ margin: 0 }}>Escanear alimento</h3>
          </div>
          <button onClick={handleClose} aria-label="Fechar scanner" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X />
          </button>
        </div>

        {!draft ? (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                inset: '18%',
                border: '2px solid rgba(255,255,255,0.85)',
                borderRadius: '14px',
                boxShadow: '0 0 0 999px rgba(0,0,0,0.18)',
              }} />
              {(isLookingUp || !isCameraActive) && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  background: 'rgba(17,24,39,0.35)',
                  fontWeight: 700,
                  gap: '8px',
                }}>
                  {isLookingUp ? <Loader2 size={20} /> : <Camera size={20} />}
                  {isLookingUp ? 'Buscando tabela...' : 'Preparando câmera...'}
                </div>
              )}
            </div>

            <form onSubmit={(event) => {
              event.preventDefault();
              void handleLookup(manualCode);
            }} style={{ display: 'flex', gap: '8px' }}>
              <input
                value={manualCode}
                onChange={(event) => setManualCode(event.target.value)}
                inputMode="numeric"
                placeholder="Ou digite o código de barras"
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={isLookingUp}
                aria-label="Buscar código"
                style={iconButtonStyle}
              >
                {isLookingUp ? <Loader2 size={18} /> : <Search size={18} />}
              </button>
            </form>

            {error && (
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                fontSize: '0.9rem',
              }}>
                {error}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Nome</label>
              <input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Marca</label>
              <input value={draft.brand || ''} onChange={(event) => updateDraft('brand', event.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Categoria</label>
                <select
                  value={draft.category}
                  onChange={(event) => updateDraft('category', event.target.value as FoodCategory)}
                  style={inputStyle}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Porção</label>
                <input
                  value={draft.servingLabel}
                  onChange={(event) => updateDraft('servingLabel', event.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Tamanho</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={draft.servingSize}
                  onChange={(event) => updateDraft('servingSize', Number.parseFloat(event.target.value) || 0)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Unidade</label>
                <select
                  value={draft.servingUnit}
                  onChange={(event) => updateDraft('servingUnit', event.target.value as FoodItem['servingUnit'])}
                  style={inputStyle}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="unit">unidade</option>
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px' }}>Nutrientes por porção</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {nutrientFields.map((nutrient) => (
                  <div key={nutrient.key}>
                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>{nutrient.label}</label>
                    <input
                      type="number"
                      min="0"
                      step={nutrient.step}
                      value={draft.nutrients[nutrient.key]}
                      onChange={(event) => updateNutrient(nutrient.key, event.target.value)}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#fef2f2', color: '#991b1b', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  resetLookup();
                  setIsCameraActive(false);
                }}
                style={{
                  flex: 1,
                  padding: '13px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={17} /> Ler outro
              </button>
              <button
                type="submit"
                disabled={isSaving}
                style={{
                  flex: 2,
                  padding: '13px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#16a34a',
                  color: '#fff',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {isSaving ? <Loader2 size={17} /> : onSaved ? <Check size={17} /> : <Save size={17} />}
                {submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FoodCodeScannerModal;

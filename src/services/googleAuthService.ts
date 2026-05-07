/**
 * Serviço de Autenticação com Google
 *
 * Este arquivo implementa autenticação via Google OAuth2 usando Firebase Auth
 */

import { auth, initFirebase } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

// Configurações opcionais do provedor Google
googleProvider.addScope('email');
googleProvider.addScope('profile');

initFirebase();

/**
 * Faz login com conta Google
 * @returns Promise<User | null>
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  initFirebase();
  try {
    console.log('[Google Auth] Iniciando login com Google...');
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log('[Google Auth] Login bem-sucedido:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    });

    return user;
  } catch (error) {
    console.error('[Google Auth] Erro no login com Google:', error);
    throw error;
  }
};

/**
 * Faz logout do usuário
 */
export const logout = async (): Promise<void> => {
  initFirebase();
  try {
    console.log('[Google Auth] Fazendo logout...');
    await signOut(auth);
    console.log('[Google Auth] Logout realizado com sucesso');
  } catch (error) {
    console.error('[Google Auth] Erro ao fazer logout:', error);
    throw error;
  }
};

/**
 * Escuta mudanças no estado de autenticação
 * @param callback - Função chamada quando o estado muda
 * @returns Função para cancelar a inscrição
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  initFirebase();
  return onAuthStateChanged(auth, callback);
};

/**
 * Retorna o usuário atual sincronamente
 * @returns User | null
 */
export const getCurrentUser = (): User | null => {
  initFirebase();
    try {
    return auth?.currentUser ?? null;
  } catch {
    return null;
  }
};

/**
 * Verifica se o usuário está autenticado
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
  initFirebase();
  return auth?.currentUser != null;
};
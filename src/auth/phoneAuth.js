import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

/**
 * ينشئ reCAPTCHA (مطلوب من Firebase Phone Auth على الويب)
 */
export function ensureRecaptcha(containerId = "recaptcha-container") {
  if (window.__recaptchaVerifier) return window.__recaptchaVerifier;

  window.__recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible"
  });

  return window.__recaptchaVerifier;
}

/**
 * إرسال كود OTP
 */
export async function sendOtp(phoneE164) {
  const verifier = ensureRecaptcha();
  const confirmation = await signInWithPhoneNumber(auth, phoneE164, verifier);
  window.__confirmationResult = confirmation;
  return true;
}

/**
 * تأكيد OTP
 */
export async function confirmOtp(code) {
  if (!window.__confirmationResult) throw new Error("لا يوجد طلب OTP نشط");
  const res = await window.__confirmationResult.confirm(code);
  return res.user;
}

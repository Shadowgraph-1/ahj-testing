/**
 * Credit card utilities: Luhn validation and type detection
 */

// Luhn algorithm implementation
export function isValidLuhn(number) {
  const clean = String(number).replace(/\D/g, '');
  if (clean.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// Card type detection based on BIN/IIN ranges
export function getCardType(number) {
  const cleanNumber = number.replace(/\\s/g, '');
  const firstDigits = cleanNumber.slice(0, 6);

  // Visa
  if (/^4/.test(cleanNumber)) return 'visa';

  // Mir (Russian) — проверить раньше, чтобы не перекрываться с Mastercard 2xxx
  if (/^220[0-4]/.test(firstDigits)) return 'mir';

  // Mastercard: 51-55 or 2221-2720 (точная проверка диапазонов)
  if (/^(5[1-5]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)/.test(cleanNumber)) return 'mastercard';

  // American Express
  if (/^3[47]/.test(cleanNumber)) return 'amex';

  // Discover
  if (/^(6011|65|64[4-9])/.test(cleanNumber)) return 'discover';

  // Maestro (упрощённо)
  if (/^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/.test(cleanNumber)) return 'maestro';

  // JCB
  if (/^(2131|1800|35)/.test(cleanNumber)) return 'jcb';

  return 'unknown';
}

// Format card number with spaces every 4 digits
export function formatCardNumber(number) {
  return String(number).replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}
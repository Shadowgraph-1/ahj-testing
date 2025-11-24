import { isValidLuhn, getCardType, formatCardNumber } from './cardUtils.js';

import visaIcon from '../assets/visa.svg';
import mastercardIcon from '../assets/mastercard.svg';
import mirIcon from '../assets/mir.svg';
import amexIcon from '../assets/amex.svg';
import discoverIcon from '../assets/discover.svg';
import jcbIcon from '../assets/jcb.svg';
import maestroIcon from '../assets/maestro.svg';
import unknownIcon from '../assets/unknown.svg';

const icons = {
  visa: visaIcon,
  mastercard: mastercardIcon,
  mir: mirIcon,
  amex: amexIcon,
  discover: discoverIcon,
  jcb: jcbIcon,
  maestro: maestroIcon,
  unknown: unknownIcon,
};

const cardNumberInput = document.getElementById('card-number');
const cardLogo = document.getElementById('card-logo');
const validationStatus = document.getElementById('validation-status');

export function initValidator() {
  cardNumberInput.addEventListener('input', handleInput);
  cardNumberInput.addEventListener('keyup', handleInput); // For real-time
  // set initial unknown icon
  setLogo('unknown');
}

function handleInput(e) {
  const value = e.target.value;
  const formatted = formatCardNumber(value);
  cardNumberInput.value = formatted;

  const cleanValue = formatted.replace(/\s/g, '');
  if (cleanValue.length < 13) {
    updateStatus('Введите номер карты', 'neutral');
    setLogo('unknown');
    return;
  }

  const type = getCardType(cleanValue);
  setLogo(type);

  const isValid = isValidLuhn(cleanValue);
  updateStatus(isValid ? 'Номер карты валиден' : 'Номер карты невалиден', isValid ? 'valid' : 'invalid');
}

function updateStatus(message, type) {
  validationStatus.textContent = message;
  validationStatus.className = `status ${type}`;
}

function setLogo(type) {
  const src = icons[type] || icons.unknown;
  cardLogo.src = src;
  cardLogo.alt = `${type} card`;
  cardLogo.style.display = type !== 'unknown' ? 'block' : 'none';
}
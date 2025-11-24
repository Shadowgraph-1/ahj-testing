import { isValidLuhn, getCardType, formatCardNumber } from '../src/js/cardUtils.js';

describe('Credit Card Utils', () => {
  describe('Luhn validation', () => {
    test('valid Visa', () => {
      expect(isValidLuhn('4111 1111 1111 1111')).toBe(true);
    });

    test('valid Mastercard', () => {
      expect(isValidLuhn('5555 5555 5555 4444')).toBe(true);
    });

    test('valid Mir', () => {
      expect(isValidLuhn('2200 2800 0000 0002')).toBe(true); // Example from sources
    });

    test('invalid short number', () => {
      expect(isValidLuhn('123')).toBe(false);
    });

    test('invalid Luhn', () => {
      expect(isValidLuhn('4111 1111 1111 1112')).toBe(false);
    });
  });

  describe('Card type detection', () => {
    test('Visa', () => {
      expect(getCardType('4111111111111111')).toBe('visa');
    });

    test('Mastercard', () => {
      expect(getCardType('5555555555554444')).toBe('mastercard');
      expect(getCardType('2221000000000008')).toBe('mastercard');
    });

    test('Mir', () => {
      expect(getCardType('2200280000000002')).toBe('mir');
    });

    test('Amex', () => {
      expect(getCardType('341111111111111')).toBe('amex');
    });

    test('Discover', () => {
      expect(getCardType('6011111111111117')).toBe('discover');
      expect(getCardType('6440000000000004')).toBe('discover');
    });

    test('JCB', () => {
      expect(getCardType('3530000000000001')).toBe('jcb');
    });

    test('Unknown', () => {
      expect(getCardType('9999999999999999')).toBe('unknown');
    });
  });

  test('formatCardNumber', () => {
    expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
  });
});
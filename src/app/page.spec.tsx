describe('Operações matemáticas básicas', () => {
    test('adição: 5 + 3 = 8', () => {
      expect(5 + 3).toBe(8);
    });
  
    test('subtração: 10 - 4 = 6', () => {
      expect(10 - 4).toBe(6);
    });
  
    test('multiplicação: 7 * 6 = 42', () => {
      expect(7 * 6).toBe(42);
    });
  
    test('divisão: 20 / 4 = 5', () => {
      expect(20 / 4).toBe(5);
    });
  
    test('divisão por zero deve ser Infinity', () => {
      expect(10 / 0).toBe(Infinity);
    });
});
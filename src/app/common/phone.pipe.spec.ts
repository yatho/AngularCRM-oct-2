import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  it('create an instance', () => {
    const pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('parse correctly phone number', () => {
    const pipe = new PhonePipe();
    expect(pipe.transform('1234567890')).toBe('12 34 56 78 90');
  });
});

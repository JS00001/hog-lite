import validators from './validators';

describe('posthogApiKey', () => {
  it('accepts personal API keys (phx_)', () => {
    const result = validators.posthogApiKey.safeParse('phx_abc123XYZ');
    expect(result.success).toBe(true);
  });

  it('accepts project API keys (phc_)', () => {
    const result = validators.posthogApiKey.safeParse('phc_abc123XYZ');
    expect(result.success).toBe(true);
  });

  it('rejects keys without a valid prefix', () => {
    expect(validators.posthogApiKey.safeParse('abc123XYZ').success).toBe(false);
    expect(validators.posthogApiKey.safeParse('pha_abc123XYZ').success).toBe(
      false,
    );
  });

  it('rejects keys that are too short', () => {
    expect(validators.posthogApiKey.safeParse('phx_ab1').success).toBe(false);
    expect(validators.posthogApiKey.safeParse('phc_ab1').success).toBe(false);
  });

  it('requires the key to be present', () => {
    expect(validators.posthogApiKey.safeParse(undefined).success).toBe(false);
    expect(validators.posthogApiKey.safeParse('').success).toBe(false);
  });
});

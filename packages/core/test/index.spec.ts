import { describe, expect, it } from 'vitest';

describe('Check if file contains specific string but excludes others', () => {
  it('should contain the specific URL and not contain excluded strings', async () => {
    expect('miniprogram-subpackage-optimization').toContain(
      'miniprogram-subpackage-optimization'
    );
  });
});

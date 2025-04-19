export function decodeBase64Key(encodedKey: string): string {
  return Buffer.from(encodedKey, 'base64').toString('utf8');
}

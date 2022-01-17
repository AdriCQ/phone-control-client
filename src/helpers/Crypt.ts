

declare class jsSHA {
  constructor(_code: string, mode: string, _t: { encoding: string });
  public update(_p: string): void;
  public getHash(_mode: string): string;
}

export function LocalCrypt(_params: string) {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(_params);
  return shaObj.getHash('HEX');
}

import { ColorPicker } from 'primeng/colorpicker';

export class NumberUtils {
  static formatNumber = (num: number) => {
    return String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  static RGBtoHex = (rgb: { r: string; g: string; b: string }) => {
    const toHex = (num: string) => {
      let hex = Number(num).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      return hex;
    };
    return '#'.concat(toHex(rgb.r)).concat(toHex(rgb.g)).concat(toHex(rgb.b));
  };
}

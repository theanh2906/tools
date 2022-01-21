export class StringUtils {
  static toTitleCase = (text: string) => {
    return text
      .split(' ')
      .map((word) => {
        return word.slice(0, 1).toUpperCase().concat(word.slice(1));
      })
      .join(' ');
  };

  static toCamelCase = (text: string) => {
    return text
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  };

  static toKebab = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\s/g, '-')
      .replace(/[̀-ͯ?!().',]/g, '');
  };

  static minify(text: string) {
    return text.replace(/\n/g, ' ');
  }

  static encode(object: any) {
    return btoa(JSON.stringify(object));
  }
}

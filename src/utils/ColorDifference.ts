interface RGBColor {
  r: number;
  g: number;
  b: number;
}

class ColorDifference {
  color1: string | RGBColor;
  color2: string | RGBColor;

  constructor(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;

    if (typeof this.color1 === "string") {
      this.color1 = this.convertHexColor(this.color1);
    }

    if (typeof this.color2 === "string") {
      this.color2 = this.convertHexColor(this.color2);
    }
  }

  convertHexColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(color) {
    return (
      "#" +
      this.componentToHex(color.r) +
      this.componentToHex(color.g) +
      this.componentToHex(color.b)
    );
  }

  percent(percent: number): string {
    percent = Math.ceil(percent / 10) * 10;

    if (typeof this.color1 !== "string" && typeof this.color2 !== "string") {
      return this.rgbToHex({
        r: this.percentOne(this.color1.r, this.color2.r, percent),
        g: this.percentOne(this.color1.g, this.color2.g, percent),
        b: this.percentOne(this.color1.b, this.color2.b, percent)
      });
    }
  }

  percentOne(a: number, b: number, percent: number) {
    if (a < b) {
      return a + Math.floor(((b - a) / 100) * percent);
    } else {
      return a - Math.floor(((a - b) / 100) * percent);
    }
  }
}

export default ColorDifference;

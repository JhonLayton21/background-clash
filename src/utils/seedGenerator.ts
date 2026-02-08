/**
 * Seeded Random Number Generator
 * Implementación de xorshift32 para reproducibilidad
 */

export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    // Validar y normalizar seed
    this.seed = seed >>> 0; // Convertir a unsigned 32-bit
    if (this.seed === 0) {
      this.seed = 123456789;
    }
  }

  /**
   * Generar siguiente número pseudoaleatorio uniformemente distribuido en [0, 1)
   * Usa algoritmo xorshift32
   */
  private next(): number {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return (this.seed >>> 0) / 4294967296; // Normalizar a [0, 1)
  }

  /**
   * Generar número entero en rango [min, max]
   */
  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generar número en rango [min, max] con decimales
   */
  float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Generar booleano con probabilidad específica
   */
  bool(probability: number = 0.5): boolean {
    return this.next() < probability;
  }

  /**
   * Elegir elemento aleatorio de array
   */
  choice<T>(array: T[]): T {
    return array[this.range(0, array.length - 1)];
  }

  /**
   * Generar seed reproducible a partir de string
   */
  static seedFromString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32-bit integer
    }
    return Math.abs(hash) % 4294967296;
  }

  /**
   * Getter: Obtener seed actual (para debugging)
   */
  getSeed(): number {
    return this.seed;
  }
}

/**
 * Factory: Crear PRNG sincronizado desde string de seed
 */
export const createSeededRandom = (seedString: string): SeededRandom => {
  const seed = SeededRandom.seedFromString(seedString);
  return new SeededRandom(seed);
};

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values: any) {
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'password') {
        if (this.isObj(value)) {
          values[key] = this.trim(value);
        } else {
          if (typeof value === 'string') {
            values[key] = value.trim();
          }
        }
      }
    }
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }

    return values;
  }
}

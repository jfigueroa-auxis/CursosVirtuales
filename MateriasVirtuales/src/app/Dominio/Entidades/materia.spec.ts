import { Materia } from './materia';
import { IMateria } from '../Interfaces/imateria';

describe('Materia', () => {
  it('should create an instance', () => {
    expect(new Materia({} as IMateria)).toBeTruthy();
  });
});

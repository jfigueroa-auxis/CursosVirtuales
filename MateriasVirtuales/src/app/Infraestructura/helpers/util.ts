export class Util {
    static Serializar(objeto: any): any{
        return JSON.parse(JSON.stringify(objeto));
    }
}

export interface IJustificatif {
    id?: number,
    name?: string,
    type?: string,
    picByte?:Blob
}

export class Justificatif implements IJustificatif {
    constructor(
        id?: number,
        name?: string,
        type?: string,
        picByte?:Blob
    ) { }

}
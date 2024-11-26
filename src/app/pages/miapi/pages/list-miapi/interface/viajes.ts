export interface viajes {
    viajes: Viaje[];
}

export interface Viaje {
    _id?:         string;
    destino:     string;
    paisSalida:  string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin:    Date;
    precio:      number;
    tipo:        string;
}
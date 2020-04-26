export interface Iss {
    message: string;
    iss_position: IssPosition;
    timestamp: number;
}

export interface IssPosition {
    latitude: string;
    longitude: string;
}

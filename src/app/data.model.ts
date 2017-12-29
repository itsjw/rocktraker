export type Platform ={
    id: number;
    name: String;
}

export type RankedSeason = {
    division:number;
    matchesPlayed: number;
    rankPoints: number;
    tier: number;

}

export type RankedItem = {
    title: string;
    rankIndex: number;
    tierName?: string;
    tierId?: number;
    img: string;
    dif: number;
    division?:number;
    current?: number;
    up?: number;
    down?: number;
}


export type DivisionItem ={
    id:number;
    rankIndex: number;
    min: number;
    max: number;
}

export type TierItem = {
    img: string;
    tierId: number;
    tierName: string;
    divisions: DivisionItem[];
}

export type Stat = {
    assists:number;
    goals:number;
    mvps:number;
    saves:number;
    shots:number;
    wins:number;
}
export type Player = {
    avatar:string;
    displayName:string;
    lastRequested: number;
    nextUpdateAt:number;
    updatedAt: number;
    platform: Platform;
    profileUrl: string;
    rankedSeasons: RankedSeason[][];
    signatureUrl:string;
    stats: Stat;
    uniqueId:string;
    rankedItems: RankedItem[];

}

export type PlayerRequest = {
    uniqueId:string;
    platformId:number;
}
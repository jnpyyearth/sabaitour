export interface Tour {
    Tour_ID: number;
    Tour_name: string;
    Tour_Country: string;
    Tour_Picture: string;
    Tour_INFO: string;
    Type_Status: string;
}
export interface Guide {
    Guide_ID: number;
    Type_ID: number;
    User_ID: number;
}
export interface GuideInOutbound {
    Guide_ID: number;
    Guide_Name: string;
    Type_Name: string;
}

export interface Guide_Type {
    Type_ID: number;
    Type_Name: string;
    Type_Color: string;
}
export interface ProgramTour {
    ProgramTour_ID: number;
    Tour_ID: number;
    StartDate: Date;
    EndDate: Date;
    Price_per_day: number;
    Price_per_person: number;
    Guide_ID: number;
    status: string;
    total_seats: number;
    available_seats: number;
    cancelled:number;
}

export interface ProgramTourForCard {
    ProgramTour_ID: number;
    Tour_name: string;
    Tour_Country: string;
    StartDate: Date;
    EndDate: Date;
    Price_per_day:number;
    Price_per_person: number;
    Tour_Picture: string;
    period:number;
    Guide_ID:number;
    Type_Status:string;
    total_seats:number;
    cancelled:number;
  }
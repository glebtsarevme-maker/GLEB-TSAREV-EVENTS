export interface BookingInquiry {
  name: string;
  email: string;
  date: string;
  location: string;
  eventType: string;
  guestsCount: string;
  additionalDetails: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  duration: string;
  suitability: string;
}

export interface Award {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export type Horse = {
  hisaHorseId: string;
  name: string;
  yearOfBirth: number;
  sex: "Mare" | "Gelding" | "Colt" | "Filly" | "Stallion";
  color?: string;
  sireName?: string;
  damName?: string;

  ownerName: string;
  ownerHisaId: string;

  responsiblePersonName: string;
  responsiblePersonHisaId: string;

  attendingVetName: string[];
  attendingVet: string[];

  lastStartDateOverride: string | null;
  postLayoffReportGracefulExpiration: string | null;
  lastPostLayoffReportDate: string | null;

  horseLocation: {
    locationId: string;
    locationName: string;
    street: string;
    city: string;
    state: string;
    zipPostalCode: string;
    country: string;
    unitAptBoxNumber: string | null;
  };
};

export const MOCK_HORSES: Horse[] = [
  {
    hisaHorseId: "H000079116",
    name: "Chaotic",
    yearOfBirth: 2014,
    sex: "Gelding",
    color: "Bay",
    sireName: "Signal Runner",
    damName: "Pure Platinum",

    ownerName: "Ava Stone",
    ownerHisaId: "P000047330",

    responsiblePersonName: "Noah Reyes",
    responsiblePersonHisaId: "P000047326",

    attendingVetName: ["Dr. Jamie Park"],
    attendingVet: ["P000039068"],

    lastStartDateOverride: null,
    postLayoffReportGracefulExpiration: null,
    lastPostLayoffReportDate: null,

    horseLocation: {
      locationId: "L000000077",
      locationName: "Louisiana Downs",
      street: "8000 E Texas St",
      city: "Bossier City",
      state: "LA",
      zipPostalCode: "71111",
      country: "USA",
      unitAptBoxNumber: null,
    },
  },
  {
    hisaHorseId: "H000091552",
    name: "Sunlit Harbor",
    yearOfBirth: 2019,
    sex: "Mare",
    color: "Chestnut",
    sireName: "Harbor King",
    damName: "Golden Hour",

    ownerName: "Mia Bennett",
    ownerHisaId: "P000061220",

    responsiblePersonName: "Ethan Cruz",
    responsiblePersonHisaId: "P000061221",

    attendingVetName: ["Dr. Sam Rivera", "Dr. Priya Patel"],
    attendingVet: ["P000040100", "P000040101"],

    lastStartDateOverride: "2025-11-02",
    postLayoffReportGracefulExpiration: "2026-02-15",
    lastPostLayoffReportDate: "2025-12-20",

    horseLocation: {
      locationId: "L000000122",
      locationName: "Santa Anita Park",
      street: "285 W Huntington Dr",
      city: "Arcadia",
      state: "CA",
      zipPostalCode: "91007",
      country: "USA",
      unitAptBoxNumber: "Barn 12",
    },
  },
  {
    hisaHorseId: "H000083004",
    name: "Midnight Atlas",
    yearOfBirth: 2016,
    sex: "Stallion",
    color: "Dark Bay",
    sireName: "Atlas Peak",
    damName: "Moonlit Path",

    ownerName: "Olivia Hart",
    ownerHisaId: "P000052990",

    responsiblePersonName: "Lucas Kim",
    responsiblePersonHisaId: "P000052991",

    attendingVetName: ["Dr. Taylor Nguyen"],
    attendingVet: ["P000041500"],

    lastStartDateOverride: null,
    postLayoffReportGracefulExpiration: null,
    lastPostLayoffReportDate: "2025-10-05",

    horseLocation: {
      locationId: "L000000305",
      locationName: "Gulfstream Park",
      street: "901 S Federal Hwy",
      city: "Hallandale Beach",
      state: "FL",
      zipPostalCode: "33009",
      country: "USA",
      unitAptBoxNumber: null,
    },
  },
];
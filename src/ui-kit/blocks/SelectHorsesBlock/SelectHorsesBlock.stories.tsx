import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";
import { Button } from "@/ui-kit/components/Button";
import { HorseListItemSelect } from "@/ui-kit/components/HorseListItemSelect";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { Meta, StoryObj } from "@storybook/react";
import { useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";
import { Modal } from "../Modal";
type Horse = {
  hisaHorseId: string;
  name: string;
  yearOfBirth: number;
  damName: string;
  ownerHisaId: string;
  ownerName: string;
  responsiblePersonHisaId: string;
  responsiblePersonName: string;
  locationId: string;
  locationName: string;
};

const myHorses: Horse[] = [
  {
    hisaHorseId: "H000059739",
    name: "Daddy Yankee",
    yearOfBirth: 2022,
    damName: "Matinee Babe",
    ownerHisaId: "P000013188",
    ownerName: "Rodolfo Sanchez Salomon",
    responsiblePersonHisaId: "P000013188",
    responsiblePersonName: "Rodolfo Sanchez Salomon",
    locationId: "L000000085",
    locationName: "Laurel Park",
  },
  {
    hisaHorseId: "H000022727",
    name: "Dadstar",
    yearOfBirth: 2019,
    damName: "Whispers of War",
    ownerHisaId: "P000021635",
    ownerName: "Maher Lutfallah",
    responsiblePersonHisaId: "P000018990",
    responsiblePersonName: "George Papaprodromou",
    locationId: "L000000040",
    locationName: "Del Mar",
  },
];

const horseData: Horse[] = [
  {
    hisaHorseId: "H000045513",
    name: "Set",
    yearOfBirth: 2021,
    damName: "Three Am Tour (IRE)",
    ownerHisaId: "P000013170",
    ownerName: "Aron Wellman",
    responsiblePersonHisaId: "P000001122",
    responsiblePersonName: "Mark Casse",
    locationId: "L000000069",
    locationName: "Churchill Downs",
  },
  {
    hisaHorseId: "H000026771",
    name: "Settler's Cove",
    yearOfBirth: 2020,
    damName: "Port Wakefield",
    ownerHisaId: "P000024043",
    ownerName: "Howard E Belvoir",
    responsiblePersonHisaId: "P000024043",
    responsiblePersonName: "Howard E Belvoir",
    locationId: "L000004555",
    locationName: "",
  },
  {
    hisaHorseId: "H000067511",
    name: "Seth's War Song (unregistered)",
    yearOfBirth: 2021,
    damName: "Veloce Canzone",
    ownerHisaId: "P999999988",
    ownerName: "Unregistered Owner",
    responsiblePersonHisaId: "P999999989",
    responsiblePersonName: "Unregistered Trainer",
    locationId: "L000000047",
    locationName: "Parx Racing",
  },
  {
    hisaHorseId: "H000027678",
    name: "Set Sail",
    yearOfBirth: 2019,
    damName: "Fleet of Gold",
    ownerHisaId: "P000016586",
    ownerName: "Jaime Roth",
    responsiblePersonHisaId: "P000010538",
    responsiblePersonName: "William I Mott",
    locationId: "L000000035",
    locationName: "Belmont Park",
  },
  {
    hisaHorseId: "H000010326",
    name: "Setna the Wise",
    yearOfBirth: 2019,
    damName: "Smart 'n Special",
    ownerHisaId: "P999999988",
    ownerName: "Unregistered Owner",
    responsiblePersonHisaId: "P999999989",
    responsiblePersonName: "Unregistered Trainer",
    locationId: "L000017953",
    locationName: "Meadowbrook Farm",
  },
  {
    hisaHorseId: "H000066333",
    name: "Set Ablaze (unregistered)",
    yearOfBirth: 2022,
    damName: "Blazeaway",
    ownerHisaId: "P999999988",
    ownerName: "Unregistered Owner",
    responsiblePersonHisaId: "P999999989",
    responsiblePersonName: "Unregistered Trainer",
    locationId: "L000000008",
    locationName: "Colonial Downs",
  },
  {
    hisaHorseId: "H000047556",
    name: "Setemfree",
    yearOfBirth: 2021,
    damName: "Letter of the Law",
    ownerHisaId: "P000003010",
    ownerName: "Vincent Puglisi Jr",
    responsiblePersonHisaId: "P000017310",
    responsiblePersonName: "Michael Pino",
    locationId: "L000015895",
    locationName: "The Thoroughbred Center (3380 Paris Pike-KY)",
  },
  {
    hisaHorseId: "H000014201",
    name: "Set Piece (GB)",
    yearOfBirth: 2016,
    damName: "Portodora",
    ownerHisaId: "P000036502",
    ownerName: "Unknown",
    responsiblePersonHisaId: "P000036502",
    responsiblePersonName: "Unknown",
    locationId: "L000020729",
    locationName: "",
  },
  {
    hisaHorseId: "H000039577",
    name: "Set Sail Carlin",
    yearOfBirth: 2019,
    damName: "Chinchilla",
    ownerHisaId: "P000006445",
    ownerName: "Marc Wampler",
    responsiblePersonHisaId: "P000006445",
    responsiblePersonName: "Marc Wampler",
    locationId: "L000000081",
    locationName: "Gulfstream Park",
  },
  {
    hisaHorseId: "H000052570",
    name: "Set Me Free",
    yearOfBirth: 2021,
    damName: "Marie Antoinette",
    ownerHisaId: "P000016582",
    ownerName: "Joseph McMahon",
    responsiblePersonHisaId: "P000016582",
    responsiblePersonName: "Joseph McMahon",
    locationId: "L000000178",
    locationName: "TLore Inactive Horse Location",
  },
  {
    hisaHorseId: "H000036359",
    name: "Ratified",
    yearOfBirth: 2020,
    damName: "touch the sky ",
    ownerHisaId: "P000036040",
    ownerName: "Unknown",
    responsiblePersonHisaId: "P000036040",
    responsiblePersonName: "Unknown",
    locationId: "L000020389",
    locationName: "",
  },
  {
    hisaHorseId: "H000016219",
    name: "Rationalmillennial",
    yearOfBirth: 2019,
    damName: "I'm Always Hopeful",
    ownerHisaId: "P000016907",
    ownerName: "jose corrales",
    responsiblePersonHisaId: "P000016907",
    responsiblePersonName: "jose corrales",
    locationId: "L000008228",
    locationName: "",
  },
  {
    hisaHorseId: "H000002684",
    name: "Rather Be Lucky",
    yearOfBirth: 2019,
    damName: "Take Charge",
    ownerHisaId: "P999999988",
    ownerName: "Unregistered Owner",
    responsiblePersonHisaId: "P999999989",
    responsiblePersonName: "Unregistered Trainer",
    locationId: "L000000069",
    locationName: "Churchill Downs",
  },
  {
    hisaHorseId: "H000046603",
    name: "Rathmore",
    yearOfBirth: 2021,
    damName: "Temperature Runnin",
    ownerHisaId: "P000011640",
    ownerName: "David Stack",
    responsiblePersonHisaId: "P000037689",
    responsiblePersonName: "Unknown",
    locationId: "L000000081",
    locationName: "Gulfstream Park",
  },
];

export const SelectHorsesScreen: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (selectedHorses: Horse[]) => void;
}> = ({ open, onClose, onSubmit }) => {
  const t = useTranslations("SearchHorses");
  const [searchText, setSearchText] = useState("");
  const [selectedHorses, setSelectedHorses] = useState<Horse[]>([]);

  const filteredHorses = searchText
    ? horseData.filter((horse) =>
        horse.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : horseData;

  const filteredMyHorses = searchText
    ? myHorses.filter((horse) =>
        horse.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : myHorses;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const handleCheckedChange = useCallback((horse: THorse) => {
    // setSelectedHorses((prev) => {
    //   if (checked) {
    //     return prev.some((h) => h.hisaHorseId === horse.hisaHorseId)
    //       ? prev
    //       : [...prev, horse];
    //   } else {
    //     return prev.filter((h) => h.hisaHorseId !== horse.hisaHorseId);
    //   }
    // });
    console.log("horse", horse);
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(selectedHorses);
    onClose();
  }, [onSubmit, selectedHorses, onClose]);

  const renderHorseItem = (horse: Horse, isLastItem: boolean) => (
    <HorseListItemSelect
      key={horse.hisaHorseId}
      horse={horse as THorse}
      title={horse.name}
      subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
      isChecked={selectedHorses.some(
        (h) => h.hisaHorseId === horse.hisaHorseId
      )}
      onCheckedChange={handleCheckedChange}
      isLastItem={isLastItem}
    />
  );

  return (
    <Modal open={open} onClose={onClose} swipeToClose>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CloseIcon />
          </div>
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg">
            {t("selectHorse")}
          </h2>
        </div>

        <div className="mb-4">
          <SearchInput
            value={searchText}
            onChange={handleSearchChange}
            placeholder={t("searchHorse")}
          />
        </div>

        {filteredMyHorses.length > 0 ? (
          <div className="mb-2">
            <h2 className="text-base mb-2">{t("myHorses")}</h2>
            {filteredMyHorses.map((horse, index) =>
              renderHorseItem(horse, index === filteredMyHorses.length - 1)
            )}
          </div>
        ) : null}

        {filteredHorses.length > 0 ? (
          <div>
            <h2 className="text-base mb-2">{t("otherHorses")}</h2>
            {filteredHorses.map((horse, index) =>
              renderHorseItem(horse, index === filteredHorses.length - 1)
            )}
          </div>
        ) : null}

        <div className="mt-6">
          <Button onClick={handleSubmit} title={t("done")} className="w-full" />
        </div>
      </div>
    </Modal>
  );
};

const SearchHorsesScreenStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (selectedHorses: Horse[]) => {
    console.log("Selected Horses:", selectedHorses);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button
        onClick={() => setIsOpen(true)}
        title="Open Select Horses Modal"
      />
      <SelectHorsesScreen
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

const meta: Meta<typeof SelectHorsesScreen> = {
  title: "Blocks/SelectHorsesScreen",
  component: SelectHorsesScreen,
};

export default meta;

export const Default: StoryObj<typeof SelectHorsesScreen> = {
  render: () => <SearchHorsesScreenStory />,
};

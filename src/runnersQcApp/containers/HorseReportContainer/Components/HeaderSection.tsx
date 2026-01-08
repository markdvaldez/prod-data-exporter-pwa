import { THorse } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import { ApplyProtocolPanel } from "@/ui-kit/blocks/ApplyProtocolPanel";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Header } from "./Header";

export const HeaderSection = ({ horse }: { horse: THorse }) => {
  const router = useRouter();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleAddRecord = useCallback(() => {
    router.push(routes.ADD_RECORD(horse?.hisaHorseId));
  }, [horse?.hisaHorseId, router]);

  const handleApplyProtocol = useCallback(() => {
    setIsPanelOpen(!isPanelOpen);
  }, [isPanelOpen]);

  return (
    <>
      <Header
        horseName={horse?.name}
        hisaHorseId={horse?.hisaHorseId}
        canRace={horse?.canRace}
        canWork={horse?.canWork}
        canRaceReason={horse?.canRaceReason}
        canWorkReason={horse?.canWorkReason}
        ownerHisaId={horse?.ownerHisaId}
        ownerName={horse?.ownerName}
        responsiblePersonHisaId={horse?.responsiblePersonHisaId}
        responsiblePersonName={horse?.responsiblePersonName}
        attendingVet={horse?.attendingVet}
        attendingVetName={horse?.attendingVetName}
        location={horse?.locationName}
        onAddRecord={handleAddRecord}
        onApplyProtocol={handleApplyProtocol}
      />
      <ApplyProtocolPanel
        isOpen={isPanelOpen}
        horseId={horse?.hisaHorseId}
        handleOpen={handleApplyProtocol}
      />
    </>
  );
};

import routes from "@/routes";
import { selectProtocolsByUserId } from "@/services/store/modules/protocols/selectors";
import { HorseMedicalRecType, TreatmentProtocolResponse } from "@/Types";
import { Button } from "@/ui-kit/components/Button";
import { Card, CardContent, CardHeader } from "@/ui-kit/components/Card";
import _, { isEmpty, map } from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
  splitCamelCase,
} from "../addRecordAndProtocolConfig";
import { ProtocolsWidgetListItem } from "./ProtocolsWidgetListItem";

export const TreatmentProtocolsWidget: React.FC = memo(() => {
  const t = useTranslations();
  const router = useRouter();

  const protocols = useSelector(selectProtocolsByUserId);

  const resentProtocols = useMemo(() => _.take(protocols, 3), [protocols]);

  const handleProtocolClick = useCallback(
    (id: string) => {
      router.push(routes.APPLY_PROTOCOL(id as string));
    },
    [router]
  );

  const renderItem = useCallback(
    (item: TreatmentProtocolResponse, index: number) => {
      const firstTreatment = _.head(item.treatments);

      const inspectionType =
        firstTreatment?.recType ===
        HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
          ? getInspectionType(
              firstTreatment?.clearedToWork,
              firstTreatment?.clearedToRace
            )
          : "";

      const drugRoute =
        firstTreatment?.recType === HorseMedicalRecType.DrugAdministered ||
        firstTreatment?.recType === HorseMedicalRecType.IntralesionalInjection
          ? firstTreatment.drugRoute
          : null;

      const currentType = getCurrentType(firstTreatment?.recType || "");

      const subTitle = getFormattedTitle([
        splitCamelCase(currentType),
        firstTreatment?.procedure,
        firstTreatment?.drugName,
        firstTreatment?.vaccine,
        drugRoute,
        firstTreatment?.drugDosage,
        firstTreatment?.limbTreated,
        firstTreatment?.conditionTreated,
        firstTreatment?.structure,
        firstTreatment?.description,
        firstTreatment?.testName,
        firstTreatment?.testResults,
        firstTreatment?.dental,
        inspectionType,
        firstTreatment?.notes,
      ]);
      return (
        <ProtocolsWidgetListItem
          key={`${item.protocolName}-${index}`}
          name={item.protocolName || ""}
          id={item.treatmentProtocolId || ""}
          description={subTitle}
          bordered={index < resentProtocols.length - 1}
          onClick={handleProtocolClick}
        />
      );
    },
    [handleProtocolClick, resentProtocols.length]
  );

  const handleCreate = useCallback(() => {
    router.push(routes.ADD_PROTOCOL);
  }, [router]);

  if (isEmpty(protocols)) {
    return (
      <Card className="flex flex-1 flex-col w-full max-w-sm sm:max-w-md xl:max-w-[calc(56rem+24px)] shadow-custom">
        <CardHeader className="flex flex-row justify-between px-4 text-base font-semibold text-tDefault">
          {t("Widget.treatmentProtocols")}
        </CardHeader>
        <CardContent className="p-6 flex min-h-40 flex-col items-center justify-center text-base font-normal text-tDefault">
          {t("Widget.noProtocols")}
          <Button
            className="mt-4"
            title={t("Protocols.createProtocol")}
            variant="outline"
            onClick={handleCreate}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-1 flex-col w-full max-w-sm sm:max-w-md xl:max-w-[calc(56rem+24px)] shadow-custom">
      <CardHeader className="flex flex-row justify-between sm:pb-0 px-4 text-base font-semibold text-tDefault">
        {t("Widget.treatmentProtocols")}
        <Link href={routes.PROTOCOLS} className="text-sm text-a0 font-medium">
          {t("Widget.seeAll")}
        </Link>
      </CardHeader>
      <CardContent className="mx-1 mt-4">
        {map(resentProtocols, renderItem)}
      </CardContent>
    </Card>
  );
});

TreatmentProtocolsWidget.displayName = "TreatmentProtocolsWidget";

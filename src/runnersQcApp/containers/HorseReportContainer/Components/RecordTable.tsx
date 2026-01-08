import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { DataTable } from "@/ui-kit/components/DataTable";
import { useTranslations } from "next-intl";
import { columnDefs } from "./columnDefs";

type RecordTableProps = {
  records: THorseMedicalRecord[];
  onItemPress: (record: any) => void;
  handleSort: (column: string) => void;
  onHorseClick?: (horseId: string) => void;
};

export const RecordTable: React.FC<RecordTableProps> = ({
  records,
  onItemPress,
  handleSort,
  onHorseClick,
}) => {
  const t = useTranslations("HorseReport");
  const desktopColumns = columnDefs({ t, onItemPress, handleSort, onHorseClick });

  return (
    <div className="w-full xl:w-2/3 bg-white rounded-[16px] mb-8 shadow overflow-hidden">
      <DataTable
        columns={desktopColumns}
        data={records}
        maxHeight="calc(100vh - 500px)"
      />
    </div>
  );
};

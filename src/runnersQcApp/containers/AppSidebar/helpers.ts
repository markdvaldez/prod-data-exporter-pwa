import routes from "@/routes";
import { getConfig } from "@/services/appConfig";
import { DashboardIcon } from "@/ui-kit/components/Icons/DashboardIcon";
import { DocumentIcon } from "@/ui-kit/components/Icons/DocumentIcon";
import { HorseQCIcon } from "@/ui-kit/components/Icons/HorseQCIcon";
import { FilterIcon } from "@/ui-kit/components/Icons/FilterIcon";
import { HistoryIcon } from "@/ui-kit/components/Icons/HistoryIcon";
import { LocationMenuIcon } from "@/ui-kit/components/Icons/LocationMenuIcon";
import { SearchIcon } from "@/ui-kit/components/Icons/SearchIcon";
import { TransactionLogIcon } from "@/ui-kit/components/Icons/TransactionLogIcon";

export const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  app: {
    name: getConfig().fullName,
    logo: getConfig().logo,
  },
  navMain: [
    {
      title: "Home",
      url: routes.DASHBOARD,
      icon: DashboardIcon,
    },
    {
      title: "Runners QC",
      url: routes.RUNNERS_QC,
      icon: DocumentIcon,
    },
  ],
};

import {
  addToProtocolAction,
  createProtocolAction,
  deleteFromProtocolsAction,
  deleteProtocolsAction,
  getAllProtocolsAction,
  updateProtocolNameAction,
  updateTreatmentTemplateAction,
} from "@/services/store/modules/protocols";
import { selectProtocolsByUserId } from "@/services/store/modules/protocols/selectors";
import { TAddToProtocolPayload } from "@/services/store/modules/protocols/types";
import {
  TreatmentProtocolCreateRequest,
  TreatmentTemplateModel,
} from "@/Types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProtocols = () => {
  const dispatch = useDispatch();

  const userProtocols = useSelector(selectProtocolsByUserId);

  const createProtocol = useCallback(
    (variables: TreatmentProtocolCreateRequest) => {
      dispatch(createProtocolAction(variables));
    },
    [dispatch]
  );

  const addToProtocol = useCallback(
    (variables: TAddToProtocolPayload) => {
      dispatch(addToProtocolAction(variables));
    },
    [dispatch]
  );

  const deleteProtocol = useCallback(
    (protocolId: string) => {
      dispatch(deleteProtocolsAction({ protocolId }));
    },
    [dispatch]
  );

  const deleteFromProtocol = useCallback(
    (protocolId: string, templateId: string) => {
      dispatch(deleteFromProtocolsAction({ protocolId, templateId }));
    },
    [dispatch]
  );

  const updateTreatmentTemplate = useCallback(
    (protocolId: string, template: TreatmentTemplateModel) => {
      dispatch(updateTreatmentTemplateAction({ protocolId, template }));
    },
    [dispatch]
  );

  const updateProtocolName = useCallback(
    ({
      protocolId,
      protocolName,
    }: {
      protocolId: string;
      protocolName: string;
    }) => {
      dispatch(updateProtocolNameAction({ protocolId, protocolName }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllProtocolsAction());
  }, [dispatch]);

  return {
    userProtocols,
    createProtocol,
    addToProtocol,
    deleteProtocol,
    updateProtocolName,
    deleteFromProtocol,
    updateTreatmentTemplate,
  };
};

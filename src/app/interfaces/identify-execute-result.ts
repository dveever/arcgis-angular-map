import IdentifyResult from "@arcgis/core/rest/support/IdentifyResult";

export interface IdentifyExecuteResult {
  results: IdentifyResult[];
  exceededTransferLimit: boolean;
}

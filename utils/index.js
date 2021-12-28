export const isBrowser = typeof window === "object";

export const SERVER_URL = "http://localhost:5000";

export function downloadObjectAsJSON(exportObj, exportName) {
  var dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(exportObj);
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

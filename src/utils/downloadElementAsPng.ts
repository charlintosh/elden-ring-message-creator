import html2canvas from "html2canvas";

export default async function downloadElementAsPng(
  element: HTMLElement,
  filename = "elden-ring-message.png",
) {
  if (!element) return;

  // Find and hide the actions div if present
  const actionsDiv = element.querySelector(
    "[data-html2canvas-ignore]",
  ) as HTMLElement;
  const originalDisplay = actionsDiv ? actionsDiv.style.display : "";

  if (actionsDiv) {
    actionsDiv.style.display = "none";
  }

  try {
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    // rethrow so callers can handle or log
    throw error;
  } finally {
    if (actionsDiv) {
      actionsDiv.style.display = originalDisplay;
    }
  }
}

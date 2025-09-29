

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// tell pdfjs which worker to use (Vite will bundle it)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Extract plain text from a PDF file (File object)
 */
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let textContent = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    content.items.forEach((item) => {
      textContent += item.str + " ";
    });
    textContent += "\n";
  }

  return textContent;
}

/**
 * Simple extraction of name/email/phone from raw text using regex heuristics.
 * This is not perfect but works for many CVs.
 */
export function extractFieldsFromText(text) {
  if (!text) return { name: "", email: "", phone: "" };

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  // phone: match groups of digits possibly separated by spaces/dashes, try for 10+ digits
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/);
  // Name heuristic: look for capitalized pair like "John Doe" in the first lines
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let name = "";
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    const line = lines[i];
    const nm = line.match(/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/);
    if (nm) {
      name = nm[0];
      break;
    }
  }
  // fallback: try to get first two capitalized words anywhere
  if (!name) {
    const nm2 = text.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+))/);
    if (nm2) name = nm2[0];
  }

  return {
    name: name || "",
    email: emailMatch ? emailMatch[0] : "",
    phone: phoneMatch ? phoneMatch[0] : "",
  };
}

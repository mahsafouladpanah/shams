import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function generateHealthPdf(elementId: string = 'shams-printable-pdf', filename: string = 'SHAMS_Health_Record.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Preserve original inline styles
  const originalStyle = element.style.cssText;

  // Make element visible & positioned for snapshot
  element.style.display = 'block';
  element.style.position = 'fixed';
  element.style.left = '0';
  element.style.top = '0';
  element.style.zIndex = '-9999';
  element.style.opacity = '1';
  element.style.width = '800px';

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High DPI rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Fix any <style> or <link> tags in clonedDoc containing oklch color syntax which crashes html2canvas
        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((styleTag) => {
          if (styleTag.textContent && (styleTag.textContent.includes('oklch') || styleTag.textContent.includes('color-mix'))) {
            styleTag.textContent = styleTag.textContent
              .replace(/oklch\([^)]+\)/g, '#0f888d')
              .replace(/color-mix\([^)]+\)/g, '#0f888d');
          }
        });

        // Target element in cloned document
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.display = 'block';
          clonedEl.style.position = 'relative';
          clonedEl.style.left = '0';
          clonedEl.style.top = '0';
          clonedEl.style.zIndex = '1';
          clonedEl.style.backgroundColor = '#ffffff';

          // Sanitize inline styles on cloned nodes
          const allNodes = clonedEl.querySelectorAll('*');
          allNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'].forEach((prop) => {
                const val = node.style.getPropertyValue(prop);
                if (val && (val.includes('oklch') || val.includes('color-mix'))) {
                  node.style.setProperty(prop, '#0f888d');
                }
              });
            }
          });
        }
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } finally {
    element.style.cssText = originalStyle;
  }
}

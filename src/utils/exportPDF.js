export async function exportToPDF(elementId = 'resume-preview') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}

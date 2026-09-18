export default function PdfViewer({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  if (!pdfUrl) return null;
  return (
    <section className="card">
      <h2>Source PDF, embedded for reading</h2>
      <p className="muted">The viewer below loads the exact source file. Use it when you want the full detail.</p>
      <object className="pdf-frame" data={pdfUrl} type="application/pdf" aria-label={`${title} source pdf`}>
        <p>
          The browser could not embed this PDF. Open it directly:{" "}
          <a href={pdfUrl} target="_blank" rel="noreferrer">{pdfUrl}</a>
        </p>
      </object>
      <p>
        <a href={pdfUrl} target="_blank" rel="noreferrer">Open PDF in a new tab</a>
      </p>
    </section>
  );
}

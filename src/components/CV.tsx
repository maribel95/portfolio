function CV() {
  return (
    <section className="cv-section" style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Vista previa del currículum</h2>

      <iframe
        src="/pdf/CV.pdf"
        width="100%"
        height="800px"
        title="Vista previa del CV"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      ></iframe>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <a
          href="/pdf/CV.pdf"
          download
          style={{
            backgroundColor: "#6f42c1",
            color: "white",
            padding: "0.8rem 1.6rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ⬇️ Descargar CV
        </a>
      </div>
    </section>
  );
}

export default CV;

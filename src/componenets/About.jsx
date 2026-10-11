import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 pb-16 pt-28 text-gray-900 sm:px-8">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-700">
            About the FTD Knowledge Assistant
          </p>
          <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">
            Answers from your FTD documents.
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            This RAG-powered assistant helps the FTD team at BNP Paribas find
            information in the team’s documents. Ask a question in everyday
            language and get an answer grounded in the available document
            knowledge base.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Ask questions</h2>
            <p className="leading-relaxed text-gray-600">
              Ask about topics covered by FTD team documents instead of
              searching through files one by one.
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Get document-based answers</h2>
            <p className="leading-relaxed text-gray-600">
              Responses are generated using information retrieved from the
              documents available to the assistant, keeping answers focused on
              the FTD team’s knowledge.
            </p>
          </article>
        </div>

        <section className="mt-8 rounded-2xl border border-emerald-900/10 bg-emerald-50 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-bold">
            Need an FTD document added?
          </h2>
          <p className="mb-5 leading-relaxed text-gray-700">
            Document ingestion is managed by the RAG administrators. If you
            have an FTD document you think should be included in the knowledge
            base, please contact the RAG team. They can review it and handle
            ingestion through the approved process.
          </p>
          <Link
            to="/ContactUs"
            className="inline-flex rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Contact the RAG team
          </Link>
        </section>
      </section>
    </main>
  );
};

export default About;

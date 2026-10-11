const ContactUs = () => {
  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 pb-16 pt-28 text-gray-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-700">
            FTD Knowledge Assistant
          </p>
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Contact the RAG team
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Have a question about the assistant or an FTD document you would
            like considered for the knowledge base? Get in touch with the team.
            Document ingestion is managed by RAG administrators.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <article className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Email
              </p>
              <h2 className="text-xl font-bold">Send us a message</h2>
              <a
                href="mailto:noman.vaseem@gmail.com"
                className="mt-2 inline-block break-all text-emerald-800 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-950"
              >
                noman.vaseem@gmail.com
              </a>
            </article>

            <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 p-6">
              <h2 className="mb-2 text-lg font-bold">Requesting document ingestion?</h2>
              <p className="leading-relaxed text-gray-700">
                Share the document details with the RAG team. An administrator
                will review it and handle any approved ingestion.
              </p>
            </div>
          </aside>

          <section className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-2 text-2xl font-bold">Get in touch</h2>
            <p className="mb-7 leading-relaxed text-gray-600">
              Tell us how we can help. Include relevant details so the team can
              direct your request.
            </p>

            <form className="space-y-5">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-800"
                  htmlFor="name"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-300 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-800"
                  htmlFor="email"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-300 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-800"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="How can the RAG team help?"
                  rows="5"
                  className="w-full resize-y rounded-xl border border-gray-300 bg-[#fffdf8] px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
              >
                Send message
              </button>
            </form>
          </section>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FTD Knowledge Assistant
        </p>
      </div>
    </main>
  );
};

export default ContactUs;

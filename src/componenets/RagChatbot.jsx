import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ultron-rag-chat-history";

const suggestedQuestions = [
  "What can I ask you?",
  "Summarize the information in my documents",
  "Find key points about a topic",
];

const loadChatHistory = () => {
  try {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory);
    if (!Array.isArray(parsedHistory)) {
      throw new Error("Saved chat history is not a list.");
    }

    return parsedHistory.filter(
      (chat) =>
        chat &&
        typeof chat.id === "string" &&
        typeof chat.title === "string" &&
        Array.isArray(chat.messages)
    );
  } catch (error) {
    console.error("Unable to load saved chat history.", error);
    return [];
  }
};

const createChatId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const RagChatbot = () => {
  const [chatHistory, setChatHistory] = useState(loadChatHistory);
  const [activeChatId, setActiveChatId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [renamingChatId, setRenamingChatId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [notice, setNotice] = useState("");
  const conversationRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (error) {
      console.error("Unable to save chat history.", error);
      setNotice("Chat history could not be saved in this browser.");
    }
  }, [chatHistory]);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendQuestion = (event) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const nextMessages = [
      ...messages,
      { id: createChatId(), text: trimmedQuestion },
    ];
    const chatId = activeChatId ?? createChatId();
    const currentChat = chatHistory.find((chat) => chat.id === chatId);
    const nextChat = {
      id: chatId,
      title: currentChat?.title ?? trimmedQuestion.slice(0, 40),
      messages: nextMessages,
      updatedAt: Date.now(),
    };

    setMessages(nextMessages);
    setActiveChatId(chatId);
    setChatHistory((history) => [
      nextChat,
      ...history.filter((chat) => chat.id !== chatId),
    ]);
    setQuestion("");
    setNotice(
      "Your RAG API is not connected yet, so Ultron cannot answer questions yet."
    );
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setNotice("");
    setQuestion("");
  };

  const openChat = (chat) => {
    setActiveChatId(chat.id);
    setMessages(chat.messages);
    setNotice("");
    setQuestion("");
    setOpenMenuId(null);
  };

  const togglePinned = (chatId) => {
    setChatHistory((history) =>
      history.map((chat) =>
        chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
    setOpenMenuId(null);
  };

  const beginRename = (chat) => {
    setRenamingChatId(chat.id);
    setRenameValue(chat.title);
    setOpenMenuId(null);
  };

  const saveRename = (chatId) => {
    const title = renameValue.trim();
    if (!title) {
      setNotice("Chat name cannot be empty.");
      return;
    }

    setChatHistory((history) =>
      history.map((chat) => (chat.id === chatId ? { ...chat, title } : chat))
    );
    setRenamingChatId(null);
    setRenameValue("");
    setNotice("");
  };

  const deleteChat = (chat) => {
    if (!window.confirm(`Delete "${chat.title}"? This cannot be undone.`)) {
      setOpenMenuId(null);
      return;
    }

    setChatHistory((history) => history.filter((item) => item.id !== chat.id));
    if (activeChatId === chat.id) {
      setActiveChatId(null);
      setMessages([]);
    }
    setOpenMenuId(null);
    setNotice("");
  };

  const sortedChatHistory = [...chatHistory].sort(
    (a, b) =>
      Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
      (b.updatedAt ?? 0) - (a.updatedAt ?? 0)
  );

  return (
    <section className="grid h-full min-h-0 w-full grid-cols-[150px_minmax(0,1fr)] overflow-hidden bg-[#fffdf8] sm:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="flex min-h-0 flex-col bg-emerald-800 p-2 text-white sm:p-4">
        <div className="mb-3 flex items-center justify-between sm:block">
          <h2 className="text-xs font-semibold sm:text-sm">Your chats</h2>
          <button
            type="button"
            onClick={startNewChat}
            className="rounded-full bg-emerald-600 px-2 py-2 text-[10px] font-semibold text-white transition hover:bg-emerald-500 sm:mt-3 sm:w-full sm:px-3 sm:text-sm"
          >
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">+ New chat</span>
          </button>
        </div>
        <nav aria-label="Chat history" className="min-h-0 flex-1 overflow-y-auto">
          {chatHistory.length ? (
            <ul className="flex flex-col gap-1">
              {sortedChatHistory.map((chat) => (
                <li key={chat.id} className="group relative min-w-0">
                  {renamingChatId === chat.id ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        saveRename(chat.id);
                      }}
                      className="flex items-center gap-1"
                    >
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(event) => setRenameValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            setRenamingChatId(null);
                            setRenameValue("");
                          }
                        }}
                        aria-label="Rename conversation"
                        className="min-w-0 flex-1 rounded-lg bg-emerald-900 px-2 py-2 text-sm text-white outline-none ring-1 ring-emerald-300"
                      />
                      <button
                        type="submit"
                        aria-label="Save conversation name"
                        className="rounded-md px-2 py-1 text-xs font-semibold hover:bg-emerald-600"
                      >
                        Save
                      </button>
                    </form>
                  ) : (
                    <div
                      className={`flex items-center gap-1 rounded-xl transition ${
                        activeChatId === chat.id
                          ? "bg-emerald-600 text-white"
                          : "text-emerald-50 hover:bg-emerald-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => openChat(chat)}
                        title={chat.title}
                        className="min-w-0 flex-1 truncate rounded-xl px-3 py-2 text-left text-sm"
                      >
                        {chat.title}
                      </button>
                      <div className="flex shrink-0 items-center pr-1">
                        <button
                          type="button"
                          onClick={() => togglePinned(chat.id)}
                          aria-label={chat.pinned ? "Unpin chat" : "Pin chat"}
                          title={chat.pinned ? "Unpin chat" : "Pin chat"}
                          className={`rounded-md px-1.5 py-1 text-sm transition hover:bg-emerald-500 ${
                            chat.pinned
                              ? "text-amber-200"
                              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                          }`}
                        >
                          📌
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((currentId) =>
                              currentId === chat.id ? null : chat.id
                            )
                          }
                          aria-label={`More options for ${chat.title}`}
                          aria-expanded={openMenuId === chat.id}
                          className="rounded-md px-1.5 py-1 text-lg leading-none opacity-0 transition hover:bg-emerald-500 group-hover:opacity-100 group-focus-within:opacity-100"
                        >
                          ⋯
                        </button>
                      </div>
                    </div>
                  )}
                  {openMenuId === chat.id && (
                    <div
                      role="menu"
                      aria-label={`Options for ${chat.title}`}
                      className="absolute right-1 top-10 z-20 w-36 rounded-xl border border-emerald-900/15 bg-white p-1.5 text-gray-800 shadow-xl"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => beginRename(chat)}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50"
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => deleteChat(chat)}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="hidden px-2 py-3 text-xs text-emerald-100 sm:block">
              Your conversations will appear here.
            </p>
          )}
        </nav>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-emerald-900/10 px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Ultron AI
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              RAG Assistant
            </h1>
          </div>
        </header>

        <div
          ref={conversationRef}
          aria-live="polite"
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-6 sm:px-8"
        >
          {messages.length === 0 ? (
            <div className="m-auto w-full max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600">
                ✦
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Ask your knowledge base
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
                Ask a question in natural language and Ultron will help you find
                information from your connected documents.
              </p>
              <div className="mt-8 grid gap-3 text-left lg:grid-cols-3">
                {suggestedQuestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuestion(suggestion)}
                    className="rounded-2xl border border-emerald-900/10 bg-white px-4 py-3 text-sm text-gray-700 transition hover:border-emerald-600/50 hover:bg-emerald-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-700 px-4 py-3 text-sm leading-6 text-white sm:max-w-[70%]">
                  {message.text}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-emerald-900/10 bg-[#fffdf8] px-4 py-4 sm:px-8">
          {notice && (
            <p role="status" className="mb-3 text-center text-xs text-amber-800">
              {notice}
            </p>
          )}
          <form
            onSubmit={sendQuestion}
            className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-emerald-900/15 bg-white p-2 shadow-sm focus-within:border-emerald-700"
          >
            <label className="sr-only" htmlFor="rag-question">
              Ask Ultron a question
            </label>
            <textarea
              id="rag-question"
              rows="1"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form.requestSubmit();
                }
              }}
              placeholder="Ask a question about your documents..."
              className="max-h-32 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              aria-label="Send question"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl text-white transition ${
                question.trim()
                  ? "bg-emerald-800 hover:bg-emerald-900"
                  : "cursor-not-allowed bg-emerald-300"
              }`}
            >
              ↑
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-gray-500">
            Ultron can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RagChatbot;

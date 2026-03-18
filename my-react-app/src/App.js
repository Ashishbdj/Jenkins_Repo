import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dark, setDark] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title || !content) return;

    await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/notes/${id}`, {
      method: "DELETE"
    });
    fetchNotes();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            📝 Notes App
          </h1>

          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="max-w-5xl mx-auto p-6">

          {/* Search */}
          <input
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg border dark:bg-gray-800 dark:text-white"
          />

          {/* Add Note */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <input
              className="w-full p-3 mb-4 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-3 mb-4 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              onClick={addNote}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            >
              Add Note
            </button>
          </div>

          {/* Notes */}
          {filteredNotes.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No notes found 😢
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {note.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {note.content}
                  </p>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          ↑
        </button>

      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          📝 Notes App me maine change kiya jenkins ke pipline ko check  krne ke liye
        </h1>

        {/* Add Note Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">

          <input
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your note..."
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={addNote}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition"
          >
            Add Note
          </button>

        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {note.title}
              </h3>

              <p className="text-gray-600 mb-4">
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

      </div>
    </div>
  );
}

export default App;

import { nanoid } from 'nanoid';
import notes from './notes.js';

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    createdAt,
    updatedAt,
    tags,
    body,
  };

  notes.push(newNote);

  // Validasi apakah newNote berhasil dipush ke notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: 'error',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(400);
    return response;
  }
};

const getAllNotesHandler = () => {
  return {
    status: 'success',
    data: {
      notes,
    },
  };
};

const getNotesByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const updateNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => (note.id = id));
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  } else {
    const response = h.response({
      status: 'error',
      message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => (note.id = id));

  if (index !== -1) {
    notes.splice(index, 1);

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  } else {
    const response = h.response({
      status: 'error',
      message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

export {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  updateNoteByIdHandler,
  deleteNoteByIdHandler,
};

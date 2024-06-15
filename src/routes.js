import { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, updateNoteByIdHandler, deleteNoteByIdHandler } from './handler.js';

export default [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  }
];

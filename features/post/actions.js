import { createAction } from '@reduxjs/toolkit';

// Get all
export const getAll = createAction('post/getAll');
export const getAllSuccess = createAction('post/getAllSuccess');
export const getAllError = createAction('post/getAllError');

// Get one
export const getOne = createAction('post/getOne');
export const getOneSuccess = createAction('post/getOneSuccess');
export const getOneError = createAction('post/getOneError');

// Add one
export const create = createAction('post/create');
export const createSuccess = createAction('post/createSuccess');
export const createError = createAction('post/createError');

// Update one
export const update = createAction('post/update');
export const updateSuccess = createAction('post/updateSuccess');
export const updateError = createAction('post/updateError');

// Delete one
export const deleteOne = createAction('post/deleteOne');
export const deleteSuccess = createAction('post/deleteSuccess');
export const deleteError = createAction('post/deleteError');
import express from 'express';

export const middlewareBase = [express.json(), express.urlencoded()];

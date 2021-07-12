#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm ci
npm run typeorm migration:run
npm run start:dev
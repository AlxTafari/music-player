# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # tsc + vite build
pnpm lint         # eslint
pnpm preview      # preview production build
```

## Environment

Requires `.env` in the project root:
```
VITE_BASE_URL=https://musicfun.it-incubator.app/api
VITE_API_KEY=<your_key>
VITE_ACCESS_TOKEN=<your_token>
```

## Architecture

**Feature-sliced structure** (упрощённая):
```
src/
  app/          # store.ts, App.tsx, страницы-обёртки (MainPage, ProfilePage, PageNotFound)
  common/
    components/ # переиспользуемые UI-компоненты (Header, PageNotFound)
    enums/      # константы-объекты с typeof (паттерн: object + type)
    types/      # общие TypeScript-типы (Tag, User, Images, Cover)
    routing/    # Routing.tsx + экспортируемый объект Path
  features/
    playlists/  # пример feature-модуля
      api/      # RTK Query slice (playlistsApi.ts) + типы ответов (playlistsApi.types.ts)
      ui/       # React-страницы и компоненты фичи
    tracks/     # аналогично playlists
    auth/       # аналогично playlists
```

**Стек:** React 19, TypeScript, Redux Toolkit + RTK Query, React Router v7, React Hook Form + Zod, React Toastify.

**Path aliases:** `@/` → `src/` (настроено в `vite.config.ts` и подхватывается TypeScript).

**Стили:** CSS Modules (`.module.css`) — один файл на компонент, рядом с ним.

## RTK Query

Каждая фича имеет свой `createApi`-срез. Хуки импортируются строго из `@reduxjs/toolkit/query/react`. Новый срез регистрируется в `store.ts` — добавить `reducer` и подключить `middleware`.

`baseQuery` настроен глобально с двумя заголовками: `API-KEY` (статический ключ) и `Authorization: Bearer <token>` (из `VITE_ACCESS_TOKEN`).

## API response shape (JSON:API)

Бэкенд возвращает данные в формате JSON:API. Данные всегда в `data[].attributes`, мета-пагинация в `meta`:
```ts
{ data: { id, type, attributes }[], meta: { page, pageSize, totalCount, pagesCount } }
```
Тело запроса на создание/обновление также оборачивается: `{ data: { type: '...', attributes: {...} } }`.

## Енумы

Объекты `as const` + сопутствующий `type` вместо `enum`:
```ts
export const MyEnum = { Foo: 'foo' } as const
export type MyEnum = (typeof MyEnum)[keyof typeof MyEnum]
```

## Роутинг

Объект `Path` экспортируется из `src/common/routing/Routing.tsx` и используется везде вместо строковых литералов.

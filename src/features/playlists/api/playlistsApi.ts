import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";


export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    tagTypes: ['Playlist'],
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => ({ url: `playlists` }),
            providesTags: ['Playlist'],
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: body => ({
                url: 'playlists',
                method: 'post',
                body,
            }),
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylists: build.mutation<void, string>({
            query: playlistId => ({
                    method: 'delete',
                    url: `/playlists/${playlistId}`
            }),
            invalidatesTags: ['Playlist'],

        }),
        updatePlaylists: build.mutation<void, {playlistId: string, body: UpdatePlaylistArgs}>({
            query: ({playlistId, body})=>({
                method: 'put',
                url:  `/playlists/${playlistId}`,
                body
            }),
            invalidatesTags: ['Playlist'],

        })
    }),
})

export const {useFetchPlaylistsQuery, useDeletePlaylistsMutation, useCreatePlaylistMutation, useUpdatePlaylistsMutation} = playlistsApi
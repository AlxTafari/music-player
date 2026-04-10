import {useDeletePlaylistsMutation, useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import s from "./PlaylistsPage.module.css"
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {PlayListItem} from "@/features/playlists/ui/PlaylistsPage/PlayListItem/PlayListItem.tsx";
import {EditPlaylistForm} from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx";

export const PlaylistsPage = () => {
    // 1
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const {data} = useFetchPlaylistsQuery()
    const [deletePlaylist] = useDeletePlaylistsMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlaylist(playlistId)
        }
    }

    // 3, 5
    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                    data: {
                        type: 'playlists',
                        attributes: {
                            title: playlist.attributes.title,
                            description: playlist.attributes.description,
                            tagIds: playlist.attributes.tags.map(t => t.id),
                        }
                    }
                }
            )
        } else {
            setPlaylistId(null)
        }
    }

    // 4


    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {data?.data.map(playlist => {
                    // 2
                    const isEditing = playlistId === playlist.id

                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditing ? (
                                <EditPlaylistForm playlistId={playlist.id} setPlaylistId={setPlaylistId} register={register} handleSubmit={handleSubmit} editPlaylist={editPlaylistHandler} />
                            ) : (
                                <PlayListItem playlist={playlist} deletePlaylistHandler={deletePlaylistHandler} editPlaylistHandler={editPlaylistHandler} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
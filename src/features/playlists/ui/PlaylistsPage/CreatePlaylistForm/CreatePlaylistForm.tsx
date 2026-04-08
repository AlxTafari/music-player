import {type SubmitHandler, useForm} from "react-hook-form";
import {useCreatePlaylistMutation} from "@/features/playlists/api/playlistsApi.ts";
import type {CreatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";

type FormValues = CreatePlaylistArgs['data']['attributes']


export const CreatePlaylistForm = () => {
    const { register, handleSubmit } = useForm<FormValues>()
    const [createPlaylist, result] = useCreatePlaylistMutation()

    const onSubmit: SubmitHandler<FormValues> = ({ title, description }) => {
        createPlaylist({
            data: {
                type: "playlists",
                attributes: { title, description },
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button>create playlist</button>
        </form>
    )
}
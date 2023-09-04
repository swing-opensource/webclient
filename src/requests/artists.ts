import { NotifType, useNotifStore } from "@/stores/notification";
import { paths } from "@/config";
import useAxios from "./useAxios";
import { Artist, Track, Album } from "@/interfaces";

export const getArtistData = async (hash: string, limit: number = 5) => {
  interface ArtistData {
    artist: Artist;
    tracks: Track[];
    genres: string[];
  }

  const { data, error, status } = await useAxios({
    get: true,
    url: paths.api.artist + `/${hash}?limit=${limit}`,
  });

  if (status == 404) {
    useNotifStore().showNotification("Artist not found", NotifType.Error);
  }

  if (error) {
    console.error(error);
  }

  return data as ArtistData;
};

export const getArtistAlbums = async (hash: string, limit = 6, all = false) => {
  interface ArtistAlbums {
    artistname: string;
    albums: Album[];
    eps: Album[];
    singles: Album[];
    appearances: Album[];
    compilations: Album[];
  }

  const { data, error } = await useAxios({
    get: true,
    url: paths.api.artist + `/${hash}/albums?limit=${limit}&all=${all}`,
  });

  if (error) {
    console.error(error);
  }

  return data as ArtistAlbums;
};

export const getArtistTracks = async (hash: string) => {
  const { data, error } = await useAxios({
    get: true,
    url: paths.api.artist + `/${hash}/tracks`,
  });

  if (error) {
    console.error(error);
  }

  return data.tracks as Track[];
};

export const getSimilarArtists = async (hash: string, limit = 6) => {
  const { data, error } = await useAxios({
    get: true,
    url: paths.api.artist + `/${hash}/similar?limit=${limit}`,
  });

  if (error) {
    console.error(error);
  }

  return data.artists as Artist[];
};

export async function saveArtistAsPlaylist(name: string, hash: string) {
  const { data, error } = await useAxios({
    url: paths.api.artist + `/${hash}/playlist`,
    props: {
      name,
    },
  });

  if (error) {
    console.error(error);
  }

  return data;
}

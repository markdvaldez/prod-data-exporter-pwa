declare module "get-user-media-promise" {
  interface MediaStreamConstraints {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
  }

  export default function getUserMedia(
    constraints: MediaStreamConstraints
  ): Promise<MediaStream>;
}

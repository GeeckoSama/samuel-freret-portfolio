import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  type FirebaseStorage,
} from "firebase/storage";
import { app } from "./firebase/client";

export function generatePath(id: string, file: File) {
  return `projects/${id}/${file.name}.${file.type.split("/")[1]}`;
}

export async function uploadFiles(files: { path: string; file: File }[]) {
  const storage = getStorage(app);
  const promises = [];
  for (const file of files) {
    const fileRef = ref(storage, file.path);
    promises.push(uploadBytes(fileRef, file.file));
  }
  return Promise.all(promises);
}

export async function uploadFile(id: string, file: File) {
  const storage = getStorage(app);
  const fileRef = ref(storage, generatePath(id, file));
  return uploadBytes(fileRef, file);
}

export async function uploadVideo(
  videoPath: string,
  videoFile: File,
  callback: (videoURL: string) => void
) {
  const storage = getStorage(app);
  const videoRef = ref(storage, videoPath);
  const videoUploadTask = uploadBytesResumable(videoRef, videoFile);

  videoUploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      const videoProgress = document.getElementById(
        "video-progress"
      ) as HTMLProgressElement;
      videoProgress.hidden = false;
      videoProgress.value = progress;
    },
    (error) => {
      console.log(error);
    },
    async () => {
      console.log("Finish to uploading video");
      const videoURL = await getDownloadURL(videoRef);
      callback(videoURL);
    }
  );
}

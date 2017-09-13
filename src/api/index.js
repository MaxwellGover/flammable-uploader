export function removeFileExtension (file) {
  let array = file.split('.');
  let songName = array[0];
  return songName;
}

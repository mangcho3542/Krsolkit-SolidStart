import { toBlob } from "html-to-image";
import fileSaver from "file-saver";

const extAry = [".png", ".svg", ".jpg", ".jpeg"];

export async function capture(ref: HTMLElement | null, fileName?: string) {
  if (!ref) return;

  let FileName = fileName ?? "사진";
  if (fileName) {
    let flag = true;
    for (const ext of extAry) {
      //확장자로 끝난다면
      if (fileName.endsWith(ext)) {
        flag = false;
        break;
      }
    }
    //확장자 없을 때
    if (flag) FileName += ".png";
  }

  try {
    const data = await toBlob(ref);
    if (!data) return;
    fileSaver.saveAs(data, FileName);
  } catch (err) {
    console.error(err);
  }
}
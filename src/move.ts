// Please update this type as same as with the data shape.
type List = Folder[];

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type File = {
  id: string;
  name: string;
};

export default function move(list: List, source: string, destination: string): List {
  let fileFound = false;
  let destinationFound = false;
  let destinationIndex = 0;
  let sourceFile: File = {
    id: '',
    name: '',
  };

  for (const folder of list) {
    // ilk dosta hedef dosya olabilir bu yüzden indexi bulmak istiyoruz
    if (folder.id === destination) {
      destinationIndex = list.indexOf(folder);
      destinationFound = true;
    }
    // source dosyayı elde ediyoruz ve kaynak klasörden siliyoruz
    for (const file of folder.files) {
      if (file.id === source) {
        sourceFile = file;
        const index = folder.files.indexOf(file, 0);
        if (index > -1) {
          folder.files.splice(index, 1);
        }
        fileFound = true;
        break;
      }
    }
    // 100 dosyalı bir sistemde destionation 1. index, source 2. indexteyse tüm foru dönmesine gerek kalmasın
    if (fileFound && destinationFound) {
      break;
    }
  }

  if (fileFound === false) {
    throw new Error('You cannot move a folder');
  } else if (destinationFound === false) {
    throw new Error('You cannot specify a file as the destination');
  }

  list[destinationIndex].files.push(sourceFile);
  return list;
}

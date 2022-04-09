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

  list.forEach(function loopFolders(folder) {
    // ilk dosta hedef dosya olabilir bu yüzden indexi bulmak istiyoruz
    if (folder.id === destination) {
      destinationIndex = list.indexOf(folder);
      destinationFound = true;
    }
    // source dosyayı elde ediyoruz ve kaynak klasörden siliyoruz
    folder.files.forEach(function loopFiles(file) {
      if (file.id === source) {
        sourceFile = file;
        const index = folder.files.indexOf(file, 0);
        if (index > -1) {
          folder.files.splice(index, 1);
        }
        fileFound = true;
      }
    });
  });

  if (fileFound === false) {
    throw new Error('You cannot move a folder');
  } else if (destinationFound === false) {
    throw new Error('You cannot specify a file as the destination');
  }

  list[destinationIndex].files.push(sourceFile);
  return list;
}

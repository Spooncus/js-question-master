// Please update this type as same as with the data shape.
type List = Folder[];

type Folder = {
  id: string;
  name: string;
  files: File[];
}

type File = {
  id: string;
  name: string;
}

export default function move(list: List, source: string, destination: string): List {

  let file_found: boolean = false
  let destination_found: boolean = false
  let destination_index: number = 0
  let source_file: File | undefined = undefined

  for(let folder of list) {
    // ilk dosta hedef dosya olabilir bu yüzden indexi bulmak istiyoruz
    if (folder.id === destination) {
      destination_index = list.indexOf(folder) 
      destination_found = true
    }

    // source dosyayı elde ediyoruz ve kaynak klasörden siliyoruz
    for(let file of folder.files) {
      if(file.id === source) {
        source_file = file
        folder.files = folder.files.filter(oneFile => oneFile.id !== file.id)
        file_found = true
        break
      }
    }
    
    // 100 dosyalı bir sistemde destionation 1. index, source 2. indexteyse tüm foru dönmesine gerek kalmasın
    if (file_found && destination_found) {
      break
    }
  }

  if(file_found === false) {
    throw new Error('You cannot move a folder');
  } else if(destination_found === false) {
    throw new Error('You cannot specify a file as the destination');
  }

  if(source_file !== undefined) {
    list[destination_index].files.push(source_file);
  }
  
  return list;
}

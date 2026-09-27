type File = {
    type: 'file';
};

type Folder = {
    type: 'folder';
    expanded: Record<string, boolean>;
    children: Record<string, File | Folder>;
};

export type FileSystemNode = File | Folder;
export type FileSystemStructure = Record<string, FileSystemNode>;
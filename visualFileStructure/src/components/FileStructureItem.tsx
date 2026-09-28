import type {FileSystemNode} from "../types.ts";
import { type MouseEvent } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFolder, FaFolderOpen  } from "react-icons/fa";
import styles from './FileStructureBar.module.scss';
import type {Dispatch, SetStateAction,} from "react";

type FileStructureItemProps = {
    name: string;
    treeNode: FileSystemNode;
    setExpanded: Dispatch<SetStateAction<Record<string, boolean>>>
}

export const FileStructureItem = ({name, treeNode, setExpanded} : FileStructureItemProps) => {
    if (treeNode.type === 'file') {
        return <div className={styles.item}>📄 {name}</div>;
    }
    const isExpandedItem = treeNode.expanded[name]
    const handleOpenFolder = () => {
        setExpanded(prev => ({...prev, [name]: true}))
    }
    const handleArrowClose = (e:MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setExpanded(prev => ({...prev, [name]: false}))
    }
    return (
        <div  onClick={() => handleOpenFolder()} className={styles.folder}>
            <div className={styles.item}>
                <span onClick={(e) => handleArrowClose(e)} className={styles.arrow}>
                    {isExpandedItem ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                </span>
                <span className={styles.folderIcon}>{isExpandedItem ? <FaFolderOpen/> : <FaFolder />}</span>
                <span className={styles.name}>{name}</span>
            </div>
            {isExpandedItem ?
                <div className={styles.children}>
                    {treeNode.children && Object.entries(treeNode.children).map(([childName, childTreeNode]) => {
                        const childNode = childTreeNode.type === 'folder' ? {...childTreeNode, expanded: treeNode.expanded} : childTreeNode
                        return (
                            <FileStructureItem key={childName} setExpanded={setExpanded} name={childName} treeNode={childNode} />
                        )
                    })}
                </div>
                : null
            }
        </div>
    );
};
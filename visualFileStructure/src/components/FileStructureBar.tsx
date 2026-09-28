import {useEffect, useState} from "react";
import type {FileSystemNode, FileSystemStructure} from "../types.ts";
import styles from './FileStructureBar.module.scss';
import {FileStructureItem} from "./FileStructureItem.tsx";

export const FileStructureBar = () => {
    const [structure, setStructure] = useState<FileSystemStructure | null>(null)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/root`).then(res => res.json()).then(data => setStructure(data))

    }, [])
    if (!structure) return <div>Загрузка...</div>;
    return (
        <aside className={styles.bar}>
            <div className={styles.header}>
                <span className={styles.title}>
                    EXPLORER
                </span>

                <button className={styles.action}>
                    ...
                </button>
            </div>
            <div className={styles.content}>
                    {
                        Object.entries(structure).map(([name, treeNode]: [string, FileSystemNode]) => {
                            const node = treeNode.type === 'folder' ? {...treeNode, expanded: expanded} : treeNode
                            return (
                                <FileStructureItem setExpanded={setExpanded} key={name} name={name} treeNode={node} />
                            )
                        })
                    }
            </div>
        </aside>
    );
};
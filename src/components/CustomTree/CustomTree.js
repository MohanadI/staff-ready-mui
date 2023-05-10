import { useEffect, useState } from 'react';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeData from './Data';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { search_container_style, tree_wrapper, hilgiht_search } from './Style.js'


const CustomTree = () => {

    const [treeData, setTreeData] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [expandedIds, setExpanedIds] = useState([]);



    useEffect(() => {
        setTreeData(TreeData);

    }, [])


    const renderData = (TreeData) => {

        return TreeData.map(node => {
            let label = node.text

            if (node.text?.toUpperCase()?.indexOf(searchVal?.trim()?.toUpperCase()) > -1 && searchVal) {

                const searchTextIdx = node.text.toUpperCase().indexOf(searchVal.toUpperCase().trim());
                const textBeginig = node.text.slice(0, searchTextIdx);
                const textEnding = node.text.slice(searchTextIdx + searchVal.trim().length);
                const searchText = node.text.slice(searchTextIdx, searchVal.trim().length + 1)
                label = <Box>
                    {textBeginig}
                    <span style={{ color: '#f50' }}>
                        {searchText}
                    </span>
                    {textEnding}
                </Box>
            }

            if (node.children) {
                return (<TreeItem key={node.value} nodeId={node.value}
                    label={label}
                >
                    {renderData(node.children)}
                </TreeItem>)
            }
            return <TreeItem key={node.value} nodeId={node.value} label={label} />
        })

    }

    const searchTree = (treeData = [], parentNode, searchVal = null, foundedIds = []) => {


        treeData.forEach(node => {


            if (node.text?.toUpperCase()?.indexOf(searchVal?.trim()?.toUpperCase()) > -1) {
                foundedIds.push(node.value);
                if (parentNode) {
                    foundedIds.push(parentNode.value)
                }
            }
            if (!node.children) {
                return;
            }
            searchTree(node.children, node, searchVal, foundedIds);
        })
    }

    const onSearch = (e) => {
        const { value } = e.target;
        const _searchVal = value === '' ? undefined : value
        const matchedIds = [];
        searchTree(treeData, null, _searchVal, matchedIds);

        setExpanedIds(matchedIds);
        setSearchVal(value)


    }


    return (
        <Box sx={tree_wrapper}>
            <Box sx={search_container_style}>
                <TextField
                    label={'Search'}
                    size='small'
                    onChange={onSearch}
                    value={searchVal}
                />
            </Box>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expandedIds}
                onNodeToggle={(e, nodeIds) => setExpanedIds(nodeIds)}
                sx={{ maxWidth: 200 }}

            >
                {renderData(TreeData)}
            </TreeView>
        </Box >
    )
}

export default (CustomTree);
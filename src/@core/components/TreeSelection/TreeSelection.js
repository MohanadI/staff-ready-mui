import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import TreeSelectionModal from './TreeSelectionModal';

const TreeSelection = React.forwardRef((props, ref) => {

    const { label, api, expandFirstNode, selectionType, customTopLevelData, setValue, name, trigger } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ text: '[no set]', value: '' });


    const openModal = () => {
        setIsOpen(true)
    }


    const onSelectedData = (selectedData) => {
        setIsOpen(false);
        setSelectedData(selectedData);
        setValue(name, selectedData);
        trigger(name);

    }


    return (<Container>
        <FormControl required={true}>
            <FormLabel>
                {label}
            </FormLabel>
            <Link
                underline='hover'
                onClick={openModal}
                sx={{ cursor: 'pointer' }}
            >
                {selectedData.text}
            </Link>
        </FormControl>

        <input type='hidden' value={selectedData.value} {...props.register(props.name, { ...props.validation })} />

        <TreeSelectionModal
            isOpen={isOpen}
            headerTitle={`Select ${label}`}
            onClose={() => setIsOpen(false)}
            api={api}
            expandFirstNode={expandFirstNode}
            selectionType={selectionType}
            customTopLevelData={customTopLevelData}
            onSelection={onSelectedData}
        />


    </Container>)


})

TreeSelection.displayName = "TreeSelection";


export default TreeSelection
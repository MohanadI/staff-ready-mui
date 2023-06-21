import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import TreeSelectionModal from './TreeSelectionModal';
import SelectEmployeeModal from './SelectEmployeeModal/SelectEmployeeModal';
import EmployeeNameForm from './SelectEmployeeModal/SubComp/EmployeeNameForm';
import withAPI from '../../../api/core';
import { CustomStyledTreeItem } from './Style';
import CustomTree from '../CustomTree/CustomTree';

const TreeSelection = React.forwardRef((props, ref) => {

    const { label, api, expandFirstNode, selectionType, customTopLevelData, setValue, name, trigger, mode } = props;

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


    return (<Box>
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

        {mode !== 'menu' ?
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
            :
            <SelectEmployeeModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                menuList={[
                    {
                        text: 'Name',
                        comp: <EmployeeNameForm onSelection={onSelectedData} />
                    },
                    {
                        text: 'Department',
                        comp: (
                            <CustomTree
                                api={props.api?.common?.departmentWorkers}
                                selectionType="employee"
                                expandFirstNode={true}
                                nodeFormatter={(node) => {
                                    return (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box sx={node.type === selectionType ? { pt: 0.75 } : {}}>
                                                {node.text}

                                            </Box>
                                            {node.type === selectionType ?
                                                <Button size={'small'} variant="outlined" onClick={(e) => onSelectedData(e, node)}>
                                                    Select
                                                </Button>
                                                : null}

                                        </Box>
                                    )
                                }}
                                styledTreeItem={() => <CustomStyledTreeItem />}
                            />
                        )
                    },
                    { text: 'Job Title' },
                    { text: 'Schedule' },
                    { text: 'Skillset' }
                ]}
            />

        }



    </Box>)


})

TreeSelection.displayName = "TreeSelection";


export default withAPI(TreeSelection)
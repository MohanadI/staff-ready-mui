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
import { extractValueFromObjPath } from '../../utils/GeneralUtils';
import Button from '@mui/material/Button'

const TreeSelection = React.forwardRef((props, ref) => {

    const { label,
        api,
        expandFirstNode,
        selectionType,
        customTopLevelData,
        name,
        mode,
        validation,
        displayPortion = 'text',
        isFormComp,
        formHookProps,
        customLayout
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ text: '[no set]', value: '' });
    // const [selectLoading, setSelectLoading] = useState(false)


    const openModal = () => {
        setIsOpen(true)
    }


    const onSelectedData = async (selectedData, mode) => {
        let data = selectedData
        if (mode === 'requestSummery') {
            // setSelectLoading(true)
            const resp = await api.common.employeeSummery(selectedData.value)
            // setSelectLoading(false)
            data = resp.data

        }
        setIsOpen(false);
        setSelectedData(data);
        formHookProps.setValue(name, data);
        formHookProps.trigger(name);

    }

    const value = formHookProps.getValues(name);

    const displayLabel = extractValueFromObjPath(displayPortion, value);

    return (<Box>

        {typeof customLayout === 'function' ?

            customLayout({ label, displayLabel, openModal }) :

            <FormControl required={true}>
                <FormLabel>
                    {label}
                </FormLabel>
                <Link
                    underline='hover'
                    onClick={openModal}
                    sx={{ cursor: 'pointer' }}
                >
                    {displayLabel || "[not set]"}
                </Link>
            </FormControl>
        }


        <input type='hidden'{...formHookProps.register(name, { ...validation })} />

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
                        comp: <EmployeeNameForm
                            onSelection={(data) => onSelectedData({ value: data?.value?.personPk }, 'requestSummery')}
                        />
                    },
                    {
                        text: 'Department',
                        comp: (
                            <CustomTree
                                api={props.api?.common?.departmentWorkers}
                                selectionType={selectionType}
                                expandFirstNode={true}
                                mode={'selection'}
                                onSelection={(data) => onSelectedData(data, 'requestSummery')}
                                styledTreeItem={() => <CustomStyledTreeItem />}
                                key={'Department'}
                            // selectLoading={selectLoading}
                            />
                        )
                    },
                    {
                        text: 'Job Title',
                        comp: (
                            <CustomTree
                                api={props.api?.common?.jobTitlesWorkers}
                                selectionType={selectionType}
                                expandFirstNode={true}
                                mode={'selection'}
                                onSelection={(data) => onSelectedData(data, 'requestSummery')}
                                styledTreeItem={() => <CustomStyledTreeItem />}
                                key={'Job Title'}
                            // selectLoading={selectLoading}
                            />
                        )

                    },
                    {
                        text: 'Schedule',
                        comp: (
                            <CustomTree
                                api={props.api?.common?.scheduleWorkers}
                                selectionType={selectionType}
                                expandFirstNode={true}
                                mode={'selection'}
                                onSelection={(data) => onSelectedData(data, 'requestSummery')}
                                styledTreeItem={() => <CustomStyledTreeItem />}
                                key={'Schedule'}
                            // selectLoading={selectLoading}
                            />
                        )
                    },
                    {
                        text: 'Skillset',
                        comp: (
                            <CustomTree
                                api={props.api?.common?.skillSetWorkers}
                                selectionType={selectionType}
                                expandFirstNode={true}
                                mode={'selection'}
                                onSelection={(data) => onSelectedData(data, 'requestSummery')}
                                styledTreeItem={() => <CustomStyledTreeItem />}
                                key={'Skillset'}
                            // selectLoading={selectLoading}
                            />
                        )
                    }
                ]}
            />

        }



    </Box>)


})

TreeSelection.displayName = "TreeSelection";


export default withAPI(TreeSelection)
import BulkEditSelectDocuments from "./SubComp/BulkEditSelectDocuments";

export const bulkEditConfigs = [
    {
        label: 'Select Document',
        content: <BulkEditSelectDocuments />
    },
    {
        label: 'Document Properties',
        content: <div>step 2</div>
    },
    {
        label: 'Reviewers',
        content: <div>step 3</div>
    },
    {
        label: 'Final Reviewers',
        content: <div>step 4</div>
    },
    {
        label: 'Approvers',
        content: <div>step 4</div>
    },
    {
        label: 'Summary',
        content: <div>step 4</div>
    }
]
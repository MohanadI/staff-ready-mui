import BulkEditDocumentProperties from "./SubComp/BulkEditDocumentProperties";
import BulkEditReviewersApprovals from "./SubComp/BulkEditReviewersApprovals";
import BulkEditSelectDocuments from "./SubComp/BulkEditSelectDocuments";
import BulkEditSummary from "./SubComp/BulkEditSummary";

export const bulkEditConfigs = [
    {
        label: 'Select Document',
        content: <BulkEditSelectDocuments />
    },
    {
        label: 'Document Properties',
        content: <BulkEditDocumentProperties />
    },
    {
        label: 'Reviewers',
        content: <BulkEditReviewersApprovals
            type="reviewers"
            warningMsg={"IMPORTANT: Documents that use Location Review Teams will NOT be affected by this step."}
            radioBtn={[
                {
                    label: "Add reviewers to selected documents",
                    value: "add"
                },
                {
                    label: "Replace reviewers on selected documents",
                    value: "replace"
                }
            ]}
            fieldNames={[
                {
                    value: "mode"
                },
                {
                    value: 'reviewer',
                    label: 'Add Reviewer'
                }
            ]}
        />
    },
    {
        label: 'Final Reviewers',
        content: <BulkEditReviewersApprovals
            type="finalReviewers"
            radioBtn={[
                {
                    label: "Add final reviewers to selected documents",
                    value: "add"
                },
                {
                    label: "Replace final reviewers on selected documents",
                    value: "replace"
                }
            ]}
            fieldNames={[
                {
                    value: "mode"
                },
                {
                    value: 'finalReviewer',
                    label: 'Add Final Reviewer'
                }
            ]}
        />
    },
    {
        label: 'Approvers',
        content: <BulkEditReviewersApprovals
            type="approvers"
            warningMsg="IMPORTANT: Documents that use Site Approvers will NOT be affected by this step."
            radioBtn={[
                {
                    label: "Add approvers to selected documents",
                    value: "add"
                },
                {
                    label: "Replace approvers on selected documents",
                    value: "replace"
                }
            ]}
            fieldNames={[
                {
                    value: "mode"
                },
                {
                    value: 'approver',
                    label: 'Add Approver'
                }
            ]}
        />
    },
    {
        label: 'Summary',
        content: <BulkEditSummary />
    }
]
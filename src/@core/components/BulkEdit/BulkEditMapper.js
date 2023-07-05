class BulkEditMappers {

    static compToApiMapper(data) {

        return {
            improvePks: data?.selectedRows,
            classificationPk: data?.documentProperties?.classification?.value,
            subjectPk: data?.documentProperties?.subject?.value,
            ownerPk: data?.documentProperties?.documentOwner?.personPk,
            recurAssessment: data?.documentProperties?.revisionSchedule,
            access: data?.documentProperties?.access,
            locationsAddReplace: data?.documentProperties?.locationMode,
            // "locationPks": [
            //     "-2147477988"
            // ],
            reviewersAddReplace: data?.reviewers?.mode,
            reviewerPks: data?.reviewers?.persons?.map(person => person.personPk),
            finalReviewersAddReplace: data?.finalReviewers?.mode,
            finalReviewerPks: data?.finalReviewers?.persons.map(person => person.personPk),
            approversAddReplace: data?.approvers?.mode,
            approverPks: data?.approvers?.persons?.map(person => person.personPk)
        }
    }

}

export default BulkEditMappers;
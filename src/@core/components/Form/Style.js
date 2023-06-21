function Style(theme) {

    return {
        formErrorIcon: {
            position: 'relative',
            top: '2px',
            mr: 0.25,
            fontSize: theme.form.errorMsgFontSize
        },
        formErrorMsg: {
            color: theme.form.errorMsgColor,
            fontSize: theme.form.errorMsgFontSize,
            marginTop: theme.form.errorMsgTopSpace
        },
        formErrorBorder: {
            border: `1px solid ${theme.form.errorMsgColor}`
        }

    }
}


export default Style;
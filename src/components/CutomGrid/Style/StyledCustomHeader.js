
import styled from "@emotion/styled"
import CustomHeader from "../SubComponents/CustomHeader"
const StyledCustomHeader = styled(CustomHeader)((theme) => {
    return {
        '&.custom-header-wrapper': {
            backgroundColor: 'red'
        }
    }
})

export default StyledCustomHeader
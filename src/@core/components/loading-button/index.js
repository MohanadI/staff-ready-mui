import { LoadingButton } from "@mui/lab"

export default function LoadingButton({ url, text, props}){
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingButton
            loading={isLoading}
            {...props}
        >
        {text}
        </LoadingButton>
    )
}
import BasicLayout from "../../layouts/BasicLayout.tsx";
import SignUpComponent from "../../components/PhoneSingUpComponent.tsx";


function SignupPage() {
    return (
        <BasicLayout>
            <div className='w-1/2 justify-center h-full'>
                <SignUpComponent></SignUpComponent>
            </div>

        </BasicLayout>
    );
}

export default SignupPage;
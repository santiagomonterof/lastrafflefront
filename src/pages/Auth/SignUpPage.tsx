
import { Routes } from "../../routes/CONSTANTS";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import useUserInfo from "../../hooks/useUserInfo";
import NavbarNext from "../../Components/NavbarNext";
import { Typography } from "@material-tailwind/react";
import { Button, Card, Image, Input } from "@nextui-org/react";
import { title, subtitle } from '../../Components/primitives';

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { getUserInfo } = useUserInfo();

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AuthService.signUp({
            first_name: name, last_name: lastName, username: email, phone, email, password
        }).then(() => {
            AuthService.login({ username: email, password: password })
                .then(response => {
                    localStorage.setItem('access_token', response.access);
                    localStorage.setItem('refresh_token', response.refresh);
                    getUserInfo();
                    navigate(Routes.HOME);
                })
        }).catch((response) => {
            response.response.data.detail ? setError(response.response.data.detail) :
                setError("An error occurred, please try again later");
        });
    }

    return (<>
        <NavbarNext />
        <div className="w-full flex justify-center">
            <section className="flex items-center justify-between gap-4 py-8 md:py-10 w-[1280px] px-6">
                <div className="relative">
                    <Image
                        isBlurred
                        width={700}
                        src="../../../public/images/giveaway.png"
                        alt="Descripción de la imagen"
                        className="z-0"
                    />
                    <div className="">
                        <div className="inline-block max-w-lg text-center justify-center absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <h1 className={title()}>Join&nbsp;</h1>
                            <h1 className={title()}>our&nbsp;</h1>
                            <h1 className={title({ color: "yellow" })}>exclusive&nbsp;</h1>
                            <br />
                            <h1 className={title()}>
                                giveaways and win fantastic prizes
                            </h1>
                            <h2 className={subtitle({ class: "mt-6" })}>
                                Don't miss out on the fun – enter now!
                            </h2>
                        </div>
                    </div>
                </div>
                <Card className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                    <h1 className="text-2xl font-bold">Sign In</h1>
                    <form className="space-y-6" onSubmit={(e) => onFormSubmit(e)}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="red" className="-mb-3">
                                {error}
                            </Typography>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="Name"
                                    type="text"
                                    label="Name"
                                    value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="Lastname"
                                    type="text"
                                    label="Lastname"
                                    value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="Phone"
                                    type="number"
                                    label="Phone"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="Email"
                                    type="email"
                                    label="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button className="w-full dark:bg-blue-600"
                            type="submit"
                        >Sign Up</Button>
                    </form>
                    <div className="my-6 flex items-center justify-center">
                        <div className="h-px w-full bg-gray-600" />
                        <span className="px-3 text-sm text-gray-400">OR</span>
                        <div className="h-px w-full bg-gray-600" />
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-400">Already have an account?</span>
                        <a className="ml-1 text-sm text-blue-500 hover:underline" href={Routes.AUTH.LOGIN}
                        >
                            Log In
                        </a>
                    </div>
                </Card>
            </section>
        </div>
    </>);
}

export default SignUpPage;
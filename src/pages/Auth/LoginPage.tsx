
import NavbarComponent from "../../Components/NavbarComponent";
import { Routes } from "../../routes/CONSTANTS";
import { AuthService } from "../../services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import { Button, Card, Image, Input } from "@nextui-org/react";
import { GithubIcon, IconGoogle } from "../../assets/icons/icons";
import { title, subtitle } from '../../Components/primitives';
import NavbarNext from "../../Components/NavbarNext";
import { Typography } from "@material-tailwind/react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { getUserInfo } = useUserInfo();

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        AuthService.login({ username: email, password: password })
            .then(response => {
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                getUserInfo();
                navigate(Routes.HOME);
            }).catch(() => {
                setError("Invalid credentials");
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
                    <h1 className="text-2xl font-bold">Log In</h1>
                    <form className="space-y-6" onSubmit={(e) => onFormSubmit(e)}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="red" className="-mb-3">
                                {error}
                            </Typography>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    className="w-full"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        id="remember-me"
                                        type="checkbox"
                                    />
                                    <label className="ml-2 block text-sm" htmlFor="remember-me">
                                        Remember me
                                    </label>
                                </div>
                                <a className="text-sm text-blue-500 hover:underline" href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <Button className="w-full dark:bg-blue-600"
                                type="submit"
                            >Log In</Button>
                        </div>

                    </form>
                    <div className="my-6 flex items-center justify-center">
                        <div className="h-px w-full bg-gray-600" />
                        <span className="px-3 text-sm text-gray-400">OR</span>
                        <div className="h-px w-full bg-gray-600" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Button
                            color="primary"
                            className="flex items-center justify-center space-x-2">
                            <IconGoogle className="h-5 w-5 text-red-500" />
                            <span>Continue with Google</span>
                        </Button>
                        <Button className="flex items-center justify-center space-x-2 bg-[#333] text-white hover:bg-[#444]">
                            <GithubIcon className="h-5 w-5" />
                            <span>Continue with Github</span>
                        </Button>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-400">Need to create an account?</span>
                        <a className="ml-1 text-sm text-blue-500 hover:underline"
                            href={Routes.AUTH.REGISTER}
                        >
                            Sign Up
                        </a>
                    </div>
                </Card>
            </section>
        </div>
    </>);
}

export default LoginPage;
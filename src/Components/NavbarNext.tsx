import useUserInfo from "../hooks/useUserInfo";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/dropdown";
import { DownArrowIcon, GithubIcon, Logo } from "../assets/icons/icons";
import { ThemeSwitch } from "./theme-switch";
import { Routes } from "../routes/CONSTANTS";
import { Button } from "@nextui-org/react";

const NavbarNext = () => {
    const { name, lastName, userLogOut } = useUserInfo();

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <a className="flex justify-start items-center gap-1" href={Routes.HOME}>
                        <Logo />
                        <p className="font-bold text-inherit">RAFFLE</p>
                    </a>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <a aria-label="Github">
                        <GithubIcon className="text-default-500" />
                    </a>
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <a aria-label="Github">
                    <GithubIcon className="text-default-500" />
                </a>
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>
            {name !== '' &&
                <>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                            >
                                {`${name} ${lastName}`}
                                <DownArrowIcon
                                    className="w-4 h-4"
                                />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new"
                                as={'a'} href={Routes.RAFFLES.MY_RAFFLES}>
                                Mis Rifas
                            </DropdownItem>
                            <DropdownItem key="copy"
                                as={'a'} href={Routes.RAFFLES.PARTICIPATING}
                            >
                                Participaciones
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                    <Button className="border-danger text-danger font-semibold"
                        variant="bordered"
                        onClick={() => userLogOut()}
                    >
                        Sign out
                    </Button>
                </>
            }
        </NextUINavbar>
    );
}

export default NavbarNext;





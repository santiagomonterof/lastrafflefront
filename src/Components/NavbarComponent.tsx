import { Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import { Routes } from "../routes/CONSTANTS";
import useUserInfo from "../hooks/useUserInfo";

const NavbarComponent = () => {
	const { name, lastName, userLogOut } = useUserInfo();

	return (
		<Navbar className="bg-dark-blue/100 sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 border-0 border-b-2 border-blue-gray-900 ">
			<div className="flex items-center justify-between">
				<Typography
					as="a"
					href={Routes.HOME}
					className="mr-4 cursor-pointer py-1.5 font-medium text-lg lg:text-xl"
				>
					Rifas
				</Typography>
				<div className="flex items-center gap-4">
					<div className="mr-4 hidden lg:block"></div>
					<div className="flex items-center gap-x-1">
						{name !== '' && 
						<Menu>
							<MenuHandler>
								<Typography className="cursor-pointer flex items-center">
									{`${name} ${lastName}`}
									<svg width="6" height="3" className="ml-2 overflow-visible" aria-hidden="true"><path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
								</Typography>
							</MenuHandler>
							<MenuList className="bg-[#0f172a]/100">
								<MenuItem>
									<Typography
										className="hidden lg:inline-block text-white"
										as={'a'} href={Routes.RAFFLES.MY_RAFFLES}
									>
										Mis Rifas
									</Typography>
								</MenuItem>
								<MenuItem>
									<Typography
										className="hidden lg:inline-block text-white"
										as={'a'} href={Routes.RAFFLES.PARTICIPATING}
									>
										Participaciones
									</Typography>
								</MenuItem>
								<MenuItem>
									<Typography
										className="hidden lg:inline-block text-white"
										onClick={() => userLogOut()}
									>
										Cerrar Sesión
									</Typography>
								</MenuItem>
							</MenuList>
						</Menu>}
					</div>
				</div>
			</div>
		</Navbar>
	);
}

export default NavbarComponent;
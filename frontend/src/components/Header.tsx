import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

import { Avatar, AvatarFallback } from "./ui/avatar";

import logo from "../assets/logo.svg";

export function Header() {
	const { user, isAuthenticated } = useAuthStore();
	const location = useLocation();

	const navLinks = [
		{ label: "Dashboard", path: "/" },
		{ label: "Transações", path: "/transactions" },
		{ label: "Categorias", path: "/categories" },
	];

	return (
		<div className="w-full">
			{isAuthenticated &&
				<header className="w-full border-b border-gray-200 bg-white">
					<div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8">
						<div className="flex items-center justify-between w-full px-12 py-4">

							{/* Logo */}
							<div className="flex items-center min-w-48">
								<img src={logo} alt="Logo Financy" className="h-6 w-auto" />
							</div>

							{/* Links */}
							<nav className="flex items-center gap-8">
								{navLinks.map((link) => {
									const isActive = location.pathname === link.path;
									return (
										<Link
											key={link.path}
											to={link.path}
											className={`text-sm transition-colors ${isActive
												? "font-semibold text-brand-base"
												: "font-semibold text-gray-600 hover:text-brand-base hover:underline hover:underline-offset-4 decoration-brand-base"
												}`}
										>
											{link.label}
										</Link>
									);
								})}
							</nav>

							{/* Avatar */}
							<div className="flex items-center justify-end min-w-48">
								<Link to="/profile" title="Meu Perfil" className="cursor-pointer">
									<Avatar className="size-9 bg-gray-300 transition-opacity hover:opacity-80">
										<AvatarFallback className="bg-transparent text-xs font-semibold text-gray-800">
											{(() => {
												const parts = user?.name?.trim().split(/\s+/) || [];
												if (!parts.length || !parts[0]) return "?";
												return (parts.length === 1
													? parts[0].slice(0, 2)
													: `${parts[0][0]}${parts[parts.length - 1][0]}`
												).toUpperCase();
											})()}
										</AvatarFallback>
									</Avatar>
								</Link>
							</div>
						</div>
					</div>
				</header>
			}
		</div>
	)
}
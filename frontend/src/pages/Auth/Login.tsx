import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
	Eye,
	EyeClosed,
	Lock,
	Mail,
	UserPlus
} from "lucide-react";
import logo from "../../assets/logo.svg";

export function Login() {
	const savedEmail = localStorage.getItem("@financy:remember_email");

	const [email, setEmail] = useState(savedEmail || "");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);


	const login = useAuthStore((state) => state.login);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const loginMutate = await login({
				email,
				password
			});

			if (loginMutate) {
				if (rememberMe) {
					localStorage.setItem("@financy:remember_email", email);
				} else {
					localStorage.removeItem("@financy:remember_email");
				}

				toast.success("Login realizado com sucesso!");
			};

		} catch {
			toast.error("Erro ao realizar login. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
			<img src={logo} alt="Logo Financy" className="mb-8 h-8 w-auto" />

			{/* Card principal */}
			<Card className="w-full max-w-110 border border-gray-200 bg-white p-6 shadow-sm [--card-spacing:--spacing(0)] gap-6">
				<CardHeader className="text-center">
					<CardTitle className="text-xl font-bold text-gray-800">
						Fazer login
					</CardTitle>
					<CardDescription className="text-sm text-gray-600">
						Entre na sua conta para continuar
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					<form
						onSubmit={handleLogin}
						className="space-y-4"
					>
						{/* E-mail */}
						<div className="group space-y-1.5 text-left">
							<Label htmlFor="email" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer">
								E-mail
							</Label>
							<div className="relative flex items-center">
								<Mail className="absolute left-3.5 size-4 text-gray-400 transition-colors group-focus-within:text-brand-base pointer-events-none" />
								<Input
									id="email"
									type="email"
									placeholder="mail@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="h-12 rounded-xl border border-gray-300 bg-white text-[16px] text-gray-800 placeholder:text-gray-400 pl-10 pr-3.5 transition-colors outline-none caret-brand-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
								/>
							</div>
						</div>

						{/* Senha */}
						<div className="group space-y-1.5 text-left">
							<Label htmlFor="password" className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base pointer-events-none">
								Senha
							</Label>
							<div className="relative flex items-center">
								<Lock className="absolute left-3.5 size-4 pointer-events-none text-gray-400 transition-colors group-focus-within:text-brand-base" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Digite sua senha"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="h-12 rounded-xl border border-gray-300 bg-white text-[16px] text-gray-800 placeholder:text-gray-400 pl-10 pr-3.5 transition-colors outline-none caret-brand-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
								/>
								<Button
									type="button"
									variant="ghost"
									className="absolute right-3.5 text-gray-700 hover:text-gray-600 cursor-pointer"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? (
										<Eye className="size-4" />
									) : (<EyeClosed className="size-4" />

									)}
								</Button>
							</div>
						</div>

						{/* Lembrar-me e Recuperar senha */}
						<div className="flex items-center justify-between pt-1 text-xs">
							<div className="flex items-center gap-2">
								<Checkbox
									id="remember"
									checked={rememberMe}
									onCheckedChange={(checked) => setRememberMe(!!checked)}
								/>
								<Label
									htmlFor="remember"
									className="text-sm font-normal text-gray-600 cursor-pointer select-none leading-none">
									Lembrar-me
								</Label>
							</div>

							{/* <Link to="#" className="text-sm font-medium text-brand-base hover:underline">
								Recuperar senha
							</Link> */}
							<Button
								type="button"
								variant="link"
								onClick={() => toast.info("A funcionalidade de recuperação de senha estará disponível em breve.")}
								className="text-sm font-medium text-brand-base hover:underline cursor-pointer bg-transparent border-none p-0"
							>
								Recuperar senha
							</Button>
						</div>

						{/* Botão Entrar */}
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-12 bg-brand-base hover:bg-brand-dark text-white text-[16px] font-medium rounded-lg mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Entrar
						</Button>
					</form>

					{/* Divisor "ou" */}
					<div className="relative my-6 flex items-center justify-center">
						<div className="w-full border-t border-gray-300" />
						<span className="absolute bg-white px-3 text-xs text-gray-500">ou</span>
					</div>

					{/* Seção Criar conta */}
					<div className="text-center">
						<p className="mb-3 text-xs text-gray-600">Ainda não tem uma conta?</p>
						<Button
							variant="outline"
							render={<Link to="/signup" />}
							className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg cursor-pointer bg-white flex items-center justify-center gap-2"
						>
							<UserPlus className="size-4 shrink-0" />
							Criar conta
						</Button>
					</div>

				</CardContent>
			</Card>
		</div>
	)
}
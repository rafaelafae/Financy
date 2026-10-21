import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";
import { LogOut, Mail, User as UserIcon } from "lucide-react";

import { Page } from "@/components/Page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { UPDATE_USER } from "@/lib/graphql/mutations/User";
import { UpdateUserResponse, UpdateUserVariables } from "@/types";

export function ProfilePage() {
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const logout = useAuthStore((state) => state.logout);

	const [name, setName] = useState(user?.name ?? "");

	const email = user?.email ?? "";

	const [updateUserMutation, { loading: isSaving }] = useMutation<
		UpdateUserResponse,
		UpdateUserVariables
	>(UPDATE_USER, {
		onCompleted(data) {
			if (data?.updateUser && user) {
				setUser({
					...user,
					...data.updateUser,
				});
				toast.success("Alterações salvas com sucesso!");
			}
		},
		onError(error) {
			toast.error(error.message || "Erro ao salvar alterações.");
		},
	});

	// Iniciais do Avatar
	const initials = (name || user?.name || "U")
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");

	async function handleSaveChanges(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("O nome não pode estar em branco.");
			return;
		}

		if (!user?.id) {
			toast.error("Usuário não identificado.");
			return;
		}

		await updateUserMutation({
			variables: {
				id: user.id,
				data: {
					name: name.trim(),
				},
			},
		});
	}

	function handleLogout() {
		logout();
		navigate("/login");
		toast.success("Sessão encerrada com sucesso.");
	}

	return (
		<Page>
			<div className="flex w-full items-center justify-center py-6">
				<Card className="w-full max-w-md border border-gray-200 bg-white p-8 gap-8">
					<CardContent className="p-0">
						{/* Secção do Topo / Avatar */}
						<CardHeader className="flex flex-col items-center text-center gap-6">
							<div className="size-16 rounded-full bg-gray-300 border border-gray-300 text-gray-800 flex items-center justify-center text-[24px] font-medium tracking-tight select-none">
								{initials}
							</div>
							<div>
								<CardTitle className="text-xl font-semibold text-gray-800 tracking-tight">
									{name || "Utilizador"}
								</CardTitle>
								<CardDescription className="text-[16px] text-gray-500">
									{email}
								</CardDescription>
							</div>
						</CardHeader>

						{/* Separador */}
						<div className="my-8 w-full border-t border-gray-200" />

						{/* Formulário */}
						<form onSubmit={handleSaveChanges} className="space-y-4">
							{/* Nome completo */}
							<div className="group space-y-2 text-left">
								<Label
									htmlFor="name"
									className="text-sm font-medium text-gray-700 transition-colors group-focus-within:text-brand-base cursor-pointer"
								>
									Nome completo
								</Label>
								<div className="relative flex items-center">
									<UserIcon className="absolute left-3.5 size-4 text-gray-800 transition-colors group-focus-within:text-brand-base pointer-events-none" />
									<Input
										id="name"
										type="text"
										placeholder="Seu nome completo"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
										className="h-12 rounded-xl border border-gray-300 bg-white text-[16px] text-gray-800 placeholder:text-gray-400 pl-10 pr-3.5 transition-colors outline-none caret-brand-base focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300 disabled:opacity-50"
									/>
								</div>
							</div>

							{/* E-mail (Desativado) */}
							<div className="space-y-2 text-left">
								<Label
									htmlFor="email"
									className="text-sm font-medium text-gray-700"
								>
									E-mail
								</Label>
								<div className="relative flex items-center">
									<Mail className="absolute left-3.5 size-4 text-gray-400 pointer-events-none" />
									<Input
										id="email"
										type="email"
										value={email}
										readOnly
										disabled
										className="h-12 rounded-xl border border-gray-300 bg-gray-50 text-[16px] text-gray-500 pl-10 pr-3.5 cursor-not-allowed outline-none focus-visible:ring-0"
									/>
								</div>
								<p className="text-xs text-gray-500 font-normal">
									O e-mail não pode ser alterado
								</p>
							</div>

							{/* Botões de Ação */}
							<div className="pt-4 flex flex-col gap-4">
								<Button
									type="submit"
									disabled={isSaving}
									className="w-full h-12 bg-brand-base hover:bg-brand-dark text-white text-[16px] font-medium rounded-lg cursor-pointer shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isSaving ? "A salvar..." : "Salvar alterações"}
								</Button>

								<Button
									type="button"
									variant="outline"
									onClick={handleLogout}
									className="w-full h-12 border-gray-300 text-gray-700 hover:text-gray-700 hover:bg-gray-200 text-[16px] font-medium rounded-lg cursor-pointer bg-white transition-colors flex items-center justify-center gap-2"
								>
									<LogOut className="size-4 shrink-0 text-tag-red-base" />
									<span>Sair da conta</span>
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</Page>
	);
}
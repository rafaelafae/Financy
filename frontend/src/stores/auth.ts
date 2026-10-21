import { persist } from "zustand/middleware";
import { create } from "zustand";
import { apolloClient } from "@/lib/graphql/apollo";
import { REGISTER } from "@/lib/graphql/mutations/Register";
import { LOGIN } from "@/lib/graphql/mutations/Login";
import { LoginInput, RegisterInput, User } from "@/types";

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (data: LoginInput) => Promise<boolean>
    signup: (data: RegisterInput) => Promise<boolean>
    setUser: (user: User) => void
    logout: () => void
}

type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: User
    }
}

type RegisterMutationData = {
    register: {
        token: string
        refreshToken: string
        user: User
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (loginData: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                        mutation: LOGIN,
                        variables: {
                            data: {
                                email: loginData.email,
                                password: loginData.password
                            }
                        }
                    });

                    if (data?.login) {
                        const { token, user } = data.login;

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        });

                        return true;
                    }

                    return false;
                } catch (error) {
                    console.log("Erro ao fazer o login");
                    throw error;
                }
            },

            signup: async (registerData: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
                        mutation: REGISTER,
                        variables: {
                            data: {
                                name: registerData.name,
                                email: registerData.email,
                                password: registerData.password
                            }
                        }
                    });

                    if (data?.register) {
                        const { token, user } = data.register;

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        });

                        return true;
                    }

                    return false;
                } catch (error) {
                    console.log("Erro ao fazer o cadastro");
                    throw error;
                }
            },

            setUser: (user: User) => {
                set({ user });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                });

                apolloClient.clearStore();
            },
        }),
        {
            name: "auth-storage"
        }
    )
);
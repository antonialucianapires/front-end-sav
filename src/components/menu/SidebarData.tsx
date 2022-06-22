import { Bell, Calendar, Chalkboard, ChartPie, Exam, Gear, House, SignOut, Users } from "phosphor-react";

export const SidebarData = [
    {
        title: "início",
        icon: <House size={24} />,
        link: "/inicio"
    },
    {
        title: "relatórios",
        icon: <ChartPie size={24} />,
        link: "/relatorios"
    },
    {
        title: "períodos",
        icon: <Calendar size={24} />,
        link: "/periodos"
    },
    {
        title: "avaliações",
        icon: <Exam size={24} />,
        link: "/avaliacoes"
    },
    {
        title: "usuários",
        icon: <Users size={24} />,
        link: "/usuarios"
    },
    {
        title: "turmas",
        icon: <Chalkboard size={24} />,
        link: "/turmas"
    },
    {
        title: "avisos",
        icon: <Bell size={24} />,
        link: "/avisos"
    },
    {
        title: "configurações",
        icon: <Gear size={24} />,
        link: "/configuracoes"
    },
    {
        title: "sair",
        icon: <SignOut size={24} />,
        link: "/sair"
    }
];
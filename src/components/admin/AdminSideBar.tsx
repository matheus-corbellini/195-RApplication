import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin/Sidebar.css";
import {
  DollarSign,
  TrendingUp,
  Users,
  Heart,
  Calendar,
  Home,
  LogOut,
  X,
  Shield,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface AdminSideBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSideBar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: AdminSideBarProps) {
  const menuItems = [
    {
      id: "faturamento",
      label: "Faturamento",
      icon: <TrendingUp size={20} />,
    },
    {
      id: "baixa-pagamento",
      label: "Baixa de Pagamento",
      icon: <DollarSign size={20} />,
    },
    {
      id: "clientes-registrados",
      label: "Clientes Registrados",
      icon: <Users size={20} />,
    },
    {
      id: "animais-registrados",
      label: "Animais Registrados",
      icon: <Heart size={20} />,
    },
    {
      id: "agendamento-cremacoes",
      label: "Agendamentos",
      icon: <Calendar size={20} />,
    },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Shield size={24} color="#8b4513" />
          <span>Admin Panel</span>
        </div>
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="back-home">
          <Home size={16} /> Voltar para o site
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Sair
        </button>
      </div>
    </aside>
  );
}

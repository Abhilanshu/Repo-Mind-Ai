import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { SettingsView } from '../../components/SettingsView';
import { LogOut } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { whatsAppConfig, setWhatsAppModalOpen, user, logout } = useOutletContext<any>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 font-sans">
      <SettingsView 
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppModal={() => setWhatsAppModalOpen(true)}
        onOpenAuthModal={() => {}}
        user={user}
      />

      {/* Account Logout Action Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-rose-200 space-y-3 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#C53030]">Logout & Terminate Session</h3>
            <p className="text-xs text-[#4B5563] mt-0.5">Invalidates your authentication token and redirects to the login screen.</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition shadow-md flex items-center space-x-2 shrink-0"
          >
            <LogOut className="w-4 h-4 text-white" />
            <span>Logout Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

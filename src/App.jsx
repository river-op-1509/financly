import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  // Navegação e UI
  LayoutDashboard, FileText, Wallet, Target, Landmark, Settings, Menu,
  ChevronLeft, ChevronRight, 
  // Ação e Dados
  CreditCard, DollarSign, Plus, Trash2, TrendingUp, X, Check, Calendar, 
  Pencil, ArrowDownRight, Trophy, Building2, User, Award, 
  // Ícones de Configuração e Gráficos
  Star, Medal, Shield, Zap, Briefcase, Crown, Download, Upload, AlertTriangle, LogOut,
  Moon, Sun, Type, Minus, PlusCircle, PieChart, BarChart3, LineChart, Ghost, Home
} from 'lucide-react';

// ==========================================
// 1. CONSTANTES E HELPERS GLOBAIS
// ==========================================

const LISTA_BANCOS = [
  { nome: 'Nubank', cor: 'from-purple-600 to-purple-900' },
  { nome: 'Banco do Brasil', cor: 'from-blue-700 to-yellow-500' },
  { nome: 'Bradesco', cor: 'from-red-600 to-red-800' },
  { nome: 'Itaú', cor: 'from-orange-500 to-orange-700' },
  { nome: 'Caixa', cor: 'from-blue-600 to-orange-500' },
  { nome: 'Santander', cor: 'from-red-600 to-red-900' },
  { nome: 'Banco Inter', cor: 'from-orange-400 to-orange-600' },
  { nome: 'C6 Bank', cor: 'from-gray-800 to-black' },
  { nome: 'BTG Pactual', cor: 'from-blue-800 to-blue-950' },
  { nome: 'XP Investimentos', cor: 'from-gray-900 to-yellow-600' },
  { nome: 'Rico', cor: 'from-orange-500 to-red-600' },
  { nome: 'Banco Pan', cor: 'from-cyan-600 to-blue-600' },
  { nome: 'Neon', cor: 'from-cyan-400 to-blue-500' },
  { nome: 'Next', cor: 'from-green-400 to-green-700' },
  { nome: 'Original', cor: 'from-green-700 to-green-900' },
  { nome: 'PagBank', cor: 'from-green-500 to-yellow-400' },
  { nome: 'Mercado Pago', cor: 'from-blue-400 to-blue-600' },
  { nome: 'PicPay', cor: 'from-green-500 to-green-800' },
  { nome: 'Sicredi', cor: 'from-green-600 to-green-900' },
  { nome: 'Sicoob', cor: 'from-teal-600 to-teal-900' },
  { nome: 'Safra', cor: 'from-yellow-700 to-gray-900' },
  { nome: 'Banco do Nordeste', cor: 'from-red-500 to-yellow-500' },
  { nome: 'Banrisul', cor: 'from-blue-700 to-blue-900' },
  { nome: 'BRB', cor: 'from-blue-500 to-blue-700' },
  { nome: 'Sofisa Direto', cor: 'from-orange-500 to-orange-700' },
  { nome: 'Nomad', cor: 'from-yellow-400 to-gray-800' },
  { nome: 'Wise', cor: 'from-lime-400 to-lime-600' },
  { nome: 'Will Bank', cor: 'from-yellow-300 to-yellow-500' },
  { nome: 'Digio', cor: 'from-blue-800 to-blue-900' },
  { nome: 'Outro/Genérico', cor: 'from-gray-500 to-gray-700' }
];

const CATEGORIAS = {
  'Moradia': { cor: 'bg-blue-500', icon: '🏠' },
  'Alimentação': { cor: 'bg-orange-500', icon: '🍔' },
  'Transporte': { cor: 'bg-indigo-500', icon: '🚗' }, 
  'Lazer': { cor: 'bg-purple-500', icon: '🎉' },
  'Saúde': { cor: 'bg-rose-500', icon: '💊' },
  'Educação': { cor: 'bg-cyan-500', icon: '📚' },
  'Compras': { cor: 'bg-pink-500', icon: '🛍️' },
  'Salário': { cor: 'bg-emerald-500', icon: '💰' },
  'Investimento': { cor: 'bg-teal-500', icon: '📈' },
  'Outros': { cor: 'bg-gray-500', icon: '📦' }
};

const CONQUISTAS_SISTEMA = [
  { id: 'start', titulo: 'Recruta', desc: 'Fez o primeiro lançamento.', icon: Star, xp: 100 },
  { id: 'meta1', titulo: 'Alvo Definido', desc: 'Criou 1ª meta.', icon: Target, xp: 150 },
  { id: 'banco', titulo: 'Logística', desc: 'Cadastrou banco.', icon: Landmark, xp: 200 },
  { id: 'card', titulo: 'Poder de Fogo', desc: 'Cadastrou cartão.', icon: CreditCard, xp: 200 },
  { id: 'extra', titulo: 'Mercenário', desc: 'Renda extra lançada.', icon: Zap, xp: 300 },
  { id: 'blindado', titulo: 'Bunker', desc: 'Patrimônio > R$ 5k.', icon: Shield, xp: 500 },
  { id: 'elite', titulo: 'Comandante', desc: 'Patrimônio > R$ 20k.', icon: Medal, xp: 1000 },
  { id: 'lenda', titulo: 'Lenda Viva', desc: 'Patrimônio > R$ 50k.', icon: Crown, xp: 2000 },
];

const lerDados = (chave, padrao) => {
  try { const s = localStorage.getItem(chave); return s ? JSON.parse(s) : padrao; } 
  catch (e) { return padrao; }
};

const formatarMoeda = (val) =>
  val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatarData = (dataISO) => {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
};

// PALETA DE CORES

const THEME = {
  // Cores de Ação/Semântica
  primary: { 
    base: 'blue-600', hover: 'blue-700', bg: 'bg-blue-600', bgHover: 'hover:bg-blue-700',
    text: 'text-blue-600', border: 'border-blue-600', light: 'bg-blue-50'
  },
  secondary: { base: 'indigo-600', bg: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50' },
  success: { base: 'emerald-600', bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50' },
  danger: { base: 'rose-600', bg: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50' },
  warning: { base: 'amber-500', bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50' },
  
  // CORES NEUTRAS (Layout, Bordas, Textos)
  layout: {
    bg: 'bg-[#F3F4F6]',
    bgDark: 'bg-gray-900',
    card: 'bg-white',
    cardDark: 'bg-gray-800',
    border: 'border-gray-100',
    borderDark: 'border-gray-700',
    text: 'text-gray-900',
    textDark: 'text-white',
    textSec: 'text-gray-700',
    textSecDark: 'text-gray-400'
  }
};

// ================================
// CONSTANTES DE FOCO 
// ================================

// MODO CLARO: Fundo branco
const FOCUS_LIGHT_AZUL    = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all";
const FOCUS_LIGHT_VERMELHO = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-rose-600 transition-all";

// MODO ESCURO: Fundo cinza/preto
const FOCUS_DARK_AZUL     = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-400 transition-all";
const FOCUS_DARK_BRANCO   = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all"; 
const FOCUS_DARK_VERMELHO = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-rose-400 transition-all";

// ==========================================
// 2. COMPONENTES DE UI
// ==========================================

const MetricCard = ({ title, value, icon: Icon, type = 'primary', darkMode }) => {
  
  // Mapeamento de cores semânticas e SOMBRAS coloridas
  const colorMap = {
    primary: { 
      icon: THEME.primary.text, 
      bg: THEME.primary.light,
      shadow: 'shadow-blue-500/10' 
    },
    secondary: { 
      icon: THEME.secondary.text, 
      bg: THEME.secondary.light,
      shadow: 'shadow-indigo-500/10'
    },
    success: { 
      icon: THEME.success.text, 
      bg: THEME.success.light,
      shadow: 'shadow-emerald-500/10'
    },
    danger: { 
      icon: THEME.danger.text, 
      bg: THEME.danger.light,
      shadow: 'shadow-rose-500/10'
    },
    warning: { 
      icon: THEME.warning.text, 
      bg: THEME.warning.light,
      shadow: 'shadow-amber-500/10'
    },
  };
  
  const current = colorMap[type] || colorMap.primary;

  return (
    <div className={`
      relative overflow-hidden
      p-6 rounded-2xl border transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
      ${darkMode 
        ? `${THEME.layout.cardDark} ${THEME.layout.borderDark} shadow-none` 
        : `${THEME.layout.card} ${THEME.layout.border} shadow-lg ${current.shadow}`
      }
    `}>
      <div className="flex justify-between items-start mb-4">
        <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? THEME.layout.textSecDark : THEME.layout.textSec}`}>
          {title}
        </p>
        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-700/50' : current.bg}`}>
          <Icon size={22} className={current.icon} />
        </div>
      </div>
      <h3 className={`text-3xl font-bold tracking-tight ${darkMode ? THEME.layout.textDark : THEME.layout.text}`}>
        {value}
      </h3>
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-5 ${current.bg.replace('bg-', 'bg-')}`}></div>
    </div>
  );
};

const NotificationToast = ({ message, type, onClose }) => {
  if (!message) return null;
  
  const styles = {
    success: `${THEME.success.bg} text-white border-emerald-800`,
    error: `${THEME.danger.bg} text-white border-rose-800`,
    info: `${THEME.primary.bg} text-white border-blue-800`,
    warning: `${THEME.warning.bg} text-white border-amber-600`
  };
  
  const icons = { success: <Check size={20} />, error: <X size={20} />, info: <Zap size={20} />, warning: <AlertTriangle size={20} /> };
  return (
      <div className={`fixed top-4 right-4 z-[70] flex items-center gap-3 pointer-events-none`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border-b-4 animate-bounce-in transition-all pointer-events-auto ${styles[type] || styles.info}`}>
            {icons[type]}<span className="font-bold">{message}</span>
            <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100"><X size={16}/></button>
        </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, darkMode }) => (
  <aside className={`
    w-64 border-r hidden md:flex flex-col justify-between fixed h-full z-10 transition-colors
    ${darkMode 
      ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}`
      : `${THEME.layout.card} ${THEME.layout.border} shadow-2xl shadow-blue-100/50`
    }
  `}>
    <div>
      <div className="p-8 flex items-center gap-3">
        <div className={`w-10 h-10 ${THEME.primary.bg} rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30`}>
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <span className={`text-2xl font-bold tracking-tight 
          ${darkMode ? THEME.layout.textDark : THEME.layout.text}`}>
          Financ<span className={THEME.primary.text}>ly</span>
        </span>
      </div>
      <nav className="px-4 space-y-2 mt-4">
        {[{ name: 'Dashboard', icon: LayoutDashboard }, 
        { name: 'Extrato', icon: FileText }, 
        { name: 'Gráficos', icon: PieChart }, 
        { name: 'Carteira', icon: Wallet }, 
        { name: 'Objetivos', icon: Target }, 
        { name: 'Bancos', icon: Landmark }, 
        { name: 'Configurações', icon: Settings }
      ].map((item) => 
        
        (
          <button 
            key={item.name} 
            onClick={() => setActiveTab(item.name)} 
            className={`
            flex items-center w-full px-4 py-3 rounded-xl group font-medium hover:translate-x-1 
            ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}
             ${activeTab === item.name 
                ? (darkMode ? 'bg-gray-700 font-bold text-blue-400' : `${THEME.primary.light} ${THEME.primary.text} font-bold shadow-md shadow-blue-500/10`) 
                : (darkMode ? `${THEME.layout.textSecDark} hover:bg-gray-700 hover:text-gray-200` : `${THEME.layout.textSec} hover:bg-gray-50 hover:text-gray-900`)
              }
            `}
          >
            <item.icon 
              size={20} 
              className={`mr-3 ${activeTab === item.name ? THEME.primary.text : (darkMode ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600')}`} 
            />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  </aside>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded-xl ${className}`} />
);

const MobileMenu = ({ activeTab, setActiveTab, darkMode }) => {
  const menuItems = [
    { id: 'Dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'Extrato', label: 'Extrato', icon: FileText },
    { id: 'Gráficos', label: 'Gráficos', icon: PieChart },
    { id: 'Carteira', label: 'Carteira', icon: Wallet },
    { id: 'Objetivos', label: 'Metas', icon: Target },
    { id: 'Bancos', label: 'Bancos', icon: Landmark },
    { id: 'Configurações', label: 'Ajustes', icon: Settings }
  ];

  return (
    <div className={`
      md:hidden fixed bottom-0 w-full border-t flex z-50 pb-safe transition-colors overflow-x-auto no-scrollbar
      ${darkMode 
        ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` 
        : `${THEME.layout.card} ${THEME.layout.border} shadow-2xl shadow-blue-100/50`
      }
    `}>
      <div className="flex justify-between items-center w-full min-w-max px-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`
                flex flex-col items-center justify-center p-3 min-w-[75px] rounded-xl transition-all duration-200
                /* APLICAÇÃO DO FOCO CONDICIONAL */
                ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}
                ${isActive 
                  ? `${THEME.primary.text} font-bold` 
                  : (darkMode ? THEME.layout.textSecDark : THEME.layout.textSec)
                }
              `}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
};

const Header = ({ anoAtual, mesAtualNome, mudarAno, mudarMes, usuario, setModalPerfilOpen, darkMode }) => {
  const containerClass = darkMode 
    ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` 
    : `${THEME.layout.card} ${THEME.layout.border}`;
  
  const textClass = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const iconClass = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
  const hoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  // Lógica de Foco Condicional
  const focusSetas = darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL;
  const focusPerfil = darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL;

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-fade-in">
      <div className="flex gap-4 order-2 md:order-1">
        
        {/* Seletor de Ano */}
        <div className={`flex items-center rounded-xl p-1 shadow-sm border transition-colors ${containerClass}`}>
          <button onClick={() => mudarAno(-1)} className={`p-3 rounded-xl flex items-center justify-center transition-colors ${hoverClass} ${iconClass} ${focusSetas}`}>
            <ChevronLeft size={20}/>
          </button>
          <span className={`px-4 font-bold text-lg min-w-[80px] text-center ${textClass}`}>
            {anoAtual}
          </span>
          <button onClick={() => mudarAno(1)} className={`p-3 rounded-xl flex items-center justify-center transition-colors ${hoverClass} ${iconClass} ${focusSetas}`}>
            <ChevronRight size={20}/>
          </button>
        </div>

        {/* Seletor de Mês */}
        <div className={`flex items-center rounded-xl p-1 shadow-sm border transition-colors ${containerClass}`}>
          <button onClick={() => mudarMes(-1)} className={`p-3 rounded-xl flex items-center justify-center transition-colors ${hoverClass} ${iconClass} ${focusSetas}`}>
            <ChevronLeft size={20}/>
          </button>
          <span className={`px-4 font-bold text-lg min-w-[120px] text-center capitalize ${textClass}`}>
            {mesAtualNome}
          </span>
          <button onClick={() => mudarMes(1)} className={`p-3 rounded-xl flex items-center justify-center transition-colors ${hoverClass} ${iconClass} ${focusSetas}`}>
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      {/* Botão de Perfil */}
      <div className="flex items-center gap-4 order-1 md:order-2">
        <button 
          onClick={() => setModalPerfilOpen(true)} 
          className={`w-11 h-11 ${THEME.primary.bg} ${THEME.primary.bgHover} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md transition-all duration-300 hover:scale-110 ${focusPerfil}`}>
          {usuario.nome.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  );
};

const ModalPerfil = ({ isOpen, onClose, usuario, setUsuario, conquistas }) => {
  // Estado para o modal de edição de nome
  const [editandoNome, setEditandoNome] = useState(false);
  const [nomeTemp, setNomeTemp] = useState('');

  if (!isOpen) return null;
  const xpTotal = conquistas.reduce((acc, c) => acc + c.xp, 0);
  const nivel = Math.floor(xpTotal / 200) + 1;
  const xpProximoNivel = nivel * 200;
  const progressoNivel = Math.min((xpTotal % 200) / 200 * 100, 100);

  const abrirEdicao = () => { setNomeTemp(usuario.nome); setEditandoNome(true); };
  const salvarNome = () => { if(nomeTemp) { setUsuario({...usuario, nome: nomeTemp}); setEditandoNome(false); } };

  if(editandoNome) {
      // Sub-modal simples embutido
      return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 animate-fade-in">
                <h3 className="font-bold text-lg text-gray-900">Alterar Nome</h3>
                <input className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:ring-2 focus:ring-blue-600 focus:outline-none" value={nomeTemp} onChange={e => setNomeTemp(e.target.value)} autoFocus />
                <div className="flex gap-3">
                    <button onClick={() => setEditandoNome(false)} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200">Cancelar</button>
                    <button onClick={salvarNome} className="flex-1 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h3 className="font-bold text-2xl text-gray-900 flex items-center gap-2"><User className="text-blue-600"/> Perfil</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 flex items-center justify-center"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl shadow-blue-200">{usuario.nome.charAt(0).toUpperCase()}</div>
            <div className="flex items-center gap-2 mb-1"><span className="font-bold text-2xl text-gray-900">{usuario.nome}</span><button onClick={abrirEdicao} className="text-blue-600 hover:text-blue-800"><Pencil size={16}/></button></div>
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">Nível {nivel}</span>
          </div>
          <div><div className="flex justify-between text-xs mb-1 font-bold text-gray-500 uppercase tracking-wide"><span>XP: {xpTotal}</span><span>Próx: {xpProximoNivel}</span></div><div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden"><div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-1000" style={{ width: `${progressoNivel}%` }}></div></div></div>
          <div><h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg"><Award className="text-amber-500"/> Conquistas</h4><div className="space-y-3">{CONQUISTAS_SISTEMA.map(c => { const desbloqueado = conquistas.some(item => item.id === c.id); return (<div key={c.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${desbloqueado ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50 opacity-60 grayscale'}`}><div className={`p-3 rounded-full ${desbloqueado ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-400'}`}><c.icon size={24} /></div><div><h5 className="font-bold text-base text-gray-900">{c.titulo}</h5><p className="text-xs text-gray-600 font-medium">{c.desc}</p></div>{desbloqueado && <Check size={20} className="text-amber-600 ml-auto"/>}</div>)})}</div></div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, darkMode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <button onClick={onClose} className={`p-1 rounded-full flex items-center justify-center ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><X size={20}/></button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const InputMoeda = ({ value, onChange, className, placeholder, autoFocus }) => {
  const handleChange = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "");

    if (apenasNumeros === "") {
      onChange("");
      return;
    }

    const valorFloat = Number(apenasNumeros) / 100;
    onChange(valorFloat);
  };

  const displayValue = (value === '' || value === undefined)
    ? '' 
    : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <input
      type="text"
      inputMode="numeric"
      className={className}
      placeholder={placeholder || "R$ 0,00"}
      value={displayValue}
      onChange={handleChange}
      autoFocus={autoFocus}
    />
  );
};

const InputData = ({ value, onChange, className }) => {
  // Converte YYYY-MM-DD (estado) para DD/MM/AAAA (visual)
  const formatarParaVisual = (val) => {
    if (!val) return '';
    const [ano, mes, dia] = val.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const [display, setDisplay] = useState(formatarParaVisual(value));

  // Sincroniza se o valor externo mudar (ex: resetar formulário)
  useEffect(() => {
    setDisplay(formatarParaVisual(value));
  }, [value]);

  const handleChange = (e) => {
    let v = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (v.length > 8) v = v.slice(0, 8); // Limita a 8 números

    // Aplica a máscara DD/MM/AAAA
    let masked = v;
    if (v.length > 2) masked = `${v.slice(0, 2)}/${v.slice(2)}`;
    if (v.length > 4) masked = `${masked.slice(0, 5)}/${v.slice(4)}`;

    setDisplay(masked);

    // Se a data estiver completa (8 dígitos), atualiza o estado pai no formato ISO
    if (v.length === 8) {
      const dia = v.slice(0, 2);
      const mes = v.slice(2, 4);
      const ano = v.slice(4, 8);
      // Validação básica de data
      if(Number(mes) > 0 && Number(mes) <= 12 && Number(dia) > 0 && Number(dia) <= 31) {
         onChange(`${ano}-${mes}-${dia}`); 
      }
    } else if (v.length === 0) {
      onChange('');
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="DD/MM/AAAA"
      className={className}
      value={display}
      onChange={handleChange}
      maxLength={10}
    />
  );
};

const NotFoundPage = ({ onVoltar, darkMode }) => (
  <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
    <div className="text-center space-y-6 max-w-md animate-bounce-in">
      <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
        <Ghost size={64} className={darkMode ? 'text-gray-400' : 'text-blue-500'} />
      </div>
      
      <h1 className="text-6xl font-black tracking-tighter opacity-20">404</h1>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Página não encontrada</h2>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Parece que você se perdeu no caminho. A página que você tentou acessar não existe ou foi movida.
        </p>
      </div>

      <button 
        onClick={onVoltar}
        className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        <Home size={20} /> Voltar para o Início
      </button>
    </div>
  </div>
);

// ==========================================
// 3. COMPONENTES DAS ABAS (REFATORADO)
// ==========================================

const TabDashboard = ({ 
  loading,
  transacoesDoMes, 
  saldo, 
  receitas, 
  despesas, 
  totalFaturas, 
  cartoes, 
  mesAtualNome, 
  darkMode, 
  setActiveTab 
}) => {
  
  // Helpers de Estilo
  const cardClass = darkMode 
    ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}`
    : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
    
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;

  // =========================================================================
  // 1. ESTADO DE CARREGAMENTO (SKELETONS)
  // =========================================================================
  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        
        {/* Seção 1: Skeletons dos Cards de Métricas (Topo) */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border h-[150px] flex flex-col justify-between ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex justify-between items-start">
                {/* Simula o Título (ex: Saldo) */}
                <Skeleton className="h-4 w-24 rounded-md" /> 
                {/* Simula o Ícone */}
                <Skeleton className="h-10 w-10 rounded-2xl" /> 
              </div>
              {/* Simula o Valor (ex: R$ 5.000,00) */}
              <Skeleton className="h-8 w-40 rounded-lg" /> 
            </div>
          ))}
        </section>

        {/* Seção 2: Skeleton da Área de Cartões */}
        <div className={`p-6 md:p-8 rounded-2xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="flex justify-between items-center mb-8">
             {/* Simula título "Cartões Ativos" */}
             <Skeleton className="h-8 w-48 rounded-lg" /> 
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {/* Simula 3 Cartões de Crédito */}
             {[1, 2, 3].map((i) => (
               <Skeleton key={i} className="h-[220px] w-full rounded-2xl" />
             ))}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ESTADO VAZIO (SEM DADOS)
  // =========================================================================
  if (transacoesDoMes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-fade-in h-full">
         <div className={`p-8 rounded-full mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-xl shadow-blue-500/10`}>
            <LayoutDashboard size={80} strokeWidth={1.5} className={`${darkMode ? 'text-gray-600' : 'text-blue-200'}`} />
         </div>
         
         <h3 className={`text-2xl font-bold mb-3 text-center ${textMain}`}>
           Painel de {mesAtualNome} Vazio
         </h3>
         <p className={`max-w-md mx-auto mb-8 text-center text-sm ${textSec}`}>
           Você ainda não tem lançamentos registrados neste mês. Adicione sua primeira receita ou despesa para ver seus indicadores.
         </p>

         <button 
           onClick={() => setActiveTab && setActiveTab('Extrato')}
           className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-blue-500/30 flex items-center gap-2 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}
         >
            <PlusCircle size={20} />
            Adicionar primeira transação
         </button>
      </div>
    );
  }

  // =========================================================================
  // 3. RENDERIZAÇÃO NORMAL (COM DADOS)
  // =========================================================================
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Saldo (Mês)" value={formatarMoeda(saldo)} icon={Wallet} type="primary" darkMode={darkMode} />
        <MetricCard title="Receitas" value={formatarMoeda(receitas)} icon={DollarSign} type="success" darkMode={darkMode} />
        <MetricCard title="Despesas" value={formatarMoeda(despesas)} icon={ArrowDownRight} type="danger" darkMode={darkMode} />
        <MetricCard title="Fatura Cartões" value={formatarMoeda(totalFaturas)} icon={CreditCard} type="secondary" darkMode={darkMode} />
      </section>

      <div className={`${cardClass} p-6 md:p-8 rounded-2xl border`}>
        <div className="flex justify-between items-center mb-8">
            <h3 className={`font-bold text-2xl tracking-tight ${textMain}`}>Cartões Ativos</h3>
        </div>

        {cartoes.length === 0 ? (
           <p className={`text-sm ${textSec}`}>Nenhum cartão cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cartoes.map(card => { 
              const listaCompras = card.compras || [];
              const fatura = listaCompras.reduce((acc, item) => acc + item.valorParcela, 0); 
              const disponivel = card.limite - (listaCompras.reduce((acc, i) => acc + i.valorTotal, 0));
              
              return (
                <div key={card.id} className={`
                  p-6 rounded-2xl text-white bg-gradient-to-br ${card.cor} 
                  relative overflow-hidden transition-all duration-500 
                  hover:-translate-y-2 hover:shadow-2xl group
                  ${darkMode ? 'shadow-none border border-white/10' : 'shadow-xl shadow-gray-200/50'}`}>
                  <div className="absolute -right-12 -top-12 bg-white opacity-20 w-48 h-48 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                      <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-xl tracking-wide text-shadow-sm">{card.nome}</p>
                            <p className="text-[10px] uppercase opacity-70 tracking-widest mt-1">Crédito</p>
                          </div>
                          <CreditCard className="opacity-80 drop-shadow-md" size={28} />
                      </div>
                      
                      <div className="space-y-4 mt-6">
                          <div className="flex justify-between items-end border-b border-white/20 pb-3">
                              <p className="text-xs opacity-90 font-medium uppercase tracking-wider">Fatura Atual</p>
                              <span className="text-2xl font-bold text-shadow-sm">{formatarMoeda(fatura)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                              <p className="text-xs opacity-90 font-medium uppercase tracking-wider">Disponível</p>
                              <span className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-sm">{formatarMoeda(disponivel)}</span>
                          </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const TabExtrato = ({ loading, transacoes, setTransacoes, transacoesDoMes, mesAtualNome, darkMode, onNotify }) => {
  const [novaDesc, setNovaDesc] = useState(''); 
  const [novoVal, setNovoVal] = useState(''); 
  const [novoTipo, setNovoTipo] = useState('saida');
  const [novaCat, setNovoCat] = useState('Outros');
  const [novaDataTransacao, setNovaDataTransacao] = useState(new Date().toISOString().split('T')[0]);
  
  // ESTADOS DE AÇÃO
  const [itemParaDeletar, setItemParaDeletar] = useState(null);
  const [itemEmEdicao, setItemEmEdicao] = useState(null); // Novo estado para edição

  const addTransacao = (e) => { 
    e.preventDefault(); 
    if (!novaDesc || !novoVal) {
        onNotify("Erro ao salvar", "error");
        return; 
    }

    // LÓGICA DE EDIÇÃO (ATUALIZAR)
    if (itemEmEdicao) {
      setTransacoes(transacoes.map(t => t.id === itemEmEdicao.id ? {
        ...t,
        descricao: novaDesc,
        valor: Number(novoVal),
        tipo: novoTipo,
        categoria: novaCat,
        data: novaDataTransacao
      } : t));
      setItemEmEdicao(null); // Sai do modo edição
      onNotify("Lançamento atualizado com sucesso!", "success");
    } 
    // LÓGICA DE CRIAÇÃO (NOVO)
    else {
      setTransacoes([...transacoes, { id: Date.now(), 
        descricao: novaDesc, valor: Number(novoVal), 
        tipo: novoTipo, 
        categoria: novaCat, 
        data: novaDataTransacao }]); 
      onNotify("Salvo com sucesso", "success"); 
    }
    
    // Limpa o formulário
    setNovaDesc(''); 
    setNovoVal(''); 
    setNovaCat('Outros'); 
    // Mantém a data atual ou reseta, conforme preferência (mantive a última usada)
  };

  // FUNÇÃO PARA CARREGAR DADOS NO FORMULÁRIO
  const prepararEdicao = (transacao) => {
    setItemEmEdicao(transacao);
    setNovaDesc(transacao.descricao);
    setNovoVal(transacao.valor); // InputMoeda aceita number float
    setNovoTipo(transacao.tipo);
    setNovaCat(transacao.categoria);
    setNovaDataTransacao(transacao.data);
    
    // Rola suavemente para o topo para o usuário ver o formulário preenchido
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    onNotify(`Editando: ${transacao.descricao}`, "info");
  };

  const confirmarExclusao = () => {
    if (itemParaDeletar) {
      setTransacoes(transacoes.filter(t => t.id !== itemParaDeletar));
      setItemParaDeletar(null);
      // Se estava editando o item que excluiu, limpa o form
      if (itemEmEdicao && itemEmEdicao.id === itemParaDeletar) {
        setItemEmEdicao(null);
        setNovaDesc(''); setNovoVal('');
      }
      onNotify("Transação removida com sucesso.", "success");
    }
  };

  const cardClass = darkMode 
    ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}`
    : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
    
  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;

  const inputClass = `w-full p-3 border rounded-xl transition-all ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${
  darkMode 
    ? `${THEME.layout.bgDark} ${THEME.layout.borderDark} ${THEME.layout.textDark} placeholder-gray-500` 
    : `${THEME.layout.bg} ${THEME.layout.border} ${THEME.layout.text} placeholder-gray-500 focus:bg-white`
  }`;

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className={`${cardClass} p-6 rounded-2xl border`}>
           <Skeleton className="h-6 w-48 mb-6 rounded-md" />
           <div className="flex flex-col lg:flex-row gap-4 items-end">
              <Skeleton className="h-12 w-full lg:w-32 rounded-xl" />
              <Skeleton className="h-12 w-full flex-1 rounded-xl" />
              <Skeleton className="h-12 w-full lg:w-48 rounded-xl" />
              <Skeleton className="h-12 w-full lg:w-32 rounded-xl" />
              <Skeleton className="h-12 w-full lg:w-32 rounded-xl" />
              <Skeleton className="h-12 w-full lg:w-32 rounded-xl" />
           </div>
        </div>
        <div className={`${cardClass} rounded-2xl border overflow-hidden`}>
           <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <Skeleton className="h-6 w-40 rounded-md" />
           </div>
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className={`p-5 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex gap-4 items-center flex-1">
                   <Skeleton className="h-4 w-20 rounded-md hidden md:block" />
                   <Skeleton className="h-5 w-40 md:w-64 rounded-md" />
                   <Skeleton className="h-6 w-24 rounded-lg hidden md:block" />
                </div>
                <div className="flex gap-4 items-center">
                   <Skeleton className="h-5 w-24 rounded-md" />
                   <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* CARD DE FORMULÁRIO (NOVO OU EDIÇÃO) */}
      <div className={`${cardClass} p-6 rounded-2xl border transition-colors ${itemEmEdicao ? (darkMode ? 'border-blue-500 ring-1 ring-blue-500' : 'border-blue-400 ring-1 ring-blue-400') : ''}`}>
        <div className="flex justify-between items-center mb-6">
            <h3 className={`font-bold text-xl tracking-tight ${textMain}`}>
                {itemEmEdicao ? `Editando Lançamento` : 'Novo Lançamento'}
            </h3>
            {itemEmEdicao && (
                <button onClick={() => { setItemEmEdicao(null); setNovaDesc(''); setNovoVal(''); }} className="text-xs font-bold text-red-500 hover:underline">
                    Cancelar Edição
                </button>
            )}
        </div>
        
        <form onSubmit={addTransacao} className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="w-full lg:w-32">
            <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Data</label>
            <InputData 
                className={`${inputClass} text-center`} 
                value={novaDataTransacao} 
                onChange={setNovaDataTransacao} 
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Descrição</label>
            <input className={inputClass} placeholder="Ex: Supermercado" value={novaDesc} onChange={e => setNovaDesc(e.target.value)} />
          </div>
          
          <div className="w-full lg:w-48">
            <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Categoria</label>
            <select className={inputClass} value={novaCat} onChange={e => setNovaCat(e.target.value)}>
              {Object.keys(CATEGORIAS).map(c => <option key={c} value={c}>{CATEGORIAS[c].icon} {c}</option>)}
            </select>
          </div>
          
          <div className="w-full lg:w-32">
            <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Valor</label>
            <InputMoeda 
              className={inputClass} 
              value={novoVal} 
              onChange={setNovoVal} 
            />
          </div>
          
          <div className="w-full lg:w-32">
            <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Tipo</label>
            <select className={inputClass} value={novoTipo} onChange={e => setNovoTipo(e.target.value)}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          
          <button className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-8 py-3 rounded-xl font-bold w-full lg:w-auto h-[50px] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>
            <Check size={20} /> {itemEmEdicao ? "Atualizar" : "Salvar"}
          </button>        
        </form>
      </div>

      {/* LISTA DE EXTRATO */}
      <div className={`${cardClass} rounded-2xl border overflow-hidden`}>
        <div className={`p-6 border-b flex justify-between items-center ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.borderDark}` : `bg-gray-50/50 ${THEME.layout.border}`}`}>
            <h4 className={`font-bold text-lg capitalize flex items-center gap-2 ${textMain}`}><FileText size={20} className={THEME.primary.text}/> Extrato de {mesAtualNome}</h4>
        </div>
        
        {transacoesDoMes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
             <div className={`p-8 rounded-full mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                <FileText size={64} className={`${darkMode ? 'text-gray-600' : 'text-blue-200'}`} />
             </div>
             <h3 className={`text-xl font-bold mb-2 ${textMain}`}>Nenhuma movimentação em {mesAtualNome}</h3>
             <p className={`max-w-xs mx-auto mb-8 text-sm ${textSec}`}>O seu extrato está limpo. Que tal registrar sua primeira receita ou despesa do mês?</p>
             <button onClick={() => document.querySelector('input[placeholder="Ex: Supermercado"]').focus()} className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-blue-500/30 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>
                <Plus size={20} className="inline mr-2"/> Adicionar primeira transação
             </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className={darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'}>
                <tr>
                  <th className={`p-5 text-xs font-bold uppercase tracking-wider ${textSec}`}>Dia</th>
                  <th className={`p-5 text-xs font-bold uppercase tracking-wider ${textSec}`}>Descrição</th>
                  <th className={`p-5 text-xs font-bold uppercase tracking-wider ${textSec}`}>Categoria</th>
                  <th className={`p-5 text-xs font-bold uppercase tracking-wider ${textSec}`}>Valor</th>
                  <th className={`p-5 text-xs font-bold uppercase tracking-wider ${textSec}`}></th>
                </tr>
              </thead>
              <tbody>
                {transacoesDoMes.sort((a,b) => new Date(b.data) - new Date(a.data)).map((t) => (
                    <tr key={t.id} className={`border-b transition-colors hover:bg-black/5 ${darkMode ? `${THEME.layout.borderDark} hover:bg-white/5` : `${THEME.layout.border}`} ${itemEmEdicao?.id === t.id ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') : ''}`}>
                      <td className={`p-5 text-sm font-mono opacity-70 ${textMain}`}>{formatarData(t.data)}</td>
                      <td className={`p-5 font-bold text-base ${textMain}`}>{t.descricao}</td>
                      <td className="p-5">
                        <span className={`text-xs px-3 py-1.5 rounded-lg font-bold border ${darkMode ? `${THEME.layout.cardDark} ${THEME.layout.borderDark} ${THEME.layout.textSecDark}` : `${THEME.layout.card} ${THEME.layout.border} ${THEME.layout.textSec}`}`}>
                          {CATEGORIAS[t.categoria || 'Outros']?.icon} {t.categoria || 'Outros'}
                        </span>
                      </td>
                      <td className={`p-5 font-bold text-base ${t.tipo === 'entrada' ? THEME.success.text : THEME.danger.text}`}>
                        {t.tipo === 'saida' ? '- ' : '+ '}{formatarMoeda(t.valor)}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2">
                            {/* BOTÃO DE EDITAR (LÁPIS) */}
                            <button onClick={() => prepararEdicao(t)} className={`p-3 rounded-xl transition-all hover:scale-110 active:scale-95 ${darkMode ? 'hover:bg-blue-900/30 text-gray-500 hover:text-blue-400' : 'hover:bg-blue-50 text-gray-400 hover:text-blue-600'} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`} title="Editar">
                                <Pencil size={18}/>
                            </button>
                            
                            {/* BOTÃO DE EXCLUIR */}
                            <button onClick={() => setItemParaDeletar(t.id)} className={`p-3 rounded-xl transition-all hover:scale-110 active:scale-95 ${darkMode ? 'hover:bg-rose-900/30 text-gray-500 hover:text-rose-400' : 'hover:bg-rose-50 text-gray-400 hover:text-rose-600'} ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`} title="Excluir">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={!!itemParaDeletar} onClose={() => setItemParaDeletar(null)} title="Confirmar Exclusão" darkMode={darkMode}>
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${THEME.danger.bg} bg-opacity-10`}>
            <Trash2 size={32} className={THEME.danger.text} />
          </div>
          <p className={textMain}>Tem certeza que deseja apagar este lançamento? Essa ação não pode ser desfeita.</p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setItemParaDeletar(null)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`}>Cancelar</button>
            <button onClick={confirmarExclusao} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg} hover:brightness-90 ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`}>Sim, Apagar</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

const TabCarteira = ({ cartoes, setCartoes, darkMode, onNotify }) => {
  const [novoCardNome, setNovoCardNome] = useState(''); 
  const [novoCardLimite, setNovoCardLimite] = useState(''); 
  const [novoCardVenc, setNovoCardVenc] = useState(''); 
  const [novoCardCor, setNovoCardCor] = useState(LISTA_BANCOS[0].cor);

  const [cardParaDeletar, setCardParaDeletar] = useState(null);
  const [compraParaDeletar, setCompraParaDeletar] = useState(null);
  const [modalCompraOpen, setModalCompraOpen] = useState(false);
  const [modoEdicaoCompra, setModoEdicaoCompra] = useState(false);
  const [compraAtual, setCompraAtual] = useState({ cardId: null, compraId: null, item: '', valor: '', parcelas: '1' });

  const addCartao = (e) => { 
    e.preventDefault(); 
    if (!novoCardNome) { onNotify("Preencha o nome do cartão.", "warning"); return; } 
    setCartoes([...cartoes, { id: Date.now(), nome: novoCardNome, limite: Number(novoCardLimite)||1000, diaVencimento: novoCardVenc||10, cor: novoCardCor, compras: [] }]); 
    setNovoCardNome(''); setNovoCardLimite(''); setNovoCardVenc(''); 
    onNotify("Cartão cadastrado com sucesso!", "success");
  };
  
  const confirmarExclusaoCartao = () => {
     if(cardParaDeletar) {
        setCartoes(cartoes.filter(c => c.id !== cardParaDeletar)); 
        setCardParaDeletar(null);
        onNotify("Cartão removido.", "success");
     }
  };

  const abrirModalNovaCompra = (cardId) => {
      setCompraAtual({ cardId, compraId: null, item: '', valor: '', parcelas: '1' });
      setModoEdicaoCompra(false);
      setModalCompraOpen(true);
  };

  const abrirModalEditarCompra = (cardId, compra) => {
      setCompraAtual({ cardId, compraId: compra.id, item: compra.item, valor: compra.valorTotal, parcelas: compra.parcelas });
      setModoEdicaoCompra(true);
      setModalCompraOpen(true);
  };

  const salvarCompra = () => {
      if(!compraAtual.item || !compraAtual.valor) { onNotify("Preencha descrição e valor.", "warning"); return; }
      
      const valTotal = Number(compraAtual.valor);
      const parcelas = Number(compraAtual.parcelas) || 1;
      const valParcela = valTotal / parcelas;

      if (modoEdicaoCompra) {
          setCartoes(cartoes.map(c => c.id === compraAtual.cardId ? { 
              ...c, 
              compras: c.compras.map(comp => comp.id === compraAtual.compraId ? { ...comp, item: compraAtual.item, valorTotal: valTotal, parcelas, valorParcela: valParcela } : comp) 
          } : c));
          onNotify("Compra atualizada!", "success");
      } else {
          setCartoes(cartoes.map(c => c.id === compraAtual.cardId ? { 
              ...c, 
              compras: [...(c.compras || []), { id: Date.now(), item: compraAtual.item, valorTotal: valTotal, valorParcela: valParcela, parcelas, atual: 1 }] 
          } : c));
          onNotify("Compra adicionada!", "success");
      }
      setModalCompraOpen(false);
  };
  
  const confirmarExclusaoCompra = () => {
    if(compraParaDeletar) {
        setCartoes(cartoes.map(c => c.id === compraParaDeletar.cardId ? {...c, compras: c.compras.filter(comp => comp.id !== compraParaDeletar.compraId)} : c)); 
        setCompraParaDeletar(null);
        onNotify("Compra removida.", "success");
    }
  };

  const cardClass = darkMode ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
  const inputClass = `w-full p-3 border rounded-xl transition-all ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.borderDark} ${THEME.layout.textDark} placeholder-gray-500` : `${THEME.layout.bg} ${THEME.layout.border} ${THEME.layout.text} placeholder-gray-500 focus:bg-white`}`;

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className={`${cardClass} p-6 rounded-2xl shadow-sm border`}>
        <h3 className={`font-bold text-xl tracking-tight mb-6 flex items-center gap-2 ${textMain}`}><CreditCard className={THEME.primary.text}/> Novo Cartão</h3>
        <form onSubmit={addCartao} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Nome</label><input className={inputClass} value={novoCardNome} onChange={e => setNovoCardNome(e.target.value)} /></div>
                
                {/* MUDANÇA: InputMoeda no Limite */}
                <div className="w-full md:w-32"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Limite Total</label><InputMoeda className={inputClass} value={novoCardLimite} onChange={setNovoCardLimite} /></div>
                
                <div className="w-full md:w-32"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Dia Venc.</label><input type="number" className={inputClass} value={novoCardVenc} onChange={e => setNovoCardVenc(e.target.value)} /></div>
            </div>
            <div>
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${textSec}`}>Cor do Banco</label>
                <div className="flex flex-wrap gap-2">{LISTA_BANCOS.map((banco, idx) => (<div key={idx} onClick={() => setNovoCardCor(banco.cor)} title={banco.nome} className={`w-8 h-8 rounded-full cursor-pointer bg-gradient-to-br ${banco.cor} transition-transform hover:scale-110 flex items-center justify-center shadow-sm ${novoCardCor === banco.cor ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}>{novoCardCor === banco.cor && <Check size={14} className="text-white" />}</div>))}</div>
            </div>
            <button className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-6 py-2 rounded-xl font-bold w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110 active:scale-95 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Adicionar Cartão</button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cartoes.map(card => { 
            const listaCompras = card.compras || [];
            const fatura = listaCompras.reduce((acc, item) => acc + item.valorParcela, 0); 
            const disponivel = card.limite - (listaCompras.reduce((acc, i) => acc + i.valorTotal, 0)); 
            
            return (
                <div key={card.id} className="relative group">
                    <div className={`p-6 rounded-t-2xl shadow-2xl shadow-gray-900/20 text-white bg-gradient-to-r ${card.cor} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <CreditCard size={32} className="opacity-80" />
                            <button onClick={() => setCardParaDeletar(card.id)} className={`text-white opacity-50 hover:opacity-100 rounded-md p-1 flex items-center justify-center transition-colors ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_VERMELHO}`}><Trash2 size={18}/></button>
                        </div>
                        <div className="mb-4 relative z-10">
                            <h3 className="font-bold text-2xl tracking-tight">{card.nome}</h3>
                            <p className="text-sm opacity-80 mt-1 font-medium">Vence dia {card.diaVencimento}</p>
                        </div>
                        <div className="flex justify-between items-end relative z-10">
                            <div><p className="text-xs opacity-80 uppercase tracking-wide mb-1">Fatura Atual</p><p className="text-3xl font-bold">{formatarMoeda(fatura)}</p></div>
                            <div className="text-right"><p className="text-xs opacity-80 uppercase tracking-wide mb-1">Disponível</p><p className="text-lg font-bold">{formatarMoeda(disponivel)}</p></div>
                        </div>
                    </div>
                    
                    <div className={`${cardClass} border-t-0 rounded-b-2xl p-4 shadow-sm`}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className={`font-bold text-sm ${textMain}`}>Compras Parceladas</h4>
                            <button onClick={() => abrirModalNovaCompra(card.id)} className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 font-bold ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`}><Plus size={12}/> Nova Compra</button>
                        </div>
                        <div className="space-y-2 max-h-40 overflow-y-auto overflow-x-hidden pr-2">
                            {listaCompras.map(c => (
                                <div key={c.id} className={`flex justify-between items-center text-sm border-b pb-2 last:border-0 ${darkMode ? THEME.layout.borderDark : THEME.layout.border}`}>
                                    <div><p className={`font-bold ${textMain}`}>{c.item}</p><p className={`text-xs ${textSec}`}>Parcela {c.atual}/{c.parcelas}</p></div>
                                    <div className="flex flex-col items-end"><span className={`font-bold ${textMain}`}>{formatarMoeda(c.valorParcela)}</span><span className={`text-[10px] ${textSec}`}>Total: {formatarMoeda(c.valorTotal)}</span></div>
                                    <div className="flex items-center gap-2 ml-3">
                                        <button onClick={() => abrirModalEditarCompra(card.id, c)} className={`p-1 rounded-md flex items-center justify-center transition-transform hover:scale-125 ${textSec} hover:text-blue-500 ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`}><Pencil size={16}/></button>
                                        <button onClick={() => setCompraParaDeletar({cardId: card.id, compraId: c.id})} className={`p-1 rounded-md flex items-center justify-center transition-transform hover:scale-125 ${textSec} hover:text-red-500 ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`}><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        })}
      </div>

      <Modal isOpen={!!cardParaDeletar} onClose={() => setCardParaDeletar(null)} title="Excluir Cartão?" darkMode={darkMode}>
        <div className="text-center space-y-4">
            <p className={textMain}>Você perderá todo o histórico deste cartão.</p>
            <div className="flex gap-3">
                <button onClick={() => setCardParaDeletar(null)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button>
                <button onClick={confirmarExclusaoCartao} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg}`}>Sim, Excluir</button>
            </div>
        </div>
      </Modal>

      <Modal isOpen={!!compraParaDeletar} onClose={() => setCompraParaDeletar(null)} title="Excluir Compra?" darkMode={darkMode}>
        <div className="text-center space-y-4">
            <p className={textMain}>Remover esta compra da fatura?</p>
            <div className="flex gap-3">
                <button onClick={() => setCompraParaDeletar(null)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button>
                <button onClick={confirmarExclusaoCompra} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg}`}>Sim, Remover</button>
            </div>
        </div>
      </Modal>

      <Modal isOpen={modalCompraOpen} onClose={() => setModalCompraOpen(false)} title={modoEdicaoCompra ? "Editar Compra" : "Nova Compra"} darkMode={darkMode}>
          <div className="space-y-4">
              <div><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Descrição</label><input className={inputClass} value={compraAtual.item} onChange={e => setCompraAtual({...compraAtual, item: e.target.value})} placeholder="Ex: Notebook" autoFocus /></div>
              <div className="flex gap-4">
                  {/* MUDANÇA: InputMoeda no Valor */}
                  <div className="flex-1"><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Valor Total</label><InputMoeda className={inputClass} value={compraAtual.valor} onChange={val => setCompraAtual({...compraAtual, valor: val})} placeholder="0,00" /></div>
                  <div className="w-24"><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Parcelas</label><input type="number" className={inputClass} value={compraAtual.parcelas} onChange={e => setCompraAtual({...compraAtual, parcelas: e.target.value})} placeholder="1" /></div>
              </div>
              <button onClick={salvarCompra} className={`w-full p-3 rounded-xl font-bold text-white transition-colors ${THEME.primary.bg} ${THEME.primary.bgHover} ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Salvar</button>
          </div>
      </Modal>
    </div>
  );
};

const TabGraficos = ({ transacoesDoMes, receitas, despesas, saldo, darkMode, setActiveTab }) => {
  const [tipoGrafico, setTipoGrafico] = useState('barras');

  // 1. Centralização das variáveis de Tema
  const cardClass = darkMode 
    ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}`
    : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;

  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
   
  // Estilo dos botões de menu
  const btnActive = `${THEME.primary.bg} text-white shadow-md shadow-blue-500/20`;
  const btnInactive = darkMode 
    ? `${THEME.layout.cardDark} ${THEME.layout.textSecDark} hover:bg-gray-700` 
    : `${THEME.layout.card} ${THEME.layout.textSec} hover:bg-gray-50`;

  // Cores Hexadecimais para SVGs
  const SVG_BG_CARD = darkMode ? "#1f2937" : "#ffffff"; 
  const SVG_GRID_COLOR = darkMode ? "#374151" : "#e5e7eb";
  // const SVG_TEXT_COLOR = darkMode ? "#9ca3af" : "#6b7280"; // Não utilizado no momento, comentado para evitar warning
  const COR_GRAFICO_PRIMARIA = '#2563eb'; 

  // --- LÓGICA DE DADOS ---
  const dadosBarras = useMemo(() => {
    const mapa = transacoesDoMes.reduce((acc, curr) => {
      const dia = curr.data.split('-')[2];
      const existing = acc.find(item => item.dia === dia);
      if (existing) {
        if(curr.tipo === 'entrada') existing.entrada += curr.valor;
        else existing.saida += curr.valor;
      } else {
        acc.push({ dia, entrada: curr.tipo === 'entrada' ? curr.valor : 0, saida: curr.tipo === 'saida' ? curr.valor : 0 });
      }
      return acc;
    }, []);
    return mapa.sort((a,b) => Number(a.dia) - Number(b.dia));
  }, [transacoesDoMes]);
   
  const maxValorDia = Math.max(...dadosBarras.map(d => Math.max(d.entrada, d.saida)), 1);
  const totalMovimentado = receitas + despesas;
  const pctReceitas = totalMovimentado > 0 ? (receitas / totalMovimentado) * 100 : 0;
  const pctDespesas = totalMovimentado > 0 ? (despesas / totalMovimentado) * 100 : 0;

  // Lógica Linha
  let acumulado = 0;
  const dadosLinha = dadosBarras.map(d => { acumulado += (d.entrada - d.saida); return { dia: d.dia, valor: acumulado }; });
  const minLinha = Math.min(...dadosLinha.map(d => d.valor), 0);
  const maxLinha = Math.max(...dadosLinha.map(d => d.valor), 100);
  const rangeLinha = maxLinha - minLinha || 1;

  // Lógica Categoria
  const dadosCategoria = useMemo(() => {
    const grupos = transacoesDoMes
      .filter(t => t.tipo === 'saida')
      .reduce((acc, t) => {
        const cat = t.categoria || 'Outros';
        acc[cat] = (acc[cat] || 0) + t.valor;
        return acc;
      }, {});
    return Object.entries(grupos)
      .map(([cat, valor]) => ({ cat, valor, porcentagem: (valor / despesas) * 100 }))
      .sort((a, b) => b.valor - a.valor);
  }, [transacoesDoMes, despesas]);

  // =========================================================================
  // IMPLEMENTAÇÃO DO EMPTY STATE (ESTADO VAZIO)
  // =========================================================================
  if (transacoesDoMes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-fade-in">
         {/* Ilustração Amigável */}
         <div className={`p-8 rounded-full mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-xl shadow-blue-500/10`}>
            <BarChart3 size={80} className={`${darkMode ? 'text-gray-600' : 'text-blue-200'}`} />
         </div>
         
         {/* Texto */}
         <h3 className={`text-2xl font-bold mb-3 text-center ${textMain}`}>Sem dados para exibir</h3>
         <p className={`max-w-md mx-auto mb-8 text-center text-sm ${textSec}`}>
           Ainda não há transações registradas neste mês. Adicione sua primeira movimentação para gerar os gráficos.
         </p>

         {/* Botão de Ação */}
         <button 
            onClick={() => setActiveTab && setActiveTab('Extrato')}
            className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-blue-500/30 flex items-center gap-2 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}
         >
            <PlusCircle size={20} />
            Adicionar primeira transação
         </button>
      </div>
    );
  }

  // =========================================================================
  // RENDERIZAÇÃO NORMAL (COM DADOS)
  // =========================================================================
  return (
    <div className="space-y-6 pb-20 animate-fade-in">
       
      {/* Menu de Tipos de Gráfico */}
      <div className="flex gap-2 overflow-x-auto pb-2 p-1 no-scrollbar">
        {[
            { id: 'barras', icon: BarChart3, label: 'Fluxo Diário' },
            { id: 'categorias', icon: PieChart, label: 'Top Gastos' },
            { id: 'pizza', icon: Target, label: 'Balanço' },
            { id: 'linha', icon: LineChart, label: 'Evolução' }
        ].map(btn => (
            <button 
                key={btn.id}
                onClick={() => setTipoGrafico(btn.id)} 
                className={`
                  px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-all whitespace-nowrap text-sm border border-transparent 
                  ${tipoGrafico === btn.id 
                    ? `${btnActive} ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`  
                    : `${btnInactive} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`  
                  }
                `}
            >
                <btn.icon size={18}/> {btn.label}
            </button>
        ))}
      </div>

      <div className={`${cardClass} p-6 md:p-8 rounded-2xl border min-h-[400px] flex flex-col`}>
        
        {/* GRÁFICO 1: BARRAS */}
        {tipoGrafico === 'barras' && (
          <div className="flex-1 flex flex-col animate-fade-in w-full overflow-hidden">
             <h4 className={`font-bold text-xl mb-6 ${textMain}`}>Fluxo Diário (Entradas vs Saídas)</h4>
             
             {dadosBarras.length === 0 ? (
                 <div className={`flex-1 flex items-center justify-center flex-col opacity-50 ${textSec}`}>
                     <BarChart3 size={48} className="mb-2"/>
                     <p>Nenhuma movimentação neste mês.</p>
                 </div>
             ) : (
             <div className="h-64 flex items-end justify-start gap-4 px-2 pb-2 overflow-x-auto">
               {dadosBarras.map((d, i) => (
                 <div key={i} className="flex-none w-16 flex flex-col justify-end items-center gap-1 group relative h-full">
                   <div className="w-full flex items-end justify-center gap-1 h-full relative">
                     <div className={`absolute inset-0 rounded-lg opacity-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                     
                     <div className="w-1/2 h-full flex items-end justify-center relative">
                        {d.entrada > 0 && (<div style={{ height: `${Math.max((d.entrada / maxValorDia) * 100, 5)}%` }} className="w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-400 transition-all relative" title={`Entrada: ${formatarMoeda(d.entrada)}`}></div>)}
                     </div>
                     <div className="w-1/2 h-full flex items-end justify-center relative">
                        {d.saida > 0 && (<div style={{ height: `${Math.max((d.saida / maxValorDia) * 100, 5)}%` }} className="w-full bg-rose-500 rounded-t-sm hover:bg-rose-400 transition-all relative" title={`Saída: ${formatarMoeda(d.saida)}`}></div>)}
                     </div>
                   </div>
                   <span className={`text-[10px] font-bold mt-2 ${textSec}`}>{d.dia}</span>
                 </div>
               ))}
             </div>)}
          </div>
        )}

        {/* GRÁFICO 2: TOP GASTOS */}
        {tipoGrafico === 'categorias' && (
          <div className="animate-fade-in w-full">
            <h4 className={`font-bold text-xl mb-8 flex items-center gap-2 ${textMain}`}>
                <PieChart className={THEME.primary.text}/> Top Gastos
            </h4>
            {dadosCategoria.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-20 opacity-50 ${textSec}`}>
                  <PieChart size={48} className="mb-4 opacity-20"/>
                  <p>Sem despesas registradas.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {dadosCategoria.map((item, idx) => {
                  const infoCat = CATEGORIAS[item.cat] || CATEGORIAS['Outros'];
                  return (
                    <div key={item.cat}>
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">{infoCat.icon}</span>
                          <div>
                              <span className={`font-bold text-sm block ${textMain}`}>{item.cat}</span>
                              <span className={`text-xs ${textSec}`}>{Math.round(item.porcentagem)}%</span>
                          </div>
                        </div>
                        <span className={`font-bold text-base ${textMain}`}>{formatarMoeda(item.valor)}</span>
                      </div>
                      <div className={`w-full rounded-full h-3 overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className={`h-full rounded-full ${infoCat.cor} opacity-90`} style={{ width: `${item.porcentagem}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* GRÁFICO 3: PIZZA (BALANÇO) */}
        {tipoGrafico === 'pizza' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 flex-1 animate-fade-in">
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-xl">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill={SVG_BG_CARD} stroke={darkMode ? "#374151" : "#f3f4f6"} strokeWidth="3.8" />
                {totalMovimentado > 0 && (<path className="text-emerald-500 transition-all duration-1000 ease-out" strokeDasharray={`${pctReceitas}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />)}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className={`text-xs uppercase font-bold tracking-widest mb-1 ${textSec}`}>Saldo</span>
                <span className={`text-3xl font-bold ${saldo >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{formatarMoeda(saldo)}</span>
              </div>
            </div>
            <div className="space-y-4 w-full md:w-1/3">
              <div className={`flex justify-between items-center p-4 rounded-2xl border ${darkMode ? 'border-emerald-900/50 bg-emerald-900/10' : 'border-emerald-100 bg-emerald-50/50'}`}>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-900'}`}>Receitas</span></div>
                  <span className="text-emerald-500 font-bold text-lg">{Math.round(pctReceitas)}%</span>
              </div>
              <div className={`flex justify-between items-center p-4 rounded-2xl border ${darkMode ? 'border-rose-900/50 bg-rose-900/10' : 'border-rose-100 bg-rose-50/50'}`}>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className={`font-bold ${darkMode ? 'text-rose-400' : 'text-rose-900'}`}>Despesas</span></div>
                  <span className="text-rose-500 font-bold text-lg">{Math.round(pctDespesas)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* GRÁFICO 4: LINHA (EVOLUÇÃO) */}
        {tipoGrafico === 'linha' && (
           <div className="flex-1 flex flex-col animate-fade-in overflow-hidden w-full">
           <h4 className={`font-bold text-xl mb-6 ${textMain}`}>Evolução do Saldo</h4>
           {dadosLinha.length < 2 ? (
             <div className={`flex-1 flex items-center justify-center flex-col opacity-50 ${textSec}`}>
                 <TrendingUp size={48} className="mb-2"/><p>Dados insuficientes.</p>
             </div>
           ) : (
             <div className="flex-1 min-h-[250px] relative w-full">
               {(() => {
                 const height = 250; const width = 600; const padding = 20; 
                 const min = minLinha - (rangeLinha * 0.1); const max = maxLinha + (rangeLinha * 0.1); const range = max - min || 1;
                 const getY = (val) => height - padding - ((val - min) / range) * (height - (padding * 2));
                 const getX = (index) => padding + (index / (dadosLinha.length - 1)) * (width - (padding * 2));
                 const points = dadosLinha.map((d, i) => `${getX(i)},${getY(d.valor)}`).join(' ');
                 const areaPoints = `${getX(0)},${height} ${points} ${getX(dadosLinha.length - 1)},${height}`;
                 return (
                   <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                     <defs><linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={COR_GRAFICO_PRIMARIA} stopOpacity="0.3" /><stop offset="100%" stopColor={COR_GRAFICO_PRIMARIA} stopOpacity="0" /></linearGradient></defs>
                     {[0, 1, 2, 3, 4].map((tick) => { const yPos = padding + (tick / 4) * (height - (padding * 2)); return (<line key={`h-${tick}`} x1={padding} y1={yPos} x2={width - padding} y2={yPos} stroke={SVG_GRID_COLOR} strokeWidth="1" opacity="0.5" />); })}
                     <polygon points={areaPoints} fill="url(#gradientLine)" />
                     <polyline fill="none" stroke={COR_GRAFICO_PRIMARIA} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                     {dadosLinha.map((d, i) => ( <g key={i} className="group"><circle cx={getX(i)} cy={getY(d.valor)} r="20" fill="transparent" className="cursor-pointer" /><circle cx={getX(i)} cy={getY(d.valor)} r="4" fill={COR_GRAFICO_PRIMARIA} stroke={SVG_BG_CARD} strokeWidth="2" className="transition-all duration-300 group-hover:r-6"><title>{d.dia}: {formatarMoeda(d.valor)}</title></circle></g> ))}
                   </svg>
                 );
               })()}
             </div>
           )}
         </div>
        )}
      </div>
    </div>
  );
};

const TabObjetivos = ({ objetivos, setObjetivos, darkMode, onNotify}) => {
  const [novoObjTitulo, setNovoObjTitulo] = useState(''); 
  const [novoObjMeta, setNovoObjMeta] = useState('');
  
  // ESTADOS DE AÇÃO
  const [objParaDeletar, setObjParaDeletar] = useState(null);
  const [objEmEdicao, setObjEmEdicao] = useState(null); // Novo estado para edição

  const [modalDepositoOpen, setModalDepositoOpen] = useState(false);
  const [depositoAtual, setDepositoAtual] = useState({ id: null, valor: '' });

  const inputNomeRef = useRef(null);

  const addObjetivo = (e) => { 
    e.preventDefault(); 
    if(novoObjTitulo) {
      
      // LÓGICA DE EDIÇÃO
      if (objEmEdicao) {
        setObjetivos(objetivos.map(o => o.id === objEmEdicao.id ? {
            ...o,
            titulo: novoObjTitulo,
            meta: Number(novoObjMeta)
        } : o));
        setObjEmEdicao(null);
        onNotify("Meta atualizada com sucesso!", "success");
      } 
      // LÓGICA DE CRIAÇÃO
      else {
        setObjetivos([...objetivos, {id: Date.now(), titulo: novoObjTitulo, atual: 0, meta: Number(novoObjMeta)}]); 
        onNotify("Nova meta definida!", "success");
      }

      setNovoObjTitulo(''); setNovoObjMeta('');
    } else { onNotify("Defina um nome para a meta.", "warning"); }
  };

  // FUNÇÃO PARA CARREGAR DADOS NO FORMULÁRIO
  const prepararEdicaoObj = (obj) => {
    setObjEmEdicao(obj);
    setNovoObjTitulo(obj.titulo);
    setNovoObjMeta(obj.meta);
    
    // Foca no input e rola para cima
    if(inputNomeRef.current) inputNomeRef.current.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNotify(`Editando meta: ${obj.titulo}`, "info");
  }

  const abrirModalDeposito = (id) => {
      setDepositoAtual({ id, valor: '' });
      setModalDepositoOpen(true);
  };

  const confirmarDeposito = () => {
      if(!depositoAtual.valor) return;
      setObjetivos(objetivos.map(o => o.id === depositoAtual.id ? {...o, atual: o.atual + Number(depositoAtual.valor)} : o));
      setModalDepositoOpen(false);
      onNotify("Valor adicionado à meta!", "success");
  };

  const confirmarExclusao = () => {
    if(objParaDeletar) {
        setObjetivos(objetivos.filter(o => o.id !== objParaDeletar));
        setObjParaDeletar(null);
        if(objEmEdicao && objEmEdicao.id === objParaDeletar) {
            setObjEmEdicao(null);
            setNovoObjTitulo(''); setNovoObjMeta('');
        }
        onNotify("Meta excluída.", "success");
    }
  };

  const cardClass = darkMode ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
  const inputClass = `w-full p-3 border rounded-xl transition-all ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.borderDark} ${THEME.layout.textDark} placeholder-gray-500` : `${THEME.layout.bg} ${THEME.layout.border} ${THEME.layout.text} placeholder-gray-500 focus:bg-white`}`;

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
       <div className={`${cardClass} p-6 rounded-2xl shadow-sm border transition-colors ${objEmEdicao ? (darkMode ? 'border-blue-500 ring-1 ring-blue-500' : 'border-blue-400 ring-1 ring-blue-400') : ''}`}>
           <div className="flex justify-between items-center mb-6">
                <h3 className={`font-bold text-xl tracking-tight flex items-center gap-2 ${textMain}`}>
                    <Target className={THEME.primary.text}/> {objEmEdicao ? "Editando Meta" : "Nova Meta"}
                </h3>
                {objEmEdicao && (
                    <button onClick={() => { setObjEmEdicao(null); setNovoObjTitulo(''); setNovoObjMeta(''); }} className="text-xs font-bold text-red-500 hover:underline">
                        Cancelar
                    </button>
                )}
           </div>
           
           <form onSubmit={addObjetivo} className="flex flex-col md:flex-row gap-4 items-end">
               <div className="flex-1 w-full"><label className={`text-sm font-bold ${textSec}`}>Nome</label><input ref={inputNomeRef} className={inputClass} value={novoObjTitulo} onChange={e => setNovoObjTitulo(e.target.value)} placeholder="Ex: Moto Nova, Viagem, Reserva..."/></div>
               
               <div className="w-full md:w-48"><label className={`text-sm font-bold ${textSec}`}>Meta (R$)</label><InputMoeda className={inputClass} value={novoObjMeta} onChange={setNovoObjMeta} /></div>
               
               <button className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-6 py-2 rounded-xl font-bold w-full md:w-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110 active:scale-95 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>
                {objEmEdicao ? "Atualizar" : "Criar"}
               </button>
           </form>
       </div>
       
       {objetivos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-16 animate-fade-in border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-700">
             <div className={`p-6 rounded-full mb-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-lg shadow-indigo-500/10`}><Target size={64} strokeWidth={1.5} className={`${darkMode ? 'text-gray-600' : 'text-indigo-300'}`} /></div>
             <h3 className={`text-xl font-bold mb-2 text-center ${textMain}`}>Defina seu primeiro alvo</h3>
             <p className={`max-w-md mx-auto mb-6 text-center text-sm ${textSec}`}>Quem não sabe para onde vai, qualquer caminho serve.</p>
             <button onClick={() => inputNomeRef.current?.focus()} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-1 ${darkMode ? 'bg-gray-800 text-indigo-400 hover:bg-gray-700' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`}><Plus size={18} /> Começar agora</button>
          </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
             {objetivos.map(obj => (
                 <div key={obj.id} className={`${cardClass} p-6 rounded-2xl shadow-lg shadow-indigo-500/10 border flex flex-col justify-between h-full ${objEmEdicao?.id === obj.id ? (darkMode ? 'bg-indigo-900/10 border-indigo-500/50' : 'bg-indigo-50/50 border-indigo-200') : ''}`}>
                     <div>
                         <div className="flex justify-between items-start mb-4">
                             <div className={`p-3 rounded-xl ${THEME.secondary.light}`}><Trophy size={24} className={THEME.secondary.text} /></div>
                             
                             <div className="flex gap-1">
                                {/* BOTÃO DE EDITAR (LÁPIS) */}
                                <button onClick={() => prepararEdicaoObj(obj)} className={`${textSec} hover:text-blue-500 transition-transform hover:scale-110 rounded-md p-1 flex items-center justify-center ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`} title="Editar Meta">
                                    <Pencil size={18}/>
                                </button>
                                
                                {/* BOTÃO DE EXCLUIR */}
                                <button onClick={() => setObjParaDeletar(obj.id)} className={`${textSec} hover:text-red-500 transition-transform hover:scale-110 rounded-md p-1 flex items-center justify-center ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`} title="Excluir Meta">
                                    <Trash2 size={18}/>
                                </button>
                             </div>
                         </div>
                         <h4 className={`font-bold text-xl mb-1 ${textMain}`}>{obj.titulo}</h4>
                         <p className={`text-sm mb-4 font-medium ${textSec}`}>Meta: {formatarMoeda(obj.meta)}</p>
                         <div className={`w-full rounded-full h-3 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}><div className={`${THEME.secondary.bg} h-3 rounded-full transition-all duration-1000`} style={{ width: `${Math.min((obj.atual/obj.meta)*100, 100)}%` }}></div></div>
                         <div className={`flex justify-between text-xs font-bold ${THEME.secondary.text}`}><span>{formatarMoeda(obj.atual)}</span><span>{Math.round(Math.min((obj.atual/obj.meta)*100, 100))}%</span></div>
                     </div>
                     <button onClick={() => abrirModalDeposito(obj.id)} className={`mt-6 w-full p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 hover:-translate-y-1 hover:shadow-md ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20': 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}><TrendingUp size={16}/> Adicionar </button>
                 </div>
             ))}
         </div>
       )}

       <Modal isOpen={!!objParaDeletar} onClose={() => setObjParaDeletar(null)} title="Excluir Meta?" darkMode={darkMode}>
        <div className="text-center space-y-4">
            <p className={textMain}>Tem certeza que deseja desistir desta meta?</p>
            <div className="flex gap-3">
                <button onClick={() => setObjParaDeletar(null)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button>
                <button onClick={confirmarExclusao} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg}`}>Sim, Excluir</button>
            </div>
        </div>
      </Modal>

      <Modal isOpen={modalDepositoOpen} onClose={() => setModalDepositoOpen(false)} title="Adicionar Valor" darkMode={darkMode}>
          <div className="space-y-4">
              <div><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Valor a depositar</label><InputMoeda className={inputClass} value={depositoAtual.valor} onChange={val => setDepositoAtual({...depositoAtual, valor: val})} autoFocus placeholder="0,00" /></div>
              <button onClick={confirmarDeposito} className={`w-full p-3 rounded-xl font-bold text-white transition-colors ${THEME.primary.bg} ${THEME.primary.bgHover} ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Confirmar</button>
          </div>
      </Modal>
    </div>
  );
};

const TabBancos = ({ loading, bancos, setBancos, darkMode, onNotify }) => {
  const [bancoSelecionado, setBancoSelecionado] = useState(LISTA_BANCOS[0]);
  const [novoBancoSaldo, setNovoBancoSaldo] = useState('');
  const [novoBancoTipo, setNovoBancoTipo] = useState('Corrente');
  const [bancoEmEdicao, setBancoEmEdicao] = useState(null);
  const [novoSaldoEdit, setNovoSaldoEdit] = useState('');
  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [bancoParaDeletar, setBancoParaDeletar] = useState(null);

  const addBanco = (e) => { 
      e.preventDefault(); 
      setBancos([...bancos, { id: Date.now(), nome: bancoSelecionado.nome, saldo: Number(novoBancoSaldo) || 0, tipo: novoBancoTipo, cor: bancoSelecionado.cor }]); 
      setNovoBancoSaldo(''); setMostrandoForm(false);
      onNotify("Conta bancária adicionada!", "success");
  }
  
  const confirmarExclusao = () => {
    if(bancoParaDeletar) {
        setBancos(bancos.filter(b => b.id !== bancoParaDeletar));
        setBancoParaDeletar(null);
        onNotify("Conta removida.", "success");
    }
  };

  const abrirEdicao = (banco) => { setBancoEmEdicao(banco); setNovoSaldoEdit(banco.saldo); };
  
  const salvarEdicao = () => { 
      if (bancoEmEdicao && novoSaldoEdit !== '') { 
        setBancos(bancos.map(b => b.id === bancoEmEdicao.id ? { ...b, saldo: Number(novoSaldoEdit) } : b)); 
        setBancoEmEdicao(null); 
        onNotify("Saldo atualizado!", "success");
      } 
  };

  const totalBancos = bancos.reduce((acc, b) => acc + b.saldo, 0);
  const cardClass = darkMode ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
  const inputClass = `w-full p-3 border rounded-xl transition-all ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.borderDark} ${THEME.layout.textDark} placeholder-gray-500` : `${THEME.layout.bg} ${THEME.layout.border} ${THEME.layout.text} placeholder-gray-500 focus:bg-white`}`;

  if (loading) { return <div className="space-y-6 animate-fade-in"><Skeleton className="h-20 w-full rounded-2xl"/><Skeleton className="h-40 w-full rounded-2xl"/><Skeleton className="h-60 w-full rounded-2xl"/></div>; }

  if (bancos.length === 0 && !mostrandoForm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-fade-in h-full">
         <div className={`p-8 rounded-full mb-6 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-xl shadow-blue-500/10`}><Landmark size={80} strokeWidth={1.5} className={`${darkMode ? 'text-gray-600' : 'text-blue-200'}`} /></div>
         <h3 className={`text-2xl font-bold mb-3 text-center ${textMain}`}>Nenhuma conta cadastrada</h3>
         <button onClick={() => setMostrandoForm(true)} className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-blue-500/30 flex items-center gap-2 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}><PlusCircle size={20} /> Cadastrar primeira conta</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {bancos.length > 0 && (<div className={`${cardClass} p-6 rounded-2xl shadow-sm border flex items-center justify-between animate-fade-in`}><div><p className={`text-xs font-bold uppercase tracking-wider mb-1 ${textSec}`}>Patrimônio em Bancos</p><h2 className={`text-4xl font-bold ${textMain}`}>{formatarMoeda(totalBancos)}</h2></div><div className={`p-4 rounded-xl ${THEME.success.light}`}><Landmark size={32} className={THEME.success.text} /></div></div>)}

      <div className={`${cardClass} p-6 rounded-2xl shadow-sm border`}>
          <h3 className={`font-bold text-xl tracking-tight mb-6 flex items-center gap-2 ${textMain}`}><Building2 className={THEME.primary.text} /> Cadastrar Conta</h3>
          <form onSubmit={addBanco} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Escolha o Banco</label><select className={inputClass} onChange={(e) => { const banco = LISTA_BANCOS.find(b => b.nome === e.target.value); setBancoSelecionado(banco); }} value={bancoSelecionado.nome}>{LISTA_BANCOS.map(b => <option key={b.nome} value={b.nome}>{b.nome}</option>)}</select></div>
                  
                  {/* MUDANÇA: InputMoeda no Saldo Inicial */}
                  <div className="w-full md:w-40"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Saldo Atual</label><InputMoeda className={inputClass} placeholder="0,00" value={novoBancoSaldo} onChange={setNovoBancoSaldo} /></div>
                  
                  <div className="w-full md:w-40"><label className={`text-xs font-bold uppercase tracking-wider mb-1 block ${textSec}`}>Tipo</label><select className={inputClass} value={novoBancoTipo} onChange={e => setNovoBancoTipo(e.target.value)}><option value="Corrente">Corrente</option><option value="Poupança">Poupança</option><option value="Investimento">Investimento</option></select></div>
              </div>
              <button className={`${THEME.primary.bg} ${THEME.primary.bgHover} text-white px-6 p-3 rounded-xl font-bold w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110 active:scale-95 ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Salvar Conta</button>
          </form>
      </div>

      {bancos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {bancos.map(banco => (
                <div key={banco.id} className={`${cardClass} rounded-2xl shadow-lg shadow-blue-500/10 border overflow-hidden flex flex-col`}>
                    <div className={`h-28 bg-gradient-to-r ${banco.cor} p-4 relative overflow-hidden flex flex-col justify-between`}>
                        <div className="flex justify-between items-start z-10 relative">
                            <Landmark size={32} className="text-white opacity-80" />
                            <button onClick={() => setBancoParaDeletar(banco.id)} className={`text-white opacity-60 hover:opacity-100 transition-transform hover:scale-110 rounded-md flex items-center justify-center p-1 ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`}><Trash2 size={18}/></button>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight relative z-10">{banco.nome}</span>
                        <div className="absolute -bottom-4 -right-4 text-white opacity-10"><Building2 size={120}/></div>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-1">
                        <div><p className="text-xs text-gray-400 uppercase tracking-wide font-bold mb-1">{banco.tipo}</p><h3 className={`text-2xl font-bold mb-4 ${textMain}`}>{formatarMoeda(banco.saldo)}</h3></div>
                        <button onClick={() => abrirEdicao(banco)} className={`w-full p-3 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'} ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL}`}><Pencil size={14}/> Atualizar Saldo</button>
                    </div>
                </div>
            ))}
        </div>
      )}

      <Modal isOpen={!!bancoEmEdicao} onClose={() => setBancoEmEdicao(null)} title="Atualizar Saldo" darkMode={darkMode}>
          <div className="space-y-4">
             <p className={`text-sm ${textSec}`}>Atualize o saldo atual da conta <strong>{bancoEmEdicao?.nome}</strong>.</p>
             {/* MUDANÇA: InputMoeda na Edição */}
             <div><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Novo Valor</label><InputMoeda className={inputClass} value={novoSaldoEdit} onChange={setNovoSaldoEdit} autoFocus /></div>
             <button onClick={salvarEdicao} className={`w-full p-3 rounded-xl font-bold text-white transition-colors ${THEME.primary.bg} ${THEME.primary.bgHover} ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Confirmar Alteração</button>
          </div>
      </Modal>

      <Modal isOpen={!!bancoParaDeletar} onClose={() => setBancoParaDeletar(null)} title="Excluir Conta?" darkMode={darkMode}>
        <div className="text-center space-y-4">
            <p className={textMain}>O histórico financeiro desta conta será perdido.</p>
            <div className="flex gap-3">
                <button onClick={() => setBancoParaDeletar(null)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button>
                <button onClick={confirmarExclusao} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg}`}>Sim, Excluir</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

const TabConfiguracoes = ({ darkMode, setDarkMode, zoomLevel, setZoomLevel, usuario, setUsuario, resetarApp, exportarDados, importarDados, fileInputRef, onNotify }) => {
  const [modalResetOpen, setModalResetOpen] = useState(false);
  const [modalRestoreOpen, setModalRestoreOpen] = useState(false);
  const [arquivoParaRestaurar, setArquivoParaRestaurar] = useState(null);
  
  // Estado para edição de nome
  const [modalNomeOpen, setModalNomeOpen] = useState(false);
  const [novoNomeUsuario, setNovoNomeUsuario] = useState('');

  const cardClass = darkMode ? `${THEME.layout.cardDark} ${THEME.layout.borderDark}` : `${THEME.layout.card} ${THEME.layout.border} shadow-xl shadow-blue-100/20`;
  const textMain = darkMode ? THEME.layout.textDark : THEME.layout.text;
  const textSec = darkMode ? THEME.layout.textSecDark : THEME.layout.textSec;
  const focusPadrao = darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL;
  const btnActionClass = `flex items-center justify-center gap-3 p-4 border rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'} ${focusPadrao}`;
  const inputClass = `w-full p-3 border rounded-xl transition-all ${darkMode ? FOCUS_DARK_AZUL : FOCUS_LIGHT_AZUL} ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.borderDark} ${THEME.layout.textDark} placeholder-gray-500` : `${THEME.layout.bg} ${THEME.layout.border} ${THEME.layout.text} placeholder-gray-500 focus:bg-white`}`;

  const handleFileSelect = (e) => { if(e.target.files.length > 0) { setArquivoParaRestaurar(e); setModalRestoreOpen(true); } };
  const confirmarRestauracao = () => { importarDados(arquivoParaRestaurar); setModalRestoreOpen(false); setArquivoParaRestaurar(null); };
  const confirmarReset = () => { resetarApp(); setModalResetOpen(false); };
  
  const abrirModalNome = () => { setNovoNomeUsuario(usuario.nome); setModalNomeOpen(true); };
  const salvarNome = () => { 
      if(novoNomeUsuario) { 
          setUsuario({...usuario, nome: novoNomeUsuario}); 
          setModalNomeOpen(false); 
          onNotify("Perfil atualizado!", "success"); 
      } 
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className={`${cardClass} p-6 rounded-2xl shadow-sm border`}>
        <h3 className={`font-bold text-xl tracking-tight mb-6 flex items-center gap-2 ${textMain}`}><Settings className={THEME.primary.text}/> Preferências do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className={`text-sm font-bold uppercase tracking-wider block mb-2 ${textSec}`}>Tema Visual</label><button onClick={() => setDarkMode(!darkMode)} className={`w-full p-3 rounded-xl flex items-center justify-center gap-3 font-bold transition-all ${darkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-50 text-gray-800 border border-gray-200'} ${focusPadrao}`}>{darkMode ? <><Sun size={20} className="text-yellow-400"/> Ativar Modo Claro</> : <><Moon size={20} className={THEME.primary.text}/> Ativar Modo Escuro</>}</button></div>
          <div><label className={`text-sm font-bold uppercase tracking-wider block mb-2 ${textSec}`}>Tamanho da Letra (Zoom)</label><div className={`flex items-center justify-between p-2 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}><button onClick={() => setZoomLevel(z => Math.max(0.8, z - 0.1))} className={`p-3 rounded-xl flex items-center justify-center ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} ${focusPadrao}`}><Minus size={20} className={textMain}/></button><span className={`font-bold ${textMain} flex items-center gap-2 text-lg`}><Type size={20}/> {Math.round(zoomLevel * 100)}%</span><button onClick={() => setZoomLevel(z => Math.min(1.5, z + 0.1))} className={`p-3 rounded-xl flex items-center justify-center ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} ${focusPadrao}`}><PlusCircle size={20} className={textMain}/></button></div></div>
        </div>
      </div>

      <div className={`${cardClass} p-6 rounded-2xl shadow-sm border`}>
        <h3 className={`font-bold text-xl tracking-tight mb-6 flex items-center gap-2 ${textMain}`}><User className={THEME.primary.text}/> Identidade</h3>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${THEME.primary.bg} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>{usuario.nome.charAt(0).toUpperCase()}</div>
          <div><p className={`text-xs font-bold uppercase tracking-wider ${textSec}`}>Nome de Guerra</p><div className="flex items-center gap-2"><span className={`text-xl font-bold ${textMain}`}>{usuario.nome}</span><button onClick={abrirModalNome} className={`${THEME.primary.text} hover:opacity-80 rounded-md p-1 flex items-center justify-center ${focusPadrao}`}><Pencil size={16}/></button></div></div>
        </div>
      </div>

      <div className={`${cardClass} p-6 rounded-2xl shadow-sm border`}>
        <h3 className={`font-bold text-xl tracking-tight mb-6 flex items-center gap-2 ${textMain}`}><Download className={THEME.success.text}/> Backup & Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><button onClick={exportarDados} className={btnActionClass}><Download size={20}/> Salvar Backup</button><div className="relative"><input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".json" /><button onClick={() => fileInputRef.current.click()} className={`w-full ${btnActionClass}`}><Upload size={20}/> Restaurar Dados</button></div></div>
      </div>

      <div className={`${darkMode ? 'bg-red-900/10 border-red-900' : 'bg-red-50 border-red-100'} p-6 rounded-2xl shadow-sm border`}>
        <h3 className={`font-bold text-xl tracking-tight mb-4 flex items-center gap-2 ${THEME.danger.text}`}><AlertTriangle className={THEME.danger.text}/> Zona de Perigo</h3>
        <p className={`text-sm mb-4 font-medium ${textSec}`}>Ação irreversível. Isso apagará todos os dados locais e reiniciará o aplicativo.</p>
        <button onClick={() => setModalResetOpen(true)} className={`flex items-center justify-center gap-3 p-4 border rounded-xl font-bold w-full transition-colors ${darkMode ? 'border-red-900 bg-red-900/20 text-red-400 hover:bg-red-900/40' : 'border-red-200 bg-white text-red-700 hover:bg-red-50'} ${darkMode ? FOCUS_DARK_VERMELHO : FOCUS_LIGHT_VERMELHO}`}><LogOut size={20}/> Zerar Sistema (Fábrica)</button>
      </div>

      <Modal isOpen={modalResetOpen} onClose={() => setModalResetOpen(false)} title="Zerar Tudo?" darkMode={darkMode}><div className="text-center space-y-4"><div className="flex justify-center mb-4"><AlertTriangle size={48} className="text-red-500" /></div><p className={textMain}>Todos os seus dados serão apagados permanentemente. Tem certeza?</p><div className="flex gap-3"><button onClick={() => setModalResetOpen(false)} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button><button onClick={confirmarReset} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.danger.bg}`}>SIM, ZERAR</button></div></div></Modal>
      <Modal isOpen={modalRestoreOpen} onClose={() => {setModalRestoreOpen(false); if(fileInputRef.current) fileInputRef.current.value='';}} title="Restaurar Backup?" darkMode={darkMode}><div className="text-center space-y-4"><p className={textMain}>Seus dados atuais serão substituídos pelos dados do arquivo.</p><div className="flex gap-3"><button onClick={() => {setModalRestoreOpen(false); if(fileInputRef.current) fileInputRef.current.value='';}} className={`flex-1 py-3 rounded-xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Cancelar</button><button onClick={confirmarRestauracao} className={`flex-1 py-3 rounded-xl font-bold text-white ${THEME.success.bg}`}>Restaurar</button></div></div></Modal>
      
      {/* MODAL EDITAR NOME */}
      <Modal isOpen={modalNomeOpen} onClose={() => setModalNomeOpen(false)} title="Editar Nome" darkMode={darkMode}>
          <div className="space-y-4">
              <div><label className={`text-xs font-bold uppercase mb-1 block ${textSec}`}>Novo Nome</label><input className={inputClass} value={novoNomeUsuario} onChange={e => setNovoNomeUsuario(e.target.value)} autoFocus /></div>
              <button onClick={salvarNome} className={`w-full p-3 rounded-xl font-bold text-white transition-colors ${THEME.primary.bg} ${THEME.primary.bgHover} ${darkMode ? FOCUS_DARK_BRANCO : FOCUS_LIGHT_AZUL}`}>Salvar</button>
          </div>
      </Modal>
    </div>
  );
};

// ==========================================
// 4. APP PRINCIPAL
// ==========================================

const FinanceDashboard = () => {
  // 1. LÓGICA DE ROTA 404
  const [paginaNaoEncontrada, setPaginaNaoEncontrada] = useState(() => {
    // Verifica a URL instantaneamente na inicialização
    const path = window.location.pathname;
    return path !== '/' && path !== '' && path !== '/index.html';
  });

  // 2. ESTADOS GLOBAIS
  // Declaramos aqui para garantir que o darkMode exista se cair na 404
  const [darkMode, setDarkMode] = useState(() => lerDados('fin_v20_dark', false));
  
  // Função para voltar para a home
  const voltarParaHome = () => {
    window.history.pushState({}, '', '/'); 
    setPaginaNaoEncontrada(false);
    setActiveTab('Dashboard');
  };

  // --- EARLY RETURN: SE FOR 404, PARE AQUI E MOSTRE O ERRO ---
  if (paginaNaoEncontrada) {
    return <NotFoundPage onVoltar={voltarParaHome} darkMode={darkMode} />;
  }

  // --- ESTADOS DO APP (Só carregam se estiver na Home) ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dataAtual, setDataAtual] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  const fileInputRef = useRef(null);
  const [notificacao, setNotificacao] = useState(null);
  const [modalPerfilOpen, setModalPerfilOpen] = useState(false);

  // DADOS DE NEGÓCIO (Persistência)
  const [zoomLevel, setZoomLevel] = useState(() => lerDados('fin_v20_zoom', 1));
  const [transacoes, setTransacoes] = useState(() => lerDados('fin_v20_transacoes', []));
  const [objetivos, setObjetivos] = useState(() => lerDados('fin_v20_objetivos', []));
  const [cartoes, setCartoes] = useState(() => lerDados('fin_v20_cartoes', []));
  const [bancos, setBancos] = useState(() => lerDados('fin_v20_bancos', []));
  const [usuario, setUsuario] = useState(() => lerDados('fin_v20_usuario', { nome: 'Operador' }));
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState(() => lerDados('fin_v20_conquistas', []));

  // --- HELPERS DE DATA ---
  const mudarAno = (offset) => { const d = new Date(dataAtual); d.setFullYear(dataAtual.getFullYear() + offset); setDataAtual(d); };
  const mudarMes = (offset) => { const d = new Date(dataAtual); d.setMonth(dataAtual.getMonth() + offset); setDataAtual(d); };
  const anoAtual = dataAtual.getFullYear();
  const mesAtualNome = dataAtual.toLocaleString('pt-BR', { month: 'long' });
  const pertenceAoMesAtual = (dataString) => { const [a, m] = dataString.split('-'); return Number(a) === anoAtual && Number(m) === (dataAtual.getMonth() + 1); };

  // --- EFEITOS (UseEffects) ---

  // ATUALIZAÇÃO DO TÍTULO DA PÁGINA
  useEffect(() => {
    document.title = `${activeTab} | Financly`;
  }, [activeTab]);

  // Simulação de Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Persistência no LocalStorage
  useEffect(() => {
    localStorage.setItem('fin_v20_transacoes', JSON.stringify(transacoes));
    localStorage.setItem('fin_v20_objetivos', JSON.stringify(objetivos));
    localStorage.setItem('fin_v20_cartoes', JSON.stringify(cartoes));
    localStorage.setItem('fin_v20_bancos', JSON.stringify(bancos));
    localStorage.setItem('fin_v20_usuario', JSON.stringify(usuario));
    localStorage.setItem('fin_v20_conquistas', JSON.stringify(conquistasDesbloqueadas));
    localStorage.setItem('fin_v20_dark', JSON.stringify(darkMode));
    localStorage.setItem('fin_v20_zoom', JSON.stringify(zoomLevel));
  }, [transacoes, objetivos, cartoes, bancos, usuario, conquistasDesbloqueadas, darkMode, zoomLevel]);

  // Notificações Helper
  const dispararNotificacao = (msg, type = 'success') => {
    setNotificacao({ msg, type });
    setTimeout(() => setNotificacao(null), 3000);
  };

  // Gamificação Lógica
  useEffect(() => {
    const novasConquistas = [...conquistasDesbloqueadas];
    const saldoTotal = bancos.reduce((acc, b) => acc + b.saldo, 0);
    const temRendaExtra = transacoes.some(t => t.tipo === 'entrada' && (t.descricao.toLowerCase().includes('uber') || t.descricao.toLowerCase().includes('extra')));
    const desbloquear = (id) => { if (!novasConquistas.find(c => c.id === id)) { const c = CONQUISTAS_SISTEMA.find(c => c.id === id); if(c) { novasConquistas.push(c); dispararNotificacao(`🏆 CONQUISTA DESBLOQUEADA: ${c.titulo}`, 'warning'); } } };
    
    if (transacoes.length > 0) desbloquear('start');
    if (objetivos.length > 0) desbloquear('meta1');
    if (bancos.length > 0) desbloquear('banco');
    if (cartoes.length > 0) desbloquear('card');
    if (temRendaExtra) desbloquear('extra');
    if (saldoTotal >= 5000) desbloquear('blindado');
    if (saldoTotal >= 20000) desbloquear('elite');
    if (saldoTotal >= 50000) desbloquear('lenda');
    
    if (novasConquistas.length > conquistasDesbloqueadas.length) setConquistasDesbloqueadas(novasConquistas);
  }, [transacoes, objetivos, bancos, cartoes, conquistasDesbloqueadas]); 

  // --- CÁLCULOS MEMOIZED (BLINDADOS) ---
  const transacoesDoMes = useMemo(() => transacoes.filter(t => pertenceAoMesAtual(t.data)), [transacoes, dataAtual]);
  const receitas = useMemo(() => transacoesDoMes.filter(t => t.tipo === 'entrada').reduce((acc, c) => acc + c.valor, 0), [transacoesDoMes]);
  const despesas = useMemo(() => transacoesDoMes.filter(t => t.tipo === 'saida').reduce((acc, c) => acc + c.valor, 0), [transacoesDoMes]);
  const saldo = receitas - despesas;
  
  // Proteção contra crash se compras for undefined
  const totalFaturas = cartoes.reduce((acc, c) => acc + (c.compras || []).reduce((sub, item) => sub + item.valorParcela, 0), 0);

  // --- FUNÇÕES DE SISTEMA (Export/Import/Reset) ---
  const exportarDados = () => {
    try {
      const dados = { transacoes, objetivos, cartoes, bancos, usuario, conquistasDesbloqueadas };
      const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); 
      a.href = url; 
      a.download = `backup_financeiro_${new Date().toISOString().split('T')[0]}.json`; 
      a.click();
      dispararNotificacao("Backup salvo na pasta de downloads!", "success");
    } catch (error) {
      dispararNotificacao("Erro ao gerar arquivo de backup.", "error");
    }
  };
  
  const importarDados = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try { const d = JSON.parse(ev.target.result); 
          if(d.transacoes) setTransacoes(d.transacoes); 
          if(d.objetivos) setObjetivos(d.objetivos);
          if(d.cartoes) setCartoes(d.cartoes); 
          if(d.bancos) setBancos(d.bancos);
          if(d.usuario) setUsuario(d.usuario); 
          if(d.conquistasDesbloqueadas) setConquistasDesbloqueadas(d.conquistasDesbloqueadas);
          dispararNotificacao("Backup restaurado e dados atualizados!", "success");
      } catch (err) { 
        dispararNotificacao("Falha ao ler o arquivo. Verifique se é um backup válido.", "error"); 
      }
      if(fileInputRef.current) fileInputRef.current.value = '';
    }; 
    reader.readAsText(file);
  };

  const resetarApp = () => {
      setTransacoes([]); 
      setObjetivos([]); 
      setCartoes([]); 
      setBancos([]); 
      setConquistasDesbloqueadas([]); 
      setUsuario({ nome: 'Operador' });
      dispararNotificacao("Sistema reiniciado para padrões de fábrica.", "warning");
  };

  // --- RENDERIZAÇÃO DO DASHBOARD ---
  return (
    <div className={`flex h-screen font-sans transition-colors duration-300 ${darkMode ? `${THEME.layout.bgDark} ${THEME.layout.textDark}` : `${THEME.layout.bg} ${THEME.layout.text}`}`} style={{ zoom: zoomLevel }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
      
      {/* Container Principal */}
      <main className="flex-1 md:ml-64 h-full overflow-y-auto relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32"> 
          
          <Header 
            anoAtual={anoAtual} 
            mesAtualNome={mesAtualNome} 
            mudarAno={mudarAno} 
            mudarMes={mudarMes} 
            usuario={usuario} 
            setModalPerfilOpen={setModalPerfilOpen} 
            darkMode={darkMode} 
          />
          
          {activeTab === 'Dashboard' && (
            <TabDashboard 
              loading={loading}
              transacoesDoMes={transacoesDoMes} 
              saldo={saldo} 
              receitas={receitas} 
              despesas={despesas} 
              totalFaturas={totalFaturas} 
              cartoes={cartoes} 
              mesAtualNome={mesAtualNome} 
              darkMode={darkMode} 
              setActiveTab={setActiveTab} 
            />
          )}

          {activeTab === 'Extrato' && <TabExtrato loading={loading} transacoes={transacoes} setTransacoes={setTransacoes} transacoesDoMes={transacoesDoMes} mesAtualNome={mesAtualNome} darkMode={darkMode} onNotify={dispararNotificacao} />}
          {activeTab === 'Gráficos' && <TabGraficos loading={loading} transacoesDoMes={transacoesDoMes} receitas={receitas} despesas={despesas} saldo={saldo} darkMode={darkMode} setActiveTab={setActiveTab} />}
          {activeTab === 'Carteira' && <TabCarteira loading={loading} cartoes={cartoes} setCartoes={setCartoes} darkMode={darkMode} onNotify={dispararNotificacao} />}
          {activeTab === 'Objetivos' && <TabObjetivos loading={loading} objetivos={objetivos} setObjetivos={setObjetivos} darkMode={darkMode} onNotify={dispararNotificacao} />}
          {activeTab === 'Bancos' && <TabBancos loading={loading} bancos={bancos} setBancos={setBancos} darkMode={darkMode} onNotify={dispararNotificacao} />}
          {activeTab === 'Configurações' && <TabConfiguracoes darkMode={darkMode} setDarkMode={setDarkMode} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} usuario={usuario} setUsuario={setUsuario} resetarApp={resetarApp} exportarDados={exportarDados} importarDados={importarDados} fileInputRef={fileInputRef} onNotify={dispararNotificacao} />}
          
        </div>
      </main>

      <NotificationToast 
        message={notificacao?.msg} 
        type={notificacao?.type} 
        onClose={() => setNotificacao(null)} 
      />
      
      <MobileMenu 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
      />

      <ModalPerfil 
        isOpen={modalPerfilOpen} 
        onClose={() => setModalPerfilOpen(false)} 
        usuario={usuario} 
        setUsuario={setUsuario} 
        conquistas={conquistasDesbloqueadas} 
      />

    </div>
  );
};

export default FinanceDashboard;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  Crosshair, 
  Shield, 
  Box, 
  Bell, 
  Zap, 
  Cloud, 
  LogOut, 
  ChevronRight,
  Copy,
  ClipboardPaste,
  RotateCcw,
  Edit2,
  Check,
  MousePointer2,
  Eye,
  Move,
  Package,
  Activity,
  User,
  Target,
  Flame,
  Globe,
  Lock,
  Terminal,
  FileCode,
  Upload,
  Key,
  Megaphone,
  History,
  ArrowRight,
  Monitor,
  Clock,
  Play,
  Keyboard,
  Save,
  Mail,
  MessageSquare,
  Infinity
} from 'lucide-react';
import { EvoriLogo } from './components/Logo';
import { Toggle, Slider, Select, Keybind } from './components/Controls';

type Tab = 'home' | 'silent-aim' | 'camlock' | 'triggerbot' | 'visuals' | 'movement' | 'misc' | 'admin' | 'console';
type MiscSubTab = 'settings' | 'configs' | 'live-table';
type AdminSubTab = 'notices' | 'changelogs' | 'keys';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [miscSubTab, setMiscSubTab] = useState<MiscSubTab>('settings');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('notices');
  const [consoleLogs, setConsoleLogs] = useState<{ type: 'info' | 'error' | 'success', msg: string, time: string }[]>([
    { type: 'info', msg: 'Evori System Initialized', time: '17:26:58' },
    { type: 'success', msg: 'Connected to server successfully', time: '17:26:59' }
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);
  
  const [configs, setConfigs] = useState([
    { id: 1, name: 'Legit Config', active: true, script: '-- Legit Config\ngetgenv()["evori"] = {\n  ["Silent Aim"] = { ["Enabled"] = true }\n}' },
    { id: 2, name: 'Rage Config', active: false, script: '-- Rage Config\ngetgenv()["evori"] = {\n  ["Silent Aim"] = { ["Enabled"] = true, ["Prediction"] = 0.2 }\n}' },
  ]);
  
  const [editingConfig, setEditingConfig] = useState<number | null>(null);
  const [generatedKeys, setGeneratedKeys] = useState([
    { value: 'EVORI-7A9B-2C4D-1E3F', time: '2 hours ago' },
    { value: 'EVORI-9X2Y-5Z8W-3Q1P', time: '5 hours ago' }
  ]);
  
  const [notices, setNotices] = useState([
    { id: 1, title: 'Welcome to Evori', content: 'Welcome to Evori! Make sure to join our Discord for the latest updates and support.', date: 'Feb 15, 2026', author: 'Admin', pinned: true },
    { id: 2, title: 'Update v2.5', content: 'New features: Improved silent aim prediction, added 3D box ESP, fixed resolver issues.', date: 'Feb 15, 2026', author: 'Dev Team' },
    { id: 3, title: 'cat is gay', content: 'gay gay gay gay gay', date: 'Feb 17, 2026', author: 'developer' }
  ]);
  
  const [changelogs, setChangelogs] = useState([
    { id: 1, version: 'v2.5.0 - RELEASE', changes: ['Added C# Live Table theme', 'Fixed slider positioning', 'Improved neon glow effects', 'Fixed Misc tab scaling bug'], date: 'Mar 09' },
    { id: 2, version: 'vniger - dasd', changes: ['asdsadasdasdsad'], date: 'Feb 17' },
    { id: 3, version: 'v1.5.1 - TEST', changes: ['test 1', 'test 2', 'test 3', '-- dev team'], date: 'Feb 16' }
  ]);

  const deleteNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    addConsoleLog('success', `Deleted notice #${id}`);
  };

  const deleteChangelog = (id: number) => {
    setChangelogs(prev => prev.filter(c => c.id !== id));
    addConsoleLog('success', `Deleted changelog #${id}`);
  };

  // Comprehensive settings state based on Lua reference
  const [settings, setSettings] = useState({
    global: {
      targetActivation: 'Target',
      binds: {
        aimBot: 'C',
        triggerBot: 'C',
        silentAim: 'C',
        inventorySorter: 'F2',
        walkSpeed: 'G',
        jumpPower: 'Y'
      },
      checks: {
        wall: true,
        knocked: true,
        selfKnocked: true,
        grabbed: true,
        selfGrabbed: true
      }
    },
    silentAim: {
      enabled: true,
      range: 450,
      predictionX: 0.170,
      predictionY: 0.170,
      hitpart: 'Head',
      clientRedirection: false,
      fovMode: '2D Box',
      fovX: 15,
      fovY: 15,
      radius: 50,
      showFov: true
    },
    camlock: {
      enabled: true,
      range: 350,
      hitpart: 'Head',
      smoothing: false,
      shake: true,
      humanize: false,
      radius: 50,
      showFov: true
    },
    triggerbot: {
      enabled: true,
      range: 400,
      activation: 'Hold',
      input: 'Mouse',
      cooldown: 0.8,
      minCooldown: 0.5,
      dynamic: false
    },
    visuals: {
      espEnabled: true,
      nameEsp: true,
      nameType: 'Real',
      boxEsp: true,
      boxType: 'Corner Box',
      targetLine: true,
      spreadMods: true
    },
    movement: {
      walkspeedEnabled: true,
      walkMultiplier: 8,
      jumpEnabled: true,
      jumpMultiplier: 8,
      lowHPThreshold: 40,
      inventorySorter: true,
      sortType: 'Delete'
    }
  });

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'silent-aim', label: 'Silent Aim', icon: Crosshair },
    { id: 'camlock', label: 'Camlock', icon: Lock },
    { id: 'triggerbot', label: 'Triggerbot', icon: MousePointer2 },
    { id: 'visuals', label: 'Visuals', icon: Eye },
    { id: 'movement', label: 'Movement', icon: Move },
    { id: 'misc', label: 'Settings', icon: Settings },
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  const addConsoleLog = (type: 'info' | 'error' | 'success', msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setConsoleLogs(prev => [...prev, { type, msg, time }]);
    setTimeout(() => consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 10);
  };

  // Expose to window for "real" console feel
  (window as any).evoriPrint = (msg: string) => addConsoleLog('info', msg);
  (window as any).evoriError = (msg: string) => addConsoleLog('error', msg);
  (window as any).evoriSuccess = (msg: string) => addConsoleLog('success', msg);

  const handleConsoleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour12: false });
    addConsoleLog('info', `> ${consoleInput}`);
    
    const args = consoleInput.trim().split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'clear':
        setConsoleLogs([]);
        break;
      case 'help':
        addConsoleLog('info', 'Commands: clear, help, status, version, print <msg>, set <cat> <key> <val>, toggle <cat> <key>');
        break;
      case 'status':
        addConsoleLog('success', 'System Status: Optimal. All modules active.');
        break;
      case 'version':
        addConsoleLog('info', 'Evori v2.5.0-RELEASE (Build 1003)');
        break;
      case 'print':
        addConsoleLog('info', args.slice(1).join(' '));
        break;
      case 'toggle':
        if (args.length < 3) {
          addConsoleLog('error', 'Usage: toggle <category> <key>');
          break;
        }
        const cat = args[1] as keyof typeof settings;
        const key = args[2];
        if (settings[cat] && typeof (settings[cat] as any)[key] === 'boolean') {
          setSettings(prev => ({
            ...prev,
            [cat]: {
              ...(prev[cat] as any),
              [key]: !(prev[cat] as any)[key]
            }
          }));
          addConsoleLog('success', `Toggled ${String(cat)}.${String(key)} to ${!(settings[cat] as any)[key]}`);
        } else {
          addConsoleLog('error', `Invalid category or key: ${String(cat)}.${String(key)}`);
        }
        break;
      case 'set':
        if (args.length < 4) {
          addConsoleLog('error', 'Usage: set <category> <key> <value>');
          break;
        }
        const sCat = args[1] as keyof typeof settings;
        const sKey = args[2];
        const sVal = args[3];
        if (settings[sCat] && (settings[sCat] as any).hasOwnProperty(sKey)) {
          let parsedVal: any = sVal;
          if (sVal === 'true') parsedVal = true;
          else if (sVal === 'false') parsedVal = false;
          else if (!isNaN(Number(sVal))) parsedVal = Number(sVal);
          
          setSettings(prev => ({
            ...prev,
            [sCat]: {
              ...(prev[sCat] as any),
              [sKey]: parsedVal
            }
          }));
          addConsoleLog('success', `Set ${String(sCat)}.${String(sKey)} to ${parsedVal}`);
        } else {
          addConsoleLog('error', `Invalid category or key: ${String(sCat)}.${String(sKey)}`);
        }
        break;
      case 'admin':
        if (args[1] === 'delete_notice' && args[2]) {
          deleteNotice(Number(args[2]));
        } else if (args[1] === 'delete_changelog' && args[2]) {
          deleteChangelog(Number(args[2]));
        } else if (args[1] === 'announce' && args[2]) {
          const msg = args.slice(2).join(' ');
          setNotices(prev => [{
            id: Date.now(),
            title: 'Admin Announcement',
            content: msg,
            date: new Date().toLocaleDateString(),
            author: 'Admin',
            pinned: true
          }, ...prev]);
          addConsoleLog('success', 'Announcement posted');
        } else {
          addConsoleLog('info', 'Admin commands: admin delete_notice <id>, admin delete_changelog <id>, admin announce <msg>');
        }
        break;
      default:
        addConsoleLog('error', `Unknown command: ${cmd}`);
    }
    
    setConsoleInput('');
  };

  const downloadConfig = (config: any) => {
    const element = document.createElement("a");
    const file = new Blob([config.script], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${config.name.toLowerCase().replace(/\s+/g, '_')}.lua`;
    document.body.appendChild(element);
    element.click();
  };

  const luaScript = `getgenv()["evori"] = {
   ["Global"] = {
        ["TargetActivation"] = "${settings.global.targetActivation}",
        ["Binds"] = {
            ["Aim Bot Target"] = "${settings.global.binds.aimBot}",
            ["Trigger Bot"] = "${settings.global.binds.triggerBot}",
            ["Trigger Bot Target"] = "${settings.global.binds.triggerBot}",
            ["Silent Aim Target"] = "${settings.global.binds.silentAim}",
            ["Inventory Sorter"] = "${settings.global.binds.inventorySorter}",
            ["Walk Speed Toggle"] = "${settings.global.binds.walkSpeed}",
            ["Jump Power Toggle"] = "${settings.global.binds.jumpPower}",
        },
        ["Checks"] = {
            ["Wall Check"] = ${settings.global.checks.wall},       
            ["Knocked Check"] = ${settings.global.checks.knocked},   
            ["Self Knocked"] = ${settings.global.checks.selfKnocked},     
            ["Grabbed Check"] = ${settings.global.checks.grabbed},   
            ["Self Grabbed"] = ${settings.global.checks.selfGrabbed},     
        },
    },
    ["Silent Aim"] = {
        ["Enabled"] = ${settings.silentAim.enabled},
        ["Range"] = ${settings.silentAim.range},
        ["Prediction"] = {
            ["X"] = ${settings.silentAim.predictionX},
            ["Y"] = ${settings.silentAim.predictionY},
        },
        ["Hitpart"] = "${settings.silentAim.hitpart}",
        ["ClientRedirection"] = ${settings.silentAim.clientRedirection},
        ["Fov Box"] = {
            ["ShowFov"] = ${settings.silentAim.showFov},
            ["Mode"] = "${settings.silentAim.fovMode}",
            ["X"] = ${settings.silentAim.fovX},
            ["Y"] = ${settings.silentAim.fovY},
        },
        ["Circular Radius"] = {
            ["Radius"] = ${settings.silentAim.radius},
        },
    },
    ["AimAssist"] = {
        ["Enabled"] = ${settings.camlock.enabled},
        ["Range"] = ${settings.camlock.range},
        ["Hitpart"] = "${settings.camlock.hitpart}",
        ["Smoothing"] = {
            ["Enabled"] = ${settings.camlock.smoothing},
        },
        ["Shake"] = {
            ["Enabled"] = ${settings.camlock.shake},
            ["Humanize"] = ${settings.camlock.humanize},
        },
        ["Circular Radius"] = {
            ["Radius"] = ${settings.camlock.radius},
        },
    },
    ["Triggerbot"] = {
        ["Enabled"] = ${settings.triggerbot.enabled},
        ["Range"] = ${settings.triggerbot.range},
        ["Global"] = {
            ["Activation"] = "${settings.triggerbot.activation}",
            ["Input"] = "${settings.triggerbot.input}",
        },
        ["Delay"] = {
            ["Cooldown"] = ${settings.triggerbot.cooldown},
            ["Minimum Cooldown"] = ${settings.triggerbot.minCooldown},
            ["Dynamic"] = ${settings.triggerbot.dynamic},
        },
    },
    ["Visuals"] = {
        ["ESP"] = {
            ["Enabled"] = ${settings.visuals.espEnabled},
            ["Settings"] = {
                ["NameEsp"] = {
                    ["Enabled"] = ${settings.visuals.nameEsp},
                    ["Name Type"] = "${settings.visuals.nameType}",
                },
                ["BoxEsp"] = {
                    ["Enabled"] = ${settings.visuals.boxEsp},
                    ["Type"] = "${settings.visuals.boxType}",
                },
                ["SpreadMods"] = {
                    ["Enabled"] = ${settings.visuals.spreadMods},
                },
            },
        },
    },
    ["Walkspeed"] = {
        ["Enabled"] = ${settings.movement.walkspeedEnabled},
        ["Multiplier"] = {
            ["Normal"] = {
                ["Multiplier"] = ${settings.movement.walkMultiplier},
            },
        },
    },
    ["JumpPower"] = {
        ["Enabled"] = ${settings.movement.jumpEnabled},
        ["Multiplier"] = {
            ["Normal"] = {
                ["Multiplier"] = ${settings.movement.jumpMultiplier},
            },
        },
    },
}`;

  if (showLanding) {
    return <LandingPage onLaunch={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-bg-dark relative overflow-hidden flex flex-col items-center justify-center p-6">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-card p-10 space-y-8 border-zinc-800/50">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
                <EvoriLogo className="w-16 h-16" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Evori</h1>
                <p className="text-zinc-500 text-sm font-medium">Professional Gaming Utility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">License Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="password" 
                    placeholder="EVORI-XXXX-XXXX-XXXX"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple/50 transition-all"
                  />
                </div>
              </div>
              
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
              >
                Authenticate
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-zinc-800/50">
              <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">Discord</a>
              <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">Support</a>
              <a href="#" className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">Pricing</a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden grid-bg">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border-dark bg-bg-dark/50 backdrop-blur-2xl flex flex-col z-20">
        <div className="p-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
            <EvoriLogo className="w-12 h-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white">Evori</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">v2.5.0</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4 px-4">Core</div>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`nav-item w-full ${activeTab === item.id ? 'nav-item-active' : 'nav-item-inactive'}`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand-purple' : ''}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border-dark bg-zinc-900/20">
          <div className="flex items-center gap-3 px-2 py-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">User#0001</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Premium Access</span>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto space-y-10"
            >
              <div className="flex items-end justify-between border-b border-zinc-800 pb-10">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    Dashboard
                  </h1>
                  <p className="text-zinc-500 text-sm font-medium">Welcome back, User#0001. System status is optimal.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Server Time</span>
                    <span className="text-sm font-mono text-zinc-300">17:26:58</span>
                  </div>
                  <div className="w-[1px] h-8 bg-zinc-800" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Version</span>
                    <span className="text-sm font-mono text-zinc-300">2.5.0</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <FuturisticCard title="System Status" icon={Shield} badge="Secure">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Undetected</span>
                        </div>
                        <Shield className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                          <span>Kernel Integrity</span>
                          <span className="text-white">100%</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="h-full bg-brand-purple" 
                          />
                        </div>
                      </div>
                      <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">HWID Spoofer: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-brand-purple" />
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stream Proof: Active</span>
                        </div>
                      </div>
                    </div>
                  </FuturisticCard>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureCard 
                    icon={Crosshair} 
                    title="Silent Aim" 
                    status={settings.silentAim.enabled ? 'Active' : 'Disabled'} 
                    desc="High-precision target redirection with customizable prediction."
                    onClick={() => setActiveTab('silent-aim')}
                  />
                  <FeatureCard 
                    icon={Lock} 
                    title="Camlock" 
                    status={settings.camlock.enabled ? 'Active' : 'Disabled'} 
                    desc="Smooth camera assistance with humanized shake patterns."
                    onClick={() => setActiveTab('camlock')}
                  />
                  <FeatureCard 
                    icon={MousePointer2} 
                    title="Triggerbot" 
                    status={settings.triggerbot.enabled ? 'Active' : 'Disabled'} 
                    desc="Automatic firing logic with custom delays and weapon speeds."
                    onClick={() => setActiveTab('triggerbot')}
                  />
                  <FeatureCard 
                    icon={Eye} 
                    title="Visuals" 
                    status={settings.visuals.espEnabled ? 'Active' : 'Disabled'} 
                    desc="Comprehensive ESP system with 2D/3D box rendering."
                    onClick={() => setActiveTab('visuals')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FuturisticCard title="Recent Activity" icon={Activity}>
                  <div className="space-y-4">
                    {[
                      { msg: 'Connected to server', time: '2m ago', type: 'success' },
                      { msg: 'Loaded config "Legit"', time: '15m ago', type: 'info' },
                      { msg: 'System check completed', time: '1h ago', type: 'success' }
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'success' ? 'bg-emerald-500' : 'bg-brand-purple'}`} />
                          <span className="text-sm text-zinc-400">{log.msg}</span>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </FuturisticCard>

                <FuturisticCard title="Quick Actions" icon={Zap}>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all flex flex-col items-center gap-2 group">
                      <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      Reset Settings
                    </button>
                    <button className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all flex flex-col items-center gap-2 group">
                      <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                      Export Config
                    </button>
                    <button className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all flex flex-col items-center gap-2 group">
                      <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Clear Logs
                    </button>
                    <button className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all flex flex-col items-center gap-2 group">
                      <Zap className="w-4 h-4 group-hover:animate-pulse" />
                      Re-Inject
                    </button>
                  </div>
                </FuturisticCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FuturisticCard title="System Notices" icon={Bell} badge="Live">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {notices.map((notice) => (
                      <div key={notice.id} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-2 relative group/item">
                        {notice.pinned && <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_10px_#8b5cf6]" />}
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white group-hover/item:text-brand-purple transition-colors">{notice.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-600">{notice.date}</span>
                            <button 
                              onClick={() => deleteNotice(notice.id)}
                              className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                            >
                              <LogOut className="w-3 h-3 text-red-500 rotate-90" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">{notice.content}</p>
                      </div>
                    ))}
                  </div>
                </FuturisticCard>

                <FuturisticCard title="Changelogs" icon={History}>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {changelogs.map((log) => (
                      <div key={log.id} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-3 group/item">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{log.version}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{log.date}</span>
                            <button 
                              onClick={() => deleteChangelog(log.id)}
                              className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                            >
                              <LogOut className="w-3 h-3 text-red-500 rotate-90" />
                            </button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {log.changes.map((change, i) => (
                            <li key={i} className="text-[11px] text-zinc-500 flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </FuturisticCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'misc' && (
            <motion.div
              key="misc"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-6xl mx-auto space-y-8 w-full"
            >
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Miscellaneous</h1>
                <div className="flex bg-bg-dark/50 border border-border-dark p-1 rounded-xl">
                  {(['settings', 'configs', 'live-table'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMiscSubTab(tab)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        miscSubTab === tab ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {tab.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {miscSubTab === 'settings' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 space-y-4">
                    <SectionHeader icon={Settings} title="Global" subtitle="Settings" />
                    <Select label="Target Activation" options={['Target', 'Automatic']} value={settings.global.targetActivation} onChange={(v) => setSettings({...settings, global: {...settings.global, targetActivation: v}})} />
                    <div className="space-y-4 pt-4 border-t border-border-dark">
                      <SectionHeader icon={Keyboard} title="Keybinds" subtitle="Configuration" />
                      <div className="grid grid-cols-2 gap-4">
                        <Keybind label="Aim Bot" value={settings.global.binds.aimBot} onChange={(v) => setSettings({...settings, global: {...settings.global, binds: {...settings.global.binds, aimBot: v}}})} />
                        <Keybind label="Trigger Bot" value={settings.global.binds.triggerBot} onChange={(v) => setSettings({...settings, global: {...settings.global, binds: {...settings.global.binds, triggerBot: v}}})} />
                        <Keybind label="Silent Aim" value={settings.global.binds.silentAim} onChange={(v) => setSettings({...settings, global: {...settings.global, binds: {...settings.global.binds, silentAim: v}}})} />
                        <Keybind label="Inventory" value={settings.global.binds.inventorySorter} onChange={(v) => setSettings({...settings, global: {...settings.global, binds: {...settings.global.binds, inventorySorter: v}}})} />
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-6 space-y-4">
                    <SectionHeader icon={Shield} title="Safety" subtitle="Checks" />
                    <Toggle label="Wall Check" enabled={settings.global.checks.wall} onChange={(v) => setSettings({...settings, global: {...settings.global, checks: {...settings.global.checks, wall: v}}})} />
                    <Toggle label="Knocked Check" enabled={settings.global.checks.knocked} onChange={(v) => setSettings({...settings, global: {...settings.global, checks: {...settings.global.checks, knocked: v}}})} />
                    <Toggle label="Grabbed Check" enabled={settings.global.checks.grabbed} onChange={(v) => setSettings({...settings, global: {...settings.global, checks: {...settings.global.checks, grabbed: v}}})} />
                  </div>
                </div>
              )}

              {miscSubTab === 'configs' && (
                <div className="glass-card p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-border-dark pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Cloud className="w-4 h-4 text-brand-purple" />
                      <span className="font-semibold text-white">Cloud</span> Storage
                    </div>
                    <button 
                      onClick={() => downloadConfig(configs[0])}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 border border-brand-purple/20 rounded-lg text-xs font-bold text-brand-purple hover:bg-brand-purple hover:text-white transition-all"
                    >
                      <Save className="w-3 h-3" />
                      Save Config
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configs.map((config) => (
                      <div key={config.id} className="space-y-4">
                        <div className="bg-bg-dark/30 border border-border-dark rounded-xl p-4 flex items-center justify-between group hover:border-brand-purple/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-300">{config.name}</span>
                            <button 
                              onClick={() => setEditingConfig(editingConfig === config.id ? null : config.id)}
                              className="text-gray-600 hover:text-white transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <ConfigButton icon={Check} label="Set Active" active={config.active} />
                            <ConfigButton icon={Copy} label="Copy" />
                            <ConfigButton icon={ClipboardPaste} label="Paste" />
                            <ConfigButton icon={RotateCcw} label="Reset" danger />
                          </div>
                        </div>
                        {editingConfig === config.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-4 space-y-4">
                            <textarea 
                              className="w-full h-48 bg-bg-dark border border-border-dark rounded-lg p-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-brand-purple transition-colors resize-none"
                              defaultValue={config.script}
                            />
                            <div className="border-2 border-dashed border-border-dark rounded-lg p-8 text-center group hover:border-brand-purple/50 transition-colors cursor-pointer">
                              <Upload className="w-6 h-6 text-gray-600 mx-auto mb-2 group-hover:text-brand-purple transition-colors" />
                              <p className="text-xs text-gray-500">Drag and drop a <span className="text-white">.lua</span> or <span className="text-white">.json</span> config file</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {miscSubTab === 'live-table' && (
                <div className="glass-card p-6 space-y-4 border-brand-blue/20">
                  <div className="flex items-center justify-between">
                    <SectionHeader icon={FileCode} title="Live" subtitle="C# Table" color="text-brand-blue" />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(luaScript);
                      }}
                      className="px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-lg text-xs font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Copy className="w-3 h-3" /> Copy Table
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-brand-blue/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <pre className="relative w-full h-[500px] bg-[#0d1117] border border-brand-blue/30 rounded-xl p-6 text-xs font-mono text-brand-blue overflow-auto custom-scrollbar shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                      <code className="text-blue-400">
                        {luaScript}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight text-white">System Console</h1>
                  <p className="text-zinc-500 text-sm font-medium">Execute commands and monitor system output.</p>
                </div>
                <button 
                  onClick={() => setConsoleLogs([])}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Clear Console
                </button>
              </div>

              <div className="flex-1 glass-card border-zinc-800/50 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar">
                  {consoleLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                      <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                      <span className={`
                        ${log.type === 'error' ? 'text-rose-500' : ''}
                        ${log.type === 'success' ? 'text-emerald-500' : ''}
                        ${log.type === 'info' ? 'text-zinc-400' : ''}
                      `}>
                        {log.msg}
                      </span>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
                <form onSubmit={handleConsoleCommand} className="p-4 bg-zinc-900/50 border-t border-zinc-800 flex items-center gap-4">
                  <Terminal className="w-4 h-4 text-zinc-600" />
                  <input 
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    placeholder="Type a command (help, status, clear)..."
                    className="flex-1 bg-transparent border-none text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none"
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Admin Panel</h1>
                <div className="flex bg-bg-dark/50 border border-border-dark p-1 rounded-xl">
                  {(['notices', 'changelogs', 'keys'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAdminSubTab(tab)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        adminSubTab === tab ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {adminSubTab === 'keys' && (
                <div className="glass-card p-6 space-y-6">
                  <SectionHeader icon={Key} title="Key" subtitle="Management" />
                  <div className="flex gap-4">
                    <input className="flex-1 bg-bg-dark border border-border-dark rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" placeholder="Prefix (optional)" />
                    <button 
                      onClick={() => {
                        const newKey = 'EVORI-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
                        setGeneratedKeys([{ value: newKey, time: 'Just now' }, ...generatedKeys]);
                      }}
                      className="bg-brand-purple px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                      Generate New Key
                    </button>
                  </div>
              <div className="space-y-2">
                {generatedKeys.map((key, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-bg-dark/50 border border-border-dark rounded-xl group hover:border-brand-purple/50 transition-all">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-mono text-white">{key.value}</span>
                      <span className="text-[10px] text-gray-600 font-bold uppercase">Created {key.time}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Active</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(key.value)}
                        className="text-gray-600 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                </div>
              )}

              {adminSubTab === 'notices' && (
                <div className="glass-card p-6 space-y-6">
                  <SectionHeader icon={Megaphone} title="Post" subtitle="Announcement" />
                  <div className="space-y-4">
                    <input className="w-full bg-bg-dark border border-border-dark rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" placeholder="Announcement Title" />
                    <textarea className="w-full h-32 bg-bg-dark border border-border-dark rounded-lg p-4 text-sm text-gray-400 focus:outline-none focus:border-brand-purple resize-none" placeholder="Announcement Content..." />
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => {
                          const titleInput = document.querySelector('input[placeholder="Announcement Title"]') as HTMLInputElement;
                          const contentInput = document.querySelector('textarea[placeholder="Announcement Content..."]') as HTMLTextAreaElement;
                          if (titleInput.value && contentInput.value) {
                            setNotices([{
                              id: notices.length + 1,
                              title: titleInput.value,
                              content: contentInput.value,
                              date: new Date().toLocaleDateString(),
                              pinned: false
                            }, ...notices]);
                            titleInput.value = '';
                            contentInput.value = '';
                          }
                        }}
                        className="flex-1 bg-brand-purple py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform"
                      >
                        Publish Announcement
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {adminSubTab === 'changelogs' && (
                <div className="glass-card p-6 space-y-6">
                  <SectionHeader icon={History} title="Manage" subtitle="Changelogs" />
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input className="w-32 bg-bg-dark border border-border-dark rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" placeholder="v1.0.0" />
                      <input className="flex-1 bg-bg-dark border border-border-dark rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" placeholder="Added new feature..." />
                      <button className="bg-brand-purple px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform">Add Change</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'silent-aim' && (
            <motion.div
              key="silent-aim"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2 text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter">Silent Aim</h1>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Crosshair} title="Main" subtitle="Preferences" />
                <Toggle label="Enabled" enabled={settings.silentAim.enabled} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, enabled: v}})} />
                <Slider label="Range" value={settings.silentAim.range} min={0} max={1000} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, range: v}})} />
                <div className="grid grid-cols-2 gap-4">
                  <Slider label="Prediction X" value={settings.silentAim.predictionX} min={0} max={1} step={0.001} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, predictionX: v}})} />
                  <Slider label="Prediction Y" value={settings.silentAim.predictionY} min={0} max={1} step={0.001} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, predictionY: v}})} />
                </div>
                <Select label="Hitpart" options={['Head', 'UpperTorso', 'LowerTorso', 'Closest Point']} value={settings.silentAim.hitpart} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, hitpart: v}})} />
                <Toggle label="Client Redirection" enabled={settings.silentAim.clientRedirection} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, clientRedirection: v}})} />
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Target} title="FOV" subtitle="Settings" />
                <Toggle label="Show FOV" enabled={settings.silentAim.showFov} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, showFov: v}})} />
                <Select label="Mode" options={['Circle', '2D Box', '3D Box']} value={settings.silentAim.fovMode} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, fovMode: v}})} />
                <div className="grid grid-cols-2 gap-4">
                  <Slider label="FOV X" value={settings.silentAim.fovX} min={0} max={100} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, fovX: v}})} />
                  <Slider label="FOV Y" value={settings.silentAim.fovY} min={0} max={100} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, fovY: v}})} />
                </div>
                <Slider label="Circular Radius" value={settings.silentAim.radius} min={0} max={500} onChange={(v) => setSettings({...settings, silentAim: {...settings.silentAim, radius: v}})} />
              </div>
            </motion.div>
          )}

          {activeTab === 'camlock' && (
            <motion.div
              key="camlock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2 text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter">Camlock</h1>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Lock} title="Main" subtitle="Settings" />
                <Toggle label="Enabled" enabled={settings.camlock.enabled} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, enabled: v}})} />
                <Slider label="Range" value={settings.camlock.range} min={0} max={1000} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, range: v}})} />
                <Select label="Hitpart" options={['Head', 'UpperTorso', 'LowerTorso', 'Closest Point']} value={settings.camlock.hitpart} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, hitpart: v}})} />
                <Toggle label="Smoothing" enabled={settings.camlock.smoothing} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, smoothing: v}})} />
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Zap} title="Shake" subtitle="& Humanize" />
                <Toggle label="Shake Enabled" enabled={settings.camlock.shake} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, shake: v}})} />
                <Toggle label="Humanize Shake" enabled={settings.camlock.humanize} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, humanize: v}})} />
                <Slider label="FOV Radius" value={settings.camlock.radius} min={0} max={500} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, radius: v}})} />
                <Toggle label="Show FOV" enabled={settings.camlock.showFov} onChange={(v) => setSettings({...settings, camlock: {...settings.camlock, showFov: v}})} />
              </div>
            </motion.div>
          )}


          {activeTab === 'triggerbot' && (
            <motion.div
              key="triggerbot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2 text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter">Triggerbot</h1>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={MousePointer2} title="Main" subtitle="Settings" />
                <Toggle label="Enabled" enabled={settings.triggerbot.enabled} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, enabled: v}})} />
                <Slider label="Range" value={settings.triggerbot.range} min={0} max={1000} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, range: v}})} />
                <Select label="Activation" options={['Hold', 'Toggle']} value={settings.triggerbot.activation} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, activation: v}})} />
                <Select label="Input" options={['Mouse', 'Keyboard']} value={settings.triggerbot.input} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, input: v}})} />
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={RotateCcw} title="Delay" subtitle="Configuration" />
                <Slider label="Cooldown" value={settings.triggerbot.cooldown} min={0} max={2} step={0.1} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, cooldown: v}})} />
                <Slider label="Min Cooldown" value={settings.triggerbot.minCooldown} min={0} max={1} step={0.1} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, minCooldown: v}})} />
                <Toggle label="Dynamic Speed" enabled={settings.triggerbot.dynamic} onChange={(v) => setSettings({...settings, triggerbot: {...settings.triggerbot, dynamic: v}})} />
              </div>
            </motion.div>
          )}

          {activeTab === 'visuals' && (
            <motion.div
              key="visuals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2 text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter">Visuals</h1>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Eye} title="ESP" subtitle="Settings" />
                <Toggle label="Enabled" enabled={settings.visuals.espEnabled} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, espEnabled: v}})} />
                <Keybind label="Toggle Bind" value="F2" onChange={() => {}} />
                <div className="pt-4 border-t border-border-dark space-y-4">
                  <Toggle label="Name ESP" enabled={settings.visuals.nameEsp} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, nameEsp: v}})} />
                  <Select label="Name Type" options={['Real', 'Display']} value={settings.visuals.nameType} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, nameType: v}})} />
                </div>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Box} title="Box" subtitle="ESP" />
                <Toggle label="Box ESP" enabled={settings.visuals.boxEsp} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, boxEsp: v}})} />
                <Select label="Box Type" options={['Corner Box', 'Full Box', '3D Box']} value={settings.visuals.boxType} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, boxType: v}})} />
                <Toggle label="Target Line" enabled={settings.visuals.targetLine} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, targetLine: v}})} />
                <Toggle label="Spread Mods" enabled={settings.visuals.spreadMods} onChange={(v) => setSettings({...settings, visuals: {...settings.visuals, spreadMods: v}})} />
              </div>
            </motion.div>
          )}

          {activeTab === 'movement' && (
            <motion.div
              key="movement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-2 text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tighter">Movement</h1>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Move} title="Walkspeed" subtitle="& Jump" />
                <Toggle label="Walkspeed Enabled" enabled={settings.movement.walkspeedEnabled} onChange={(v) => setSettings({...settings, movement: {...settings.movement, walkspeedEnabled: v}})} />
                <Slider label="Walk Multiplier" value={settings.movement.walkMultiplier} min={1} max={50} onChange={(v) => setSettings({...settings, movement: {...settings.movement, walkMultiplier: v}})} />
                <div className="pt-4 border-t border-border-dark space-y-4">
                  <Toggle label="JumpPower Enabled" enabled={settings.movement.jumpEnabled} onChange={(v) => setSettings({...settings, movement: {...settings.movement, jumpEnabled: v}})} />
                  <Slider label="Jump Multiplier" value={settings.movement.jumpMultiplier} min={1} max={50} onChange={(v) => setSettings({...settings, movement: {...settings.movement, jumpMultiplier: v}})} />
                </div>
              </div>

              <div className="glass-card p-6 space-y-4">
                <SectionHeader icon={Package} title="Inventory" subtitle="Sorter" />
                <Toggle label="Enabled" enabled={settings.movement.inventorySorter} onChange={(v) => setSettings({...settings, movement: {...settings.movement, inventorySorter: v}})} />
                <Select label="Sort Type" options={['Delete', 'Backup']} value={settings.movement.sortType} onChange={(v) => setSettings({...settings, movement: {...settings.movement, sortType: v}})} />
                <Slider label="Low HP Threshold" value={settings.movement.lowHPThreshold} min={0} max={100} onChange={(v) => setSettings({...settings, movement: {...settings.movement, lowHPThreshold: v}})} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function DiscordCard() {
  return (
    <div className="glass-card p-8 text-center space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-purple opacity-20 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-border-dark group-hover:border-brand-purple transition-colors">
          <img 
            src="https://cdn.discordapp.com/avatars/1236829247511986207/a_66f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7.png?size=256" 
            alt="Discord PFP" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Evori&background=a855f7&color=fff";
            }}
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bg-dark border-4 border-bg-dark flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-black tracking-tighter text-white">lawton</h3>
        <p className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em]">Founder</p>
      </div>

      <div className="space-y-2">
        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Mail className="w-3.5 h-3.5" /> contact@lawton.gg
        </button>
        <button className="w-full py-3 bg-[#5865F2] text-white rounded-xl text-xs font-bold hover:bg-[#4752C4] transition-colors flex items-center justify-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" /> Discord
        </button>
      </div>
    </div>
  );
}

function QualityCard({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="glass-card p-10 space-y-6 text-left group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-4 rounded-2xl bg-brand-purple/10 w-fit group-hover:bg-brand-purple/20 transition-colors">
        <Icon className="w-8 h-8 text-brand-purple" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-brand-purple uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
        Learn more <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200 group relative ${
        active 
          ? 'text-white bg-brand-purple/10' 
          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-brand-purple rounded-r-full"
        />
      )}
      <Icon className={`w-4 h-4 ${active ? 'text-brand-purple' : 'group-hover:text-gray-300'}`} />
      <span className="text-sm font-medium">{label}</span>
      {active && <ChevronRight className="w-3 h-3 ml-auto text-brand-purple" />}
    </button>
  );
}

function ConfigButton({ icon: Icon, label, active, danger }: { icon: any, label: string, active?: boolean, danger?: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
      active 
        ? 'bg-brand-purple text-white' 
        : danger
          ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'
          : 'bg-bg-dark border border-border-dark text-gray-400 hover:border-brand-purple hover:text-white'
    }`}>
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

function LandingPage({ onLaunch }: { onLaunch: () => void }) {
  const [loading, setLoading] = useState(true);
  const [consoleInput, setConsoleInput] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'brand', text: 'Welcome to Evori v2.5.0' },
    { type: 'info', text: 'Please enter your license key to continue...' }
  ]);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim() || cooldown) return;

    setCooldown(true);
    const input = consoleInput;
    setConsoleLogs(prev => [...prev, { type: 'user', text: `license key ~$ ${input}` }]);
    
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, { type: 'success', text: 'license key valid' }]);
      
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, { type: 'info', text: 'initializing...' }]);
        
        const injectionTime = (Math.random() * 2 + 1).toFixed(2);
        
        // Simple spinning simulation
        setTimeout(() => {
          setConsoleLogs(prev => [...prev, { type: 'info', text: '/' }]);
          setTimeout(() => {
            setConsoleLogs(prev => {
              const newLogs = [...prev];
              newLogs[newLogs.length - 1] = { type: 'success', text: `injected in ${injectionTime} seconds` };
              return newLogs;
            });

            // Delete the injected message and reset cooldown after delay
            setTimeout(() => {
              setConsoleLogs(prev => prev.filter(log => !log.text.includes('injected in')));
              setCooldown(false);
            }, 3000);
          }, 500);
        }, 500);
      }, 800);
    }, 500);

    setConsoleInput('');
  };

  React.useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading]);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000); // Slightly longer for full cutscene
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
        {/* Aurora Video Background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, times: [0, 0.1, 0.9, 1] }}
          className="absolute inset-0 z-0"
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://cdn.pixabay.com/video/2021/08/05/83973-585406008_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </motion.div>

        {/* Floating Logo Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0], 
            scale: [0.5, 0.5, 1, 1.1, 1.2],
            y: [50, 50, 0, -20, -40]
          }}
          transition={{ 
            duration: 6, 
            times: [0, 0.2, 0.4, 0.8, 1],
            ease: "easeOut"
          }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <EvoriLogo className="w-80 h-80" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 6, times: [0, 0.3, 0.5, 0.8, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-3xl font-black tracking-[1em] uppercase text-white italic">Evori</h2>
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-brand-purple to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-bg-dark text-white overflow-x-hidden selection:bg-brand-purple/30 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://cms-toolkit-artifacts.artlist.io/content/-e-x-t-e-r-n-a-l_-i-m-a-g-e_-t-o_-i-m-a-g-e-v1/media__9/image-5a2cf9e4-0b21-47d3-ad25-d31267211bae.png?Expires=2088538037&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Acu86igEb5JoxfSY87LWO~moyFU3BcPpFuUW2ZQGytPTsnSBrJRWMX28thrlWpSFSVDiL3b94B8nPFFo3pF82nR7S6vkS-2XVAaB1NFJ6tiRdCKvTVHf4A5Gx~KRRW-iO5nk8sfKrecVZ2I6Eq~KvctK4Ye7w9xQToB5dIvguf3ciBccgiNdF-5lip14HSIn9U1tFmBBeZj7afM2I1zhwXF4cqFRSDTVHyJH4mXg4x2rAGZytbzX7MI71T7zKCaKENFJyL-WD8PNchb1uHwkBA1k8W4wepVvdZwTvwZsPguZne4s9ynkVS8ylN7YdfXQZB9S9sua1UDGO-Lz~~z~6g__" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <EvoriLogo className="w-24 h-24" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          {['Features', 'Security'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">v2.5.0 Now Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] lowercase italic"
          >
            evolute <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-blue-500 to-brand-purple">your gaming.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            evori — A secure, optimized streamable closet cheat delivering peak performance and complete.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onLaunch}
              className="group relative px-10 py-5 bg-brand-purple text-white rounded-2xl font-bold text-base hover:bg-brand-purple/80 transition-all active:scale-95 shadow-2xl shadow-brand-purple/20"
            >
              View Dashboard
              <div className="absolute inset-0 rounded-2xl bg-white blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-base hover:bg-white/10 transition-all active:scale-95">
              View Showcase
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Preview Move to Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-32 relative z-10 px-4"
          >
            <div className="tilt-card max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.15)] bg-zinc-900">
              <img 
                src="https://i.ibb.co/8DHzsZ9R/Screenshot-2026-03-10-175912.png" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-purple uppercase tracking-[0.3em]">Features</span>
              <h2 className="text-5xl font-black tracking-tighter">UNMATCHED POWER.</h2>
            </div>
            <p className="text-zinc-500 max-w-md font-medium">
              Every module is built from the ground up with performance and security in mind. 
              No compromises, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Crosshair, 
                title: "Silent Aim", 
                desc: "Hit your shots without even trying. Our silent aim is smooth and looks completely natural.",
                color: "from-brand-purple/10"
              },
              { 
                icon: Lock, 
                title: "Camlock", 
                desc: "Stay locked on your target with human-like movements that bypass any detection.",
                color: "from-blue-500/10"
              },
              { 
                icon: MousePointer2, 
                title: "Triggerbot", 
                desc: "Fire instantly when an enemy crosses your crosshair. Fast, reliable, and deadly.",
                color: "from-emerald-500/10"
              },
              { 
                icon: Eye, 
                title: "Visuals", 
                desc: "See everything. ESP boxes, lines, and info that give you the ultimate advantage.",
                color: "from-brand-purple/10"
              },
              { 
                icon: Move, 
                title: "Movement", 
                desc: "Move faster and jump higher. Take control of the map with our movement tweaks.",
                color: "from-blue-500/10"
              },
              { 
                icon: Settings, 
                title: "Global", 
                desc: "Customize everything. From keybinds to safety checks, you're in full control.",
                color: "from-emerald-500/10"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`p-10 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-purple/20 transition-all group overflow-hidden relative`}
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent animate-scan" />
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-20"
          >
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em]">Security</span>
            <h2 className="text-6xl font-black tracking-tighter leading-[0.9] uppercase italic">BUILT TO LAST.</h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              We focus on one thing: keeping you safe. Our developers work 
              constantly to make sure Evori stays undetected.
            </p>
          </motion.div>
          
          <div className="w-full max-w-4xl space-y-6">
            <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest">System Secure</h4>
                  <p className="text-xs text-zinc-500">All modules active and protected</p>
                </div>
              </div>
            </div>

            {/* ASCII Console */}
            <div className="glass-card p-8 bg-black/60 border-zinc-800 font-mono text-xs overflow-hidden group min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-brand-purple" />
                  <span className="text-zinc-600 uppercase tracking-widest text-[10px] font-bold">System Console</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
              </div>
              
              <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar mb-4">
                <pre className="text-brand-purple leading-none mb-6 opacity-80">
{`  ______ __      __ ____   _____  _____ 
 |  ____|\\ \\    / // __ \\ |  __ \\|_   _|
 | |__    \\ \\  / /| |  | || |__) | | |  
 |  __|    \\ \\/ / | |  | ||  _  /  | |  
 | |____    \\  /  | |__| || | \\ \\ _| |_ 
 |______|    \\/    \\____/ |_|  \\_\\_____|`}
                </pre>
                
                {consoleLogs.map((log, i) => (
                  <p key={i} className={`
                    ${log.type === 'success' ? 'text-emerald-500' : ''}
                    ${log.type === 'info' ? 'text-blue-500' : ''}
                    ${log.type === 'brand' ? 'text-brand-purple' : ''}
                    ${log.type === 'error' ? 'text-red-500' : ''}
                    ${log.type === 'user' ? 'text-zinc-400' : ''}
                  `}>
                    {log.type !== 'user' && <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>}
                    {log.text}
                  </p>
                ))}
              </div>

              <form onSubmit={handleConsoleSubmit} className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                <span className="text-brand-purple font-bold">license key ~$</span>
                <input 
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  disabled={cooldown}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-300 font-mono text-xs placeholder:text-zinc-700 disabled:opacity-50"
                  placeholder={cooldown ? "cooldown active..." : "enter license key..."}
                  autoFocus
                />
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: 999999 }}
                  className="w-2 h-4 bg-brand-purple" 
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter lowercase italic">ready to win?</h2>
          <p className="text-zinc-500 text-xl font-medium">
            Experience the next level of precision and performance.
          </p>
          <button 
            onClick={onLaunch}
            className="px-12 py-6 bg-white text-black rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl shadow-white/10 lowercase"
          >
            boom
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <EvoriLogo className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Evori</span>
          </div>
          <div className="flex items-center gap-10">
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
          </div>
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">© 2026 Evori. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FuturisticCard({ title, icon: Icon, children, badge, className = "" }: { title: string, icon: any, children: React.ReactNode, badge?: string, className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple/50 to-blue-500/50 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative glass-card p-6 border-zinc-800/50 bg-zinc-900/60 backdrop-blur-2xl overflow-hidden h-full">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent animate-scan pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
              <Icon className="w-5 h-5 text-brand-purple" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">{title}</h3>
              <div className="h-0.5 w-8 bg-brand-purple mt-1"></div>
            </div>
          </div>
          {badge && (
            <div className="px-2 py-0.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[9px] font-bold text-brand-purple uppercase tracking-widest animate-pulse">
              {badge}
            </div>
          )}
        </div>
        
        <div className="space-y-4 relative z-10">
          {children}
        </div>

        {/* Decorative Corner */}
        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-zinc-700"></div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color = "text-white" }: { icon: any, label: string, value: string, color?: string }) {
  return (
    <div className="glass-card p-5 flex items-center gap-4 group hover:border-brand-purple/50 transition-colors">
      <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 group-hover:bg-brand-purple/20 transition-colors">
        <Icon className="w-5 h-5 text-brand-purple" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`text-xl font-black tracking-tighter ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function HomeFeatureCard({ title, desc, icon: Icon, onClick }: { title: string, desc: string, icon: any, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="glass-card p-6 text-left group hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mb-4 group-hover:bg-brand-purple/20 transition-colors">
        <Icon className="w-6 h-6 text-brand-purple" />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-brand-purple transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </button>
  );
}

function FeatureCard({ icon: Icon, title, status, desc, onClick }: { icon: any, title: string, status: string, desc: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card glass-card-hover p-8 text-left space-y-4 group border-zinc-800/50"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-brand-purple/50 transition-colors">
          <Icon className="w-6 h-6 text-zinc-400 group-hover:text-brand-purple transition-colors" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
          status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 
          status === 'Disabled' ? 'text-rose-500 border-rose-500/20 bg-rose-500/5' : 'text-zinc-500 border-zinc-800 bg-zinc-900/50'
        }`}>
          {status}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
      </div>
    </motion.button>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, color = "text-zinc-400" }: { icon: any, title: string, subtitle: string, color?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-6 mb-8">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white uppercase tracking-tight">{title}</span>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{subtitle}</span>
      </div>
    </div>
  );
}
